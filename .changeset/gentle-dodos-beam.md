---
'@iroha2/client': major
---

**feat!**: move isomorphic http/ws adapters out of `Client` internals; expose `@iroha2/client/web-socket/native` and `@iroha2/client/web-socket/node` adapters

**Why the change was made**. Previously, `@iroha2/client` used `@iroha2/client-isomorphic-ws` and `@iroha2/client-isomorphic-fetch` to switch between environment-specific transports seamlessly. It was done by `module` & `main` fields in `package.json`s and due how they work in CommonJS context and ESM context. It was supposed that in Node.js it is always CJS context, and ESM stands for browser context with its native APIs. However, Node.js moves towards ESM further and further, and in this case previous hack to achieve isomorphism doesn't work - in ESM it tries to use Browser's native `fetch` and `WebSocket`, which aren't available in Node.js. So we needed to find some other way.

**What is the change**. We looked at how [`isomorphic-git`](https://github.com/isomorphic-git/isomorphic-git/tree/main#getting-started) solves the same problem and decided to force the end users to inject `fetch` and `ws` by themselves. Note that `fetch` injection is optional in the environment where Fetch API is available (i.e. in Browser or in Node > 17.5). Also, `@iroha2/client` exposes prepared adapters for WebSockets based on native `WebSocket` and on [`ws`](https://www.npmjs.com/package/ws) library.

**How to migrate**. You need to provide `fetch`/`ws` (depending on your need) by yourself. Please follow the instruction in README.
