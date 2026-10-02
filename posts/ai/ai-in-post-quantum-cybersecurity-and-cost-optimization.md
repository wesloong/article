---
title: "AI 在后量子时代的网络安全与成本优化中的应用"
slug: ai-in-post-quantum-cybersecurity-and-cost-optimization
language: zh
summary: "随着量子计算的威胁日益临近，企业正加速向后量子密码学迁移。AI 技术在这一过程中扮演着关键角色，不仅能帮助发现和理解代码中的加密使用情况，还能优化 AI 应用的成本。Cloudflare 等公司正利用 AI 工具来应对这些挑战，确保网络安全并提高效率。"
tags: [AI, 后量子密码学, 网络安全, 成本优化]
draft: true
published_at: 2026-10-02
---

![AI 在后量子时代的网络安全与成本优化中的应用](/assets/ai/ai-in-post-quantum-cybersecurity-and-cost-optimization/6d583f004e06.svg)

随着全球对量子计算机的研发竞赛进入白热化阶段，企业正面临着向后量子（PQ）密码学迁移的紧迫任务。Cloudflare 设定了 2029 年实现全面后量子就绪的目标，并已将许多产品升级到后量子加密。然而，要实现平台级的全面就绪，还需要在后量子认证方面付出更多努力。这一大规模迁移的挑战在于，加密技术是几乎所有数字系统的基础，其复杂性体现在代码库分散、加密算法隐藏在共享库或配置文件中，以及需要超越简单模式匹配的深入分析。

## AI 驱动的加密发现与迁移

为了应对这些挑战，Cloudflare 开发了一个名为 CryptoLabe 的内部工具，该工具利用 AI 来辅助其后量子迁移工作。CryptoLabe 能够扫描代码库，理解加密算法的使用方式，并为迁移提供指导。该工具通过两个阶段进行工作：首先是“发现”阶段，它映射代码库并搜索源代码、配置文件、文档等中的加密使用情况，包括密钥协商、签名、非对称加密等。随后是“分析”阶段，AI 模型会重新检查发现的加密操作，分析其在运行时如何被使用，以及它依赖于哪些内部或外部方。AI 还能通过整合内部文档和工单系统等信息，丰富分析结果，并对发现进行分类，如“经典加密”、“经典签名”或“经典令牌”等。

AI 在此过程中展现了超越传统代码搜索（如 `grep`）的能力。AI 模型能够搜索代码库，追踪跨文件的证据，并返回结构化的分析结果。这对于理解诸如 RSA 或 ECDSA 等经典签名在 JWT、IPsec、TLS 或 SSH 等不同协议中的具体应用至关重要，因为每种应用都有不同的迁移路径。

![Using AI to chart a course for our post-quantum migration](/assets/ai/ai-in-post-quantum-cybersecurity-and-cost-optimization/ca21c52a3013.png)
*图：blog.cloudflare.com · [Using AI to chart a course for our post-](https://blog.cloudflare.com/ai-driven-cryptography-discovery)*

## AI 时代的应用安全新范式

AI 的发展不仅带来了后量子迁移的挑战，也改变了网络安全的面貌。AI 代理（Agents）能够自主发现漏洞、窃取凭证并协调攻击，其速度和持久性对传统安全措施构成了严峻考验。例如，OpenAI 和 Hugging Face 的基础设施曾遭到 AI 代理的攻击，攻击者在短时间内获得了跨多个集群的管理员访问权限。

面对这一新形势，应用安全需要从单一工具依赖转向更全面的框架。Cloudflare 提出了一个连接应用安全四个关键活动的框架：发现和优先排序风险、治理访问和代理行为、运行时保护应用，以及将每次调查转化为更强的防护能力。该框架的“发现和优先排序风险”阶段，特别关注软件组成风险（即应用对开源库的依赖）和专有代码的扫描。Cloudflare 的“漏洞发现与修复”服务利用前沿模型识别应用特定漏洞，并部署 WAF 缓解措施，同时连接代码发现与生产流量，以确定漏洞的可达性。

AI 驱动的开发也加速了软件的迭代速度，这可能导致更多漏洞在未被发现的情况下进入生产环境。此外，AI 还能实时变异载荷、规避防御，并自主做出决策，使得攻击速度远超系统更新的速度。因此，仅仅依赖快速打补丁已不足以应对威胁。

![Adaptive application security for the AI era: how Cloudflare](/assets/ai/ai-in-post-quantum-cybersecurity-and-cost-optimization/56e0d4baef96.png)
*图：blog.cloudflare.com · [Adaptive application security for the AI](https://blog.cloudflare.com/ai-era-framework)*

## AI 成本优化与智能路由

在 AI 应用日益普及的同时，管理 AI 使用成本也成为一个重要议题。Cloudflare 推出的 AI Gateway 的 Auto Router 功能，旨在通过智能路由来优化 AI 支出。该功能允许用户将模型设置为 `cloudflare/auto`，系统将自动将每个请求路由到最适合该任务且成本效益最高的模型，而无需用户手动选择。

内部测试表明，Auto Router 能够实现高达 30% 的成本节省，其性能与 OpenAI 的 GPT-6 Sol 和 Anthropic 的 Claude Opus 等前沿模型相当，但成本却显著降低。例如，在一次内部基准测试中，`cloudflare/auto` 的成功率达到 86.6%，而成本仅为 OpenAI Sol 的 80% 和 Anthropic Claude Opus 的 35%。

Auto Router 的工作原理是，首先根据请求格式、凭证、访问控制策略等因素构建可用模型池。然后，通过一个在 Workers AI 上运行的分类模型，评估请求的复杂性、模糊性、风险和上下文依赖性等维度。最后，结合模型基准测试结果和模型本身的输入输出价格，选择效用最高的模型。这种方法确保了在满足任务需求的前提下，尽可能降低成本，尤其是在处理大量日常工作任务时，效果更为显著。Auto Router 还能考虑缓存读写成本，在长会话中智能地决定是否切换模型，以进一步优化成本。

![AI 驱动的成本优化：30%|内部使用 Auto Router 节省成本；80%|cloudflare/auto 相较于 OpenAI Sol 的成本；35%|](/assets/ai/ai-in-post-quantum-cybersecurity-and-cost-optimization/840524cb093a.svg)
*图：AI 驱动的成本优化（据 [blog.cloudflare.com](https://blog.cloudflare.com/auto-router)）*

![AI 在后量子迁移中的作用：发现和理解代码中的加密使用；提供迁移进展的度量指标；提前识别迁移的先决条件；自动化分析和分类加密发现](/assets/ai/ai-in-post-quantum-cybersecurity-and-cost-optimization/61d0839b31da.svg)
*图：AI 在后量子迁移中的作用（据 [blog.cloudflare.com](https://blog.cloudflare.com/ai-driven-cryptography-discovery)）*

![AI 时代的安全挑战：“AI 代理能够持续工作、同时测试多个路径、共享发现成果，并将漏洞、凭证和权限串联起来形成复杂的攻击。”](/assets/ai/ai-in-post-quantum-cybersecurity-and-cost-optimization/dcfbc0044f5a.svg)
*图：AI 时代的安全挑战（据 [blog.cloudflare.com](https://blog.cloudflare.com/ai-era-framework)）*

## 参考资料

1. [Using AI to chart a course for our post-quantum migration](https://blog.cloudflare.com/ai-driven-cryptography-discovery) — blog.cloudflare.com
2. [Adaptive application security for the AI era: how Cloudflare connects code, traffic, and intelligence to stop attacks](https://blog.cloudflare.com/ai-era-framework) — blog.cloudflare.com
3. [Cut your AI spend with AI Gateway's Auto Router](https://blog.cloudflare.com/auto-router) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
