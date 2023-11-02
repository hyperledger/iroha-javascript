import path from 'path'
import url from 'url'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const COMPILED_SCHEMA_FILE = path.resolve(dirname, './../src/__schema__.json')
