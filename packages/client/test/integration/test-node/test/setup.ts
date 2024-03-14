import { FREE_HEAP } from '@iroha2/crypto-core'
import { setCrypto } from '@iroha2/client'
import { crypto } from '@iroha2/crypto-target-node'
import { Logger as ScaleLogger } from '@iroha2/data-model'
import { afterAll, expect } from 'vitest'

declare global {
  // eslint-disable-next-line no-var,no-inner-declarations
  var __clientTestNodeSetupOnce: boolean | undefined
}

// For some reason, `crypto` resets each time between test files, while Scale Logger sets once
setCrypto(crypto)

if (!globalThis.__clientTestNodeSetupOnce) {
  new ScaleLogger().mount()
  globalThis.__clientTestNodeSetupOnce = true
}

afterAll(() => {
  // Ensuring there are no leaks in crypto operations
  expect(FREE_HEAP.size).toEqual(0)
})
