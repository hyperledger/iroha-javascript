import model from './model'

export * as executable from './executable'
export * as instruction from './instruction'
export * as identifiable from './identifiable'
export * as find from './find'
export * as filter from './filter'
export * as value from './value'

export const domainId = (domainName: string) => model.DomainId({ name: domainName })

export const accountId = (accountName: string, domain: string | model.DomainId): model.AccountId =>
  model.AccountId({
    name: accountName,
    domain_id: typeof domain === 'string' ? domainId(domain) : domain,
  })

export const assetDefinitionId = (assetName: string, domain: string | model.DomainId) =>
  model.AssetDefinitionId({ name: assetName, domain_id: typeof domain === 'string' ? domainId(domain) : domain })

export const assetId = (account: model.AccountId, definition: model.AssetDefinitionId): model.AssetId =>
  model.AssetId({
    account_id: account,
    definition_id: definition,
  })
