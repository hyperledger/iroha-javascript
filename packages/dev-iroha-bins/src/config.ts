import { Config, KnownBinaries } from './types';

const config: Config = {
    git: {
        repo: 'https://github.com/hyperledger/iroha.git',
        revision: 'b25faf7d8ff6412938a465daf8a0cacff8b3ac42',
        // branch: 'iroha2-dev',
        // branch: '2.0.0-pre.1.rc.1',
    },
    binaries: {
        [KnownBinaries.Introspect]: 'iroha_schema_bin',
        [KnownBinaries.Cli]: 'iroha',
    },
};

export default config;
