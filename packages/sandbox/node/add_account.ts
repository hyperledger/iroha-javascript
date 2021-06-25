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
    const normal_account_id = createScale('AccountId', {
        name: 'xor',
        domainName: 'wonderland',
    });

    const createAccountInstruction = createScale('Instruction', {
        Register: {
            object: {
                expression: {
                    Raw: {
                        Identifiable: {
                            NewAccount: {
                                id: normal_account_id,
                            },
                        },
                    },
                },
            },
        },
    });

    await client.submitInstruction(createAccountInstruction);
    console.log('Ok!');
})().catch((err) => {
    console.error(err);
});
