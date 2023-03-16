// TODO all queries, categorised as in `iroha_client` crate

import model from './model'

export const assetsByAccountId = (accountId: model.AccountId): model.QueryBox =>
  model.QueryBox(
    'FindAssetsByAccountId',
    model.FindAssetsByAccountId({
      account_id: model.EvaluatesToAccountId({
        expression: model.Expression('Raw', model.Value('Id', model.IdBox('AccountId', accountId))),
      }),
    }),
  )

export const allDomains = () => model.QueryBox('FindAllDomains', null)

export const allAccounts = () => model.QueryBox('FindAllAccounts', null)

export const assetById = (id: model.AssetId): model.QueryBox =>
  model.QueryBox(
    'FindAssetById',
    model.FindAssetById({
      id: model.EvaluatesToAssetId({
        expression: model.Expression('Raw', model.Value('Id', model.IdBox('AssetId', id))),
      }),
    }),
  )
