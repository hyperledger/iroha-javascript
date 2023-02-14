import {
  ConfigResolved,
  ConfigResolvedGitClone,
  GitCloneConfiguration,
} from './types'
import { CLONE_DIR, IROHA_DIR, IROHA_DIR_CLONE_META_DIR_FILE } from '../etc/meta'
import fs from 'fs/promises'
import del from 'del'
import consola from 'consola'
import chalk from 'chalk'
import makeDir from 'make-dir'
import execa from 'execa'
import path from 'path'

export async function clone(config: GitCloneConfiguration): Promise<void> {
  consola.info(
    `Cloning Git repo with origin ${chalk.green.bold(config.origin)} ` +
      `at revision ${chalk.magenta.bold(config.rev)} into ${chalk.blue.bold(CLONE_DIR)}`,
  )

  await del(CLONE_DIR, { force: true })
  await makeDir(CLONE_DIR)
  const EXECA_OPTS: execa.Options = { cwd: CLONE_DIR, stdio: 'inherit' }
  await execa('git', ['init'], EXECA_OPTS)
  await execa('git', ['remote', 'add', 'origin', config.origin], EXECA_OPTS)
  await execa('git', ['fetch', 'origin', config.rev], EXECA_OPTS)
  await execa('git', ['reset', '--hard', 'FETCH_HEAD'], EXECA_OPTS)

  const META_FILE_DIR = path.dirname(IROHA_DIR_CLONE_META_DIR_FILE)
  await makeDir(META_FILE_DIR)
  await fs.writeFile(path.join(META_FILE_DIR, '.gitignore'), '*\n')
  await fs.writeFile(IROHA_DIR_CLONE_META_DIR_FILE, JSON.stringify(config))

  consola.success('Iroha Git repo is cloned')
}

export async function isCloneUpToDate(config: GitCloneConfiguration): Promise<boolean> {
  try {
    const meta: GitCloneConfiguration = await import(IROHA_DIR_CLONE_META_DIR_FILE)
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

export function resolveBinaryPath(cfg: ConfigResolved, bin: string): string {
  return path.join(IROHA_DIR, 'target/release', bin)
}

export async function runCargoBuild(crate: string): Promise<void> {
  consola.info(`Running "cargo build" for "${crate}"`)
  await execa('cargo', ['build', '--release', '--package', crate], { stdio: 'inherit', cwd: IROHA_DIR })
}

export async function isAccessible(path: string, mode?: number): Promise<boolean> {
  return fs
    .access(path, mode)
    .then(() => true)
    .catch(() => false)
}

export function assertConfigurationIsGitClone(cfg: ConfigResolved): asserts cfg is ConfigResolvedGitClone {
  if (cfg.t !== 'git-clone')
    throw new Error(`Expected to work with git-clone configuration, but got cfg with type of "${cfg.t}"`)
}

export async function syncIrohaSymlink(config: ConfigResolved) {
  const symlinkDir = IROHA_DIR
  const symlinkDirRelative = path.relative(process.cwd(), symlinkDir)

  const target = config.t === 'git-clone' ? CLONE_DIR : config.absolutePath
  if (await isAccessible(symlinkDir)) {
    await del(symlinkDir, { force: true })
    consola.info(chalk`Removed existing {blue ${symlinkDirRelative}}`)
  }
  await fs.symlink(target, symlinkDir)
  consola.info(chalk`Created symlink {blue ${symlinkDirRelative}} -> {blue ${target}}`)
}
