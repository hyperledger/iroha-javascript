import { TMP_DIR, TMP_IROHA_BIN } from '../etc/meta'
import path from 'path'
import execa from 'execa'
import { $, fs } from 'zx'
import { rmForce, saveDataAsJSON, waitUntilPeerIsHealthy } from './util'
import readline from 'readline'
import Debug from 'debug'
import { KnownBinaries, install, resolveBinaryPath } from '@iroha2/dev-iroha-bins'
import makeDir from 'make-dir'

const debug = Debug('@iroha2/test-peer')

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
  kill: (params?: KillPeerParams) => Promise<void>

  /**
   * Check for alive status
   */
  isAlive: () => boolean
}

export interface IrohaConfiguration {
  genesis: unknown
  config: unknown
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
  })
  debug('Peer spawned. Spawnargs: %o', subprocess.spawnargs)
  const stdout = readline.createInterface(subprocess.stdout!)
  const stderr = readline.createInterface(subprocess.stderr!)

  const debugStdout = debug.extend('stdout')
  const debugStderr = debug.extend('stderr')
  stdout.on('line', (line) => debugStdout(line))
  stderr.on('line', (line) => debugStderr(line))

  subprocess.on('error', (err) => {
    debug('Subprocess error:', err)
  })

  const irohaIsHealthyPromise = waitUntilPeerIsHealthy(params.toriiApiURL, HEALTH_CHECK_INTERVAL, HEALTH_CHECK_TIMEOUT)
  const exitPromise = new Promise<void>((resolve) => {
    subprocess.once('exit', (...args) => {
      isAlive = false
      debug('Peer exited:', args)
      resolve()
    })
  })

  async function kill(params?: KillPeerParams) {
    if (!isAlive) throw new Error('Already dead')
    debug('Killing peer...')
    subprocess.kill('SIGTERM', { forceKillAfterTimeout: 500 })
    await exitPromise
    params?.cleanSideEffects && (await cleanSideEffects())
    debug('Peer is killed')
  }

  await new Promise<void>((resolve, reject) => {
    exitPromise.then(() => reject(new Error('Iroha has exited already, maybe something went wrong')))
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
  debug('setting configuration: %o', configs)

  const asKeyValue = Object.entries(configs)

  await Promise.all(
    asKeyValue.map(async ([configName, data]: [unknown, string]) => {
      await saveDataAsJSON(data, path.resolve(TMP_DIR, `${configName}.json`))
    }),
  )

  debug('configuration is set')
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
 *
 * (Remove `blocks` dir)
 */
export async function cleanSideEffects() {
  const rmTarget = path.resolve(TMP_DIR, 'blocks')
  await rmForce(rmTarget)
  debug('Blocks are cleaned')
}
