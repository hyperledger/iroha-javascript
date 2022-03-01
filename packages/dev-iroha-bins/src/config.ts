import { Config, KnownBinaries } from './types';

const config: Config = {
    git: {
        repo: 'https://github.com/hyperledger/iroha.git',
        revision: '9a149eecb00485f71fd23179dd16a73815d739b2',
        // branch: 'iroha2-dev',
        // branch: '2.0.0-pre.1.rc.1',
    },
    binaryNameMap: {
        [KnownBinaries.Introspect]: 'iroha_schema_bin',
        [KnownBinaries.Cli]: 'iroha',
    },
};

export default config;
