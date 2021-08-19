import consola from 'consola';
import execa from 'execa';

async function main() {
    consola.info('Cleaning previous builds');
    await execa('pnpm', ['build:clean'], { stdio: 'inherit' });

    // Why have to build declarations and not just rollup?
    // Because of TS bugs. It fails to work with `@scale-codec/enum` in some cases with message
    // "string is unassignable to never" when run it inside of `rollup-plugin-dts` plugin. But it
    // doesn't fail when declarations is emitted from tsc directly. So, I found a solution: firstly,
    // emit declarations by tsc, and then rollup from them. Btw this way to rollup declaration
    // is the best accrodingly to `rollup-plugin-dts` docs
    consola.info('Building declarations');
    await execa('pnpm', ['build:dts'], { stdio: 'inherit' });

    consola.info('Rolling up');
    await execa('pnpm', ['build:rollup'], { stdio: 'inherit' });

    consola.success('Done');
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
