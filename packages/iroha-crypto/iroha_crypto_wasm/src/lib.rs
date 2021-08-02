#![no_std]
extern crate alloc;

mod utils;

use core::{convert::TryFrom, str::FromStr};

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

use iroha_crypto_core::{
    multihash::{DigestFunction, Multihash},
    Algorithm, KeyGenConfiguration, KeyPair, PrivateKey, PublicKey,
};

use alloc::vec::Vec;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub enum JsAlgorithm {
    /// Ed25519
    Ed25519,
    /// Secp256k1
    Secp256k1,
    /// BlsSmall
    BlsSmall,
    /// BlsNormal
    BlsNormal,
}

impl Into<Algorithm> for JsAlgorithm {
    fn into(self) -> Algorithm {
        match self {
            JsAlgorithm::BlsNormal => Algorithm::BlsNormal,
            JsAlgorithm::Ed25519 => Algorithm::Ed25519,
            JsAlgorithm::Secp256k1 => Algorithm::Secp256k1,
            JsAlgorithm::BlsSmall => Algorithm::BlsSmall,
        }
    }
}

/// Configuration of key generation
#[wasm_bindgen]
#[derive(Default, Clone, Debug)]
pub struct JsKeyGenConfiguration {
    val: KeyGenConfiguration,
}

#[wasm_bindgen]
#[allow(clippy::missing_const_for_fn)]
impl JsKeyGenConfiguration {
    #[wasm_bindgen(constructor)]
    pub fn new() -> JsKeyGenConfiguration {
        JsKeyGenConfiguration {
            val: KeyGenConfiguration::default(),
        }
    }

    /// Use seed
    pub fn use_seed(mut self, seed: Vec<u8>) -> JsKeyGenConfiguration {
        self.val = self.val.use_seed(seed);
        self
    }

    /// Use private key
    pub fn use_private_key(mut self, private_key: JsPrivateKey) -> JsKeyGenConfiguration {
        self.val = self.val.use_private_key(private_key.into());
        self
    }

    /// with algorithm
    pub fn with_algorithm(mut self, algorithm: JsAlgorithm) -> JsKeyGenConfiguration {
        self.val = self.val.with_algorithm(algorithm.into());
        self
    }
}

impl Into<KeyGenConfiguration> for JsKeyGenConfiguration {
    fn into(self) -> KeyGenConfiguration {
        self.val
    }
}

#[wasm_bindgen]
pub struct JsPrivateKey {
    val: PrivateKey,
}

impl Into<PrivateKey> for JsPrivateKey {
    fn into(self) -> PrivateKey {
        self.val
    }
}

#[wasm_bindgen]
impl JsPrivateKey {
    #[wasm_bindgen(getter)]
    pub fn digest_function(&self) -> JsValue {
        self.val.digest_function.clone().into()
    }

    #[wasm_bindgen(getter)]
    pub fn payload(&self) -> Vec<u8> {
        self.val.payload.clone()
    }
}

impl JsPrivateKey {
    fn wrap(val: PrivateKey) -> Self {
        Self { val }
    }
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct JsPublicKey {
    val: PublicKey,
}

impl Into<PublicKey> for JsPublicKey {
    fn into(self) -> PublicKey {
        self.val
    }
}

#[wasm_bindgen]
impl JsPublicKey {
    #[wasm_bindgen(getter)]
    pub fn digest_function(&self) -> JsValue {
        self.val.digest_function.clone().into()
    }

    #[wasm_bindgen(getter)]
    pub fn payload(&self) -> Vec<u8> {
        self.val.payload.clone()
    }

    #[wasm_bindgen]
    pub fn from_multihash(JsMultihash { val }: &JsMultihash) -> Result<JsPublicKey, JsValue> {
        PublicKey::try_from(val)
            .map_err(|err| err.to_string().into())
            .map(|val| JsPublicKey { val })
    }
}

impl JsPublicKey {
    fn wrap(val: PublicKey) -> Self {
        Self { val }
    }
}

#[wasm_bindgen]
pub struct JsKeyPair {
    val: KeyPair,
}

#[wasm_bindgen]
impl JsKeyPair {
    #[wasm_bindgen(getter)]
    pub fn public_key(&self) -> JsPublicKey {
        JsPublicKey::wrap(self.val.public_key.clone())
    }

    #[wasm_bindgen(getter)]
    pub fn private_key(&self) -> JsPrivateKey {
        JsPrivateKey::wrap(self.val.private_key.clone())
    }

    pub fn generate_with_configuration(
        config: JsKeyGenConfiguration,
    ) -> Result<JsKeyPair, JsValue> {
        KeyPair::generate_with_configuration(config.into())
            .map(|val| JsKeyPair { val })
            .map_err(|err| err.to_string().into())
    }
}

#[wasm_bindgen(js_name = "MultihashDigestFunction")]
pub enum JsMultihashDigestFunction {
    /// Ed25519
    Ed25519Pub,
    /// Secp256k1
    Secp256k1Pub,
    /// Bls12381G1
    Bls12381G1Pub,
    /// Bls12381G2
    Bls12381G2Pub,
}

impl JsMultihashDigestFunction {
    fn from_core(val: DigestFunction) -> Self {
        match val {
            DigestFunction::Bls12381G1Pub => JsMultihashDigestFunction::Bls12381G1Pub,
            DigestFunction::Bls12381G2Pub => JsMultihashDigestFunction::Bls12381G2Pub,
            DigestFunction::Ed25519Pub => JsMultihashDigestFunction::Ed25519Pub,
            DigestFunction::Secp256k1Pub => JsMultihashDigestFunction::Secp256k1Pub,
        }
    }
}

impl Into<DigestFunction> for JsMultihashDigestFunction {
    fn into(self) -> DigestFunction {
        match self {
            JsMultihashDigestFunction::Bls12381G1Pub => DigestFunction::Bls12381G1Pub,
            JsMultihashDigestFunction::Bls12381G2Pub => DigestFunction::Bls12381G2Pub,
            JsMultihashDigestFunction::Ed25519Pub => DigestFunction::Ed25519Pub,
            JsMultihashDigestFunction::Secp256k1Pub => DigestFunction::Secp256k1Pub,
        }
    }
}

#[wasm_bindgen]
impl JsMultihashDigestFunction {
    pub fn from_string(val: JsValue) -> Result<JsMultihashDigestFunction, JsValue> {
        DigestFunction::from_str(&val.as_string().unwrap())
            .map(|val| JsMultihashDigestFunction::from_core(val))
            .map_err(|err| err.to_string().into())
    }
}

#[wasm_bindgen]
pub struct JsMultihash {
    val: Multihash,
}

#[wasm_bindgen]
impl JsMultihash {
    pub fn to_bytes(&self) -> Result<Vec<u8>, JsValue> {
        Vec::try_from(&self.val).map_err(|err| err.to_string().into())
    }

    pub fn from_bytes(bytes: Vec<u8>) -> Result<JsMultihash, JsValue> {
        Multihash::try_from(bytes)
            .map_err(|err| err.to_string().into())
            .map(|val| JsMultihash { val })
    }

    pub fn from_public_key(JsPublicKey { val }: &JsPublicKey) -> Result<JsMultihash, JsValue> {
        Multihash::try_from(val)
            .map_err(|err| err.to_string().into())
            .map(|val| JsMultihash { val })
    }
}
