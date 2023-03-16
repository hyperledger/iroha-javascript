use core::{hash, marker::PhantomData};

use crate::{alloc, utils::BytesInputJs, wasm_bindgen, JsError, String};
use alloc::vec::Vec;
use derive_more::{DebugCustom, Deref, DerefMut, Display};
use parity_scale_codec::{Decode, Encode};
use serde::{Deserialize, Serialize};
use ursa::{
    blake2::{digest::VariableOutput, VarBlake2b},
    sha3::digest::Input,
};

/// Hash of Iroha entities. Currently supports only blake2b-32.
#[allow(clippy::unsafe_derive_deserialize)]
#[derive(
    Clone,
    Copy,
    Display,
    DebugCustom,
    Hash,
    Eq,
    PartialEq,
    Ord,
    PartialOrd,
    Decode,
    Encode,
    Deserialize,
    Serialize,
)]
#[repr(transparent)]
#[serde(transparent)]
#[display(fmt = "{}", "hex::encode(_0)")]
#[debug(fmt = "{{ Hash({}) }}", "hex::encode(_0)")]
#[wasm_bindgen]
pub struct Hash([u8; Self::LENGTH]);

impl Hash {
    /// Length of hash
    pub const LENGTH: usize = 32;

    /// Wrap the given bytes; they must be prehashed with `VarBlake2b`
    pub const fn prehashed(mut bytes: [u8; Self::LENGTH]) -> Self {
        bytes[Self::LENGTH - 1] |= 1;
        #[allow(unsafe_code)]
        // SAFETY:
        // - any `u8` value after bitwise or with 1 will be at least 1
        // - `Hash` and `[u8; Hash::LENGTH]` have the same memory layout
        unsafe {
            core::mem::transmute(bytes)
        }
    }

    /// Construct zeroed hash
    #[must_use]
    // TODO: It would be best if all uses of zeroed hash could be replaced with Option<Hash>
    pub const fn zeroed() -> Self {
        Hash::prehashed([0; Hash::LENGTH])
    }

    /// Hash the given bytes.
    #[allow(clippy::expect_used)]
    #[must_use]
    pub fn new(bytes: impl AsRef<[u8]>) -> Self {
        let vec_hash = VarBlake2b::new(Self::LENGTH)
            .expect("Failed to initialize variable size hash")
            .chain(bytes)
            .vec_result();
        let mut hash = [0; Self::LENGTH];
        hash.copy_from_slice(&vec_hash);
        Hash::prehashed(hash)
    }

    /// Adds type information to the hash. Be careful about using this function
    /// since it is not possible to validate the correctness of the conversion.
    /// Prefer creating new hashes with [`HashOf::new`] whenever possible
    #[must_use]
    pub const fn typed<T>(self) -> HashOf<T> {
        HashOf(self, PhantomData)
    }
}

#[wasm_bindgen]
impl Hash {
    /// Construct zeroed hash
    #[wasm_bindgen(js_name = "zeroed")]
    pub fn zeroed_wasm() -> Self {
        Self::zeroed()
    }

    /// Hash the given bytes.
    #[wasm_bindgen(js_name = "hash")]
    pub fn hash_wasm(bytes: BytesInputJs) -> Result<Hash, JsError> {
        let bytes: Vec<_> = bytes.try_into()?;
        Ok(Self::new(bytes))
    }

    #[wasm_bindgen(js_name = "bytes")]
    pub fn bytes_wasm(&self) -> Vec<u8> {
        self.0.into()
    }

    #[wasm_bindgen(js_name = "bytes_hex")]
    pub fn bytes_hex_wasm(&self) -> String {
        hex::encode(self.bytes_wasm())
    }
}

impl From<Hash> for [u8; Hash::LENGTH] {
    #[inline]
    fn from(Hash(bytes): Hash) -> Self {
        bytes
    }
}

impl AsRef<[u8; Hash::LENGTH]> for Hash {
    #[inline]
    fn as_ref(&self) -> &[u8; Hash::LENGTH] {
        &self.0
    }
}

impl<T> From<HashOf<T>> for Hash {
    fn from(HashOf(hash, _): HashOf<T>) -> Self {
        hash
    }
}

/// Represents hash of Iroha entities like `Block` or `Transaction`. Currently supports only blake2b-32.
// Lint triggers when expanding #[codec(skip)]
#[allow(clippy::default_trait_access)]
#[derive(DebugCustom, Deref, DerefMut, Display, Decode, Encode, Deserialize, Serialize)]
#[display(fmt = "{_0}")]
#[debug(fmt = "{{ {} {_0} }}", "core::any::type_name::<Self>()")]
#[serde(transparent)]
#[repr(transparent)]
pub struct HashOf<T>(
    #[deref]
    #[deref_mut]
    Hash,
    #[codec(skip)] PhantomData<T>,
);

impl<T> Clone for HashOf<T> {
    fn clone(&self) -> Self {
        Self(self.0, PhantomData)
    }
}

impl<T> Copy for HashOf<T> {}

impl<T> PartialEq for HashOf<T> {
    fn eq(&self, other: &Self) -> bool {
        self.0.eq(&other.0)
    }
}

impl<T> Eq for HashOf<T> {}

impl<T> PartialOrd for HashOf<T> {
    fn partial_cmp(&self, other: &Self) -> Option<core::cmp::Ordering> {
        self.0.partial_cmp(&other.0)
    }
}

impl<T> Ord for HashOf<T> {
    fn cmp(&self, other: &Self) -> core::cmp::Ordering {
        self.0.cmp(&other.0)
    }
}

impl<T> hash::Hash for HashOf<T> {
    fn hash<H: hash::Hasher>(&self, state: &mut H) {
        self.0.hash(state);
    }
}

impl<T> AsRef<[u8; Hash::LENGTH]> for HashOf<T> {
    fn as_ref(&self) -> &[u8; Hash::LENGTH] {
        self.0.as_ref()
    }
}

impl<T> HashOf<T> {
    /// Transmutes hash to some specific type.
    /// Don't use this method if not required.
    #[inline]
    #[must_use]
    pub const fn transmute<F>(self) -> HashOf<F> {
        HashOf(self.0, PhantomData)
    }
}

impl<T: Encode> HashOf<T> {
    /// Construct typed hash
    #[must_use]
    pub fn new(value: &T) -> Self {
        Self(Hash::new(value.encode()), PhantomData)
    }
}

#[cfg(test)]
mod tests {
    #![allow(clippy::restriction)]

    use super::*;
    use hex_literal::hex;
    use ursa::sha3::digest::Input;

    #[test]
    fn blake2_32b() {
        let mut hasher = VarBlake2b::new(32).unwrap();
        hasher.input(hex!("6920616d2064617461"));
        hasher.variable_result(|res| {
            assert_eq!(
                res[..],
                hex!("ba67336efd6a3df3a70eeb757860763036785c182ff4cf587541a0068d09f5b2")[..]
            );
        });
    }
}
