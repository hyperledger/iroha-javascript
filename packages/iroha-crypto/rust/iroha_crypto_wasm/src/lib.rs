#![no_std]
#[macro_use]
extern crate alloc;

mod utils;

use alloc::string::{String, ToString};
use core::{convert::TryFrom, str::FromStr};

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

use iroha_crypto_core::{
    multihash::{DigestFunction as CoreMultihashDigestFunction, Multihash as CoreMultihash},
    Algorithm as CoreAlgorithm, Hash as CoreHash, KeyGenConfiguration as CoreKeyGenConfiguration,
    KeyPair as CoreKeyPair, PrivateKey as CorePrivateKey, PublicKey as CorePublicKey,
    Signature as CoreSignature,
};

use alloc::vec::Vec;

#[wasm_bindgen(start)]
pub fn main() {
    utils::set_panic_hook()
}

#[wasm_bindgen]
pub struct Signature {
    inner: CoreSignature,
}

#[wasm_bindgen]
impl Signature {
    #[wasm_bindgen(constructor)]
    pub fn new(key_pair: &KeyPair, payload: &[u8]) -> Result<Signature, JsValue> {
        CoreSignature::new(&key_pair.inner, payload)
            .map_err(|err| err.to_string().into())
            .map(|val| Signature { inner: val })
    }

    pub fn verify(&self, payload: &[u8]) -> Result<(), JsValue> {
        self.inner
            .verify(payload)
            .map_err(|err| err.to_string().into())
    }

    #[wasm_bindgen(getter)]
    pub fn public_key(&self) -> PublicKey {
        PublicKey::wrap(self.inner.public_key.clone())
    }

    #[wasm_bindgen(getter)]
    pub fn signature(&self) -> Vec<u8> {
        self.inner.signature.clone()
    }
}

#[wasm_bindgen]
pub struct Algorithm {
    inner: CoreAlgorithm,
}

#[wasm_bindgen]
impl Algorithm {
    #[wasm_bindgen]
    pub fn bls_normal() -> Algorithm {
        Algorithm {
            inner: CoreAlgorithm::BlsNormal,
        }
    }

    #[wasm_bindgen]
    pub fn bls_small() -> Algorithm {
        Algorithm {
            inner: CoreAlgorithm::BlsSmall,
        }
    }

    #[wasm_bindgen]
    pub fn secp256k1() -> Algorithm {
        Algorithm {
            inner: CoreAlgorithm::Secp256k1,
        }
    }

    #[wasm_bindgen]
    pub fn ed25519() -> Algorithm {
        Algorithm {
            inner: CoreAlgorithm::Ed25519,
        }
    }
}

/// Configuration of key generation
#[wasm_bindgen]
#[derive(Default, Clone, Debug)]
pub struct KeyGenConfiguration {
    inner: CoreKeyGenConfiguration,
}

#[wasm_bindgen]
#[allow(clippy::missing_const_for_fn)]
impl KeyGenConfiguration {
    #[wasm_bindgen(constructor)]
    pub fn new() -> KeyGenConfiguration {
        KeyGenConfiguration {
            inner: CoreKeyGenConfiguration::default(),
        }
    }

    /// Use seed
    pub fn use_seed(mut self, seed: Vec<u8>) -> KeyGenConfiguration {
        self.inner = self.inner.use_seed(seed);
        self
    }

    /// Use private key
    pub fn use_private_key(mut self, private_key: &PrivateKey) -> KeyGenConfiguration {
        self.inner = self.inner.use_private_key(&private_key.inner);
        self
    }

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
    digest_function: string;
    payload: string;
}
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Key")]
    pub type JsKey;

    #[wasm_bindgen(structural, method, getter)]
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
    #[wasm_bindgen(getter)]
    pub fn digest_function(&self) -> String {
        self.inner.digest_function.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn payload(&self) -> Vec<u8> {
        self.inner.payload.clone()
    }

    pub fn from_js_key(key: &JsKey) -> PrivateKey {
        let digest_function = key.digest_function();
        let payload: String = key.payload();

        PrivateKey {
            inner: CorePrivateKey {
                digest_function,
                payload: hex::decode(&payload[..]).unwrap(),
            },
        }
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

#[wasm_bindgen]
impl PublicKey {
    #[wasm_bindgen(getter)]
    pub fn digest_function(&self) -> String {
        self.inner.digest_function.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn payload(&self) -> Vec<u8> {
        self.inner.payload.clone()
    }

    #[wasm_bindgen]
    pub fn from_multihash(multihash: &Multihash) -> Result<PublicKey, JsValue> {
        CorePublicKey::try_from(&multihash.inner)
            .map_err(|err| err.to_string().into())
            .map(|val| PublicKey { inner: val })
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

#[wasm_bindgen]
impl KeyPair {
    #[wasm_bindgen(getter)]
    pub fn public_key(&self) -> PublicKey {
        PublicKey::wrap(self.inner.public_key.clone())
    }

    #[wasm_bindgen(getter)]
    pub fn private_key(&self) -> PrivateKey {
        PrivateKey::wrap(self.inner.private_key.clone())
    }

    pub fn generate_with_configuration(config: KeyGenConfiguration) -> Result<KeyPair, JsValue> {
        CoreKeyPair::generate_with_configuration(config.into())
            .map(|val| KeyPair { inner: val })
            .map_err(|err| err.to_string().into())
    }

    pub fn from_pair(public_key: &PublicKey, private_key: &PrivateKey) -> KeyPair {
        KeyPair {
            inner: CoreKeyPair {
                public_key: public_key.inner.clone(),
                private_key: private_key.inner.clone(),
            },
        }
    }
}

#[wasm_bindgen]
pub struct MultihashDigestFunction {
    inner: CoreMultihashDigestFunction,
}

#[wasm_bindgen]
impl MultihashDigestFunction {
    #[wasm_bindgen]
    pub fn ed25519pub() -> MultihashDigestFunction {
        MultihashDigestFunction {
            inner: CoreMultihashDigestFunction::Ed25519Pub,
        }
    }

    #[wasm_bindgen]
    pub fn secp256k1pub() -> MultihashDigestFunction {
        MultihashDigestFunction {
            inner: CoreMultihashDigestFunction::Secp256k1Pub,
        }
    }

    #[wasm_bindgen]
    pub fn bls12381g1pub() -> MultihashDigestFunction {
        MultihashDigestFunction {
            inner: CoreMultihashDigestFunction::Bls12381G1Pub,
        }
    }

    #[wasm_bindgen]
    pub fn bls12381g2pub() -> MultihashDigestFunction {
        MultihashDigestFunction {
            inner: CoreMultihashDigestFunction::Bls12381G2Pub,
        }
    }

    #[wasm_bindgen]
    pub fn to_string(&self) -> String {
        format!("{}", self.inner)
    }

    #[wasm_bindgen]
    pub fn to_u64(&self) -> u64 {
        let val = &self.inner;
        val.into()
    }

    #[wasm_bindgen]
    pub fn from_string(val: String) -> Result<MultihashDigestFunction, JsValue> {
        CoreMultihashDigestFunction::from_str(&val[..])
            .map_err(|err| err.to_string().into())
            .map(|val| MultihashDigestFunction { inner: val })
    }

    #[wasm_bindgen]
    pub fn from_u64(val: u64) -> Result<MultihashDigestFunction, JsValue> {
        CoreMultihashDigestFunction::try_from(val)
            .map_err(|err| err.to_string().into())
            .map(|val| MultihashDigestFunction { inner: val })
    }
}

#[wasm_bindgen]
pub struct Multihash {
    inner: CoreMultihash,
}

#[wasm_bindgen]
impl Multihash {
    pub fn to_bytes(&self) -> Result<Vec<u8>, JsValue> {
        Vec::try_from(&self.inner).map_err(|err| err.to_string().into())
    }

    pub fn from_bytes(bytes: Vec<u8>) -> Result<Multihash, JsValue> {
        CoreMultihash::try_from(bytes)
            .map_err(|err| err.to_string().into())
            .map(|val| Multihash { inner: val })
    }

    pub fn from_public_key(public_key: &PublicKey) -> Result<Multihash, JsValue> {
        CoreMultihash::try_from(&public_key.inner)
            .map_err(|err| err.to_string().into())
            .map(|val| Multihash { inner: val })
    }

    #[wasm_bindgen(getter)]
    pub fn digest_function(&self) -> MultihashDigestFunction {
        MultihashDigestFunction {
            inner: self.inner.digest_function,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn payload(&self) -> Vec<u8> {
        self.inner.payload.clone()
    }
}

#[wasm_bindgen]
pub struct Hash {
    inner: CoreHash,
}

#[wasm_bindgen]
impl Hash {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Hash {
        Hash {
            inner: CoreHash::new(input),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn bytes(&self) -> Vec<u8> {
        self.inner.0.into()
    }
}
