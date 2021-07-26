import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';

module.exports = {
    input: 'packages/iroha-data-model/src/lib.ts',
    output: {
        file: 'packages/iroha-data-model/dist/lib.esm.js',
        format: 'es',
    },
    plugins: [
        esbuild({
            minify: true,
        }),
        nodeResolve(),
    ],
};
