import { CLIENT_CLI_CONFIG } from '@iroha2/iroha-source/src/subentries/configs'
import { datamodel } from '@iroha2/data-model'

export const PEER_GENESIS = {
  transactions: [
    [
      {
        Register: {
          NewDomain: {
            id: 'wonderland',
            logo: null,
            metadata: {
              key: {
                String: 'value',
              },
            },
          },
        },
      },
      {
        Register: {
          NewAccount: {
            id: 'alice@wonderland',
            signatories: ['ed01207233BFC89DCBD68C19FDE6CE6158225298EC1131B6A130D1AEB454C1AB5183C0'],
            metadata: {
              key: {
                String: 'value',
              },
            },
          },
        },
      },
      {
        Register: {
          NewAccount: {
            id: 'bob@wonderland',
            signatories: ['ed01207233BFC89DCBD68C19FDE6CE6158225298EC1131B6A130D1AEB454C1AB5183C0'],
            metadata: {
              key: {
                String: 'value',
              },
            },
          },
        },
      },
      {
        Register: {
          NewAssetDefinition: {
            id: 'rose#wonderland',
            value_type: 'Quantity',
            mintable: 'Infinitely',
            logo: null,
            metadata: {},
          },
        },
      },
      {
        Register: {
          NewDomain: {
            id: 'garden_of_live_flowers',
            logo: null,
            metadata: {},
          },
        },
      },
      {
        Register: {
          NewAccount: {
            id: 'carpenter@garden_of_live_flowers',
            signatories: ['ed01207233BFC89DCBD68C19FDE6CE6158225298EC1131B6A130D1AEB454C1AB5183C0'],
            metadata: {},
          },
        },
      },
      {
        Register: {
          NewAssetDefinition: {
            id: 'cabbage#garden_of_live_flowers',
            value_type: 'Quantity',
            mintable: 'Infinitely',
            logo: null,
            metadata: {},
          },
        },
      },
      {
        Mint: {
          object: '13_u32',
          destination_id: {
            AssetId: 'rose##alice@wonderland',
          },
        },
      },
      {
        Mint: {
          object: '44_u32',
          destination_id: {
            AssetId: 'cabbage#garden_of_live_flowers#alice@wonderland',
          },
        },
      },
      {
        Grant: {
          object: {
            PermissionToken: {
              definition_id: 'CanSetParameters',
              payload: null,
            },
          },
          destination_id: {
            AccountId: 'alice@wonderland',
          },
        },
      },
      {
        Register: {
          NewRole: {
            id: 'ALICE_METADATA_ACCESS',
            permissions: [
              {
                definition_id: 'CanRemoveKeyValueInUserAccount',
                payload: {
                  account_id: 'alice@wonderland',
                },
              },
              {
                definition_id: 'CanSetKeyValueInUserAccount',
                payload: {
                  account_id: 'alice@wonderland',
                },
              },
            ],
          },
        },
      },
    ],
  ],
  executor: './executor.wasm',
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
    BLOCK_TIME_MS: 0,
    COMMIT_TIME_LIMIT_MS: 0,
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
  TORII: { API_URL: TORII_API_ADDRESS },
  SUMERAGI: { BLOCK_TIME_MS, COMMIT_TIME_LIMIT_MS },
} = PEER_CONFIG

export const CLIENT_CONFIG = {
  torii: {
    apiURL: 'http://' + TORII_API_ADDRESS,
  },
  accountId: parseAccountId(CLIENT_CLI_CONFIG.ACCOUNT_ID),
  keyPair: {
    public_key: CLIENT_CLI_CONFIG.PUBLIC_KEY,
    private_key: CLIENT_CLI_CONFIG.PRIVATE_KEY,
  },
}

// https://github.com/hyperledger/iroha/blob/b7e5bf0925951df066de31d486165c66a3d65cee/config/src/sumeragi.rs#L106-L112
export const PIPELINE_MS = BLOCK_TIME_MS + COMMIT_TIME_LIMIT_MS
