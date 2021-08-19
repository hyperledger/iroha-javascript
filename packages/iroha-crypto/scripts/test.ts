import consola from 'consola';
import execa from 'execa';

async function main() {
    consola.info('Testing in node');
    await execa('pnpm', ['test', '--filter', '@iroha2/crypto-test-node'], { stdio: 'inherit' });

    consola.info('Testing in web');
    await execa('pnpm', ['test', '--filter', '@iroha2/crypto-test-web'], { stdio: 'inherit' });

    consola.success('Done!');
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
