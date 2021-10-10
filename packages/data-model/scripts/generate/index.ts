import path from 'path';
import consola from 'consola';
import chalk from 'chalk';
import fs from 'fs/promises';
import { renderNamespaceDefinition } from '@scale-codec/definition-compiler';
import inputJson from '../../input/input.json';
import { convertRustIntrospectOutputIntoCompilerInput } from './convert';

const OUTPUT_PATH = path.join(__dirname, '../../src/generated.ts');

export default async function () {
    consola.log(chalk`Converting {blue.bold input.json} to compiler-compatible format...`);
    const codegenDefinitions = convertRustIntrospectOutputIntoCompilerInput({ input: inputJson });

    consola.log('Generating code...');
    const generated = await renderNamespaceDefinition(codegenDefinitions, {
        importLib: '@scale-codec/definition-runtime',
    });

    consola.log('Writing result...');
    await fs.writeFile(OUTPUT_PATH, generated, { encoding: 'utf8' });

    consola.success(chalk`Generated into {green.bold ${OUTPUT_PATH}}!`);
}
