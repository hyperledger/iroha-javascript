import { IrohaCryptoInterface } from '@iroha2/crypto-core'
import { crypto as interfaceWeb, init as initWeb } from '@iroha2/crypto-target-web'
import { crypto as interfaceNode } from '@iroha2/crypto-target-node'
import { crypto as interfaceBundler } from '@iroha2/crypto-target-bundler'

const theyAllShouldBeCompatibleWithIrohaCryptoInterface: IrohaCryptoInterface[] = [
  interfaceBundler,
  interfaceNode,
  interfaceWeb,
]

const a: () => Promise<any> = initWeb
