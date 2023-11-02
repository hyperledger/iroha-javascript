import path from 'path'
import url from 'url'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const CODEGEN_OUTPUT_FILE = path.resolve(dirname, '../src/__generated__.ts')
