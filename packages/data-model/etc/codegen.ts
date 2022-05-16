import path from 'path'
import consola from 'consola'
import chalk from 'chalk'
import fs from 'fs/promises'
import { renderNamespaceDefinition } from '@scale-codec/definition-compiler'
import { SCHEMA, transformSchema } from '@iroha2/data-model-schema'
import { CODEGEN_OUTPUT_FILE } from './meta'

async function main() {
  consola.log(chalk`Converting {blue.bold input.json} to compiler-compatible format...`)
  const codegenDefinitions = transformSchema(SCHEMA)

  const generated = renderNamespaceDefinition(codegenDefinitions, {
    rollupSingleTuplesIntoAliases: true,
  })

  await fs.writeFile(CODEGEN_OUTPUT_FILE, generated, { encoding: 'utf8' })

  consola.success(chalk`Code is written into {bold.blue ${path.relative(process.cwd(), CODEGEN_OUTPUT_FILE)}}!`)
}

main().catch((err) => {
  consola.fatal(err)
  process.exit(1)
})
