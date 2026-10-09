---
title: "AI 的演进：从后量子加密到决策模型，计算范式的变革"
slug: ai-evolution-post-quantum-to-decision-models
language: zh
summary: "本文探讨了 AI 领域在后量子加密可见性、新型训练方法以及决策模型等方面的最新进展。从加密安全到模型训练效率，再到特定任务的决策能力，AI 正以前所未有的速度重塑技术格局。"
tags: [AI, 后量子加密, 决策模型, 机器学习]
draft: true
published_at: 2026-10-09
---

![AI 的演进：从后量子加密到决策模型，计算范式的变革](/assets/ai/ai-evolution-post-quantum-to-decision-models/51db1362a8a8.svg)

人工智能（AI）正以前所未有的速度渗透到各个技术领域，从网络安全到模型训练，再到自动化决策。近期，一系列技术突破和新工具的发布，预示着 AI 正在经历一场深刻的计算范式变革。

## 后量子加密与网络安全新视野

随着量子计算的潜在威胁日益显现，网络安全领域正积极拥抱后量子（PQ）加密技术。Cloudflare 正在通过其应用安全和日志产品，为客户提供后量子 TLS 1.3 加密流量的可见性工具。用户现在可以检查和绘制实时流量中后量子加密的采用情况，从而审计其后量子安全态势、评估合规性并识别加密方面的潜在差距。Cloudflare 的目标是在 2029 年实现全面的后量子安全，并已在多个产品中部署了 PQ 加密。数据显示，约 70% 访问 Cloudflare 网络的浏览器流量已采用混合 ML-KEM 进行 PQ 加密，而连接到 Cloudflare 的源站中，仅约 15% 使用了该技术。

后量子加密在 TLS 1.3 中，推荐使用 X25519MLKEM768 算法，它结合了经典椭圆曲线 Diffie-Hellman 密钥交换（ECDHE）和后量子模块格密钥封装机制（ML-KEM）。这种混合方法提供了“双保险”式的安全保障。除了加密，后量子认证也是一个重要方向，目标是升级证书和签名，使其能够抵御量子计算的攻击。目前，PQ 加密在 TLS 1.3 中的部署比 PQ 认证更为广泛。

![Is your domain using post-quantum encryption? Now you can se](/assets/ai/ai-evolution-post-quantum-to-decision-models/4c6bf08c0842.png)
*图：blog.cloudflare.com · [Is your domain using post-quantum encryp](https://blog.cloudflare.com/post-quantum-visibility)*

## 新型 AI 模型训练方法：超越反向传播

在模型训练方面，研究人员正在探索超越传统反向传播（backprop）的新方法。一种名为 Dust 的零阶优化方法，通过扰动激活值而非权重，实现了与反向传播在预训练 Transformer 语言模型方面相媲美的影响力。Dust 能够在计算资源充足的情况下，甚至超越反向传播的表现。与传统的权重空间演化策略（ES）相比，Dust 在效率上具有数量级的优势，其效率比 EGGROLL 高出 1000 到 10000 倍。值得注意的是，研究发现更大的模型在人口效率方面表现更佳，这为“过参数化”提供了新的视角，将其视为一个更大的、具有更好几何结构的搜索空间。Dust 的梯度估计在人口规模增长时能更好地与反向传播对齐，并且在高达 10 亿 token 的规模下都能保持一致，这为模型的扩展提供了积极的信号。

![Introducing Clef: our open-source decision models, and new R](/assets/ai/ai-evolution-post-quantum-to-decision-models/c813a1e43313.png)
*图：blog.cloudflare.com · [Introducing Clef: our open-source decisi](https://blog.cloudflare.com/clef-decision-models)*

## 决策模型：AI 的精准决策能力

在 AI 应用层面，决策模型正成为新的焦点。与大型语言模型（LLMs）的开放性和非确定性不同，决策模型能够廉价、快速且一致地生成有界结构化输出，适用于需要做出决策的场景。Cloudflare 推出的 Clef 和 Clef-flash 模型，在 Jev Decision Index 评测中表现出色，速度更快且兼容 Jev API。Clef 模型具备视觉编码器，能够处理图像并进行视觉内容分类，同时拥有 64k 的长上下文窗口，优于 Jev 的 32k。在多个基准测试中，Clef 模型在准确性和延迟方面均表现优异。例如，在处理客户支持消息时，Clef 模型能够快速识别请求的紧急程度、所属团队以及严重性，并返回结构化的分类结果，这使得自动化代理能够更有效地执行任务或决定是否需要人工介入。

Clef 模型托管在 Workers AI 上，利用边缘 GPU 的优势，实现了低网络延迟和更快的决策速度。此外，Cloudflare 还推出了强化学习（RL）产品，允许客户对 Clef 模型进行微调，以适应特定的应用场景。这种决策模型的能力，为构建更智能、更自主的代理系统提供了关键支持。

AI 在后量子加密、模型训练效率以及精准决策能力等方面的进步，共同描绘了计算领域未来发展的蓝图。这些技术不仅提升了现有系统的安全性与效率，更为下一代智能应用的涌现奠定了基础。

![后量子加密流量采用情况：70%|访问 Cloudflare 的浏览器流量使用 PQ 加密 (ML-KEM)；15%|Cloudflare 连接的源站使用 PQ](/assets/ai/ai-evolution-post-quantum-to-decision-models/d3bcea30a897.svg)
*图：后量子加密流量采用情况（据 [blog.cloudflare.com](https://blog.cloudflare.com/post-quantum-visibility)）*

![Dust 模型效率对比：10^3-10^4|Dust 相较于 EGGROLL 的效率提升倍数](/assets/ai/ai-evolution-post-quantum-to-decision-models/90783cf91495.svg)
*图：Dust 模型效率对比（据 [qlabs.sh](https://qlabs.sh/research/dust)）*

![Clef 模型优势：视觉编码器，支持图像分类；64k 长上下文窗口；在 Jev Decision Index 评测中表现优异；低延迟，速度快](/assets/ai/ai-evolution-post-quantum-to-decision-models/5de5c42acaf6.svg)
*图：Clef 模型优势（据 [blog.cloudflare.com](https://blog.cloudflare.com/clef-decision-models)）*

## 参考资料

1. [Is your domain using post-quantum encryption? Now you can see for yourself](https://blog.cloudflare.com/post-quantum-visibility) — blog.cloudflare.com
2. [Dust: Pretraining Transformers Without Backpropagation](https://qlabs.sh/research/dust) — qlabs.sh
3. [Introducing Clef: our open-source decision models, and new RL fine-tuning platform](https://blog.cloudflare.com/clef-decision-models) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
