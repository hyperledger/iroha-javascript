import { DEFAULT_CODECS, DefinitionsTypes, DefinitionType, sanitize, alias } from '@iroha/scale-codec-legacy';
import { inspect } from 'util';
import { RustDefinitions, RustEnumVarDef, RustTypeDefinitionVariant } from './types';
import {
    isRustDirectAlias,
    isRustMapDef,
    isRustStructDef,
    isRustUnnamedStructDef,
    isRustEnumDef,
    isRustOptionDef,
    isRustVecDef,
    isRustIntDef,
    isRustArrayDef,
} from './type-assertions';
// import { ParsedRustName, parseRawRustTypeName } from './util';
import { stringCamelCase } from '@polkadot/util';

const CRUTCH_ALIASES = [
    alias('iroha_data_model::isi::If', 'IfInstruction'),
    alias('iroha_data_model::expression::If', 'IfExpression'),
    alias('iroha_data_model::events::data::Event', 'DataEvent'),
    alias('iroha_data_model::events::pipeline::Event', 'PipelineEvent'),
    alias('iroha_data_model::asset::Id', 'AssetId'),
    alias('iroha_data_model::account::Id', 'AccountId'),
    alias('iroha_data_model::peer::Id', 'PeerId'),
];

function applyCrutchAliases(val: string): string {
    return CRUTCH_ALIASES.reduce((prev, fn) => fn(prev), val);
}

function crutchSanitize(val: string): string {
    return sanitize(applyCrutchAliases(val));
}

export function mapRustDefinitionsToScaleDefinitions(opts: { rustDefinitions: RustDefinitions }): DefinitionsTypes {
    // interface ParsedType {
    //     nameRaw: string;
    //     nameParsed: ParsedRustName;
    //     definition: DefinitionType | null;
    // }

    // const visited = new Map<string, ParsedRustName>();
    // const collisions = new Map<string, Set<ParsedRustName>>();

    // // cons

    // for (const [nameRaw, defRaw] of Object.entries(opts.rustDefinitions)) {
    //     const nameParsed = parseRawRustTypeName(nameRaw);

    //     if (visited.has(nameParsed.sanitized)) {
    //         const set = collisions.get(nameParsed.sanitized) ?? new Set();
    //         set.add(nameParsed).add(visited.get(nameParsed.sanitized)!);
    //         collisions.set(nameParsed.sanitized, set);
    //     } else {
    //         visited.set(nameParsed.sanitized, nameParsed);
    //     }

    //     // console.log(nameParsed);
    // }

    // console.log('Collisions:\n%o', collisions);

    // process.exit(0);

    const collected = Object.entries(opts.rustDefinitions).reduce<[string, DefinitionType][]>(
        (prev, [typeName, rustDef]) => {
            const typeNameSanitized = crutchSanitize(typeName);

            // console.log('%o -> %o', typeName, typeNameSanitized);

            const mapped = mapRustDef(typeNameSanitized, rustDef);
            if (mapped) {
                prev.push([typeNameSanitized, mapped]);
            }

            return prev;
        },
        [],
    );

    return Object.fromEntries(collected);
}

function mapRustDef(typeName: string, value: RustTypeDefinitionVariant): DefinitionType | null {
    // const typeNameSanitized = sanitize(rawTypeName);

    if (isRustDirectAlias(value)) {
        // Здесь надо проверить, если typeName входит в состав типов из scale, то надо игнорить
        if (typeName in DEFAULT_CODECS || crutchSanitize(typeName) in DEFAULT_CODECS) {
            return null;
        }

        return crutchSanitize(value);
    }

    if (isRustMapDef(value)) {
        // SCALE умеет понимать карты as is
        return null;
    }

    if (isRustStructDef(value)) {
        const { declarations } = value.Struct;
        return Object.fromEntries(declarations.map(({ name, ty }) => [stringCamelCase(name), crutchSanitize(ty)]));
    }
    if (isRustUnnamedStructDef(value)) {
        const { types } = value.TupleStruct;

        return crutchSanitize(`(${types.join(',')})`);
    }
    if (isRustEnumDef(value)) {
        const {
            Enum: { variants },
        } = value;

        const variantsWithNormalizedDiscriminants = crutchNormalizeEnumVariantsDiscriminant(variants);

        // // нужно проверить, что дискриминанты идут строго последовательно начиная с 0
        // // ибо пока неясно, как поддерживать кастомные
        // const maybeError = checkEnumDiscriminantsConsistency(variants);
        // if (maybeError) {
        //     console.warn(
        //         'warning: enum "%s" failed discriminant check. Ignoring it.\n%s',
        //         typeName,
        //         maybeError.message,
        //     );
        //     return null;
        // }

        return {
            _enum: {
                ...Object.fromEntries(
                    variantsWithNormalizedDiscriminants.map(({ name, ty }) => [name, ty && crutchSanitize(ty)]),
                ),
            },
        };

        // return null;
    }
    if (isRustOptionDef(value)) {
        // SCALE умеет понимать option as is
        return null;
    }
    if (isRustVecDef(value)) {
        // vec тоже понимает как есть
        return null;
    }
    if (isRustIntDef(value)) {
        // они ещё зачем?
        return null;
    }

    if (isRustArrayDef(value)) {
        // тоже игнор
        return null;
    }

    throw new Error(`Unknown value type: ${inspect(value, true, 3, true)}`);
}

// function checkEnumDiscriminantsConsistency(variants: RustEnumVarDef[]): null | Error {
//     for (let i = 0; i < variants.length; i++) {
//         const item = variants[i];
//         if (item.discriminant !== i) {
//             return new Error(`Invalid discriminant at variant "${item.name}" with value "${item.discriminant}"`);
//         }
//     }

//     return null;
// }

/**
 * @description SCALE does not support defining of custom discriminants for values, so, if there are
 * non-normalized values, this function will fix enum variants by filling 'empty' space between discriminants
 * by creating stubs
 * @param variants source non-normalized variants which can have custom discriminants, not 0..length
 * @returns new array with empty variants stubs
 */
function crutchNormalizeEnumVariantsDiscriminant(variants: RustEnumVarDef[]): RustEnumVarDef[] {
    // intentionally ignoring minimal value - it always will be 0a
    const [maxDiscriminant, mapped] = variants.reduce<[number, Map<number, RustEnumVarDef>]>(
        ([vmax, mapped], item) => {
            mapped.set(item.discriminant, item);
            return [Math.max(vmax, item.discriminant), mapped];
        },
        [0, new Map()],
    );

    const newTotalVariantsCount = maxDiscriminant + 1;

    return Array.from(new Array(newTotalVariantsCount).keys()).map(
        (discriminant) =>
            mapped.get(discriminant) ?? {
                discriminant,
                ty: null,
                name: `STUB_TO_FILL_DISCRIMINANT_${discriminant}`,
            },
    );
}
