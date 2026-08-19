// 资产分级同步 R2（BR-107/114）：≤10MB 增量同步，>10MB 跳过（raw 直出）
// 增量策略：与上一次提交的 docs-html/assets-manifest.json（git HEAD 版本）做 sha256 比对，
// 只上传新增/变更文件——本脚本须在 CI 中于「产物提交」之前运行（此时 HEAD 仍是旧清单）。
// 依赖 wrangler CLI 与环境变量：CLOUDFLARE_API_TOKEN、CLOUDFLARE_ACCOUNT_ID、R2_BUCKET。
import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';

const ROOT = dirname(new URL(import.meta.url).pathname);
const BUCKET = process.env.R2_BUCKET;

if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID || !BUCKET) {
  console.log('跳过 R2 同步：未配置 CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID / R2_BUCKET');
  process.exit(0);
}

const current = JSON.parse(await readFile(join(ROOT, 'docs-html/assets-manifest.json'), 'utf8'));

let previous = { assets: [] };
try {
  previous = JSON.parse(execSync('git show HEAD:docs-html/assets-manifest.json', { cwd: ROOT, encoding: 'utf8' }));
} catch {
  console.log('无历史 assets-manifest（首次同步），全量上传');
}
const prevSha = new Map(previous.assets.map((a) => [a.path, a.sha256]));

let uploaded = 0;
let skippedRaw = 0;
let unchanged = 0;
for (const a of current.assets) {
  if (a.servedVia === 'raw') {
    skippedRaw++;
    console.log(`- 跳过 R2（>10MB，raw 直出）：${a.path}`);
    continue;
  }
  if (prevSha.get(a.path) === a.sha256) {
    unchanged++;
    continue;
  }
  // R2 键 = 仓库内路径（同路径镜像，BR-107）
  execSync(`npx wrangler r2 object put "${BUCKET}/${a.path}" --file "${join(ROOT, a.path)}" --remote`, {
    cwd: ROOT,
    stdio: 'inherit',
  });
  uploaded++;
}

console.log(`\nR2 同步完成：上传 ${uploaded}，未变更 ${unchanged}，raw 直出跳过 ${skippedRaw}`);
