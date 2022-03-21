import consola from 'consola';
import { run } from '@iroha2/test-peer/src/api/server';
import { PORT_PEER_SERVER } from './meta';

async function main() {
    await run(PORT_PEER_SERVER);
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
