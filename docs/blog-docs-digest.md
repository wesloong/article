# Blog 产品文档整理（面向本仓库：内容项目 story）

> 来源：`wesloong/blog` 分支 `claude/personal-blog-product-docs-5y2wx7` 的 `docs/`、`contracts/`、`poc/ci-build/`。
> 本仓库（`wesloong/article`）即文档中的**内容项目（story）仓库**——文章 Markdown 与静态资源的真相源、
> CI 编译产物托管方、并将部署为独立内容站点（Cloudflare Pages）对博客提供内容 API。
> 注：blog PRD 中 story 仓库名暂定 `wesloong/posts`（Q-016 待确认），实际落地为本仓库 `wesloong/article`，需回写确认 Q-016。

## 1. 文档体系总览

| 文档 | 版本 | 职责 |
|------|------|------|
| `docs/README.md`（入口） | — | 文档地图、项目全景、编号/变更管理规范 |
| `docs/blog/PRD-blog.md` | v3.1.0 | 博客站点全部需求（FR/NFR/BR/RISK/ASS/Q 编号的**权威分配方**） |
| `docs/story/PRD-story.md` | v2.2.0 | **本仓库的 PRD**：仓库结构、CI 管线、内容站点/API、对外契约 |
| `docs/loong/PRD-loong.md` | 已取消 | loong CLI 已于 v3.0.0 取消，git 原生流替代（仅留决策记录） |
| `docs/design/design-system.md` | v1.0.0 | Apple HIG 设计规范（色彩/排版/UI 状态/微交互/品牌 SVG） |
| `docs/architecture/architecture.md` | v2.1.0 | 两项目拓扑、契约②③、编译双轨制、资产链路、缓存分层 |
| `contracts/admin-api.yaml` | 0.1.0 | 原契约①，已降级为博客站点内部接口设计参考（与本仓库无关） |
| `poc/ci-build/REPORT.md` | — | D-010 PoC：编译管线实测通过，`build.mjs` 可直接迁入本仓库 |

## 2. 整体架构（两项目拓扑）

```
站长本地（任意编辑器）──git push──▶ 内容项目 story（本仓库）
                                      posts/ md 真相源 + assets/ 资源真相源
                                      └─ GitHub Actions CI 编译 → docs-html/（html+manifest+search-index）
                                      └─ Cloudflare Pages 部署 docs-html + Pages Functions 搜索 API
                                            │                          │
                        契约② 内容 API（HTML/manifest/搜索）    契约③ Webhook（部署完成，HMAC 签名）
                                            ▼                          ▼
                               博客站点 wesloong.com（Next.js on CF Workers，D1/KV/R2）
                               后台经 GitHub API（PAT）低频写回 posts/、assets/
```

- **loong CLI 已取消（v3.0.0）**：git 本身即发布管理工具——本地写作 → git push → CI 编译 → Pages 部署 → Webhook 自动发布（BR-113）。
- 跨项目通信只剩**博客 ↔ story** 两方、只走契约通道（BR-100）；契约②③随本仓库维护（`CONTRACT.md` + JSON Schema，语义化版本，BR-097~099）。
- 博客读内容一律走 story 站点 API（BR-110），**不消耗 GitHub API 配额**；GitHub API 仅作低频写通道与读兜底。读链路四级兜底：博客边缘缓存 → story 站点（CDN）→ 博客 KV 副本 → GitHub raw（BR-087）。

## 3. 本仓库的目标结构（BR-090，Q-015 已确认）

```
posts/                       # Markdown 真相源；一级目录=栏目 slug，二级目录=子分组→映射为标签（Q-013）
assets/                      # 静态资源真相源，推荐按文章归档 assets/{栏目}/{slug}/（Q-018 已确认）
docs-html/                   # CI 编译产物（镜像 posts/ 结构）；禁止手改；不用 dist 防冲突
├── manifest.json            # 文章索引：slug/标题/摘要/栏目/标签/语言/TOC/字数/更新时间/源 sha
└── search-index.json        # 搜索索引：标题/摘要/标签/小节标题（ASS-019）
.github/workflows/build.yml  # CI 编译管线（参考 poc/ci-build/workflow-reference.yml）
CONTRACT.md + schema/*.json  # 契约②：结构规范 + manifest/search-index JSON Schema（FR-027）
```

关键规则：

- frontmatter 必填 `title`、`slug`、`language`；可选 `summary`、`tags`、`cover`、`published_at`、`translation_of`、`draft`；frontmatter 优先于目录推断（FR-024）。`draft: true` 仅同步不发布。
- md 内资源一律站内相对路径 `/assets/**`，全链路不改写（BR-079）——文章与资源同仓库版本化、可整体迁移回滚。
- 产物与源以 sha 关联：manifest 记录每篇源文件 commit sha，消费方渲染前校验（BR-091）。

## 4. CI 编译管线（ASS-016 已确认；PoC D-010 管线级已通过）

**双轨制（BR-104/105）**：CI 只产**发布产物**；一切预览走即时编译（博客后台浏览器端精简管线），绝不等 CI。

流水线（参考 `poc/ci-build/workflow-reference.yml`）：

1. 触发：push 到 `posts/**`（path 过滤，`docs-html/**` 不触发——防循环保险 1）；`concurrency` 取消过期构建。
2. 校验：frontmatter 必填缺失 → 构建失败并通知站长。
3. 编译：unified（remark-parse/remark-gfm → rehype）+ rehype-sanitize（BR-072 防存储型 XSS）+ Shiki 双主题高亮 → `docs-html/` + manifest + search-index。
4. 资产分级同步（BR-114）：≤10MB 按 hash 增量同步 R2（BR-107）；>10MB 跳过 R2，manifest 标记 raw 直出（GitHub 100MB 为入库上限）。
5. 产物提交带 `[skip ci]`（防循环保险 2）→ Pages 部署。
6. Webhook（契约③，HMAC-SHA256 签名，`x-signature: sha256=...`）POST 博客 `/api/hooks/content` → 博客比对 manifest 自动发布 + 精准缓存失效（BR-113/FR-016）；Webhook 丢失由博客定时对账兜底。

**PoC 实测（2026-08-18）**：CI 全量 shiki 初始化 ~7s（一次性）、~170ms/篇、100 篇全量 ≈ 25s；预览精简管线中位 15ms。`poc/ci-build/build.mjs` 可直接迁入本仓库。

**验收（RISK-015）**：push → 前台可见端到端 ≤ 2 分钟（预估 60–120s，**待本仓库建立后实测**）；产物提交不触发二次构建；编译失败不产生半成品；超标则回退"博客后台编译产物直推 docs-html/"。

## 5. 对外接口（契约②③，FR-027）

**主通道 = story 站点**（Cloudflare Pages，域名 Q-019 暂定 `story.wesloong.com`）：

| 接口 | 形式 | 说明 |
|------|------|------|
| 文章 HTML | `GET /{栏目}/{slug}.html`（静态，CDN 缓存） | 博客再叠 KV 副本兜底（BR-087） |
| manifest | `GET /manifest.json` | 含内容版本 sha（BR-112）；自动发布比对依据（BR-113） |
| 搜索 API | `GET /api/search?q=&lang=`（Pages Functions） | 归一化 q 边缘缓存 + 限流（BR-111）；高频零 GitHub 消耗 |
| 静态资源 | `assets/**` → 分级服务（BR-114） | ≤10MB R2 同路径镜像；>10MB 博客 `/assets/*` 直接回源 GitHub raw |
| 更新通知 | Webhook（HMAC，部署完成触发） | 契约③ |

**写通道/兜底（GitHub API，低频）**：博客后台经 Contents/Git Data API 推送 md 与资产（BR-076 sha 乐观并发防冲突，ASS-020 评估通过：单次发布 2–5 个子请求，资源消耗极低）；`docs-html/**` raw 读取仅作最后兜底。

**非目标**：不提供任何写接口（写一律走 GitHub）；不存评论/统计等动态数据（归博客 D1）；不承载超大媒体（>100MB 不入库，用外部平台嵌入）。

## 6. 与本仓库相关的关键决策与版本沿革

| 决策 | 结论 | 依据 |
|------|------|------|
| 谁编译发布产物 | 本仓库 GitHub Actions CI（预览一律即时编译） | ASS-016 / Q-014 已确认 |
| 产物放哪 | `docs-html/`（不用 dist） | ASS-017 / Q-015 已确认 |
| 资产归档 | `assets/{栏目}/{slug}/`；≤10MB 镜像 R2，>10MB 入库但 raw 直出，100MB 为入库上限 | ASS-021 / Q-018 已确认；v3.1.0 修正 |
| story 部署形态 | CF Pages 直接发布已提交的 docs-html + Functions 搜索 API | ASS-022（v2.5.0 定位升级） |
| 官方写作流 | git 原生流：git push 即发布（`draft: true` 除外） | ASS-023（v3.0.0，loong 取消） |
| 内容读取主链路 | story 站点 API，读链路脱离 GitHub 配额 | BR-110（v2.5.0） |

## 7. 待办与待澄清（落地本仓库时需处理）

1. **Q-016 回写**：story 仓库实际为 `wesloong/article`（文档暂定 `wesloong/posts`），需在 blog 文档中确认更新。
2. **Q-019**：story 站点域名待定（暂定 `story.wesloong.com`）。
3. **D-010 剩余项**：本仓库建立 CI 后实测 Actions 端到端延迟（验收 ≤ 2min，预估 60–120s）。
4. 建立 `CONTRACT.md` + `schema/manifest.json` + `schema/search-index.json`（契约②，语义化版本；博客 CI 做 schema 冒烟校验，BR-099）。
5. 迁入 `poc/ci-build/build.mjs` 与参考 workflow，配置 Pages 部署与 Webhook secret（契约③）。
6. Webhook 目标端点：`https://wesloong.com/api/hooks/content`（HMAC secret 存双方 Secrets）。

## 8. 编号速查（本仓库最相关）

- **BR-090** 仓库结构规范 ｜ **BR-091** 产物-源 sha 一致性 ｜ **BR-104/105** 预览即时编译（浏览器端优先）
- **BR-106~109** 资产真相源/R2 镜像/`/assets/*` 分级解析/缓存失效 ｜ **BR-114** 10MB=R2 镜像分界线（非拒绝阈值）
- **BR-110~112** story 站点 API 主链路/搜索 API/内容版本标识 ｜ **BR-113** Webhook 自动发布
- **BR-097~100** 契约文档化/语义化版本/CI 冒烟校验/边界纪律
- **RISK-015** CI 延迟与循环构建 ｜ **D-010** PoC（管线级已通过）
