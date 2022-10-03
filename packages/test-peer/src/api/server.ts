import Koa from 'koa'
import Router from '@koa/router'
import Morgan from 'koa-morgan'
import BodyParser from 'koa-bodyparser'
import consola from 'consola'
import chalk from 'chalk'
import invariant from 'tiny-invariant'

import * as lib from '../lib'

export async function run(port = 8765) {
  const app = new Koa()
  const router = new Router()

  let peer: lib.StartPeerReturn | null = null

  router
    .post('/configuration', async (ctx) => {
      await lib.setConfiguration(ctx.request.body)
      ctx.status = 204
    })
    .delete('/configuration', async (ctx) => {
      await lib.cleanConfiguration()
      ctx.status = 204
    })
    .delete('/side-effects', async (ctx) => {
      const store = ctx.query.kura_block_store_path
      invariant(typeof store === 'string', `add 'kura_block_store_path' param`)

      await lib.cleanSideEffects(store)
      ctx.status = 204
    })
    .post('/peer/start', async (ctx) => {
      if (peer) {
        ctx.throw(400, 'Kill first')
      }

      const queryGenesis = ctx.query.genesis
      const withGenesis = queryGenesis === 'false' ? false : true

      const queryToriiApiURL = ctx.query.torii_api_url
      if (!(typeof queryToriiApiURL === 'string')) throw new Error(`add a single 'torii_api_url' query param`)

      peer = await lib.startPeer({ withGenesis, toriiApiURL: queryToriiApiURL })

      ctx.status = 204
    })
    .post('/peer/kill', async (ctx) => {
      if (!peer) {
        ctx.status = 204
        ctx.body = 'Not alive'
        return
      }

      await peer.kill()
      peer = null

      ctx.status = 204
    })
    .get('/peer/is-alive', async (ctx) => {
      ctx.body = peer?.isAlive() ?? false
    })

  app.on('error', (err, ctx) => {
    consola.error('Error occured: %o %o', err, ctx)
  })

  app
    // Pipeline
    .use(Morgan('dev'))
    .use(BodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

  await new Promise<void>((resolve) => {
    app.listen(port, () => {
      resolve()
      consola.info(chalk`Test peer server is listening on {blue ${port}}`)
    })
  })
}
