import { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha/crypto/common';
import { IrohaClient } from '@iroha/client';

const client = new IrohaClient({
    publicKey: {
        digest: 'ed0120',
        hex: 'e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    privateKey: {
        digest: 'ed25519',
        hex: 'de757bcb79f4c63e8fa0795edc26f86dfdba189b846e903d0b732bb644607720e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
    },
    baseUrl: 'http://localhost:8080',
    account: {
        name: 'alice',
        domainName: 'wonderland',
    },
    hasher: create_blake2b_32_hash,
    signer: sign_with_ed25519_sha512,
});

(async function () {
    const result = await client.request(
        client.createScale('QueryBox', {
            FindAllAccounts: {},
        }),
    );

    for (const i of result.asVec) {
        const {
            id: { domainName, name },
        } = i.asIdentifiable.asAccount;

        console.log('Account: %s -> %s', domainName.toString(), name.toString());
    }
})();
