---
title: "AI Agents重塑互联网格局：从安全运营到内容经济"
slug: ai-agents-reshaping-internet-landscape
language: zh
summary: "互联网正经历由AI代理驱动的深刻变革。AI代理不仅颠覆了安全运营模式，提高了效率，还在重塑内容经济，为创作者带来新的商业机遇。本文探讨了AI代理在安全领域的应用，以及它们如何推动互联网向“第二受众”时代演进，并催生新的支付和变现模式。"
tags: [AI代理, 互联网经济, 安全运营, 内容变现]
draft: true
published_at: 2026-10-08
---

![AI Agents重塑互联网格局：从安全运营到内容经济](/assets/ai/ai-agents-reshaping-internet-landscape/9c97554fd055.svg)

互联网正经历一场由AI代理驱动的深刻变革，这不仅体现在安全运营的智能化升级，也体现在内容经济的新兴模式。AI代理作为互联网的“第二受众”，正在重塑我们对网络交互和价值创造的认知。

## AI驱动的安全运营新范式

传统的安全运营面临着海量告警的挑战，单个告警可能引发环境中的连锁反应，而多个告警同时涌现则极易使人类分析师不堪重负。Cloudflare提出的“代理式安全运营”[资料 1]正是为了应对这一“告警悖论”。通过构建内置的多AI代理安全运营系统，Cloudflare能够加速数据收集、关联检测、弥补信息缺失等工作，显著提升了安全事件的处理效率。

过去，单一的通用AI代理在处理安全任务时暴露出局限性，例如“语境即权威”导致误判、范围漂移以及失败信息被掩盖等问题[资料 1]。为解决这些挑战，Cloudflare转向了“先侦察，后推理”的策略。在进行AI推理之前，通过确定性代码执行一系列侦察工作，收集客户身份、历史告警、流量基线等信息，并将这些数据与来源、版本、时间戳一同存储。这种方法确保了评估的可复现性，使得不同AI代理之间的差异仅源于解释而非数据检索[资料 1]。

此外，为了过滤噪音，一个轻量级的分类模型被用于初步评估告警。该模型会比对告警与侦察数据，判断其是否为重复的误报。得分高的误报告警将跳过专业AI代理的深入分析。对于需要进一步审查的告警，则会启动一个协调AI代理，并行运行四个专业AI代理：流量分析、客户上下文、全球遥测和威胁情报。最后，一个综合AI代理将这些专业代理的输出整合成一份报告，提供洞察和下一步建议，但其无法自行获取新证据或选择预设词汇之外的分类[资料 1]。这种多代理协作模式，将每个任务的范围限定在特定领域，从而更容易发现不被支持的声明，并使建议更易于审计。

值得注意的是，全球遥测专业代理在分析时仅使用聚合数据，严格保护客户隐私，确保了在提供全球视野的同时，不泄露客户的个体数据[资料 1]。

![Building an evidence-grounded agentic security operations ha](/assets/ai/ai-agents-reshaping-internet-landscape/0c6659842ad8.png)
*图：blog.cloudflare.com · [Building an evidence-grounded agentic se](https://blog.cloudflare.com/agentic-security-operations)*

## 互联网的“第二受众”与内容经济的重塑

互联网的用户构成正在发生根本性变化。过去，互联网的主要受众是人类，但如今，AI代理已成为一股不可忽视的力量。Cloudflare的数据显示，到2024年底，其网络平均每秒处理6300万次HTTP请求，而到2024年已翻倍至1.15亿次，峰值甚至超过1.5亿次。过去一年，AI代理产生的日均请求量增长超过1700%，首次出现非人类流量占据互联网流量一半以上的情况[资料 2]。

这种变化对传统的互联网经济模式构成了挑战。过去，网站通过搜索引擎优化吸引人类访客，再通过广告或订阅实现盈利。然而，AI代理（如“答案引擎”）能够直接阅读页面并提供摘要，这消耗了网站的带宽，却未能将用户导向产生收入的网站。一些高度被抓取的行业，如零售、计算机软件、IT与服务以及金融服务，在不到一年的时间里，人类流量下降了高达40%[资料 2]。这导致了“每请求收入下降，成本却在上升”的困境。

面对这一趋势，Cloudflare提出了“代理经济”（Agentic Internet）的概念，并推出了相应的解决方案。其核心在于帮助网站识别、管理并从AI代理流量中获益。通过AI Crawl Control、Business Insights和BotBase等工具，网站可以了解哪些代理在访问、它们获取了什么内容、返回了什么信息，以及最常访问的URL[资料 2]。Web Bot Auth则允许OpenAI、Google和AWS等运营商对其代理的请求进行加密签名，从而区分真实代理和仿冒者[资料 2]。

为了更好地服务这一“第二受众”，Cloudflare推出了精细化的访问控制选项，允许网站主根据不同类型的代理（搜索、代理、训练）设置访问规则。例如，对于广告支持的网站，可以禁止AI代理访问承载广告的页面，因为广告收入依赖于人类的观看[资料 2]。

在支付和变现方面，Cloudflare推出了“按使用付费”（Pay Per Use）服务和“货币化网关”（Monetization Gateway）。“按使用付费”旨在为无法获得定制许可协议的大多数网站提供解决方案，它不为爬取收费，而是在内容被实际使用时才进行收费。买家是经过验证的爬虫，Cloudflare会跟踪并核实使用报告，然后向买家收费并向发布者付款。这为内容创作者提供了一个反馈循环，帮助他们了解用户真正需要什么，并据此更新内容或提供更多可用资源[资料 2]。Cloudflare Containers的重构也为代理沙箱的扩展提供了支持[资料 3]。

总而言之，AI代理的兴起不仅是技术上的飞跃，更是对互联网生态系统的一次全面重塑。从提升安全效率到开辟新的商业模式，AI代理正引领互联网迈向一个更加智能、互联且充满机遇的新时代。

![The Internet has a second audience](/assets/ai/ai-agents-reshaping-internet-landscape/03f01cbf6754.png)
*图：blog.cloudflare.com · [The Internet has a second audience](https://blog.cloudflare.com/agentic-web)*

![AI代理流量增长：1700%|日均请求量增长；50%|非人类流量占比](/assets/ai/ai-agents-reshaping-internet-landscape/7d6306a594f3.svg)
*图：AI代理流量增长（据 [blog.cloudflare.com](https://blog.cloudflare.com/agentic-web)）*

![AI代理在安全运营中的挑战：语境即权威，易致误判；范围漂移，查询不准确；失败信息被掩盖](/assets/ai/ai-agents-reshaping-internet-landscape/5837bf82c115.svg)
*图：AI代理在安全运营中的挑战（据 [blog.cloudflare.com](https://blog.cloudflare.com/agentic-security-operations)）*

![互联网的第二受众：For the first time, more than half of Internet traffic wasn'](/assets/ai/ai-agents-reshaping-internet-landscape/7b52a339c0cb.svg)
*图：互联网的第二受众（据 [blog.cloudflare.com](https://blog.cloudflare.com/agentic-web)）*

## 参考资料

1. [Building an evidence-grounded agentic security operations harness on Cloudflare](https://blog.cloudflare.com/agentic-security-operations) — blog.cloudflare.com
2. [The Internet has a second audience](https://blog.cloudflare.com/agentic-web) — blog.cloudflare.com
3. [Everything we launched during Birthday Week 2026](https://blog.cloudflare.com/birthday-week-2026-wrap-up) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
