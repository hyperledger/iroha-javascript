import RefConverter from './RefConverter';

describe('Refs transformation', () => {
    test.each([
        ['iroha_crypto::Hash', 'iroha_crypto_Hash'],
        ['iroha_data_model::Vec<u8>', 'iroha_data_model_Vec_u8'],
        ['pipeline::Event<pipeline::Map<A, B>, C>', 'pipeline_Event_pipeline_Map_A_B_C'],
        ['Vec<u8>', 'BytesVec'],
        ['[u32; 5]', 'Array_u32_5'],
        ['String', 'str'],
        ['Vec<u32>', 'Vec_u32'],
        [
            'BTreeMap<iroha_data_model::account::Id, iroha_data_model::account::AssetId>',
            'BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_AssetId',
        ],
        [
            'BTreeMap<String, iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>>',
            'BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value',
        ],
        ['Fixed<i64>', 'i64'],
    ])('%p transformed into %p', (input, output) => {
        const sut = new RefConverter();

        expect(sut.handle(input)).toEqual(output);
    });
});

test('Extracts additional BTreeSet', () => {
    // Arrange
    const sut = new RefConverter();

    // Act
    sut.handle('BTreeSet<model::type>');

    // Assert
    expect(sut.collectedTypes).toEqual({
        BTreeSet_model_type: {
            t: 'set',
            entry: 'model_type',
        },
    });
});
