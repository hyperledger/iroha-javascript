//! This module contains structures and implementations related to the cryptographic parts of the Iroha.
//! But in WebAssembly-compatible manner.
//!
//! TODO rustfmt & clippy
#![no_std]
#![allow(clippy::must_use_candidate)]

extern crate alloc;

mod utils;

use alloc::string::ToString;
use alloc::{format, string::String, vec::Vec};
use core::str::FromStr;

use crate::utils::{BytesInputJs, JsErrorResultExt, JsErrorWrap};

use wasm_bindgen::prelude::*;

type JsResult<T> = Result<T, JsError>;

// FIXME generate some pieces with a proc macro?
// Note: it is moved separately from TS_TYPES for tests
const TS_SECTION_ALGORITHM: &str = r"
export type Algorithm =
    | 'ed25519'
    | 'secp256k1'
    | 'bls_normal'
    | 'bls_small'
";

#[wasm_bindgen(typescript_custom_section)]
const TS_TYPES: &str = r#"    
export interface PrivateKeyJson {
    algorithm: string
    /** Hex-encoded bytes */
    payload: string
}

export interface KeyPairJson {
    public_key: string
    private_key: PrivateKeyJson
}

export interface SignatureJson {
    public_key: string
    /** Hex-encoded bytes */
    payload: string
}

export type VerifyResult =
    | { t: 'ok' }
    | { t: 'err', error: string }
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Algorithm")]
    pub type AlgorithmJsStr;
}

impl TryFrom<AlgorithmJsStr> for iroha_crypto::Algorithm {
    type Error = JsError;

    fn try_from(value: AlgorithmJsStr) -> Result<Self, Self::Error> {
        let value = Self::from_str(
            &value
                .as_string()
                .ok_or_else(|| JsError::new("Passed value is not a string"))?,
        )
        .map_err(JsErrorWrap::from)?;
        Ok(value)
    }
}

impl From<iroha_crypto::Algorithm> for AlgorithmJsStr {
    fn from(value: iroha_crypto::Algorithm) -> Self {
        AlgorithmJsStr {
            obj: value.to_string().into(),
        }
    }
}

#[wasm_bindgen]
#[must_use]
pub fn algorithm_default() -> AlgorithmJsStr {
    iroha_crypto::Algorithm::default().into()
}

#[wasm_bindgen]
pub struct Hash(iroha_crypto::Hash);

#[wasm_bindgen]
impl Hash {
    /// Construct zeroed hash
    #[must_use]
    pub fn zeroed() -> Self {
        Self(iroha_crypto::Hash::prehashed(
            [0; iroha_crypto::Hash::LENGTH],
        ))
    }

    /// Hash the given bytes.
    ///
    /// # Errors
    /// If failed to parse bytes input
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: BytesInputJs) -> JsResult<Hash> {
        let bytes: Vec<_> = bytes.try_into()?;
        let hash = iroha_crypto::Hash::new(bytes);
        Ok(Self(hash))
    }

    pub fn bytes(&self) -> Vec<u8> {
        self.0.as_ref().into()
    }

    pub fn bytes_hex(&self) -> String {
        hex::encode(self.bytes())
    }
}

/// Public Key used in signatures.
#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct PublicKey(pub(crate) iroha_crypto::PublicKey);

#[wasm_bindgen]
impl PublicKey {
    /// # Errors
    /// Fails if multihash parsing fails
    pub fn from_multihash_hex(multihash: &str) -> JsResult<PublicKey> {
        let inner = iroha_crypto::PublicKey::from_str(multihash).map_err(JsErrorWrap::from)?;
        Ok(Self(inner))
    }

    /// # Errors
    /// Fails if parsing of algorithm or payload byte input fails
    pub fn from_raw(algorithm: AlgorithmJsStr, payload: BytesInputJs) -> JsResult<PublicKey> {
        let payload: Vec<u8> = payload.try_into()?;
        let inner =
            iroha_crypto::PublicKey::from_raw(algorithm.try_into()?, &payload).wrap_js_error()?;
        Ok(Self(inner))
    }

    #[must_use]
    pub fn from_private_key(key: &PrivateKey) -> PublicKey {
        let inner = iroha_crypto::PublicKey::from(key.0.clone());
        Self(inner)
    }

    #[must_use]
    pub fn to_multihash_hex(&self) -> String {
        format!("{}", self.0)
    }

    /// Equivalent to [`Self::to_multihash_hex`]
    pub fn to_json(&self) -> String {
        todo!()
    }

    #[wasm_bindgen(getter)]
    #[must_use]
    pub fn algorithm(&self) -> AlgorithmJsStr {
        self.0.algorithm().into()
    }

    #[must_use]
    pub fn payload(&self) -> Vec<u8> {
        self.0.to_raw().1
    }

    #[must_use]
    pub fn payload_hex(&self) -> String {
        hex::encode(self.payload())
    }
}

/// Private Key used in signatures.
#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct PrivateKey(pub(crate) iroha_crypto::PrivateKey);

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "PrivateKeyJson")]
    pub type PrivateKeyJson;
}

#[wasm_bindgen]
impl PrivateKey {
    /// # Errors
    /// Fails if serialization fails
    pub fn from_json(value: PrivateKeyJson) -> JsResult<PrivateKey> {
        let inner: iroha_crypto::PrivateKey =
            serde_wasm_bindgen::from_value(value.obj).wrap_js_error()?;
        Ok(Self(inner))
    }

    /// # Errors
    /// Fails if parsing of digest function or payload byte input fails
    pub fn from_raw(algorithm: AlgorithmJsStr, payload: BytesInputJs) -> JsResult<PrivateKey> {
        let payload: Vec<u8> = payload.try_into()?;
        let inner =
            iroha_crypto::PrivateKey::from_raw(algorithm.try_into()?, &payload).wrap_js_error()?;
        Ok(Self(inner))
    }

    #[wasm_bindgen(getter)]
    pub fn algorithm(&self) -> AlgorithmJsStr {
        self.0.algorithm().into()
    }

    pub fn payload(&self) -> Vec<u8> {
        self.0.to_raw().1
    }

    pub fn payload_hex(&self) -> String {
        hex::encode(self.payload())
    }

    /// # Errors
    /// Fails is serialization fails
    pub fn to_json(&self) -> JsResult<PrivateKeyJson> {
        let js_value = serde_wasm_bindgen::to_value(&self.0)?;
        Ok(PrivateKeyJson { obj: js_value })
    }
}

/// Configuration of key generation
#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct KeyGenConfiguration(iroha_crypto::KeyGenConfiguration);

#[wasm_bindgen]
impl KeyGenConfiguration {
    /// Construct using seed with `Ed25519` algorithm
    ///
    /// # Errors
    /// If failed to parse bytes input
    pub fn from_seed(seed: BytesInputJs) -> JsResult<KeyGenConfiguration> {
        let inner = iroha_crypto::KeyGenConfiguration::from_seed(seed.try_into()?);
        Ok(Self(inner))
    }

    /// Construct using private key with `Ed25519` algorithm
    ///
    /// # Errors
    /// If failed to parse bytes input
    pub fn from_private_key(key: &PrivateKey) -> JsResult<KeyGenConfiguration> {
        let inner = iroha_crypto::KeyGenConfiguration::from_private_key(key.0.clone());
        Ok(Self(inner))
    }

    /// Alter default algorithm of the key gen configuration
    ///
    /// # Errors
    /// Fails if algorithm parsing fails
    pub fn with_algorithm(self, algorithm: AlgorithmJsStr) -> JsResult<KeyGenConfiguration> {
        let inner = self.0.with_algorithm(algorithm.try_into()?);
        Ok(Self(inner))
    }
}

/// Pair of Public and Private keys.
#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct KeyPair(iroha_crypto::KeyPair);

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "KeyPairJson")]
    pub type KeyPairJson;
}

#[wasm_bindgen]
impl KeyPair {
    /// # Errors
    /// Fails if deserialization fails
    pub fn from_json(value: KeyPairJson) -> JsResult<KeyPair> {
        let inner: iroha_crypto::KeyPair =
            serde_wasm_bindgen::from_value(value.obj).wrap_js_error()?;
        Ok(Self(inner))
    }

    /// Construct a key pair
    ///
    /// # Errors
    /// If public and private key don’t match, i.e. if they don’t make a pair
    #[wasm_bindgen(constructor)]
    pub fn new(public_key: &PublicKey, private_key: &PrivateKey) -> JsResult<KeyPair> {
        let inner = iroha_crypto::KeyPair::new(public_key.0.clone(), private_key.0.clone())
            .wrap_js_error()?;
        Ok(Self(inner))
    }

    /// Generates a pair of Public and Private key with the corresponding [`KeyGenConfiguration`].
    pub fn generate_with_configuration(key_gen_configuration: &KeyGenConfiguration) -> KeyPair {
        let inner =
            iroha_crypto::KeyPair::generate_with_configuration(key_gen_configuration.0.clone());
        Self(inner)
    }

    // /// Generate with default configuration
    // pub fn generate() -> JsResult<KeyPair> {
    //     let kp = Self::generate();
    //     Ok(kp)
    // }

    #[wasm_bindgen(getter)]
    pub fn algorithm(&self) -> AlgorithmJsStr {
        self.0.algorithm().into()
    }

    #[must_use]
    pub fn public_key(&self) -> PublicKey {
        let inner = self.0.public_key().clone();
        PublicKey(inner)
    }

    #[must_use]
    pub fn private_key(&self) -> PrivateKey {
        let inner = self.0.private_key().clone();
        PrivateKey(inner)
    }

    /// # Errors
    /// Fails if serialization fails
    pub fn to_json(&self) -> JsResult<KeyPairJson> {
        let json = serde_wasm_bindgen::to_value(&self.0)?;
        Ok(KeyPairJson { obj: json })
    }
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "SignatureJson")]
    pub type SignatureJson;
}

/// Represents signature of the data (`Block` or `Transaction` for example).
#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct Signature(iroha_crypto::Signature);

#[wasm_bindgen]
impl Signature {
    /// # Errors
    /// If failed to deserialize JSON
    pub fn from_json(value: SignatureJson) -> JsResult<Signature> {
        let inner: iroha_crypto::Signature =
            serde_wasm_bindgen::from_value(value.obj).wrap_js_error()?;
        Ok(Self(inner))
    }

    /// Creates new signature by signing the payload via the key pair's private key.
    ///
    /// # Errors
    /// If parsing bytes input fails
    #[wasm_bindgen(constructor)]
    pub fn new(key_pair: &KeyPair, payload: BytesInputJs) -> JsResult<Signature> {
        let payload: Vec<u8> = payload.try_into()?;
        let inner = iroha_crypto::Signature::new(&key_pair.0, &payload);
        Ok(Self(inner))
    }

    /// Verify `payload` using signed data and the signature's public key
    ///
    /// # Errors
    /// - If parsing of bytes input fails
    /// - If failed to construct verify error
    pub fn verify(&self, payload: BytesInputJs) -> JsResult<VerifyResultJs> {
        let payload: Vec<_> = payload.try_into()?;
        let result = self.0.verify(&payload).try_into()?;
        Ok(result)
    }

    pub fn public_key(&self) -> PublicKey {
        let inner = self.0.public_key().clone();
        PublicKey(inner)
    }

    pub fn payload(&self) -> Vec<u8> {
        self.0.payload().to_vec()
    }

    pub fn payload_hex(&self) -> String {
        hex::encode(self.0.payload())
    }

    /// # Errors
    /// If conversion fails
    pub fn to_json(&self) -> JsResult<SignatureJson> {
        let json = serde_wasm_bindgen::to_value(&self.0)?;
        Ok(SignatureJson { obj: json })
    }
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "VerifyResult")]
    pub type VerifyResultJs;
}

impl TryFrom<Result<(), iroha_crypto::error::Error>> for VerifyResultJs {
    type Error = serde_wasm_bindgen::Error;

    fn try_from(value: Result<(), iroha_crypto::error::Error>) -> Result<Self, Self::Error> {
        #[derive(serde::Serialize)]
        #[serde(tag = "t")]
        enum VerifyResultSer {
            #[serde(rename(serialize = "ok"))]
            Ok,
            #[serde(rename(serialize = "err"))]
            Err { error: String },
        }

        let serializable = match value {
            Ok(()) => VerifyResultSer::Ok,
            Err(error) => VerifyResultSer::Err {
                error: error.to_string(),
            },
        };

        let js_value = serde_wasm_bindgen::to_value(&serializable)?;

        Ok(Self { obj: js_value })
    }
}

#[wasm_bindgen(start)]
pub fn main() {
    utils::set_panic_hook();
}

#[cfg(test)]
mod tests {
    #![allow(clippy::restriction)]

    use super::*;
    use itertools::Itertools;

    #[test]
    fn algorithm_js_gen_is_valid() {
        use alloc::vec;
        use iroha_crypto::Algorithm;

        // extend this list when algorithms are updated
        let algorithms = vec![
            Algorithm::Ed25519,
            Algorithm::Secp256k1,
            Algorithm::BlsNormal,
            Algorithm::BlsSmall,
        ];

        let as_typescript = algorithms.iter().map(|a| format!("    | '{a}'")).join("\n");
        let as_typescript = format!("export type Algorithm =\n{as_typescript}");

        assert_eq!(TS_SECTION_ALGORITHM.trim(), as_typescript);
    }

    #[test]
    fn public_key_as_str_is_multihash() {
        todo!("fromstr and display for public key works in multihash format")
    }

    #[test]
    fn public_key_multihash_hex_works() {
        let sample = "ed01208BA62848CF767D72E7F7F4B9D2D7BA07FEE33760F79ABE5597A51520E292A0CB";

        let Ok(value) = PublicKey::from_multihash_hex(sample) else {
            panic!("should not fail")
        };
        let hex = value.to_multihash_hex();

        assert_eq!(hex, sample);
    }

    #[test]
    fn private_key_json_repr_matches_with_typescript() {
        let json_repr = serde_json::json!({
            "algorithm": "ed25519",
            "payload": "8f4c15e5d664da3f13778801d23d4e89b76e94c1b94b389544168b6cb894f84f8ba62848cf767d72e7f7f4b9d2d7ba07fee33760f79abe5597a51520e292a0cb"
        });

        let Ok(private_key) = PrivateKey::from_json(PrivateKeyJson {
            obj: serde_wasm_bindgen::to_value(&json_repr).unwrap(),
        }) else {
            panic!("should not fail")
        };
        let Ok(private_key_json) = private_key.to_json() else {
            panic!("should not fail")
        };
        let json_back: serde_json::Value =
            serde_wasm_bindgen::from_value(private_key_json.obj).unwrap();

        assert_eq!(json_back, json_repr);
    }

    #[test]
    fn key_pair_from_and_to_json() {
        todo!()
    }

    #[test]
    fn verify_result_serialize() {
        todo!()
    }

    #[test]
    fn signature_from_and_to_json() {
        todo!()
    }
}
