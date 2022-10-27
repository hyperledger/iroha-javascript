import { TMP_DIR, TMP_IROHA_BIN } from '../etc/meta'
import path from 'path'
import execa from 'execa'
import { $, fs } from 'zx'
import { rmForce, saveDataAsJSON, waitUntilPeerIsHealthy } from './util'
import readline from 'readline'
import debug from './dbg'
import { KnownBinaries, install, resolveBinaryPath } from '@iroha2/dev-iroha-bins'
import makeDir from 'make-dir'

/**
 * Time within to check if peer is up and running
 */
const HEALTH_CHECK_TIMEOUT = 500
const HEALTH_CHECK_INTERVAL = 50

// const MAGIC_PEER_READY_LOG_MESSAGE_REGEX = /Starting network actor/

export interface StartPeerParams {
  /**
   * Required to check started peer's
   */
  toriiApiURL: string

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

/**
 * Installs binary (if not installed) and copies it from `@iroha2/dev-iroha-bins`
 */
export async function preparePackage() {
  await install(KnownBinaries.Iroha)
  await rmForce(TMP_DIR)
  await makeDir(TMP_DIR)
  await $`cp ${await resolveBinaryPath(KnownBinaries.Iroha)} ${TMP_IROHA_BIN}`
  debug('package is prepared')
}

/**
 * Start network with single peer.
 */
export async function startPeer(params: StartPeerParams): Promise<StartPeerReturn> {
  // state
  let isAlive = true

  {
    const contents = await fs.readdir(TMP_DIR)
    debug('Dir contents BEFORE start: %o', contents)
  }

  // starting peer
  const withGenesis: boolean = params?.withGenesis ?? true
  const subprocess = execa(TMP_IROHA_BIN, withGenesis ? ['--submit-genesis'] : [], {
    cwd: TMP_DIR,
    env: {
      IROHA2_CONFIG_PATH: resolveTempJsonConfigFile('config'),
      IROHA2_GENESIS_PATH: resolveTempJsonConfigFile('genesis'),
      /**
       * Enable JSON logging into STDOUT
       *
       * https://github.com/hyperledger/iroha/issues/2894
       */
      // LOG_FILE_PATH: '"/dev/stderr"',
    },
    stdout: 'ignore',
  })
  debug('Peer spawned. Spawnargs: %o', subprocess.spawnargs)

  const stderr = readline.createInterface(subprocess.stderr!)

  const debugStderr = debug.extend('stderr')
  stderr.on('line', (line) => debugStderr(line))

  subprocess.on('error', (err) => {
    debug('Subprocess error:', err)
  })

  const healthCheckAbort = new AbortController()
  const irohaIsHealthyPromise = waitUntilPeerIsHealthy(params.toriiApiURL, {
    checkInterval: HEALTH_CHECK_INTERVAL,
    checkTimeout: HEALTH_CHECK_TIMEOUT,
    abort: healthCheckAbort.signal,
  })

  const exitPromise = new Promise<void>((resolve) => {
    subprocess.once('exit', (...args) => {
      isAlive = false
      debug('Peer exited:', args)
      resolve()
    })
  })

  async function kill() {
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

/**
 * Set config files
 */
export async function setConfiguration(configs: IrohaConfiguration): Promise<void> {
  for (const key of ['genesis', 'config'] as const) {
    const data = configs[key]
    const path = resolveTempJsonConfigFile(key)
    await saveDataAsJSON(data, path)
  }

  debug('configuration is set: %o', configs)
}

/**
 * Clean config files
 */
export async function cleanConfiguration(): Promise<void> {
  const rmTarget = path.resolve(TMP_DIR, '*.json')
  await rmForce(rmTarget)
  debug('configuration is cleaned')
}

/**
 * Clear all side-effects from last peer startup. Use it before each peer startup if you want to isolate states.
 */
export async function cleanSideEffects(kuraBlockStorePath: string) {
  const rmTarget = path.resolve(TMP_DIR, kuraBlockStorePath)
  await rmForce(rmTarget)
  debug('Blocks are cleaned at %o', kuraBlockStorePath)
}
