import { Client, Signer, Torii } from '@iroha2/client'

// --snip--
declare const torii: Torii
declare const signer: Signer

const client = new Client({ torii, signer })
