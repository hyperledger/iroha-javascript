import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import consola from 'consola'
import { cleanConfiguration, cleanSideEffects, setConfiguration, startPeer } from '../src/lib'
import { peer_config, peer_genesis } from '../../client/test/integration/config'

yargs(hideBin(process.argv))
  .command('clean:configs', 'Clean configuration', {}, async () => {
    await cleanConfiguration()
  })
  .command(
    'clean:effects',
    'Clean peer side-effects',
    (y) => y.positional('kura-block-store-path', { type: 'string', demandOption: true }),
    async (args) => {
      await cleanSideEffects(args.kuraBlockStorePath)
    },
  )
  .command(
    'start',
    'Start peer',
    (y) =>
      y.option('api-url', {
        type: 'string',
        desc: 'Torii API URL, used to check whether the peer is up and running',
        demandOption: true,
      }),
    async (args) => {
      consola.info('Starting peer')
      await startPeer({ toriiApiURL: args.apiUrl })
      consola.info('Started! Kill this process to kill the peer')
    },
  )
  .command(
    'config:set-from-client-tests',
    'Set configuration from `@iroha2/client` configuration tests',
    {},
    async () => {
      await setConfiguration({ config: peer_config, genesis: peer_genesis })
      consola.success('Config is set')
    },
  )
  .help()
  .parse()
