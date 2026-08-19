---
title: Understanding React Server Components
slug: react-server-components
summary: What RSC actually changes about data fetching and bundle size.
tags: [react, nextjs]
language: en
---

## Why RSC

Server components let you keep heavy dependencies on the server.

```jsx
async function PostList() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.slug}>{p.title}</li>
      ))}
    </ul>
  );
}
```

## Trade-offs

1. No client-side state in server components
2. Streaming needs framework support

> RSC is a spectrum, not a switch.
