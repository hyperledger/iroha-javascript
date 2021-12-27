import path from 'path';
import makeDir from 'make-dir';
import del from 'del';
import fs from 'fs/promises';
import { $ } from 'zx';

export enum KnownBinaries {
    /**
     * Introspect binary, for schema generation
     */
    Introspect = 'introspect',
    /**
     * Main Iroha CLI binary - runs peer
     */
    Cli = 'cli',
}

export type BinaryNameMap = { [K in KnownBinaries]: string };

export interface InstallConfig {
    gitRepo: string;
    gitBranch: string;
    binaryNameMap: BinaryNameMap;
}

const TMP_DIR = path.resolve(__dirname, '../tmp');
const resolveTmp = (...paths: string[]) => path.resolve(TMP_DIR, ...paths);
const TMP_CARGO_ROOT = resolveTmp('cargo');
const TMP_BINARIES_MAP_JSON = resolveTmp('bins.json');

async function initTmpDir() {
    await makeDir(TMP_DIR);
}

/**
 * Installs all known binaries (from {@link KnownBinaries})
 */
export async function installBinaries(config: InstallConfig): Promise<void> {
    await initTmpDir();

    const binsArgs = Object.values(config.binaryNameMap);

    await $`cargo install \\
        --root ${TMP_CARGO_ROOT} \\
        --git ${config.gitRepo} \\
        --branch ${config.gitBranch} \\
        ${binsArgs}`;

    await fs.writeFile(TMP_BINARIES_MAP_JSON, JSON.stringify(config.binaryNameMap));
}

/**
 * Removes all temporary files
 */
export async function clean() {
    await del(TMP_DIR);
}

export async function resolveBinaryPath(bin: KnownBinaries): Promise<string> {
    const contents = await fs.readFile(TMP_BINARIES_MAP_JSON, { encoding: 'utf-8' });
    const parsed: BinaryNameMap = JSON.parse(contents);
    return path.resolve(TMP_CARGO_ROOT, 'bin', parsed[bin]);
}
