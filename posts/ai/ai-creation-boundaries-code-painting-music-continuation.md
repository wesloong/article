---
title: "AI 创作的边界：从代码绘画到音乐续写"
slug: ai-creation-boundaries-code-painting-music-continuation
language: zh
summary: "人工智能在创意领域的探索正不断拓展边界。研究人员正利用强化学习训练模型通过编写代码来生成图像，并探索更精细的编辑方式。同时，也有模型被训练用于实时续写音乐，展现了AI在不同艺术形式中的潜力与挑战。"
tags: [AI, 生成式AI, 强化学习, 代码生成]
draft: true
published_at: 2026-08-28
---

![AI 创作的边界：从代码绘画到音乐续写](/assets/ai/ai-creation-boundaries-code-painting-music-continuation/caf59c660a55.svg)

人工智能在创意领域的应用正以前所未有的速度发展，从视觉艺术到音乐创作，AI正逐步展现其强大的生成能力。

## 代码驱动的视觉艺术生成

传统的AI图像生成方式主要依赖于文本提示（prompt），用户通过描述来引导模型创作。然而，这种方式在图像编辑上存在局限性，任何修改都需要重新生成。为了克服这一限制，研究者们探索了新的路径：训练语言模型通过编写代码来生成图像。

这种方法的核心在于将代码本身作为创作的“媒介”和“产物”。通过使用强化学习（RL），模型被训练来生成p5.brush JavaScript代码，这些代码随后在沙盒环境中渲染成图像。这种方式的优势在于，用户可以像编辑代码一样，对生成的图像进行更精细的控制和修改，而无需完全依赖于文本提示的迭代。这种“代码即艺术品”的理念，为AI在设计和创意任务中的应用提供了新的视角。

在训练过程中，如何设计有效的奖励函数是关键。最初的奖励系统包含九个独立的信号，但模型很快就达到了一个平台期，生成的图像趋于同质化。诊断发现，部分奖励信号之间存在高度相关性，导致模型“重复学习”相同的内容。为了解决这个问题，研究者采用了两种关键的改进策略：

1.  **替换绝对评分制为成对比较（pairwise judgment）**：将原先的零到十分的绝对评分，改为让模型比较两个生成结果的优劣。这种相对评估方式能更可靠地捕捉到细微的差异，并为模型提供更动态的奖励信号。
2.  **构建高质量的参考图库**：收集并人工评分了1664张图像，从中选出117张“喜爱”级别的优秀作品作为参考池。模型生成的图像将与这些高质量的参考图进行比较，从而引导模型学习更优的风格和构图。

这些改进使得模型能够更快地达到更高的奖励水平，并生成更具多样性和压缩性的代码，最终输出更优秀的图像。

![Training AI to Paint with Code](/assets/ai/ai-creation-boundaries-code-painting-music-continuation/3cae1a277267.png)
*图：surya.website · [Training AI to Paint with Code](https://surya.website/rling-qwen-to-paint-with-code)*

## AI赋能的音乐实时续写

在音乐领域，AI同样展现出惊人的潜力。一项研究训练了一个拥有1.25亿参数的Transformer模型，使其能够在iPhone等设备上实时续写钢琴演奏。该项目旨在实现类似GitHub Copilot的代码补全功能，但应用于音乐创作。

实现这一目标面临诸多挑战，其中关键在于如何有效地将MIDI音乐数据转化为模型能够理解和处理的离散序列（tokenization）。MIDI文件记录的是音乐事件序列，而非音频本身。研究者尝试了多种MIDI表示方法，包括将每个事件（如音符开关、时间偏移）映射为一个token，但这会导致词汇量庞大且稀疏。通过引入语法约束和优化表示方式，例如将音符表示为包含音高、起始时间偏移、时长和力度等属性的结构化数据，模型能够更高效地处理音乐信息。

最终采用的表示方法将每个音符视为一个整体，模型一次性预测一个完整的音符及其属性，而非逐个字段生成。这种方式显著提高了生成效率，使得模型在iPhone上能够达到每秒108个音符的处理速度，远超人类演奏者的需求。

在数据处理方面，研究者发现，仅仅扩大数据集的规模并非最优解。对原始MIDI数据进行严格的清洗和筛选，去除低质量、多轨道混合以及重复的内容，比单纯增加数据量更能提升模型性能。最终的数据集包含了数十万个MIDI文件，约3亿个音符事件。

在训练过程中，除了标准的交叉熵损失函数外，研究者还考虑了音乐续写的开放性，即一个音乐片段可能存在多种合理的续写方式。此外，为了模拟真实演奏中的不完美，还引入了多种数据增强技术，如全局移调、速度缩放、时长/力度抖动以及随机丢弃提示音符等，以提高模型的鲁棒性。

![Show HN: I trained a 125M model to autocomplete piano on-dev](/assets/ai/ai-creation-boundaries-code-painting-music-continuation/8f237039f8aa.jpg)
*图：simedw.com · [Show HN: I trained a 125M model to autoc](https://simedw.com/2026/08/20/midi-autocomplete)*

## 共同的挑战与未来趋势

无论是代码绘画还是音乐续写，AI在创意领域的探索都面临着共同的挑战：如何量化和评估“美学质量”或“音乐性”等主观评价标准。强化学习的有效性依赖于可验证的奖励信号，而艺术创作的评价往往是模糊且主观的。这促使研究者不断探索更精妙的奖励函数设计、更有效的评估机制（如成对比较、人类偏好模型）以及更优的数据表示和处理方法。

这些研究共同指向了一个趋势：AI不再仅仅是模仿或复现，而是开始成为一种能够理解、生成并与人类进行深度协作的创意伙伴。通过将AI的能力与人类的创造力相结合，未来的艺术和设计领域有望迎来更加激动人心的变革。

![AI绘画模型训练优化：0.65|模型早期奖励平台期；0.85-0.95|早期奖励信号高度相关；3|新奖励系统达到旧平台期的时间倍数](/assets/ai/ai-creation-boundaries-code-painting-music-continuation/ae19e96e0b65.svg)
*图：AI绘画模型训练优化（据 [surya.website](https://surya.website/rling-qwen-to-paint-with-code)）*

![AI音乐模型性能：1.25亿|模型参数量；108|每秒处理音符数 (iPhone 15)](/assets/ai/ai-creation-boundaries-code-painting-music-continuation/ffb7128a780e.svg)
*图：AI音乐模型性能（据 [simedw.com](https://simedw.com/2026/08/20/midi-autocomplete)）*

![AI绘画奖励函数改进：从绝对评分改为成对比较；构建高质量参考图库；优化奖励信号权重分配](/assets/ai/ai-creation-boundaries-code-painting-music-continuation/bdc0286c6eb7.svg)
*图：AI绘画奖励函数改进（据 [surya.website](https://surya.website/rling-qwen-to-paint-with-code)）*

## 参考资料

1. [Training AI to Paint with Code](https://surya.website/rling-qwen-to-paint-with-code) — surya.website
2. [Show HN: I trained a 125M model to autocomplete piano on-device](https://simedw.com/2026/08/20/midi-autocomplete) — simedw.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
