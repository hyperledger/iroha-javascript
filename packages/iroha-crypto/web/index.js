import init, {createHash,createKeyGenConfiguration,createPublicKeyFromMultihash,createSignature,createPrivateKeyFromJsKey,generateKeyPairWithConfiguration,createMultihashFromPublicKey,createMultihashDigestFunctionFromString,createMultihashFromBytes,MultihashDigestBls12381g1Pub,MultihashDigestBls12381g2Pub,MultihashDigestEd25519Pub,MultihashDigestSecp256k1Pub,AlgorithmBlsNormal,AlgorithmBlsSmall,AlgorithmEd25519,AlgorithmSecp256k1,createKeyPairFromKeys} from './wasm_pack_output'
const crypto = {createHash,createKeyGenConfiguration,createPublicKeyFromMultihash,createSignature,createPrivateKeyFromJsKey,generateKeyPairWithConfiguration,createMultihashFromPublicKey,createMultihashDigestFunctionFromString,createMultihashFromBytes,MultihashDigestBls12381g1Pub,MultihashDigestBls12381g2Pub,MultihashDigestEd25519Pub,MultihashDigestSecp256k1Pub,AlgorithmBlsNormal,AlgorithmBlsSmall,AlgorithmEd25519,AlgorithmSecp256k1,createKeyPairFromKeys}
export { init, crypto }