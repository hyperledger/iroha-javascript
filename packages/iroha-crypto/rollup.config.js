import copy from 'rollup-plugin-copy';

export default {
    input: 'lib.esm.js',
    plugins: [
        copy({
            targets: [{ src: 'wasm/iroha_crypto_bg.wasm', dest: 'dist' }],
        }),
    ],
    output: [
        {
            file: 'lib.cjs.js',
            format: 'cjs',
        },
    ],
};
