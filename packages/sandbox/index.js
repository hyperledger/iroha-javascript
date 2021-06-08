const { create_blake2b_32_hash } = require('@iroha/crypto/common');

console.log(create_blake2b_32_hash(new Uint8Array([1, 2, 3])));
