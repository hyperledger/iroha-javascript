import { Config, KnownBinaries } from './types'

const config: Config = {
  // should be slmilar with the ref from packages/data-model-rust-samples
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // v2.0.0-pre-rc.3
    revision: '8d83a3eff33f29b49004a0a5efe643b10f0f256e',
  },
  binaries: {
    [KnownBinaries.Introspect]: 'iroha_schema_bin',
    [KnownBinaries.Cli]: 'iroha',
  },
}

export default config
