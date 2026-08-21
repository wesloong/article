---
title: "第 2 期"
slug: weekly-002
category: weekly
language: zh
summary: "本期 29 条：工程实践 11 · 工具与生态 10 · 系统设计 1 · 行业动态 3 · 其他 4"
ai_assisted: true
published_at: 2026-08-21
---

## 工程实践

- **[From all-or-nothing to task-based OAuth consent](https://blog.cloudflare.com/task-based-oauth-consent)** — Cloudflare 改进了 OAuth 授权流程，允许用户更精细地控制应用权限，这对于提升应用安全性和用户体验都很有价值。文章详细介绍了这一新功能及其背后的设计考量。
  <sub>via blog.cloudflare.com</sub>
- **[Agent评测漫谈 —— 由浅入深讲解Agent评测](https://tech.meituan.com/2026/08/07/Agent-Evaluation.html)** — 这篇博客深入浅出地介绍了Agent评测的体系构建和实践经验，对于理解如何科学地评估AI Agent的能力非常有帮助，特别是其中结合了美团两年的实战经验，具有很高的参考价值。
  <sub>via tech.meituan.com</sub>
- **[美团搜索3.0：LLM 语义表征在排序模型的探索与应用](https://tech.meituan.com/2026/08/20/01-meituan-Query-3.0.html)** — 美团搜索3.0的技术博客系列，聚焦LLM语义表征在排序模型中的探索与应用，详细阐述了从单点特征到系统性表征构建，再到跨场景迁移的实践过程，为理解大模型在搜索排序中的落地提供了具体思路。
  <sub>via tech.meituan.com</sub>
- **[The August 17 outage, and the work ahead](https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead)** — GitHub 博客详细复盘了 8 月 17 日的宕机事件，并阐述了后续的改进计划。对于关注大型系统稳定性和故障复盘的团队，这是非常有价值的案例分析。
  <sub>via github.blog</sub>
- **[HTML Can Do That](https://chrisburnell.com/html-can-do-that)** — 该文章深入探讨了 HTML 的一些不为人知但功能强大的特性，对于前端开发者来说，是学习和掌握原生 HTML 技巧、提升网页开发能力的好资源。
  <sub>via chrisburnell.com</sub>
- **[How to compromise your system with a job interview](https://codedge.de/posts/how-to-compromise-your-system-with-a-job-interview)** — 文章揭示了在招聘过程中可能存在的安全隐患，特别是如何利用技术面试环节来攻击应聘者系统，对于安全意识和系统加固有警示作用。
  <sub>via codedge.de</sub>
- **[PostgreSQL for Everything](https://raphaelbauer.com/posts/postgresql-everything)** — 探讨了 PostgreSQL 的广泛应用场景，对于需要处理各种数据需求的开发者来说，这是一篇关于数据库选型和实践的实用指南。
  <sub>via raphaelbauer.com</sub>
- **[Geolocating a random island using geometry and CUDA programming](https://yassa9.github.io/osint/gralhix-004)** — 文章介绍了如何利用几何学和 CUDA 编程来定位一个随机岛屿，展示了计算科学在地理定位和可视化方面的应用，对于对图形学和高性能计算感兴趣的开发者有参考价值。
  <sub>via yassa9.github.io</sub>
- **[A faster way to calculate the day of the week](https://benjoffe.com/fast-day-of-week)** — 提供了一种更快的计算星期几的方法，对于需要进行日期计算或算法优化的开发者来说，这是一个简洁高效的解决方案。
  <sub>via benjoffe.com</sub>
- **[Unlocking a locked/deactivated e-waste Cricut Maker](https://sprocketfox.io/xssfox/2026/07/01/cricut-unlock)** — 分享了如何解锁废弃的 Cricut Maker 打印机，对于硬件爱好者和需要进行设备维修或改造的开发者，这是一篇实用的技术教程。
  <sub>via sprocketfox.io</sub>
- **[Turns are Better than Radians (2022)](https://computerenhance.com/p/turns-are-better-than-radians)** — 从数学角度解释了为什么角度制比弧度制在某些情况下更直观，对于需要处理角度计算的开发者有启发性。
  <sub>via computerenhance.com</sub>

## 工具与生态

- **[正式开源！美团 LongCat-2.0 同步开放国产卡推理代码](https://tech.meituan.com/2026/07/12/LongCat-2.0-Open-source.html)** — 美团LongCat-2.0模型正式开源，其创新的稀疏注意力和N-gram Embedding技术，结合动态激活，显著提升了长上下文处理效率和代码理解、生成、执行能力，特别是在Agentic Coding任务上表现优异。
  <sub>via tech.meituan.com</sub>
- **[美团 LongCat-2.0 正式发布：在国产算力集群上完成全流程训练与推理的万亿参数模型](https://tech.meituan.com/2026/06/30/LongCat2.0.html)** — 美团LongCat-2.0模型在国产算力集群上完成训练和推理，是业界首个万亿参数模型，原生支持超长上下文，并专注于Agentic Coding任务，其架构设计和训练过程展示了在国产算力上构建大型AI模型的可能性。
  <sub>via tech.meituan.com</sub>
- **[Mojo is now open source](https://modular.com/blog/mojo-open-source)** — Mojo 语言正式开源，这是一个面向 AI 开发的高性能语言。其开源对于推动 AI 领域工具链的发展和社区协作具有重要意义。
  <sub>via modular.com</sub>
- **[Go 1.27](https://go.dev/blog/go1.27)** — Go 语言 1.27 的发布，通常会带来新特性和性能改进，对于 Go 开发者而言，这是了解语言最新进展和更新的重要信息。
  <sub>via go.dev</sub>
- **[Os8088.com: IBM XT OS now has a Browser, CP/M 2.2 with Z80 core and MS Word 1.1a](https://os8088.com/spotlight)** — 介绍了在浏览器中运行 IBM XT 操作系统及其应用的进展，对于怀旧技术和模拟器开发者来说，这是个有趣且信息量大的项目。
  <sub>via os8088.com</sub>
- **[Unsloth Dynamic 3.0 GGUFs](https://unsloth.ai/docs/basics/dynamic-3.0-ggufs)** — 介绍了 Unsloth 的 Dynamic 3.0 GGUFs 模型，对于关注大模型推理效率和优化的开发者，这提供了具体的性能提升信息。
  <sub>via unsloth.ai</sub>
- **[fx :Tiny, open, native coding agent.](https://fx.sh)** — 展示了一个名为 fx 的小型、开源、原生编码代理工具，对于希望自动化编码流程或探索新型开发者工具的读者来说，值得一看。
  <sub>via fx.sh</sub>
- **[Git at any scale](https://cursor.com/blog/git-at-any-scale)** — Cursor 团队分享了在处理大规模 Git 仓库时遇到的挑战以及解决方案，对于需要管理庞大代码库的团队来说，提供了实用的工程实践经验。
  <sub>via cursor.com</sub>
- **[Google has stopped pushing Git tags for some Android source code](https://grapheneos.social/@GrapheneOS/117057099753905023)** — Google 停止为部分 Android 源码推送 Git 标签，这可能影响开发者获取和管理源码的方式，值得关注其对 Android 开发生态的影响。
  <sub>via grapheneos.social</sub>
- **[AliExpress runs silent WebAudio fingerprinting that breaks Bluetooth multipoint](https://blog.laserphile.com/2026/08/aliexpress-webpage-keeping-multipoint.html)** — 揭示了 AliExpress 利用 WebAudio 指纹识别技术，可能影响蓝牙连接的隐私问题，值得关注前端安全和用户体验的开发者阅读。
  <sub>via blog.laserphile.com</sub>

## 系统设计

- **[DiffusionGemma Technical Report](https://arxiv.org/abs/2608.00146)** — DiffusionGemma 是 Google 的一个新模型，这篇技术报告深入探讨了其架构和性能，对于关注生成模型和多模态研究的开发者来说，是了解前沿技术的好材料。
  <sub>via arxiv.org</sub>

## 行业动态

- **[ICML 2026 | 美团技术团队学术论文精选](https://tech.meituan.com/2026/06/29/ICML-2026.html)** — 这篇文章介绍了ICML 2026会议，作为机器学习领域的顶级会议，它汇集了前沿研究成果，探讨了该领域面临的关键挑战和未来发展方向，对于了解机器学习的最新动态和趋势非常有价值。
  <sub>via tech.meituan.com</sub>
- **[OpenRouter is joining Stripe](https://openrouter.ai/blog/announcements/openrouter-is-joining-stripe)** — OpenRouter 被 Stripe 收购的消息，对于关注 AI 模型服务和支付整合的开发者来说，这是一个重要的行业动态，预示着未来服务的发展方向。
  <sub>via openrouter.ai</sub>
- **[Aaron Swartz was prosecuted for scraping, while Meta does it without consequence](https://blog.curiousquail.com/im-upset-again-about-a-co-creator-of-rss-being-prosecuted-for-something-meta-is-doing-with-little-consequence)** — 文章对比了 Aaron Swartz 因数据抓取被起诉与 Meta 类似行为却不受惩罚的现象，引发了对数据获取和使用中法律公平性的思考，具有一定的社会和行业洞察。
  <sub>via blog.curiousquail.com</sub>

## 其他

- **[还在reduce求和吗？该使用Math.sumPrecise()方法啦](https://zhangxinxu.com/wordpress/2026/08/js-math-sumprecise)** — 这篇博客指出了使用`Array.prototype.reduce`进行数组求和时可能存在的精度问题，并推荐使用`Math.sumPrecise()`方法，为开发者提供了更精确、简洁的数组求和解决方案。
  <sub>via zhangxinxu.com</sub>
- **[background-clip升级，支持边框或文字应用背景](https://zhangxinxu.com/wordpress/2026/08/background-clip-border-area-text)** — 文章介绍了`background-clip`属性的升级，使其能够原生支持在边框或文字上应用背景，这是一个非常实用的CSS新特性，能够实现更丰富的视觉效果，并且已经被主流浏览器支持。
  <sub>via zhangxinxu.com</sub>
- **[来了来了，Flex/Grid布局的间隙装饰线它来了](https://zhangxinxu.com/wordpress/2026/08/css-flex-grid-column-row-rule)** — Flex和Grid布局现在支持自定义间隙装饰线了，这解决了长期以来布局间隙美化的问题，并且提供了多属性值、交点中断等增强功能，使得布局设计更加灵活和精细。
  <sub>via zhangxinxu.com</sub>
- **[纯CSS实现repeat(–n, anything)循环展示或相加功能](https://zhangxinxu.com/wordpress/2026/07/css-custom-repeat-function)** — 文章展示了如何利用CSS的二进制分解和快速幂思想，实现`repeat()`函数循环展示或相加任意类型属性值的功能，这种巧妙的实现方式令人惊叹，为CSS的运用开辟了新的可能性。
  <sub>via zhangxinxu.com</sub>
