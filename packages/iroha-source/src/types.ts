export interface Configuration {
  /**
   * Origin git repo, e.g. `https://github.com/hyperledger/iroha.git`
   */
  origin: string
  /**
   * Revision to check-out on, e.g. `iroha2-lts` or `48e298dad4ccb7e526a9187c24554ca1804d1edc`
   */
  rev: string
}
