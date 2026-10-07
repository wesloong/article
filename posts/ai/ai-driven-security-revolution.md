---
title: "AI 驱动的安全新浪潮：从身份验证到代码执行的变革"
slug: ai-driven-security-revolution
language: zh
summary: "人工智能正深刻改变网络安全格局，从欺诈检测到开发者工具。AI 使得伪造身份成为可能，促使安全策略从一次性验证转向持续行为分析。同时，AI 驱动的代理（agents）正在重塑开发流程，需要更灵活、更快速的沙箱环境来执行代码。"
tags: [人工智能, 网络安全, 身份验证, 开发者工具]
draft: true
published_at: 2026-10-07
---

![AI 驱动的安全新浪潮：从身份验证到代码执行的变革](/assets/ai/ai-driven-security-revolution/c1ef1da8840f.svg)

人工智能（AI）的飞速发展正在以前所未有的方式重塑网络安全领域，从根本上改变了我们对身份验证、欺诈检测以及开发者工作流程的认知。

## AI 对身份验证和欺诈检测的挑战与应对

传统上，在线安全依赖于一次性的身份验证，例如密码或生物识别。然而，AI 的普及使得欺诈者能够利用被泄露的凭证结合合成媒体来伪造合法的身份，从而绕过这些传统的安全措施 [资料 1]。这意味着，即使一个人通过了当前的身份验证，也不能保证其账户是可信的。为了应对这一挑战，安全策略正从“一次性验证”转向“状态化信任模型”。这种新模型不仅询问“此人现在能否通过验证？”，更进一步追问“这是否符合我们对该账户及其既有行为的了解？” [资料 1]。

Cloudflare 的账户滥用防护（Account Abuse Protection, AAP）正是这一转变的体现。它通过构建账户的“状态化概览”，帮助网站所有者检测和调查登录及注册活动中的滥用行为。AAP 收集每个账户的历史行为、网络和设备信号，随着时间的推移建立账户的典型行为模式，从而更容易识别有意义的偏差。新推出的仪表板为欺诈分析师提供了账户总览，能够识别可疑趋势，并深入具体账户进行调查 [资料 1]。例如，在调查凭证填充攻击时，该仪表板可以帮助团队识别出约 2.4K 个使用了泄露凭证的事件，并进一步缩小调查范围，找出可能受影响的账户 [资料 1]。

![Follow the thread: a new dashboard to investigate account ab](/assets/ai/ai-driven-security-revolution/8329c8d285c0.png)
*图：blog.cloudflare.com · [Follow the thread: a new dashboard to in](https://blog.cloudflare.com/account-abuse-protection-dashboard)*

## AI 代理与开发者工具的演进

AI 不仅在安全领域带来挑战，也在重塑开发者工具和工作流程。AI 代理（agents）的兴起，使得本地开发环境的服务能够以前所未有的便捷方式暴露给外部。Cloudflare 的 Quick Tunnels 功能允许开发者通过一个简单的命令 `cloudflared tunnel --url http://localhost:5173`，快速地将其本地服务发布到一个临时的 URL，无需账户、域名或成本 [资料 2]。

随着 AI 代理在代码编写和部署中的应用日益广泛，Quick Tunnels 的采用呈指数级增长。Hacker News 上关于 Quick Tunnels 的讨论，就展示了 AI 代理如何独立发现并使用该功能来发布其构建的网站，甚至被形容为“在移动中进行代理工作时极其有用” [资料 2]。然而，这也引发了对潜在安全风险的担忧：AI 代理是否会无意中暴露敏感信息？

为了解决这一问题，Cloudflare 推出了受保护的 Quick Tunnels，允许开发者通过 `--allowed-mail` 参数指定允许访问的电子邮件地址或域名。访问者需要通过一次性 PIN 码验证其邮箱所有权，从而在不创建 Cloudflare 账户的情况下实现访问控制 [资料 2]。这种机制将身份验证（证明谁是访问者）与授权（决定是否允许访问）分离开来，并将授权规则保留在开发者本地机器上，确保了隐私和安全性 [资料 2]。

![Protected Quick Tunnels: simple accountless authentication f](/assets/ai/ai-driven-security-revolution/79896caae0c4.png)
*图：blog.cloudflare.com · [Protected Quick Tunnels: simple accountl](https://blog.cloudflare.com/protected-quick-tunnels)*

## Cloudflare Containers：为 AI 代理提供可编程的沙箱环境

AI 代理在执行任务时，需要快速、按需创建和管理沙箱环境。Cloudflare Containers 的重构正是为了满足这些需求。新的调度策略将沙箱的控制权交给了应用程序代码，运行时也得到了优化，使得容器启动速度提升了 6 倍，中位数启动时间从超过 4 秒缩短到 648 毫秒 [资料 3]。

通过新的 `durable_object` 调度策略，开发者可以在运行时动态选择每个沙箱的镜像和实例类型。这意味着，一个 Durable Object 可以根据任务需求，启动不同类型（如 Node.js 或 Python）和不同计算资源的容器。这种灵活性极大地简化了部署流程，将过去需要独立应用程序和部署配置的工作，转变为简单的代码逻辑 [资料 3]。例如，可以根据任务的性质（如构建或开发）来选择合适的实例类型，或者通过哈希 Durable Object ID 来实现新工具链的灰度发布，确保代理在执行任务过程中不会中断其工作环境 [资料 3]。这种将基础设施即代码（Infrastructure as Code）的理念延伸到运行时环境的构建，为 AI 代理提供了前所未有的灵活性和效率。

![账户滥用防护仪表板关键数据：2.4K|事件产生泄露的用户名或密码结果；11.7K|凭证被归类为干净的事件](/assets/ai/ai-driven-security-revolution/40bda7696000.svg)
*图：账户滥用防护仪表板关键数据（据 [blog.cloudflare.com](https://blog.cloudflare.com/account-abuse-protection-dashboard)）*

![受保护 Quick Tunnels 的设计要求：保持 Quick Tunnels 无账户；不改变公共 Quick Tunnels 的请求路径；避免每次请求都进行](/assets/ai/ai-driven-security-revolution/0ace2e3393dc.svg)
*图：受保护 Quick Tunnels 的设计要求（据 [blog.cloudflare.com](https://blog.cloudflare.com/protected-quick-tunnels)）*

![Cloudflare Containers 性能提升：6x|容器启动速度提升；648 毫秒|中位数启动时间](/assets/ai/ai-driven-security-revolution/0fb9893e71ee.svg)
*图：Cloudflare Containers 性能提升（据 [blog.cloudflare.com](https://blog.cloudflare.com/faster-agent-sandboxes)）*

## 参考资料

1. [Follow the thread: a new dashboard to investigate account abuse](https://blog.cloudflare.com/account-abuse-protection-dashboard) — blog.cloudflare.com
2. [Protected Quick Tunnels: simple accountless authentication for your next dev project](https://blog.cloudflare.com/protected-quick-tunnels) — blog.cloudflare.com
3. [Cloudflare Containers, rebuilt to scale agent sandboxes](https://blog.cloudflare.com/faster-agent-sandboxes) — blog.cloudflare.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）；剥掉 1 个资料清单外的链接：http://localhost:5173`。发布前请人工核对事实与出处。 -->
