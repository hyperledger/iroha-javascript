import path from 'path'
import del from 'del'
import { series, parallel } from 'gulp'
import { $ } from 'zx'

const TARGETS = ['web', 'node', 'bundler']
const TARGET_DIR = (target: string) => path.resolve(__dirname, `../packages/target-${target}`)

/**
 * Deletes index.js & index.d.ts files from target dirs
 */
async function clean() {
  await del(
    TARGETS.reduce<string[]>((acc, trg) => {
      acc.push(...[`index.d.ts`, `index.js`].map((x) => path.join(TARGET_DIR(trg), x)))
      return acc
    }, []),
  )
}

/**
 * Runs tsc and outputs d.ts file in each target dir
 */
async function compileDts() {
  for (const trg of TARGETS) {
    await $`pnpx tsc --declaration --emitDeclarationOnly ${path.join(TARGET_DIR(trg), 'index.ts')}`
  }
}

/**
 * Transforms index.ts to index.js in each target dir
 */
async function transformJs() {
  const computeFormat = (trg: string) => (trg === 'node' ? 'cjs' : 'esm')

  for (const trg of TARGETS) {
    const inFile = path.join(TARGET_DIR(trg), 'index.ts')
    const outFile = path.join(TARGET_DIR(trg), 'index.js')
    const format = computeFormat(trg)

    await $`pnpx esbuild ${inFile} --format=${format} --outfile=${outFile}`
  }
}

export const build_target_entries = series(clean, parallel(compileDts, transformJs))
