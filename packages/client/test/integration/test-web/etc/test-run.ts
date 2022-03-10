import consola from 'consola';
import { $ } from 'zx';
import { preview } from 'vite';
import { run } from '@iroha2/test-peer/src/api/server';
import { PORT_PEER_SERVER } from './meta';

async function main() {
    consola.info('Starting peer server & vite preview server');
    await Promise.all([run(PORT_PEER_SERVER), preview({})]);

    consola.info('Running Cypress');
    await $`pnpm cypress run`;

    consola.success('Tests are passed!');
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
