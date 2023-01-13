#![no_std]
#[macro_use]
extern crate alloc;

mod hash;
mod lib_tmp;
mod multihash;
mod signature;
mod utils;
mod varint;

use alloc::string::{String, ToString};
use core::{convert::TryFrom, str::FromStr};

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// use iroha_crypto_core::{
//     multihash::{DigestFunction as CoreMultihashDigestFunction, Multihash as CoreMultihash},
//     Algorithm as CoreAlgorithm, Hash as CoreHash, KeyGenConfiguration as CoreKeyGenConfiguration,
//     KeyPair as CoreKeyPair, PrivateKey as CorePrivateKey, PublicKey as CorePublicKey,
//     Signature as CoreSignature,
// };

use alloc::vec::Vec;

#[wasm_bindgen(start)]
pub fn main() {
    utils::set_panic_hook()
}

#[wasm_bindgen]
pub struct Signature {
    inner: CoreSignature,
}

#[wasm_bindgen(js_name=createSignature)]
pub fn create_signature(key_pair: &KeyPair, payload: &[u8]) -> Result<Signature, JsValue> {
    CoreSignature::new(&key_pair.inner, payload)
        .map_err(|err| err.to_string().into())
        .map(|val| Signature { inner: val })
}

#[wasm_bindgen]
impl Signature {
    /// Throws an error in case of failed verification and just succeeds if verification is passed
    pub fn verify(&self, payload: &[u8]) -> Result<(), JsValue> {
        self.inner
            .verify(payload)
            .map_err(|err| err.to_string().into())
    }

    #[wasm_bindgen(js_name = publicKey)]
    pub fn public_key(&self) -> PublicKey {
        PublicKey::wrap(self.inner.public_key.clone())
    }

    #[wasm_bindgen(js_name = signatureBytes)]
    pub fn signature(&self) -> Vec<u8> {
        self.inner.signature.clone()
    }
}

#[wasm_bindgen]
pub struct Algorithm {
    inner: CoreAlgorithm,
}

#[wasm_bindgen(js_name = AlgorithmBlsNormal)]
pub fn alg_bls_normal() -> Algorithm {
    Algorithm {
        inner: CoreAlgorithm::BlsNormal,
    }
}

#[wasm_bindgen(js_name = AlgorithmBlsSmall)]
pub fn alg_bls_small() -> Algorithm {
    Algorithm {
        inner: CoreAlgorithm::BlsSmall,
    }
}

#[wasm_bindgen(js_name = AlgorithmSecp256k1)]
pub fn alg_secp256k1() -> Algorithm {
    Algorithm {
        inner: CoreAlgorithm::Secp256k1,
    }
}

#[wasm_bindgen(js_name = AlgorithmEd25519)]
pub fn alg_ed25519() -> Algorithm {
    Algorithm {
        inner: CoreAlgorithm::Ed25519,
    }
}

/// Configuration of key generation
#[wasm_bindgen]
#[derive(Default, Clone, Debug)]
pub struct KeyGenConfiguration {
    inner: CoreKeyGenConfiguration,
}

#[wasm_bindgen(js_name=createKeyGenConfiguration)]
pub fn create_key_gen_config() -> KeyGenConfiguration {
    KeyGenConfiguration {
        inner: CoreKeyGenConfiguration::default(),
    }
}

#[wasm_bindgen]
#[allow(clippy::missing_const_for_fn)]
impl KeyGenConfiguration {
    #[wasm_bindgen(js_name=useSeed)]
    /// Use seed
    pub fn use_seed(mut self, seed: Vec<u8>) -> KeyGenConfiguration {
        self.inner = self.inner.use_seed(seed);
        self
    }

    #[wasm_bindgen(js_name=usePrivateKey)]
    /// Use private key
    pub fn use_private_key(mut self, private_key: &PrivateKey) -> KeyGenConfiguration {
        self.inner = self.inner.use_private_key(&private_key.inner);
        self
    }

    #[wasm_bindgen(js_name=withAlgorithm)]
    /// with algorithm
    pub fn with_algorithm(mut self, algorithm: Algorithm) -> KeyGenConfiguration {
        self.inner = self.inner.with_algorithm(algorithm.inner);
        self
    }
}

impl Into<CoreKeyGenConfiguration> for KeyGenConfiguration {
    fn into(self) -> CoreKeyGenConfiguration {
        self.inner
    }
}

#[wasm_bindgen(typescript_custom_section)]
const ITEXT_STYLE: &'static str = r#"
export interface Key {
    digestFunction: string;
    payload: string;
}
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Key")]
    pub type JsKey;

    #[wasm_bindgen(structural, method, getter, js_name = "digestFunction")]
    pub fn digest_function(this: &JsKey) -> String;

    #[wasm_bindgen(structural, method, getter)]
    pub fn payload(this: &JsKey) -> String;
}

#[wasm_bindgen]
pub struct PrivateKey {
    inner: CorePrivateKey,
}

impl Into<CorePrivateKey> for PrivateKey {
    fn into(self) -> CorePrivateKey {
        self.inner
    }
}

#[wasm_bindgen]
impl PrivateKey {
    #[wasm_bindgen(js_name = "digestFunction")]
    pub fn digest_function(&self) -> String {
        self.inner.digest_function.clone()
    }

    pub fn payload(&self) -> Vec<u8> {
        self.inner.payload.clone()
    }
}

#[wasm_bindgen(js_name = createPrivateKeyFromJsKey)]
pub fn private_key_from_js_key(key: &JsKey) -> PrivateKey {
    let digest_function = key.digest_function();
    let payload: String = key.payload();

    PrivateKey {
        inner: CorePrivateKey {
            digest_function,
            payload: hex::decode(&payload[..]).unwrap(),
        },
    }
}

impl PrivateKey {
    fn wrap(val: CorePrivateKey) -> Self {
        Self { inner: val }
    }
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct PublicKey {
    inner: CorePublicKey,
}

impl Into<CorePublicKey> for PublicKey {
    fn into(self) -> CorePublicKey {
        self.inner
    }
}

#[wasm_bindgen(js_name = "createPublicKeyFromMultihash")]
pub fn pub_key_from_multihash(multihash: &Multihash) -> Result<PublicKey, JsValue> {
    CorePublicKey::try_from(&multihash.inner)
        .map_err(|err| err.to_string().into())
        .map(|val| PublicKey { inner: val })
}

#[wasm_bindgen]
impl PublicKey {
    #[wasm_bindgen(js_name = "digestFunction")]
    pub fn digest_function(&self) -> String {
        self.inner.digest_function.clone()
    }

    pub fn payload(&self) -> Vec<u8> {
        self.inner.payload.clone()
    }
}

impl PublicKey {
    fn wrap(val: CorePublicKey) -> Self {
        Self { inner: val }
    }
}

#[wasm_bindgen]
pub struct KeyPair {
    inner: CoreKeyPair,
}

#[wasm_bindgen(js_name = generateKeyPairWithConfiguration)]
pub fn generate_key_pair_with_configuration(
    config: &KeyGenConfiguration,
) -> Result<KeyPair, JsValue> {
    CoreKeyPair::generate_with_configuration(config.clone().into())
        .map(|val| KeyPair { inner: val })
        .map_err(|err| err.to_string().into())
}

#[wasm_bindgen(js_name = createKeyPairFromKeys)]
pub fn key_pair_from_keys(public_key: &PublicKey, private_key: &PrivateKey) -> KeyPair {
    KeyPair {
        inner: CoreKeyPair {
            public_key: public_key.inner.clone(),
            private_key: private_key.inner.clone(),
        },
    }
}

#[wasm_bindgen]
impl KeyPair {
    #[wasm_bindgen(js_name = "publicKey")]
    pub fn public_key(&self) -> PublicKey {
        PublicKey::wrap(self.inner.public_key.clone())
    }

    #[wasm_bindgen(js_name = "privateKey")]
    pub fn private_key(&self) -> PrivateKey {
        PrivateKey::wrap(self.inner.private_key.clone())
    }
}

#[wasm_bindgen]
pub struct MultihashDigestFunction {
    inner: CoreMultihashDigestFunction,
}

#[wasm_bindgen(js_name = MultihashDigestEd25519Pub)]
pub fn multihash_digest_ed25519pub() -> MultihashDigestFunction {
    MultihashDigestFunction {
        inner: CoreMultihashDigestFunction::Ed25519Pub,
    }
}

#[wasm_bindgen(js_name = MultihashDigestSecp256k1Pub)]
pub fn multihash_digest_secp256k1pub() -> MultihashDigestFunction {
    MultihashDigestFunction {
        inner: CoreMultihashDigestFunction::Secp256k1Pub,
    }
}

#[wasm_bindgen(js_name = MultihashDigestBls12381g1Pub)]
pub fn multihash_digest_bls12381g1pub() -> MultihashDigestFunction {
    MultihashDigestFunction {
        inner: CoreMultihashDigestFunction::Bls12381G1Pub,
    }
}

#[wasm_bindgen(js_name = MultihashDigestBls12381g2Pub)]
pub fn multihash_digest_bls12381g2pub() -> MultihashDigestFunction {
    MultihashDigestFunction {
        inner: CoreMultihashDigestFunction::Bls12381G2Pub,
    }
}

#[wasm_bindgen(js_name=createMultihashDigestFunctionFromString)]
pub fn multihash_digest_function_from_string(
    val: String,
) -> Result<MultihashDigestFunction, JsValue> {
    CoreMultihashDigestFunction::from_str(&val[..])
        .map_err(|err| err.to_string().into())
        .map(|val| MultihashDigestFunction { inner: val })
}

// #[wasm_bindgen(js_name=multihashDigestFrom)]
// pub fn from_u64(val: u64) -> Result<MultihashDigestFunction, JsValue> {
//     CoreMultihashDigestFunction::try_from(val)
//         .map_err(|err| err.to_string().into())
//         .map(|val| MultihashDigestFunction { inner: val })
// }

#[wasm_bindgen]
impl MultihashDigestFunction {
    #[wasm_bindgen(js_name=toString)]
    pub fn to_string(&self) -> String {
        format!("{}", self.inner)
    }

    // #[wasm_bindgen]
    // pub fn to_u64(&self) -> u64 {
    //     let val = &self.inner;
    //     val.into()
    // }
}

#[wasm_bindgen]
pub struct Multihash {
    inner: CoreMultihash,
}

#[wasm_bindgen(js_name=createMultihashFromBytes)]
pub fn multihash_from_bytes(bytes: Vec<u8>) -> Result<Multihash, JsValue> {
    CoreMultihash::try_from(bytes)
        .map_err(|err| err.to_string().into())
        .map(|val| Multihash { inner: val })
}

#[wasm_bindgen(js_name=createMultihashFromPublicKey)]
pub fn from_public_key(public_key: &PublicKey) -> Result<Multihash, JsValue> {
    CoreMultihash::try_from(&public_key.inner)
        .map_err(|err| err.to_string().into())
        .map(|val| Multihash { inner: val })
}

#[wasm_bindgen]
impl Multihash {
    #[wasm_bindgen(js_name=toBytes)]
    pub fn to_bytes(&self) -> Result<Vec<u8>, JsValue> {
        Vec::try_from(&self.inner).map_err(|err| err.to_string().into())
    }

    #[wasm_bindgen(js_name=digestFunction)]
    pub fn digest_function(&self) -> MultihashDigestFunction {
        MultihashDigestFunction {
            inner: self.inner.digest_function,
        }
    }

    pub fn payload(&self) -> Vec<u8> {
        self.inner.payload.clone()
    }
}

#[wasm_bindgen]
pub struct Hash {
    inner: CoreHash,
}

#[wasm_bindgen(js_name=createHash)]
pub fn create_hash(input: &[u8]) -> Hash {
    Hash {
        inner: CoreHash::new(input),
    }
}

#[wasm_bindgen]
impl Hash {
    pub fn bytes(&self) -> Vec<u8> {
        self.inner.0.into()
    }
}
