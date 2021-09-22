import { DecodeResult, i64_decode, i64_encode } from '@scale-codec/definition-runtime';
import { f64ToFixnum, fixnumToF64 } from '@iroha2/i64-fixnum';

const PRECISION = 9;

export type FixedPoint_i64_9_Decoded = string;

export type FixedPoint_i64_9_Encodable = string;

export function FixedPoint_i64_9_decode(bytes: Uint8Array): DecodeResult<FixedPoint_i64_9_Decoded> {
    const [i64, count] = i64_decode(bytes);
    const f64 = fixnumToF64(i64, PRECISION);
    return [f64, count];
}

export function FixedPoint_i64_9_encode(encodable: FixedPoint_i64_9_Encodable): Uint8Array {
    const i64 = f64ToFixnum(encodable, PRECISION);
    return i64_encode(i64);
}
