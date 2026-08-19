---
title: Cloudflare Workers 多层缓存实践
slug: cf-workers-caching
summary: 在边缘计算环境下用四层缓存把渲染成本压到最低。
tags: [cloudflare, cache]
language: zh
---

## 背景

个人博客部署在 Cloudflare Workers 上，渲染成本直接映射为账单。本文记录四层缓存的设计。

## 缓存分层

边缘缓存命中时请求根本不会到达 Workers：

| 层 | 载体 | 命中率目标 |
|----|------|-----------|
| L1 | 浏览器/SW | - |
| L2 | CDN Edge | >= 90% |
| L3 | KV 副本 | 兜底 |

### 失效策略

发布文章时精准失效相关页面，兜底 TTL 一小时：

```ts
export async function invalidate(scope: string, keys: string[]) {
  await Promise.all(keys.map((k) => caches.default.delete(new Request(k))));
  console.log(`invalidated ${scope}: ${keys.length} keys`);
}
```

### 注意事项

- 评论走 CSR，静态页不含动态数据
- 语言前缀 `/en` `/zh` 是独立缓存键

## 结论

**缓存命中率**是这套架构最重要的指标，没有之一。
