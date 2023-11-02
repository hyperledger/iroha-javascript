import { datamodel } from './model'

export const numericU32 = (value: number): datamodel.Value =>
  datamodel.Value('Numeric', datamodel.NumericValue('U32', value))

export const numericU128 = (value: number | bigint): datamodel.Value =>
  datamodel.Value('Numeric', datamodel.NumericValue('U128', BigInt(value)))

export const numericFixed = (value: datamodel.FixedPointI64): datamodel.Value =>
  datamodel.Value('Numeric', datamodel.NumericValue('Fixed', value))

export const newDomain = (value: datamodel.NewDomain): datamodel.Value =>
  datamodel.Value('Identifiable', datamodel.IdentifiableBox('NewDomain', value))
export const newAccount = (value: datamodel.NewAccount): datamodel.Value =>
  datamodel.Value('Identifiable', datamodel.IdentifiableBox('NewAccount', value))
export const newAssetDefinition = (value: datamodel.NewAssetDefinition): datamodel.Value =>
  datamodel.Value('Identifiable', datamodel.IdentifiableBox('NewAssetDefinition', value))
export const domain = (value: datamodel.Domain): datamodel.Value =>
  datamodel.Value('Identifiable', datamodel.IdentifiableBox('Domain', value))
export const account = (value: datamodel.Account): datamodel.Value =>
  datamodel.Value('Identifiable', datamodel.IdentifiableBox('Account', value))
export const assetDefinition = (value: datamodel.AssetDefinition): datamodel.Value =>
  datamodel.Value('Identifiable', datamodel.IdentifiableBox('AssetDefinition', value))
export const asset = (value: datamodel.Asset): datamodel.Value =>
  datamodel.Value('Identifiable', datamodel.IdentifiableBox('Asset', value))
export const domainId = (value: datamodel.DomainId): datamodel.Value =>
  datamodel.Value('Id', datamodel.IdBox('DomainId', value))
export const accountId = (value: datamodel.AccountId): datamodel.Value =>
  datamodel.Value('Id', datamodel.IdBox('AccountId', value))
export const assetDefinitionId = (value: datamodel.AssetDefinitionId): datamodel.Value =>
  datamodel.Value('Id', datamodel.IdBox('AssetDefinitionId', value))
export const assetId = (value: datamodel.AssetId): datamodel.Value =>
  datamodel.Value('Id', datamodel.IdBox('AssetId', value))
