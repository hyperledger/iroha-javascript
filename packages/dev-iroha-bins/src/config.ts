import { Config, KnownBinaries } from './types'

const config: Config = {
  // ! IMPORTANT ! should be similar with the ref at packages/data-model-rust-samples
  git: {
    repo: 'https://github.com/hyperledger/iroha.git',

    // v2.0.0-pre-rc.4
    revision: 'd00e0a9172d2a887a97f504796db5f2e05939c10',
  },
  binaries: {
    [KnownBinaries.Kagami]: 'kagami',
    [KnownBinaries.Iroha]: 'iroha',
  },
}

export default config
