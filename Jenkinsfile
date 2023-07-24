@Library('jenkins-library')

def pipeline = new org.js.LibPipeline( steps: this,
    packageManager: "pnpm",
    buildDockerImage: 'build-tools/node:16-pnpm-nightly-2023-06',
    libPushBranches: ['iroha2'],
    npmRegistries: ['https://nexus.iroha.tech/repository/npm-soramitsu/': 'bot-soramitsu-rw'],
    buildCmds: [],
    testCmds: ['pnpm jake run-all-checks'],
    pushCmds: ['npm config set registry "https://nexus.iroha.tech/repository/npm-soramitsu/"', 'pnpm jake publish-all'],
    secretScannerExclusion: '.*Cargo.toml\$|.*README.md\$',
    test: false,
    corepack: true
   )
pipeline.runPipeline()
