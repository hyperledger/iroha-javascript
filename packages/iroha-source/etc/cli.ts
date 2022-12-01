import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { buildBinary, forceClone } from '../src/lib'

yargs(hideBin(process.argv))
  .command('clone', 'clone/update iroha', {}, async () => {
    await forceClone()
  })
  .command(
    'build <binary>',
    'Build specified binary',
    (yargs) => yargs.positional('binary', { choices: ['iroha', 'kagami'] as const }),
    async (args) => {
      await buildBinary(args.binary!)
    },
  )
  .help()
  .alias('h', 'help')
  .parse()
