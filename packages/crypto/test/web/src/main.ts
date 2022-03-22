import { init, crypto } from '@iroha2/crypto-target-web'
import { hexToBytes, bytesToHex } from 'hada'

const { createPublicKeyFromMultihash, createMultihashFromBytes } = crypto

const app = document.querySelector<HTMLDivElement>('#app')!

interface Config {
  PUBLIC_KEY: string
  PRIVATE_KEY: {
    digest_function: string
    payload: string
  }
}

async function fetchConfig(): Promise<Config> {
  return fetch('/api/config').then((x) => x.json())
}

async function main() {
  await init()

  const config = await fetchConfig()

  const payload = createPublicKeyFromMultihash(
    createMultihashFromBytes(Uint8Array.from(hexToBytes(config.PUBLIC_KEY))),
  ).payload()

  const payloadHex = bytesToHex([...payload])

  app.innerHTML = `Public key payload hex is: ${payloadHex}`
}

main()
