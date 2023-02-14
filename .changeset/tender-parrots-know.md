---
'@iroha2/data-model': major
---

**refactor!**: update major version of `@scale-codec/*` - new wrapped enums and stronger types

#### How a consumer should update their code

[//]: # 'TODO add changelog links and finalize changeset'

For how new enums work refer to the changelog of `@scale-codec/enum`.

In short:

```ts
import { Value } from '@iroha2/data-model'

const value = Value('U32', 42)

// - Accessing the enum itself with `.enum`
// - `.tag === 'U32'` instead of `.is('U32')`
if (value.enum.tag === 'U32') {
  // Accessing enum content directly, with type narrowing
  const num1: number = value.enum.content

  // Also works
  const num2: number = value.enum.as('U32')
  const _: never = value.enum.as('U128')
}
```

For how new compilation model is changed please refer to the CHANGELOG of `@scale-codec/definition-compiler`.

The most significant change is accessing all enums with `.enum` accessor:
