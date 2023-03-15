import model from './model'

export * as executable from './executable'
export * as instruction from './instruction'
export * as identifiable from './identifiable'
export * as find from './find'
export * as filter from './filter'

export const domainId = (domainName: string) => model.DomainId({ name: domainName })

export const accountId = (accountName: string, domainName: string): model.AccountId =>
  model.AccountId({
    name: accountName,
    domain_id: domainId(domainName),
  })

export const assetDefinitionId = (assetName: string, domainName: string) =>
  model.AssetDefinitionId({ name: assetName, domain_id: domainId(domainName) })

export const assetId = (account: model.AccountId, definition: model.AssetDefinitionId): model.AssetId =>
  model.AssetId({
    account_id: account,
    definition_id: definition,
  })

