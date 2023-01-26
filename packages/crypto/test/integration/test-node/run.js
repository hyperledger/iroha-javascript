// eslint-disable-next-line @typescript-eslint/no-require-imports
const { crypto } = require('@iroha2/crypto-target-node')

const hash = crypto.createHash(Uint8Array.from([1, 2, 3, 4]))
