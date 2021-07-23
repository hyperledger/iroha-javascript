export interface RustDefinitions {
    [typeFullPath: string]: RustTypeDefinitionVariant;
}

export type RustTypeDefinitionVariant =
    | RustMapDefinition
    | RustDirectAlias
    | RustVecDefinition
    | RustOptionDefinition
    | RustNamedStructDefinition
    | RustUnnamedStructDefinition
    | RustEnumDefinition
    | RustArrayDefinition
    | RustIntDef;

export interface RustMapDefinition {
    Map: {
        key: TypePath;
        value: TypePath;
    };
}

export type RustDirectAlias = TypePath;

export interface RustVecDefinition {
    Vec: TypePath;
}

export interface RustArrayDefinition {
    Array: {
        len: number;
        ty: TypePath;
    };
}

export interface RustOptionDefinition {
    Option: TypePath;
}

export interface RustNamedStructDefinition {
    Struct: {
        declarations: Array<{
            name: string;
            ty: TypePath;
        }>;
    };
}

export interface RustUnnamedStructDefinition {
    TupleStruct: {
        types: Array<TypePath>;
    };
}

export interface RustEnumDefinition {
    Enum: {
        variants: Array<RustEnumVarDef>;
    };
}

export interface RustEnumVarDef {
    name: string;
    discriminant: number;
    ty: TypePath | null;
}

export interface RustIntDef {
    Int: string;
}

export type TypePath = string;
