import del from 'del'
import { fs, path } from 'zx'
import { Torii } from '@iroha2/client'
import { BLOCK_STORE_PATH_RELATIVE, TMP_DIR, VALIDATOR_WASM_PATH_RELATIVE } from '../etc/meta'
import debug from './dbg'

export async function saveDataAsJSON(data: unknown, destination: string): Promise<void> {
  await fs.writeFile(destination, JSON.stringify(data, null, 2), { encoding: 'utf-8' })
}

export async function rmForce(target: string | string[]): Promise<string[]> {
  return del(target, { force: true })
}

export async function waitUntilPeerIsHealthy(
  apiURL: string,
  options: {
    checkInterval: number
    checkTimeout: number
    abort: AbortSignal
  },
): Promise<void> {
  const toriiPre = { apiURL, fetch }

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
    debug('not yet healthy: %o', health.content)

    await new Promise((r) => setTimeout(r, options.checkInterval))
  }
}

export interface CheckedConfig {
  KURA: { BLOCK_STORE_PATH: typeof BLOCK_STORE_PATH_RELATIVE }
}

export interface CheckedGenesis {
  validator: typeof VALIDATOR_WASM_PATH_RELATIVE
}

interface SetConfigurationCheckedParams<C extends CheckedConfig, G extends CheckedGenesis> {
  peerConfig: C
  peerGenesis: G
  validatorWasm: Buffer
}

export async function setConfigurationChecked<C extends CheckedConfig, G extends CheckedGenesis>(
  params: SetConfigurationCheckedParams<C, G>,
) {
  await fs.ensureDir(TMP_DIR)
  await Promise.all([
    saveDataAsJSON(params.peerConfig, path.join(TMP_DIR, 'config.json')),
    saveDataAsJSON(params.peerGenesis, path.join(TMP_DIR, 'genesis.json')),
    fs.writeFile(path.join(TMP_DIR, VALIDATOR_WASM_PATH_RELATIVE), params.validatorWasm),
  ])
  debug('configuration is set')
}
