import { IrohaCryptoInterface } from '@iroha2/crypto-core'
import invariant from 'tiny-invariant'

let __crypto: IrohaCryptoInterface | null = null

export function setCrypto(crypto: IrohaCryptoInterface | null) {
  __crypto = crypto
}

export function getCrypto(): null | IrohaCryptoInterface {
  return __crypto
}

export function getCryptoAnyway(): IrohaCryptoInterface {
  const crypto = getCrypto()
  invariant(
    crypto,
    '"crypto" is not defined, but required for Iroha Client to function. Have you set it with `setCrypto()`?',
  )
  return crypto
}
