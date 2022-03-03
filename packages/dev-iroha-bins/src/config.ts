import { Config, KnownBinaries } from './types';

const config: Config = {
    git: {
        repo: 'https://github.com/hyperledger/iroha.git',
        revision: '27f0035786afae84a2377cb21ba9470f2233e25b',
        // branch: 'iroha2-dev',
        // branch: '2.0.0-pre.1.rc.1',
    },
    binaries: {
        [KnownBinaries.Introspect]: 'iroha_schema_bin',
        [KnownBinaries.Cli]: 'iroha',
    },
};

export default config;
