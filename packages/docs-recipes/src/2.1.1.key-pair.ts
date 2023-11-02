import { crypto } from '@iroha2/crypto-target-node'

const keyPair1 = crypto.KeyPair.fromJSON({
  public_key: 'ed0120e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
  private_key: {
    digest_function: 'ed25519',
    payload:
      'de757bcb79f4c63e8fa0795edc26f86dfdba189b846e903d0b732bb644607720e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
  },
})

const keyPair2 = crypto.KeyGenConfiguration.default().useSeed('hex', '001122').generate()

const keyPair3 = crypto.KeyGenConfiguration.default()
  .usePrivateKey(keyPair2.privateKey())
  .generate()
