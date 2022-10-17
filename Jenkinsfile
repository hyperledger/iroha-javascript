@Library('jenkins-library' )

def pipeline = new org.js.LibPipeline( steps: this,
    packageManager: "pnpm",
    buildDockerImage: 'build-tools/node:14-pnpm7-2',
    libPushBranches: ['iroha2'],
    npmRegistries: ['https://nexus.iroha.tech/repository/npm-soramitsu/': 'bot-soramitsu-rw'],
    preBuildCmds: ['npm install -g n','n 16.17.0', 'n prune', 'pnpm install --unsafe-perm'],
    testCmds: ['pnpm type-check','pnpm test','npm config set registry "https://nexus.iroha.tech/repository/npm-soramitsu/"'],
    pushCmds: ['pnpm jake publish-all'],
    secretScannerExclusion: '.*Cargo.toml\$|.*README.md\$'
   )
pipeline.runPipeline()
