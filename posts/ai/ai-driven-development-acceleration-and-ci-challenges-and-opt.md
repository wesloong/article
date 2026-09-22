---
title: "AI 驱动的开发加速与持续集成（CI）的挑战及优化"
slug: ai-driven-development-acceleration-and-ci-challenges-and-opt
language: zh
summary: "AI 驱动的开发显著提升了代码编写和交付速度，但也给传统的持续集成（CI）流程带来了性能瓶颈和成本压力。本文综合分析了 CI 优化策略，包括基础设施升级、工具链现代化、代码检查效率提升以及缓存策略调整，旨在应对 AI 时代开发加速带来的挑战。"
tags: [AI, 持续集成, CI, 开发效率]
draft: true
published_at: 2026-09-22
---

![AI 驱动的开发加速与持续集成（CI）的挑战及优化](/assets/ai/ai-driven-development-acceleration-and-ci-challenges-and-opt/3fed6e3f81b2.svg)

人工智能（AI）在软件开发领域的应用正以前所未有的速度改变着开发流程。AI 驱动的编码工具极大地提升了开发效率，使得代码的编写和迭代速度呈指数级增长。然而，这种加速也带来了新的挑战，尤其是在持续集成（CI）环节，它已成为新的性能瓶颈。

## AI 加速下的 CI 瓶颈

AI 编码工具的出现，使得开发者能够更快地编写和提交代码。但随之而来的是，对代码进行验证的 CI 流程未能跟上这种速度。每一次代码提交（Pull Request, PR）都需要经过 CI 的一系列检查，当开发速度加快时，CI 就可能成为一个阻碍，导致基础设施成本上升，并延长开发者和 AI 代理等待反馈的时间。

在 Linear，AI 编码工具的使用使得代码交付速度显著提升，但验证这些更改的 CI 流程却未能同步跟上。尽管测试套件的数量自年初以来几乎翻了四倍，但他们成功地将 PR 在 CI 中的等待时间从超过 6 分钟缩短到 5 分钟以上，同时将每次测试的运行器时间缩短了约一半。

### 优化 CI 性能的关键策略

为了应对 CI 瓶颈，Linear 团队采取了多方面的优化措施，主要集中在以下四个方面：

1.  **升级基础设施和工具链**：将工作负载从 GitHub Actions 迁移到拥有更快 CPU、更高性能存储和更好缓存机制的第三方运行器，显著提升了基础运行环境的速度。例如，在类似条件下，工作负载运行速度平均提升了 34%，其中 `tsc`（TypeScript 编译器）的提速达到 52%。此外，通过切换到更现代化的工具链，如使用 `tsgo`（原生 TypeScript 编译器），将 `tsc` 检查的每周中位数时间缩短了 73%，从而将瓶颈完全移出了类型检查环节。

2.  **优化关键路径上的作业**：识别并加速那些阻碍其他工作流程的“门禁”作业。这些作业通常负责检查 PR 更改了哪些文件，以及这些更改是否已在 CI 中通过。通过限制检出（checkout）操作的深度，将最慢的检出作业时间从 94 秒减少到 20 秒，甚至在某些不需要工作树的作业中完全移除检出步骤，将时间从 27 秒减少到 7 秒。此外，还通过使用稀疏、无 blob 的检出方式，为特定事件节省了约 11 秒的检出时间。

3.  **减少重复设置和冗余工作**：针对 CI 作业中常见的重复设置成本，如启动运行器、安装依赖等，采取了多种策略。将共享依赖（如 Postgres 客户端）预装到 CI 基础镜像中，减少了每个测试分片（shard）的安装时间。通过限制 `pnpm install` 的范围，仅安装 API 包及其依赖，将安装时间从 44-73 秒大幅缩短至 16-18 秒。甚至发现缓存 `node_modules` 比直接重建更慢，因此放弃了不必要的缓存策略，将每个分片的设置时间从 110-140 秒减少到 67-73 秒。

4.  **提升代码检查效率**：对代码检查（linting）环节进行了优化。通过重写依赖 TypeScript 类型信息的自定义 lint 规则，使其转而使用抽象语法树（AST）进行静态分析，从而使 ESLint 能够完全移除对 TypeScript 的依赖，将 API lint 时间减少 68%，全仓库 lint 时间减少 55%。这种优化也为后续迁移到 `Oxlint` 奠定了基础，进一步减少了 linting 过程中的 CI 运行器分钟数。

### HTTP Vary 头部与缓存的关联

在讨论 CI 优化和性能提升的同时，理解网络协议中的一些“丑陋”但重要的机制也至关重要。HTTP 的 `Vary` 响应头就被描述为“尚未改进的 HTTP 中最丑陋的部分”，它用于指示缓存哪些请求字段可能会影响响应。如果缓存忽略 `Vary`，可能会导致提供错误的响应内容。例如，同一 URL 可能根据浏览器的 `Accept` 头部返回不同格式的图片或内容。Cloudflare 现已支持 `Vary` 头部，允许用户更精细地控制缓存行为，根据实际情况决定是标准化、精确匹配还是绕过缓存，从而在保持缓存效率的同时，确保内容的一致性。

AI 驱动的开发模式要求 CI 系统具备更高的灵活性和效率。通过对基础设施、工具链、作业流程和代码检查进行系统性优化，并结合对网络协议细节的深入理解，可以有效应对 AI 时代开发加速带来的挑战，确保 CI 流程不再成为阻碍。

![AI coding has made CI a bottleneck, so we reworked ours to k](/assets/ai/ai-driven-development-acceleration-and-ci-challenges-and-opt/a4a4725cabbb.png)
*图：linear.app · [AI coding has made CI a bottleneck, so w](https://linear.app/now/ci-bottleneck-reworked)*

![We just shipped support for the ugliest part of HTTP: Vary](/assets/ai/ai-driven-development-acceleration-and-ci-challenges-and-opt/c741cb819f83.png)
*图：blog.cloudflare.com · [We just shipped support for the ugliest ](https://blog.cloudflare.com/vary-support)*

![CI 优化效果：34%|平均作业运行速度提升（第三方运行器）；52%|tsc 检查速度提升；73%|tsc 检查每周中位数时间缩短](/assets/ai/ai-driven-development-acceleration-and-ci-challenges-and-opt/79e8181285cd.svg)
*图：CI 优化效果（据 [linear.app](https://linear.app/now/ci-bottleneck-reworked)）*

![Linting 优化效果：68%|API lint 时间减少；55%|全仓库 lint 时间减少](/assets/ai/ai-driven-development-acceleration-and-ci-challenges-and-opt/1d86bdc765ef.svg)
*图：Linting 优化效果（据 [linear.app](https://linear.app/now/ci-bottleneck-reworked)）*

![HTTP Vary 头部描述：“The response header, Vary, has been called “the ugliest par](/assets/ai/ai-driven-development-acceleration-and-ci-challenges-and-opt/4b3e2853d059.svg)
*图：HTTP Vary 头部描述（据 [blog.cloudflare.com](https://blog.cloudflare.com/vary-support)）*

## 参考资料

1. [AI coding has made CI a bottleneck, so we reworked ours to keep up](https://linear.app/now/ci-bottleneck-reworked) — linear.app
2. [We just shipped support for the ugliest part of HTTP: Vary](https://blog.cloudflare.com/vary-support) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
