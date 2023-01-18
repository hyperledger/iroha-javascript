# `@iroha2/monorepo-crypto`

The `@iroha2/monorepo-crypto` package is a service package to handle everything related to crypto.

## Contents

The package contains the following packages:

- [crypto-core](./packages/crypto/core/) provides unified crypto interface for Iroha 2 (`IrohaCryptoInterface`)
- [crypto-target-node](./packages/crypto/target-node/) provides compiled crypto WASM for the Node.js environment
- [crypto-target-web](./packages/crypto/target-web/) provides compiled crypto WASM for native Web (ESM)
- [crypto-target-bundler](./packages/crypto/target-bundler/) provides compiled crypto WASM to use with bundlers such as
  Webpack

## Tasks

Explore Jake tasks

```bash
pnpm jake -t
```

## Новая архитектура

- Каждый `target` экспортирует один и тот же `crypto`-omnibus
- Типы для `crypto` лежат в `@iroha2/crypto-core` под именем `IrohaCryptoInterface`
- `IrohaCryptoInterface` - это обёртка вокруг сырых биндингов `wasm-pack`.
- Код, который составляет `IrohaCryptoInterface`, лежит в одном месте, а не продублирован между каждым `target`-ом
- компайл-тайм проверка, что каждый пакет экспортирует один и тот же `crypto`.

  - Может быть сделана поверх билда в отдельном служебном модуле типа такого:

    ```typescript
    import { crypto as node } from '@iroha2/crypto-target-node'
    import { crypto as web } from '@iroha2/crypto-target-web'
    import { crypto as bundler } from '@iroha2/crypto-target-bundler'
    import { IrohaCryptoInterface } from '@iroha2/crypto-core'

    type test1 = Expect<Equal<typeof node, IrohaCryptoInterface>>
    type test2 = Expect<Equal<typeof web, IrohaCryptoInterface>>
    type test3 = Expect<Equal<typeof bundler, IrohaCryptoInterface>>
    ```

    Но для этого нужно, чтобы каждый `target` и `core` взаправду содержал целую свою копию всех типов, построенных
    поверх `wasm-pack`, ведь именно унифицированность wasm мы и проверяем.

- Каждый таргет билдится отдельно, но все имеют общий механизм компиляции интерфейса. Есть модуль `@iroha2/crypto-interface-wrap`, который и содержит обёртку. Обёртка импортирует виртуальный модуль `~wasm-pack-build`. При билде каждого таргета этот модуль на уровне роллапа переадресуется на соответствующие артефакты `wasm-pack` для каждой платформы. В случае с `core` - пеадресуется на какой-нибудь из таргетов, неважно - ведь импорт происходит чисто на уровне типов.
  - Сам пакет `@iroha2/crypto-interface-wrap` содержит `tsconfig`, в котором путь до `wasm-pack`-обёртки прописан на какой-нибудь из результатов компиляции - это нужно, чтобы можно было разрабатывать обёртку с поддержкой типов.
- Артефакты `wasm-pack` собираются один раз и сохраняются в Git. Лежат в папке `crypto-rs/wasm-pack-dist/(web|bundler|nodejs)`. Из них вычищен мусор типа ридми и `package.json` и оставлены только нужные для билда скрипты.
- Артефакты `core` и таргетов не сохраняются в Git. Они собираются со всеми остальными артефактами в монорепозитории на стадии `postinstall`. Это нужно, чтобы сработал type-check.
- Тесты обёртки проводятся в nodejs. Пара сквозных тестов проводятся в браузере.

### Rollup-схема

#### `target-node`

`packages/target-node/src/lib.ts`:

```ts
import * as crypto from '@iroha2/crypto-interface-wrap'

export { crypto }
```

Модуль `~wasm-pkg` подменяется на _нужный для роллапа код_, а содержимое `crypto-rs/wasm-pkg-nodejs` копируется как есть в `packages/target-node/dist/wasm-pkg`. При этом ссылка `./wasm-pkg/iroha_crypto` экстернализируется для роллапа, чтобы он туда не смотрел - эта часть должна оставаться неприкосновенной.

Нужный для роллапа код:

- `esm`:
  ```ts
  import { createRequire } from 'module'
  const wasmPkg = createRequire(import.meta.url)('./wasm-pkg/iroha_crypto')
  ```
- `cjs`: просто переадресация на экстернализированный `./wasm-pkg/iroha_crypto`.

`packages/target-node/dist/lib.cjs`:

```ts
const wasmPkg = require('./wasm-pkg/iroha_crypto')

// wrap around `wasmPkg`

const crypto = namespace_built_from_the_wrap /* */

module.exports = { crypto }
```

`packages/target-node/dist/lib.esm`:

```ts
import { createRequire } from 'module'
const wasmPkg = createRequire(import.meta.url)('./wasm-pkg/iroha_crypto')

// making a wrap around wasmPkg

export const crypto = namespace_built_on_top_of_wrap
```

`packages/target-node/dist/lib.d.ts`:

```ts
import * as wasmPkg from './wasm-pkg/iroha_crypto'

// making wrap

declare namespace lib {
  // ...
}

export { lib as crypto }
```

#### `target-web`

`packages/target-web/src/lib.ts`:

```ts
import * as crypto from '@iroha2/crypto-interface-wrap'
export { init } from '~wasm-pkg'

export { crypto }
```

`packages/target-web/dist/lib.mjs`:

```ts
import * as wasmPkg from './wasm-pkg/iroha_crypto'
export { init } from './wasm-pkg/iroha_crypto'

// wrap code

export const crypto = wrap_namespace
```

`packages/target-web/dist/lib.d.ts`: в сущности то же, что и `.mjs`, только с типами

В данном таргете подход тот же, что в [`target-node`](#target-node):

- `crypto-rs/wasm-pkg-web` скопирован в `packages/target-web/dist/wasm-pkg`
- модуль `~wasm-pkg` загружен как `export * from './wasm-pkg/iroha_crypto'`
- `./wasm-pkg/iroha_crypto` экстернализирован

#### `target-bundler`

Подход тот же, что в `target-web`. Только нет ре-экспорта `init`.
