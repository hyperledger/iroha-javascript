import fs from 'fs/promises'
import del from 'del'
import { Torii } from '@iroha2/client'
import nodeFetch from 'node-fetch'
import debug from './dbg'

export async function saveDataAsJSON(data: unknown, destination: string): Promise<void> {
  await fs.writeFile(destination, JSON.stringify(data), { encoding: 'utf-8' })
}

export async function rmForce(target: string | string[]): Promise<void> {
  await del(target, { force: true })
}

export async function waitUntilPeerIsHealthy(
  apiURL: string,
  checkInterval: number,
  checkTimeout: number,
): Promise<void> {
  const toriiPre = { apiURL, fetch: nodeFetch as typeof fetch }

  let now = Date.now()
  const endAt = now + checkTimeout

  while (true) {
    now = Date.now()
    if (now > endAt) throw new Error(`Peer is still not alive even after ${checkTimeout}ms`)

    const health = await Torii.getHealth(toriiPre)
    if (health.is('Ok')) return
    debug('not yet healthy')

    await new Promise((r) => setTimeout(r, checkInterval))
  }
}
