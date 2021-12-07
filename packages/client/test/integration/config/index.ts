import client_config from './client_config.json';
import peer_config from './peer_config.json';
import peer_genesis from './peer_genesis.json';
import peer_trusted_peers from './peer_trusted_peers.json';

export { client_config, peer_config, peer_trusted_peers, peer_genesis };

const { BLOCK_TIME_MS, COMMIT_TIME_MS } = peer_config.SUMERAGI;

export const PIPELINE_MS = BLOCK_TIME_MS + COMMIT_TIME_MS;
