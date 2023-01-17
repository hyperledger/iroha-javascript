import { Torii, ToriiRequirementsForApiWebSocket } from '@iroha2/client'

declare const requirements: ToriiRequirementsForApiWebSocket

const stream = await Torii.listenForBlocksStream(requirements, {
  height: 0n,
})

stream.ee.on('block', (block) => {
  const height = block.as('V1').header.height
  console.log('Got block with height', height)
})
