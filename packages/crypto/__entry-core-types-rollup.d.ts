// this file contains generic, environment-agnostic interface of Iroha Crypto library
// Also it is a rollup input, because here it depends on dist/web pkg which is not correct -
// dependency should be reversed. Because of this, there is the main lib.d.ts file with bundled definitions
// and each pkg in dist dir contains its own interfaces.d.ts and interfaces.js file with export according to
// IrohaCryptoInterface

import {
  AlgorithmBlsNormal,
  AlgorithmBlsSmall,
  AlgorithmEd25519,
  AlgorithmSecp256k1,
  MultihashDigestBls12381g1Pub,
  MultihashDigestBls12381g2Pub,
  MultihashDigestEd25519Pub,
  MultihashDigestSecp256k1Pub,
  createHash,
  createKeyGenConfiguration,
  createKeyPairFromKeys,
  createMultihashDigestFunctionFromString,
  createMultihashFromBytes,
  createMultihashFromPublicKey,
  createPrivateKeyFromJsKey,
  createPublicKeyFromMultihash,
  createSignature,
  generateKeyPairWithConfiguration,
} from '@iroha2/crypto-target-web/wasm_pack_output'

export {
  KeyGenConfiguration,
  KeyPair,
  PublicKey,
  PrivateKey,
  Signature,
  Algorithm,
  Hash,
  Multihash,
  MultihashDigestFunction,
  Key,
} from '@iroha2/crypto-target-web/wasm_pack_output'

export interface IrohaCryptoInterface {
  createHash: typeof createHash
  createKeyGenConfiguration: typeof createKeyGenConfiguration
  createPublicKeyFromMultihash: typeof createPublicKeyFromMultihash
  createSignature: typeof createSignature
  createPrivateKeyFromJsKey: typeof createPrivateKeyFromJsKey
  generateKeyPairWithConfiguration: typeof generateKeyPairWithConfiguration
  createMultihashFromPublicKey: typeof createMultihashFromPublicKey
  createMultihashDigestFunctionFromString: typeof createMultihashDigestFunctionFromString
  createMultihashFromBytes: typeof createMultihashFromBytes
  MultihashDigestBls12381g1Pub: typeof MultihashDigestBls12381g1Pub
  MultihashDigestBls12381g2Pub: typeof MultihashDigestBls12381g2Pub
  MultihashDigestEd25519Pub: typeof MultihashDigestEd25519Pub
  MultihashDigestSecp256k1Pub: typeof MultihashDigestSecp256k1Pub
  AlgorithmBlsNormal: typeof AlgorithmBlsNormal
  AlgorithmBlsSmall: typeof AlgorithmBlsSmall
  AlgorithmEd25519: typeof AlgorithmEd25519
  AlgorithmSecp256k1: typeof AlgorithmSecp256k1
  createKeyPairFromKeys: typeof createKeyPairFromKeys
}
