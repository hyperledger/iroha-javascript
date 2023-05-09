import * as testPeerClient from '@iroha2/test-peer/src/api/client'

testPeerClient.setBaseURL('/peer-server')

before(async () => {
  await testPeerClient.prepareConfiguration()
})

beforeEach(async () => {
  await testPeerClient.killPeer()
  await testPeerClient.clearPeerStorage()
  await testPeerClient.startPeer()
})

it('Register new domain and wait until commitment', () => {
  cy.visit('/')

  // wait for genesis commitment
  cy.get('h3').contains('Status').closest('div').contains('Blocks: 1')

  cy.get('button').contains('Listen').click().contains('Stop')

  cy.get('input').type('bob')
  cy.get('button').contains('Register domain').click()

  // Ensure that blocks count is incremented
  cy.contains('Blocks: 2')

  // And that events are caught
  cy.get('ul.events-list').children('li').should('have.length', 1)
})
