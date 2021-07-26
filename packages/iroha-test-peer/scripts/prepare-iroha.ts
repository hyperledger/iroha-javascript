import consola from 'consola';
import execa from 'execa';
import path from 'path';
import { TMP_IROHA_DEPLOY_DIR, TMP_IROHA_INSTALL_DIR } from '../const';

function runAsyncMain(mainFn: () => Promise<void>): void {
    mainFn().catch((err) => {
        consola.fatal(err);
        process.exit(1);
    });
}

async function $(file: string, args?: string[]): Promise<void> {
    await execa(file, args, {
        stdio: 'inherit',
    });
}

runAsyncMain(async () => {
    const GIT_IROHA_REPO = 'https://github.com/hyperledger/iroha.git';
    const GIT_BRANCH = 'iroha2-dev';

    const workdir = path.resolve(__dirname, '../');

    consola.info('Installing Iroha with Cargo from git repo');

    const irohaInstallRootDir = path.resolve(workdir, TMP_IROHA_INSTALL_DIR);
    await $('cargo', [
        'install',
        '--root',
        irohaInstallRootDir,
        '--git',
        GIT_IROHA_REPO,
        '--branch',
        GIT_BRANCH,
        // and finally - which crate from repo to install?
        'iroha_cli',
    ]);

    consola.info('Extracting Iroha binary into deploy dir');

    const deployDir = path.resolve(workdir, TMP_IROHA_DEPLOY_DIR);
    // clean last deploy dir
    await $('rm', ['-rf', deployDir]);
    await $('mkdir', [deployDir]);
    // copy
    await $('cp', [path.resolve(irohaInstallRootDir, 'bin/iroha_cli'), deployDir]);

    // ?????

    consola.success('Done');
});
