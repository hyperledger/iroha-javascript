import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import consola from 'consola'
import { clearAll, clearPeerStorage, prepareConfiguration, startPeer } from '../src/lib'

yargs(hideBin(process.argv))
  .command('clear-all', 'Clean configuration', {}, async () => {
    await clearAll()
  })
  .command(
    'clean:effects',
    'Clean peer side-effects',
    (y) => y.positional('kura-block-store-path', { type: 'string', demandOption: true }),
    async (args) => {
      await clearPeerStorage()
    },
  )
  .command(
    'start',
    'Start peer',
    (y) => y,
    async (args) => {
      consola.info('Starting peer')
      await startPeer()
      consola.info('Started! Kill this process to kill the peer')
    },
  )
  .command('config-from-client-tests', 'Set peer configuration from source Iroha repo', {}, async () => {
    await prepareConfiguration()
    consola.success('Config is set')
  })
  .help()
  .parse()
