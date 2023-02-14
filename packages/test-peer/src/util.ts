import fs from 'fs/promises'
import del from 'del'
import { Torii } from '@iroha2/client'
import nodeFetch from 'node-fetch'
import debug from './dbg'

export async function saveDataAsJSON(data: unknown, destination: string): Promise<void> {
  await fs.writeFile(destination, JSON.stringify(data, null, 2), { encoding: 'utf-8' })
}

export async function rmForce(target: string | string[]): Promise<void> {
  await del(target, { force: true })
}

export async function waitUntilPeerIsHealthy(
  apiURL: string,
  options: {
    checkInterval: number
    checkTimeout: number
    abort: AbortSignal
  },
): Promise<void> {
  const toriiPre = { apiURL, fetch: nodeFetch as typeof fetch }

  let now = Date.now()
  const endAt = now + options.checkTimeout

  let aborted = false
  options.abort.addEventListener('abort', () => {
    aborted = true
  })

  while (true) {
    if (aborted) throw new Error('Aborted')

    now = Date.now()
    if (now > endAt) throw new Error(`Peer is still not alive even after ${options.checkTimeout}ms`)

    const health = await Torii.getHealth(toriiPre)
    if (health.tag === 'Ok') return
    debug('not yet healthy')

    await new Promise((r) => setTimeout(r, options.checkInterval))
  }
}
