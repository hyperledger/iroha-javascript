import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { buildBinary, forceClone } from '../src/lib'

yargs(hideBin(process.argv))
  .command('clone', 'clone/update Iroha', {}, async () => {
    await forceClone()
  })
  .command(
    'build <binary>',
    'Build specified binary',
    (yargs) =>
      yargs
        .positional('binary', { choices: ['iroha', 'kagami'] as const, demandOption: true })
        .option('ignore-built', { type: 'boolean', default: false }),
    async (args) => {
      await buildBinary(args.binary, args.ignoreBuilt)
    },
  )
  .help()
  .alias('h', 'help')
  .parse()
