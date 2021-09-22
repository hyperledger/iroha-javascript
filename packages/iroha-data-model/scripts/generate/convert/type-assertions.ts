import {
    RustArrayDefinition,
    RustDirectAlias,
    RustEnumDefinition,
    RustIntDef,
    RustMapDefinition,
    RustNamedStructDefinition,
    RustOptionDefinition,
    RustTypeDefinitionVariant,
    RustTupleStructDefinition,
    RustVecDefinition,
    RustFixedPointDef,
} from './types';

export function isRustMapDef(v: RustTypeDefinitionVariant): v is RustMapDefinition {
    return !!(v as RustMapDefinition).Map;
}

export function isRustDirectAlias(v: RustTypeDefinitionVariant): v is RustDirectAlias {
    return typeof v === 'string';
}

export function isRustVecDef(v: RustTypeDefinitionVariant): v is RustVecDefinition {
    return !!(v as RustVecDefinition).Vec;
}

export function isRustOptionDef(v: RustTypeDefinitionVariant): v is RustOptionDefinition {
    return !!(v as RustOptionDefinition).Option;
}

export function isRustStructDef(v: RustTypeDefinitionVariant): v is RustNamedStructDefinition {
    return !!(v as RustNamedStructDefinition).Struct;
}

export function isRustTupleStructDef(v: RustTypeDefinitionVariant): v is RustTupleStructDefinition {
    return !!(v as RustTupleStructDefinition).TupleStruct;
}

export function isRustEnumDef(v: RustTypeDefinitionVariant): v is RustEnumDefinition {
    return !!(v as RustEnumDefinition).Enum;
}

export function isRustIntDef(v: RustTypeDefinitionVariant): v is RustIntDef {
    return !!(v as RustIntDef).Int;
}

export function isRustArrayDef(v: RustTypeDefinitionVariant): v is RustArrayDefinition {
    return !!(v as RustArrayDefinition).Array;
}

export function isRustFixedPointDef(v: RustTypeDefinitionVariant): v is RustFixedPointDef {
    return !!(v as RustFixedPointDef).FixedPoint;
}
