import del from 'del';
import { $ } from 'zx';
import { parallel, series } from 'gulp';
import { runApiExtractor } from './etc/scripts/api-extractor';
import { bundle } from './etc/scripts/bundle';
import { PUBLIC_PACKAGES, scopePackage } from './etc/meta';

export async function clean() {
    await del(['**/dist', '**/dist-tsc']);
}

async function buildTS() {
    await $`pnpm build:tsc`;
}

async function buildClientIsomorphicTransports() {
    await $`pnpm build:isomorphic-ws-and-fetch`;
}

export async function publishAll() {
    for (const name of PUBLIC_PACKAGES) {
        await $`pnpm publish --filter ${scopePackage(name)} --no-git-checks`;
    }
}

export { runApiExtractor, bundle };

export const runApiExtractorLocal = () => runApiExtractor(true);

export const build = series(clean, parallel(buildTS, buildClientIsomorphicTransports), () => runApiExtractor(), bundle);
