import { DefinitionsTypes } from '@iroha/scale-codec-legacy';
// import { generateTsDef } from '../src/generate/tsDef';
import { generateTsDefFor } from './generator';

export function generateInterfacesByDefinitions(opts: {
    /**
     * @description path to the lib with scale codec implementation, like 'scale-codec'.
     * This'll be embedded in final script string
     */
    scaleLibEmbedName: string;

    /**
     * @description definitions of types
     */
    definitions: DefinitionsTypes;

    /**
     * @description name of the interface that will be exported and will be a map of all
     * generated interfaces - it will be useful for helpers
     */
    constructorDefInterfaceName: string;
}): string {
    // const ALL_DEFINITIONS = {
    //     MODULE_NAME_1: {
    //         someNestedModule: {
    //             types: opts.definitions,
    //         },
    //     },
    // };

    return generateTsDefFor({
        definitions: opts.definitions,
        scaleLibName: opts.scaleLibEmbedName,
        constructorDefInterfaceName: opts.constructorDefInterfaceName,
    });

    // generateTsDef(
    //     {
    //         MODULE_NAME_1: {
    //             someNestedModule: {
    //                 types: opts.definitions,
    //             },
    //         },
    //     },
    //     'some-out',
    //     'MODULE_NAME_1',
    // );

    // return '';
}

// function generate

// // import definitions from '../../iroha-data-model/src/iroha-definitions';
// import rustDefinitions from '../../iroha-to-scale-definitions/src/out.json';
// import { mapRustDefinitionsToScaleDefinitions } from '../../iroha-to-scale-definitions/src/index';

// const result = generateInterfacesByDefinitions({
//     definitions: mapRustDefinitionsToScaleDefinitions({ rustDefinitions }),
//     scaleLibEmbedName: 'scale-codec',
// });

// // console.log(result);

// import fs from 'fs/promises';

// fs.writeFile('./test.ts', result, { encoding: 'utf-8' });
