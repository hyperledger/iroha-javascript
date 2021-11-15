import { $, path } from 'zx';
import { series } from 'gulp';
import makeDir from 'make-dir';
import { TMP_IROHA_DEPLOY_DIR, TMP_IROHA_INSTALL_DIR, IROHA_CLI_NAME } from '../const';

const GIT_IROHA_REPO = 'https://github.com/hyperledger/iroha.git';
const GIT_BRANCH = 'iroha2-dev';

const ROOT_DIR = path.resolve(__dirname, '../');
const IROHA_INSTALL_ROOT_DIR = path.resolve(ROOT_DIR, TMP_IROHA_INSTALL_DIR);

const IROHA_DEPLOY_DIR = path.resolve(ROOT_DIR, TMP_IROHA_DEPLOY_DIR);

async function install_iroha_binary() {
    await $`cargo install \\
        --root ${IROHA_INSTALL_ROOT_DIR} \\
        --git ${GIT_IROHA_REPO} \\
        --branch ${GIT_BRANCH} \\
        ${IROHA_CLI_NAME}
    `;
}

async function make_deploy_dir() {
    await makeDir(IROHA_DEPLOY_DIR);
}

async function copy_binary_into_deploy_dir() {
    const cliFile = path.resolve(IROHA_INSTALL_ROOT_DIR, 'bin', IROHA_CLI_NAME);
    await $`cp ${cliFile} ${IROHA_DEPLOY_DIR}`;
}

export default series(install_iroha_binary, make_deploy_dir, copy_binary_into_deploy_dir);
