import { Config, KnownBinaries } from './types'

const config: Config = {
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // ! IMPORTANT ! should be similar with the ref at packages/data-model-rust-samples
    // v2.0.0-pre-rc.9
    revision: '6d9912d89f515acfc7de02ae55ec0b5ae7da73ab',
  },
  binaries: {
    [KnownBinaries.Kagami]: 'kagami',
    [KnownBinaries.Iroha]: 'iroha',
  },
}

export default config
