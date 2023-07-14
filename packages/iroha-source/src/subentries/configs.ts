import CLIENT_CLI_CONFIG from '../../.iroha/configs/client/config.json'
import PEER_CONFIG from '../../.iroha/configs/peer/config.json'
import PEER_GENESIS from '../../.iroha/configs/peer/genesis.json'

export { CLIENT_CLI_CONFIG, PEER_GENESIS, PEER_CONFIG }

export type PeerConfig = typeof PEER_CONFIG

export type PeerGenesis = typeof PEER_GENESIS

export type ClientCliConfig = typeof CLIENT_CLI_CONFIG
