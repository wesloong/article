---
title: "AI 在模拟终端和网络安全中的应用"
slug: ai-in-simulated-terminals-and-cybersecurity
language: zh
summary: "本文探讨了人工智能在模拟终端环境以及网络安全领域的最新进展。一方面，AI正被用于训练能够精确模仿真实终端行为的模型，实现复杂交互和代码执行的模拟。另一方面，AI技术也在网络安全中扮演关键角色，例如通过先进的WAF技术防御新型漏洞，以及在安全事件响应中提供支持。"
tags: [AI, 模拟终端, 网络安全, WAF]
draft: true
published_at: 2026-10-22
---

![AI 在模拟终端和网络安全中的应用](/assets/ai/ai-in-simulated-terminals-and-cybersecurity/0af5e9dfaef8.svg)

人工智能（AI）正在以前所未有的方式渗透到技术领域的各个层面，从模拟复杂交互环境到构筑强大的网络安全防线，其应用场景日益广泛。

## AI 驱动的模拟终端环境

AI在模拟终端交互方面取得了显著进展。例如，一个基于Qwen2.5-Coder-0.5B模型微调的3.6亿参数模型，能够模拟一个完整的终端环境 [资料 3]。这个模型并非连接到真实的shell或文件系统，而是通过接收用户的每一次按键输入，并预测屏幕的变化来运作。它能够执行诸如创建文件、运行Vim和Tmux、甚至玩贪吃蛇等操作，并且在一定程度上能够记住之前的输入和状态 [资料 3]。

为了实现这种模拟，研究人员将终端视为一个字符网格，模型接收描述屏幕内容和变化的序列化数据。每一次按键输入被转化为终端发送的原始字节序列。模型的输出则指示需要重写的屏幕行以及光标的新位置。为了提高效率，模型还引入了“复制”操作，允许它通过引用之前的屏幕行来快速更新屏幕，这对于处理屏幕滚动、清屏或在Vim中插入/删除行等操作尤为重要 [资料 3]。

在训练过程中，为了让模型更好地处理错误和保持一致性，采用了类似DAgger的方法，让模型从自身访问的状态中学习，并学会“修复”自己的错误。通过比较模型预测的屏幕与真实记录的屏幕之间的差异，并构建修正，模型能够从错误中学习，而不是仅仅依赖于理想化的演示 [资料 3]。这种训练方法显著提高了模型的鲁棒性。

![OpenAI CLI](/assets/ai/ai-in-simulated-terminals-and-cybersecurity/82a87b77808c.png)
*图：github.com · [OpenAI CLI](https://github.com/openai/openai-cli)*

## AI 在网络安全领域的应用

在网络安全领域，AI同样发挥着至关重要的作用。近期，PHP环境中发现的两类名为php2shell的漏洞（CVE-2026-109618和CVE-2026-109619），可能允许攻击者执行远程代码、导致拒绝服务或暴露数据 [资料 2]。这些漏洞影响了运行PHP 5.4及以上版本的Web服务器，鉴于PHP广泛应用于WordPress和Magento等平台，其潜在影响巨大。

为了应对这些威胁，Cloudflare等公司积极部署了Web应用防火墙（WAF）防护措施。这些防护措施利用了“全事务检测”能力，该能力结合了HTTP请求和响应的信号，能够更准确地识别恶意流量，并减少误报 [资料 2]。例如，Cloudflare在漏洞公开前就部署了相关WAF规则，并持续监控和更新规则以应对攻击者不断变化的攻击载荷。这些防护措施对所有使用WAF的客户（包括免费用户）均默认可用 [资料 2]。

值得注意的是，尽管WAF提供了额外的安全层，但最终的解决方案仍需用户更新PHP软件本身。安全分析师们持续监控攻击活动，并在必要时更新防护规则 [资料 2]。

此外，OpenAI也推出了其官方的命令行接口（CLI）工具，用于与OpenAI REST API进行交互 [资料 1]。该CLI支持多种命令，包括管理文件、生成图像以及执行管理任务等，为开发者提供了一个便捷的工具来利用OpenAI的服务。虽然资料1主要介绍CLI工具本身，但它也间接展示了AI服务如何通过易用的接口触达开发者，从而可能在各种应用场景中被集成，包括安全相关的自动化任务。

AI在模拟终端和网络安全领域的应用，展示了其在提升交互体验和构筑数字世界安全屏障方面的巨大潜力。从能够理解并响应复杂指令的模拟环境，到能够抵御新型网络攻击的智能防御系统，AI正成为推动技术进步和保障网络空间安全的关键力量。

![Cloudflare deploys protections against php2shell vulnerabili](/assets/ai/ai-in-simulated-terminals-and-cybersecurity/01a7f4944cfd.png)
*图：blog.cloudflare.com · [Cloudflare deploys protections against p](https://blog.cloudflare.com/php-vulnerabilities-waf-protection)*

![AI 模拟终端能力：模拟真实终端交互；执行文件创建、Vim等操作；预测屏幕变化；具备一定的错误修复能力](/assets/ai/ai-in-simulated-terminals-and-cybersecurity/c6756e451daa.svg)
*图：AI 模拟终端能力（据 [simedw.com](https://simedw.com/2026/10/21/world-model-terminal)）*

![php2shell 漏洞影响：影响PHP 5.4+；可导致RCE、DoS；影响WordPress等平台；需更新PHP软件](/assets/ai/ai-in-simulated-terminals-and-cybersecurity/0f4fcc505b8a.svg)
*图：php2shell 漏洞影响（据 [blog.cloudflare.com](https://blog.cloudflare.com/php-vulnerabilities-waf-protection)）*

![Cloudflare 的全事务检测：“全事务检测”能力，该能力结合了HTTP请求和响应的信号，能够更准确地识别恶意流量，并减少误报”](/assets/ai/ai-in-simulated-terminals-and-cybersecurity/74f2b468e3ff.svg)
*图：Cloudflare 的全事务检测（据 [blog.cloudflare.com](https://blog.cloudflare.com/php-vulnerabilities-waf-protection)）*

## 参考资料

1. [OpenAI CLI](https://github.com/openai/openai-cli) — github.com
2. [Cloudflare deploys protections against php2shell vulnerability](https://blog.cloudflare.com/php-vulnerabilities-waf-protection) — blog.cloudflare.com
3. [WorldTUI: I trained a 360M model to pretend to be a terminal](https://simedw.com/2026/10/21/world-model-terminal) — simedw.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
