import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            fileName: 'iroha-client',
            formats: ['es', 'cjs'],
        },
        // rollupOptions: {
        //     plugins: [
        //         nodePolyfills({
        //             include: null,
        //         }),
        //         // babel({
        //         //     babelHelpers: 'bundled',
        //         // }),
        //     ],
        // },
        // rollupOptions: {
        //     output: {

        //     }
        // }
    },
});
