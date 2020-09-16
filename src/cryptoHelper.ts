import { Buffer as BF } from 'buffer'
import * as ed25519sha3 from 'ed25519.js'
import ed25519sha2 from 'tweetnacl'

enum CryptoAlgorithms {
  ed25519sha2,
  ed25519sha3
}

class Crypto {
  private algorithm = CryptoAlgorithms.ed25519sha3

  public getAlgorithm (): CryptoAlgorithms {
    return this.algorithm
  }

  public setAlgorithm (algorithm: CryptoAlgorithms) {
    this.algorithm = algorithm
  }
}
const libraryCrypto = new Crypto()

/**
 * Returns a new ed25519-sha3 / ed25519-sha2 keypair
 * Depends on crypto algorithm
 */
const generateKeyPair = (): { publicKey: string; privateKey: string } => {
  const type = libraryCrypto.getAlgorithm()
  let keys, publicKey, privateKey
  if (type === CryptoAlgorithms.ed25519sha3) {
    keys = ed25519sha3.createKeyPair()
    publicKey = (keys.publicKey).toString('hex')
    privateKey = (keys.privateKey).toString('hex')
  } else if (type === CryptoAlgorithms.ed25519sha2) {
    keys = ed25519sha2.sign.keyPair()
    publicKey = BF.from(keys.publicKey).toString('hex')
    privateKey = BF.from(keys.privateKey).toString('hex')
  } else {
    throw new Error('Unsupported crypto algorithm!')
  }
  return { publicKey, privateKey }
}

const derivePublicKey = (privateKeyHex: string): Buffer => {
  const type = libraryCrypto.getAlgorithm()
  if (type === CryptoAlgorithms.ed25519sha3) {
    return ed25519sha3.derivePublicKey(
      BF.from(privateKeyHex, 'hex')
    )
  } else if (type === CryptoAlgorithms.ed25519sha2) {
    const keyPair = ed25519sha2.sign.keyPair.fromSecretKey(
      BF.from(privateKeyHex, 'hex')
    )
    const publicKeyHex = BF.from(keyPair.publicKey).toString('hex')
    return BF.from(`ed0120${publicKeyHex}`, 'hex')
  } else {
    throw new Error('Unsupported crypto algorithm!')
  }
}

const sign = (payload: Buffer, publicKey: Buffer, privateKey: Buffer): Buffer => {
  const type = libraryCrypto.getAlgorithm()
  if (type === CryptoAlgorithms.ed25519sha3) {
    return ed25519sha3.sign(payload, publicKey, privateKey)
  } else if (type === CryptoAlgorithms.ed25519sha2) {
    return Buffer.from(
      ed25519sha2.sign(payload, privateKey)
    )
  } else {
    throw new Error('Unsupported crypto algorithm!')
  }
}

export default {
  CryptoAlgorithms,
  libraryCrypto,
  generateKeyPair,
  derivePublicKey,
  sign
}
