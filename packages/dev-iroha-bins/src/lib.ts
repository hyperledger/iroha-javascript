import path from 'path';
import makeDir from 'make-dir';
import del from 'del';
import fs from 'fs/promises';
import { $ } from 'zx';
import consola from 'consola';

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
    git: {
        repo: string;
        branch?: string;
        revision?: string;
    };
    binaryNameMap: BinaryNameMap;
}

const TMP_DIR = path.resolve(__dirname, '../tmp');
const resolveTmp = (...paths: string[]) => path.resolve(TMP_DIR, ...paths);
const TMP_CARGO_ROOT = resolveTmp('cargo');
const TMP_BINARIES_MAP_JSON = resolveTmp('bins.json');

async function readSavedBinariesMap(): Promise<BinaryNameMap> {
    const contents = await fs.readFile(TMP_BINARIES_MAP_JSON, { encoding: 'utf-8' });
    const parsed: BinaryNameMap = JSON.parse(contents);
    return parsed;
}

async function initTmpDir() {
    await makeDir(TMP_DIR);
}

async function determineInstallTargets(allTargets: BinaryNameMap, skipInstalled = false): Promise<string[]> {
    let savedBins: string[] = [];
    try {
        const saved = await readSavedBinariesMap();
        savedBins = Object.keys(saved);
    } catch {}

    const requestedBinaries = Object.values(allTargets);

    return skipInstalled ? requestedBinaries.filter((x) => !savedBins.includes(x)) : requestedBinaries;
}

/**
 * Installs all known binaries (from {@link KnownBinaries})
 */
export async function installBinaries(
    config: InstallConfig,
    opts?: {
        skipInstalled?: boolean;
    },
): Promise<void> {
    await initTmpDir();

    const binsArgs = await determineInstallTargets(config.binaryNameMap, opts?.skipInstalled);

    if (!binsArgs.length) {
        consola.info('Skipping installation');
        return;
    }

    const gitRepo = config.git.repo;

    const args = [
        '--root',
        TMP_CARGO_ROOT,
        '--git',
        gitRepo,
        ...(config.git.branch ? ['--branch', config.git.branch] : []),
        ...(config.git.revision ? ['--rev', config.git.revision] : []),
        ...binsArgs,
    ];

    await $`cargo install ${args}`;

    await fs.writeFile(TMP_BINARIES_MAP_JSON, JSON.stringify(config.binaryNameMap));
}

/**
 * Removes all temporary files
 */
export async function clean() {
    await del(TMP_DIR);
}

export async function resolveBinaryPath(bin: KnownBinaries): Promise<string> {
    const saved = await readSavedBinariesMap();
    return path.resolve(TMP_CARGO_ROOT, 'bin', saved[bin]);
}
