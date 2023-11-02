import * as h3 from 'h3'
import { listen } from 'listhen'
import pinoHttp from 'pino-http'
import pino from 'pino'
import { P, match } from 'ts-pattern'

import * as lib from '../lib'

export async function run(port = 8765) {
  let peer: lib.StartPeerReturn | undefined

  const app = h3.createApp()

  const router = h3
    .createRouter()
    .post(
      '/prepare-configuration',
      h3.eventHandler(async (event) => {
        await lib.prepareConfiguration()

        h3.setResponseStatus(event, 204)
        await h3.send(event)
      }),
    )
    .post(
      '/clear/all',
      h3.eventHandler(async (event) => {
        await lib.clearAll()
        h3.setResponseStatus(event, 204)
        await h3.send(event)
      }),
    )
    .post(
      '/clear/peer-storage',
      h3.eventHandler(async (event) => {
        await lib.clearPeerStorage()
        h3.setResponseStatus(event, 204)
        await h3.send(event)
      }),
    )
    .post(
      '/peer/start',
      h3.eventHandler(async (event) => {
        if (peer) {
          h3.setResponseStatus(event, 400)
          return 'Kill first'
        }

        console.log(event.context)

        const parsed = match(h3.getQuery(event))
          .with(
            {
              genesis: P.select('genesisStr', P.union('false', 'true')),
            },
            ({ genesisStr }) => {
              return { withGenesis: genesisStr === 'true' }
            },
          )
          .otherwise(() => {
            throw new Error('Invalid params')
          })

        peer = await lib.startPeer(parsed)

        h3.setResponseStatus(event, 204)
        await h3.send(event)
      }),
    )
    .post(
      '/peer/kill',
      h3.eventHandler(async (event) => {
        if (!peer) {
          h3.setResponseStatus(event, 204)
          return 'Not alive'
        }

        await peer.kill()
        peer = undefined

        h3.setResponseStatus(event, 204)
        await h3.send(event)
      }),
    )
    .get(
      '/peer/is-alive',
      h3.eventHandler(async () => {
        return { isAlive: peer?.isAlive() ?? false }
      }),
    )

  app
    .use(h3.eventHandler(h3.fromNodeMiddleware(pinoHttp({ logger: pino({ transport: { target: 'pino-pretty' } }) }))))
    .use(router)

  await listen(h3.toNodeListener(app), { port })
}
