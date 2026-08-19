# 内容项目接口契约（契约② + 契约③）

| 项目 | 内容 |
|------|------|
| 契约版本 | v1.0.0（语义化版本，BR-097/098） |
| 提供方 | 内容项目 story（本仓库，`wesloong/article`） |
| 消费方 | 博客站点（`wesloong/blog`，wesloong.com） |
| 需求依据 | blog PRD FR-024/FR-027、story PRD §3~§5 |

> 破坏性变更须升主版本并附迁移说明；消费方 CI 应对 manifest / search-index 做 schema 冒烟校验
> （schema 见 [`schema/`](schema/)，BR-099）。跨项目通信仅允许走本契约声明的通道（BR-100）。

---

## 契约②：内容 API（story 站点，主读通道）

部署：Cloudflare Pages 直接发布已提交的 `docs-html/`（无二次构建）+ Pages Functions。
域名暂定 `story.wesloong.com`（Q-019 待确认）。全部接口只读——**本项目不提供任何写接口**，写操作一律走 GitHub（§写通道）。

### 1. 仓库结构规范（BR-090）

```
posts/{栏目slug}/[{子分组}/]{slug}.md   # Markdown 真相源；一级目录=栏目，二级目录=子分组→标签
assets/{栏目}/{slug}/{文件}             # 静态资源真相源（推荐按文章归档，Q-018）
docs-html/                              # CI 编译产物（镜像 posts/ 结构），禁止手改
├── {栏目}/[{子分组}/]{slug}.html
├── manifest.json
├── search-index.json
└── assets-manifest.json
```

### 2. frontmatter 字段

| 字段 | 必填 | 类型 | 说明 |
|------|------|------|------|
| `title` | ✅ | string | 标题 |
| `slug` | ✅ | string | `^[a-z0-9][a-z0-9-]*$`，全站唯一（BR-008） |
| `language` | ✅ | `zh` \| `en` | 写作语言 |
| `summary` | — | string | 摘要 |
| `tags` | — | string[] | 与二级目录推断的标签合并去重 |
| `cover` | — | string | 封面路径（站内相对路径 `/assets/**`） |
| `published_at` | — | date | 发布时间（缺省由博客首次发布时定） |
| `translation_of` | — | string | 关联的另一语言版本 slug |
| `draft` | — | boolean | `true` = 仅同步不发布（BR-113），且不进搜索索引 |

frontmatter 优先于目录推断；必填缺失 → CI 构建失败（不产生半成品产物）。
md 内静态资源一律站内相对路径 `/assets/**`，全链路不改写（BR-079）。

### 3. 文章 HTML

`GET /{栏目}/[{子分组}/]{slug}.html`（静态文件，CDN 缓存）

- 内容：正文 HTML 片段（无页面壳），已经 rehype-sanitize 白名单消毒（BR-072），代码块含 Shiki 双主题（github-light/github-dark）class。
- 消费方渲染前应以 manifest 的 `sourceSha256` 校验产物一致性（BR-091），并写 KV 副本兜底（BR-087）。

### 4. manifest

`GET /manifest.json` — 结构见 [`schema/manifest.schema.json`](schema/manifest.schema.json)。

```jsonc
{
  "contractVersion": "1.0.0",
  "generatedAt": "…",             // 构建时间
  "contentSha": "…",              // 源 commit sha（BR-112，消费方校验 KV 副本一致性）
  "posts": [ {
    "slug": "…", "category": "…", "title": "…", "summary": "…",
    "tags": ["…"], "language": "zh|en", "draft": false,
    "cover": "…?", "publishedAt": "…?", "translationOf": "…?",
    "words": 0, "toc": [{ "depth": 2, "text": "…" }],
    "sourcePath": "posts/…", "htmlPath": "docs-html/…",
    "sourceSha256": "…", "updatedAt": "…"
  } ],
  "assets": [ { "path": "assets/…", "size": 0, "sha256": "…", "servedVia": "r2|raw" } ]
}
```

- **自动发布比对依据（BR-113）**：博客收到 Webhook 后拉取 manifest 与 D1 比对——新增即发布（`draft: true` 除外）、变更即更新、移除即下架。
- **资产分级（BR-114）**：`servedVia: "r2"`（≤10MB，R2 同路径镜像）/ `"raw"`（>10MB，博客 `/assets/*` 直接回源 GitHub raw 并边缘缓存）。GitHub 单文件 100MB 为入库上限。

### 5. 搜索 API（BR-111）

`GET /api/search?q={关键词}&lang={zh|en，可选}`（Pages Functions，实现见 [`functions/api/search.js`](functions/api/search.js)）

- q 归一化：trim / 小写 / 截断 64 字符；归一化键边缘缓存 `s-maxage=300, stale-while-revalidate=86400`（BR-096）。
- 检索范围：标题 / 摘要 / 标签 / 小节标题（加权评分排序），仅含非 draft 文章，最多返回 20 条。
- 响应：

```jsonc
{
  "query": "…", "lang": "…", "total": 0,
  "results": [ {
    "slug": "…", "category": "…", "title": "…", "summary": "…",
    "language": "…", "tags": ["…"], "htmlPath": "/{栏目}/{slug}.html", "score": 0
  } ]
}
```

- 错误：`400`（lang 非法）、`503`（索引不可用），`{ "error": "…" }`。
- 限流由 Cloudflare WAF / Rate Limiting Rules 配置（防刷，思路同 BR-041）。

### 6. 写通道 / 读兜底（GitHub API，低频）

| 操作 | 通道 | 约定 |
|------|------|------|
| 推送 md / 资产 | Contents API（单文件）/ Git Data API（多文件原子提交） | 目标 `posts/**`、`assets/**`；sha 乐观并发，不一致判冲突交人工（BR-076），禁止静默覆盖 |
| 读兜底 | GitHub raw：`docs-html/**` | 仅当 story 站点与博客 KV 副本均不可用（BR-087 末级） |

---

## 契约③：内容更新通知（Webhook）

story CI 完成产物提交（Pages 随之部署）后，通知博客站点：

- **端点**：`POST https://wesloong.com/api/hooks/content`
- **请求体**：`{"event": "content-updated", "sha": "<源 commit sha>"}`
- **签名**：`x-signature: sha256=<HMAC-SHA256(body, SITE_WEBHOOK_SECRET) 的 hex>`；
  消费方必须校验签名，不匹配一律拒绝。secret 双方各自存于 Secrets（GitHub Actions / Workers Secrets）。
- **重试语义**：CI 侧单次通知失败即构建告警（不重试）；**投递可靠性由博客侧定时对账兜底**
  （如每小时拉取 manifest 比对，BR-113）——消费方不得假设 Webhook 必达。
- **幂等**：博客以 manifest 比对做增量同步，重复通知无副作用。

---

## 修订记录

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0.0 | 2026-08-19 | 初始版本：依据 blog PRD v3.1.0 / story PRD v2.2.0 落地契约②③ |
