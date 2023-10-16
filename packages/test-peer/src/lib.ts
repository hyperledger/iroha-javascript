import { resolveBinary } from '@iroha2/iroha-source'
import { execa } from 'execa'
import makeDir from 'make-dir'
import path from 'path'
import readline from 'readline'
import invariant from 'tiny-invariant'
import { match } from 'ts-pattern'
import { fs } from 'zx'
import { BLOCK_STORE_PATH_RELATIVE, EXECUTOR_WASM_PATH_RELATIVE, TMP_DIR } from '../etc/meta'
import debug from './dbg'
import { rmForce, setConfigurationChecked, waitUntilPeerIsHealthy } from './util'
import EXECUTOR_WASM from '@iroha2/iroha-source/src/subentries/executor'
import { CLIENT_CONFIG, PEER_CONFIG, PEER_GENESIS } from '@iroha2/test-configuration'

/**
 * Time within to check if peer is up and running
 */
const HEALTH_CHECK_TIMEOUT = 1_000
const HEALTH_CHECK_INTERVAL = 40

export interface StartPeerParams {
  /**
   * @default true
   */
  withGenesis?: boolean
}

export interface KillPeerParams {
  /**
   * If set to `true`, then after killing all side effects will be cleared, e.g. saved blocks
   *
   * TODO remove not `blocks` dir, but dir, specified in kura config
   */
  cleanSideEffects?: boolean
}

export interface StartPeerReturn {
  /**
   * Kill peer's process
   */
  kill: () => Promise<void>

  /**
   * Check for alive status
   */
  isAlive: () => boolean
}

export interface IrohaConfiguration {
  genesis: unknown
  config: unknown
}

function resolveTempJsonConfigFile(key: keyof IrohaConfiguration): string {
  return path.resolve(TMP_DIR, `${key}.json`)
}

async function prepareTempDir(): Promise<void> {
  await makeDir(TMP_DIR)
}

async function reportTmpContents() {
  const contents = await fs.readdir(TMP_DIR)
  debug('Dir contents BEFORE start: %o', contents)
}

// eslint-disable-next-line no-undef
function readableToDebug(input: NodeJS.ReadableStream, prefix: string) {
  const dbg = debug.extend(prefix)
  readline.createInterface(input).on('line', (line) => dbg(line))
}

/**
 * Start network with a single peer.
 *
 * **Note:** Iroha binary must be pre-built.
 */
export async function startPeer(params?: StartPeerParams): Promise<StartPeerReturn> {
  const iroha = (await resolveBinary('iroha', { skipUpdate: true })).path

  await reportTmpContents()

  // state
  let isAlive = false

  // starting peer
  const withGenesis: boolean = params?.withGenesis ?? true
  const subprocess = execa(iroha, withGenesis ? ['--submit-genesis'] : [], {
    cwd: TMP_DIR,
    env: {
      IROHA2_CONFIG_PATH: resolveTempJsonConfigFile('config'),
      IROHA2_GENESIS_PATH: resolveTempJsonConfigFile('genesis'),
    },
  })

  invariant(subprocess.stdout && subprocess.stderr)
  readableToDebug(subprocess.stdout, 'subprocess-stdout')
  readableToDebug(subprocess.stderr, 'subprocess-stderr')

  subprocess.once('spawn', () => {
    isAlive = true
    debug('Subprocess spawned')
  })

  subprocess.on('error', (err) => {
    debug('Subprocess error:', err)
  })

  const healthCheckAbort = new AbortController()
  const irohaIsHealthyPromise = waitUntilPeerIsHealthy(CLIENT_CONFIG.torii.apiURL, {
    checkInterval: HEALTH_CHECK_INTERVAL,
    checkTimeout: HEALTH_CHECK_TIMEOUT,
    abort: healthCheckAbort.signal,
  })

  const exitPromise = new Promise<void>((resolve) => {
    subprocess.once('exit', (...args) => {
      debug('Peer exited:', args)
      isAlive = false
      resolve()
    })
  })

  const kill = async function () {
    if (!isAlive) throw new Error('Already dead')
    debug('Killing peer...')
    subprocess.kill('SIGTERM', { forceKillAfterTimeout: 500 })
    await exitPromise
    debug('Peer is killed')
  }

  await new Promise<void>((resolve, reject) => {
    exitPromise.then(() => {
      reject(new Error('Iroha has exited already, maybe something went wrong'))
      healthCheckAbort.abort()
    })
    irohaIsHealthyPromise.then(() => resolve()).catch((err) => reject(err))
  })

  return {
    kill,
    isAlive: () => isAlive,
  }
}

export async function prepareConfiguration() {
  await setConfigurationChecked({
    // parsing with type-level check
    peerGenesis: match(PEER_GENESIS)
      .with({ executor: EXECUTOR_WASM_PATH_RELATIVE }, (x) => x)
      .otherwise(() => {
        throw new Error('Invalid genesis')
      }),
    peerConfig: match(PEER_CONFIG)
      .with({ KURA: { BLOCK_STORE_PATH: BLOCK_STORE_PATH_RELATIVE } }, (x) => x)
      .otherwise(() => {
        throw new Error('Invalid peer config')
      }),

    executorWasm: EXECUTOR_WASM,
  })
}

/**
 * Clear working peer directory completely
 */
export async function clearAll(): Promise<void> {
  const deleted = await rmForce(path.join(TMP_DIR, '*'))
  debug('working dir is cleared: %o', deleted)
}

/**
 * Clear peer storage. Use it before each peer startup if you want to isolate states.
 */
export async function clearPeerStorage() {
  const rmTarget = path.resolve(TMP_DIR, BLOCK_STORE_PATH_RELATIVE)
  const deleted = await rmForce(rmTarget)
  debug('Blocks are cleaned: %o', deleted)
}
