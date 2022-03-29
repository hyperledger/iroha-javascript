import SAMPLES from '../../../data-model-rust-samples/output.json'
import * as lib from '../lib'
import { toHex, fromHex } from '@scale-codec/util'

// eslint-disable-next-line max-params
function defineCase<T>(label: keyof typeof SAMPLES, codec: lib.Codec<T>, value: T) {
  const sample = SAMPLES[label]

  describe(label, () => {
    test('encode', () => {
      expect(toHex(codec.toBuffer(value))).toEqual(sample.encoded)
    })

    test('decode', () => {
      expect(codec.fromBuffer(fromHex(sample.encoded))).toEqual(value)
    })
  })
}

defineCase(
  'AccountId',
  lib.AccountId,
  lib.AccountId({
    name: 'alice',
    domain_id: lib.Id({
      name: 'wonderland',
    }),
  }),
)

defineCase(
  'DomainId',
  lib.Id,
  lib.Id({
    name: 'Hey',
  }),
)

defineCase(
  'AssetDefinitionId',
  lib.DefinitionId,
  lib.DefinitionId({
    name: 'rose',
    domain_id: lib.Id({
      name: 'wonderland',
    }),
  }),
)

{
  const assetId = lib.AssetId({
    account_id: lib.AccountId({
      name: 'alice',
      domain_id: lib.Id({
        name: 'wonderland',
      }),
    }),
    definition_id: lib.DefinitionId({
      name: 'rose',
      domain_id: lib.Id({
        name: 'wonderland',
      }),
    }),
  })

  defineCase(
    'Time-based Trigger ISI',
    lib.RegisterBox,
    lib.RegisterBox({
      object: lib.EvaluatesToIdentifiableBox({
        expression: lib.Expression(
          'Raw',
          lib.Value(
            'Identifiable',
            lib.IdentifiableBox(
              'Trigger',
              lib.Trigger({
                id: lib.Id({ name: 'mint_rose' }),
                action: lib.Action({
                  executable: lib.Executable(
                    'Instructions',
                    lib.VecInstruction([
                      lib.Instruction(
                        'Mint',
                        lib.MintBox({
                          object: lib.EvaluatesToValue({ expression: lib.Expression('Raw', lib.Value('U32', 1)) }),
                          destination_id: lib.EvaluatesToIdBox({
                            expression: lib.Expression('Raw', lib.Value('Id', lib.IdBox('AssetId', assetId))),
                          }),
                        }),
                      ),
                    ]),
                  ),
                  repeats: lib.Repeats('Indefinitely'),
                  filter: lib.EventFilter(
                    'Time',
                    lib.TimeSchedule({
                      start: lib.TimeDuration([4141203402341234n, 0]),
                      period: lib.OptionTimeDuration('Some', lib.TimeDuration([3n, 0])),
                    }),
                  ),
                  technical_account: assetId.account_id,
                }),
                metadata: lib.Metadata({ map: new Map() as lib.BTreeMapNameValue }),
              }),
            ),
          ),
        ),
      }),
    }),
  )
}
