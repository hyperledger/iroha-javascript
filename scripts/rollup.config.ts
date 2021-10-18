import { defineConfig, RollupOptions } from 'rollup';
// import sucrase from '@rollup/plugin-sucrase';
// import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';

const ROOT = path.resolve(__dirname, '../');
const TS_DIST = path.resolve(ROOT, 'ts-dist');

function* optionsPackageCjsEsmDts({
    unscopedPackageName,
    external,
}: {
    unscopedPackageName: string;
    external?: RollupOptions['external'];
}): Iterable<RollupOptions> {
    const tsDistPkgSrcDir = path.resolve(TS_DIST, 'packages', unscopedPackageName, 'src');
    const inputJsFile = path.resolve(tsDistPkgSrcDir, 'lib.js');
    const inputDtsFile = path.resolve(tsDistPkgSrcDir, 'lib.d.ts');
    const outDir = path.resolve(ROOT, 'packages', unscopedPackageName, 'dist');

    yield {
        input: inputJsFile,
        external,
        plugins: [nodeResolve()],
        output: [
            {
                format: 'esm',
                file: path.resolve(outDir, 'lib.esm.js'),
            },
            {
                format: 'cjs',
                file: path.resolve(outDir, 'lib.cjs.js'),
            },
        ],
    };

    yield {
        input: inputDtsFile,
        external,
        plugins: [dts()],
        output: {
            format: 'esm',
            file: path.resolve(outDir, 'lib.d.ts'),
        },
    };
}

export default defineConfig([
    ...optionsPackageCjsEsmDts({
        unscopedPackageName: 'client',
        external: [/^@scale-codec/, /^@iroha2/, 'emittery', 'ws', 'axios'],
    }),
    ...optionsPackageCjsEsmDts({
        unscopedPackageName: 'data-model',
        external: [/^@scale-codec/, /^@iroha2/],
    }),
    ...optionsPackageCjsEsmDts({
        unscopedPackageName: 'i64-fixnum',
        external: [/^@scale-codec/],
    }),
]);
