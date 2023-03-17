import * as model from '@iroha2/data-model'
import { Client, ToriiRequirementsForApiHttp } from '@iroha2/client'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

const domainId = model.sugar.domainId('wonderland')

const assetDefinitionId = model.sugar.assetDefinitionId('time', domainId)

const amountToTransfer = model.sugar.value.numericU32(100)

const fromAccount = model.sugar.accountId('alice', domainId)

const toAccount = model.sugar.accountId('mouse', domainId)

const transferIsi = model.sugar.instruction.transfer(
  model.IdBox('AssetId', model.sugar.assetId(fromAccount, assetDefinitionId)),
  amountToTransfer,
  model.IdBox('AssetId', model.sugar.assetId(toAccount, assetDefinitionId)),
)

await client.submitExecutable(
  toriiRequirements,
  pipe(transferIsi, model.sugar.executable.instructions),
)
