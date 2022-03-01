export enum KnownBinaries {
    /**
     * Introspect binary, for schema generation
     */
    Introspect = 'introspect',
    /**
     * Main Iroha CLI binary - runs peer
     */
    Cli = 'cli',
}

export type BinaryNameMap = { [K in KnownBinaries]: string };

export interface Config {
    git: {
        repo: string;
        branch?: string;
        revision?: string;
    };
    binaryNameMap: BinaryNameMap;
}
