const sha3_256 = require('js-sha3').sha3_256
const supercop = require('supercop.js')

export function createKeyPair (): IKeyPair {
  const seed = supercop.createSeed()
  const keys = supercop.createKeyPair(seed)

  return {
    publicKey: keys.publicKey.toString('base64'),
    privateKey: keys.secretKey.toString('base64')
  }
}

export function sign (opt: { publicKey: string, privateKey: string, message: string }): string {
  const publicKey = new Buffer(opt.publicKey, 'base64')
  const privateKey = new Buffer(opt.privateKey, 'base64')
  const sha3Message = new Buffer(sha3_256(opt.message))

  const sig = supercop.sign(
    sha3Message,
    publicKey,
    privateKey
  ).toString('base64')

  return sig
}

export function verify (opt: { publicKey: string, message: string, signature: string }) {
  const valid = supercop.verify(
    new Buffer(opt.signature, 'base64'),
    new Buffer(opt.message),
    new Buffer(opt.publicKey, 'base64')
  )
  return valid
}

export interface IKeyPair {
  privateKey: string
  publicKey: string
}

export interface IWallet {
  privateKey: Buffer
  publicKey: Buffer
}

export class Wallet implements IWallet {
  privateKey: Buffer
  publicKey: Buffer

  constructor (keyPair?: IWallet) {
    const seed = supercop.createSeed()
    const keys = keyPair || supercop.createKeyPair(seed)

    this.publicKey = keys.publicKey
    this.privateKey = (keyPair) ? keyPair.privateKey : keys.secretKey
  }

  toJSON (): IKeyPair {
    return {
      publicKey: this.publicKey.toString('base64'),
      privateKey: this.privateKey.toString('base64')
    }
  }

  sign (msg: string): string {
    const message = new Buffer(sha3_256(msg))
    return supercop.sign(message, this.publicKey, this.privateKey).toString('base64')
  }
}
