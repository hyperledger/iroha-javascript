// import { Enum, Struct, Codec, Vec, UInt, Int, AnyNumber, Text, Registry } from './primitive';
import { Enum, Struct, Vec, UInt, Int, Raw } from './codec';
import { Text } from './primitive';
import { Codec, Registry, AnyNumber, AnyU8a } from './types';
import { Except, PascalCase, CamelCase } from 'type-fest';

/**
 * FIXME типизация не совсем верная. Она даёт возможность указывать несколько вариантов в одном объекте, что не ошибка,
 * но не совсем верно. Будет использоваться только самый первый.
 */
type EnumConstructFrom<E extends Enum> = string | Uint8Array | EnumConstructVariants<ExceptOfEnumBase<E>>;

type ExceptOfEnumBase<E extends Enum> = Except<E, keyof Enum>;

type ExtractVariantsFromGetters<V extends string> = V extends `${'is' | 'as'}${infer R}` ? R : never;

type EnumConstructVariants<E, Variants extends string = ExtractVariantsFromGetters<keyof E & string>> = {
    [K in Variants]: KeyValuePascalOrCamel<K, GetEnumValueConstructFrom<E, K>>;
}[Variants];

type GetEnumValueConstructFrom<E, V extends string> = E extends { [K in keyof E as `as${V}`]: infer R }
    ? GetConstructableFrom<R>
    : E extends { [K in keyof E as `is${V}`]: boolean }
    ? null
    : never;

type KeyValuePascalOrCamel<K extends string, V> = { [X in PascalCase<K>]: V } | { [X in CamelCase<K>]: V };

type MapToConstructables<T> = { [K in keyof T]: GetConstructableFrom<T[K]> };

type StructConstructFrom<T extends Struct> = Partial<MapToConstructables<Except<T, keyof Struct>>>;

type TextConstructFrom = ConstructorParameters<typeof Text>[1];

type VecConstructFrom<C extends Codec, V extends Vec<C>> = GetConstructableFrom<C>[];

// main
export type GetConstructableFrom<T> =
    | T
    | (T extends Struct
          ? StructConstructFrom<T>
          : T extends Text
          ? TextConstructFrom
          : T extends Vec<infer C>
          ? VecConstructFrom<C, T>
          : T extends UInt | Int
          ? AnyNumber
          : T extends Enum
          ? EnumConstructFrom<T>
          : T extends Raw
          ? AnyU8a
          : never);

type GetInstanceSmart<T> = T extends new (...args: any[]) => any ? InstanceType<T> : T;

export type CreateScaleFactory<
    /**
     * Heap of the types
     */
    H extends {},
> = <K extends keyof H & string, C extends H[K]>(
    type: K,
    data?: GetConstructableFrom<GetInstanceSmart<C>>,
) => GetInstanceSmart<C>;

export function createHelpers<Heap extends {}>(opts: {
    runtime: Registry;
}): {
    createScale: CreateScaleFactory<Heap>;
} {
    return {
        createScale: (typeKey, data) => opts.runtime.createType(typeKey, data) as any,
    };
}
