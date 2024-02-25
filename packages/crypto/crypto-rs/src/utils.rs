use alloc::string::{String, ToString};
use alloc::vec::Vec;
use core::fmt::Display;

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

pub trait JsErrorResultExt<T> {
    fn wrap_js_error(self) -> Result<T, JsError>;
}

impl<T, E: Display> JsErrorResultExt<T> for Result<T, E> {
    fn wrap_js_error(self) -> Result<T, JsError> {
        self.map_err(|e| JsError::new(&e.to_string()))
    }
}

// pub fn decode_hex(hex: String) -> Result<Vec<u8>, JsError> {
//     let hex = hex::decode(hex).map_err(JsErrorWrap::from)?;
//     Ok(hex)
// }

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "BytesInput")]
    pub type BytesInputJs;
}

#[wasm_bindgen(typescript_custom_section)]
const TS_BYTES_INPUT: &str = r#"
export type BytesInput =
    | { t: 'Array', c: Uint8Array }
    | { t: 'Hex', c: string }
"#;

impl TryFrom<BytesInputJs> for Vec<u8> {
    type Error = JsError;

    fn try_from(value: BytesInputJs) -> Result<Self, Self::Error> {
        #[derive(serde::Deserialize)]
        #[serde(tag = "t", content = "c")]
        enum BytesInputEnum {
            Array(Vec<u8>),
            Hex(String),
        }

        let structured: BytesInputEnum = serde_wasm_bindgen::from_value(value.obj)?;
        let vec = match structured {
            BytesInputEnum::Array(vec) => vec,
            BytesInputEnum::Hex(hexstr) => hex::decode(hexstr).map_err(JsErrorWrap::from)?,
        };

        Ok(vec)
    }
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
