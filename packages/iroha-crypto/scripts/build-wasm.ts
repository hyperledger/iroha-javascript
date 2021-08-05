import consola from 'consola';
import execa from 'execa';
import path from 'path';
import del from 'del';
import makeDir from 'make-dir';

const CRATE_ROOT_DIR = path.resolve(__dirname, '../rust/iroha_crypto_wasm');
const BUILD_OUTPUT_DIR = path.resolve(CRATE_ROOT_DIR, '.tmp-pkg');
const BUILD_OUT_NAME = 'iroha_crypto';

const WASM_DIST = path.resolve(__dirname, '../wasm');

function necessaryArtifacts(outName: string): string[] {
    return [`${outName}_bg.wasm`, `${outName}_bg.wasm.d.ts`, `${outName}.d.ts`, `${outName}.js`];
}

async function main() {
    consola.info('Generating WASM');

    await execa(
        'wasm-pack',
        ['build', '--target', 'web', '--out-dir', BUILD_OUTPUT_DIR, '--out-name', BUILD_OUT_NAME],
        {
            stdio: 'inherit',
            cwd: CRATE_ROOT_DIR,
        },
    );

    consola.info('Clearing old dist');
    await del(WASM_DIST);
    await makeDir(WASM_DIST);

    consola.info('Copying artifacts to new dist');
    await execa('cp', [...necessaryArtifacts(BUILD_OUT_NAME), WASM_DIST], {
        cwd: BUILD_OUTPUT_DIR,
    });

    consola.success('Done!');
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
