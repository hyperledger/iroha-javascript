import { IrohaCryptoInterface } from '@iroha2/crypto/types';
import { crypto as interfaceWeb, init as initWeb } from '@iroha2/crypto/web';
import { crypto as interfaceNode } from '@iroha2/crypto/node';
import { crypto as interfaceBundler } from '@iroha2/crypto/bundler';

const theyAllShouldBeCompatibleWithIrohaCryptoInterface: IrohaCryptoInterface[] = [
    interfaceBundler,
    interfaceNode,
    interfaceWeb,
];

const a: () => Promise<any> = initWeb;
