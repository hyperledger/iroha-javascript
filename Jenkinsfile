@Library('jenkins-library' ) _

def pipeline = new org.js.LibPipeline( steps: this,
    packageManager: "pnpm",
    buildDockerImage: 'build-tools/node:16-rust-1.62',
    libPushBranches: ['iroha2'],
    npmRegistries: [:],
    preBuildCmds: ['pnpm install --unsafe-perm'],
    testCmds: ['pnpm type-check','pnpm test'],
    pushCmds: ['npm config set registry "https://nexus.iroha.tech/repository/npm-soramitsu/"', 'pnpm publish-all'],
    secretScannerExclusion: '.*Cargo.toml'
   )
pipeline.runPipeline()
