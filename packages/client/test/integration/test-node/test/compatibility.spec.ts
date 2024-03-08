/**
 * This file is for Compatibility Matrix tests, which assigns specific
 * Allure context tags.
 */

import * as allure from 'allure-vitest'
import { pipe } from 'fp-ts/function'
import { describe, test, expect } from 'vitest'
import { clientFactory, setupPeerTestsLifecycle } from './util'
import { datamodel, sugar } from '@iroha2/data-model'

setupPeerTestsLifecycle()

// TODO: consider adding shared context for tests?
// beforeEach(() => { ... })

// Read Allure API: https://allurereport.org/docs/vitest-reference/
describe('Compatibility Matrix tests', () => {
  // Based on https://github.com/AlexStroke/iroha-java/blob/007a9ac55991cd8a2b519e62a10144156d9f8301/modules/client/src/test/kotlin/jp/co/soramitsu/iroha2/InstructionsTest.kt#L134
  test('register domain', async (ctx) => {
    await allure.feature(ctx, 'Domains')
    await allure.story(ctx, 'Account registers a domain')
    // TODO: add more Allure context

    const DOMAIN_NAME = 'new_domain_name'

    const { pre, client, getBlocksListener } = clientFactory()
    const blocks = await getBlocksListener()

    await blocks.wait(async () => {
      await client.submitExecutable(
        pre,
        pipe(sugar.identifiable.newDomain(DOMAIN_NAME), sugar.instruction.register, sugar.executable.instructions),
      )
    })

    const result = (
      await client.requestWithQueryBox(
        pre,
        datamodel.QueryBox(
          'FindDomainById',
          datamodel.FindDomainById({
            id: datamodel.Expression(
              'Raw',
              datamodel.Value('Id', datamodel.IdBox('DomainId', sugar.domainId(DOMAIN_NAME))),
            ),
          }),
        ),
      )
    )
      .as('Ok')
      .batch.enum.as('Identifiable')
      .enum.as('Domain')

    expect(result.id.name).toEqual(DOMAIN_NAME)
  })
})
