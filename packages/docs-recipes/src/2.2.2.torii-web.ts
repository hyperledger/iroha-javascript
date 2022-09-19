import { Torii } from '@iroha2/client'
import { adapter as WS } from '@iroha2/client/web-socket/native'

const torii = new Torii({
  apiURL: 'http://127.0.0.1:8080',
  telemetryURL: 'http://127.0.0.1:8081',
  ws: WS,
  fetch:
    // passing globally available `fetch`, but binding it to `window`
    // to avoid `TypeError: "'fetch' called on an
    //           object that does not implement interface Window."`
    fetch.bind(window),
})
