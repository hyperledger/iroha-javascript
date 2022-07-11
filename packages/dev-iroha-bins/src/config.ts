import { Config, KnownBinaries } from './types'

const config: Config = {
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // ! IMPORTANT ! should be similar with the ref at packages/data-model-rust-samples
    // v2.0.0-pre-rc.6
    revision: '75da907f66d5270f407a50e06bc76cec41d3d409',
  },
  binaries: {
    [KnownBinaries.Kagami]: 'kagami',
    [KnownBinaries.Iroha]: 'iroha',
  },
}

export default config
