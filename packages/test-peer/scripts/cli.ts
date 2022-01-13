import { cac } from 'cac';
import consola from 'consola';
import { cleanConfiguration, cleanSideEffects, startPeer } from '../src/lib';
import { $ } from 'zx';
import path from 'path';
import { TMP_DIR } from '../const';

const cli = cac();

cli.command('clean:configs').action(async () => {
    await cleanConfiguration();
});

cli.command('clean:effects').action(async () => {
    await cleanSideEffects();
});

cli.command('start').action(async () => {
    consola.info('Starting peer');
    await startPeer();
    consola.info('Started! Kill this process to kill the peer');
});

cli.command('config:copy-from-client-e2e-tests').action(async () => {
    async function copyOne(name: string) {
        const from = path.resolve(__dirname, '../../client/test/integration/config', `peer_${name}.json`);
        const to = path.resolve(__dirname, '../', TMP_DIR, `${name}.json`);
        await $`cp ${from} ${to}`;
    }

    await Promise.all(['config', 'genesis', 'trusted_peers'].map(copyOne));
});

cli.help();

async function main() {
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
