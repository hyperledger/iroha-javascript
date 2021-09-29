import * as wasm from './wasm_pack_output_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

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

function getObject(idx) { return heap[idx]; }

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
/**
*/
export function main() {
    wasm.main();
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {KeyPair} key_pair
* @param {Uint8Array} payload
* @returns {Signature}
*/
export function createSignature(key_pair, payload) {
    _assertClass(key_pair, KeyPair);
    var ptr0 = passArray8ToWasm0(payload, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.createSignature(key_pair.ptr, ptr0, len0);
    return Signature.__wrap(ret);
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @returns {Algorithm}
*/
export function AlgorithmBlsNormal() {
    var ret = wasm.AlgorithmBlsNormal();
    return Algorithm.__wrap(ret);
}

/**
* @returns {Algorithm}
*/
export function AlgorithmBlsSmall() {
    var ret = wasm.AlgorithmBlsSmall();
    return Algorithm.__wrap(ret);
}

/**
* @returns {Algorithm}
*/
export function AlgorithmSecp256k1() {
    var ret = wasm.AlgorithmSecp256k1();
    return Algorithm.__wrap(ret);
}

/**
* @returns {Algorithm}
*/
export function AlgorithmEd25519() {
    var ret = wasm.AlgorithmEd25519();
    return Algorithm.__wrap(ret);
}

/**
* @returns {KeyGenConfiguration}
*/
export function createKeyGenConfiguration() {
    var ret = wasm.createKeyGenConfiguration();
    return KeyGenConfiguration.__wrap(ret);
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* @param {Key} key
* @returns {PrivateKey}
*/
export function createPrivateKeyFromJsKey(key) {
    try {
        var ret = wasm.createPrivateKeyFromJsKey(addBorrowedObject(key));
        return PrivateKey.__wrap(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {Multihash} multihash
* @returns {PublicKey}
*/
export function createPublicKeyFromMultihash(multihash) {
    _assertClass(multihash, Multihash);
    var ret = wasm.createPublicKeyFromMultihash(multihash.ptr);
    return PublicKey.__wrap(ret);
}

/**
* @param {KeyGenConfiguration} config
* @returns {KeyPair}
*/
export function generateKeyPairWithConfiguration(config) {
    _assertClass(config, KeyGenConfiguration);
    var ptr0 = config.ptr;
    config.ptr = 0;
    var ret = wasm.generateKeyPairWithConfiguration(ptr0);
    return KeyPair.__wrap(ret);
}

/**
* @param {PublicKey} public_key
* @param {PrivateKey} private_key
* @returns {KeyPair}
*/
export function createKeyPairFromKeys(public_key, private_key) {
    _assertClass(public_key, PublicKey);
    _assertClass(private_key, PrivateKey);
    var ret = wasm.createKeyPairFromKeys(public_key.ptr, private_key.ptr);
    return KeyPair.__wrap(ret);
}

/**
* @returns {MultihashDigestFunction}
*/
export function MultihashDigestEd25519Pub() {
    var ret = wasm.MultihashDigestEd25519Pub();
    return MultihashDigestFunction.__wrap(ret);
}

/**
* @returns {MultihashDigestFunction}
*/
export function MultihashDigestSecp256k1Pub() {
    var ret = wasm.MultihashDigestSecp256k1Pub();
    return MultihashDigestFunction.__wrap(ret);
}

/**
* @returns {MultihashDigestFunction}
*/
export function MultihashDigestBls12381g1Pub() {
    var ret = wasm.MultihashDigestBls12381g1Pub();
    return MultihashDigestFunction.__wrap(ret);
}

/**
* @returns {MultihashDigestFunction}
*/
export function MultihashDigestBls12381g2Pub() {
    var ret = wasm.MultihashDigestBls12381g2Pub();
    return MultihashDigestFunction.__wrap(ret);
}

/**
* @param {string} val
* @returns {MultihashDigestFunction}
*/
export function createMultihashDigestFunctionFromString(val) {
    var ptr0 = passStringToWasm0(val, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.createMultihashDigestFunctionFromString(ptr0, len0);
    return MultihashDigestFunction.__wrap(ret);
}

/**
* @param {Uint8Array} bytes
* @returns {Multihash}
*/
export function createMultihashFromBytes(bytes) {
    var ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.createMultihashFromBytes(ptr0, len0);
    return Multihash.__wrap(ret);
}

/**
* @param {PublicKey} public_key
* @returns {Multihash}
*/
export function createMultihashFromPublicKey(public_key) {
    _assertClass(public_key, PublicKey);
    var ret = wasm.createMultihashFromPublicKey(public_key.ptr);
    return Multihash.__wrap(ret);
}

/**
* @param {Uint8Array} input
* @returns {Hash}
*/
export function createHash(input) {
    var ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.createHash(ptr0, len0);
    return Hash.__wrap(ret);
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
export class Algorithm {

    static __wrap(ptr) {
        const obj = Object.create(Algorithm.prototype);
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
        wasm.__wbg_algorithm_free(ptr);
    }
}
/**
*/
export class Hash {

    static __wrap(ptr) {
        const obj = Object.create(Hash.prototype);
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
        wasm.__wbg_hash_free(ptr);
    }
    /**
    * @returns {Uint8Array}
    */
    bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.hash_bytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
* Configuration of key generation
*/
export class KeyGenConfiguration {

    static __wrap(ptr) {
        const obj = Object.create(KeyGenConfiguration.prototype);
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
        wasm.__wbg_keygenconfiguration_free(ptr);
    }
    /**
    * Use seed
    * @param {Uint8Array} seed
    * @returns {KeyGenConfiguration}
    */
    useSeed(seed) {
        const ptr = this.__destroy_into_raw();
        var ptr0 = passArray8ToWasm0(seed, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.keygenconfiguration_useSeed(ptr, ptr0, len0);
        return KeyGenConfiguration.__wrap(ret);
    }
    /**
    * Use private key
    * @param {PrivateKey} private_key
    * @returns {KeyGenConfiguration}
    */
    usePrivateKey(private_key) {
        const ptr = this.__destroy_into_raw();
        _assertClass(private_key, PrivateKey);
        var ret = wasm.keygenconfiguration_usePrivateKey(ptr, private_key.ptr);
        return KeyGenConfiguration.__wrap(ret);
    }
    /**
    * with algorithm
    * @param {Algorithm} algorithm
    * @returns {KeyGenConfiguration}
    */
    withAlgorithm(algorithm) {
        const ptr = this.__destroy_into_raw();
        _assertClass(algorithm, Algorithm);
        var ptr0 = algorithm.ptr;
        algorithm.ptr = 0;
        var ret = wasm.keygenconfiguration_withAlgorithm(ptr, ptr0);
        return KeyGenConfiguration.__wrap(ret);
    }
}
/**
*/
export class KeyPair {

    static __wrap(ptr) {
        const obj = Object.create(KeyPair.prototype);
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
        wasm.__wbg_keypair_free(ptr);
    }
    /**
    * @returns {PublicKey}
    */
    publicKey() {
        var ret = wasm.keypair_publicKey(this.ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {PrivateKey}
    */
    privateKey() {
        var ret = wasm.keypair_privateKey(this.ptr);
        return PrivateKey.__wrap(ret);
    }
}
/**
*/
export class Multihash {

    static __wrap(ptr) {
        const obj = Object.create(Multihash.prototype);
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
        wasm.__wbg_multihash_free(ptr);
    }
    /**
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.multihash_toBytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {MultihashDigestFunction}
    */
    digestFunction() {
        var ret = wasm.multihash_digestFunction(this.ptr);
        return MultihashDigestFunction.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    payload() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.multihash_payload(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class MultihashDigestFunction {

    static __wrap(ptr) {
        const obj = Object.create(MultihashDigestFunction.prototype);
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
        wasm.__wbg_multihashdigestfunction_free(ptr);
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.multihashdigestfunction_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
}
/**
*/
export class PrivateKey {

    static __wrap(ptr) {
        const obj = Object.create(PrivateKey.prototype);
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
        wasm.__wbg_privatekey_free(ptr);
    }
    /**
    * @returns {string}
    */
    digestFunction() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.privatekey_digestFunction(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    payload() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.privatekey_payload(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class PublicKey {

    static __wrap(ptr) {
        const obj = Object.create(PublicKey.prototype);
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
        wasm.__wbg_publickey_free(ptr);
    }
    /**
    * @returns {string}
    */
    digestFunction() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.privatekey_digestFunction(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    payload() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.privatekey_payload(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class Signature {

    static __wrap(ptr) {
        const obj = Object.create(Signature.prototype);
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
        wasm.__wbg_signature_free(ptr);
    }
    /**
    * @param {Uint8Array} payload
    */
    verify(payload) {
        var ptr0 = passArray8ToWasm0(payload, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.signature_verify(this.ptr, ptr0, len0);
    }
    /**
    * @returns {PublicKey}
    */
    publicKey() {
        var ret = wasm.keypair_publicKey(this.ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    signatureBytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.signature_signatureBytes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

export function __wbindgen_string_new(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbg_digestFunction_5c94abf53db78ecb(arg0, arg1) {
    var ret = getObject(arg1).digestFunction;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_payload_1b2200b16ad711b5(arg0, arg1) {
    var ret = getObject(arg1).payload;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_new_59cb74e423758ede() {
    var ret = new Error();
    return addHeapObject(ret);
};

export function __wbg_stack_558ba5917b466edd(arg0, arg1) {
    var ret = getObject(arg1).stack;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
    try {
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_self_86b4b13392c7af56() { return handleError(function () {
    var ret = self.self;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_crypto_b8c92eaac23d0d80(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export function __wbg_msCrypto_9ad6677321a08dd8(arg0) {
    var ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

export function __wbindgen_is_undefined(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbg_static_accessor_MODULE_452b4680e8614c81() {
    var ret = module;
    return addHeapObject(ret);
};

export function __wbg_require_f5521a5b85ad2542(arg0, arg1, arg2) {
    var ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
};

export function __wbg_getRandomValues_dd27e6b0652b3236(arg0) {
    var ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
};

export function __wbg_getRandomValues_e57c9b75ddead065(arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
};

export function __wbg_randomFillSync_d2ba53160aec6aba(arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
};

export function __wbg_buffer_eb2155f17856c20b(arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export function __wbg_length_0b194abde938d0c6(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

export function __wbg_new_ff8b26f7b2d7e2fb(arg0) {
    var ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_set_67cdd115b9cb141f(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

export function __wbg_newwithlength_a49b32b2030b93c3(arg0) {
    var ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_subarray_1bb315d30e0c968c(arg0, arg1, arg2) {
    var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_rethrow(arg0) {
    throw takeObject(arg0);
};

export function __wbindgen_memory() {
    var ret = wasm.memory;
    return addHeapObject(ret);
};

