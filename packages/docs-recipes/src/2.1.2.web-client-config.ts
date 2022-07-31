import { Client } from '@iroha2/client'
import WS from '@iroha2/client/web-socket/native'

const client = new Client({
  torii: {
    apiURL: 'http://127.0.0.1:8080',
  },
  ws: WS,
})
