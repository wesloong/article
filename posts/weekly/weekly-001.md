---
title: "第 1 期"
slug: weekly-001
category: weekly
language: zh
summary: "本期 20 条：工程实践 5 · 工具与生态 6 · 行业动态 9"
ai_assisted: true
published_at: 2026-08-20
---

## 工程实践

- **[A revisit of remote Spectre attacks on Cloudflare Workers](https://blog.cloudflare.com/revisiting-spectre-attacks-on-workers)** — 文章深入分析了 Cloudflare Workers 在 2024-2025 年间对远程 Spectre 攻击的重新评估，详细介绍了新的攻击向量和缓解措施，对于理解和防御此类底层安全威胁非常有价值。
  <sub>via blog.cloudflare.com</sub>
- **[How Cloudflare detects MCP traffic and helps secure it](https://blog.cloudflare.com/mcp-security-updates)** — Cloudflare Gateway 如何通过协议特征检测 MCP 流量，并帮助安全团队识别和控制“影子”MCP 应用，为企业内部应用的安全管理提供了具体的技术方案。
  <sub>via blog.cloudflare.com</sub>
- **[Secure all your internal vibe-coded applications — in one click](https://blog.cloudflare.com/workers-protected-by-access)** — Cloudflare Access for Workers 允许将访问策略直接附加到 Worker，实现对所有 Worker 运行环境（包括 routes, workers.dev 等）的一键式安全防护，极大简化了内部应用的访问控制。
  <sub>via blog.cloudflare.com</sub>
- **[Unveiling good and bad behaviors on the Agentic Internet](https://blog.cloudflare.com/good-and-bad-agentic-behaviors)** — Cloudflare 正在将机器人缓解策略从一次性风险评估转向持续信任评估，并介绍了评估机器人和 AI 代理行为的新方法，这对于构建更安全的 Agentic Internet 至关重要。
  <sub>via blog.cloudflare.com</sub>
- **[The next generation of MCP](https://blog.cloudflare.com/mcp-v2)** — 新版 MCP 核心重写并运行在 Workers 上，采用无状态设计，并对协议、功能生命周期和 SDK 迁移进行了升级，为开发者提供了更稳定、可扩展的解决方案。
  <sub>via blog.cloudflare.com</sub>

## 工具与生态

- **[Introducing Radar Researcher: An AI tool for exploring Internet data in plain language](https://blog.cloudflare.com/introducing-radar-researcher)** — Cloudflare 推出了一个基于 AI 的新工具，可以用自然语言查询互联网数据，这对于快速洞察网络趋势非常有价值，并且完全构建在 Cloudflare 的开发者平台上。
  <sub>via blog.cloudflare.com</sub>
- **[Unifying Workers AI and AI Gateway into a single AI control plane](https://blog.cloudflare.com/workers-ai-gateway-unification)** — 将 Workers AI 和 AI Gateway 合并为一个统一的 AI 控制平面，为开发者提供了跨 GPU 和第三方提供商的统一管理、可观测性和计费能力，简化了 AI 应用的开发和部署。
  <sub>via blog.cloudflare.com</sub>
- **[Cloudflare AI Search: give your agents a search engine for your data](https://blog.cloudflare.com/ai-search-easier)** — Cloudflare AI Search 允许开发者轻松地为自己的数据（文件、网站）构建搜索功能，无需复杂的集成，极大地降低了 AI 搜索应用的门槛。
  <sub>via blog.cloudflare.com</sub>
- **[Introducing Kitesurf: The agent-first browser that runs in V8 isolates on Cloudflare Workers](https://blog.cloudflare.com/kitesurf)** — Kitesurf 是一个在 Cloudflare Workers 上运行的、面向 AI 代理的浏览器，它在 V8 隔离环境中执行，具有无状态、高扩展性和成本效益的特点，为 AI 模型提供了优化的浏览工具。
  <sub>via blog.cloudflare.com</sub>
- **[Give any website a WebMCP interface](https://blog.cloudflare.com/webmcp)** — WebMCP 允许任何网站无需修改源站或添加新 API，即可获得 WebMCP 接口，使其能被浏览器 AI 代理使用，同时保留用户对人类访问的控制权，是实现网站 AI 兼容性的便捷方案。
  <sub>via blog.cloudflare.com</sub>
- **[Certificate Transparency Monitoring is now generally available](https://blog.cloudflare.com/certificate-transparency-monitoring-ga)** — Cloudflare 的证书透明度监控现已普遍可用，并且改变了通知方式，这意味着用户需要主动查看警报，这对于及时发现潜在的安全风险至关重要。
  <sub>via blog.cloudflare.com</sub>

## 行业动态

- **[From ranking to recommended: get your site ready to thrive in the age of AI agents](https://blog.cloudflare.com/aeo)** — 随着 AI 代理请求的增加，文章探讨了如何优化网站以适应 AI 代理的发现和阅读，并介绍了 Answer Engine Optimization，这对于理解未来互联网流量构成至关重要。
  <sub>via blog.cloudflare.com</sub>
- **[Building an open Agentic Internet: readable, discoverable, callable, and payable](https://blog.cloudflare.com/the-agentic-internet)** — 文章阐述了构建开放的 Agentic Internet 的愿景，强调了可读性、可发现性和可调用性，并介绍了 Cloudflare 在此方向上提供的工具和协议，预示着互联网交互的新范式。
  <sub>via blog.cloudflare.com</sub>
- **[Everything we launched during Agents Week](https://blog.cloudflare.com/agents-week-review-august-2026)** — 这是对 Cloudflare Agents Week 发布内容的一次全面回顾，涵盖了从 Wallets 到 Radar 的各项公告，有助于快速了解近期在 AI 代理领域的重要进展。
  <sub>via blog.cloudflare.com</sub>
- **[Cloudflare DDoS Threat Report H1 2026: 1 Tbps attacks soar as DNS floods and geopolitical tensions drive a new wave](https://blog.cloudflare.com/ddos-threat-report-2026-h1)** — 该报告揭示了 2026 年上半年 DDoS 攻击的严峻形势，特别是超大流量攻击的激增以及 DNS 洪水等利用方式，为理解当前网络安全威胁提供了重要数据支撑。
  <sub>via blog.cloudflare.com</sub>
- **[Announcing Cloudflare Ambassadors, Community Engineers, and another $1M in open-source funding](https://blog.cloudflare.com/community-program-refresh)** — Cloudflare 宣布了新的社区项目和对开源的大额资助，这表明了其对开发者生态的重视和投入，有助于社区的长期发展。
  <sub>via blog.cloudflare.com</sub>
- **[BGP Role model: tracking the adoption of RFC 9234](https://blog.cloudflare.com/rfc9234-bgp-role-model)** — 该文追踪了 RFC 9234 在 BGP 中的采用情况，揭示了部分大型网络在路由泄漏防护上的不足，提供了关于互联网路由安全实践的宝贵数据和见解。
  <sub>via blog.cloudflare.com</sub>
- **[Total eclipse of the Internet: traffic impacts in Iceland, Spain, and Portugal](https://blog.cloudflare.com/total-eclipse-internet-traffic-iceland-spain-portugal)** — 通过分析日全食期间冰岛、西班牙和葡萄牙的互联网流量数据，Cloudflare 展示了大型天文事件对网络活动产生的显著影响，为理解全球网络行为提供了独特视角。
  <sub>via blog.cloudflare.com</sub>
- **[Serving the most critical missions: Cloudflare for Government achieves FedRAMP Class D (High) Certified status](https://blog.cloudflare.com/fedramp-class-d-certification)** — Cloudflare for Government 获得了 FedRAMP Class D (High) 认证，并计划申请 DoD IL4 授权，这表明其在满足美国政府高安全合规性方面取得了重要进展，对相关领域的企业有参考意义。
  <sub>via blog.cloudflare.com</sub>
- **[Cloudflare is the only vendor named a Visionary in 2026 SASE and SSE reports](https://blog.cloudflare.com/cloudflare-sase-sse-gartner-magic-quadrants-2026)** — Cloudflare 在 SASE 和 SSE 领域均被 Gartner 评为 Visionary，这标志着其在网络安全和边缘计算领域的领先地位和技术实力，对行业有参考价值。
  <sub>via blog.cloudflare.com</sub>
