# @iroha/client

### Usage example (in browser)

```ts
import { IrohaClient } from '@iroha/client';
import init, { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/esm';

const client = new IrohaClient({
    publicKey: {
        digest: 'ed0120',
        hex: 'e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    privateKey: {
        digest: 'ed25519',
        hex: 'de757bcb79f4c63e8fa0795edc26f86dfdba189b846e903d0b732bb644607720e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    baseUrl: 'http://localhost:3000',
    account: {
        name: 'alice',
        domainName: 'wonderland',
    },
    hasher: create_blake2b_32_hash,
    signer: sign_with_ed25519_sha512,
});

const { createScale } = client;

(async function () {
    // This item can be removed in node.js (with the import, of course)
    await init();

    const normal_account_id = createScale('AccountId');

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
})();
```
