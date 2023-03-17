// #region pre
import * as model from '@iroha2/data-model'
import { Client, ToriiRequirementsForApiHttp } from '@iroha2/client'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

const timeDefinitionId = model.sugar.assetDefinitionId('time', 'looking_glass')
// #endregion pre

// #region register
await client.submitExecutable(
  toriiRequirements,
  pipe(
    model.sugar.identifiable.newAssetDefinition(
      timeDefinitionId, // [!code hl]
      model.AssetValueType('Quantity'),
      {
        mintable: model.Mintable('Infinitely'), // If only we could mint more time.
      },
    ),
    model.sugar.instruction.register,
    model.sugar.executable.instructions,
  ),
)
// #endregion register

{
  // #region mint
  const mintValue = model.sugar.value.numericU32(32)

  await client.submitExecutable(
    toriiRequirements,
    pipe(
      model.sugar.instruction.mint(
        mintValue,
        model.IdBox(
          'AssetId',
          model.sugar.assetId(
            model.sugar.accountId('alice', 'wonderland'),
            timeDefinitionId, // [!code hl]
          ),
        ),
      ),
      model.sugar.executable.instructions,
    ),
  )
  // #endregion mint
}
