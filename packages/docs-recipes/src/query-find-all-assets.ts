import { Client } from '@iroha2/client'
import { Asset, QueryBox } from '@iroha2/data-model'

async function findAllAssets(client: Client): Promise<Asset[]> {
  const result = await client.request(QueryBox('FindAllAssets', null))

  return result
    .as('Ok')
    .as('Vec')
    .map((x) => x.as('Identifiable').as('Asset'))
}
