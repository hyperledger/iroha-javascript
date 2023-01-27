import { Configuration } from './types'
import { CLONED_DIR, CLONED_DIR_META_FILE } from '../etc/meta'
import fs from 'fs/promises'
import del from 'del'
import consola from 'consola'
import chalk from 'chalk'
import makeDir from 'make-dir'
import execa from 'execa'
import path from 'path'

export async function clone(config: Configuration): Promise<void> {
  consola.info(
    `Cloning Git repo with origin ${chalk.green.bold(config.origin)} ` +
      `at revision ${chalk.magenta.bold(config.rev)} into ${chalk.blue.bold(CLONED_DIR)}`,
  )

  await del(CLONED_DIR, { force: true })
  await makeDir(CLONED_DIR)
  const EXECA_OPTS: execa.Options = { cwd: CLONED_DIR, stdio: 'inherit' }
  await execa('git', ['init'], EXECA_OPTS)
  await execa('git', ['remote', 'add', 'origin', config.origin], EXECA_OPTS)
  await execa('git', ['fetch', 'origin', config.rev], EXECA_OPTS)
  await execa('git', ['reset', '--hard', 'FETCH_HEAD'], EXECA_OPTS)

  const META_FILE_DIR = path.dirname(CLONED_DIR_META_FILE)
  await makeDir(META_FILE_DIR)
  await fs.writeFile(path.join(META_FILE_DIR, '.gitignore'), '*\n')
  await fs.writeFile(CLONED_DIR_META_FILE, JSON.stringify(config))

  consola.success('Iroha Git repo is cloned')
}

export async function isCloneUpToDate(config: Configuration): Promise<boolean> {
  try {
    const meta: Configuration = await import(CLONED_DIR_META_FILE)
    if (meta.origin === config.origin && meta.rev === config.rev) return true
    consola.info('Iroha repo clone exists, but is not up-to-date')
    return false
  } catch (err) {
    consola.error(
      'Unable to read Iroha repo clone metadata:',
      err,
      chalk`\n\nAssuming the {red clone as not up-to-date}`,
    )
    return false
  }
}

export function resolveBinaryPath(bin: string): string {
  return path.join(CLONED_DIR, 'target/release', bin)
}

export async function runCargoBuild(crate: string): Promise<void> {
  consola.info(`Running "cargo build" for "${crate}"`)
  await execa('cargo', ['build', '--release', '--package', crate], { stdio: 'inherit', cwd: CLONED_DIR })
}

export async function isAccessible(path: string, mode?: number): Promise<boolean> {
  return fs
    .access(path, mode)
    .then(() => true)
    .catch(() => false)
}
