@Library('jenkins-library' ) _

def pipeline = new org.js.LibPipeline( steps: this,
    packageManager: "pnpm",
    buildDockerImage: 'build-tools/node:14-ubuntu-rust-1.59.0',
    libPushBranches: ['iroha2'],
    npmRegistries: ['https://nexus.iroha.tech/repository/npm-soramitsu/': 'bot-soramitsu-rw'],
    preBuildCmds: ['pnpm install --unsafe-perm'],
    testCmds: ['pnpm type-check','pnpm test'],
    pushCmds: ['npm config set registry "https://nexus.iroha.tech/repository/npm-soramitsu/"', 'pnpm publish-all']
   )
pipeline.runPipeline()
