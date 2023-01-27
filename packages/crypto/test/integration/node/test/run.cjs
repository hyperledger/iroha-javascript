// eslint-disable-next-line @typescript-eslint/no-require-imports
const { crypto } = require('@iroha2/crypto-target-node')

const hash = crypto.Hash.hash('hex', '0011224433').bytes('hex')
console.log('Sample hash:', hash)
