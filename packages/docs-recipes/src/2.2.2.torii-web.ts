import { Torii } from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/native'

const torii = new Torii({
  apiURL: 'http://127.0.0.1:8080',
  telemetryURL: 'http://127.0.0.1:8081',
  ws: WS,
  // passing globally available `fetch`
  fetch,
})
