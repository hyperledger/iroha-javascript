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
  return path.relative(process.cwd(), path.resolve(__dirname, '../', ...paths))
}

type SetEntry<T> = T extends Set<infer V> ? V : never

export const PUBLIC_PACKAGES = Set([
  'client',
  'data-model',
  'data-model-schema',
  'i64-fixnum',
  'crypto-core',
  'crypto-target-node',
  'crypto-target-web',
  'crypto-target-bundler',
] as const)

export const PUBLIC_PACKAGES_WITH_DTS_ROLLUP: Set<Exclude<PublicPackage, 'data-model-schema'>> = PUBLIC_PACKAGES.delete(
  'data-model-schema',
) as Set<any>

export const BUNDLE_PACKAGES = Set(['client', 'data-model', 'i64-fixnum'] as const)

// add here private packages too if necessary
export const ALL_PACKAGES = PUBLIC_PACKAGES.merge(BUNDLE_PACKAGES)

export type PublicPackage = SetEntry<typeof PUBLIC_PACKAGES>

export type PublicPackageWithDtsRollup = SetEntry<typeof PUBLIC_PACKAGES_WITH_DTS_ROLLUP>

export type BundlePackage = SetEntry<typeof BUNDLE_PACKAGES>

export type AllPackages = SetEntry<typeof ALL_PACKAGES>

const BUNDLE_PACKAGES_EXTERNAL: Record<BundlePackage, Set<string>> = {
  client: getProdDeps(packageClient),
  'data-model': getProdDeps(packageDataModel),
  'i64-fixnum': getProdDeps(packageFixnum),
}

export function getBundlePackageExternals(pkg: BundlePackage): Set<string> {
  return BUNDLE_PACKAGES_EXTERNAL[pkg]
}

export function scopePackage(name: AllPackages): string {
  return `@iroha2/${name}`
}

interface PkgInputOutput {
  inputBase: string
  outputBase: string
}

export function* getBundlePackageInOut(name: BundlePackage): Generator<PkgInputOutput> {
  const packageDist = resolve('packages', name, 'dist')
  const packageDistTsc = resolve('packages', name, 'dist-tsc')
  const defaultLibOutputBase = path.join(packageDist, 'lib')

  if (name === 'data-model') {
    yield {
      inputBase: path.join(packageDistTsc, 'data-model/src/lib'),
      outputBase: defaultLibOutputBase,
    }
  } else if (name === 'client') {
    yield {
      inputBase: path.join(packageDistTsc, 'client/src/lib'),
      outputBase: defaultLibOutputBase,
    }
    yield {
      inputBase: path.join(packageDistTsc, 'client/src/web-socket/node'),
      outputBase: path.join(packageDist, `web-socket/node`),
    }
    yield {
      inputBase: path.join(packageDistTsc, 'client/src/web-socket/native'),
      outputBase: path.join(packageDist, `web-socket/native`),
    }
  } else {
    yield {
      inputBase: path.join(packageDistTsc, 'lib'),
      outputBase: defaultLibOutputBase,
    }
  }
}
