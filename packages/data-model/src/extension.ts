import {
  Codec,
  Decode,
  Encode,
  decodeI64,
  decodeU8,
  encodeFactory,
  encodeI64,
  encodeU8,
  trackableCodec,
} from '@scale-codec/definition-runtime'
import { bigintToF64Str, f64StrToBigint } from '@iroha2/i64-fixnum'

declare const __opaqueTag: unique symbol

type LocalOpaque<Tag, T> = { [__opaqueTag]: Tag } & T

type ParseFn<T, U> = (raw: T) => U

function fixedPointCodec<T extends string>(
  name: string,
  precision: number,
  parse: ParseFn<string, T>,
): Codec<T, T> & ParseFn<string, T> {
  const codec = trackableCodec<T>(
    name,
    encodeFactory(
      (value, walker) => {
        encodeI64(f64StrToBigint(value, precision), walker)
      },
      // i64 is always fixed 8-bytes len
      () => 8,
    ),
    (walker) => {
      const bi = decodeI64(walker)
      return bigintToF64Str(bi, precision) as T
    },
  )

  return Object.assign(parse, codec)
}

// eslint-disable-next-line max-params
function nonZeroNumCodec<T extends number>(
  name: string,
  encode: Encode<number>,
  decode: Decode<number>,
  parse: ParseFn<number, T>,
): Codec<T> & ParseFn<number, T> {
  const codec = trackableCodec(name, encode, decode) as Codec<T>
  return Object.assign(parse, codec)
}

type FixedPointI64P9 = LocalOpaque<'FixedPointI64P9', string>

const FixedPointI64P9 = fixedPointCodec<FixedPointI64P9>('FixedPointI64P9', 9, (x) => x as FixedPointI64P9)

type NonZeroU8 = LocalOpaque<'NonZeroU8', number>

const NonZeroU8 = nonZeroNumCodec<NonZeroU8>('NonZeroU8', encodeU8, decodeU8, (num) => {
  if (num <= 0) throw new Error(`Expected "${num}" to be non-zero u8`)
  return num as NonZeroU8
})

export { FixedPointI64P9, NonZeroU8 }
