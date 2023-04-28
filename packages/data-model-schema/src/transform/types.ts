export interface RustDefinitions {
  [typeFullPath: string]: RustTypeDefinitionVariant
}

export type RustTypeDefinitionVariant =
  | UnitType
  | RustDirectAlias
  | RustMapDefinition
  | RustVecDefinition
  | RustOptionDefinition
  | RustNamedStructDefinition
  | RustEnumDefinition
  | RustArrayDefinition
  | RustIntDef
  | RustFixedPointDef
  | RustTupleDef

export interface RustMapDefinition {
  Map: {
    key: TypePath
    value: TypePath
  }
}

export interface RustTupleDef {
  Tuple: TypePath[]
}

export type RustDirectAlias = TypePath

export interface RustVecDefinition {
  Vec: TypePath
}

export interface RustArrayDefinition {
  Array: {
    len: number
    type: TypePath
  }
}

export interface RustOptionDefinition {
  Option: TypePath
}

export interface RustNamedStructDefinition {
  Struct: Array<{
    name: string
    type: TypePath
  }>
}

export interface RustEnumDefinition {
  Enum: Array<RustEnumVarDef>
}

export interface RustEnumVarDef {
  name: string
  type?: TypePath
}

export interface RustIntDef {
  Int: string
}

export interface RustFixedPointDef {
  FixedPoint: {
    base: string
    decimal_places: number
  }
}

export type TypePath = string

export type UnitType = null
