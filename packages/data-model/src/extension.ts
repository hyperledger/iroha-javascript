import * as runtime from '@scale-codec/definition-runtime'
import { bigintToF64Str, f64StrToBigint } from '@iroha2/i64-fixnum'

declare const __opaqueTag: unique symbol

type LocalOpaque<Tag, T> = { [__opaqueTag]: Tag } & T

type ParseFn<T, U> = (raw: T) => U

function fixedPointCodec<T extends string>(
  name: string,
  precision: number,
  parse: ParseFn<string, T>,
): runtime.Codec<T, T> & ParseFn<string, T> {
  const codec = runtime.trackableCodec<T>(
    name,
    runtime.encodeFactory(
      (value, walker) => {
        runtime.encodeI64(f64StrToBigint(value, precision), walker)
      },
      // i64 is always fixed 8-bytes len
      () => 8,
    ),
    (walker) => {
      const bi = runtime.decodeI64(walker)
      return bigintToF64Str(bi, precision) as T
    },
  )

  return Object.assign(parse, codec)
}

// eslint-disable-next-line max-params
function nonZeroNumCodec<T extends number | bigint, U extends T>(
  name: string,
  encode: runtime.Encode<T>,
  decode: runtime.Decode<T>,
): runtime.Codec<U> & ParseFn<T, U> {
  const codec = runtime.trackableCodec(name, encode, decode) as runtime.Codec<U>

  const parse: ParseFn<T, U> = (raw) => {
    if (raw <= 0) throw new TypeError(`Invalid ${name}: expected a non-zero value, got: ${raw}`)
    return raw as U
  }

  return Object.assign(parse, codec)
}

type FixedPointI64P9 = LocalOpaque<'FixedPointI64P9', string>
const FixedPointI64P9 = fixedPointCodec<FixedPointI64P9>('FixedPointI64P9', 9, (x) => x as FixedPointI64P9)

type NonZeroU32 = LocalOpaque<'NonZeroU32', number>
const NonZeroU32 = nonZeroNumCodec<number, NonZeroU32>('NonZeroU32', runtime.encodeU32, runtime.decodeU32)

type NonZeroU64 = LocalOpaque<'NonZeroU64', bigint>
const NonZeroU64 = nonZeroNumCodec<bigint, NonZeroU64>('NonZeroU64', runtime.encodeU64, runtime.decodeU64)

export { FixedPointI64P9, NonZeroU32, NonZeroU64 }
