import { Config, KnownBinaries } from './types'

const config: Config = {
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // ! IMPORTANT ! should be similar with the ref at packages/data-model-rust-samples
    // v2.0.0-pre-rc.4
    revision: '916a2cc584ba110775eafeae69e9658157f704c9',
  },
  binaries: {
    [KnownBinaries.Kagami]: 'kagami',
    [KnownBinaries.Iroha]: 'iroha',
  },
}

export default config
