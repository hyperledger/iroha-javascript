import { IrohaCryptoInterface } from '@iroha2/crypto-core'

let __crypto: IrohaCryptoInterface | null = null

export function setCrypto(crypto: IrohaCryptoInterface | null) {
  __crypto = crypto
}

export function getCrypto(): null | IrohaCryptoInterface {
  return __crypto
}
