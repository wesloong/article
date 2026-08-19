# 内容项目 story（wesloong/article）

Wesloong 博客体系的**内容仓库 + 内容站点**：文章 Markdown 与静态资源的真相源、CI 编译产物托管方，
并部署为独立内容站点（Cloudflare Pages）对博客站点（wesloong.com）提供内容 API。

- 产品文档体系入口：blog 仓库 `docs/README.md`（本项目 PRD：`docs/story/PRD-story.md`）
- 文档整理速览：[`docs/blog-docs-digest.md`](docs/blog-docs-digest.md)
- 对外契约：[`CONTRACT.md`](CONTRACT.md)（契约② 内容 API + 契约③ Webhook）+ [`schema/`](schema/)

## 仓库结构

```
posts/{栏目}/[{子分组}/]{slug}.md   # Markdown 真相源；一级目录=栏目，二级目录→标签
assets/{栏目}/{slug}/               # 静态资源真相源（md 内以 /assets/** 相对路径引用，不改写）
docs-html/                          # CI 编译产物（禁止手改）：html + manifest + search-index
functions/api/search.js             # 搜索 API（Pages Functions，契约②）
build.mjs                           # 编译管线：校验 + unified/rehype-sanitize/Shiki
sync-assets.mjs                     # 资产分级增量同步 R2（≤10MB；>10MB raw 直出）
.github/workflows/build.yml         # CI：push posts/assets → 校验编译 → 产物提交 → Webhook
```

## 写作发布（git 原生流）

```
本地写 posts/{栏目}/{slug}.md（图放 assets/{栏目}/{slug}/）
  → git push
  → CI 校验+编译 → 资产同步 R2 → 产物提交 [skip ci] → Pages 部署
  → Webhook 通知博客 → 自动发布（frontmatter draft: true 则仅同步不发布）
```

frontmatter 必填：`title`、`slug`（全站唯一，`^[a-z0-9-]+$`）、`language`（zh/en）；
可选：`summary`、`tags`、`cover`、`published_at`、`translation_of`、`draft`。缺必填 CI 直接失败。

## 本地构建

```bash
npm ci
npm run build     # posts/** -> docs-html/**（含 manifest.json / search-index.json）
```

## 部署与密钥（待配置）

| 项 | 说明 |
|----|------|
| Cloudflare Pages | 关联本仓库，构建命令留空，输出目录 `docs-html`；域名暂定 story.wesloong.com（Q-019） |
| `SITE_WEBHOOK_SECRET` | GitHub Actions secret；与博客侧 Workers Secret 一致（契约③ HMAC） |
| `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` / `R2_BUCKET` | GitHub Actions secrets；未配置时 CI 自动跳过 R2 同步 |
