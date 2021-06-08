import { mapRustDefinitionsToScaleDefinitions } from '@iroha/map-to-scale-definitions';
import { generateInterfacesByDefinitions } from '@iroha/scale-codec-legacy-typegen';
import rustDefinitions from './input.json';
import fs from 'fs/promises';
import prettier from 'prettier';

const OUTPUT_PATH_DEFINITIONS = `./src/definitions.json`;
const OUTPUT_PATH_TYPES = `./src/types.ts`;

function sortFirstLevelKeysInObject<T extends { [K in string]: unknown }>(val: T): T {
    const entries = Object.entries(val);
    entries.sort(([a], [b]) => a.localeCompare(b));
    return Object.fromEntries(entries) as any;
}

(async function () {
    const prettierConfig = await prettier.resolveConfig(process.cwd());

    const definitions = mapRustDefinitionsToScaleDefinitions({ rustDefinitions });
    const types = generateInterfacesByDefinitions({
        scaleLibEmbedName: '@iroha/scale-codec-legacy',
        definitions,
        constructorDefInterfaceName: 'IrohaDslConstructorDef',
    });

    const definitionsJson = prettier.format(JSON.stringify(sortFirstLevelKeysInObject(definitions), undefined, 4), {
        ...prettierConfig,
        parser: 'json',
    });
    const typesPretty = prettier.format(types, {
        ...prettierConfig,
        parser: 'typescript',
    });

    await Promise.all([
        fs.writeFile(OUTPUT_PATH_DEFINITIONS, definitionsJson, { encoding: 'utf-8' }),
        fs.writeFile(OUTPUT_PATH_TYPES, typesPretty, { encoding: 'utf-8' }),
    ]);
})();
