import config from './config-resolved'
import {
  assertConfigurationIsGitClone,
  clone,
  isAccessible,
  isCloneUpToDate,
  resolveBinaryPath,
  runCargoBuild,
  syncIrohaSymlink,
} from './util'
import consola from 'consola'
import chalk from 'chalk'

export type Binary = 'iroha' | 'kagami'

export async function forceClone() {
  assertConfigurationIsGitClone(config)
  await clone(config)
}

/**
 * Resolves path to the release build of the binary.
 *
 * If configuration is "git-clone" and the repo is not cloned or outdated,
 * it is re-created. If the binary is not yet built, builds it. These updates could be disabled with the flag.
 */
export async function resolveBinary(
  bin: Binary,
  options?: {
    /**
     * If the repo is not up-to-date or the binary is not built, then an error will be thrown.
     * @default false
     */
    skipUpdate?: boolean
  },
): Promise<{ path: string }> {
  const skipUpdate = options?.skipUpdate ?? false

  if (config.t === 'git-clone') {
    if (!(await isCloneUpToDate(config))) {
      if (skipUpdate) throw new Error('Repo is out of date, cannot resolve the binary')
      await clone(config)
    }
  }

  await syncIrohaSymlink(config)

  const binaryPath = resolveBinaryPath(config, bin)

  if (!(await isAccessible(binaryPath))) {
    if (skipUpdate) throw new Error('The binary is not build')
    await runCargoBuild(bin)
  }

  return { path: binaryPath }
}

export async function buildBinary(bin: Binary, ignoreBuilt = false): Promise<void> {
  if (config.t === 'git-clone' && !(await isCloneUpToDate(config))) await clone(config)
  const path = resolveBinaryPath(config, bin)
  if (ignoreBuilt || !(await isAccessible(path))) await runCargoBuild(bin)
  consola.success(`${chalk.magenta.bold(bin)} is built`)
}
