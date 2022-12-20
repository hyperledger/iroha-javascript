import CONFIG from '../config.json'
import { clone, isAccessible, isCloneUpToDate, resolveBinaryPath, runCargoBuild } from './util'
import consola from 'consola'
import chalk from 'chalk'

export type Binary = 'iroha' | 'kagami'

export async function forceClone() {
  await clone(CONFIG)
}

/**
 * Resolves path to the release build of the binary.
 * If the repo is not cloned or is outdated, clones it.
 * If the binary is not yet built, builds it.
 *
 * In order to avoid extra time for resolution, use {@link buildBinary} fn.
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

  if (!(await isCloneUpToDate(CONFIG))) {
    if (skipUpdate) throw new Error('Repo is out of date, cannot resolve the binary')
    await clone(CONFIG)
  }

  const binaryPath = resolveBinaryPath(bin)

  if (!(await isAccessible(binaryPath))) {
    if (skipUpdate) throw new Error('The binary is not build')
    await runCargoBuild(bin)
  }

  return { path: binaryPath }
}

export async function buildBinary(bin: Binary): Promise<void> {
  if (!(await isCloneUpToDate(CONFIG))) await clone(CONFIG)
  const path = resolveBinaryPath(bin)
  if (!(await isAccessible(path))) await runCargoBuild(bin)
  consola.success(`${chalk.magenta.bold(bin)} is built`)
}
