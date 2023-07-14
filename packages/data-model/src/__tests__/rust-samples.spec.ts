import { describe, expect, test } from 'vitest'
import SAMPLES from '../../../data-model-rust-samples/samples.json'
import { type Codec, datamodel } from '../lib'
import { fromHex, toHex } from '@scale-codec/util'

// eslint-disable-next-line max-params
function defineCase<T>(label: keyof typeof SAMPLES, codec: Codec<T>, value: T) {
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
  datamodel.AccountId,
  datamodel.AccountId({
    name: 'alice',
    domain_id: datamodel.DomainId({
      name: 'wonderland',
    }),
  }),
)

defineCase(
  'DomainId',
  datamodel.DomainId,
  datamodel.DomainId({
    name: 'Hey',
  }),
)

defineCase(
  'AssetDefinitionId',
  datamodel.AssetDefinitionId,
  datamodel.AssetDefinitionId({
    name: 'rose',
    domain_id: datamodel.DomainId({
      name: 'wonderland',
    }),
  }),
)

{
  const assetId = datamodel.AssetId({
    account_id: datamodel.AccountId({
      name: 'alice',
      domain_id: datamodel.DomainId({
        name: 'wonderland',
      }),
    }),
    definition_id: datamodel.AssetDefinitionId({
      name: 'rose',
      domain_id: datamodel.DomainId({
        name: 'wonderland',
      }),
    }),
  })

  defineCase(
    'Time-based Trigger ISI',
    datamodel.RegisterBox,
    datamodel.RegisterBox({
      object: datamodel.Expression(
        'Raw',
        datamodel.Value(
          'Identifiable',
          datamodel.IdentifiableBox(
            'Trigger',
            datamodel.TriggerBox(
              'Raw',
              datamodel.TriggerFilterBoxExecutable({
                id: datamodel.TriggerId({ name: 'mint_rose', domain_id: datamodel.OptionDomainId('None') }),
                action: datamodel.ActionFilterBoxExecutable({
                  executable: datamodel.Executable(
                    'Instructions',
                    datamodel.VecInstructionBox([
                      datamodel.InstructionBox(
                        'Mint',
                        datamodel.MintBox({
                          object: datamodel.Expression(
                            'Raw',
                            datamodel.Value('Numeric', datamodel.NumericValue('U32', 1)),
                          ),
                          destination_id: datamodel.Expression(
                            'Raw',
                            datamodel.Value('Id', datamodel.IdBox('AssetId', assetId)),
                          ),
                        }),
                      ),
                    ]),
                  ),
                  repeats: datamodel.Repeats('Indefinitely'),
                  filter: datamodel.FilterBox(
                    'Time',
                    datamodel.ExecutionTime(
                      'Schedule',
                      datamodel.Schedule({
                        start: datamodel.Duration([4141203402341234n, 0]),
                        period: datamodel.OptionDuration('Some', datamodel.Duration([3n, 0])),
                      }),
                    ),
                  ),
                  authority: assetId.account_id,
                  metadata: datamodel.Metadata({ map: datamodel.SortedMapNameValue(new Map()) }),
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
  const assetId = datamodel.AssetId({
    account_id: datamodel.AccountId({
      name: 'alice',
      domain_id: datamodel.DomainId({
        name: 'wonderland',
      }),
    }),
    definition_id: datamodel.AssetDefinitionId({
      name: 'rose',
      domain_id: datamodel.DomainId({
        name: 'wonderland',
      }),
    }),
  })

  defineCase(
    'Event-based Trigger ISI',
    datamodel.RegisterBox,
    datamodel.RegisterBox({
      object: datamodel.Expression(
        'Raw',
        datamodel.Value(
          'Identifiable',
          datamodel.IdentifiableBox(
            'Trigger',
            datamodel.TriggerBox(
              'Raw',
              datamodel.TriggerFilterBoxExecutable({
                id: datamodel.TriggerId({ name: 'mint_rose', domain_id: datamodel.OptionDomainId('None') }),
                action: datamodel.ActionFilterBoxExecutable({
                  executable: datamodel.Executable(
                    'Instructions',
                    datamodel.VecInstructionBox([
                      datamodel.InstructionBox(
                        'Mint',
                        datamodel.MintBox({
                          object: datamodel.Expression(
                            'Raw',
                            datamodel.Value('Numeric', datamodel.NumericValue('U32', 1)),
                          ),
                          destination_id: datamodel.Expression(
                            'Raw',
                            datamodel.Value('Id', datamodel.IdBox('AssetId', assetId)),
                          ),
                        }),
                      ),
                    ]),
                  ),
                  repeats: datamodel.Repeats('Indefinitely'),
                  filter: datamodel.FilterBox(
                    'Data',
                    datamodel.FilterOptDataEntityFilter(
                      'BySome',
                      datamodel.DataEntityFilter(
                        'ByAssetDefinition',
                        datamodel.FilterOptAssetDefinitionFilter(
                          'BySome',
                          datamodel.AssetDefinitionFilter({
                            origin_filter: datamodel.FilterOptOriginFilterAssetDefinitionEvent('AcceptAll'),
                            event_filter: datamodel.FilterOptAssetDefinitionEventFilter(
                              'BySome',
                              datamodel.AssetDefinitionEventFilter('ByCreated'),
                            ),
                          }),
                        ),
                      ),
                    ),
                  ),
                  authority: assetId.account_id,
                  metadata: datamodel.Metadata({ map: datamodel.SortedMapNameValue(new Map()) }),
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
  datamodel.Metadata,
  datamodel.Metadata({
    map: datamodel.SortedMapNameValue(
      new Map([
        // Test will fail if order is violated
        [
          'authentication',
          datamodel.Value('String', '80252ad79c68c01ec8946983411ce3b7cbea21d25f68c8546c687b2a7e2505cc'),
        ],
        ['email', datamodel.Value('String', 'user123@mail.com')],
        ['salt', datamodel.Value('String', 'ABCDEFG')],
      ]),
    ),
  }),
)
