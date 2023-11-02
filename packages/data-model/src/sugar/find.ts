// TODO all queries, categorised as in `iroha_client` crate

import { datamodel } from './model'

export const assetsByAccountId = (accountId: datamodel.AccountId): datamodel.QueryBox =>
  datamodel.QueryBox(
    'FindAssetsByAccountId',
    datamodel.FindAssetsByAccountId({
      account_id: datamodel.Expression('Raw', datamodel.Value('Id', datamodel.IdBox('AccountId', accountId))),
    }),
  )

export const allDomains = () => datamodel.QueryBox('FindAllDomains')
export const allAccounts = () => datamodel.QueryBox('FindAllAccounts')
export const allAssets = () => datamodel.QueryBox('FindAllAssets')
export const allAssetsDefinitions = () => datamodel.QueryBox('FindAllAssetsDefinitions')

export const assetById = (id: datamodel.AssetId): datamodel.QueryBox =>
  datamodel.QueryBox(
    'FindAssetById',
    datamodel.FindAssetById({
      id: datamodel.Expression('Raw', datamodel.Value('Id', datamodel.IdBox('AssetId', id))),
    }),
  )
