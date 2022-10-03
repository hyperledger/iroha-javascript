import { Client, Signer } from '@iroha2/client'

// --snip--
declare const signer: Signer

const client = new Client({ signer })
