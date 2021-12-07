import path from 'path';
import { execa } from 'execa';
import consola from 'consola';
import chalk from 'chalk';
import fs from 'fs';
import { KnownBinaries, resolveBinaryPath } from '@iroha2/dev-iroha-bins';

const OUTPUT_PATH = path.resolve(__dirname, '../input/input.json');

async function run_schema_bin_and_update_json() {
    const stream = fs.createWriteStream(OUTPUT_PATH, { encoding: 'utf-8' });
    try {
        const sub = execa(await resolveBinaryPath(KnownBinaries.Introspect));
        sub.stdout!.pipe(stream);
        await sub;
    } finally {
        stream.close();
    }

    consola.success(chalk`Schema updated and written to {blue.bold ${path.relative(process.cwd(), OUTPUT_PATH)}}`);
}

export default run_schema_bin_and_update_json;
