---
title: "AI 训练与网络可发现性：网站所有者的新博弈"
slug: ai-training-and-web-discoverability-a-new-game-for-website-o
language: zh
summary: "随着 AI 技术的发展，网站所有者面临如何在允许内容被 AI 训练的同时保持搜索引擎可发现性的新挑战。Cloudflare 推出的“禁止 AI 训练”设置，旨在为网站提供更精细化的控制，允许区分搜索引擎爬虫和 AI 训练爬虫，从而解决这一两难困境。"
tags: [AI训练, 搜索引擎优化, 网站管理, Cloudflare]
draft: true
published_at: 2026-09-16
---

![AI 训练与网络可发现性：网站所有者的新博弈](/assets/ai/ai-training-and-web-discoverability-a-new-game-for-website-o/c45d468cbef2.svg)

在人工智能（AI）飞速发展的今天，网站所有者正面临一个日益严峻的挑战：如何在允许其内容被 AI 模型训练的同时，又不损害其在搜索引擎中的可见性。传统上，网站所有者在这两者之间常常面临艰难的抉择，因为许多大型互联网组织使用的“混合用途爬虫”会同时服务于搜索引擎索引和 AI 训练。拒绝其中一项，往往意味着失去另一项。

## 精细化控制的出现

为了解决这一困境，Cloudflare 推出了新的“禁止 AI 训练”（Disallow AI Training）设置。这项新功能允许网站所有者轻松地保持其内容被搜索引擎索引，同时拒绝相同的爬虫使用其内容进行 AI 训练。值得注意的是，苹果、谷歌和微软等公司已经采纳或承诺在规定时间内采纳这一设置 [资料 1]。

这种精细化控制的出现，源于对现有模式的审视。过去，一个网站范围内的“是”或“否”选项过于笼统。例如，在 AI 摘要方面，内容在摘要中出现的多少，与是否出现本身同样重要。Cloudflare 的目标是，到明年初，允许网站所有者控制其内容在 AI 摘要中包含的比例，并且这一设置可以在 Cloudflare 上统一完成，而非需要分别与每个内容提供商沟通 [资料 1]。

![Have it both ways: stay discoverable in search while disallo](/assets/ai/ai-training-and-web-discoverability-a-new-game-for-website-o/1d2b27faebc8.png)
*图：blog.cloudflare.com · [Have it both ways: stay discoverable in ](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers)*

## 为什么“询问”不够

大多数网站所有者希望被发现，无论是被人类用户、代理还是良性爬虫。然而，互联网上很大一部分内容依赖于广告、订阅或与访问者的直接关系来盈利，这些模式只有在有人实际访问时才能产生收入。因此，几乎所有网站所有者都认为搜索引擎是有益的，只有不到 1% 的 Cloudflare 网站选择阻止搜索引擎爬虫。但对于 AI 训练，情况则有所不同：有 17% 的网站选择启用某种机制来阻止其内容被用于训练 [资料 1]。这正是 Cloudflare 决定提供更精细化控制的原因。

传统的 `robots.txt` 文件虽然可以发布，但它无法识别爬虫的身份、判断其爬取目的，也无法阻止那些忽略该指令的爬虫。一个网络层面的解决方案则可以解决这些问题：发布网站所有者的偏好，识别爬虫身份，分类其爬取目的，阻止不遵守指令的爬虫，并最终在 Radar 等平台上报告每个爬虫的实际行为 [资料 1]。

![网站所有者对 AI 训练的态度：17%|选择启用某种机制来阻止 AI 训练；<1%|选择阻止搜索引擎爬虫](/assets/ai/ai-training-and-web-discoverability-a-new-game-for-website-o/6b3a3ab7ab4a.svg)
*图：网站所有者对 AI 训练的态度（据 [blog.cloudflare.com](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers)）*

## “负责任”的爬虫标准

Cloudflare 提出的“负责任”（Accountable）标准，旨在识别那些不迫使网站所有者在搜索和 AI 训练之间做出选择的爬虫。要获得“负责任”的称号，爬虫运营商必须满足或承诺满足以下要求：

*   提供一种机制，允许网站所有者通过 `robots.txt` 或类似标准选择退出 AI 训练。
*   提供一种机制，允许网站所有者直接与运营商设定选择退出 AI 摘要的偏好，并计划在未来通过 Cloudflare 实现这一功能。
*   提供 URL 级别的可见性，显示哪些页面可用于训练，以及内容如何在搜索中呈现的指标。
*   保证选择退出 AI 训练不会影响传统的搜索结果。

苹果、谷歌和微软都已证明它们符合“负责任”的标准。它们结合了当前已有的能力和正在开发中的承诺 [资料 1]。

![“负责任”爬虫运营商需满足的要求：允许选择退出 AI 训练；允许选择退出 AI 摘要；提供 URL 级别可见性；保证不影响搜索结果](/assets/ai/ai-training-and-web-discoverability-a-new-game-for-website-o/16d5c4bbd826.svg)
*图：“负责任”爬虫运营商需满足的要求（据 [blog.cloudflare.com](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers)）*

## 新的安全设置选项

Cloudflare 将爬虫按行为分类：搜索（构建搜索索引）、训练（训练或微调模型）和代理（代表人类访问页面）。混合用途爬虫则同时具备搜索和训练两种行为。为了避免阻止那些不强制网站所有者做出选择的“负责任”混合用途爬虫，Cloudflare 推出了“禁止 AI 训练”设置。该设置通过在 `robots.txt` 文件中发布 `Disallow: ` 指令来实现。

在 9 月 15 日之后，Cloudflare 的“阻止”（Block）和“在有广告的页面上阻止”（Block on pages with ads）设置将适用于混合用途爬虫，这意味着这些设置也会影响搜索可见性。如果网站所有者希望阻止 AI 训练同时保留搜索可见性，则需要使用“禁止 AI 训练”设置。“阻止 AI 爬虫”（Block AI Bots）的旧设置将被更精细化的搜索、训练和代理控制所取代。同时，“托管 `robots.txt`”（Managed Robots.txt）将被“爬虫偏好同步”（Bot Preference Sync）取代 [资料 1]。

对于绝大多数用户而言，无需进行任何操作，因为现有设置将自动迁移。但如果用户希望完全阻止混合用途爬虫（包括 Applebot、Bingbot 和 Googlebot），则需要选择“阻止”设置，这将同时影响搜索和训练 [资料 1]。

![Cloudflare 的新设置：“禁止 AI 训练”设置，让您轻松保持搜索引擎索引，同时拒绝相同的爬虫使用您的内容进行训练。](/assets/ai/ai-training-and-web-discoverability-a-new-game-for-website-o/f5173c902b9d.svg)
*图：Cloudflare 的新设置（据 [blog.cloudflare.com](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers)）*

## 参考资料

1. [Have it both ways: stay discoverable in search while disallowing AI training](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 1 条）。发布前请人工核对事实与出处。 -->
