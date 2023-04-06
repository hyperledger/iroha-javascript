import { datamodel, sugar } from '@iroha2/data-model'
import { Client, ToriiRequirementsForApiHttp } from '@iroha2/client'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

const domainId = sugar.domainId('wonderland')

const assetDefinitionId = sugar.assetDefinitionId('time', domainId)

const amountToTransfer = sugar.value.numericU32(100)

const fromAccount = sugar.accountId('alice', domainId)

const toAccount = sugar.accountId('mouse', domainId)

const transferIsi = sugar.instruction.transfer(
  datamodel.IdBox('AssetId', sugar.assetId(fromAccount, assetDefinitionId)),
  amountToTransfer,
  datamodel.IdBox('AssetId', sugar.assetId(toAccount, assetDefinitionId)),
)

await client.submitExecutable(
  toriiRequirements,
  pipe(transferIsi, sugar.executable.instructions),
)
