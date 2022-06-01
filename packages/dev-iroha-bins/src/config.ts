import { Config, KnownBinaries } from './types'

const config: Config = {
  // ! IMPORTANT ! should be similar with the ref at packages/data-model-rust-samples
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // v2.0.0-pre-rc.5
    revision: '2ba9c8f73dabb5eda27a2a8dc66e44b7382e0405',
  },
  binaries: {
    [KnownBinaries.Kagami]: 'kagami',
    [KnownBinaries.Iroha]: 'iroha',
  },
}

export default config
