import { CLIENT_CLI_CONFIG, PEER_GENESIS } from '@iroha2/iroha-source/src/subentries/configs'
import { datamodel } from '@iroha2/data-model'

export { PEER_GENESIS }

interface PrivateKey {
  digest_function: string
  payload: string
}

export const PEER_CONFIG = {
  PUBLIC_KEY: 'ed01201C61FAF8FE94E253B93114240394F79A607B7FA55F9E5A41EBEC74B88055768B',
  PRIVATE_KEY: {
    digest_function: 'ed25519',
    payload:
      '282ED9F3CF92811C3818DBC4AE594ED59DC1A2F78E4241E31924E101D6B1FB831C61FAF8FE94E253B93114240394F79A607B7FA55F9E5A41EBEC74B88055768B',
  },
  TORII: {
    API_URL: '127.0.0.1:8080',
    TELEMETRY_URL: '127.0.0.1:8081',
    P2P_ADDR: '127.0.0.1:1337',
  },
  GENESIS: {
    ACCOUNT_PUBLIC_KEY: 'ed01203F4E3E98571B55514EDC5CCF7E53CA7509D89B2868E62921180A6F57C2F4E255',
    ACCOUNT_PRIVATE_KEY: {
      digest_function: 'ed25519',
      payload:
        '038AE16B219DA35AA036335ED0A43C28A2CC737150112C78A7B8034B9D99C9023F4E3E98571B55514EDC5CCF7E53CA7509D89B2868E62921180A6F57C2F4E255',
    },
  },
  SUMERAGI: {
    BLOCK_TIME_MS: 100,
    COMMIT_TIME_LIMIT_MS: 200,
  },
  KURA: {
    BLOCK_STORE_PATH: './storage',
  },
}

const parseAccountId = (acc: string): datamodel.AccountId => {
  const [name, domain] = acc.split('@')
  return datamodel.AccountId({ name: name, domain_id: datamodel.DomainId({ name: domain }) })
}

const {
  TORII: { API_URL: TORII_API_URL, TELEMETRY_URL: TORII_TELEMETRY_URL },
  SUMERAGI: { BLOCK_TIME_MS, COMMIT_TIME_LIMIT_MS },
} = PEER_CONFIG

export const CLIENT_CONFIG = {
  torii: {
    apiURL: 'http://' + TORII_API_URL,
    telemetryURL: 'http://' + TORII_TELEMETRY_URL,
  },
  accountId: parseAccountId(CLIENT_CLI_CONFIG.ACCOUNT_ID),
  keyPair: {
    public_key: CLIENT_CLI_CONFIG.PUBLIC_KEY,
    private_key: CLIENT_CLI_CONFIG.PRIVATE_KEY,
  },
}

export const PIPELINE_MS = BLOCK_TIME_MS + COMMIT_TIME_LIMIT_MS
