---
'@iroha2/data-model': major
---

**refactor!**: join all data-model types as `datamodel` namespace export

##### What is the change

If previously all data-model types were imported directly from the package:

```ts
import { AccountId, DomainId } from '@iroha2/data-model'

const acc = AccountId({
  name: 'alice',
  domain_id: DomainId({
    name: 'wonderland',
  }),
})
```

Now all data-model types are joined into a single `datamodel` namespace:

```ts
import { datamodel } from '@iroha2/data-model'

const acc = datamodel.AccountId({
  name: 'alice',
  domain_id: datamodel.DomainId({
    name: 'wonderland',
  }),
})
```

##### Why the change was made

For a couple of reasons:

- There were too many root-level package exports, not always related to each other. Now it should be easier to distinguish data-model related exports from other utilities.
- To be more compatible with how data model is presented in Java SDK

##### How the consumer should update their code

The consumer should replace all data-model imports with `datamodel.*`.
