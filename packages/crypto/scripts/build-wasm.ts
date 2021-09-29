import consola from 'consola';
import execa from 'execa';
import path from 'path';
import del from 'del';
import makeDir from 'make-dir';
import { main } from '@iroha2/cli-tools';

const CRATE_ROOT_DIR = path.resolve(__dirname, '../rust/iroha_crypto_wasm');
const BUILD_TMP_DIR = path.resolve(CRATE_ROOT_DIR, '.tmp-pkg');
const BUILD_OUT_NAME = 'wasm_pack_output';
const DIST = path.resolve(__dirname, '..');

function necessaryArtifacts(outName: string): string[] {
    return [`${outName}_bg*`, `${outName}.*`];
}

main(async () => {
    interface BuildConfig {
        target: string;
        distDir: string;
    }

    const configs: BuildConfig[] = [
        { target: 'web', distDir: 'web' },
        { target: 'nodejs', distDir: 'node' },
        { target: 'bundler', distDir: 'bundler' },
    ];

    await makeDir(DIST);

    for (const config of configs) {
        consola.info('Building', config.target);

        await execa(
            'wasm-pack',
            ['build', '--target', config.target, '--out-dir', BUILD_TMP_DIR, '--out-name', BUILD_OUT_NAME],
            {
                stdio: 'inherit',
                cwd: CRATE_ROOT_DIR,
            },
        );

        const dist = path.join(DIST, config.distDir);
        await makeDir(dist);
        await del([path.join(dist, '*')]);
        await execa('cp', [...necessaryArtifacts(BUILD_OUT_NAME), dist], {
            cwd: BUILD_TMP_DIR,
            shell: true,
        });
    }

    consola.success('Done!');
});
