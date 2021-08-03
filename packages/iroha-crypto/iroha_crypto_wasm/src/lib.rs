#![no_std]
extern crate alloc;

mod utils;

use alloc::string::String;
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

#[wasm_bindgen]
pub struct Signature {
    inner: CoreSignature,
}

#[wasm_bindgen]
impl Signature {
    #[wasm_bindgen(constructor)]
    pub fn new(key_pair: KeyPair, payload: &[u8]) -> Result<Signature, JsValue> {
        CoreSignature::new(key_pair.inner, payload)
            .map_err(|err| err.to_string().into())
            .map(|val| Signature { inner: val })
    }

    #[wasm_bindgen]
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
#[derive(Clone, Copy, Debug)]
pub enum Algorithm {
    /// Ed25519
    Ed25519,
    /// Secp256k1
    Secp256k1,
    /// BlsSmall
    BlsSmall,
    /// BlsNormal
    BlsNormal,
}

impl Into<CoreAlgorithm> for Algorithm {
    fn into(self) -> CoreAlgorithm {
        match self {
            Algorithm::BlsNormal => CoreAlgorithm::BlsNormal,
            Algorithm::Ed25519 => CoreAlgorithm::Ed25519,
            Algorithm::Secp256k1 => CoreAlgorithm::Secp256k1,
            Algorithm::BlsSmall => CoreAlgorithm::BlsSmall,
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
    pub fn use_private_key(mut self, private_key: PrivateKey) -> KeyGenConfiguration {
        self.inner = self.inner.use_private_key(private_key.into());
        self
    }

    /// with algorithm
    pub fn with_algorithm(mut self, algorithm: Algorithm) -> KeyGenConfiguration {
        self.inner = self.inner.with_algorithm(algorithm.into());
        self
    }
}

impl Into<CoreKeyGenConfiguration> for KeyGenConfiguration {
    fn into(self) -> CoreKeyGenConfiguration {
        self.inner
    }
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
}

#[wasm_bindgen]
pub enum MultihashDigestFunction {
    /// Ed25519
    Ed25519Pub,
    /// Secp256k1
    Secp256k1Pub,
    /// Bls12381G1
    Bls12381G1Pub,
    /// Bls12381G2
    Bls12381G2Pub,
}

impl MultihashDigestFunction {
    fn from_core(val: CoreMultihashDigestFunction) -> Self {
        match val {
            CoreMultihashDigestFunction::Bls12381G1Pub => MultihashDigestFunction::Bls12381G1Pub,
            CoreMultihashDigestFunction::Bls12381G2Pub => MultihashDigestFunction::Bls12381G2Pub,
            CoreMultihashDigestFunction::Ed25519Pub => MultihashDigestFunction::Ed25519Pub,
            CoreMultihashDigestFunction::Secp256k1Pub => MultihashDigestFunction::Secp256k1Pub,
        }
    }
}

impl Into<CoreMultihashDigestFunction> for MultihashDigestFunction {
    fn into(self) -> CoreMultihashDigestFunction {
        match self {
            MultihashDigestFunction::Bls12381G1Pub => CoreMultihashDigestFunction::Bls12381G1Pub,
            MultihashDigestFunction::Bls12381G2Pub => CoreMultihashDigestFunction::Bls12381G2Pub,
            MultihashDigestFunction::Ed25519Pub => CoreMultihashDigestFunction::Ed25519Pub,
            MultihashDigestFunction::Secp256k1Pub => CoreMultihashDigestFunction::Secp256k1Pub,
        }
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
        MultihashDigestFunction::from_core(self.inner.digest_function)
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
