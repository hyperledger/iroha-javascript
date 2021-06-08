import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// import nodePolyfills from 'rollup-plugin-polyfill-node';
// // import presetEnv from '@babel/preset-env'

// const presets = [
//     [
//         '@babel/env',
//         {
//             // modules: 'commonjs',
//             modules: false,
//             targets: {
//                 browsers: '>0.25% and last 2 versions and not ie 11 and not OperaMini all',
//                 node: 'current',
//             },
//         },
//     ],
// ];

// https://vitejs.dev/config/
export default defineConfig({
    // optimizeDeps: {
    //     exclude: ['@polkadot/util'],
    // },
    plugins: [
        vue(),
        // nodePolyfills(),
        // {
        //     name: 'my-transform',
        //     transform: async (code, id) => {
        //         if (id.endsWith('.ts')) {
        //             const transformed = await transformAsync(code, { presets });
        //             // if (id.match(/polka/))
        //             // console.log('From\n%s\nTo\n%s', code, transformed)
        //             console.log(id);
        //             return transformed;
        //         }
        //         // console.log('transforming %o', id)
        //         return code;
        //     },
        // },
    ],
    server: {
        proxy: {
            '/instruction': 'http://localhost:8080',
        },
    },
});
