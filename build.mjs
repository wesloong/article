// story 仓库 CI 编译管线（源自 blog 仓库 poc/ci-build/build.mjs，D-010 已验证）
// posts/**.md -> docs-html/**.html + manifest.json + search-index.json + assets-manifest.json
// 管线规格 = blog PRD ASS-013：unified(remark-parse + remark-gfm -> remark-rehype) + rehype-sanitize + shiki
// 本文件在 PoC 基础上按 PRD 补齐：
//   - frontmatter 校验（title/slug/language 必填，缺失即构建失败）
//   - slug 全站唯一校验（BR-008）
//   - draft 标记透传（BR-113：draft 仅同步不发布，且不进 search-index）
//   - 资产清单分级（BR-114：≤10MB 标记 R2 镜像，>10MB 标记 raw 直出）
//   - manifest 携带内容版本 contentSha（BR-112）
//   - 全量重建前清空 docs-html/，删除的文章产物随之消失（博客据 manifest 对比自动下架）
import { readFile, writeFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

const ROOT = dirname(new URL(import.meta.url).pathname);
const SRC = join(ROOT, 'posts');
const ASSETS = join(ROOT, 'assets');
const OUT = join(ROOT, 'docs-html');
const R2_MIRROR_LIMIT = 10 * 1024 * 1024; // BR-114：10MB 为 R2 镜像分界线（非拒绝阈值）
const CONTRACT_VERSION = '1.0.0';

// 允许 shiki 输出的 class/style 通过消毒（白名单收敛，BR-072）
const schema = structuredClone(defaultSchema);
schema.attributes['*'] = [...(schema.attributes['*'] ?? []), ['className'], ['style']];

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark' } })
  .use(rehypeSanitize, schema)
  .use(rehypeStringify);

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // 目录不存在（如 assets/ 尚无内容）
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function toc(md) {
  return [...md.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((m) => ({ depth: m[1].length, text: m[2].trim() }));
}

function gitLastModified(file) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relative(ROOT, file)}"`, { cwd: ROOT, encoding: 'utf8' }).trim();
    if (out) return out;
  } catch {}
  return null; // 浅克隆/未提交文件：由调用方回退 mtime
}

function contentSha() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  try {
    return execSync('git rev-parse HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

// ---------- 第一遍：解析 + 校验（任何错误即失败，不产出产物） ----------
const files = [];
for await (const f of walk(SRC)) if (f.endsWith('.md')) files.push(f);

const errors = [];
const seenSlugs = new Map();
const parsed = [];
for (const file of files) {
  const raw = await readFile(file, 'utf8');
  const rel = relative(SRC, file); // {栏目}/[{子分组}/]{slug}.md
  let fm, content;
  try {
    ({ data: fm, content } = matter(raw));
  } catch (e) {
    errors.push(`${rel}: frontmatter 解析失败 — ${e.message}`);
    continue;
  }
  for (const key of ['title', 'slug', 'language']) {
    if (!fm[key]) errors.push(`${rel}: frontmatter 缺少必填字段 "${key}"`);
  }
  if (fm.language && !['zh', 'en'].includes(fm.language)) {
    errors.push(`${rel}: language 必须为 zh 或 en（当前 "${fm.language}"）`);
  }
  if (fm.slug) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(fm.slug)) {
      errors.push(`${rel}: slug "${fm.slug}" 不符合 ^[a-z0-9][a-z0-9-]*$`);
    }
    if (seenSlugs.has(fm.slug)) {
      errors.push(`${rel}: slug "${fm.slug}" 与 ${seenSlugs.get(fm.slug)} 重复（BR-008 全站唯一）`);
    } else {
      seenSlugs.set(fm.slug, rel);
    }
  }
  parsed.push({ file, rel, raw, fm, content });
}

if (errors.length) {
  console.error(`✗ 校验失败（${errors.length} 处）：`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

// ---------- 第二遍：编译 ----------
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const t0 = performance.now();
const manifest = [];
const searchIndex = [];
let bytesIn = 0;
let bytesOut = 0;

for (const { file, rel, raw, fm, content } of parsed) {
  const parts = rel.split('/');
  const category = parts[0];
  const subgroupTags = parts.slice(1, -1); // 二级目录 -> 标签（Q-013）
  const slug = fm.slug;
  const tags = [...new Set([...(fm.tags ?? []), ...subgroupTags])];
  const draft = fm.draft === true;

  const t = performance.now();
  const html = String(await processor.process(content));
  const ms = performance.now() - t;

  const outPath = join(OUT, rel.replace(/\.md$/, '.html'));
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html);

  const words = content.replace(/\s+/g, '').length;
  const updatedAt = gitLastModified(file) ?? (await stat(file)).mtime.toISOString();

  manifest.push({
    slug,
    category,
    title: fm.title,
    summary: fm.summary ?? '',
    tags,
    language: fm.language,
    draft,
    ...(fm.cover ? { cover: fm.cover } : {}),
    ...(fm.published_at ? { publishedAt: new Date(fm.published_at).toISOString() } : {}),
    ...(fm.translation_of ? { translationOf: fm.translation_of } : {}),
    // 下面这几个是 blog 侧 ManifestPost 一直期望、这里却一直没映射的字段。
    // 漏掉不会报错，只是前台功能静默失效：系列导航不出现、AI 披露条不出现
    // （BR-170/NFR-132 是合规项）、转载来源不出现（BR-177）。
    // frontmatter 用蛇形，manifest 用驼峰 —— 与 translation_of → translationOf 同一规则。
    ...(fm.series ? { series: String(fm.series) } : {}),
    ...(fm.series_order != null ? { seriesOrder: Number(fm.series_order) } : {}),
    ...(fm.ai_assisted === true ? { aiAssisted: true } : {}),
    ...(fm.reprinted === true ? { reprinted: true } : {}),
    ...(fm.canonical_url ? { canonicalUrl: String(fm.canonical_url) } : {}),
    words,
    toc: toc(content),
    sourcePath: `posts/${rel}`,
    htmlPath: `docs-html/${rel.replace(/\.md$/, '.html')}`,
    sourceSha256: createHash('sha256').update(raw).digest('hex'),
    updatedAt,
  });

  // 索引仅含非 draft 文章（BR-096：草稿不可被搜到）
  if (!draft) {
    searchIndex.push({
      slug,
      category,
      title: fm.title,
      summary: fm.summary ?? '',
      tags,
      language: fm.language,
      headings: toc(content).map((h) => h.text),
    });
  }

  bytesIn += raw.length;
  bytesOut += html.length;
  console.log(`✓ ${rel}  ${ms.toFixed(1)}ms  ${(raw.length / 1024).toFixed(1)}KB -> ${(html.length / 1024).toFixed(1)}KB${draft ? '  [draft]' : ''}`);
}

// ---------- 资产清单（BR-114 分级：≤10MB 镜像 R2，>10MB raw 直出） ----------
const assets = [];
for await (const f of walk(ASSETS)) {
  const rel = relative(ASSETS, f);
  if (rel.split('/').some((p) => p.startsWith('.'))) continue; // 跳过 .gitkeep 等
  const buf = await readFile(f);
  const size = buf.length;
  assets.push({
    path: `assets/${rel}`,
    size,
    sha256: createHash('sha256').update(buf).digest('hex'),
    servedVia: size <= R2_MIRROR_LIMIT ? 'r2' : 'raw',
  });
}

const generatedAt = new Date().toISOString();
await writeFile(
  join(OUT, 'manifest.json'),
  JSON.stringify({ contractVersion: CONTRACT_VERSION, generatedAt, contentSha: contentSha(), posts: manifest, assets }, null, 2),
);
await writeFile(join(OUT, 'search-index.json'), JSON.stringify(searchIndex, null, 2));
await writeFile(join(OUT, 'assets-manifest.json'), JSON.stringify({ generatedAt, assets }, null, 2));

const total = performance.now() - t0;
console.log(
  `\n${parsed.length} 篇文章 | ${assets.length} 个资产 | in ${(bytesIn / 1024).toFixed(1)}KB out ${(bytesOut / 1024).toFixed(1)}KB | 总耗时 ${total.toFixed(0)}ms（含 shiki 初始化）`,
);
