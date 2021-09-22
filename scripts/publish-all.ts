import consola from 'consola';
import execa from 'execa';
import chalk from 'chalk';

async function main() {
    for (const packageName of ['@iroha2/data-model', '@iroha2/crypto', '@iroha2/client', '@iroha2/i64-fixnum']) {
        consola.info(chalk`Publishing {blue.bold ${packageName}}...`);

        await execa('pnpm', ['publish', '--filter', packageName, '--no-git-checks'], {
            stdio: 'inherit',
        });

        consola.success(chalk`Package {blue.bold ${packageName}} published`);
    }

    consola.success('All packages published');
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
