import fs from 'fs/promises';
import path from 'path';

const INTERFACE_FILENAME = 'index';
const WASM_FILENAME = 'wasm_pack_output';
const PATH_TO_GENERIC_TYPES = path.resolve(__dirname, '../types.d.ts');
const BASE_DIST_DIR = path.resolve(__dirname, '..');

async function putInterfaces(dir: string, contentJs: string, contentDts: string): Promise<void> {
    await Promise.all([
        fs.writeFile(path.join(dir, `${INTERFACE_FILENAME}.js`), contentJs),
        fs.writeFile(path.join(dir, `${INTERFACE_FILENAME}.d.ts`), contentDts),
    ]);
}

async function readIrohaCryptoInterfaceEntriesFromSourceCode(): Promise<Set<string>> {
    const [, inner] = (await fs.readFile(PATH_TO_GENERIC_TYPES, { encoding: 'utf-8' })).match(
        /interface\s+IrohaCryptoInterface\s*\{(.+?)\}/ms,
    )!;

    return new Set(
        inner
            .trim()
            .split('\n')
            .map((x) => {
                const match = x.match(/(\w+):/);
                if (!match) throw new Error(`Unexpected line: ${x}`);
                return match[1];
            }),
    );
}

export async function build_interfaces() {
    const entries = await readIrohaCryptoInterfaceEntriesFromSourceCode();
    const runtimeImportsCommaJoined = [...entries].join(',');

    const contentJsEsm = [
        `import {${runtimeImportsCommaJoined}} from './${WASM_FILENAME}'`,
        `const crypto = {${runtimeImportsCommaJoined}}`,
        `export { crypto }`,
    ].join('\n');
    const contentJsEsmWithInit = [
        `import init, {${runtimeImportsCommaJoined}} from './${WASM_FILENAME}'`,
        `const crypto = {${runtimeImportsCommaJoined}}`,
        `export { init, crypto }`,
    ].join('\n');
    const contentJsNode = [
        `const {${runtimeImportsCommaJoined}} = require('./${WASM_FILENAME}')`,
        `module.exports.crypto = {${runtimeImportsCommaJoined}}`,
    ].join('\n');

    const entriesAsKeyValueTypeOf = [...entries].map((x) => `${x}: typeof ${x};`).join('');
    const dtsCryptoDefinition = `declare const crypto: {${entriesAsKeyValueTypeOf}};`;
    const contentDts = [
        `import {${runtimeImportsCommaJoined}} from './${WASM_FILENAME}'`,
        dtsCryptoDefinition,
        `export { crypto }`,
    ].join('\n');
    const contentDtsWithInit = [
        `import init, {${runtimeImportsCommaJoined}} from './${WASM_FILENAME}'`,
        dtsCryptoDefinition,
        `export { crypto, init }`,
    ].join('\n');

    await Promise.all(
        (
            [
                ['bundler', contentJsEsm, contentDts],
                ['node', contentJsNode, contentDts],
                ['web', contentJsEsmWithInit, contentDtsWithInit],
            ] as [string, string, string][]
        ).map(([target, contentJs, contentDts]) =>
            putInterfaces(path.join(BASE_DIST_DIR, target), contentJs, contentDts),
        ),
    );
}
