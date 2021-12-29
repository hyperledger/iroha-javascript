import { defineConfig, RollupOptions } from 'rollup';
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';

function resolvePackageInfile(unscopedName: string): string {
    return path.resolve(__dirname, `../packages/${unscopedName}/dist-tsc/lib.js`);
}

function resolvePackageOutfile(unscopedName: string, format: 'esm' | 'cjs'): string {
    return path.resolve(__dirname, `../packages/${unscopedName}/dist/lib.${format}.js`);
}

function* optionsForPackage({
    unscopedPackageName,
    external,
}: {
    unscopedPackageName: string;
    external?: RollupOptions['external'];
}): Iterable<RollupOptions> {
    yield {
        input: resolvePackageInfile(unscopedPackageName),
        external,
        plugins: [nodeResolve()],
        output: [
            {
                format: 'esm',
                file: resolvePackageOutfile(unscopedPackageName, 'esm'),
                sourcemap: true,
            },
            {
                format: 'cjs',
                file: resolvePackageOutfile(unscopedPackageName, 'cjs'),
                sourcemap: true,
            },
        ],
    };
}

export default defineConfig([
    ...optionsForPackage({
        unscopedPackageName: 'client',
        external: [/^@scale-codec/, /^@iroha2/, 'emittery', 'debug'],
    }),
    ...optionsForPackage({
        unscopedPackageName: 'data-model',
        external: [/^@scale-codec/, /^@iroha2/],
    }),
    ...optionsForPackage({
        unscopedPackageName: 'i64-fixnum',
        external: [/^@scale-codec/],
    }),
]);
