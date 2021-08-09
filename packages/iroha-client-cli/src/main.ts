import { cac } from 'cac';
import consola from 'consola';
import { IrohaClient } from '@iroha2/client';
import { create_blake2b_32_hash, sign_with_ed25519_sha512 } from '@iroha2/crypto/cjs';
import fs from 'fs/promises';

const cli = cac('iroha-client-cli');

cli.command('health <config_path>', 'Check health of Iroha peer at provided url').action(async (config_path) => {
    const config = await fs.readFile(config_path, { encoding: 'utf-8' }).then((v) => JSON.parse(v));

    const client = new IrohaClient({
        ...config,
        hasher: create_blake2b_32_hash,
        signer: sign_with_ed25519_sha512,
    });

    const result = await client.health();

    result.match({
        Ok: () => consola.success('healthy!'),
        Err: (err) => consola.error('not alive:', err),
    });
});

cli.help();

async function main() {
    try {
        cli.parse(process.argv, { run: false });
        await cli.runMatchedCommand();
    } catch (err) {
        consola.fatal(err);
        process.exit(1);
    }
}

main();
