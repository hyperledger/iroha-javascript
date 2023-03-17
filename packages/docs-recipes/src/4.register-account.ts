import { Client, ToriiRequirementsForApiHttp, getCryptoAnyway } from '@iroha2/client'
import { freeScope } from '@iroha2/crypto-core'
import * as model from '@iroha2/data-model'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

const crypto = getCryptoAnyway()

// generating the key pair
const accountKeyPair = freeScope((scope) => {
  const pair = crypto.KeyGenConfiguration.default().useSeed('hex', 'abcd1122').generate()
  scope.forget(pair)
  return pair
})

// extracting the public key
const publicKey = freeScope(() => accountKeyPair.publicKey().toDataModel())

await client.submitExecutable(
  toriiRequirements,
  pipe(
    model.sugar.accountId('white_rabbit', 'looking_glass'),
    (id) => model.sugar.identifiable.newAccount(id, [publicKey]),
    model.sugar.instruction.register,
    model.sugar.executable.instructions,
  ),
)
