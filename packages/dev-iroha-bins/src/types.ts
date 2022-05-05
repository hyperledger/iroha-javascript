export enum KnownBinaries {
  /**
   * Kagami (teacher)
   */
  Kagami = 'kagami',
  /**
   * Main Iroha CLI binary - runs peer
   */
  Iroha = 'cli',
}

export type BinaryNameMap = { [K in KnownBinaries]: string }

export interface Config {
  git: {
    repo: string
    branch?: string
    revision?: string
  }
  binaries: BinaryNameMap
}
