import { Plugin, RollupOptions, defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import {
  INTERFACE_WRAP_PROXY_TO_WASM_PKG_ROLLUP_ID,
  IrohaCryptoTarget,
  RollupPackage,
  WASM_PACK_OUT_NAME,
  WASM_PKG_ROLLUP_ID,
  WasmPackTarget,
  toWasmPackTarget,
  wasmPackOutDirForTarget,
} from './meta'
import path from 'path'
import { match } from 'ts-pattern'
import { glob } from 'zx'
import fs from 'fs/promises'
import { PackageJson } from 'type-fest'

/**
 * This function implements the important convention: production dependencies of the package, written in `package.json`,
 * are also its Rollup externals. It allows to avoid mismatch between dev and deploy (NPM-published) environment.
 */
async function loadDependencies(pkg: RollupPackage): Promise<string[]> {
  const {
    default: { dependencies },
  }: { default: PackageJson } = await import(`../packages/${pkg}/package.json`, { assert: { type: 'json' } })
  return Object.keys(dependencies ?? {})
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

function pluginWasmPkg(target: WasmPackTarget, mode: 'types' | 'esm-reexport' | 'cjs-in-esm'): Plugin {
  const WASM_PKG_TARGET_ROLLUP_ID = `${WASM_PKG_ROLLUP_ID}/${target}`
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
function pluginRedirectUtilToCore(): Plugin {
  return {
    name: 'redirect-from-crypto-util-to-crypto-core',
    resolveId(id) {
      if (id === '@iroha2/crypto-util') return '@iroha2/crypto-core'
    },
  }
}

async function optionsForPlainPackage(
  packageName: RollupPackage,
  options?: {
    /**
     * Useful for the core package
     */
    wasmPkgTypes?: { target: WasmPackTarget }
  },
): Promise<RollupOptions[]> {
  const input = `packages/${packageName}/src/lib.ts`
  const dist = `packages/${packageName}/dist`
  const external = await loadDependencies(packageName)

  return [
    {
      input,
      external,
      plugins: [
        dts({ respectExternal: true }),
        options?.wasmPkgTypes ? pluginWasmPkg(options.wasmPkgTypes.target, 'types') : null,
      ],
      output: { format: 'esm', file: path.join(dist, 'lib.d.ts') },
    },
    {
      input,
      external,
      plugins: [esbuild({ target: 'esnext' }), nodeResolve()],
      output: [
        { format: 'esm', file: path.join(dist, 'lib.mjs') },
        { format: 'cjs', file: path.join(dist, 'lib.cjs') },
      ],
    },
  ]
}

async function optionsForTarget(
  target: IrohaCryptoTarget,
  ...formats: ('types' | 'esm' | 'cjs')[]
): Promise<RollupOptions[]> {
  const targetFull = `target-${target}` as const

  const input = `packages/${targetFull}/src/lib.ts`
  const external = await loadDependencies(targetFull)
  const dist = `packages/${targetFull}/dist`

  return formats.map(
    (format): RollupOptions =>
      match(format)
        .with(
          'types',
          (): RollupOptions => ({
            input,
            external,
            plugins: [
              pluginRedirectUtilToCore(),
              pluginWasmPkg(toWasmPackTarget(target), 'types'),
              dts({ respectExternal: true }),
            ],
            output: {
              format: 'esm',
              file: path.join(dist, 'lib.d.ts'),
            },
          }),
        )
        .with('esm', 'cjs', (format): RollupOptions => {
          const isNodeEsm = target === 'node' && format === 'esm'

          return {
            input,
            external,
            plugins: [
              pluginRedirectUtilToCore(),
              pluginWasmPkg(toWasmPackTarget(target), isNodeEsm ? 'cjs-in-esm' : 'esm-reexport'),
              esbuild({ target: 'esnext' }),
              nodeResolve(),
            ],
            output: {
              format,
              file: path.join(
                dist,
                'lib.' +
                  match(format)
                    .with('esm', () => 'mjs')
                    .with('cjs', (a) => a)
                    .exhaustive(),
              ),
            },
          }
        })
        .exhaustive(),
  )
}

export default defineConfig(async () => [
  ...(await optionsForPlainPackage('util')),

  ...(await optionsForPlainPackage('core', { wasmPkgTypes: { target: 'nodejs' } })),

  ...(await optionsForTarget('node', 'types', 'esm', 'cjs')),
  ...(await optionsForTarget('web', 'types', 'esm')),
  ...(await optionsForTarget('bundler', 'types', 'esm')),
])
