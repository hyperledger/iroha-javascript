import { Plugin, RollupOptions, defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import replace from '@rollup/plugin-replace'
import { glob } from 'zx'
import { match } from 'ts-pattern'
import path from 'path'
import { Set } from 'immutable'
import fs from 'fs/promises'
import { pipe } from 'fp-ts/function'
import { PACKAGES_TO_ROLLUP, loadProductionDependencies, packageRoot, scopePackage } from './meta'
import {
  INTERFACE_WRAP_PROXY_TO_WASM_PKG_ROLLUP_ID,
  IrohaCryptoTarget,
  WASM_PACK_OUT_NAME,
  WASM_PKG_ROLLUP_ID,
  WasmPackTarget,
  wasmPackOutDirForTarget,
  wasmPkgWithTargetRollupId,
} from './meta-crypto'

function replaceVitest() {
  return replace({
    preventAssignment: true,
    values: {
      'import.meta.vitest': 'undefined',
    },
  })
}

async function readWasmPkgAssets(target: WasmPackTarget): Promise<{ fileName: string; content: Buffer }[]> {
  return glob(path.join(wasmPackOutDirForTarget(target), '*')).then((files) =>
    Promise.all(
      files.map(async (fullFileName) => {
        const content = await fs.readFile(fullFileName)
        return {
          fileName: path.basename(fullFileName),
          content,
        }
      }),
    ),
  )
}

function wasmPkg(target: WasmPackTarget, mode: 'types' | 'esm-reexport' | 'cjs-in-esm'): Plugin {
  const WASM_PKG_TARGET_ROLLUP_ID = wasmPkgWithTargetRollupId(target)
  const WASM_PKG_ASSETS_DIR = `wasm-pkg`
  const WASM_PKG_COPIED_ENTRY_EXTERNAL = `./${WASM_PKG_ASSETS_DIR}/${WASM_PACK_OUT_NAME}`

  return {
    name: `resolve-wasm-pkg-as-${mode}`,
    resolveId(id, importer) {
      if (id === INTERFACE_WRAP_PROXY_TO_WASM_PKG_ROLLUP_ID) return id
      if (id === WASM_PKG_ROLLUP_ID) return WASM_PKG_TARGET_ROLLUP_ID
      if (id === WASM_PKG_TARGET_ROLLUP_ID) return id
      if (id === WASM_PKG_COPIED_ENTRY_EXTERNAL && importer === WASM_PKG_TARGET_ROLLUP_ID) return { id, external: true }
      // in this mode, we import it to do `createRequire()`
      if (id === 'module' && mode === 'cjs-in-esm') return { id, external: true }
    },
    async load(id) {
      if (id === INTERFACE_WRAP_PROXY_TO_WASM_PKG_ROLLUP_ID) {
        return match(mode)
          .with('cjs-in-esm', () => `export { namespaceAsNamedExport as wasmPkg } from '${WASM_PKG_TARGET_ROLLUP_ID}'`)
          .with(
            'esm-reexport',
            'types',
            () => `import * as wasmPkg from '${WASM_PKG_TARGET_ROLLUP_ID}'\nexport { wasmPkg }`,
          )
          .exhaustive()
      }
      if (id === WASM_PKG_TARGET_ROLLUP_ID) {
        return match(mode)
          .with('types', () => {
            const id = path.join(wasmPackOutDirForTarget(target), WASM_PACK_OUT_NAME + `.d.ts`)
            let source = `export * from '${id}'\n`
            if (target === 'web') source += `export { default } from '${id}'\n`
            return source
          })
          .with('esm-reexport', 'cjs-in-esm', async (mode): Promise<string> => {
            const assets = await readWasmPkgAssets(target)

            for (const { fileName, content } of assets) {
              this.emitFile({
                type: 'asset',
                fileName: path.join(WASM_PKG_ASSETS_DIR, fileName),
                source: content,
              })
            }

            return match(mode)
              .with('esm-reexport', () => {
                let source = `export * from '${WASM_PKG_COPIED_ENTRY_EXTERNAL}'\n`
                if (target === 'web') source += `export { default } from '${WASM_PKG_COPIED_ENTRY_EXTERNAL}'\n`
                return source
              })
              .with(
                'cjs-in-esm',
                () =>
                  `import { createRequire } from 'module'\n` +
                  `const wasmPkg = createRequire(import.meta.url)('${WASM_PKG_COPIED_ENTRY_EXTERNAL}')\n` +
                  `export { wasmPkg as namespaceAsNamedExport }`,
              )
              .exhaustive()
          })
          .exhaustive()
      }
    },
  }
}

/**
 * Rollup plugin to redirect imports from `@iroha2/crypto-util` to `@iroha2/crypto-core`, since the core package
 * re-exports everything from the util one.
 */
function redirectCryptoUtilToCore(): Plugin {
  return {
    name: 'redirect-from-crypto-util-to-crypto-core',
    resolveId(id) {
      if (id === '@iroha2/crypto-util') return '@iroha2/crypto-core'
    },
  }
}

/**
 * By default, imports of `@iroha2/crypto-interface-wrap` will resolve to `src/main.ts`,
 * which is especially bad for types - declarations will contain actual TS code instead
 * of pure types.
 *
 * For consistency TS-compiled JavaScript is imported too
 */
function resolveCryptoInterfaceWrapEntry(entry: 'types' | 'js'): Plugin {
  const PKG = 'crypto-interface-wrap' as const
  const root = packageRoot(PKG)
  const resolveTo = path.join(
    root,
    'dist-tsc',
    'lib' +
      match(entry)
        .with('types', () => '.d.ts')
        .with('js', () => '.js')
        .exhaustive(),
  )
  const pkgFull = scopePackage(PKG)

  return {
    name: 'resolve-crypto-interface-wrap-entry',
    resolveId: (id) => {
      if (id === pkgFull) return resolveTo
    },
  }
}

/**
 * @param root the root of the package
 * @param entry the file relative to `${root}/src`, without extension
 * @param externalSet
 */
function simpleOptions(root: string, entry: string, externalSet: Set<string>) {
  const inputBase = path.join(root, 'dist-tsc', entry)
  const outputBase = path.join(root, 'dist', entry)
  const external = externalSet.toArray()

  return {
    types: {
      input: `${inputBase}.d.ts`,
      external,
      plugins: [replaceVitest(), dts({ respectExternal: true })],
      output: { format: 'esm', file: `${outputBase}.d.ts` },
    } satisfies RollupOptions,
    js: {
      input: `${inputBase}.js`,
      external,
      plugins: [replaceVitest()],
      output: [
        { format: 'esm', file: `${outputBase}.mjs` },
        { format: 'cjs', file: `${outputBase}.cjs` },
      ],
    } satisfies RollupOptions,
  }
}

function* simpleOptionsAsGen(...args: Parameters<typeof simpleOptions>): Generator<RollupOptions> {
  const { types, js } = simpleOptions(...args)
  yield types
  yield js
}

async function* rollupCryptoTarget(
  target: IrohaCryptoTarget,
  ...formats: ('types' | 'esm' | 'cjs')[]
): AsyncGenerator<RollupOptions> {
  const pkg = `crypto-target-${target}` as const
  const root = packageRoot(pkg)
  const deps = await loadProductionDependencies(pkg)

  const inputBase = path.join(root, `dist-tsc/lib`)
  const outputBase = path.join(root, `dist/lib`)

  for (const format of formats) {
    yield match(format)
      .with(
        'types',
        (): RollupOptions => ({
          input: `${inputBase}.d.ts`,
          external: deps.toArray(),
          plugins: [
            resolveCryptoInterfaceWrapEntry('types'),
            redirectCryptoUtilToCore(),
            wasmPkg(IrohaCryptoTarget.toWasmPackTarget(target), 'types'),
            dts({ respectExternal: true }),
          ],
          output: {
            format: 'esm',
            file: `${outputBase}.d.ts`,
          },
        }),
      )
      .with('esm', 'cjs', (format): RollupOptions => {
        const isNodeEsm = target === 'node' && format === 'esm'

        return {
          input: `${inputBase}.js`,
          external: deps.toArray(),
          plugins: [
            resolveCryptoInterfaceWrapEntry('js'),
            redirectCryptoUtilToCore(),
            wasmPkg(IrohaCryptoTarget.toWasmPackTarget(target), isNodeEsm ? 'cjs-in-esm' : 'esm-reexport'),
          ],
          output: {
            format,
            file:
              outputBase +
              match(format)
                .with('esm', () => '.mjs')
                .with('cjs', () => `.cjs`)
                .exhaustive(),
          },
        }
      })
      .exhaustive()
  }
}

async function* generateRolls(): AsyncGenerator<RollupOptions> {
  for (const pkg of PACKAGES_TO_ROLLUP.toList().sort()) {
    yield* match(pkg)
      .with('client', async function* (pkg): AsyncGenerator<RollupOptions> {
        const root = packageRoot(pkg)
        const external = (await loadProductionDependencies(pkg))
          .remove('json-bigint')
          .add('json-bigint/lib/parse.js')
          .add(scopePackage(pkg))
          .toArray()

        const ENTRIES = ['lib', 'web-socket/native', 'web-socket/node'] as const
        const entryInput = (entry: (typeof ENTRIES)[number], ext: 'js' | 'd.ts'): string =>
          path.join(rootTsBuild, `${entry}.${ext}`)

        const rootTsBuild = path.join(root, 'dist-tsc')
        const dist = path.join(root, 'dist')

        const dirEsm = 'esm'
        const dirCjs = 'cjs'
        const dirTypes = 'types'

        // ESM / CJS

        yield {
          input: pipe(
            ENTRIES.map((x) => [x, entryInput(x, 'js')] as const),
            Object.fromEntries,
          ),
          external,
          plugins: [replaceVitest()],
          output: [
            {
              format: 'esm',
              dir: path.join(dist, dirEsm),
              entryFileNames: `[name].mjs`,
              preserveModules: true,
              preserveModulesRoot: rootTsBuild,
            },
            {
              format: 'cjs',
              dir: path.join(dist, dirCjs),
              entryFileNames: `[name].cjs`,
            },
          ],
        }

        // TYPES

        yield {
          input: pipe(
            ENTRIES.map((x) => [x, entryInput(x, 'd.ts')] as const),
            Object.fromEntries,
          ),
          external,
          plugins: [replaceVitest(), dts({ respectExternal: true })],
          output: {
            format: 'esm',
            dir: path.join(dist, dirTypes),
          },
        }
      })
      .with('data-model', 'i64-fixnum', 'crypto-util', async function* (pkg): AsyncGenerator<RollupOptions> {
        const root = packageRoot(pkg)
        const deps = await loadProductionDependencies(pkg)

        yield* simpleOptionsAsGen(root, 'lib', deps)
      })
      .with('crypto-target-node', () => rollupCryptoTarget('node', 'types', 'esm', 'cjs'))
      .with('crypto-target-web', () => rollupCryptoTarget('web', 'types', 'esm'))
      .with('crypto-target-bundler', () => rollupCryptoTarget('bundler', 'types', 'esm'))
      .with('crypto-core', async function* (pkg): AsyncGenerator<RollupOptions> {
        const root = packageRoot(pkg)
        const deps = await loadProductionDependencies(pkg)

        const { types, js } = simpleOptions(root, 'lib', deps)
        types.plugins.unshift(resolveCryptoInterfaceWrapEntry('types'), wasmPkg('nodejs', 'types'))
        js.plugins.unshift(resolveCryptoInterfaceWrapEntry('js'))

        yield types
        yield js
      })
      .exhaustive()
  }
}

async function rolls(): Promise<RollupOptions[]> {
  const rolls = new Array<RollupOptions>()
  for await (const x of generateRolls()) rolls.push(x)
  return rolls
}

export default defineConfig(rolls)
