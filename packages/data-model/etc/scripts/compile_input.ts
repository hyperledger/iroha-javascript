import path from 'path';
import execa from 'execa';
import consola from 'consola';
import chalk from 'chalk';
import fs from 'fs';
import { KnownBinaries, resolveBinaryPath, install } from '@iroha2/dev-iroha-bins';
import { COMPILED_SCHEMA_INPUT_FILE } from '../meta';

export default async function compile_input() {
    consola.info('Installing binary');
    await install(KnownBinaries.Introspect);

    consola.info('Compiling schema');
    const stream = fs.createWriteStream(COMPILED_SCHEMA_INPUT_FILE, { encoding: 'utf-8' });
    try {
        const sub = execa(await resolveBinaryPath(KnownBinaries.Introspect));
        sub.stdout!.pipe(stream);
        await sub;
    } finally {
        stream.close();
    }

    consola.success(
        chalk`Output is written into {blue.bold ${path.relative(process.cwd(), COMPILED_SCHEMA_INPUT_FILE)}}`,
    );
}
