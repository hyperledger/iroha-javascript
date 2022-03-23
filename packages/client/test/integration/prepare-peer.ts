import { preparePackage } from '@iroha2/test-peer'
import consola from 'consola'

async function main() {
  await preparePackage()
}

main().catch((err) => {
  consola.fatal(err)
  process.exit(1)
})
