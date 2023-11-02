// #region pre
import { datamodel, sugar } from '@iroha2/data-model'
import { Client, ToriiRequirementsForApiHttp } from '@iroha2/client'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

const timeDefinitionId = sugar.assetDefinitionId('time', 'looking_glass')
// #endregion pre

// #region register
await client.submitExecutable(
  toriiRequirements,
  pipe(
    sugar.identifiable.newAssetDefinition(
      timeDefinitionId, // [!code hl]
      datamodel.AssetValueType('Quantity'),
      {
        mintable: datamodel.Mintable('Infinitely'), // If only we could mint more time.
      },
    ),
    sugar.instruction.register,
    sugar.executable.instructions,
  ),
)
// #endregion register

{
  // #region mint
  const mintValue = sugar.value.numericU32(32)

  await client.submitExecutable(
    toriiRequirements,
    pipe(
      sugar.instruction.mint(
        mintValue,
        datamodel.IdBox(
          'AssetId',
          sugar.assetId(
            sugar.accountId('alice', 'wonderland'),
            timeDefinitionId, // [!code hl]
          ),
        ),
      ),
      sugar.executable.instructions,
    ),
  )
  // #endregion mint
}
