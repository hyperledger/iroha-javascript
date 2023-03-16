import {
  Client,
  ToriiRequirementsForApiHttp,
  build,
  getCryptoAnyway,
} from '@iroha2/client'
import { freeScope } from '@iroha2/crypto-core'
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
    build.accountId('white_rabbit', 'looking_glass'),
    (id) => build.identifiable.newAccount(id, [publicKey]),
    build.instruction.register,
    build.executable.instruction,
  ),
)
