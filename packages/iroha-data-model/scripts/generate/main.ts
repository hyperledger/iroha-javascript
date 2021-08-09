import path from 'path';
import consola from 'consola';
import chalk from 'chalk';
import fs from 'fs/promises';
import { generate } from '@scale-codec/namespace-codegen';
import inputJson from '../../input/input.json';
import { convertRustIntrospectOutputToCodegenFormat } from './convert';

const OUTPUT_PATH = path.join(__dirname, '../../src/generated.ts');

async function main() {
    consola.info(chalk`Converting {blue.bold input.json} to codegen-compatible format...`);
    const codegenDefinitions = convertRustIntrospectOutputToCodegenFormat({ input: inputJson });

    consola.info('Generating code...');
    const generated = generate(codegenDefinitions, {
        namespaceTypeName: 'IrohaDataModel',
        namespaceValueName: 'irohaCodec',
        importLib: '@scale-codec/namespace',
        structPropsCamelCase: true,
    });

    consola.info('Writing result...');
    await fs.writeFile(OUTPUT_PATH, generated, { encoding: 'utf8' });

    consola.success(chalk`Generated to {green.bold ${OUTPUT_PATH}}`);
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
