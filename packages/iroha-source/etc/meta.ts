import path from 'path'
import url from 'url'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const IROHA_DIR = path.join(dirname, '../.iroha')

export const CLONE_DIR = path.join(dirname, '../.iroha-clone')

export const IROHA_DIR_CLONE_META_DIR_FILE = path.join(IROHA_DIR, '.js-sdk/meta.json')
