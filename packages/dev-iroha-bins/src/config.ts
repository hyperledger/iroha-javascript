import { Config, KnownBinaries } from './types'

const config: Config = {
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // v2.0.0-pre-rc.2
    revision: '920e4d12754b0f3bf08cbaa5221d91c27863fcdc',
  },
  binaries: {
    [KnownBinaries.Introspect]: 'iroha_schema_bin',
    [KnownBinaries.Cli]: 'iroha',
  },
}

export default config
