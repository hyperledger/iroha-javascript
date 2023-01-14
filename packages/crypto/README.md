# `@iroha2/monorepo-crypto`

The `@iroha2/monorepo-crypto` package is a service package to handle everything related to crypto.

## Contents

The package contains the following packages:

- [crypto-core](./packages/crypto/core/)  provides unified crypto interface for Iroha 2 (`IrohaCryptoInterface`)
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
-
    - компайл-тайм проверка, что каждый пакет экспортирует один и тот же `crypto`.
        - Может быть сделана поверх билда в отдельном служебном модуле типа такого:
          ```typescript
          import { crypto as node } from '@iroha2/crypto-target-node'
          import { crypto as web } from '@iroha2/crypto-target-web'
          import { crypto as bundler } from '@iroha2/crypto-target-bundler'
          import { IrohaCryptoInterface} from '@iroha2/crypto-core'
        
          type test1 = Expect<Equal<typeof node, IrohaCryptoInterface>>
          type test2 = Expect<Equal<typeof web, IrohaCryptoInterface>>
          type test3 = Expect<Equal<typeof bundler, IrohaCryptoInterface>>
          ```
          Но для этого нужно, чтобы каждый `target` и `core` взаправду содержал целую свою копию всех типов, построенных
          поверх `wasm-pack`, ведь именно унифицированность wasm мы и проверяем.
- Каждый таргет билдится отдельно, но все имеют общий механизм компиляции интерфейса. Есть модуль `@iroha2/crypto-interface-wrap`, который и содержит обёртку. Обёртка импортирует виртуальный модуль `~wasm-pack-build`. При билде каждого таргета этот модуль на уровне роллапа переадресуется на соответствующие артефакты `wasm-pack` для каждой платформы. В случае с `core` - пеадресуется на какой-нибудь из таргетов, неважно - ведь импорт происходит чисто на уровне типов.
- Артефакты `wasm-pack` собираются один раз и сохраняются в Git. Лежат в папке `crypto-rs/wasm-pack-dist/(web|bundler|nodejs)`. Из них вычищен мусор типа ридми и `package.json` и оставлены только нужные для билда скрипты.
- Артефакты `core` и таргетов не сохраняются в Git. Они собираются со всеми остальными артефактами в монорепозитории на стадии `postinstall`. Это нужно, чтобы сработал type-check.
- Тесты обёртки проводятся в nodejs. Пара сквозных тестов проводятся в браузере.