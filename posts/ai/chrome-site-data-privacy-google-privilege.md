---
title: "Chrome 的网站数据处理：用户隐私与谷歌特权之辩"
slug: chrome-site-data-privacy-google-privilege
language: zh
summary: "本文探讨了 Chrome 浏览器在处理用户网站数据设置时出现的争议。用户报告称，即使在关闭所有窗口后，谷歌相关的网站数据仍会保留，这与 Chrome 的默认设置相悖。文章分析了这一现象可能引发的对用户隐私和谷歌自身特权的担忧，并回顾了类似问题的历史。"
tags: [Chrome, 隐私, 网站数据, 谷歌]
draft: true
published_at: 2026-09-06
---

![Chrome 的网站数据处理：用户隐私与谷歌特权之辩](/assets/ai/chrome-site-data-privacy-google-privilege/668a2faa46d6.svg)

## Chrome 网站数据自动删除设置的疑虑

用户在 Chrome 浏览器中报告了一个令人担忧的现象：即使启用了“关闭所有窗口时删除数据”的网站数据设置，谷歌相关的网站数据（如 `www.google.com`）依然会保留。这一问题在 Chrome 版本 152.0.7977.83 上被观察到，并且在用户更改默认搜索引擎为 DuckDuckGo 以排除设置干扰后依然存在。

具体而言，当用户执行谷歌搜索后关闭 Chrome 浏览器，再次检查 `chrome://settings/content/all` 页面时，会发现 `google.com` 的网站数据，包括 Cookies、Local Storage 和 Session Storage，并未被删除，并且在重启浏览器后依然存在。这一行为与 Chrome 的默认设置——“删除数据网站已保存到您的设备，当您关闭所有窗口时”——相悖。

![Chrome again exempts Google from user site data settings](/assets/ai/chrome-site-data-privacy-google-privilege/b7638870cd33.png)
*图：lapcatsoftware.com · [Chrome again exempts Google from user si](https://lapcatsoftware.com/articles/2026/9/1.html)*

## 历史回顾与潜在原因

值得注意的是，这并非 Chrome 首次出现类似问题。早在六年前，就有博文指出 Chrome 存在一个“bug”，使得谷歌自营网站可以豁免于用户设置的自动删除所有网站数据的规则。当时，在用户报告后，谷歌确实修复了该问题。

此次新问题的出现，不禁让人联想到历史上的事件。尽管报告者倾向于用“汉隆剃刀”（Hanlon's Razor）来解释，即“永远不要把不应归咎于愚蠢的原因归咎于恶意”，但考虑到谷歌的体量和资源，其工程团队在质量保证（QA）方面似乎仍有改进空间。有建议认为，可以通过增加针对此类功能的单元测试，或者放缓更新节奏来避免“搞砸事情”。

![用户对 Chrome 网站数据处理的观察：Returning to chrome://settings/content/all, I find some goo](/assets/ai/chrome-site-data-privacy-google-privilege/7808af6c0761.svg)
*图：用户对 Chrome 网站数据处理的观察（据 [lapcatsoftware.com](https://lapcatsoftware.com/articles/2026/9/1.html)）*

## 对用户隐私和谷歌特权的担忧

这一现象引发了对用户隐私和谷歌自身特权的讨论。当用户明确设置了删除网站数据，但某些网站（尤其是浏览器开发商自身的网站）却似乎不受此规则约束时，用户的控制权和隐私保障就受到了质疑。这种“豁免”行为，无论是有意还是无意，都可能导致用户数据在用户不知情的情况下被保留。

此外，报告者还提到了谷歌搜索结果的另一个变化：在用户未登录谷歌账号时，搜索结果链接被替换为 `https://www.google.com/goto?url=` 这种“垃圾”形式，而非直接显示网站 URL。这进一步加剧了对谷歌搜索垄断地位和数据处理方式的担忧。

目前，尚不清楚这一新问题何时引入，以及是否仅限于 `www.google.com`。但无论如何，浏览器厂商在处理用户数据设置时，应确保所有网站，特别是自身网站，都能严格遵守用户设定的隐私偏好，以维护用户的信任和数字权利。

![Chrome 网站数据设置：默认行为：关闭所有窗口时删除数据；测试环境：Mac, Chrome 152.0.7977.83；问题现象：Google.com 数据](/assets/ai/chrome-site-data-privacy-google-privilege/3608d57a721d.svg)
*图：Chrome 网站数据设置（据 [lapcatsoftware.com](https://lapcatsoftware.com/articles/2026/9/1.html)）*

## 参考资料

1. [Chrome again exempts Google from user site data settings](https://lapcatsoftware.com/articles/2026/9/1.html) — lapcatsoftware.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 1 条）；剥掉 1 个资料清单外的链接：https://www.google.com/goto?url=`。发布前请人工核对事实与出处。 -->
