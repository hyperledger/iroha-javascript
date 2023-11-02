import { Torii } from '@iroha2/client'
import { datamodel } from '@iroha2/data-model'

// --snip--
declare const query: datamodel.SignedQuery

const result = await Torii.request(
  {
    fetch,
    apiURL: 'http://127.0.0.1:8080',
  },
  query,
)
