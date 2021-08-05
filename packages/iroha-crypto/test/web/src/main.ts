import init, { PublicKey, Multihash } from '@iroha/crypto';
import { hexToBytes, bytesToHex } from 'hada';

const app = document.querySelector<HTMLDivElement>('#app')!;

interface Config {
    PUBLIC_KEY: string;
    PRIVATE_KEY: {
        digest_function: string;
        payload: string;
    };
}

async function fetchConfig(): Promise<Config> {
    return fetch('/api/config').then((x) => x.json());
}

async function main() {
    await init();

    const config = await fetchConfig();

    const { digest_function, payload } = PublicKey.from_multihash(
        Multihash.from_bytes(Uint8Array.from(hexToBytes(config.PUBLIC_KEY))),
    );

    const payloadHex = bytesToHex([...payload]);

    app.innerHTML = `Public key payload hex is: ${payloadHex}`;
}

main();
