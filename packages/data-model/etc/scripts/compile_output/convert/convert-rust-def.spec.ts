import { NamespaceDefinition } from '@scale-codec/definition-compiler';
import { convertRustIntrospectOutputIntoCompilerInput as convert } from './convert-rust-def';
import { RustDefinitions } from './types';

function matchOutput(input: RustDefinitions, output: NamespaceDefinition) {
    expect(convert({ input })).toEqual(output);
}

test("Converts types' self names", () => {
    matchOutput(
        {
            'iroha_data_model::transaction::RejectedTransaction': {
                Struct: {
                    declarations: [],
                },
            },
        },
        {
            RejectedTransaction: {
                t: 'struct',
                fields: [],
            },
        },
    );
});

test('Transforms Fixed Point i64 dec9 to special external type', () => {
    matchOutput(
        {
            'Fixed<i64>': {
                FixedPoint: {
                    base: 'i64',
                    decimal_places: 9,
                },
            },
        },
        {
            FixedI64: {
                t: 'import',
                module: './fixed-point',
                nameInModule: 'FixedPointI64P9',
            },
        },
    );
});

test('Handles array with u8 as bytes-array', () => {
    matchOutput(
        {
            Hash: {
                Array: {
                    ty: 'u8',
                    len: 32,
                },
            },
        },
        {
            Hash: {
                t: 'bytes-array',
                len: 32,
            },
        },
    );
});
