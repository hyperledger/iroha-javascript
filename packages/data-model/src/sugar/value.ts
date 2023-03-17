import { datamodel } from './model'

export const numericU32 = (value: number): datamodel.Value =>
  datamodel.Value('Numeric', datamodel.NumericValue('U32', value))

export const numericU128 = (value: number | bigint): datamodel.Value =>
  datamodel.Value('Numeric', datamodel.NumericValue('U128', BigInt(value)))

export const numericFixed = (value: datamodel.FixedPointI64): datamodel.Value =>
  datamodel.Value('Numeric', datamodel.NumericValue('Fixed', value))

// export const newDomain = (value: model.NewDomain): model.Value =>
//   model.Value('Identifiable', model.IdentifiableBox('NewDomain', value))
// export const newAccount = (value: model.NewAccount): model.Value =>
//   model.Value('Identifiable', model.IdentifiableBox('NewAccount', value))
// export const newAssetDefinition = (value: model.NewAssetDefinition): model.Value =>
//   model.Value('Identifiable', model.IdentifiableBox('NewAssetDefinition', value))
// export const domain = (value: model.Domain): model.Value =>
//   model.Value('Identifiable', model.IdentifiableBox('Domain', value))
// export const account = (value: model.Account): model.Value =>
//   model.Value('Identifiable', model.IdentifiableBox('Account', value))
// export const assetDefinition = (value: model.AssetDefinition): model.Value =>
//   model.Value('Identifiable', model.IdentifiableBox('AssetDefinition', value))
// export const asset = (value: model.Asset): model.Value =>
//   model.Value('Identifiable', model.IdentifiableBox('Asset', value))
// export const domainId = (value: model.DomainId): model.Value => model.Value('Id', model.IdBox('DomainId', value))
// export const accountId = (value: model.AccountId): model.Value => model.Value('Id', model.IdBox('AccountId', value))
// export const assetDefinitionId = (value: model.AssetDefinitionId): model.Value =>
//   model.Value('Id', model.IdBox('AssetDefinitionId', value))
// export const assetId = (value: model.AssetId): model.Value => model.Value('Id', model.IdBox('AssetId', value))
