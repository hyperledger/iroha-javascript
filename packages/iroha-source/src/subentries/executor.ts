import { fs, path } from 'zx'
import { IROHA_DIR } from '../../etc/meta'

export default fs.readFileSync(path.join(IROHA_DIR, 'configs/peer/executor.wasm'))
