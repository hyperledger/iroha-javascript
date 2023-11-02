import { cryptoTypes } from '@iroha2/crypto-core'
import { Signer } from '@iroha2/client'
import { datamodel, sugar } from '@iroha2/data-model'

// Key pair from previous step
declare const keyPair: cryptoTypes.KeyPair

const accountId = datamodel.AccountId({
  // Account name
  name: 'alice',
  // The domain where this account is registered
  domain_id: datamodel.DomainId({
    name: 'wonderland',
  }),
})

// same, but shorter
const sameAccountId = sugar.accountId('alice', 'wonderland')

const signer = new Signer(accountId, keyPair)
