import { Set } from 'immutable'
import path from 'path'
import consola from 'consola'
import chalk from 'chalk'
import { cd } from 'zx'

export type SetEntry<T> = T extends Set<infer V> ? V : never

/**
 * Relative to the monorepo root
 */
export function resolve(...paths: string[]): string {
  return path.resolve(ROOT, ...paths)
}

export function reportDeleted(paths: string[]): void {
  consola.info(
    'Deleted stuff:\n' +
      paths
        .map((a) => path.relative(ROOT, a))
        .map((a) => `  ${chalk.gray(a)}`)
        .join('\n'),
  )
}

export async function preserveCwd<T>(fn: () => Promise<T>): Promise<T> {
  const preserved = process.cwd()
  try {
    return await fn()
  } finally {
    cd(preserved)
  }
}

export const ROOT = path.resolve(__dirname, '../')
