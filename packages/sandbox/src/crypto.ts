import { create_blake2b_32_hash, init } from '@iroha/crypto';

console.log(init);

// init.

init().then(() => {
    console.log(create_blake2b_32_hash(new Uint8Array([1, 2, 3, 4])));
});
