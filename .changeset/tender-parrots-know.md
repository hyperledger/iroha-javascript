---
'@iroha2/data-model': major
---

**refactor!**: update major version of `@scale-codec/*` - new wrapped enums and stronger types

The change in short is the following:

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

Please consider the following changelogs for in-detail explanations:

- [`@scale-codec/enum@2.0.0`](https://github.com/soramitsu/scale-codec-js-library/blob/master/packages/enum/CHANGELOG.md#200)
- [`@scale-codec/definition-compiler@4.0.0`](https://github.com/soramitsu/scale-codec-js-library/blob/master/packages/definition-compiler/CHANGELOG.md#400)
