import path from 'path'
import { execa } from 'execa'
import consola from 'consola'
import chalk from 'chalk'
import fs from 'fs'
import { resolveBinary } from '@iroha2/iroha-source'
import { COMPILED_SCHEMA_FILE } from './meta'

async function main() {
  consola.info('Resolving Kagami binary')
  const kagami = (await resolveBinary('kagami')).path

  consola.info('Compiling schema')
  const stream = fs.createWriteStream(COMPILED_SCHEMA_FILE, { encoding: 'utf-8' })
  try {
    const sub = execa(kagami, ['schema'])
    sub.stdout!.pipe(stream)
    await sub
  } finally {
    stream.close()
  }

  consola.success(chalk`Output is written into {blue.bold ${path.relative(process.cwd(), COMPILED_SCHEMA_FILE)}}`)
}

main().catch((err) => {
  consola.fatal(err)
  process.exit(1)
})
