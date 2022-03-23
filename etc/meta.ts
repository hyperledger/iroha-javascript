import path from 'path'
import { PackageJson } from 'type-fest'
import { Set } from 'immutable'
import packageClient from '../packages/client/package.json'
import packageDataModel from '../packages/data-model/package.json'
import packageFixnum from '../packages/i64-fixnum/package.json'

function getProdDeps(pkg: PackageJson): Set<string> {
  return Set(Object.keys(pkg.dependencies ?? {}))
}

function resolve(...paths: string[]): string {
  return path.resolve(__dirname, '../', ...paths)
}

type SetEntry<T> = T extends Set<infer V> ? V : never

export const PUBLIC_PACKAGES = Set([
  'client',
  'client-isomorphic-ws',
  'client-isomorphic-fetch',
  'data-model',
  'i64-fixnum',
  'crypto-core',
  'crypto-target-node',
  'crypto-target-web',
  'crypto-target-bundler',
] as const)

export const BUNDLE_PACKAGES = Set(['client', 'data-model', 'i64-fixnum'] as const)

// add here private packages too if necessary
export const ALL_PACKAGES = PUBLIC_PACKAGES.merge(BUNDLE_PACKAGES)

export type PublicPackages = SetEntry<typeof PUBLIC_PACKAGES>

export type BundlePackages = SetEntry<typeof BUNDLE_PACKAGES>

export type AllPackages = SetEntry<typeof ALL_PACKAGES>

const BUNDLE_PACKAGES_EXTERNAL: Record<BundlePackages, Set<string>> = {
  client: getProdDeps(packageClient),
  'data-model': getProdDeps(packageDataModel),
  'i64-fixnum': getProdDeps(packageFixnum),
}

export function getBundlePackageExternals(pkg: BundlePackages): Set<string> {
  return BUNDLE_PACKAGES_EXTERNAL[pkg]
}

export function scopePackage(name: AllPackages): string {
  return `@iroha2/${name}`
}

export function getBundlePackageInput(name: BundlePackages): string {
  return resolve('packages', name, 'dist-tsc/lib.js')
}

export function getBundlePackageOutput(name: BundlePackages, format: 'esm' | 'cjs'): string {
  return resolve('packages', name, `dist/lib.${format}.js`)
}

export function getPackageApiExtractorConfigFile(name: PublicPackages): string {
  if (name.startsWith('crypto-')) {
    const [, tail] = name.match(/^crypto-(.+)$/)!
    return resolve(`packages/crypto/packages/${tail}/api-extractor.json`)
  }
  return resolve(`packages/${name}/api-extractor.json`)
}
