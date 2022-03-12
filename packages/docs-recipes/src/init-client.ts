import { setCrypto, Client } from '@iroha2/client';

import { crypto as cryptoNode } from '@iroha2/crypto-target-node';
import { crypto as cryptoWeb, init as initCryptoWeb } from '@iroha2/crypto-target-web';
import { crypto as cryptoBundler } from '@iroha2/crypto-target-bundler';

// The very first step - setup crypto
// Use `crypto` according to your environment
setCrypto(cryptoNode);
setCrypto(cryptoWeb);
setCrypto(cryptoBundler);

// Init crypto, if you are in the web
initCryptoWeb().then(() => {
  // now web crypto should work
});

// And finally, create a client!

const client = new Client({
  torii: {
    // Both URLs are optional - in case you need only a part of endpoints,
    // e.g. only Telemetry ones
    apiURL: 'http://127.0.0.1:8080',
    telemetryURL: 'http://127.0.0.1:8081',
  },
});
