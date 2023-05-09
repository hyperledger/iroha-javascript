import path from 'path'
import url from 'url'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const TMP_DIR = path.resolve(dirname, '../tmp')

export const TMP_IROHA_BIN = path.resolve(TMP_DIR, 'iroha')
