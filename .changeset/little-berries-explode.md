---
'@iroha2/data-model': major
---

**refactor!**: join all data-model types as `datamodel` namespace export

##### What is the change

Previously, all data-model types were imported directly from the package:

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


- To make it easier to distinguish data-model related exports from other utilities as there used to be too many root-level package exports, not always related to each other.
- To make data model more compatible with how it is presented in Java SDK

##### How the consumer should update their code

The consumer should replace all data-model imports with `datamodel.*`.
