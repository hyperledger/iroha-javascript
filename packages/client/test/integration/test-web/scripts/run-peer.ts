import { startPeer, setConfiguration, cleanConfiguration, cleanSideEffects } from '@iroha2/test-peer';
import { peer_config, peer_trusted_peers, peer_genesis } from '../../config';

async function main() {
    await cleanSideEffects();
    await cleanConfiguration();
    await setConfiguration({
        config: peer_config,
        trusted_peers: peer_trusted_peers,
        genesis: peer_genesis,
    });

    await startPeer();
}

main();
