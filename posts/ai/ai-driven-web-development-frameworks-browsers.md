---
title: "AI 驱动的 Web 开发新浪潮：从框架到浏览器"
slug: ai-driven-web-development-frameworks-browsers
language: zh
summary: "本文探讨了 AI 在现代 Web 开发中的应用，重点介绍了 Vinext 框架如何利用 AI 提升 Next.js 应用的部署能力，以及 Kitesurf 浏览器如何为 AI 代理提供更高效、更智能的 Web 交互体验。同时，也关注了 Web 性能的真实用户测量数据，揭示了性能瓶颈和优化方向。"
tags: [AI, Web开发, Vinext, Kitesurf]
draft: true
published_at: 2026-09-29
---

![AI 驱动的 Web 开发新浪潮：从框架到浏览器](/assets/ai/ai-driven-web-development-frameworks-browsers/dcfc731891e2.svg)

人工智能正以前所未有的方式重塑软件开发的面貌，尤其是在 Web 开发领域。从框架的构建到浏览器的交互，AI 的身影无处不在，驱动着效率的提升和体验的革新。

## AI 赋能的 Web 框架：Vinext 1.0 的诞生

Vinext 的诞生本身就是一个 AI 驱动的实验的产物。最初，它是一个在一周内完成的、由 AI 辅助的工程项目，旨在探索如何复制一个由 Vite 支持的 Next.js 框架 [资料 1]。经过七个月的发展，Vinext 已成长为一个成熟的框架，并在生产环境中得到广泛应用。Vinext 1.0 的发布标志着其在兼容性、稳定性和缓存机制方面取得了显著的进步，使得 Next.js 应用能够更轻松地部署到各种平台，包括 Cloudflare Workers、Netlify 或 AWS Lambda [资料 1]。

Vinext 的核心优势在于其对 Next.js 的 Pages Router 和 App Router 的全面支持，甚至包括 React Server Components、Server Actions 等高级特性。其测试兼容性已超过 99%，这得益于社区的积极反馈和严格的测试流程。Vinext 不仅模仿函数名，更致力于精确复制 Next.js 的行为，确保其在页面渲染、缓存和请求处理方面与原生 Next.js 一致 [资料 1]。

在性能优化方面，Vinext 引入了“缓存预热”（Cache Warming）的概念，将页面预渲染从构建时迁移到 Cloudflare 的网络中。这种方式能够根据实际流量动态调整渲染优先级，避免在构建过程中浪费大量时间渲染低流量页面，从而显著提升部署后的响应速度 [资料 1]。

Vinext 1.0 的发布也带来了对 Next.js 生态系统的广泛兼容，支持常见的模式，如身份验证、MDX、图像优化、字体、环境变量等。同时，它还提供了与 OpenTelemetry 和 Sentry 兼容的分布式追踪能力，并与 Cloudflare Workers 的原生可观测性集成 [资料 1]。

![Next.js applications, powered by Vite: introducing Vinext 1.](/assets/ai/ai-driven-web-development-frameworks-browsers/219b2bf10783.png)
*图：blog.cloudflare.com · [Next.js applications, powered by Vite: i](https://blog.cloudflare.com/vinext-nextjs-on-vite)*

## Agentic Browser：Kitesurf 的智能化升级

在另一个前沿领域，AI 代理（Agent）的 Web 交互方式也在发生变革。Kitesurf，一个完全运行在 Cloudflare Workers 上的浏览器，正是为 Agentic Age 而设计的 [资料 2]。与为人类设计的传统浏览器不同，Kitesurf 专注于 Agent 所需的功能，并进行了大量的内部优化，以降低延迟，让 AI 代理能更专注于推理而非等待浏览器响应。

Kitesurf 的一个重要进展是支持 WebMCP（Web Mechanism for Communicating with Programs）。这项技术允许开发者直接将网站功能暴露给 AI 代理，使代理能够调用如 `searchFlights()` 这样的函数，而非模拟用户点击操作。通过 WebMCP，AI 代理可以更可靠地与网站交互，完成复杂任务 [资料 2]。

此外，Kitesurf 在 API 支持方面也取得了长足进步，增加了对 CSS Layout、CSS Object Model (CSSOM)、CSS Typed OM、Custom Elements 等更多 Web 标准的支持。它还优化了 JavaScript 执行效率，减少了引擎间的通信开销，并改进了对 iframe、模块解析和字体加载的处理 [资料 2]。

Kitesurf 的另一个亮点是其在终端环境下的运行能力。通过将渲染逻辑分离，Kitesurf 可以在终端中渲染网页，这不仅方便了开发者快速预览页面，也让他们能够以 AI 代理的视角来理解页面结构和内容 [资料 2]。

![The road to the agentic browser: A Kitesurf update](/assets/ai/ai-driven-web-development-frameworks-browsers/4308fc3f2e23.png)
*图：blog.cloudflare.com · [The road to the agentic browser: A Kites](https://blog.cloudflare.com/kitesurf-update)*

## Web 性能的真实视角：BEACON 数据集

无论是框架的优化还是代理的交互，最终都指向一个核心目标：提升 Web 性能。Cloudflare BEACON 数据集提供了数十亿真实用户测量数据，揭示了 Web 在不同设备、浏览器和地区上的实际性能表现 [资料 3]。

BEACON 数据集包含了核心 Web 指标（Core Web Vitals），如 LCP（最大内容绘制）、CLS（累积布局偏移）和 INP（下次绘制的交互响应）。通过提供详细的百分位数数据，BEACON 能够揭示行业在为所有用户提供快速体验方面仍然面临的挑战 [资料 3]。

数据显示，在某些地区，如柬埔寨，WebKit 浏览器（iOS 上的唯一引擎）的 LCP 指标比 Blink 浏览器（如 Chrome、Edge）差 50% [资料 3]。在行业分类方面，广告、宗教和天气类网站的性能通常最差 [资料 3]。

BEACON 还深入分析了 LCP 和 INP 的子部分，指出影响加载速度的主要瓶颈往往在于发现 LCP 候选元素和解除渲染阻塞，而非下载资源本身。对于交互响应，JavaScript 执行时间和复杂的 CSS 布局计算是导致延迟的主要原因 [资料 3]。

特别值得关注的是，对于使用 React、Vue 等框架构建的单页应用（SPA），其“软导航”（Soft Navigations）比“硬导航”（Hard Navigations）快两到三倍。然而，SPA 的初始着陆页通常加载较慢，这需要在更快的后续导航和更慢的首次体验之间进行权衡 [资料 3]。

AI 在 Web 开发中的应用，无论是通过 Vinext 提升框架的部署和性能，还是通过 Kitesurf 赋能 AI 代理的智能交互，亦或是通过 BEACON 数据集洞察 Web 性能的真实状况，都共同指向一个更高效、更智能、更普惠的 Web 未来。

![Vinext 1.0 关键改进：99%|测试兼容性（不含缓存组件）；2|部署 Next.js 应用到任意平台；10000+|支持的网站（BEACON 数据集）](/assets/ai/ai-driven-web-development-frameworks-browsers/8cbb7bd07c80.svg)
*图：Vinext 1.0 关键改进（据 [blog.cloudflare.com](https://blog.cloudflare.com/vinext-nextjs-on-vite)）*

![Kitesurf 支持的 Web 标准：WebMCP；CSS Layout；CSSOM；Custom elements](/assets/ai/ai-driven-web-development-frameworks-browsers/994c5c36cb6e.svg)
*图：Kitesurf 支持的 Web 标准（据 [blog.cloudflare.com](https://blog.cloudflare.com/kitesurf-update)）*

![Web 性能指标（LCP 子部分 - 良好阈值）：598ms|文档 TTFB；76ms|加载延迟；119ms|加载时长；157ms|渲染延迟](/assets/ai/ai-driven-web-development-frameworks-browsers/7694df48de0c.svg)
*图：Web 性能指标（LCP 子部分 - 良好阈值）（据 [blog.cloudflare.com](https://blog.cloudflare.com/how-fast-is-the-web)）*

## 参考资料

1. [Next.js applications, powered by Vite: introducing Vinext 1.0](https://blog.cloudflare.com/vinext-nextjs-on-vite) — blog.cloudflare.com
2. [The road to the agentic browser: A Kitesurf update](https://blog.cloudflare.com/kitesurf-update) — blog.cloudflare.com
3. [How fast is the web? Explore billions of real-user measurements with BEACON](https://blog.cloudflare.com/how-fast-is-the-web) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
