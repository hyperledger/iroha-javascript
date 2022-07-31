import { Client } from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/node'

import nodeFetch from 'node-fetch'
// another alternative
import { fetch as fetchUndici } from 'undici'

const client = new Client({
  torii: {
    apiURL: 'http://127.0.0.1:8080',
  },
  ws: WS,
  // type assertion is acceptable here
  // you can pass `fetchUndici` here as well
  fetch: nodeFetch as typeof fetch,
})
