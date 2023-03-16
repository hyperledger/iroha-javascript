// #region pre
import * as model from '@iroha2/data-model'
import { Client, ToriiRequirementsForApiHttp, build } from '@iroha2/client'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

const timeDefinitionId = build.assetDefinitionId('time', 'looking_glass')
// #endregion pre

// #region register
await client.submitExecutable(
  toriiRequirements,
  pipe(
    build.identifiable.newAssetDefinition(
      timeDefinitionId, // [!code hl]
      model.AssetValueType('Quantity'),
      {
        mintable: model.Mintable('Infinitely'), // If only we could mint more time.
      },
    ),
    build.instruction.register,
    build.executable.instruction,
  ),
)
// #endregion register

{
  // #region mint
  const mintValue = build.value.numericU32(32)

  await client.submitExecutable(
    toriiRequirements,
    pipe(
      build.instruction.mint(
        mintValue,
        model.IdBox(
          'AssetId',
          build.assetId(
            build.accountId('alice', 'wonderland'),
            timeDefinitionId, // [!code hl]
          ),
        ),
      ),
      build.executable.instruction,
    ),
  )
  // #endregion mint
}
