//! This module contains structures and implementations related to the cryptographic parts of the Iroha.
//! But in WebAssembly-compatible maner.
// #![allow(clippy::std_instead_of_alloc, clippy::arithmetic)]
// #![cfg_attr(not(feature = "std"), no_std)]
#![no_std]

#[macro_use]
extern crate alloc;

mod algorithm;
mod hash;
mod keys;
mod multihash;
mod signature;
mod utils;
mod varint;

use alloc::string::ToString;
use alloc::{alloc::alloc, borrow::ToOwned, boxed::Box, format, string::String, vec::Vec};
use core::{fmt, str::FromStr};

pub use crate::algorithm::*;
use crate::hash::*;
pub use crate::keys::*;
use crate::multihash::{DigestFunction as MultihashDigestFunction, Multihash};
use crate::signature::SignatureOf;
use crate::utils::JsErrorWrap;

use derive_more::{DebugCustom, Display, From};
use iroha_primitives::conststr::ConstString;
use parity_scale_codec::{Decode, Encode, Error as ScaleError};
use serde::{Deserialize, Serialize};
use ursa::{
    keys::{KeyGenOption as UrsaKeyGenOption, PrivateKey as UrsaPrivateKey},
    signatures::{
        bls::{normal::Bls as BlsNormal, small::Bls as BlsSmall},
        ed25519::Ed25519Sha512,
        secp256k1::EcdsaSecp256k1Sha256,
        SignatureScheme,
    },
};
use wasm_bindgen::prelude::*;

// #[wasm_bindgen(start)]
// pub fn main() {
//     utils::set_panic_hook()
// }

/// Error when dealing with cryptographic functions
#[derive(Debug, Display)]
pub enum Error {
    /// Returned when trying to create an algorithm which does not exist
    #[display(fmt = "Algorithm doesn't exist")] // TODO: which algorithm
    NoSuchAlgorithm,
    /// Occurs during deserialization of a private or public key
    #[display(fmt = "Key could not be parsed. {_0}")]
    Parse(String),
    /// Returned when an error occurs during the signing process
    #[display(fmt = "Signing failed. {_0}")]
    Signing(String),
    /// Returned when an error occurs during key generation
    #[display(fmt = "Key generation failed. {_0}")]
    KeyGen(String),
    /// Returned when an error occurs during digest generation
    #[display(fmt = "Digest generation failed. {_0}")]
    DigestGen(String),
    /// A General purpose error message that doesn't fit in any category
    #[display(fmt = "General error. {_0}")]
    // This is going to cause a headache
    Other(String),
}

impl From<ursa::CryptoError> for Error {
    fn from(source: ursa::CryptoError) -> Self {
        match source {
            ursa::CryptoError::NoSuchAlgorithm(_) => Self::NoSuchAlgorithm,
            ursa::CryptoError::ParseError(source) => Self::Parse(source),
            ursa::CryptoError::SigningError(source) => Self::Signing(source),
            ursa::CryptoError::KeyGenError(source) => Self::KeyGen(source),
            ursa::CryptoError::DigestGenError(source) => Self::DigestGen(source),
            ursa::CryptoError::GeneralError(source) => Self::Other(source),
        }
    }
}
impl From<NoSuchAlgorithm> for Error {
    fn from(_: NoSuchAlgorithm) -> Self {
        Self::NoSuchAlgorithm
    }
}

#[cfg(test)]
mod tests {
    #![allow(clippy::restriction)]

    use alloc::string::ToString;

    use super::*;

    #[test]
    fn key_pair_match() {
        assert!(KeyPair::new("ed012059c8a4da1ebb5380f74aba51f502714652fdcce9611fafb9904e4a3c4d382774"
            .parse()
            .expect("Public key not in mulithash format"),
        PrivateKey::from_hex(
            Algorithm::Ed25519,
            "93ca389fc2979f3f7d2a7f8b76c70de6d5eaf5fa58d4f93cb8b0fb298d398acc59c8a4da1ebb5380f74aba51f502714652fdcce9611fafb9904e4a3c4d382774"
        ).expect("Private key not hex encoded")).is_ok());

        assert!(KeyPair::new("ea0161040fcfade2fc5d9104a9acf9665ea545339ddf10ae50343249e01af3b8f885cd5d52956542cce8105db3a2ec4006e637a7177faaea228c311f907daafc254f22667f1a1812bb710c6f4116a1415275d27bb9fb884f37e8ef525cc31f3945e945fa"
            .parse()
            .expect("Public key not in mulithash format"),
        PrivateKey::from_hex(
            Algorithm::BlsNormal,
            "0000000000000000000000000000000049bf70187154c57b97af913163e8e875733b4eaf1f3f0689b31ce392129493e9"
        ).expect("Private key not hex encoded")).is_ok());
    }

    #[test]
    fn key_pair_mismatch() {
        assert!(KeyPair::new("ed012059c8a4da1ebb5380f74aba51f502714652fdcce9611fafb9904e4a3c4d382774"
            .parse()
            .expect("Public key not in mulithash format"),
        PrivateKey::from_hex(
            Algorithm::Ed25519,
            "0000000000000000000000000000000049bf70187154c57b97af913163e8e875733b4eaf1f3f0689b31ce392129493e9"
        ).expect("Private key not hex encoded")).is_err());

        assert!(KeyPair::new("ea0161040fcfade2fc5d9104a9acf9665ea545339ddf10ae50343249e01af3b8f885cd5d52956542cce8105db3a2ec4006e637a7177faaea228c311f907daafc254f22667f1a1812bb710c6f4116a1415275d27bb9fb884f37e8ef525cc31f3945e945fa"
            .parse()
            .expect("Public key not in mulithash format"),
        PrivateKey::from_hex(
            Algorithm::BlsNormal,
            "93ca389fc2979f3f7d2a7f8b76c70de6d5eaf5fa58d4f93cb8b0fb298d398acc59c8a4da1ebb5380f74aba51f502714652fdcce9611fafb9904e4a3c4d382774"
        ).expect("Private key not hex encoded")).is_err());
    }

    #[test]
    fn display_public_key() {
        assert_eq!(
            format!(
                "{}",
                PublicKey {
                    digest_function: Algorithm::Ed25519.to_string().into(),
                    payload: hex::decode(
                        "1509a611ad6d97b01d871e58ed00c8fd7c3917b6ca61a8c2833a19e000aac2e4"
                    )
                    .expect("Failed to decode public key.")
                }
            ),
            "ed01201509a611ad6d97b01d871e58ed00c8fd7c3917b6ca61a8c2833a19e000aac2e4"
        );
        assert_eq!(
            format!(
                "{}",
                PublicKey {
                    digest_function: Algorithm::Secp256k1.to_string().into(),
                    payload: hex::decode(
                        "0312273e8810581e58948d3fb8f9e8ad53aaa21492ebb8703915bbb565a21b7fcc"
                    )
                    .expect("Failed to decode public key.")
                }
            ),
            "e701210312273e8810581e58948d3fb8f9e8ad53aaa21492ebb8703915bbb565a21b7fcc"
        );
        assert_eq!(
            format!(
                "{}",
                PublicKey {
                    digest_function: Algorithm::BlsNormal.to_string().into(),
                    payload: hex::decode(
                        "04175b1e79b15e8a2d5893bf7f8933ca7d0863105d8bac3d6f976cb043378a0e4b885c57ed14eb85fc2fabc639adc7de7f0020c70c57acc38dee374af2c04a6f61c11de8df9034b12d849c7eb90099b0881267d0e1507d4365d838d7dcc31511e7"
                    )
                    .expect("Failed to decode public key.")
                }
            ),
            "ea016104175b1e79b15e8a2d5893bf7f8933ca7d0863105d8bac3d6f976cb043378a0e4b885c57ed14eb85fc2fabc639adc7de7f0020c70c57acc38dee374af2c04a6f61c11de8df9034b12d849c7eb90099b0881267d0e1507d4365d838d7dcc31511e7"
        );
        assert_eq!(
            format!(
                "{}",
                PublicKey {
                    digest_function: Algorithm::BlsSmall.to_string().into(),
                    payload: hex::decode(
                        "040cb3231f601e7245a6ec9a647b450936f707ca7dc347ed258586c1924941d8bc38576473a8ba3bb2c37e3e121130ab67103498a96d0d27003e3ad960493da79209cf024e2aa2ae961300976aeee599a31a5e1b683eaa1bcffc47b09757d20f21123c594cf0ee0baf5e1bdd272346b7dc98a8f12c481a6b28174076a352da8eae881b90911013369d7fa960716a5abc5314307463fa2285a5bf2a5b5c6220d68c2d34101a91dbfc531c5b9bbfb2245ccc0c50051f79fc6714d16907b1fc40e0c0"
                    )
                    .expect("Failed to decode public key.")
                }
            ),
            "eb01c1040cb3231f601e7245a6ec9a647b450936f707ca7dc347ed258586c1924941d8bc38576473a8ba3bb2c37e3e121130ab67103498a96d0d27003e3ad960493da79209cf024e2aa2ae961300976aeee599a31a5e1b683eaa1bcffc47b09757d20f21123c594cf0ee0baf5e1bdd272346b7dc98a8f12c481a6b28174076a352da8eae881b90911013369d7fa960716a5abc5314307463fa2285a5bf2a5b5c6220d68c2d34101a91dbfc531c5b9bbfb2245ccc0c50051f79fc6714d16907b1fc40e0c0"
        )
    }

    #[derive(Debug, PartialEq, Deserialize)]
    struct TestJson {
        public_key: PublicKey,
        private_key: PrivateKey,
    }

    #[test]
    fn deserialize_keys() {
        assert_eq!(
            serde_json::from_str::<'_, TestJson>("{
                \"public_key\": \"ed01201509a611ad6d97b01d871e58ed00c8fd7c3917b6ca61a8c2833a19e000aac2e4\",
                \"private_key\": {
                    \"digest_function\": \"ed25519\",
                    \"payload\": \"3a7991af1abb77f3fd27cc148404a6ae4439d095a63591b77c788d53f708a02a1509a611ad6d97b01d871e58ed00c8fd7c3917b6ca61a8c2833a19e000aac2e4\"
                }
            }").expect("Failed to deserialize."),
            TestJson {
                public_key: PublicKey {
                    digest_function: Algorithm::Ed25519.to_string().into(),
                    payload: hex::decode(
                        "1509a611ad6d97b01d871e58ed00c8fd7c3917b6ca61a8c2833a19e000aac2e4"
                    )
                    .expect("Failed to decode public key.")
                },
                private_key: PrivateKey {
                    digest_function: Algorithm::Ed25519.to_string().into(),
                    payload: hex::decode("3a7991af1abb77f3fd27cc148404a6ae4439d095a63591b77c788d53f708a02a1509a611ad6d97b01d871e58ed00c8fd7c3917b6ca61a8c2833a19e000aac2e4")
                    .expect("Failed to decode private key"),
                }
            }
        );
        assert_eq!(
            serde_json::from_str::<'_, TestJson>("{
                \"public_key\": \"e701210312273e8810581e58948d3fb8f9e8ad53aaa21492ebb8703915bbb565a21b7fcc\",
                \"private_key\": {
                    \"digest_function\": \"secp256k1\",
                    \"payload\": \"4df4fca10762d4b529fe40a2188a60ca4469d2c50a825b5f33adc2cb78c69445\"
                }
            }").expect("Failed to deserialize."),
            TestJson {
                public_key: PublicKey {
                    digest_function: Algorithm::Secp256k1.to_string().into(),
                    payload: hex::decode(
                        "0312273e8810581e58948d3fb8f9e8ad53aaa21492ebb8703915bbb565a21b7fcc"
                    )
                    .expect("Failed to decode public key.")
                },
                private_key: PrivateKey {
                    digest_function: Algorithm::Secp256k1.to_string().into(),
                    payload: hex::decode("4df4fca10762d4b529fe40a2188a60ca4469d2c50a825b5f33adc2cb78c69445")
                    .expect("Failed to decode private key"),
                }
            }
        );
        assert_eq!(
            serde_json::from_str::<'_, TestJson>("{
                \"public_key\": \"ea016104175b1e79b15e8a2d5893bf7f8933ca7d0863105d8bac3d6f976cb043378a0e4b885c57ed14eb85fc2fabc639adc7de7f0020c70c57acc38dee374af2c04a6f61c11de8df9034b12d849c7eb90099b0881267d0e1507d4365d838d7dcc31511e7\",
                \"private_key\": {
                    \"digest_function\": \"bls_normal\",
                    \"payload\": \"000000000000000000000000000000002f57460183837efbac6aa6ab3b8dbb7cffcfc59e9448b7860a206d37d470cba3\"
                }
            }").expect("Failed to deserialize."),
            TestJson {
                public_key: PublicKey {
                    digest_function: Algorithm::BlsNormal.to_string().into(),
                    payload: hex::decode(
                        "04175b1e79b15e8a2d5893bf7f8933ca7d0863105d8bac3d6f976cb043378a0e4b885c57ed14eb85fc2fabc639adc7de7f0020c70c57acc38dee374af2c04a6f61c11de8df9034b12d849c7eb90099b0881267d0e1507d4365d838d7dcc31511e7"
                    )
                    .expect("Failed to decode public key.")
                },
                private_key: PrivateKey {
                    digest_function: Algorithm::BlsNormal.to_string().into(),
                    payload: hex::decode("000000000000000000000000000000002f57460183837efbac6aa6ab3b8dbb7cffcfc59e9448b7860a206d37d470cba3")
                    .expect("Failed to decode private key"),
                }
            }
        );
        assert_eq!(
            serde_json::from_str::<'_, TestJson>("{
                \"public_key\": \"eb01c1040cb3231f601e7245a6ec9a647b450936f707ca7dc347ed258586c1924941d8bc38576473a8ba3bb2c37e3e121130ab67103498a96d0d27003e3ad960493da79209cf024e2aa2ae961300976aeee599a31a5e1b683eaa1bcffc47b09757d20f21123c594cf0ee0baf5e1bdd272346b7dc98a8f12c481a6b28174076a352da8eae881b90911013369d7fa960716a5abc5314307463fa2285a5bf2a5b5c6220d68c2d34101a91dbfc531c5b9bbfb2245ccc0c50051f79fc6714d16907b1fc40e0c0\",
                \"private_key\": {
                    \"digest_function\": \"bls_small\",
                    \"payload\": \"0000000000000000000000000000000060f3c1ac9addbbed8db83bc1b2ef22139fb049eecb723a557a41ca1a4b1fed63\"
                }
            }").expect("Failed to deserialize."),
            TestJson {
                public_key: PublicKey {
                    digest_function: Algorithm::BlsSmall.to_string().into(),
                    payload: hex::decode(
                        "040cb3231f601e7245a6ec9a647b450936f707ca7dc347ed258586c1924941d8bc38576473a8ba3bb2c37e3e121130ab67103498a96d0d27003e3ad960493da79209cf024e2aa2ae961300976aeee599a31a5e1b683eaa1bcffc47b09757d20f21123c594cf0ee0baf5e1bdd272346b7dc98a8f12c481a6b28174076a352da8eae881b90911013369d7fa960716a5abc5314307463fa2285a5bf2a5b5c6220d68c2d34101a91dbfc531c5b9bbfb2245ccc0c50051f79fc6714d16907b1fc40e0c0"
                    )
                    .expect("Failed to decode public key.")
                },
                private_key: PrivateKey {
                    digest_function: Algorithm::BlsSmall.to_string().into(),
                    payload: hex::decode("0000000000000000000000000000000060f3c1ac9addbbed8db83bc1b2ef22139fb049eecb723a557a41ca1a4b1fed63")
                    .expect("Failed to decode private key"),
                }
            }
        )
    }
}
