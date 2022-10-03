---
'@iroha2/client': major
---

**refactor!**: make `Torii` stateless; force passing prerequisites for each method.

##### What is the change

Previously `Torii` was a class, and its constructor accepted all prerequisites at once:

```ts
const torii = new Torii({ apiURL, telemetryURL, fetch, ws })

torii.submit(transaction)
torii.getStatus()
torii.listenForEvents({ filter })
```

Now, `Torii` is a compendium of different methods, where each of them has its own prerequisites:

```ts
Torii.submit({ apiURL, fetch }, transaction)

Torii.getStatus({ telemetryURL, fetch })

Torii.listenForEvents({ apiURL, ws }, { filter })
```

##### Why the change was made

Each method has its own prerequisites. For example, you don't need to provide `ws` if your intention is to only submit a transaction - it requires `fetch` and `apiURL`.

Thus, the change was made to make it possible to **provide only what you need**.

##### How to update your code

You should pass your prerequisites for each `Torii` method invocation.

Instead of creating a single `Torii` instance:

```ts
const torii = new Torii({ apiURL, telemetryURL, fetch, ws })
```

you should create an object with necessary prerequisites:

```ts
const pre = { apiURL, fetch }
```

Then pass your prerequisites whereever you need:

```ts
Torii.submit(pre, transaction)
```
