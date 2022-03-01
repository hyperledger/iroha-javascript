import path from 'path';

export const PUBLIC_PACKAGES_UNSCOPED = [
    'client',
    'client-isomorphic-ws',
    'client-isomorphic-fetch',
    'data-model',
    'i64-fixnum',
    'crypto-core',
    'crypto-target-node',
    'crypto-target-web',
    'crypto-target-bundler',
] as const;

export type PublicPackagesUnscoped = typeof PUBLIC_PACKAGES_UNSCOPED[number];

//  TODO
export const ROLLUP_PACKAGES_UNSCOPED = [''];
