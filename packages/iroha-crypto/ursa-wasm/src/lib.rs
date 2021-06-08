mod utils;

use ursa::{
    blake2::{
        digest::{Input, VariableOutput},
        VarBlake2b,
    },
    keys::PrivateKey,
    signatures::{ed25519::Ed25519Sha512, SignatureScheme},
};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Length of hash
pub const HASH_LENGTH: usize = 32;

#[wasm_bindgen]
pub fn create_blake2b_32_hash(bytes: &[u8]) -> Vec<u8> {
    let vec_hash = VarBlake2b::new(HASH_LENGTH)
        .expect("Failed to initialize variable size hash")
        .chain(bytes)
        .vec_result();
    let mut hash = [0; HASH_LENGTH];
    hash.copy_from_slice(&vec_hash);
    hash.into()
}

#[wasm_bindgen]
pub fn sign_with_ed25519_sha512(message: &[u8], private_key: &[u8]) -> Vec<u8> {
    let priv_key: PrivateKey = PrivateKey(private_key.to_vec());
    let signature = Ed25519Sha512::new()
        .sign(message, &priv_key)
        .expect("Failed to sign message");
    signature
}
