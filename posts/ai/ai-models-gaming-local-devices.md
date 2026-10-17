---
title: "AI 模型在游戏和本地设备上的新探索"
slug: ai-models-gaming-local-devices
language: zh
summary: "AI 模型正以前所未有的方式渗透到各个领域。从在游戏《星际争霸：重制版》中扮演复杂角色，到在 PlayStation 5 等本地设备上运行，AI 的应用边界正在不断拓展，展现出强大的潜力和多样性。"
tags: [AI, LLM, 游戏, 本地部署]
draft: true
published_at: 2026-10-17
---

![AI 模型在游戏和本地设备上的新探索](/assets/ai/ai-models-gaming-local-devices/d03de8cef659.svg)

人工智能（AI）模型正以前所未有的速度和广度渗透到各个领域，从复杂的策略游戏到个人本地设备，其应用边界不断被拓展。

## AI 在游戏领域的竞技表现

在游戏领域，AI 模型正展现出惊人的策略制定和代码编写能力。StarSkirmish Bench v0.2 旨在评估大型语言模型（LLM）编写《星际争霸：重制版》（StarCraft: Brood War）AI 玩家（bots）的能力。该基准测试要求每个 LLM 在一小时内用 C++ 编写一个 Protoss 机器人，并将其与人类编写的机器人以及其他 LLM 编写的机器人进行对战评估。测试结果显示，尽管最强的人类编写的机器人仍然远超当前的 AI 模型，但 GPT-6 Astra 已成为该基准测试中的佼佼者，其得分明显领先于 GPT-6.1 Sol。Gemini 4 Argon、Claude Opus 5.5 和 Claude Fable 5.1 的得分则处于相近的水平，介于 37 到 39 之间。值得注意的是，Gemini 4 Argon 的测试结果显示出比其他旗舰模型更大的波动性，其最好和最差的运行结果之间存在 18 分的差距，而 GPT-6 Astra 为 9 分，Claude Opus 5.5 为 8 分。研究还发现，模型在测试期间与强大的对手进行练习的次数是预测其得分的最强指标之一。例如，GPT-6 Astra、GPT-6.1 Sol 和 Gemini 4 Argon 在早期就会开始与强大的机器人进行练习，而 Muse Wonder Full、Claude Haiku 5.5 和 GPT-6 Luna 则很少或从不进行此类练习。这表明，在有限的时间内进行有效的练习和学习，对于提升 AI 在复杂任务中的表现至关重要。

![Llama.cpp on a jailbroken PS5: run any GGUF model natively o](/assets/ai/ai-models-gaming-local-devices/957dd7371f54.png)
*图：github.com · [Llama.cpp on a jailbroken PS5: run any G](https://github.com/cobanov/PS5LM)*

## AI 模型在本地设备上的部署与应用

与此同时，AI 模型也在向个人本地设备渗透，使得在无需强大服务器或云端支持的情况下运行 AI 成为可能。例如，PS5LM 项目成功地将 `llama.cpp` 运行在经过越狱的 PlayStation 5（PS5）主机上，实现了在本地 GPU 上原生运行 GGUF 模型。该项目允许用户将大型语言模型加载到 PS5 的 GPU 上，并通过网络为笔记本电脑、手机等设备提供服务，无需 PC、云端或账户。PS5LM 利用了 PS5 的 RDNA 2 GPU 和 11.4 GB 的共享内存来运行模型及其上下文。它支持 OpenAI 的 `/v1/chat/completions` 和 Anthropic 的 `/v1/messages` API，并提供了一个浏览器界面。此外，PS5LM 还支持运行决策模型，能够处理类型化决策和校准概率，响应速度极快。例如，Qwen 3.5 9B 模型在 PS5 Slim 上能够以每秒 55 个 token 的速度响应请求，而 Qwen 3.8 27B 模型在 64k 上下文长度下，速度约为每秒 20 个 token。该项目还支持加载带有图像投影功能的模型，如 Gemma 4、MiniCPM-V 和 d1，使其能够处理图像输入。要运行 PS5LM，用户需要一台运行 7.00 至 13.60 固件的越狱 PS5。这标志着 AI 模型正朝着更普惠、更私密的本地化应用方向发展。

![Show HN: Gemini 4 Argon plays StarCraft](/assets/ai/ai-models-gaming-local-devices/ab4620585999.png)
*图：starskirmish.com · [Show HN: Gemini 4 Argon plays StarCraft](https://starskirmish.com/bench/v0-2)*

## 跨领域融合的趋势

从游戏竞技到本地设备部署，AI 模型正展现出其强大的适应性和通用性。在游戏领域，AI 不仅是玩家，更是开发者，能够通过编程和策略学习来提升自身能力。而在本地设备上运行 AI，则为用户提供了更强的隐私保护和更低的延迟体验。这两种趋势的结合预示着 AI 将更加深入地融入我们的日常生活和娱乐方式中，无论是作为强大的计算工具，还是作为智能的交互伙伴。

![StarSkirmish Bench v0.2 模型表现：37-39|Gemini 4 Argon, Claude Opus 5.5, Claude Fable](/assets/ai/ai-models-gaming-local-devices/1637323a734f.svg)
*图：StarSkirmish Bench v0.2 模型表现（据 [starskirmish.com](https://starskirmish.com/bench/v0-2)）*

![PS5LM 支持的模型示例：Qwen 3.5 9B (5.3 GB)；Qwen 3.8 27B (9.2 GB)；d1 Omni 600M (1.1 GB, 决](/assets/ai/ai-models-gaming-local-devices/6e374e54c6a9.svg)
*图：PS5LM 支持的模型示例（据 [github.com](https://github.com/cobanov/PS5LM)）*

![PS5LM 的核心价值：It runs on the GPU. llama.cpp's Vulkan backend on the consol](/assets/ai/ai-models-gaming-local-devices/f0d79cb7c23c.svg)
*图：PS5LM 的核心价值（据 [github.com](https://github.com/cobanov/PS5LM)）*

## 参考资料

1. [Llama.cpp on a jailbroken PS5: run any GGUF model natively on the console](https://github.com/cobanov/PS5LM) — github.com
2. [Show HN: Gemini 4 Argon plays StarCraft](https://starskirmish.com/bench/v0-2) — starskirmish.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
