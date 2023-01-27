import { crypto, init } from '@iroha2/crypto-target-web'

interface Config {
  private_key: {
    digest_function: string
    payload: string
  }
}

await init()
const { private_key } =
  // intercepted by Cypress
  await fetch('/api/config').then<Config>((x) => x.json())

const payloadHex = crypto.PublicKey.fromPrivateKey(crypto.PrivateKey.fromJSON(private_key)).payload('hex')

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `Public key payload hex is: ${payloadHex}`
