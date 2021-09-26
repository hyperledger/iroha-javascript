import { main } from '@iroha2/cli-tools';
import execa from 'execa';

main(async () => {
    await execa('pnpm', ['build:wasm'], { stdio: 'inherit' });
    await execa('pnpm', ['build:interfaces'], { stdio: 'inherit' });
});
