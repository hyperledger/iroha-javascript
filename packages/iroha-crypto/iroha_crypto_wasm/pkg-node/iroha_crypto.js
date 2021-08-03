let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) {
    return heap[idx];
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString =
    typeof cachedTextEncoder.encodeInto === 'function'
        ? function (arg, view) {
              return cachedTextEncoder.encodeInto(arg, view);
          }
        : function (arg, view) {
              const buf = cachedTextEncoder.encode(arg);
              view.set(buf);
              return {
                  read: arg.length,
                  written: buf.length,
              };
          };

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0()
            .subarray(ptr, ptr + buf.length)
            .set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7f) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, (len = offset + arg.length * 3));
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(Number(arg.length));
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
 */
module.exports.JsAlgorithm = Object.freeze({
    /**
     * Ed25519
     */
    Ed25519: 0,
    0: 'Ed25519',
    /**
     * Secp256k1
     */
    Secp256k1: 1,
    1: 'Secp256k1',
    /**
     * BlsSmall
     */
    BlsSmall: 2,
    2: 'BlsSmall',
    /**
     * BlsNormal
     */
    BlsNormal: 3,
    3: 'BlsNormal',
});
/**
 */
module.exports.MultihashDigestFunction = Object.freeze({
    /**
     * Ed25519
     */
    Ed25519Pub: 0,
    0: 'Ed25519Pub',
    /**
     * Secp256k1
     */
    Secp256k1Pub: 1,
    1: 'Secp256k1Pub',
    /**
     * Bls12381G1
     */
    Bls12381G1Pub: 2,
    2: 'Bls12381G1Pub',
    /**
     * Bls12381G2
     */
    Bls12381G2Pub: 3,
    3: 'Bls12381G2Pub',
});
/**
 * Configuration of key generation
 */
class JsKeyGenConfiguration {
    static __wrap(ptr) {
        const obj = Object.create(JsKeyGenConfiguration.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jskeygenconfiguration_free(ptr);
    }
    /**
     */
    constructor() {
        let ret = wasm.jskeygenconfiguration_new();
        return JsKeyGenConfiguration.__wrap(ret);
    }
    /**
     * Use seed
     * @param {Uint8Array} seed
     * @returns {JsKeyGenConfiguration}
     */
    use_seed(seed) {
        const ptr = this.__destroy_into_raw();
        let ptr0 = passArray8ToWasm0(seed, wasm.__wbindgen_malloc);
        let len0 = WASM_VECTOR_LEN;
        let ret = wasm.jskeygenconfiguration_use_seed(ptr, ptr0, len0);
        return JsKeyGenConfiguration.__wrap(ret);
    }
    /**
     * Use private key
     * @param {JsPrivateKey} private_key
     * @returns {JsKeyGenConfiguration}
     */
    use_private_key(private_key) {
        const ptr = this.__destroy_into_raw();
        _assertClass(private_key, JsPrivateKey);
        let ptr0 = private_key.ptr;
        private_key.ptr = 0;
        let ret = wasm.jskeygenconfiguration_use_private_key(ptr, ptr0);
        return JsKeyGenConfiguration.__wrap(ret);
    }
    /**
     * with algorithm
     * @param {number} algorithm
     * @returns {JsKeyGenConfiguration}
     */
    with_algorithm(algorithm) {
        const ptr = this.__destroy_into_raw();
        let ret = wasm.jskeygenconfiguration_with_algorithm(ptr, algorithm);
        return JsKeyGenConfiguration.__wrap(ret);
    }
}
module.exports.JsKeyGenConfiguration = JsKeyGenConfiguration;
/**
 */
class JsKeyPair {
    static __wrap(ptr) {
        const obj = Object.create(JsKeyPair.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jskeypair_free(ptr);
    }
    /**
     * @returns {JsPublicKey}
     */
    get public_key() {
        let ret = wasm.jskeypair_public_key(this.ptr);
        return JsPublicKey.__wrap(ret);
    }
    /**
     * @returns {JsPrivateKey}
     */
    get private_key() {
        let ret = wasm.jskeypair_private_key(this.ptr);
        return JsPrivateKey.__wrap(ret);
    }
    /**
     * @param {JsKeyGenConfiguration} config
     * @returns {JsKeyPair}
     */
    static generate_with_configuration(config) {
        _assertClass(config, JsKeyGenConfiguration);
        let ptr0 = config.ptr;
        config.ptr = 0;
        let ret = wasm.jskeypair_generate_with_configuration(ptr0);
        return JsKeyPair.__wrap(ret);
    }
}
module.exports.JsKeyPair = JsKeyPair;
/**
 */
class JsMultihash {
    static __wrap(ptr) {
        const obj = Object.create(JsMultihash.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsmultihash_free(ptr);
    }
    /**
     * @returns {Uint8Array}
     */
    to_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.jsmultihash_to_bytes(retptr, this.ptr);
            let r0 = getInt32Memory0()[retptr / 4 + 0];
            let r1 = getInt32Memory0()[retptr / 4 + 1];
            let v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, Number(r1));
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {JsMultihash}
     */
    static from_bytes(bytes) {
        let ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        let len0 = WASM_VECTOR_LEN;
        let ret = wasm.jsmultihash_from_bytes(ptr0, len0);
        return JsMultihash.__wrap(ret);
    }
    /**
     * @param {JsPublicKey} arg0
     * @returns {JsMultihash}
     */
    static from_public_key(arg0) {
        _assertClass(arg0, JsPublicKey);
        let ret = wasm.jsmultihash_from_public_key(arg0.ptr);
        return JsMultihash.__wrap(ret);
    }
}
module.exports.JsMultihash = JsMultihash;

class JsMultihashDigestFunction {
    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsmultihashdigestfunction_free(ptr);
    }
    /**
     * @param {any} val
     * @returns {number}
     */
    static from_string(val) {
        let ret = wasm.jsmultihashdigestfunction_from_string(addHeapObject(val));
        return ret >>> 0;
    }
}
module.exports.JsMultihashDigestFunction = JsMultihashDigestFunction;
/**
 */
class JsPrivateKey {
    static __wrap(ptr) {
        const obj = Object.create(JsPrivateKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsprivatekey_free(ptr);
    }
    /**
     * @returns {any}
     */
    get digest_function() {
        let ret = wasm.jsprivatekey_digest_function(this.ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Uint8Array}
     */
    get payload() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.jsprivatekey_payload(retptr, this.ptr);
            let r0 = getInt32Memory0()[retptr / 4 + 0];
            let r1 = getInt32Memory0()[retptr / 4 + 1];
            let v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, Number(r1));
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.JsPrivateKey = JsPrivateKey;
/**
 */
class JsPublicKey {
    static __wrap(ptr) {
        const obj = Object.create(JsPublicKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jspublickey_free(ptr);
    }
    /**
     * @returns {any}
     */
    get digest_function() {
        let ret = wasm.jsprivatekey_digest_function(this.ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Uint8Array}
     */
    get payload() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.jsprivatekey_payload(retptr, this.ptr);
            let r0 = getInt32Memory0()[retptr / 4 + 0];
            let r1 = getInt32Memory0()[retptr / 4 + 1];
            let v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, Number(r1));
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {JsMultihash} arg0
     * @returns {JsPublicKey}
     */
    static from_multihash(arg0) {
        _assertClass(arg0, JsMultihash);
        let ret = wasm.jspublickey_from_multihash(arg0.ptr);
        return JsPublicKey.__wrap(ret);
    }
}
module.exports.JsPublicKey = JsPublicKey;
/**
 */
class JsSignature {
    static __wrap(ptr) {
        const obj = Object.create(JsSignature.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jssignature_free(ptr);
    }
    /**
     * @param {JsKeyPair} key_pair
     * @param {Uint8Array} payload
     */
    constructor(key_pair, payload) {
        _assertClass(key_pair, JsKeyPair);
        let ptr0 = key_pair.ptr;
        key_pair.ptr = 0;
        let ptr1 = passArray8ToWasm0(payload, wasm.__wbindgen_malloc);
        let len1 = WASM_VECTOR_LEN;
        let ret = wasm.jssignature_new(ptr0, ptr1, len1);
        return JsSignature.__wrap(ret);
    }
    /**
     * @param {Uint8Array} message
     */
    verify(message) {
        let ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        let len0 = WASM_VECTOR_LEN;
        wasm.jssignature_verify(this.ptr, ptr0, len0);
    }
}
module.exports.JsSignature = JsSignature;

module.exports.__wbindgen_string_new = function (arg0, arg1) {
    let ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_object_drop_ref = function (arg0) {
    takeObject(arg0);
};

module.exports.__wbg_self_86b4b13392c7af56 = function () {
    return handleError(() => {
        let ret = self.self;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_crypto_b8c92eaac23d0d80 = function (arg0) {
    let ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

module.exports.__wbg_msCrypto_9ad6677321a08dd8 = function (arg0) {
    let ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_undefined = function (arg0) {
    let ret = getObject(arg0) === undefined;
    return ret;
};

module.exports.__wbg_static_accessor_MODULE_452b4680e8614c81 = function () {
    let ret = module;
    return addHeapObject(ret);
};

module.exports.__wbg_require_f5521a5b85ad2542 = function (arg0, arg1, arg2) {
    let ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
};

module.exports.__wbg_getRandomValues_dd27e6b0652b3236 = function (arg0) {
    let ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
};

module.exports.__wbg_getRandomValues_e57c9b75ddead065 = function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
};

module.exports.__wbg_randomFillSync_d2ba53160aec6aba = function (arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
};

module.exports.__wbg_buffer_eb2155f17856c20b = function (arg0) {
    let ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

module.exports.__wbg_length_0b194abde938d0c6 = function (arg0) {
    let ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbg_new_ff8b26f7b2d7e2fb = function (arg0) {
    let ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_set_67cdd115b9cb141f = function (arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_newwithlength_a49b32b2030b93c3 = function (arg0) {
    let ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_subarray_1bb315d30e0c968c = function (arg0, arg1, arg2) {
    let ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_string_get = function (arg0, arg1) {
    const obj = getObject(arg1);
    let ret = typeof obj === 'string' ? obj : undefined;
    let ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    let len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_rethrow = function (arg0) {
    throw takeObject(arg0);
};

module.exports.__wbindgen_memory = function () {
    let ret = wasm.memory;
    return addHeapObject(ret);
};

const path = require('path').join(__dirname, 'iroha_crypto_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;
