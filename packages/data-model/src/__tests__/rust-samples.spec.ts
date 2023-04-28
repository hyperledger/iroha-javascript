import { describe, expect, test } from 'vitest'
import SAMPLES from '../../../data-model-rust-samples/samples.json'
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
      object: lib.Expression(
        'Raw',
        lib.Value(
          'Identifiable',
          lib.IdentifiableBox(
            'Trigger',
            lib.TriggerBox(
              'Raw',
              lib.TriggerFilterBoxExecutable({
                id: lib.TriggerId({ name: 'mint_rose', domain_id: lib.OptionDomainId('None') }),
                action: lib.ActionFilterBoxExecutable({
                  executable: lib.Executable(
                    'Instructions',
                    lib.VecInstructionBox([
                      lib.InstructionBox(
                        'Mint',
                        lib.MintBox({
                          object: lib.Expression('Raw', lib.Value('Numeric', lib.NumericValue('U32', 1))),
                          destination_id: lib.Expression('Raw', lib.Value('Id', lib.IdBox('AssetId', assetId))),
                        }),
                      ),
                    ]),
                  ),
                  repeats: lib.Repeats('Indefinitely'),
                  filter: lib.FilterBox(
                    'Time',
                    lib.ExecutionTime(
                      'Schedule',
                      lib.Schedule({
                        start: lib.Duration([4141203402341234n, 0]),
                        period: lib.OptionDuration('Some', lib.Duration([3n, 0])),
                      }),
                    ),
                  ),
                  technical_account: assetId.account_id,
                  metadata: lib.Metadata({ map: lib.SortedMapNameValue(new Map()) }),
                }),
              }),
            ),
          ),
        ),
      ),
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
      object: lib.Expression(
        'Raw',
        lib.Value(
          'Identifiable',
          lib.IdentifiableBox(
            'Trigger',
            lib.TriggerBox(
              'Raw',
              lib.TriggerFilterBoxExecutable({
                id: lib.TriggerId({ name: 'mint_rose', domain_id: lib.OptionDomainId('None') }),
                action: lib.ActionFilterBoxExecutable({
                  executable: lib.Executable(
                    'Instructions',
                    lib.VecInstructionBox([
                      lib.InstructionBox(
                        'Mint',
                        lib.MintBox({
                          object: lib.Expression('Raw', lib.Value('Numeric', lib.NumericValue('U32', 1))),
                          destination_id: lib.Expression('Raw', lib.Value('Id', lib.IdBox('AssetId', assetId))),
                        }),
                      ),
                    ]),
                  ),
                  repeats: lib.Repeats('Indefinitely'),
                  filter: lib.FilterBox(
                    'Data',
                    lib.FilterOptDataEntityFilter(
                      'BySome',
                      lib.DataEntityFilter(
                        'ByAssetDefinition',
                        lib.FilterOptAssetDefinitionFilter(
                          'BySome',
                          lib.AssetDefinitionFilter({
                            origin_filter: lib.FilterOptOriginFilterAssetDefinitionEvent('AcceptAll'),
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
                  metadata: lib.Metadata({ map: lib.SortedMapNameValue(new Map()) }),
                }),
              }),
            ),
          ),
        ),
      ),
    }),
  )
}

defineCase(
  'Metadata',
  lib.Metadata,
  lib.Metadata({
    map: lib.SortedMapNameValue(
      new Map([
        // Test will fail if order is violated
        ['authentication', lib.Value('String', '80252ad79c68c01ec8946983411ce3b7cbea21d25f68c8546c687b2a7e2505cc')],
        ['email', lib.Value('String', 'user123@mail.com')],
        ['salt', lib.Value('String', 'ABCDEFG')],
      ]),
    ),
  }),
)
