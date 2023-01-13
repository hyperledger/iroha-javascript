use super::*;

pub use pair::{KeyGenConfiguration, KeyGenOption, KeyPair};
pub use priv_key::PrivateKey;
pub use pub_key::PublicKey;

mod pub_key {
    use crate::utils::decode_hex;
    use super::*;

    /// Public Key used in signatures.
    #[derive(DebugCustom, Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Encode)]
    #[debug(
    fmt = "{{ digest: {digest_function}, payload: {} }}",
    "hex::encode_upper(payload.as_slice())"
    )]
    #[wasm_bindgen]
    pub struct PublicKey {
        /// Digest function
        pub(crate) digest_function: ConstString,
        /// Key payload
        pub(crate) payload: Vec<u8>,
    }

    impl PublicKey {
        /// Key payload
        pub fn payload(&self) -> &[u8] {
            &self.payload
        }

        /// Digest function
        pub fn digest_function(&self) -> Algorithm {
            self.digest_function.parse().expect("Valid")
        }
    }

    impl FromStr for PublicKey {
        type Err = KeyParseError;

        fn from_str(key: &str) -> Result<Self, Self::Err> {
            let bytes = hex::decode(key).map_err(|e| KeyParseError::Decode(key.to_owned(), e))?;
            let multihash = Multihash::try_from(bytes)
                .map_err(|e| KeyParseError::Multihash(key.to_owned(), e))?;

            Ok(multihash.into())
        }
    }

    impl fmt::Display for PublicKey {
        #[allow(clippy::expect_used, clippy::unwrap_in_result)]
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            let multihash: &Multihash = &self
                .clone()
                .try_into()
                .expect("Failed to get multihash representation.");
            let bytes: Vec<u8> = multihash
                .try_into()
                .expect("Failed to convert multihash to bytes.");
            write!(f, "{}", hex::encode(bytes))
        }
    }

    impl From<Multihash> for PublicKey {
        #[inline]
        fn from(multihash: Multihash) -> Self {
            #[cfg(not(feature = "std"))]
            use alloc::string::ToString as _;

            let digest_function = match multihash.digest_function {
                MultihashDigestFunction::Ed25519Pub => Algorithm::Ed25519,
                MultihashDigestFunction::Secp256k1Pub => Algorithm::Secp256k1,
                MultihashDigestFunction::Bls12381G1Pub => Algorithm::BlsNormal,
                MultihashDigestFunction::Bls12381G2Pub => Algorithm::BlsSmall,
            };

            Self {
                digest_function: digest_function.to_string().into(),
                payload: multihash.payload,
            }
        }
    }

    impl From<PrivateKey> for PublicKey {
        #[allow(clippy::expect_used)]
        fn from(private_key: PrivateKey) -> Self {
            let digest_function = private_key.digest_function();
            let key_gen_option = Some(UrsaKeyGenOption::FromSecretKey(UrsaPrivateKey(
                private_key.payload,
            )));
            let (mut public_key, _) = match digest_function {
                Algorithm::Ed25519 => Ed25519Sha512.keypair(key_gen_option),
                Algorithm::Secp256k1 => EcdsaSecp256k1Sha256::new().keypair(key_gen_option),
                Algorithm::BlsNormal => BlsNormal::new().keypair(key_gen_option),
                Algorithm::BlsSmall => BlsSmall::new().keypair(key_gen_option),
            }
                .expect("can't fail for valid `PrivateKey`");
            PublicKey {
                digest_function: private_key.digest_function,
                payload: core::mem::take(&mut public_key.0),
            }
        }
    }

    impl From<PublicKey> for Multihash {
        #[inline]
        fn from(public_key: PublicKey) -> Self {
            let digest_function = match public_key.digest_function() {
                Algorithm::Ed25519 => MultihashDigestFunction::Ed25519Pub,
                Algorithm::Secp256k1 => MultihashDigestFunction::Secp256k1Pub,
                Algorithm::BlsNormal => MultihashDigestFunction::Bls12381G1Pub,
                Algorithm::BlsSmall => MultihashDigestFunction::Bls12381G2Pub,
            };

            Self {
                digest_function,
                payload: public_key.payload,
            }
        }
    }

    impl Serialize for PublicKey {
        fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
            where
                S: serde::Serializer,
        {
            serializer.serialize_str(&format!("{}", self))
        }
    }

    impl<'de> Deserialize<'de> for PublicKey {
        fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
            where
                D: serde::Deserializer<'de>,
        {
            use alloc::borrow::Cow;
            use serde::de::Error as _;

            let public_key_str = <Cow<str>>::deserialize(deserializer)?;
            PublicKey::from_str(&public_key_str).map_err(D::Error::custom)
        }
    }

    impl Decode for PublicKey {
        fn decode<I: parity_scale_codec::Input>(input: &mut I) -> Result<Self, ScaleError> {
            let digest_function = ConstString::decode(input)?;

            if Algorithm::from_str(&digest_function).is_err() {
                return Err(ScaleError::from("Algorithm not supported"));
            }

            Ok(Self {
                digest_function,
                payload: Decode::decode(input)?,
            })
        }
    }


    #[wasm_bindgen]
    impl PublicKey {
        pub fn from_multihash_hex(multihash: &str) -> Result<PublicKey, JsError> {
            let pk = PublicKey::from_str(multihash).map_err(JsErrorWrap::from)?;
            Ok(pk)
        }

        pub fn from_multihash(multihash: &Multihash) -> PublicKey {
            multihash.clone().into()
        }

        pub fn from_private_key(key: &PrivateKey) -> PublicKey {
            key.clone().into()
        }

        pub fn from_bytes(bytes: Vec<u8>) -> Result<PublicKey, JsError> {
            let pk = PublicKey::decode(&mut (&bytes[..])).map_err(JsErrorWrap::from)?;
            Ok(pk)
        }

        pub fn from_bytes_hex(hex: String) -> Result<PublicKey, JsError> {
            Self::from_bytes(decode_hex(hex)?)
        }

        pub fn to_format(&self) -> String {
            format!("{self:?}")
        }

        pub fn to_multihash_hex(&self) -> String {
            self.to_string()
        }

        // #[wasm_bindgen(js_name = "digest_function", getter)]
        pub fn digest_function_wasm(&self) -> AlgorithmJsStr {
            self.digest_function().into()
        }

        // #[wasm_bindgen(js_name = "payload", getter)]
        pub fn payload_wasm(&self) -> Vec<u8> {
            self.payload.clone()
        }
    }
}

mod priv_key {
    use super::*;

    /// Private Key used in signatures.
    #[derive(DebugCustom, Clone, PartialEq, Eq, Display, Serialize)]
    #[debug(fmt = "{{ digest: {digest_function}, payload: {:X?} }}", payload)]
    #[display(fmt = "{}", "hex::encode(payload)")]
    #[allow(clippy::multiple_inherent_impl)]
    #[wasm_bindgen]
    pub struct PrivateKey {
        /// Digest function
        pub(crate) digest_function: ConstString,
        /// Key payload. WARNING! Do not use `"string".as_bytes()` to obtain the key.
        #[serde(with = "hex::serde")]
        pub(crate) payload: Vec<u8>,
    }

    impl PrivateKey {
        /// Key payload
        pub fn payload(&self) -> &[u8] {
            &self.payload
        }

        /// Digest function
        #[allow(clippy::expect_used)]
        pub fn digest_function(&self) -> Algorithm {
            self.digest_function.parse().expect("Valid")
        }
    }

    impl PrivateKey {
        /// Construct `PrivateKey` from hex encoded string
        ///
        /// # Errors
        ///
        /// If given payload is not hex encoded
        pub fn from_hex(
            digest_function: Algorithm,
            payload: &(impl AsRef<[u8]> + ?Sized),
        ) -> Result<Self, hex::FromHexError> {
            #[cfg(not(feature = "std"))]
            use alloc::string::ToString as _;

            let payload: Vec<u8> = payload
                .as_ref()
                .iter()
                .filter(|&e| *e as char != ' ')
                .copied()
                .collect();

            Ok(Self {
                digest_function: digest_function.to_string().into(),
                payload: hex::decode(payload)?,
            })
        }
    }

    impl<'de> Deserialize<'de> for PrivateKey {
        fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
            where
                D: serde::Deserializer<'de>,
        {
            use serde::de::Error as _;

            #[derive(Deserialize)]
            struct PrivateKey {
                digest_function: ConstString,
                #[serde(with = "hex::serde")]
                payload: Vec<u8>,
            }

            let private_key = PrivateKey::deserialize(deserializer)?;
            match Algorithm::from_str(&private_key.digest_function) {
                Ok(_) => Ok(Self {
                    digest_function: private_key.digest_function,
                    payload: private_key.payload,
                }),
                Err(err) => Err(D::Error::custom(err)),
            }
        }
    }

    #[wasm_bindgen(typescript_custom_section)]
    const TS_PRIVATE_KEY_JS: &str = r#"
export interface PrivateKeyJson {
    digest_function: string
    /** Hex-encoded bytes */
    payload: string
}
    "#;

    #[wasm_bindgen]
    extern "C" {
        #[wasm_bindgen(typescript_type = "PrivateKeyJson")]
        pub type PrivateKeyJson;
    }

    #[wasm_bindgen]
    impl PrivateKey
    {
        pub fn from_json(value: PrivateKeyJson) -> Result<PrivateKey, JsError> {
            let parsed: Self = serde_wasm_bindgen::from_value(value.obj).map_err(JsErrorWrap::from)?;
            Ok(parsed)
        }

        #[wasm_bindgen(js_name = "digest_function")]
        pub fn digest_function_wasm(&self) -> AlgorithmJsStr {
            self.digest_function().into()
        }

        pub fn payload_wasm(&self) -> Vec<u8> {
            self.payload.clone()
        }
    }
}

mod pair {
    use super::*;

    /// Options for key generation
    #[derive(Debug, Clone, serde::Deserialize)]
    #[serde(tag = "t", content = "c")]
    pub enum KeyGenOption {
        /// Use seed
        UseSeed(Vec<u8>),
        /// Derive from private key
        FromPrivateKey(PrivateKey),
    }


    impl TryFrom<KeyGenOption> for UrsaKeyGenOption {
        type Error = NoSuchAlgorithm;

        fn try_from(key_gen_option: KeyGenOption) -> Result<Self, Self::Error> {
            match key_gen_option {
                KeyGenOption::UseSeed(seed) => Ok(UrsaKeyGenOption::UseSeed(seed)),
                KeyGenOption::FromPrivateKey(key) => {
                    let algorithm = key.digest_function();

                    match algorithm {
                        Algorithm::Ed25519 | Algorithm::Secp256k1 => {
                            Ok(Self::FromSecretKey(UrsaPrivateKey(key.payload)))
                        }
                        _ => Err(Self::Error {}),
                    }
                }
            }
        }
    }

    #[wasm_bindgen(typescript_custom_section)]
    const TS_KEY_GEN_OPTION: &str = r#"
export type KeyGenOption =
    | { t: 'UseSeed', c: Uint8Array }
    | { t: 'FromPrivateKey', c: PrivateKeyJson }
"#;

    #[wasm_bindgen]
    extern "C" {
        #[wasm_bindgen(typescript_type = "KeyGenOption")]
        pub type KeyGenOptionJsRepr;
    }

    /// Configuration of key generation
    #[derive(Debug, Clone, Default)]
    #[wasm_bindgen]
    pub struct KeyGenConfiguration {
        /// Options
        pub(crate) key_gen_option: Option<KeyGenOption>,
        /// Algorithm
        pub(crate) algorithm: Algorithm,
    }

    impl KeyGenConfiguration {
        /// Use seed
        #[must_use]
        pub fn use_seed(mut self, seed: Vec<u8>) -> Self {
            self.key_gen_option = Some(KeyGenOption::UseSeed(seed));
            self
        }

        /// Use private key
        #[must_use]
        pub fn use_private_key(mut self, private_key: PrivateKey) -> Self {
            self.key_gen_option = Some(KeyGenOption::FromPrivateKey(private_key));
            self
        }

        /// With algorithm
        #[must_use]
        pub const fn with_algorithm(mut self, algorithm: Algorithm) -> Self {
            self.algorithm = algorithm;
            self
        }
    }

    #[wasm_bindgen]
    impl KeyGenConfiguration {
        pub fn default_wasm() -> Self {
            Self::default()
        }

        pub fn with_algorithm_wasm_static(algorithm: AlgorithmJsStr) -> Result<KeyGenConfiguration, JsError> {
            Ok(Self {
                algorithm: algorithm.try_into()?,
                key_gen_option: None
            })
        }

        pub fn with_algorithm_wasm(self, algorithm: AlgorithmJsStr) -> Result<KeyGenConfiguration, JsError> {
            Ok(self.with_algorithm(algorithm.try_into()?))
        }

        pub fn use_private_key_wasm(self, key: &PrivateKey) -> Self {
            self.use_private_key(key.clone())
        }

        pub fn use_seed_wasm(self, seed: Vec<u8>) -> Self {
            self.use_seed(seed)
        }
    }

    /// Pair of Public and Private keys.
    #[derive(Debug, Clone, PartialEq, Eq, Serialize)]
    pub struct KeyPair {
        /// Public Key.
        pub(crate) public_key: PublicKey,
        /// Private Key.
        pub(crate) private_key: PrivateKey,
    }

    #[cfg(feature = "std")]
    impl std::error::Error for Error {}

    impl KeyPair {
        /// Digest function
        pub fn digest_function(&self) -> Algorithm {
            self.private_key.digest_function()
        }

        /// Construct `KeyPair` from a matching pair of public and private key.
        /// It is up to the user to ensure that the given keys indeed make a pair.
        pub fn new_unchecked(public_key: PublicKey, private_key: PrivateKey) -> Self {
            Self {
                public_key,
                private_key,
            }
        }

        /// Construct `KeyPair`
        ///
        /// # Errors
        ///
        /// If public and private key don't match, i.e. if they don't make a pair
        pub fn new(public_key: PublicKey, private_key: PrivateKey) -> Result<Self, Error> {
            let algorithm = private_key.digest_function();

            if algorithm != public_key.digest_function() {
                return Err(Error::KeyGen(String::from("Mismatch of key algorithms")));
            }

            match algorithm {
                Algorithm::Ed25519 | Algorithm::Secp256k1 => {
                    let key_pair = Self::generate_with_configuration(KeyGenConfiguration {
                        key_gen_option: Some(KeyGenOption::FromPrivateKey(private_key)),
                        algorithm,
                    })?;

                    if key_pair.public_key != public_key {
                        return Err(Error::KeyGen(String::from("Key pair mismatch")));
                    }

                    Ok(key_pair)
                }
                Algorithm::BlsNormal | Algorithm::BlsSmall => {
                    let dummy_payload = 1_u8;

                    let key_pair = Self {
                        public_key,
                        private_key,
                    };

                    SignatureOf::new(key_pair.clone(), &dummy_payload)?
                        .verify(&dummy_payload)
                        .map_err(|_err| Error::KeyGen(String::from("Key pair mismatch")))?;

                    Ok(key_pair)
                }
            }
        }

        /// Generates a pair of Public and Private key with [`Algorithm::default()`] selected as generation algorithm.
        ///
        /// # Errors
        /// Fails if decoding fails
        pub fn generate() -> Result<Self, Error> {
            Self::generate_with_configuration(KeyGenConfiguration::default())
        }

        /// Generates a pair of Public and Private key with the corresponding [`KeyGenConfiguration`].
        ///
        /// # Errors
        /// Fails if decoding fails
        pub fn generate_with_configuration(
            configuration: KeyGenConfiguration,
        ) -> Result<Self, Error> {
            let digest_function: ConstString = configuration.algorithm.to_string().into();

            let key_gen_option: Option<UrsaKeyGenOption> = configuration
                .key_gen_option
                .map(TryInto::try_into)
                .transpose()?;
            let (mut public_key, mut private_key) = match configuration.algorithm {
                Algorithm::Ed25519 => Ed25519Sha512.keypair(key_gen_option),
                Algorithm::Secp256k1 => EcdsaSecp256k1Sha256::new().keypair(key_gen_option),
                Algorithm::BlsNormal => BlsNormal::new().keypair(key_gen_option),
                Algorithm::BlsSmall => BlsSmall::new().keypair(key_gen_option),
            }?;

            Ok(Self {
                public_key: PublicKey {
                    digest_function: digest_function.clone(),
                    payload: core::mem::take(&mut public_key.0),
                },
                private_key: PrivateKey {
                    digest_function,
                    payload: core::mem::take(&mut private_key.0),
                },
            })
        }
    }

    impl<'de> Deserialize<'de> for KeyPair {
        fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
            where
                D: serde::Deserializer<'de>,
        {
            use serde::de::Error as _;

            #[derive(Deserialize)]
            struct KeyPair {
                public_key: PublicKey,
                private_key: PrivateKey,
            }

            let key_pair = KeyPair::deserialize(deserializer)?;
            Self::new(key_pair.public_key, key_pair.private_key).map_err(D::Error::custom)
        }
    }

    impl From<KeyPair> for (PublicKey, PrivateKey) {
        fn from(key_pair: KeyPair) -> Self {
            (key_pair.public_key, key_pair.private_key)
        }
    }
}

/// Error which occurs when parsing [`PublicKey`]
#[derive(Debug, Clone, Display, From)]
pub enum KeyParseError {
    /// Decoding hex failed
    #[display(fmt = "Failed to decode. {_0}: {_1}")]
    Decode(String, hex::FromHexError),
    /// Converting bytes to multihash failed
    #[display(fmt = "Failed to convert. {_0}: {_1}")]
    Multihash(String, multihash::ConvertError),
}
