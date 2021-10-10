import execa from 'execa';
import { series } from 'gulp';
import path from 'path';
import del from 'del';
import makeDir from 'make-dir';
import { TMP_IROHA_DEPLOY_DIR, TMP_IROHA_INSTALL_DIR } from '../const';

const GIT_IROHA_REPO = 'https://github.com/hyperledger/iroha.git';
const GIT_BRANCH = 'iroha2-dev';

const ROOT_DIR = path.resolve(__dirname, '../');
const IROHA_INSTALL_ROOT_DIR = path.resolve(ROOT_DIR, TMP_IROHA_INSTALL_DIR);

const IROHA_DEPLOY_DIR = path.resolve(ROOT_DIR, TMP_IROHA_DEPLOY_DIR);

async function install_iroha_binary() {
    await execa(
        'cargo',
        [
            'install',
            '--root',
            IROHA_INSTALL_ROOT_DIR,
            '--git',
            GIT_IROHA_REPO,
            '--branch',
            GIT_BRANCH,
            // and finally - which crate from repo to install?
            'iroha_cli',
        ],
        { stdio: 'inherit' },
    );
}

async function clean_deploy_dir() {
    await del(path.join(IROHA_DEPLOY_DIR, '*'));
}

async function make_deploy_dir() {
    await makeDir(IROHA_DEPLOY_DIR);
}

async function copy_binary_into_deploy_dir() {
    await execa('cp', [path.resolve(IROHA_INSTALL_ROOT_DIR, 'bin/iroha_cli'), IROHA_DEPLOY_DIR]);
}

export default series(install_iroha_binary, clean_deploy_dir, make_deploy_dir, copy_binary_into_deploy_dir);
