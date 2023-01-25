use super::*;

/// ed25519
pub const ED_25519: &str = "ed25519";
/// secp256k1
pub const SECP_256_K1: &str = "secp256k1";
/// bls normal
pub const BLS_NORMAL: &str = "bls_normal";
/// bls small
pub const BLS_SMALL: &str = "bls_small";

// FIXME make proc macro?
#[wasm_bindgen(typescript_custom_section)]
const TS_ALGORITHMS: &str = r#"
export type Algorithm = 
    | 'ed25519'
    | 'secp256k1'
    | 'bls_normal'
    | 'bls_small'
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Algorithm")]
    pub type AlgorithmJsStr;
}

// TODO

// #[wasm_bindgen(typescript_custom_section)]
// const TS_ALG_CONST: &str = { AA };

// const AA: &str = const_str::format!(
//     r#"
// export type AlgorithmStr =
//   | '{ED_25519}'
// "#
// );

// macro_rules! hack_bindgen {
//     ($str:expr) => {
//         #[wasm_bindgen(typescript_custom_section)]
//         const TS_CUSTOM: &str = $str;
//     };
// }

// hack_bindgen!(AA);

/// Error indicating algorithm could not be found
#[derive(Debug, Clone, Copy, Display)]
#[display(fmt = "Algorithm not supported")]
pub struct NoSuchAlgorithm;

/// Algorithm for hashing
#[derive(Debug, Clone, Copy, PartialEq, Eq, Display)]
#[repr(u8)]
// #[wasm_bindgen]
pub enum Algorithm {
    /// Ed25519
    #[display(fmt = "{}", "ED_25519")]
    Ed25519,
    /// Secp256k1
    #[display(fmt = "{}", "SECP_256_K1")]
    Secp256k1,
    /// BlsNormal
    #[display(fmt = "{}", "BLS_NORMAL")]
    BlsNormal,
    /// BlsSmall
    #[display(fmt = "{}", "BLS_SMALL")]
    BlsSmall,
}

impl Default for Algorithm {
    fn default() -> Self {
        Algorithm::Ed25519
    }
}

impl FromStr for Algorithm {
    type Err = NoSuchAlgorithm;

    fn from_str(algorithm: &str) -> Result<Self, Self::Err> {
        match algorithm {
            ED_25519 => Ok(Algorithm::Ed25519),
            SECP_256_K1 => Ok(Algorithm::Secp256k1),
            BLS_NORMAL => Ok(Algorithm::BlsNormal),
            BLS_SMALL => Ok(Algorithm::BlsSmall),
            _ => Err(Self::Err {}),
        }
    }
}

impl TryFrom<AlgorithmJsStr> for Algorithm {
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

impl TryFrom<AlgorithmJsStr> for ConstString {
    type Error = JsError;

    fn try_from(value: AlgorithmJsStr) -> Result<Self, Self::Error> {
        let alg: Algorithm = value.try_into()?;
        Ok(alg.to_string().into())
    }
}

impl From<Algorithm> for AlgorithmJsStr {
    fn from(value: Algorithm) -> Self {
        AlgorithmJsStr {
            obj: value.to_string().into(),
        }
    }
}

#[wasm_bindgen]
pub fn algorithm_default() -> AlgorithmJsStr {
    Algorithm::default().into()
}
