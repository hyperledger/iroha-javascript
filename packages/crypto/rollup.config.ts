import { defineConfig, Plugin } from 'rollup'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import {
  WASM_PACK_CRATE_DIR,
  WASM_PACK_OUT_NAME,
  WASM_PKG_ROLLUP_ID,
  wasmPackOutDirForTarget,
  WasmPackTarget,
} from './etc/meta'
import path from 'path'
import { match } from 'ts-pattern'

function pluginResolveWasmPkg(target: WasmPackTarget, extension: 'dts' | 'js'): Plugin {
  return {
    name: 'resolve-wasm-pkg',
    resolveId: (id) => {
      if (id === WASM_PKG_ROLLUP_ID)
        return path.join(
          wasmPackOutDirForTarget(target),
          WASM_PACK_OUT_NAME +
            match(extension)
              .with('dts', () => '.d.ts')
              .with('js', () => '.js')
              .exhaustive(),
        )
    },
  }
}

/**
 * Primarily it is for development
 */
export default defineConfig([
  {
    input: 'packages/core/src/lib.ts',
    plugins: [dts({ respectExternal: true }), pluginResolveWasmPkg('nodejs', 'dts')],
    output: {
      format: 'esm',
      file: 'packages/core/dist/lib.d.ts',
    },
  },
  {
    input: 'packages/target-node/src/lib.ts',
    plugins: [
      pluginResolveWasmPkg('nodejs', 'js'),
      nodeResolve(),
      esbuild({
        target: 'esnext',
      }),
    ],
    output: [
      // { format: 'esm', file: 'packages/target-node/dist/lib.mjs' },
      // { format: 'esm', file: 'packages/target-node/dist/lib.d.ts', plugins: [dts({ respectExternal: true })] },
      { format: 'cjs', file: 'packages/target-node/dist/lib.cjs' },
    ],
  },
])
