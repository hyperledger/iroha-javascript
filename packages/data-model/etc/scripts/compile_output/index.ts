import path from 'path'
import consola from 'consola'
import chalk from 'chalk'
import fs from 'fs/promises'
import { renderNamespaceDefinition } from '@scale-codec/definition-compiler'
import { transformSchema } from './transform'
import { COMPILED_SCHEMA_OUTPUT_FILE } from '../../meta'
import INPUT from '../../__schema__.json'

export default async function () {
  consola.log(chalk`Converting {blue.bold input.json} to compiler-compatible format...`)
  const codegenDefinitions = transformSchema(INPUT)

  const generated = renderNamespaceDefinition(codegenDefinitions, {
    rollupSingleTuplesIntoAliases: true,
  })

  await fs.writeFile(COMPILED_SCHEMA_OUTPUT_FILE, generated, { encoding: 'utf8' })

  consola.success(chalk`Code is written into {bold.blue ${path.relative(process.cwd(), COMPILED_SCHEMA_OUTPUT_FILE)}}!`)
}
