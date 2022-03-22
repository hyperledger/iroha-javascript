import fs from 'fs/promises'
import path from 'path'
import {
  QueryError,
  QueryResult,
  Result,
  VersionedQueryResult,
  Enum,
  Logger,
  VersionedSignedQueryRequest,
} from '@iroha2/data-model'
import { setConfiguration, startPeer, cleanSideEffects, cleanConfiguration } from '@iroha2/test-peer'
import { peer_config } from './test/integration/config'
import { fetch } from '@iroha2/client-isomorphic-fetch'

const GENESIS = {
  transactions: [
    {
      isi: [
        {
          Register: {
            object: {
              Raw: {
                Identifiable: {
                  Domain: {
                    id: {
                      name: 'wonderland',
                    },
                    accounts: {},
                    asset_definitions: {},
                    metadata: {},
                    logo: null,
                  },
                },
              },
            },
          },
        },
        {
          Register: {
            object: {
              Raw: {
                Identifiable: {
                  NewAccount: {
                    id: {
                      name: 'alice',
                      domain_id: {
                        name: 'wonderland',
                      },
                    },
                    signatories: ['ed01208ce13e0d8758088c02cb5b39240e67797eeca3294df193684f1eab77cbb13172'],
                    metadata: {},
                  },
                },
              },
            },
          },
        },
        {
          Register: {
            object: {
              Raw: {
                Identifiable: {
                  NewAccount: {
                    id: {
                      name: 'bob',
                      domain_id: {
                        name: 'wonderland',
                      },
                    },
                    signatories: ['ed0120f9f408ecbee5ab28e9b39d2c69605e31c1caf8c48aaf982af170e136d0114f08'],
                    metadata: {},
                  },
                },
              },
            },
          },
        },
      ],
    },
  ],
}

async function main() {
  new Logger().mount()

  await cleanConfiguration()
  await cleanSideEffects()
  await setConfiguration({
    config: peer_config,
    genesis: GENESIS,
  })
  const peer = await startPeer()

  try {
    for (const file of ['request_findAccountsByDomainID.dat', 'request_findDomainByID.dat']) {
      const data = await fs.readFile(path.resolve(__dirname, file))
      const response = await fetch('http://localhost:8080/query', {
        method: 'POST',
        body: data,
      })

      const bytes = new Uint8Array(await response.arrayBuffer())
      let result: Result<QueryResult, QueryError>

      if (response.status === 200) {
        result = Enum.variant('Ok', VersionedQueryResult.fromBuffer(bytes).as('V1'))
      } else {
        result = Enum.variant('Err', QueryError.fromBuffer(bytes))
      }

      console.log('%s\n  Input: %o\n  Output: %o', file, VersionedSignedQueryRequest.fromBuffer(data), result)
    }
  } finally {
    await peer.kill()
  }
}

main()
