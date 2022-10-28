import { Config, KnownBinaries } from './types'

const config: Config = {
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // ! IMPORTANT ! should be similar with the ref at packages/data-model-rust-samples
    // v2.0.0-pre-rc.9
    revision: 'e3cd89bd2b6bef0d822900eb71a1854c7b86e2aa',
  },
  binaries: {
    [KnownBinaries.Kagami]: 'kagami',
    [KnownBinaries.Iroha]: 'iroha',
  },
}

export default config
