import { cryptoTypes } from '@iroha2/crypto-core'
import { Signer } from '@iroha2/client'
import { AccountId, DomainId, sugar } from '@iroha2/data-model'

// Key pair from previous step
declare const keyPair: cryptoTypes.KeyPair

const accountId = AccountId({
  // Account name
  name: 'alice',
  // The domain where this account is registered
  domain_id: DomainId({
    name: 'wonderland',
  }),
})

// same, but shorter
const sameAccountId = sugar.accountId('alice', 'wonderland')

const signer = new Signer(accountId, keyPair)
