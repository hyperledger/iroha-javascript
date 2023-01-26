import { Plugin, RollupOptions, defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import { glob } from 'zx'
import { match } from 'ts-pattern'
import path from 'path'
import { Set } from 'immutable'
import fs from 'fs/promises'
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

function esbuildDefault() {
  return esbuild({ target: 'esnext' })
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
      plugins: [replaceVitest(), esbuildDefault()],
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
  const external = deps.toArray()

  const inputBase = path.join(root, `dist-tsc/lib`)
  const outputBase = path.join(root, `dist/lib`)

  for (const format of formats) {
    yield match(format)
      .with(
        'types',
        (): RollupOptions => ({
          input: `${inputBase}.d.ts`,
          external,
          plugins: [
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
          external,
          plugins: [
            redirectCryptoUtilToCore(),
            wasmPkg(IrohaCryptoTarget.toWasmPackTarget(target), isNodeEsm ? 'cjs-in-esm' : 'esm-reexport'),
            esbuildDefault(),
            // FIXME do it with custom resolver to avoid unexpected inclusions?
            //       it seems that it is enough to explicitly resolve just `@iroha2/crypto-interface-wrap` and `module`
            nodeResolve(),
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
  for (const pkg of PACKAGES_TO_ROLLUP) {
    yield* match(pkg)
      .with('client', async function* (pkg): AsyncGenerator<RollupOptions> {
        const root = packageRoot(pkg)
        const deps = (await loadProductionDependencies(pkg)).remove('json-bigint').add('json-bigint/lib/parse.js')
        const depsWithSelf = deps.add(scopePackage(pkg))

        yield* simpleOptionsAsGen(root, 'lib', deps)
        yield* simpleOptionsAsGen(root, 'web-socket/native', depsWithSelf)
        yield* simpleOptionsAsGen(root, 'web-socket/node', depsWithSelf)
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
        types.plugins.unshift(wasmPkg('nodejs', 'types'))

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
