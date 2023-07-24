import chalk from 'chalk'
import consola from 'consola'
import del from 'del'
import { type Options as ExecaOptions, execa } from 'execa'
import makeDir from 'make-dir'
import { fs, path } from 'zx'
import url from 'url'
import { CLONE_DIR, IROHA_DIR, IROHA_DIR_CLONE_META_DIR_FILE } from '../etc/meta'
import config from './config-resolved'
import { BuildProfile, ConfigResolved, ConfigResolvedGitClone, GitCloneConfiguration } from './types'

export async function clone(config: GitCloneConfiguration): Promise<void> {
  consola.info(
    `Cloning Git repo with origin ${chalk.green.bold(config.origin)} ` +
      `at revision ${chalk.magenta.bold(config.rev)} into ${chalk.blue.bold(CLONE_DIR)}`,
  )

  await del(CLONE_DIR, { force: true })
  await makeDir(CLONE_DIR)
  const EXECA_OPTS: ExecaOptions = { cwd: CLONE_DIR, stdio: 'inherit' }
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
    consola.info(
      `Error while reading the metadata of the cloned repo. Assuming the clone as not up-to-date.` +
        `\nActual error: ${String(err)}`,
    )
    return false
  }
}

export function resolveBinaryPath(cfg: ConfigResolved, bin: string): string {
  return path.join(IROHA_DIR, `target/${cfg.profile === 'release' ? 'release' : 'debug'}`, bin)
}

export async function runCargoBuild(crate: string, profile: BuildProfile): Promise<void> {
  const args = ['build']
  profile === 'release' && args.push('--release')
  args.push('--package', crate)
  const process = execa('cargo', args, { stdio: 'inherit', cwd: IROHA_DIR })
  consola.info(`Spawn %o`, process.spawnargs)
  await process
}

export async function isAccessible(path: string, mode?: number): Promise<boolean> {
  return fs
    .access(path, mode)
    .then(() => true)
    .catch(() => false)
}

async function readlink(path: string): Promise<{ t: 'ok'; target: string } | { t: 'err' }> {
  return fs
    .readlink(path)
    .then((target) => ({ t: 'ok', target } as const))
    .catch(() => ({ t: 'err' }))
}

export function assertConfigurationIsGitClone(cfg: ConfigResolved): asserts cfg is ConfigResolvedGitClone {
  if (cfg.t !== 'git-clone')
    throw new Error(`Expected to work with git-clone configuration, but got cfg with type of "${cfg.t}"`)
}

export async function syncIrohaSymlink(config: ConfigResolved) {
  const symlinkDir = IROHA_DIR
  const symlinkDirRelative = path.relative(url.fileURLToPath(new URL('../', import.meta.url)), symlinkDir)
  const target = config.t === 'git-clone' ? CLONE_DIR : config.absolutePath
  const existingLink = await readlink(symlinkDir)
  if (!(existingLink.t === 'ok' && existingLink.target === target)) {
    await del(symlinkDir, { force: true })
    consola.info(chalk`Removed existing {blue ${symlinkDirRelative}}`)
    await fs.symlink(target, symlinkDir)
    consola.info(chalk`Created symlink {blue ${symlinkDirRelative}} -> {blue ${target}}`)
  }
}

export async function syncSourceRepo() {
  if (config.t === 'git-clone' && !(await isCloneUpToDate(config))) await clone(config)
}
