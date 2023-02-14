// we want to ensure that the Node target package works in CJS mode

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { crypto } = require('@iroha2/crypto-target-node')

const hash = crypto.Hash.hash('hex', '0011224433').bytes('hex')
console.log('Sample hash:', hash)
