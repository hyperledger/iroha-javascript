import {
    RustArrayDefinition,
    RustDirectAlias,
    RustEnumDefinition,
    RustIntDef,
    RustMapDefinition,
    RustNamedStructDefinition,
    RustOptionDefinition,
    RustTypeDefinitionVariant,
    RustUnnamedStructDefinition,
    RustVecDefinition,
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
    return !!(v as RustNamedStructDefinition).NamedStruct;
}

export function isRustUnnamedStructDef(v: RustTypeDefinitionVariant): v is RustUnnamedStructDefinition {
    return !!(v as RustUnnamedStructDefinition).UnnamedStruct;
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
