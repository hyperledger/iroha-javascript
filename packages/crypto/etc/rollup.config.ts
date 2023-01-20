import { RollupOptions, defineConfig, Plugin } from 'rollup'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import {
  IrohaCryptoTarget,
  WASM_PACK_OUT_NAME,
  WASM_PKG_ROLLUP_ID,
  WasmPackTarget,
  irohaCryptoTargetOrCorePackagePaths,
  toWasmPackTarget,
  wasmPackOutDirForTarget,
  INTERFACE_WRAP_PROXY_TO_WASM_PKG_ROLLUP_ID,
} from './meta'
import path from 'path'
import { match } from 'ts-pattern'
import { glob } from 'zx'
import fs from 'fs/promises'


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
            return `export * from '${id}'\nexport { default } from '${id}'`
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
              .with(
                'esm-reexport',
                () =>
                  `export * from '${WASM_PKG_COPIED_ENTRY_EXTERNAL}'\n` +
                  `export { default } from '${WASM_PKG_COPIED_ENTRY_EXTERNAL}'`,
              )
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

function optionsForTargetTypes(target: IrohaCryptoTarget): RollupOptions {
  const { dist, libFile } = irohaCryptoTargetOrCorePackagePaths(target)

  return {
    input: libFile,
    plugins: [dts({ respectExternal: true }), pluginWasmPkg(toWasmPackTarget(target), 'types')],
    output: {
      format: 'esm',
      file: path.join(dist, 'lib.d.ts'),
    },
  }
}

function optionsForTargetBundle(target: IrohaCryptoTarget, format: 'cjs' | 'esm'): RollupOptions {
  const { dist, libFile } = irohaCryptoTargetOrCorePackagePaths(target)

  const isNodeEsm = target === 'node' && format === 'esm'

  return {
    input: libFile,
    plugins: [
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
}

function optionsForCoreTypes(whichTargetToUse: WasmPackTarget): RollupOptions {
  return {
    input: 'packages/core/src/lib.ts',
    plugins: [dts({ respectExternal: true }), pluginWasmPkg(whichTargetToUse, 'types')],
    output: {
      format: 'esm',
      file: 'packages/core/dist/lib.d.ts',
    },
  }
}

export default defineConfig([
  optionsForCoreTypes('nodejs'),

  optionsForTargetTypes('node'),
  optionsForTargetBundle('node', 'cjs'),
  optionsForTargetBundle('node', 'esm'),

  optionsForTargetTypes('web'),
  optionsForTargetBundle('web', 'esm'),

  optionsForTargetTypes('bundler'),
  optionsForTargetBundle('bundler', 'esm'),
])
