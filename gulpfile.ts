import del from 'del';
import { $ } from 'zx';
import { parallel, series } from 'gulp';
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

export { runApiExtractor };

export const runApiExtractorLocal = () => runApiExtractor(true);

export const build = series(clean, parallel(buildTS, buildClientIsomorphicTransports), () => runApiExtractor(), rollup);
