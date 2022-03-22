import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

/**
 * Primarily it is for development
 */
export default defineConfig({
  input: '__entry-core-types-rollup.d.ts',
  plugins: [
    dts({ respectExternal: true }),
    {
      name: 'append-eslint-disable',
      intro: '/* eslint-disable */',
    },
  ],
  output: {
    file: 'packages/core/index.d.ts',
    format: 'esm',
  },
})
