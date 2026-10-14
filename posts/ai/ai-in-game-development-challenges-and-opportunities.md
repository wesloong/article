---
title: "AI 在游戏开发中的应用：挑战与机遇"
slug: ai-in-game-development-challenges-and-opportunities
language: zh
summary: "尽管大型语言模型（LLM）在软件开发领域展现出强大能力，但在游戏开发中，其应用面临独特挑战。本文探讨了LLM在游戏开发中的局限性，特别是处理非代码资产和复杂系统时的困难，并介绍了AI搜索在多模态数据处理方面的进展，为AI在游戏领域的未来应用提供了新的视角。"
tags: [AI, 游戏开发, LLM, AI Search]
draft: true
published_at: 2026-10-14
---

![AI 在游戏开发中的应用：挑战与机遇](/assets/ai/ai-in-game-development-challenges-and-opportunities/d6cf08976f2d.svg)

大型语言模型（LLM）在软件开发领域已展现出显著的能力，但将其应用于游戏开发，尤其是在实际的、长期的开发流程中，却面临着独特的挑战。

## LLM 在游戏开发中的局限性

尽管LLM在处理代码和构建Web应用方面表现出色，但当涉及到游戏开发时，情况则大不相同。一位拥有近15年游戏编程经验的开发者指出，LLM在处理“游戏性”事物时“表现不佳”¹。这种局限性源于游戏开发的复杂性，它不仅仅是静态图像和文本的布局，还涉及大量非代码的组成部分。这些非代码资产，如3D模型、纹理、音频文件等，对LLM而言是“不透明的”，使得模型难以理解和操作¹。相比之下，Web应用中的组件大多以代码形式存在，易于LLM理解和修改¹。

这种差异导致了“LLM不擅长游戏”的普遍看法，这并非源于模型本身的潜在社会影响，而是其在处理游戏固有复杂性时的能力限制¹。例如，一些开发者尝试使用Three.js等技术构建游戏，以便将资产表示为简单的代码基元，从而简化LLM的处理过程。然而，这种方法可能牺牲了游戏的原创性和深度，因为LLM在生成这类内容时，往往依赖于其训练数据的“中位数”¹。

LLM的工作原理涉及系统提示、助手提示和用户提示。在一次会话中，模型会不断重新提交之前的消息，这构成了“上下文”。管理好这个上下文至关重要，因为“坏”的上下文会污染后续的生成结果。对于游戏开发而言，由于其非代码资产的特性，如何有效地将这些信息纳入LLM的上下文，并让模型对其进行有意义的处理，是一个核心难题¹。

![How to engineer an AI harness for game development](/assets/ai/ai-in-game-development-challenges-and-opportunities/f3f03fe52ae8.jpg)
*图：kylekukshtel.com · [How to engineer an AI harness for game d](https://kylekukshtel.com/ai-harness-engineering-game-development-claude-code)*

## AI 搜索与多模态处理的进展

与此同时，AI搜索技术在处理多模态数据方面取得了显著进展，这可能为解决游戏开发中的部分挑战提供新的思路。Cloudflare推出的AI Search现已普遍可用，它整合了Workers AI、Vectorize、R2和Browser Run，构建了一个完整的索引和检索管道²。该服务不仅支持文本，还扩展了对图像的原生嵌入和处理能力，以及对PDF文档的光学字符识别（OCR）²。

AI Search能够直接嵌入图像像素进行视觉检索，同时保留文本描述以进行文本理解。它利用Matryoshka Representation Learning (MRL)技术，在保持存储可管理和搜索速度的同时，允许较小的嵌入保留有用信息²。这意味着AI现在可以理解图像的视觉细节，而不仅仅是其文字描述。例如，AI搜索可以匹配图像的颜色、纹理、构图或空间关系，这对于产品发现、截图匹配、图表、扫描文档等场景非常有价值²。

此外，AI Search现在支持更大的文件，包括高达10 MiB的文本文件和PDF。对于扫描的PDF，OCR功能可以提取页面上的文本，然后进行分块和嵌入²。这些多模态处理能力，虽然最初是为了通用搜索场景设计，但其处理和理解非文本数据的能力，为未来AI在游戏资产管理、内容生成乃至游戏内交互方面提供了新的可能性。

AI Search的计费模式也更加灵活，按内容摄取、数据存储和查询次数收费，并且提供慷慨的免费套餐²。这使得开发者可以更经济地探索和应用AI技术。

虽然LLM在直接生成游戏代码或理解复杂游戏逻辑方面仍面临挑战，但AI搜索在处理和理解多模态数据方面的进步，预示着AI技术在游戏开发领域将有更广阔的应用前景，尤其是在资产管理、内容检索和可能的游戏内智能交互等方面。

![AI Search is now generally available](/assets/ai/ai-in-game-development-challenges-and-opportunities/2ad2e8786d94.png)
*图：blog.cloudflare.com · [AI Search is now generally available](https://blog.cloudflare.com/ai-search-ga)*

![AI Search 免费套餐：5M tokens|每月免费摄取量；10 GB|每月免费存储量；1,000 queries|每月免费语义查询数](/assets/ai/ai-in-game-development-challenges-and-opportunities/0f7e5b6158b5.svg)
*图：AI Search 免费套餐（据 [blog.cloudflare.com](https://blog.cloudflare.com/ai-search-ga)）*

![AI Search 新增功能：原生图像嵌入与检索；PDF OCR 支持；支持更大文件（文本/PDF）；多模态数据处理](/assets/ai/ai-in-game-development-challenges-and-opportunities/1811f18bb688.svg)
*图：AI Search 新增功能（据 [blog.cloudflare.com](https://blog.cloudflare.com/ai-search-ga)）*

![LLM 在游戏开发中的挑战：“LLMs are Bad At Games”](/assets/ai/ai-in-game-development-challenges-and-opportunities/363dfcb4a371.svg)
*图：LLM 在游戏开发中的挑战（据 [kylekukshtel.com](https://kylekukshtel.com/ai-harness-engineering-game-development-claude-code)）*

## 参考资料

1. [How to engineer an AI harness for game development](https://kylekukshtel.com/ai-harness-engineering-game-development-claude-code) — kylekukshtel.com
2. [AI Search is now generally available](https://blog.cloudflare.com/ai-search-ga) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
