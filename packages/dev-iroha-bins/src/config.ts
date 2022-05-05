import { Config, KnownBinaries } from './types'

const config: Config = {
  // should be slmilar with the ref from packages/data-model-rust-samples
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // v2.0.0-pre-rc.4 (dev)
    revision: '322afe8f07eff0aefe11490ce4e9daf3e095737c',
  },
  binaries: {
    [KnownBinaries.Kagami]: 'kagami',
    [KnownBinaries.Iroha]: 'iroha',
  },
}

export default config
