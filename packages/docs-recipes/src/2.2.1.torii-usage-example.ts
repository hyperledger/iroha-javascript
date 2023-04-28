import { Torii } from '@iroha2/client'
import { VersionedSignedQuery } from '@iroha2/data-model'

// --snip--
declare const query: VersionedSignedQuery

const result = await Torii.request(
  {
    fetch,
    apiURL: 'http://127.0.0.1:8080',
  },
  query,
)
