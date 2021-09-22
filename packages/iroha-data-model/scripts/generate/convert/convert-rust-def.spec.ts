import { convertRustIntrospectOutputIntoCompilerInput as convert } from './convert-rust-def';

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
