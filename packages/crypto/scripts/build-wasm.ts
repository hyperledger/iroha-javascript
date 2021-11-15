import consola from 'consola';
import del from 'del';
import makeDir from 'make-dir';
import { $, cd, path } from 'zx';

const CRATE_ROOT_DIR = path.resolve(__dirname, '../crypto-rs/iroha_crypto_wasm');
const BUILD_TMP_DIR = path.resolve(CRATE_ROOT_DIR, '.tmp-pkg');
const BUILD_OUT_NAME = 'wasm_pack_output';

function computeDistForTarget(targetName: string): string {
    return path.resolve(__dirname, `../packages/target-${targetName}`);
}

function necessaryArtifacts(outName: string): string[] {
    return [`${outName}_bg*`, `${outName}.*`];
}

export async function build_wasm() {
    interface BuildConfig {
        target: string;
        distDir: string;
    }

    const configs: BuildConfig[] = [
        { target: 'web', distDir: computeDistForTarget('web') },
        { target: 'nodejs', distDir: computeDistForTarget('node') },
        { target: 'bundler', distDir: computeDistForTarget('bundler') },
    ];

    for (const config of configs) {
        consola.info('Building', config.target);

        cd(CRATE_ROOT_DIR);
        await $`wasm-pack build \
            --target ${config.target}
            --out-dir ${BUILD_TMP_DIR}
            --out-name ${BUILD_OUT_NAME}
        `;

        const dist = config.distDir;
        await makeDir(dist);
        await del([path.join(dist, '*')]);

        cd(BUILD_TMP_DIR);
        await $`cp ${necessaryArtifacts(BUILD_OUT_NAME)} ${dist}`;
    }

    consola.success('Done!');
}
