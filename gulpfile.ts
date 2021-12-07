import del from 'del';
import { series } from 'gulp';
import { $ } from 'zx';
import { installBinaries, KnownBinaries } from '@iroha2/dev-iroha-bins';
import { preparePackage } from '@iroha2/test-peer';
import { runApiExtractor } from './scripts/api-extractor';

export async function clean() {
    await del(['**/dist', '**/dist-tsc']);
}

async function buildTS() {
    await $`pnpm build:tsc`;
}

async function rollup() {
    await $`pnpx rollup -c`;
}

export async function publishAll() {
    const pkgs = [
        `data-model`,
        'crypto-core',
        'crypto-target-web',
        'crypto-target-node',
        'crypto-target-bundler',
        'client',
        'i64-fixnum',
    ];

    for (const unscopedName of pkgs) {
        const scopedName = `@iroha2/${unscopedName}`;
        await $`pnpm publish --filter ${scopedName} --no-git-checks`;
    }
}

async function prepareIrohaBinaries() {
    await installBinaries({
        gitRepo: 'https://github.com/hyperledger/iroha.git',
        gitBranch: '2.0.0-pre.1.rc.1',
        binaryNameMap: {
            [KnownBinaries.Introspect]: 'iroha_schema_bin',
            [KnownBinaries.Cli]: 'iroha',
        },
    });
}

async function prepareTestPeer() {
    await preparePackage();
}

export const prepare = series(prepareIrohaBinaries, prepareTestPeer);

export { runApiExtractor };

export const runApiExtractorLocal = () => runApiExtractor(true);

export const build = series(clean, buildTS, () => runApiExtractor(), rollup);
