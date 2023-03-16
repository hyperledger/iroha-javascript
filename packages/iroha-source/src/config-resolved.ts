import { P, match } from 'ts-pattern'
import { ConfigResolved } from './types'
import CFG from '../config'
import path from 'path'

const resolved: ConfigResolved = match(CFG)
  .with(
    { path: P.string },
    (cfgPath): ConfigResolved => ({ t: 'path', absolutePath: path.resolve(__dirname, '../', cfgPath.path) }),
  )
  .with({ origin: P.string }, (cfgGitClone): ConfigResolved => ({ t: 'git-clone', ...cfgGitClone }))
  .exhaustive()

export default resolved
