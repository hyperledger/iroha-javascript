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
