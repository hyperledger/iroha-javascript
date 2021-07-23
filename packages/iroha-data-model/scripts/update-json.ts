import path from 'path';
import execa from 'execa';
import consola from 'consola';
import ora from 'ora';
import fs from 'fs';

const IROHA_REPO_URL = 'https://github.com/hyperledger/iroha.git';
const IROHA_REPO_BRANCH = 'iroha2-dev';
const IROHA_INTROSPECT_CRATE = 'iroha_schema_bin';

const OUTPUT_PATH = path.resolve(__dirname, '../input/input.json');
const IROHA_INSTALL_PATH = path.resolve(__dirname, '../.iroha');

async function main() {
    const spinner = ora('Installing introspect binary').start();

    await execa('cargo', [
        'install',
        '--git',
        IROHA_REPO_URL,
        '--branch',
        IROHA_REPO_BRANCH,
        '--root',
        IROHA_INSTALL_PATH,
        IROHA_INTROSPECT_CRATE,
    ]);

    spinner.stop().clear();
    consola.success('Introspect binary installed');

    spinner.start('Updating schema');

    const stream = fs.createWriteStream(OUTPUT_PATH, { encoding: 'utf-8' });
    const sub = execa(`./${IROHA_INTROSPECT_CRATE}`, [], {
        cwd: path.resolve(IROHA_INSTALL_PATH, 'bin'),
    });
    sub.stdout!.pipe(stream);
    await sub;
    stream.close();

    spinner.stop().clear();
    consola.success('Schema updated');
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
