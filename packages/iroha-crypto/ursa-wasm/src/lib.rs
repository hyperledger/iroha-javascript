mod utils;

use wasm_bindgen::prelude::*;
use ursa::{
    blake2::{
        digest::{Input, VariableOutput},
        VarBlake2b,
    },
    keys::{
        KeyGenOption as UrsaKeyGenOption, PrivateKey, PublicKey as UrsaPublicKey,
    },
    signatures::{
        bls::{normal::Bls as BlsNormal, small::Bls as BlsSmall},
        ed25519::Ed25519Sha512,
        secp256k1::EcdsaSecp256k1Sha256,
        SignatureScheme,
    },
};
use js_sys::{Uint8Array};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Length of hash
pub const HASH_LENGTH: usize = 32;

#[wasm_bindgen]
pub fn create_blake2b_32_hash(bytes: &[u8]) -> Uint8Array {
    let vec_hash = VarBlake2b::new(HASH_LENGTH)
        .expect("Failed to initialize variable size hash")
        .chain(bytes)
        .vec_result();
    let mut hash = [0; HASH_LENGTH];
    hash.copy_from_slice(&vec_hash);

    let arr = Uint8Array::new_with_length(32);
    arr.copy_from(&hash);
    arr
}


#[wasm_bindgen]
pub fn sign_with_ed25519_sha512(message: &[u8], private_key: &[u8]) -> Uint8Array {
    let priv_key: PrivateKey = PrivateKey(private_key.to_vec());
    let signature = Ed25519Sha512::new().sign(message, &priv_key).expect("Failed to sign message");
    let arr = Uint8Array::new_with_length(signature.len() as u32);
    arr.copy_from(&signature);
    arr
}
