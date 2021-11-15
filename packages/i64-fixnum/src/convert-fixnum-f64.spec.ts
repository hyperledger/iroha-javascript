import { f64ToFixnum, fixnumToF64 } from './convert-fixnum-f64';

const CASES = [
    { repr_str: '0.0', repr_i64: '0', precision: 4 },
    { repr_str: '0.1', repr_i64: '1000', precision: 4 },
    { repr_str: '123454321.0001', repr_i64: '1234543210001', precision: 4 },
    { repr_str: '-123454321.0001', repr_i64: '-1234543210001', precision: 4 },
    { repr_str: '-5123.0', repr_i64: '-51230000', precision: 4 },
    { repr_str: '0.0', repr_i64: '0', precision: 9 },
    { repr_str: '0.1', repr_i64: '100000000', precision: 9 },
    { repr_str: '0.000000001', repr_i64: '1', precision: 9 },
    { repr_str: '-1.0', repr_i64: '-1000000000', precision: 9 },
    { repr_str: '-102023041.098872', repr_i64: '-102023041098872000', precision: 9 },
];

test.each(CASES)(
    'Two-way conversion between f64 $repr_str and i64 $repr_i64 with precision $precision',
    ({ repr_i64, repr_str, precision }) => {
        const i64 = BigInt(repr_i64);
        const f64 = repr_str;

        expect(fixnumToF64(i64, precision)).toEqual(f64);
        expect(f64ToFixnum(f64, precision)).toEqual(i64);
    },
);
