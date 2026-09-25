---
title: "云原生安全与网络性能的演进：从数据泄露防范到连接加速"
slug: cloud-native-security-and-network-performance-evolution
language: zh
summary: "本文探讨了云原生技术在安全和性能方面面临的挑战与解决方案。从Cloudflare Containers面临的跨租户数据泄露漏洞，到Tailscale在网络连接速度和效率上的持续优化，展现了技术演进的两个关键维度。文章综合了两篇资料，揭示了在保障数据安全的同时，如何通过技术创新提升用户体验。"
tags: [云原生, 网络安全, 性能优化, AI]
draft: true
published_at: 2026-09-25
---

![云原生安全与网络性能的演进：从数据泄露防范到连接加速](/assets/ai/cloud-native-security-and-network-performance-evolution/d410b2efaa88.svg)

在快速发展的云原生技术领域，安全性和性能是两个永恒的关注点。近期，安全研究人员发现并报告了影响Cloudflare Containers的跨租户数据泄露漏洞，这一事件凸显了在多租户环境中隔离和保护用户数据的复杂性。与此同时，Tailscale则在持续优化其网络连接的性能，致力于为用户提供更快速、更可靠的连接体验。

## 云原生环境下的数据安全挑战

Cloudflare Containers在多租户基础设施上运行工作负载，并自动分配给符合条件的服务器。安全研究人员发现，拥有Workers Paid账户的客户有可能恢复同一主机上先前由Containers使用过的残留磁盘块 [资料 1]。这一漏洞的根源在于Linux设备映射器精简配置（dm-thin）在处理磁盘块分配时的行为。当容器的根磁盘被删除时，其物理块会被返回到一个为多个客户账户提供服务的池中。由于配置中启用了`skip_block_zeroing`选项，dm-thin在分配新块时不会先将其清零，导致先前分配的块可能包含来自前一个租户的数据。攻击者可以通过特定的写入和读取操作，在不写入的情况下读取到这些残留数据 [资料 1]。

研究人员通过ext4目录块校验和来区分属于自己测试文件系统和属于其他文件系统的块，并在18个部署和22个底层节点中观察到了残留数据，包括目录结构、数据库页面和完整的SQLite数据库 [资料 1]。尽管如此，Cloudflare强调，该技术无法针对特定客户、工作负载、主机或数据，并且残留数据并非必然存在。更重要的是，Cloudflare表示没有证据表明客户数据已被泄露，并且在报告漏洞后迅速进行了修复。修复措施包括移除`skip_block_zeroing`配置，并退休所有运行中的容器磁盘和清除缓存的镜像快照，以确保所有新分配的块都被清零 [资料 1]。

![How Cloudflare addressed a cross-tenant data exposure vulner](/assets/ai/cloud-native-security-and-network-performance-evolution/2b2661654df1.png)
*图：blog.cloudflare.com · [How Cloudflare addressed a cross-tenant ](https://blog.cloudflare.com/containers-cross-tenant-vulnerability)*

## 网络连接性能的持续提升

与数据安全挑战相对应的是对网络性能的极致追求。Tailscale作为一家专注于互联网连接的公司，一直在不断提升其网络服务的速度和效率。他们通过多项技术改进，显著提升了数据传输的吞吐量和降低了延迟。

Tailscale在优化小数据包处理方面取得了进展。过去，为了利用Linux的通用接收卸载（GRO）等高效工具，Tailscale需要准备好接收64 KiB的流量，即使数据包只有1 KiB。这意味着每次传输小数据包时，都需要将其复制到一个64 KiB的缓冲区中。现在，Tailscale在Linux和Android上改进了这一流程，允许数据包在原地处理，减少了不必要的复制，使得小数据包在内存中保持较小尺寸，从而在许多网络配置下实现了约5%的速度提升 [资料 2]。

此外，Tailscale引入了多队列技术，用于子网路由器、应用连接器和出口节点。此前，这些节点处理多个独立数据流时，使用的是单一线程流水线。多队列系统通过引入多个并行处理通道，将工作分散到不同的CPU核心，显著提高了聚合容量并降低了数据包的延迟。这使得硬件资源得到更有效的利用，特别是对于需要处理大量用户和短连接的应用连接器和出口节点，性能提升尤为明显 [资料 2]。

Tailscale还利用Linux的`writev`能力，允许一次性将多个数据块传递给内核，减少了内存复制和写操作，提高了吞吐量。在启动速度方面，Tailscale引入了网络映射（netmap）缓存机制。在网络条件不佳时，设备可以利用本地缓存的网络映射信息，在与控制平面通信之前就能与其他设备建立连接，从而加快了启动速度，尤其是在不稳定的网络环境中 [资料 2]。

![Making Tailscale Faster](/assets/ai/cloud-native-security-and-network-performance-evolution/f3bba2cf324f.png)
*图：tailscale.com · [Making Tailscale Faster](https://tailscale.com/blog/making-tailscale-faster)*

## 安全与性能的协同演进

Cloudflare和Tailscale的案例展示了云原生技术在安全和性能两个维度上的协同演进。一方面，需要不断加固安全防线，防止数据泄露和未经授权的访问，尤其是在复杂的跨租户环境中 [资料 1]。另一方面，通过精细化的性能优化，提升用户体验，满足日益增长的业务需求，如实时数据处理、远程开发等 [资料 2]。

这两家公司都在积极探索和应用最新的技术，如Linux的设备映射器、多队列技术、`writev`以及缓存机制等，来解决各自领域的核心问题。这些技术创新不仅提升了各自产品的竞争力，也为整个云原生生态系统的发展提供了宝贵的经验和借鉴。在未来，随着AI等技术的进一步融合，云原生安全和性能的优化将进入一个更加智能和高效的新阶段。

![Cloudflare Containers 安全修复成效：2700|识别出的外来目录inode；18|观察到残留材料的部署数量；20|观察到残留材料的底层节点数](/assets/ai/cloud-native-security-and-network-performance-evolution/111c0ce816d9.svg)
*图：Cloudflare Containers 安全修复成效（据 [blog.cloudflare.com](https://blog.cloudflare.com/containers-cross-tenant-vulnerability)）*

![Tailscale 性能优化效果：5%|小数据包处理速度提升；4x|UDP应用吞吐量提升（历史数据）](/assets/ai/cloud-native-security-and-network-performance-evolution/25bc957c7ac2.svg)
*图：Tailscale 性能优化效果（据 [tailscale.com](https://tailscale.com/blog/making-tailscale-faster)）*

![Tailscale 性能优化关键技术：减少小数据包内存开销；引入多队列处理；利用writev提升吞吐量；部署netmap缓存加速启动](/assets/ai/cloud-native-security-and-network-performance-evolution/ff0db3dacdc4.svg)
*图：Tailscale 性能优化关键技术（据 [tailscale.com](https://tailscale.com/blog/making-tailscale-faster)）*

## 参考资料

1. [How Cloudflare addressed a cross-tenant data exposure vulnerability in Containers](https://blog.cloudflare.com/containers-cross-tenant-vulnerability) — blog.cloudflare.com
2. [Making Tailscale Faster](https://tailscale.com/blog/making-tailscale-faster) — tailscale.com


<!-- 待核实: 溯源不足 —— 只引到 0 条资料（要求 2 条）。发布前请人工核对事实与出处。 -->
