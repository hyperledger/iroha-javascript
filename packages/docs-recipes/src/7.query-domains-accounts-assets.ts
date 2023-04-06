// #region intro
import { Client, ToriiRequirementsForApiHttp } from '@iroha2/client'
import { sugar } from '@iroha2/data-model'

declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp
// #endregion intro

{
  // #region domains
  const result = await client.requestWithQueryBox(
    toriiRequirements,
    sugar.find.allDomains(),
  )

  const domains = result
    .as('Ok')
    .result.enum.as('Vec')
    .map((x) => x.enum.as('Identifiable').enum.as('Domain'))

  for (const domain of domains) {
    console.log(
      `Domain "${domain.id.name}" has ${domain.accounts.size} accounts` +
        ` and ${domain.asset_definitions.size} asset definitions`,
    )
    // => Domain "wonderland" has 5 accounts and 3 asset definitions
  }
  // #endregion domains
}

{
  // #region accounts
  const result = await client.requestWithQueryBox(
    toriiRequirements,
    sugar.find.allAccounts(),
  )

  const accounts = result
    .as('Ok')
    .result.enum.as('Vec')
    .map((x) => x.enum.as('Identifiable').enum.as('Account'))

  for (const account of accounts) {
    console.log(
      `Account "${account.id.name}@${account.id.domain_id.name}" ` +
        `has ${account.assets.size} assets`,
    )
    // => Account "alice@wonderland" has 3 assets
  }
  // #endregion accounts
}

{
  // #region assets
  const result = await client.requestWithQueryBox(
    toriiRequirements,
    sugar.find.allAssets(),
  )

  const assets = result
    .as('Ok')
    .result.enum.as('Vec')
    .map((x) => x.enum.as('Identifiable').enum.as('Asset'))

  for (const asset of assets) {
    console.log(
      `Asset "${asset.id.definition_id.name}#${asset.id.definition_id.domain_id.name}" ` +
        `at account "${asset.id.account_id.name}@${asset.id.account_id.domain_id.name}" ` +
        `has type "${asset.value.enum.tag}"`,
    )
    // => Asset "rose#wonderland" at account "alice@wonderland" has type "Quantity"
  }
  // #endregion assets
}
