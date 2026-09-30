---
title: "AI 驱动的安全新前沿：应对智能攻击与强化防御"
slug: ai-driven-security-new-frontier
language: zh
summary: "随着 AI 模型能力的飞速发展，它们正被用于生成更复杂的网络攻击，并以前所未有的速度迭代攻击载荷。本文探讨了 AI 在安全领域的双重角色，包括其作为攻击工具的潜力，以及如何利用 AI 技术（如应用画像和自适应 WAF）来增强防御能力，以应对日益增长的安全挑战。"
tags: [AI, 网络安全, WAF, 应用画像]
draft: true
published_at: 2026-09-30
---

![AI 驱动的安全新前沿：应对智能攻击与强化防御](/assets/ai/ai-driven-security-new-frontier/8c1a89d21576.svg)

人工智能（AI）的崛起不仅在各行各业带来了颠覆性的变革，也在网络安全领域引发了新的挑战与机遇。特别是大型语言模型（LLMs）的出现，使得攻击者能够以前所未有的速度和复杂性来生成和迭代攻击载荷，对现有的安全防护体系提出了严峻考验。

## AI 作为攻击工具的演进

传统的网络攻击往往依赖人工的经验和有限的自动化工具，而 AI 模型，特别是 LLMs，能够极大地加速这一过程。它们擅长快速迭代和变异攻击载荷，远超人类黑客的能力范围。通过实时分析应用程序的响应，LLMs 可以动态调整其攻击策略，例如尝试不同的编码方式、改变载荷在 HTTP 请求中的位置，或是迅速转向下一个潜在的漏洞进行探测。

在评估 Web 应用防火墙（WAF）的有效性时，研究人员采用了一种动态方法，让 LLM 模拟黑客的行为。这种测试方法中，LLM 无法访问源代码或 WAF 的规则，只能依据有限的 HTTP 响应数据进行决策。通过从已知的漏洞开始，不断尝试修改编码或传递方式，并利用 WAF 的反馈来选择下一次变异，这种自适应的测试系统能够有效地评估 WAF 的防御能力。在一次针对六种攻击类别的测试中，研究人员记录了 1,107 次尝试，结果显示 Cloudflare WAF 在大多数情况下成功阻止了攻击，但少数绕过 WAF 的请求为改进检测机制提供了宝贵线索 [1]。

LLMs 的能力也使得非技术人员能够通过简单的提示词发起攻击，这使得安全防护的重心必须从“更快地打补丁”转向更主动的防御策略 [2]。

![We tested our own WAF with frontier AI models. Here’s what w](/assets/ai/ai-driven-security-new-frontier/c149a9632f54.png)
*图：blog.cloudflare.com · [We tested our own WAF with frontier AI m](https://blog.cloudflare.com/adaptive-ai-waf-testing)*

## AI 驱动的防御新策略

面对 AI 驱动的攻击，安全领域也在积极探索利用 AI 来强化自身防御。一种关键的策略是“应用画像”（Application Profiles），它通过分析应用程序的正常 HTTP 请求结构和格式，来定义一个“正向安全策略”。这意味着，与其仅仅寻找已知的攻击模式，不如专注于允许那些符合预期模式的请求 [2]。

通过学习应用程序的流量结构，系统可以识别出哪些请求是“好的”。例如，如果一个搜索字段不应包含特殊字符，那么系统就可以仅接受字母数字字符串，从而阻止大量的已知攻击。应用画像能够推断出每个操作的目标，并理解应用程序的功能，进而识别和优先处理最关键、最易受攻击的操作和字段 [2]。

Cloudflare 的应用画像功能通过分析观测到的流量来学习预期的请求结构，包括路径变量、查询参数、请求头、Cookie 以及请求体结构。系统会学习每个字段的数据类型和约束条件，如数值范围、字符串长度等。一旦学习到应用画像，一个持续的验证层就会在实时流量上部署，识别不符合画像的请求。与传统的 WAF 不同，验证失败不一定意味着匹配了已知的攻击特征，而可能是值超出预期范围、出现未知枚举值、无效的 UUID 或意外字符等。这种方法能够有效减少攻击者可利用的输入范围，从而阻止 SQL 注入、跨站脚本等多种攻击向量 [2]。

在测试中，研究人员发现，即使是针对 SSRF 漏洞的攻击，通过改变 IP 地址的表示形式（如整数、八进制、带尾点的形式）或将其置于请求的不同位置，也可能绕过 WAF。在一次实验中，一个原本被 WAF 阻止的 IP 地址，在尝试了多种变体后，最终通过一个重定向而非 WAF 阻止页面得以绕过 [1]。这表明，即使是成熟的 WAF，也需要不断适应和学习新的攻击变体。

![Enforce positive security with Cloudflare Application Profil](/assets/ai/ai-driven-security-new-frontier/5edaf248b027.png)
*图：blog.cloudflare.com · [Enforce positive security with Cloudflar](https://blog.cloudflare.com/application-profiles)*

## 应对未来威胁：后量子密码学与协议演进

除了 AI 带来的挑战，网络安全领域还在为应对“后量子”（PQ）时代做准备。随着量子计算机的发展，现有的加密算法可能面临被破解的风险。虽然向 PQ 密码学的迁移正在进行中，但在此期间，保持对经典密码学的支持以兼容现有终端是必要的。然而，这种兼容性也带来了“降级攻击”的风险，即攻击者诱导通信双方使用比其支持的更弱的加密算法 [3]。

例如，在 IPsec 协议中，即使支持 PQ 认证，也存在一种更复杂的降级攻击，可能允许量子攻击者在实时协议握手中解密所有通信流量。为了应对这一威胁，Cloudflare 参与了 IETF 的工作，开发了一种为 IPsec 增加降级保护机制的扩展。该机制需要通信双方都支持才能生效 [3]。

IPsec 作为网络基础设施的核心组件，其协议的演进对于保障通信安全至关重要。尽管面临量子计算的潜在威胁，IPsec 也在积极适应，例如通过预共享密钥实现 PQ 认证，并且正在采纳 PQ 密钥协议。这表明 IPsec 生态系统有能力适应不断变化的安全威胁 [3]。

总而言之，AI 技术正以前所未有的方式重塑网络安全格局。一方面，它为攻击者提供了更强大的工具；另一方面，它也为防御者带来了更智能的解决方案。通过结合自适应 WAF、应用画像等 AI 驱动的防御技术，以及积极拥抱后量子密码学等前沿安全研究，我们才能更好地应对未来日益复杂和严峻的网络安全挑战。

![AI 驱动的 WAF 测试发现：1107|记录的攻击尝试总数；6|测试的攻击类别数量](/assets/ai/ai-driven-security-new-frontier/a7d094e669a5.svg)
*图：AI 驱动的 WAF 测试发现（据 [blog.cloudflare.com](https://blog.cloudflare.com/adaptive-ai-waf-testing)）*

![应用画像学习内容：路径变量；查询参数；请求头和 Cookie；请求体结构](/assets/ai/ai-driven-security-new-frontier/99a4ff7f4745.svg)
*图：应用画像学习内容（据 [blog.cloudflare.com](https://blog.cloudflare.com/application-profiles)）*

![AI 在安全领域的挑战：“Every customer we speak to wants to know how we can protect](/assets/ai/ai-driven-security-new-frontier/00a4889cb838.svg)
*图：AI 在安全领域的挑战（据 [blog.cloudflare.com](https://blog.cloudflare.com/application-profiles)）*

## 参考资料

1. [We tested our own WAF with frontier AI models. Here’s what we found](https://blog.cloudflare.com/adaptive-ai-waf-testing) — blog.cloudflare.com
2. [Enforce positive security with Cloudflare Application Profiles](https://blog.cloudflare.com/application-profiles) — blog.cloudflare.com
3. [Preventing quantum downgrade attacks against IPsec](https://blog.cloudflare.com/ipsec-downgrade-protection) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
