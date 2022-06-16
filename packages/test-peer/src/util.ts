import fs from 'fs/promises'
import del from 'del'
import { Client } from '@iroha2/client'

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
  const client = new Client({ torii: { apiURL } })

  let now = performance.now()
  const endAt = now + checkTimeout

  while (true) {
    now = performance.now()
    if (now > endAt) throw new Error(`Peer is still not alive even after ${checkTimeout}ms`)

    const health = await client.getHealth()
    if (health.is('Ok')) return

    await new Promise((r) => setTimeout(r, checkInterval))
  }
}
