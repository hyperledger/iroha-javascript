@Library('jenkins-library' )

def pipeline = new org.js.LibPipeline( steps: this,
    buildDockerImage: 'build-tools/node:16-corepack-cypress-rust',
    libPushBranches: ['iroha2'],
    npmRegistries: ['https://nexus.iroha.tech/repository/npm-soramitsu/': 'bot-soramitsu-rw'],
    buildCmds: [],
    testCmds: ['pnpm jake run-all-checks'],
    pushCmds: ['npm config set registry "https://nexus.iroha.tech/repository/npm-soramitsu/"', 'pnpm jake publish-all'],
    secretScannerExclusion: '.*Cargo.toml\$|.*README.md\$',
    test: false
   )
pipeline.runPipeline()
