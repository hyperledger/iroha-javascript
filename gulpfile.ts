import del from 'del';
import { parallel, series } from 'gulp';
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

async function buildClientIsomorphicTransports() {
    await $`pnpm build:isomorphic-ws-and-fetch`;
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
        'client-isomorphic-fetch',
        'client-isomorphic-ws',
        'i64-fixnum',
    ];

    for (const unscopedName of pkgs) {
        const scopedName = `@iroha2/${unscopedName}`;
        await $`pnpm publish --filter ${scopedName} --no-git-checks`;
    }
}

async function prepareIrohaBinaries() {
    await installBinaries(
        {
            git: {
                repo: 'https://github.com/hyperledger/iroha.git',
                revision: 'f5a8aeb86fad79c35537bc1a9cec9da1f183eb8b',
                // branch: 'iroha2-dev',
                // branch: '2.0.0-pre.1.rc.1',
            },
            binaryNameMap: {
                [KnownBinaries.Introspect]: 'iroha_schema_bin',
                [KnownBinaries.Cli]: 'iroha',
            },
        },
        { skipInstalled: true },
    );
}

async function prepareTestPeer() {
    await preparePackage();
}

export const prepare = series(prepareIrohaBinaries, prepareTestPeer);

export { runApiExtractor };

export const runApiExtractorLocal = () => runApiExtractor(true);

export const build = series(clean, parallel(buildTS, buildClientIsomorphicTransports), () => runApiExtractor(), rollup);
