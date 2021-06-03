// Copyright 2017-2021 @polkadot/typegen authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import type { TypeDef } from '@polkadot/types/create/types';
import type { ModuleTypes } from './util';

// import Handlebars from 'handlebars';
// import path from 'path';

import { getTypeDef, TypeDefInfo, TypeDef } from '@iroha/scale-codec-legacy';
// import { getTypeDef } from '@polkadot/types/create';
// import { TypeDefInfo } from '@polkadot/types/create/types';
// import * as defaultDefinitions from '@polkadot/types/interfaces/definitions';
import { assert, isString, stringCamelCase, stringify, stringUpperFirst } from '@polkadot/util';

import {
    createImports,
    exportInterface,
    exportType,
    formatType,
    // readTemplate,
    setImports,
    TypeImports,
} from './util';
import { DefinitionsTypes } from '@polkadot/types/types';

interface Imports extends TypeImports {
    interfaces: [string, string][];
}

// helper to generate a `readonly <Name>: <Type>;` getter
/** @internal */
export function createGetter(
    // definitions: Record<string, ModuleTypes>,
    name = '',
    type: string,
    imports: TypeImports,
): string {
    setImports(imports, [type]);

    return `  readonly ${name}: ${type};\n`;
}

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorUnhandled(def: TypeDef, imports: TypeImports): string {
    throw new Error(`Generate: ${def.name || ''}: Unhandled type ${TypeDefInfo[def.info]}`);
}

/** @internal */
function tsExport(def: TypeDef, imports: TypeImports): string {
    return exportInterface(def.name, formatType(def, imports));
}

const tsBTreeMap = tsExport;
const tsBTreeSet = tsExport;
const tsCompact = tsExport;
const tsDoNotConstruct = tsExport;
const tsHashMap = tsExport;
const tsOption = tsExport;
const tsPlain = tsExport;
const tsTuple = tsExport;

/** @internal */
function tsEnum(
    // definitions: Record<string, ModuleTypes>,
    { name: enumName, sub }: TypeDef,
    imports: TypeImports,
): string {
    setImports(imports, ['Enum']);

    const keys = (sub as TypeDef[]).map(({ info, name = '', type }): string => {
        const getter = stringUpperFirst(stringCamelCase(name.replace(' ', '_')));
        const isComplexType = [TypeDefInfo.Tuple, TypeDefInfo.Vec, TypeDefInfo.VecFixed].includes(info);
        const asGetter =
            type === 'Null' || info === TypeDefInfo.DoNotConstruct
                ? ''
                : createGetter(`as${getter}`, isComplexType ? formatType(type, imports) : type, imports);
        const isGetter = info === TypeDefInfo.DoNotConstruct ? '' : createGetter(`is${getter}`, 'boolean', imports);

        switch (info) {
            case TypeDefInfo.Compact:
            case TypeDefInfo.Plain:
            case TypeDefInfo.Tuple:
            case TypeDefInfo.Vec:
            case TypeDefInfo.Option:
            case TypeDefInfo.VecFixed:
                return `${isGetter}${asGetter}`;

            case TypeDefInfo.DoNotConstruct:
                return '';

            default:
                throw new Error(`Enum: ${enumName || 'undefined'}: Unhandled type ${TypeDefInfo[info]}`);
        }
    });

    return exportInterface(enumName, 'Enum', keys.join(''));
}

function tsInt(
    // definitions: Record<string, ModuleTypes>,
    def: TypeDef,
    imports: TypeImports,
    type: 'Int' | 'UInt' = 'Int',
): string {
    setImports(imports, [type]);

    return exportInterface(def.name, type);
}

/** @internal */
function tsResultGetter(
    // definitions: Record<string, ModuleTypes>,
    resultName = '',
    getter: 'Ok' | 'Err' | 'Error',
    def: TypeDef,
    imports: TypeImports,
): string {
    const { info, type } = def;
    const asGetter =
        type === 'Null'
            ? ''
            : (getter === 'Error' ? '  /** @deprecated Use asErr */\n' : '') +
              createGetter(
                  //   definitions,
                  `as${getter}`,
                  info === TypeDefInfo.Tuple ? formatType(def, imports) : type,
                  imports,
              );
    const isGetter =
        (getter === 'Error' ? '  /** @deprecated Use isErr */\n' : '') +
        createGetter(`is${getter}`, 'boolean', imports);

    switch (info) {
        case TypeDefInfo.Plain:
        case TypeDefInfo.Tuple:
        case TypeDefInfo.Vec:
        case TypeDefInfo.Option:
            return `${isGetter}${asGetter}`;

        default:
            throw new Error(`Result: ${resultName}: Unhandled type ${TypeDefInfo[info]}`);
    }
}

/** @internal */
function tsResult(def: TypeDef, imports: TypeImports): string {
    const [okDef, errorDef] = def.sub as TypeDef[];
    const inner = [
        tsResultGetter(def.name, 'Err', errorDef, imports),
        // @deprecated, use Err
        tsResultGetter(def.name, 'Error', errorDef, imports),
        tsResultGetter(def.name, 'Ok', okDef, imports),
    ].join('');

    setImports(imports, [def.type]);

    return exportInterface(def.name, formatType(def, imports), inner);
}

/** @internal */
function tsSet(
    // definitions: Record<string, ModuleTypes>,
    { name: setName, sub }: TypeDef,
    imports: TypeImports,
): string {
    setImports(imports, ['Set']);

    const types = (sub as TypeDef[]).map(({ name }): string => {
        assert(name, 'Invalid TypeDef found, no name specified');

        return createGetter(`is${name}`, 'boolean', imports);
    });

    return exportInterface(setName, 'Set', types.join(''));
}

/** @internal */
function tsStruct(
    // definitions: Record<string, ModuleTypes>,
    { name: structName, sub }: TypeDef,
    imports: TypeImports,
): string {
    setImports(imports, ['Struct']);

    const keys = (sub as TypeDef[]).map((typedef): string => {
        const returnType = formatType(typedef, imports);

        return createGetter(typedef.name, returnType, imports);
    });

    return exportInterface(structName, 'Struct', keys.join(''));
}

/** @internal */
function tsUInt(def: TypeDef, imports: TypeImports): string {
    return tsInt(def, imports, 'UInt');
}

/** @internal */
function tsVec(def: TypeDef, imports: TypeImports): string {
    const type = (def.sub as TypeDef).type;

    if (def.info === TypeDefInfo.VecFixed && type === 'u8') {
        setImports(imports, ['U8aFixed']);

        return exportType(def.name, 'U8aFixed');
    }

    return exportInterface(def.name, formatType(def, imports));
}

/** @internal */
function generateInterfaces(
    // definitions: Record<string, ModuleTypes>,
    { types }: { types: Record<string, any> },
    imports: Imports,
): [string, string][] {
    // handlers are defined externally to use - this means that when we do a
    // `generators[typedef.info](...)` TS will show any unhandled types. Rather
    // we are being explicit in having no handlers where we do not support (yet)
    const generators = {
        [TypeDefInfo.BTreeMap]: tsBTreeMap,
        [TypeDefInfo.BTreeSet]: tsBTreeSet,
        [TypeDefInfo.Compact]: tsCompact,
        [TypeDefInfo.DoNotConstruct]: tsDoNotConstruct,
        [TypeDefInfo.Enum]: tsEnum,
        [TypeDefInfo.HashMap]: tsHashMap,
        [TypeDefInfo.Int]: tsInt,
        [TypeDefInfo.Linkage]: errorUnhandled,
        [TypeDefInfo.Null]: errorUnhandled,
        [TypeDefInfo.Option]: tsOption,
        [TypeDefInfo.Plain]: tsPlain,
        [TypeDefInfo.Result]: tsResult,
        [TypeDefInfo.Set]: tsSet,
        [TypeDefInfo.Struct]: tsStruct,
        [TypeDefInfo.Tuple]: tsTuple,
        [TypeDefInfo.UInt]: tsUInt,
        [TypeDefInfo.Vec]: tsVec,
        [TypeDefInfo.VecFixed]: tsVec,
    };

    return Object.entries(types).map(([name, type]): [string, string] => {
        const def = getTypeDef(isString(type) ? type : stringify(type), { name });

        return [name, generators[def.info](def, imports)];
    });
}

function generateInterfacesConstructorDef(interfaces: string[], name: string): string {
    const joined = interfaces.map((x) => `${x}:${x}`).join(';');

    return `export interface ${name} {${joined}};`;
}

// const templateIndex = readTemplate('tsDef/index');
// const generateTsDefIndexTemplate = Handlebars.compile(templateIndex);

// const templateModuleTypes = readTemplate('tsDef/moduleTypes');
// const generateTsDefModuleTypesTemplate = Handlebars.compile(templateModuleTypes);

// const templateTypes = readTemplate('tsDef/types');
// const generateTsDefTypesTemplate = Handlebars.compile(templateTypes);

/** @internal */
export function generateTsDefFor(
    opts: {
        definitions: DefinitionsTypes;
        scaleLibName: string;
        constructorDefInterfaceName: string;
    },
    // importDefinitions: { [importPath: string]: Record<string, ModuleTypes> },
    // defName: string,
    // { types }: { types: Record<string, any> },
): string {
    const imports = { ...createImports({ types: opts.definitions }), interfaces: [] } as Imports;
    // const definitions = imports.definitions;
    const interfaces = generateInterfaces({ types: opts.definitions }, imports);

    const generatedDefinitions = interfaces
        .sort((a, b): number => a[0].localeCompare(b[0]))
        .map(([, definition]): string => definition);

    const generatedDefinitionsNames = interfaces.map(([name]) => name);

    // const importTypes = [
    //     ...Object.keys(imports.localTypes)
    //         .sort()
    //         .map((packagePath): { file: string; types: string[] } => ({
    //             file: packagePath,
    //             types: Object.keys(imports.localTypes[packagePath]),
    //         })),
    // ];

    const ImportedBaseTypesNames: string[] = Object.entries({ ...imports.defaultCodecs, ...imports.typesTypes })
        .filter(([TypeName, shouldBeImported]) => shouldBeImported)
        .map(([TypeName]) => TypeName);

    // const constructorDef = generateInterfacesConstructorDef(generatedDefinitionsNames, 'Test');

    // console.log('%o', { imports: imports.typesTypes });

    // const itemsJoined = generatedDefinitions.join('\n\n');

    return [
        `import { ${ImportedBaseTypesNames.join(', ')} } from '${opts.scaleLibName}'`,
        generatedDefinitions.join('\n\n'),
        generateInterfacesConstructorDef(generatedDefinitionsNames, opts.constructorDefInterfaceName),
    ].join('\n\n');
    // writeFile(
    //     path.join(outputDir, defName, 'types.ts'),
    //     () =>
    //         generateTsDefModuleTypesTemplate({
    //             headerType: 'defs',
    //             imports,
    //             items,
    //             name: defName,
    //             types: importTypes,
    //         }),
    //     true,
    // );
    // writeFile(
    //     path.join(outputDir, defName, 'index.ts'),
    //     () => generateTsDefIndexTemplate({ headerType: 'defs' }),
    //     true,
    // );
}

// /** @internal */
// export function generateTsDef(
//     importDefinitions: { [importPath: string]: Record<string, ModuleTypes> },
//     outputDir: string,
//     generatingPackage: string,
// ): void {
//     // writeFile(path.join(outputDir, 'types.ts'), (): string => {
//     const definitions = importDefinitions[generatingPackage];

//     Object.entries(definitions).forEach(([defName, obj]): void => {
//         console.log(`\tExtracting interfaces for ${defName}`);

//         generateTsDefFor(importDefinitions, defName, obj, outputDir);
//     });

//     console.log({ definitions });

//     // return generateTsDefTypesTemplate({
//     //     headerType: 'defs',
//     //     items: Object.keys(definitions),
//     // });
//     // });

//     // writeFile(path.join(outputDir, 'index.ts'), () => generateTsDefIndexTemplate({ headerType: 'defs' }), true);
// }

// /** @internal */
// export function generateDefaultTsDef(): void {
//     generateTsDef(
//         { '@polkadot/types/interfaces': defaultDefinitions },
//         'packages/types/src/interfaces',
//         '@polkadot/types/interfaces',
//     );
// }
