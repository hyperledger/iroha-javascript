import { IrohaClient } from '@iroha/client';
import { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/common';
import keys from '../config/keys';

const client = new IrohaClient({
    ...keys,
    baseUrl: 'http://localhost:8080',
    account: {
        name: 'alice',
        domainName: 'wonderland',
    },
    hasher: create_blake2b_32_hash,
    signer: sign_with_ed25519_sha512,
});

const { createScale } = client;

(async function () {
    const mintBox = createScale('MintBox', {
        object: {
            expression: {
                Raw: {
                    U32: 100,
                },
            },
        },
        destinationId: {
            expression: {
                Raw: {
                    Id: {
                        AssetId: {
                            definitionId: {
                                name: 'rose',
                                domainName: 'wonderland',
                            },
                            accountId: {
                                name: 'alice',
                                domainName: 'wonderland',
                            },
                        },
                    },
                },
            },
        },
    });

    console.log([...mintBox.toU8a()]);

    await client.submitInstruction(
        createScale('Instruction', {
            Mint: mintBox,
        }),
    );
})();
