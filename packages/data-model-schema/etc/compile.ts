import path from 'path'
import execa from 'execa'
import consola from 'consola'
import chalk from 'chalk'
import fs from 'fs'
import { KnownBinaries, install, resolveBinaryPath } from '@iroha2/dev-iroha-bins'
import { COMPILED_SCHEMA_FILE } from './meta'

async function main() {
  consola.info('Installing binary')
  await install(KnownBinaries.Introspect)

  consola.info('Compiling schema')
  const stream = fs.createWriteStream(COMPILED_SCHEMA_FILE, { encoding: 'utf-8' })
  try {
    const sub = execa(await resolveBinaryPath(KnownBinaries.Introspect))
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
