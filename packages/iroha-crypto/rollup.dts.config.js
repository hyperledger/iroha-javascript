import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';

/**
 * Primarily it is for development
 */
export default defineConfig({
    input: 'input-for-rollup-dts.d.ts',
    plugins: [
        dts(),
        {
            name: 'append-eslint-disable',
            intro: '/* eslint-disable */',
        },
    ],
    output: {
        file: 'types.d.ts',
        format: 'esm',
    },
});
