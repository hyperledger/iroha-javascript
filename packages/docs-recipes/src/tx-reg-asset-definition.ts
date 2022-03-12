import { Client } from '@iroha2/client';
import {
  AssetDefinition,
  Expression,
  Instruction,
  Value,
  IdentifiableBox,
  AssetValueType,
  Executable,
  VecInstruction,
  RegisterBox,
  EvaluatesToIdentifiableBox,
  DefinitionId,
  Id,
  Metadata,
  BTreeMapNameValue,
} from '@iroha2/data-model';

async function registerAssetDefinition({
  client,
  assetDefinition,
}: {
  client: Client;
  assetDefinition: AssetDefinition;
}): Promise<void> {
  await client.submit(
    Executable(
      'Instructions',
      VecInstruction([
        Instruction(
          'Register',
          RegisterBox({
            object: EvaluatesToIdentifiableBox({
              expression: Expression(
                'Raw',
                Value(
                  'Identifiable',
                  IdentifiableBox('AssetDefinition', assetDefinition),
                ),
              ),
            }),
          }),
        ),
      ]),
    ),
  );
}

registerAssetDefinition({
  assetDefinition: AssetDefinition({
    id: DefinitionId({
      name: 'xor',
      domain_id: Id({
        name: 'Wonderland',
      }),
    }),
    value_type: AssetValueType('Quantity'),
    mintable: false,
    metadata: Metadata({
      map: BTreeMapNameValue(new Map()),
    }),
  }),

  // for educational purposes
  client: null as any,
});
