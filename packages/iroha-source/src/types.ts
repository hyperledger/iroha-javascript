export interface GitCloneConfiguration {
  /**
   * Origin git repo, e.g. `https://github.com/hyperledger/iroha.git`
   */
  origin: string
  /**
   * Revision to check-out on, e.g. `iroha2-lts` or `48e298dad4ccb7e526a9187c24554ca1804d1edc`
   */
  rev: string
}

/**
 * If this configuration is used, Iroha will not be cloned, but used as-is
 * without any changes
 */
export interface PathConfiguration {
  /**
   * Local path to the iroha source repo
   */
  path: string
}

export type Configuration = GitCloneConfiguration | PathConfiguration

export type ConfigResolved = ConfigResolvedGitClone | ConfigResolvedPath

export interface ConfigResolvedPath {
  t: 'path'
  absolutePath: string
}

export interface ConfigResolvedGitClone extends GitCloneConfiguration {
  t: 'git-clone'
}
