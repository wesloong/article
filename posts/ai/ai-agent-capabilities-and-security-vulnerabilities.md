---
title: "AI Agent Capabilities and Security Vulnerabilities: A Dual Focus"
slug: ai-agent-capabilities-and-security-vulnerabilities
language: zh
summary: "This article explores the evolving capabilities of AI agents, particularly in professional domains like tax, while also addressing critical security vulnerabilities found in AI models. It highlights t"
tags: [AI Agents, Security, Benchmarks, LLMs]
draft: true
published_at: 2026-10-29
---

![AI Agent Capabilities and Security Vulnerabilities: A Dual Focus](/assets/ai/ai-agent-capabilities-and-security-vulnerabilities/090d7107f5f7.svg)

人工智能（AI）在各个领域的应用正以前所未有的速度扩展，从复杂的专业任务到基础模型的安全保障，都成为关注的焦点。一方面，AI代理在处理专业性极强的工作时展现出惊人的潜力，另一方面，AI模型本身的安全漏洞也日益凸显，需要引起高度重视。

## AI代理在专业领域的应用与挑战

AI代理在处理需要专业知识、复杂材料和非明确指令的复杂任务方面正变得越来越强大。以税务领域为例，Surge AI推出的DAYJOB: Tax基准测试，评估AI代理在专业税务工作中的表现。该基准测试包含50个环境，覆盖了个人和家庭税务、小企业税务、合伙企业、财产与投资、遗产、赠与与信托、国际税务、公司交易以及税务审查与争议等八个领域。

在这些测试中，AI代理需要处理客户请求和支持记录，并生成税务申报表、工作底稿、技术审查或客户建议。这些任务不仅考验AI的税务知识、计算能力、信息检索和指令遵循能力，更重要的是，它们测试AI的专业判断力。例如，一个AI代理在评估客户出售房产的两个不同时间点的税务影响时，虽然正确计算了税收减免，却忽略了一个可能影响客户资格的重要截止日期。

另一个案例中，AI代理在处理一对夫妇如何分割退休账户时，基于“未婚”的假设，给出了可能不准确的建议，而忽略了客户可能已在其他州合法结婚的线索。这些案例表明，尽管AI在信息处理和计算方面表现出色，但在识别潜在风险、处理不完整信息和做出需要深刻专业判断的决策方面，仍存在显著的局限性。目前，在DAYJOB: Tax基准测试中，Claude Sonnet 5.5以10.8%的通过率领先，显示出AI在专业领域仍有较大的提升空间。

![Cross-request KV cache exposure in the GLM-5.3 Workers AI mo](/assets/ai/ai-agent-capabilities-and-security-vulnerabilities/e8cfe30866ce.png)
*图：blog.cloudflare.com · [Cross-request KV cache exposure in the G](https://blog.cloudflare.com/kv-cache-exposure-remediation)*

## AI模型的安全漏洞与修复

与AI能力的飞速发展并行的是其潜在的安全风险。近期，Cloudflare披露了其GLM-5.3 Workers AI模型中存在的一个跨请求KV缓存暴露（cross-request KV cache exposure）的安全漏洞。该漏洞源于两个重叠的问题：一是SGLang（Cloudflare使用的开源推理引擎）的错误配置，二是SGLang在处理超出KV缓存容量的请求时存在的一个bug。

具体而言，GLM 5.3模型配置的上下文窗口为1,048,576个token，但预填充GPU上的KV缓存池容量仅为681,280个token。当用户发送的提示超过KV缓存容量时，SGLang未能正确处理，导致解码节点接收到包含先前用户请求数据的KV缓存。这使得在8月27日至9月9日期间，有155个响应可能包含了其他客户的请求数据。值得庆幸的是，该漏洞仅影响了GLM 5.3模型，且在发现后迅速得到了修复。Cloudflare通过调整配置，使KV缓存池容量足以容纳完整的上下文长度，并对SGLang引擎进行了补丁修复，确保了请求被安全地拒绝或处理，从而消除了该漏洞。

![Dayjob: Tax – evaluating AI agents on 50 professional tax as](/assets/ai/ai-agent-capabilities-and-security-vulnerabilities/cade2e862768.png)
*图：surgehq.ai · [Dayjob: Tax – evaluating AI agents on 50](https://surgehq.ai/blog/dayjob-tax)*

## 综合视角：能力提升与安全加固并重

GLM-5.3模型的安全事件以及DAYJOB: Tax基准测试的结果，共同揭示了AI发展中的一个重要趋势：在追求更强大、更智能的AI能力的同时，必须同等重视AI系统的安全性和可靠性。AI代理在专业领域的应用，如税务咨询，展现了其巨大的潜力，能够处理海量数据并提供初步的分析。然而，如DAYJOB: Tax所示，AI在理解复杂情境、识别隐含风险和做出审慎判断方面仍需人工的监督和指导。

另一方面，KV缓存暴露这样的安全漏洞，则提醒开发者和用户，即使是成熟的AI模型和推理引擎，也可能存在设计或配置上的缺陷。这些缺陷可能导致敏感数据泄露，对用户隐私和系统安全构成严重威胁。因此，持续的安全审计、严格的配置管理以及对开源组件的深入理解和贡献，对于保障AI系统的安全运行至关重要。

未来，AI的发展需要在能力边界的拓展和安全防护的加固之间找到平衡。一方面，需要通过更精细化的基准测试来评估AI在特定专业领域的真实表现，识别其短板并加以改进。另一方面，必须建立更健壮的安全机制，防止潜在的漏洞被利用，确保AI技术在可信赖的环境中发展和应用。

![GLM-5.3 KV Cache Vulnerability Impact：155|Affected responses；681280|Token limit](/assets/ai/ai-agent-capabilities-and-security-vulnerabilities/1bb70974cef3.svg)
*图：GLM-5.3 KV Cache Vulnerability Impact（据 [blog.cloudflare.com](https://blog.cloudflare.com/kv-cache-exposure-remediation)）*

![DAYJOB: Tax Benchmark Performance：10.8%|Claude Sonnet 5.5 pass rate；9.6%|Claude](/assets/ai/ai-agent-capabilities-and-security-vulnerabilities/090da18b16fa.svg)
*图：DAYJOB: Tax Benchmark Performance（据 [surgehq.ai](https://surgehq.ai/blog/dayjob-tax)）*

![DAYJOB: Tax Benchmark Areas：Individual and family tax；Small-business tax；Partner](/assets/ai/ai-agent-capabilities-and-security-vulnerabilities/933ad569336c.svg)
*图：DAYJOB: Tax Benchmark Areas（据 [surgehq.ai](https://surgehq.ai/blog/dayjob-tax)）*

## 参考资料

1. [Cross-request KV cache exposure in the GLM-5.3 Workers AI model, and our remediation with SGLang](https://blog.cloudflare.com/kv-cache-exposure-remediation) — blog.cloudflare.com
2. [Dayjob: Tax – evaluating AI agents on 50 professional tax assignments](https://surgehq.ai/blog/dayjob-tax) — surgehq.ai


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
