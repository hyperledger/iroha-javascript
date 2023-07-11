import { datamodel } from './model'

export const newAccount = (
  accountId: datamodel.AccountId,
  signatories: datamodel.PublicKey[],
  opts?: {
    metadata?: datamodel.Metadata
  },
): datamodel.IdentifiableBox =>
  datamodel.IdentifiableBox(
    'NewAccount',
    datamodel.NewAccount({
      id: accountId,
      signatories: datamodel.VecPublicKey(signatories),
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      metadata: opts?.metadata ?? ({ map: new Map() } as datamodel.Metadata),
    }),
  )

export const newAssetDefinition = (
  assetDefinitionId: datamodel.AssetDefinitionId,
  type: datamodel.AssetValueType,
  opts?: {
    metadata?: datamodel.Metadata
    mintable?: datamodel.Mintable
  },
): datamodel.IdentifiableBox =>
  datamodel.IdentifiableBox(
    'NewAssetDefinition',
    datamodel.NewAssetDefinition({
      id: assetDefinitionId,
      value_type: type,
      mintable: opts?.mintable ?? datamodel.Mintable('Not'),
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      metadata: opts?.metadata ?? ({ map: new Map() } as datamodel.Metadata),
    }),
  )

export const newDomain = (
  domainName: string,
  opts?: {
    metadata?: datamodel.Metadata
    logo?: string
  },
): datamodel.IdentifiableBox =>
  datamodel.IdentifiableBox(
    'NewDomain',
    datamodel.NewDomain({
      id: datamodel.DomainId({
        name: domainName,
      }),
      metadata: opts?.metadata ?? datamodel.Metadata({ map: datamodel.MapNameValue(new Map()) }),
      logo: opts?.logo ? datamodel.OptionIpfsPath('Some', opts.logo) : datamodel.OptionIpfsPath('None'),
    }),
  )
