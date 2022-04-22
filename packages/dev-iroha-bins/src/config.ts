import { Config, KnownBinaries } from './types'

const config: Config = {
  // should be slmilar with the ref from packages/data-model-rust-samples
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // v2.0.0-pre-rc.4 (dev)
    revision: '9ac0528f3444a14ac84b4679541739734426aa6d',
  },
  binaries: {
    [KnownBinaries.Introspect]: 'iroha_schema_bin',
    [KnownBinaries.Cli]: 'iroha',
  },
}

export default config
