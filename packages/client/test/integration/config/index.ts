import client_config from './client_config.json';
import peer_config from './peer_config.json';
import peer_genesis from './peer_genesis.json';

export { client_config, peer_config, peer_genesis };

const { BLOCK_TIME_MS, COMMIT_TIME_MS } = peer_config.SUMERAGI;

export const PIPELINE_MS = BLOCK_TIME_MS + COMMIT_TIME_MS;
