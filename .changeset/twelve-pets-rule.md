---
'@iroha2/client': major
---

**refactor!**: make `Torii` stateless; force prerequisites to be passed for each method.

##### What is the change

Previously, `Torii` was a class, and its constructor accepted all prerequisites at once:

```ts
const torii = new Torii({ apiURL, telemetryURL, fetch, ws })

torii.submit(transaction)
torii.getStatus()
torii.listenForEvents({ filter })
```

Now, `Torii` is a compendium of different methods. Each method has its own prerequisites:

```ts
Torii.submit({ apiURL, fetch }, transaction)

Torii.getStatus({ telemetryURL, fetch })

Torii.listenForEvents({ apiURL, ws }, { filter })
```

##### Why the change was made

This change was introduced to allow you only provide the prerequisites each method actually needs. For example, you no longer need to provide `ws` when all you want to do is submit a transaction. Only `fetch` and `apiURL` are needed for transaction to be submitted.

##### How to update your code

You should pass your prerequisites for each `Torii` method invocation.

Previously, you had to create a single `Torii` instance:

```ts
const torii = new Torii({ apiURL, telemetryURL, fetch, ws })
```

You no longer need a single `Torii` instance. Instead, you create an object with necessary prerequisites:

```ts
const pre = { apiURL, fetch }
```

Then pass the prerequisites when you need to call this method:

```ts
Torii.submit(pre, transaction)
```
