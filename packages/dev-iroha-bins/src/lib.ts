export { KnownBinaries } from './types';

import path from 'path';
import makeDir from 'make-dir';
import del from 'del';
import { $ } from 'zx';
import consola from 'consola';
import { KnownBinaries, Config } from './types';
import config from './config';

const TMP_DIR = path.resolve(__dirname, '../tmp');
const TMP_CARGO_ROOT = path.resolve(TMP_DIR, 'cargo');

async function prepareTmpDir() {
    await makeDir(TMP_DIR);
}

function cargoInstallArgs(config: Pick<Config, 'git'>, binaryName: string): string[] {
    return [
        '--root',
        TMP_CARGO_ROOT,
        '--git',
        config.git.repo,
        ...(config.git.branch ? ['--branch', config.git.branch] : []),
        ...(config.git.revision ? ['--rev', config.git.revision] : []),
        binaryName,
    ];
}

export async function install(binary: KnownBinaries): Promise<void> {
    await prepareTmpDir();
    const actualBinary = config.binaryNameMap[binary];
    consola.info(`Installing binary with cargo: ${binary} (${actualBinary})`);
    await $`cargo install ${cargoInstallArgs(config, actualBinary)}`;
}

/**
 * Removes all temporary files
 */
export async function clean() {
    await del(TMP_DIR);
}

export async function resolveBinaryPath(binary: KnownBinaries): Promise<string> {
    const { binaryNameMap } = config;
    return path.resolve(TMP_CARGO_ROOT, 'bin', binaryNameMap[binary]);
}
