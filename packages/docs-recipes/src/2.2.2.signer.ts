import { KeyPair } from '@iroha2/crypto-core'
import { Signer } from '@iroha2/client'
import { AccountId, DomainId } from '@iroha2/data-model'

declare const keyPair: KeyPair

const accountId = AccountId({
  name: 'alice',
  domain_id: DomainId({
    name: 'wonderland',
  }),
})

const signer = new Signer(accountId, keyPair)
