import { encodeI64, decodeI64, encodeFactory, CodecImpl, Decode } from '@scale-codec/definition-runtime';
import { f64StrToBigint, bigintToF64Str } from '@iroha2/i64-fixnum';

const PRECISION = 9;

const encoder = encodeFactory<string>(
    (value, walker) => {
        encodeI64(f64StrToBigint(value, PRECISION), walker);
    },
    // i64 is always fixed 8-bytes len
    () => 8,
);

const decoder: Decode<string> = (walker) => {
    const bi = decodeI64(walker);
    return bigintToF64Str(bi, PRECISION);
};

export const FixedPointI64P9 = new CodecImpl<string>('FixedPointI64P9', encoder, decoder);
