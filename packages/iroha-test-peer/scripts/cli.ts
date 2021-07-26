import { cac } from 'cac';
import consola from 'consola';
import { clearConfiguration, clearSideEffects, startPeer } from '../src/lib';
import execa from 'execa';
import path from 'path';

const cli = cac();

cli.command('clear:configs').action(async () => {
    await clearConfiguration();
});

cli.command('clear:effects').action(async () => {
    await clearSideEffects();
});

cli.command('start').action(async () => {
    consola.info('Starting peer');
    const { kill } = await startPeer();
    consola.info('Started!');

    await new Promise((r) => setTimeout(r, 2_000));

    consola.info('killing');
    await kill();
    consola.info('killed');
});

cli.command('config:copy-from-client-e2e-tests').action(async () => {
    async function copyOne(name: string) {
        const from = path.resolve(__dirname, '../../iroha-client/e2e/config', `peer_${name}.json`);
        const to = path.resolve(__dirname, '../.iroha-deploy', `${name}.json`);
        await execa('cp', [from, to]);
    }

    await Promise.all(['config', 'genesis', 'trusted_peers'].map(copyOne));
});

cli.help();
cli.parse();
