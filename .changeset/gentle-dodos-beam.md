---
'@iroha2/client': major
---

**feat!**: move isomorphic http/ws adapters out of `Client` internals; expose `@iroha2/client/web-socket/native` and `@iroha2/client/web-socket/node` adapters

## Why the change

Previously, `@iroha2/client` used `@iroha2/client-isomorphic-ws` and `@iroha2/client-isomorphic-fetch` to seamlessly switch between environment-specific transports.

The switching was done by `module` and `main` fields in `package.json` files due to how they work in CommonJS (CJS) and ESM contexts. In Node.js it was supposed to always be CJS context, and ESM was for browser context with its native APIs. 

However, Node.js is moving towards ESM, and our way to achieve isomorphism no longer works in this case. In ESM, our hack tries to use a browser's native `fetch` and `WebSocket`, which aren't available in Node.js. So we needed to find some other way.

## What is the change

We looked at how [`isomorphic-git`](https://github.com/isomorphic-git/isomorphic-git/tree/main#getting-started) solves the same problem and decided to force the end users to inject `fetch` and `ws` by themselves.

Note that `fetch` injection is optional in the environment where Fetch API is available (i.e. in Browser or in Node > 17.5). Also, `@iroha2/client` exposes prepared adapters for WebSockets based on native `WebSocket` and on [`ws`](https://www.npmjs.com/package/ws) library.

## How to migrate

Provide `fetch`/`ws` by yourself. Follow the instruction in [`client` README](../packages/client/README.md#isomorphic-transports).
