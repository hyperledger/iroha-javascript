import del from 'del';
import { series } from 'gulp';
import { $ } from 'zx';

export async function clean() {
    await del(['ts-dist', 'packages/*/dist']);
}

async function buildTS() {
    await $`tsc`;
}

async function rollup() {
    await $`pnpx rollup -c`;
}

export async function publishAll() {
    const pkgs = [`data-model`, 'crypto', 'client', 'i64-fixnum'];

    for (const unscopedName of pkgs) {
        const scopedName = `@iroha2/${unscopedName}`;
        await $`pnpm publish --filter ${scopedName} --no-git-checks`;
    }
}

export const build = series(clean, buildTS, rollup);
