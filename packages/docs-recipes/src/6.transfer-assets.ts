import * as model from '@iroha2/data-model'
import { Client, ToriiRequirementsForApiHttp, build } from '@iroha2/client'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

const domainId = build.domainId('wonderland')

const assetDefinitionId = build.assetDefinitionId('time', domainId)

const amountToTransfer = build.value.numericU32(100)

const fromAccount = build.accountId('alice', domainId)

const toAccount = build.accountId('mouse', domainId)

const transferIsi = build.instruction.transfer(
  model.IdBox('AssetId', build.assetId(fromAccount, assetDefinitionId)),
  amountToTransfer,
  model.IdBox('AssetId', build.assetId(toAccount, assetDefinitionId)),
)

await client.submitExecutable(
  toriiRequirements,
  pipe(transferIsi, build.executable.instruction),
)
