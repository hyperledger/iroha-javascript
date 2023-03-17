import { datamodel } from './model'

export * as executable from './executable'
export * as instruction from './instruction'
export * as identifiable from './identifiable'
export * as find from './find'
export * as filter from './filter'
export * as value from './value'

export const domainId = (domainName: string) => datamodel.DomainId({ name: domainName })

export const accountId = (accountName: string, domain: string | datamodel.DomainId): datamodel.AccountId =>
  datamodel.AccountId({
    name: accountName,
    domain_id: typeof domain === 'string' ? domainId(domain) : domain,
  })

export const assetDefinitionId = (assetName: string, domain: string | datamodel.DomainId) =>
  datamodel.AssetDefinitionId({ name: assetName, domain_id: typeof domain === 'string' ? domainId(domain) : domain })

export const assetId = (account: datamodel.AccountId, definition: datamodel.AssetDefinitionId): datamodel.AssetId =>
  datamodel.AssetId({
    account_id: account,
    definition_id: definition,
  })
