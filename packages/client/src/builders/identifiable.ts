import model from './model'

export const newAccount = (
  accountId: model.AccountId,
  signatories: model.PublicKey[],
  opts?: {
    metadata?: model.Metadata
  },
): model.IdentifiableBox =>
  model.IdentifiableBox(
    'NewAccount',
    model.NewAccount({
      id: accountId,
      signatories: model.VecPublicKey(signatories),
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      metadata: opts?.metadata ?? ({ map: new Map() } as model.Metadata),
    }),
  )

export const newAssetDefinition = (
  assetDefinitionId: model.AssetDefinitionId,
  type: model.AssetValueType,
  opts?: {
    metadata?: model.Metadata
    mintable?: model.Mintable
  },
): model.IdentifiableBox =>
  model.IdentifiableBox(
    'NewAssetDefinition',
    model.NewAssetDefinition({
      id: assetDefinitionId,
      value_type: type,
      mintable: opts?.mintable ?? model.Mintable('Not'),
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      metadata: opts?.metadata ?? ({ map: new Map() } as model.Metadata),
    }),
  )

export const newDomain = (
  domainName: string,
  opts?: {
    metadata?: model.Metadata
    logo?: string
  },
): model.IdentifiableBox =>
  model.IdentifiableBox(
    'NewDomain',
    model.NewDomain({
      id: model.DomainId({
        name: domainName,
      }),
      metadata: opts?.metadata ?? model.Metadata({ map: model.MapNameValue(new Map()) }),
      logo: opts?.logo ? model.OptionIpfsPath('Some', opts.logo) : model.OptionIpfsPath('None'),
    }),
  )
