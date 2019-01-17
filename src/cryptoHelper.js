import { createKeyPair } from 'ed25519.js'

/**
 * Returns a new keypair
 */
const generateKeyPair = () => {
  const keys = createKeyPair()
  const publicKey = (keys.publicKey).toString('hex')
  const privateKey = (keys.privateKey).toString('hex')

  return { publicKey, privateKey }
}

export default {
  generateKeyPair
}
