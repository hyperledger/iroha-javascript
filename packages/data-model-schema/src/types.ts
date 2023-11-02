export interface Schema {
  [type: string]: SchemaTypeDefinition
}

export type SchemaTypeDefinition =
  | UnitType
  | DirectAlias
  | MapDefinition
  | VecDefinition
  | OptionDefinition
  | NamedStructDefinition
  | EnumDefinition
  | ArrayDefinition
  | IntDefinition
  | FixedPointDefinition
  | TupleDef

export interface MapDefinition {
  Map: {
    key: TypePath
    value: TypePath
  }
}

export interface TupleDef {
  Tuple: TypePath[]
}

export type DirectAlias = TypePath

export interface VecDefinition {
  Vec: TypePath
}

export interface ArrayDefinition {
  Array: {
    len: number
    type: TypePath
  }
}

export interface OptionDefinition {
  Option: TypePath
}

export interface NamedStructDefinition {
  Struct: Array<{
    name: string
    type: TypePath
  }>
}

export interface EnumDefinition {
  Enum: Array<EnumVariantDefinition>
}

export interface EnumVariantDefinition {
  tag: string
  discriminant: number
  type?: TypePath
}

export interface IntDefinition {
  Int: string
}

export interface FixedPointDefinition {
  FixedPoint: {
    base: string
    decimal_places: number
  }
}

export type TypePath = string

export type UnitType = null
