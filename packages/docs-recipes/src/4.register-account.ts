import { Client, ToriiRequirementsForApiHttp, getCryptoAnyway } from '@iroha2/client'
import { Bytes, freeScope } from '@iroha2/crypto-core'
import { sugar } from '@iroha2/data-model'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

const crypto = getCryptoAnyway()

// generating the key pair
const accountKeyPair = freeScope((scope) => {
  const pair = crypto.KeyPair.generateFromSeed(Bytes.hex('abcd1122'))
  scope.forget(pair)
  return pair
})

// extracting the public key
const publicKey = freeScope(() => accountKeyPair.publicKey().toDataModel())

await client.submitExecutable(
  toriiRequirements,
  pipe(
    sugar.accountId('white_rabbit', 'looking_glass'),
    (id) => sugar.identifiable.newAccount(id, [publicKey]),
    sugar.instruction.register,
    sugar.executable.instructions,
  ),
)
