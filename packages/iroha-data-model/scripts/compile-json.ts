import path from 'path';
import execa from 'execa';
import consola from 'consola';
import fs from 'fs';

const IROHA_REPO_URL = 'https://github.com/hyperledger/iroha.git';
const IROHA_REPO_BRANCH = 'iroha2-dev';
const IROHA_INTROSPECT_CRATE = 'iroha_schema_bin';

const OUTPUT_PATH = path.resolve(__dirname, '../input/input.json');
const IROHA_INSTALL_PATH = path.resolve(__dirname, '../.iroha');

async function main() {
    consola.info('Installing introspect binary...');

    await execa(
        'cargo',
        [
            'install',
            '--git',
            IROHA_REPO_URL,
            '--branch',
            IROHA_REPO_BRANCH,
            '--root',
            IROHA_INSTALL_PATH,
            IROHA_INTROSPECT_CRATE,
        ],
        { stdio: 'inherit' },
    );
    consola.success('Introspect binary installed');

    consola.info('Generating schema...');
    const stream = fs.createWriteStream(OUTPUT_PATH, { encoding: 'utf-8' });
    try {
        const sub = execa(`./${IROHA_INTROSPECT_CRATE}`, [], {
            cwd: path.resolve(IROHA_INSTALL_PATH, 'bin'),
        });
        sub.stdout!.pipe(stream);
        await sub;
    } finally {
        stream.close();
    }

    consola.success('Schema updated');
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
