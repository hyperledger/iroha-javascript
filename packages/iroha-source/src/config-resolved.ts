import { P, match } from 'ts-pattern'
import { ConfigResolved } from './types'
import CFG from '../config'
import path from 'path'
import url from 'url'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))

const resolved: ConfigResolved = match(CFG)
  .with(
    { path: P.string },
    (cfgPath): ConfigResolved => ({ t: 'path', absolutePath: path.resolve(dirname, '../', cfgPath.path) }),
  )
  .with({ origin: P.string }, (cfgGitClone): ConfigResolved => ({ t: 'git-clone', ...cfgGitClone }))
  .exhaustive()

export default resolved
