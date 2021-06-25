import { createDSL } from '../dsl';
import { Compact, u128, Struct } from '@iroha/scale-codec-legacy';
import { create_blake2b_32_hash } from '@iroha/crypto/common';

describe('Building query', () => {
    const { createScale, registry } = createDSL();

    const ENCODED_QUERY_BOX = [1, 13, 4, 0, 16, 52, 49, 50, 51, 24, 102, 97, 102, 97, 102, 97];
    const queryBox = createScale('QueryBox', {
        FindAccountById: {
            id: {
                expression: {
                    Raw: {
                        Id: {
                            AccountId: {
                                name: '4123',
                                domainName: 'fafafa',
                            },
                        },
                    },
                },
            },
        },
    });

    test('QueryBox', () => {
        expect(queryBox.toU8a()).toEqual(Uint8Array.from(ENCODED_QUERY_BOX));
    });

    const ENCODED_QUERY_REQUEST = [
        11, 223, 79, 78, 61, 122, 1, 1, 13, 4, 0, 16, 52, 49, 50, 51, 24, 102, 97, 102, 97, 102, 97,
    ];
    const ENCODED_QUERY_REQUEST_TIMESTAMP_MS = 1624526180319;
    const queryRequest = new Struct(
        registry,
        {
            timestamp: 'Compact',
            query: 'QueryBox',
        },
        {
            timestamp: new Compact(registry, u128, ENCODED_QUERY_REQUEST_TIMESTAMP_MS),
            query: queryBox,
        },
    );

    test('QueryRequest', () => {
        expect(queryRequest.toU8a()).toEqual(Uint8Array.from(ENCODED_QUERY_REQUEST));
    });

    const PAYLOAD_FOR_HASH_BYTES = [
        1, 13, 4, 0, 16, 52, 49, 50, 51, 24, 102, 97, 102, 97, 102, 97, 223, 79, 78, 61, 122, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
    ];
    const queryRequestPayloadForHash: Uint8Array = Uint8Array.from([
        ...queryBox.toU8a(),
        ...new u128(registry, ENCODED_QUERY_REQUEST_TIMESTAMP_MS).toU8a(),
    ]);

    test('QueryRequest payload, that will be hashed', () => {
        expect(queryRequestPayloadForHash).toEqual(Uint8Array.from(PAYLOAD_FOR_HASH_BYTES));
    });

    const PAYLOAD_HASH = [
        227, 77, 18, 8, 198, 26, 134, 173, 235, 12, 86, 192, 158, 50, 63, 246, 48, 175, 45, 121, 222, 41, 45, 52, 73,
        174, 236, 39, 117, 46, 130, 167,
    ];

    test('QueryRequest hash result', () => {
        const hashed = create_blake2b_32_hash(queryRequestPayloadForHash);

        expect(hashed).toEqual(Uint8Array.from(PAYLOAD_HASH));
    });

    // const PUB_KEY_BYTES: number[] = [
    //     114, 51, 191, 200, 157, 203, 214, 140, 25, 253, 230, 206, 97, 88, 34, 82, 152, 236, 17, 49, 182, 161, 48, 209,
    //     174, 180, 84, 193, 171, 81, 131, 192,
    // ];
    // const PRIV_KEY_BYTES: number[] = [
    //     154, 196, 122, 191, 89, 179, 86, 224, 189, 125, 203, 187, 180, 222, 192, 128, 227, 2, 21, 106, 72, 202, 144,
    //     126, 71, 203, 106, 234, 29, 50, 113, 158, 114, 51, 191, 200, 157, 203, 214, 140, 25, 253, 230, 206, 97, 88, 34,
    //     82, 152, 236, 17, 49, 182, 161, 48, 209, 174, 180, 84, 193, 171, 81, 131, 192,
    // ];
    // const SIGNATURE_BYTES: number[] = [
    //     239, 112, 240, 98, 223, 220, 90, 94, 214, 205, 177, 83, 236, 78, 18, 84, 68, 69, 9, 190, 29, 153, 132, 76, 161,
    //     76, 225, 133, 17, 197, 61, 11, 179, 75, 51, 58, 104, 16, 6, 75, 146, 254, 159, 136, 198, 156, 106, 180, 176, 8,
    //     110, 108, 75, 160, 145, 78, 230, 144, 162, 116, 43, 205, 134, 15,
    // ];

    // test('signature of QueryRequest', () => {
    //     const signature = createScale('Signature', {
    //         publicKey: {
    //             digestFunction: 'ed25519',
    //             payload: createScale('Bytes', PUB_KEY_BYTES),
    //         },
    //         signature: createScale('Bytes', [
    //             ...sign_with_ed25519_sha512(
    //                 create_blake2b_32_hash(queryRequestPayloadForHash),
    //                 Uint8Array.from(PRIV_KEY_BYTES),
    //             ),
    //         ]),
    //     });

    //     console.log(signature.toU8a());

    //     expect(signature.toU8a()).toEqual(Uint8Array.from(SIGNATURE_BYTES));
    // });
});
