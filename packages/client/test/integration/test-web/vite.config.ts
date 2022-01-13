import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const resolveInPkgSrc = (unscopedName: string, ...paths: string[]) =>
    path.resolve(__dirname, '../../../../', unscopedName, ...paths);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        target: 'ESNEXT',
    },
    server: {
        proxy: {
            '/torii': {
                ws: true,
                target: 'http://127.0.0.1:8080',
                rewrite: (path) => path.replace(/^\/torii/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@iroha2/client-isomorphic-ws': resolveInPkgSrc('client-isomorphic-ws', 'dist/native.js'),
            '@iroha2/client-isomorphic-fetch': resolveInPkgSrc('client-isomorphic-fetch', 'dist/native.js'),
        },
    },
});
