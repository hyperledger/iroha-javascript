use alloc::string::{String, ToString};
use alloc::vec::Vec;
use hex::FromHexError;
use wasm_bindgen::prelude::*;

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

/// Struct to wrap any string and then convert it to [`wasm_bindgen::prelude::JsError`].
/// Makes it possible to use `?`
pub struct JsErrorWrap(String);

// impl From<FromHexError> for JsErrorWrap {
//     fn from(value: FromHexError) -> Self {
//         Self(format!("Failed to parse hex: {value}"))
//     }
// }

impl<T> From<T> for JsErrorWrap
where
    T: ToString,
{
    fn from(value: T) -> Self {
        Self(value.to_string())
    }
}

impl From<JsErrorWrap> for JsError {
    fn from(JsErrorWrap(msg): JsErrorWrap) -> Self {
        Self::new(&msg)
    }
}

pub fn decode_hex(hex: String) -> Result<Vec<u8>, JsError> {
    let hex = hex::decode(hex).map_err(JsErrorWrap::from)?;
    Ok(hex)
}

// impl<T> JsErrorWrap<T> where T: ToString {
//     pub fn

// }

// #[wasm_bindgen(module = "@scale-codec/enum")]
// extern "C" {
//     pub type JsEnum;

//     #[wasm_bindgen(static_method_of = JsEnum)]
//     pub fn variant_empty(name: String) -> JsEnum;
// }
