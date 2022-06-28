import { cac } from 'cac'
import consola from 'consola'
import { cleanConfiguration, cleanSideEffects, setConfiguration, startPeer } from '../src/lib'
import { peer_config, peer_genesis } from '../../client/test/integration/config'

const cli = cac()

cli.command('clean:configs').action(async () => {
  await cleanConfiguration()
})

cli.command('clean:effects').action(async () => {
  await cleanSideEffects()
})

cli
  .command('start')
  .option('--api-url <url>', 'Torii API_URL, needed for health check')
  .action(async (opts) => {
    consola.info('Starting peer')
    await startPeer({ toriiApiURL: opts.url })
    consola.info('Started! Kill this process to kill the peer')
  })

cli.command('config:set-from-client-tests').action(async () => {
  await setConfiguration({ config: peer_config, genesis: peer_genesis })
  consola.success('Config is set')
})

cli.help()

async function main() {
  cli.parse(process.argv, { run: false })
  await cli.runMatchedCommand()
}

main().catch((err) => {
  consola.fatal(err)
  process.exit(1)
})
