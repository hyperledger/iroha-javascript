import { Config, KnownBinaries } from './types'

const config: Config = {
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // ! IMPORTANT ! should be similar with the ref at packages/data-model-rust-samples
    // v2.0.0-pre-rc.6
    revision: '2c897f23f95e04d2a61077729b1ffef847acc199',
  },
  binaries: {
    [KnownBinaries.Kagami]: 'kagami',
    [KnownBinaries.Iroha]: 'iroha',
  },
}

export default config
