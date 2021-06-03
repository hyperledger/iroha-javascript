import { defineConfig } from 'vite';
import path from 'path';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            fileName: 'scale-codec',

            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            plugins: [
                nodePolyfills({
                    include: null,
                }),
            ],
        },
    },
});
