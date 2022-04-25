import { describe, expect, test } from 'vitest'
import SAMPLES from '../../../data-model-rust-samples/output.json'
import * as lib from '../lib'
import { fromHex, toHex } from '@scale-codec/util'

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
    domain_id: lib.DomainId({
      name: 'wonderland',
    }),
  }),
)

defineCase(
  'DomainId',
  lib.DomainId,
  lib.DomainId({
    name: 'Hey',
  }),
)

defineCase(
  'AssetDefinitionId',
  lib.AssetDefinitionId,
  lib.AssetDefinitionId({
    name: 'rose',
    domain_id: lib.DomainId({
      name: 'wonderland',
    }),
  }),
)

{
  const assetId = lib.AssetId({
    account_id: lib.AccountId({
      name: 'alice',
      domain_id: lib.DomainId({
        name: 'wonderland',
      }),
    }),
    definition_id: lib.AssetDefinitionId({
      name: 'rose',
      domain_id: lib.DomainId({
        name: 'wonderland',
      }),
    }),
  })

  defineCase(
    'Time-based Trigger ISI',
    lib.RegisterBox,
    lib.RegisterBox({
      object: lib.EvaluatesToRegistrableBox({
        expression: lib.Expression(
          'Raw',
          lib.Value(
            'Identifiable',
            lib.IdentifiableBox(
              'Trigger',
              lib.Trigger({
                id: lib.DomainId({ name: 'mint_rose' }),
                action: lib.Action({
                  executable: lib.Executable(
                    'Instructions',
                    lib.VecInstruction([
                      lib.Instruction(
                        'Mint',
                        lib.MintBox({
                          object: lib.EvaluatesToValue({ expression: lib.Expression('Raw', lib.Value('U32', 1)) }),
                          destination_id: lib.EvaluatesToRegistrableBox({
                            expression: lib.Expression('Raw', lib.Value('Id', lib.IdBox('AssetId', assetId))),
                          }),
                        }),
                      ),
                    ]),
                  ),
                  repeats: lib.Repeats('Indefinitely'),
                  filter: lib.EventFilter(
                    'Time',
                    lib.ExecutionTime(
                      'Schedule',
                      lib.TimeSchedule({
                        start: lib.Duration([4141203402341234n, 0]),
                        period: lib.OptionDuration('Some', lib.Duration([3n, 0])),
                      }),
                    ),
                  ),
                  technical_account: assetId.account_id,
                }),
                metadata: lib.Metadata({ map: lib.MapNameValue(new Map()) }),
              }),
            ),
          ),
        ),
      }),
    }),
  )
}

{
  const assetId = lib.AssetId({
    account_id: lib.AccountId({
      name: 'alice',
      domain_id: lib.DomainId({
        name: 'wonderland',
      }),
    }),
    definition_id: lib.AssetDefinitionId({
      name: 'rose',
      domain_id: lib.DomainId({
        name: 'wonderland',
      }),
    }),
  })

  defineCase(
    'Event-based Trigger ISI',
    lib.RegisterBox,
    lib.RegisterBox({
      object: lib.EvaluatesToRegistrableBox({
        expression: lib.Expression(
          'Raw',
          lib.Value(
            'Identifiable',
            lib.IdentifiableBox(
              'Trigger',
              lib.Trigger({
                id: lib.DomainId({ name: 'mint_rose' }),
                action: lib.Action({
                  executable: lib.Executable(
                    'Instructions',
                    lib.VecInstruction([
                      lib.Instruction(
                        'Mint',
                        lib.MintBox({
                          object: lib.EvaluatesToValue({ expression: lib.Expression('Raw', lib.Value('U32', 1)) }),
                          destination_id: lib.EvaluatesToRegistrableBox({
                            expression: lib.Expression('Raw', lib.Value('Id', lib.IdBox('AssetId', assetId))),
                          }),
                        }),
                      ),
                    ]),
                  ),
                  repeats: lib.Repeats('Indefinitely'),
                  filter: lib.EventFilter(
                    'Data',
                    lib.FilterOptEntityFilter(
                      'BySome',
                      lib.EntityFilter(
                        'ByAssetDefinition',
                        lib.FilterOptAssetDefinitionFilter(
                          'BySome',
                          lib.AssetDefinitionFilter({
                            id_filter: lib.FilterOptIdFilterAssetDefinitionId('AcceptAll'),
                            event_filter: lib.FilterOptAssetDefinitionEventFilter(
                              'BySome',
                              lib.AssetDefinitionEventFilter('ByCreated'),
                            ),
                          }),
                        ),
                      ),
                    ),
                  ),
                  technical_account: assetId.account_id,
                }),
                metadata: lib.Metadata({ map: lib.MapNameValue(new Map()) }),
              }),
            ),
          ),
        ),
      }),
    }),
  )
}

test('Metadata', () => {
  const HEX =
    '0c 38 61 75 74 68 65 6e 74 69 63 61 74 69 6f 6e 03 01 01 38 30 32 35 32 61 64 37 39 63 36 38 63 30 31 65 63 38 39 34 36 39 38 33 34 31 31 63 65 33 62 37 63 62 65 61 32 31 64 32 35 66 36 38 63 38 35 34 36 63 36 38 37 62 32 61 37 65 32 35 30 35 63 63 14 65 6d 61 69 6c 03 40 75 73 65 72 31 32 33 40 6d 61 69 6c 2e 63 6f 6d 10 73 61 6c 74 03 1c 41 42 43 44 45 46 47'

  const JS = lib.Metadata({
    map: lib.MapNameValue(
      new Map([
        ['authentication', lib.Value('String', '80252ad79c68c01ec8946983411ce3b7cbea21d25f68c8546c687b2a7e2505cc')],
        ['email', lib.Value('String', 'user123@mail.com')],
        ['salt', lib.Value('String', 'ABCDEFG')],
      ]),
    ),
  })

  expect(toHex(lib.Metadata.toBuffer(JS))).toEqual(HEX)
  expect(lib.Metadata.fromBuffer(fromHex(HEX))).toEqual(JS)
})
