export interface BaseConfig {
  release?: boolean
}

export interface RawGitCloneConfiguration extends BaseConfig {
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
export interface RawPathConfiguration extends BaseConfig {
  /**
   * Local path to the iroha source repo
   */
  path: string
}

export type RawConfig = RawGitCloneConfiguration | RawPathConfiguration

export type ResolvedConfig = ResolvedConfigGitClone | ResolvedConfigPath

export interface ResolvedConfigPath extends BaseConfig {
  t: 'path'
  absolutePath: string
}

export interface ResolvedConfigGitClone extends RawGitCloneConfiguration {
  t: 'git-clone'
}
