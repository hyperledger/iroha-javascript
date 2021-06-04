# @iroha/map-to-scale-definitions

This small package contains logic of conversion the output of the `iroha-introspect` (from Rust) to definitions that can be used by `@iroha/scale-codec-legacy` & `@iroha/scale-codec-legacy-typegen`.

### API

Input Rust JSON:

```json
{
    "iroha_crypto::Hash": {
        "UnnamedStruct": {
            "types": ["[u8; 32]"]
        }
    },
    "iroha_crypto::PublicKey": {
        "NamedStruct": {
            "declarations": [
                {
                    "name": "digest_function",
                    "ty": "String"
                },
                {
                    "name": "payload",
                    "ty": "Vec<u8>"
                }
            ]
        }
    }
}
```

Mapping:

```ts
import { mapRustDefinitionsToScaleDefinitions } from '@iroha/map-to-scale-definitions';
import rustDefinitions from './rust.json';

const definitions = mapRustDefinitionsToScaleDefinitions({ rustDefinitions });

console.log('%o', definitions);
```

Result:

```json
{
    "Hash": "[u8;32]",
    "PublicKey": {
        "digestFunction": "Text",
        "payload": "Bytes"
    }
}
```
