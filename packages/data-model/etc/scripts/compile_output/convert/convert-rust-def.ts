import { RustDefinitions, RustTypeDefinitionVariant } from './types';
import { NamespaceDefinition, TypeDef } from '@scale-codec/definition-compiler';
import { Enum, Option, Result } from '@scale-codec/definition-runtime';
import {
    isRustDirectAlias,
    isRustArrayDef,
    isRustEnumDef,
    isRustIntDef,
    isRustMapDef,
    isRustOptionDef,
    isRustStructDef,
    isRustTupleStructDef,
    isRustVecDef,
    isRustFixedPointDef,
} from './type-assertions';
import debugRoot from 'debug';
import RefConverter from './RefConverter';

const debug = debugRoot('@iroha2/data-model:rust-convert');

function ok<Ok, Err>(ok: Ok): Result<Ok, Err> {
    return Enum.variant('Ok', ok);
}

function err<Ok, Err>(err: Err): Result<Ok, Err> {
    return Enum.variant('Err', err);
}

function some<T>(val: T): Option<T> {
    return Enum.variant('Some', val);
}

function none<T>(): Option<T> {
    return Enum.variant('None');
}

const IGNORE_TYPES = new Set<string>([
    // any ints
    ...[3, 4, 5, 6, 7]
        .map((power) => 2 ** power)
        .map((bits) => [`i${bits}`, `u${bits}`])
        .flat(),
    'bool',
    'Vec<u8>',
]);

const AVAILABLE_FIXED_POINTS = new Set(['I64P9']);

export function convertRustIntrospectOutputIntoCompilerInput(params: { input: RustDefinitions }): NamespaceDefinition {
    const converter = new RefConverter();

    const result = Object.entries(params.input).reduce<NamespaceDefinition>((acc, [key, def]) => {
        const result = transformRustDef(converter, key, def);
        if (result.is('Ok')) {
            const transformed = result.as('Ok');
            if (transformed.is('Some')) {
                // transform self name
                const selfRefTransformed = converter.handle(key);

                // check for existing key
                if (selfRefTransformed in acc) {
                    throw new Error(`${selfRefTransformed} is duplicated`);
                }

                acc[selfRefTransformed] = transformed.as('Some');
            }
        } else {
            throw new Error(result.as('Err'));
        }
        return acc;
    }, {});

    Object.entries(converter.collectedTypes).forEach(([key, def]) => {
        if (key in result) {
            debug("duplicated entry in converter's collected types: %s", key);
        } else {
            debug('appending new entry from converter: %o %O', key, def);
            result[key] = def;
        }
    });

    return result;
}

function transformRustDef(
    converter: RefConverter,
    name: string,
    def: RustTypeDefinitionVariant,
): Result<Option<TypeDef>, string> {
    if (IGNORE_TYPES.has(name)) {
        debug(`type %o ignored by ignore list`, name);
        return ok(none());
    }

    if (isRustDirectAlias(def)) {
        debug(`type %o is alias, ignoring it`, name);
        return ok(none());
    }
    if (isRustIntDef(def)) {
        // if (def.Int === 'Compact') {
        //     return ok(some('compact'));
        // }
        debug(`ignore int { %o: %o }`, name, def.Int);
        return ok(none());
    }
    if (isRustArrayDef(def)) {
        const { len, ty } = def.Array;

        if (ty === 'u8') {
            // specially cover case with array of bytes
            return ok(
                some<TypeDef>({
                    t: 'bytes-array',
                    len,
                }),
            );
        }

        return ok(
            some({
                t: 'array',
                len,
                item: converter.handle(ty),
            }),
        );
    }
    if (isRustMapDef(def)) {
        const { key, value } = def.Map;

        return ok(
            some({
                t: 'map',
                key: converter.handle(key),
                value: converter.handle(value),
            }),
        );
    }
    if (isRustStructDef(def)) {
        return ok(
            some({
                t: 'struct',
                fields: def.Struct.declarations.map(({ name, ty }) => ({
                    name,
                    ref: converter.handle(ty),
                })),
            }),
        );
    }
    if (isRustEnumDef(def)) {
        return ok(
            some({
                t: 'enum',
                variants: def.Enum.variants.map(({ name, discriminant, ty }) => ({
                    name,
                    discriminant,
                    ref: ty && converter.handle(ty),
                })),
            }),
        );
    }
    if (isRustOptionDef(def)) {
        return ok(
            some({
                t: 'option',
                some: converter.handle(def.Option),
            }),
        );
    }
    if (isRustVecDef(def)) {
        return ok(
            some({
                t: 'vec',
                item: converter.handle(def.Vec),
            }),
        );
    }
    if (isRustTupleStructDef(def)) {
        return ok(
            some({
                t: 'tuple',
                items: def.TupleStruct.types.map((x) => converter.handle(x)),
            }),
        );
    }
    if (isRustFixedPointDef(def)) {
        const {
            FixedPoint: { decimal_places, base },
        } = def;
        /**
         * Something like `I64P9`
         */
        const fixedPointKey = `${base.toUpperCase()}P${decimal_places}`;
        if (AVAILABLE_FIXED_POINTS.has(fixedPointKey)) {
            return ok(
                some<TypeDef>({
                    t: 'import',
                    module: `./fixed-point`,
                    nameInModule: `FixedPoint${fixedPointKey}`,
                }),
            );
        }
        return err(`Unsupported fixed point with base ${base} and ${decimal_places} decimal places`);
    }

    debug('Unknown def: %O', def);
    return err('Unexpected definition');
}
