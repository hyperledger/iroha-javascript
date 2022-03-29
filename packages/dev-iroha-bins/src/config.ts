import { Config, KnownBinaries } from './types'

const config: Config = {
  // should be slmilar with the ref from packages/data-model-rust-samples
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // v2.0.0-pre-rc.3
    revision: '85d881c566abb55a4756d0585b8b3669a15c4b3a',
  },
  binaries: {
    [KnownBinaries.Introspect]: 'iroha_schema_bin',
    [KnownBinaries.Cli]: 'iroha',
  },
}

export default config
