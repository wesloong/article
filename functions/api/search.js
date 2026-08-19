// story 站点搜索 API（契约②，BR-111）：GET /api/search?q=&lang=
// Cloudflare Pages Functions：服务端检索已部署的 search-index.json。
// - q 归一化（trim / 小写 / 限长 64）后作为边缘缓存键（BR-096：s-maxage=300 + SWR）
// - 索引仅含已发布（非 draft）文章，构建期已保证（build.mjs）
// - 限流（防刷）建议在 Cloudflare WAF / Rate Limiting Rules 层配置，函数内不重复实现
const MAX_Q = 64;
const MAX_RESULTS = 20;

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase().slice(0, MAX_Q);
  const lang = url.searchParams.get('lang') ?? '';
  if (['zh', 'en', ''].indexOf(lang) === -1) return json({ error: 'lang 必须为 zh 或 en' }, 400);
  if (!q) return json({ query: '', lang, total: 0, results: [] });

  // 归一化后的缓存键：同义请求（多余空格/大小写差异）命中同一缓存
  const cacheKey = new Request(
    `${url.origin}/api/search?q=${encodeURIComponent(q)}&lang=${encodeURIComponent(lang)}`,
  );
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const idxRes = await context.env.ASSETS.fetch(new URL('/search-index.json', url.origin));
  if (!idxRes.ok) return json({ error: '索引不可用' }, 503);
  const index = await idxRes.json();

  const results = index
    .filter((e) => !lang || e.language === lang)
    .map((e) => ({ entry: e, score: score(e, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map(({ entry, score }) => ({
      slug: entry.slug,
      category: entry.category,
      title: entry.title,
      summary: entry.summary,
      language: entry.language,
      tags: entry.tags,
      htmlPath: `/${entry.category}/${entry.slug}.html`,
      score,
    }));

  const res = json({ query: q, lang, total: results.length, results });
  context.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

function score(e, q) {
  let s = 0;
  if (e.title.toLowerCase().includes(q)) s += 8;
  if ((e.summary ?? '').toLowerCase().includes(q)) s += 4;
  if ((e.tags ?? []).some((t) => t.toLowerCase().includes(q))) s += 4;
  if ((e.headings ?? []).some((h) => h.toLowerCase().includes(q))) s += 2;
  return s;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // 只读公开数据，允许博客前端跨域调用
      'access-control-allow-origin': '*',
      'cache-control':
        status === 200 ? 'public, s-maxage=300, stale-while-revalidate=86400' : 'no-store',
    },
  });
}
