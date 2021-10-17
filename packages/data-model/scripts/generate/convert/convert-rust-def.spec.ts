import { NamespaceDefinition } from '@scale-codec/definition-compiler';
import { convertRustIntrospectOutputIntoCompilerInput as convert } from './convert-rust-def';
import { RustDefinitions } from './types';

test("Converts types' self names", () => {
    expect(
        convert({
            input: {
                'iroha_data_model::transaction::RejectedTransaction': {
                    Struct: {
                        declarations: [],
                    },
                },
            },
        }),
    ).toEqual({
        iroha_data_model_transaction_RejectedTransaction: {
            t: 'struct',
            fields: [],
        },
    });
});

test('Transforms Fixed Point i64 dec9 to special external type', () => {
    const input: RustDefinitions = {
        'Fixed<i64>': {
            FixedPoint: {
                base: 'i64',
                decimal_places: 9,
            },
        },
    };
    const expectedOutput: NamespaceDefinition = {
        Fixed_i64: {
            t: 'external',
            module: './fixed_points',
            nameInModule: 'FixedPoint_i64_9',
        },
    };

    const output = convert({ input });

    expect(output).toEqual(expectedOutput);
});

// test('Fixed<i64> -> i64', () => {
//     expect(
//         convert({
//             input: {
//                 Value: {
//                     Enum: {
//                         variants: [{ name: 'Fixed', discriminant: 0, ty: 'Fixed<i64>' }],
//                     },
//                 },
//             },
//         }),
//     ).toEqual({
//         Value: {
//             t: 'enum',
//             variants: [
//                 {
//                     name: 'Fixed',
//                     discriminant: 0,
//                     ref: 'i64',
//                 },
//             ],
//         },
//     });
// });
