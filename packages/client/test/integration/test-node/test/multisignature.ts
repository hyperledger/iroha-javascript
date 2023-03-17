import {
  Signer,
  Torii,
  computeTransactionHash,
  getCryptoAnyway,
  makeQueryPayload,
  makeTransactionPayload,
  makeVersionedSignedQuery,
  makeVersionedSignedTransaction,
} from '@iroha2/client'
import { freeScope } from '@iroha2/crypto-core'
import * as model from '@iroha2/data-model'
import { pipe } from 'fp-ts/function'
import { produce } from 'immer'
import { expect } from 'vitest'
import { clientFactory, pipelineStepDelay } from './test-util'

const crypto = getCryptoAnyway()
const { client: clientAdmin, pre } = clientFactory()

const MAD_HATTER = model.sugar.accountId('mad_hatter', 'wonderland')
const CASOMILE_DEFINITION_ID = model.sugar.assetDefinitionId('casomile', 'wonderland')

// Generating two key pairs

const KEYS = freeScope((scope) => {
  const keys = [
    crypto.KeyGenConfiguration.default().useSeed('hex', '001122').generate(),
    crypto.KeyGenConfiguration.default().useSeed('hex', '332211').generate(),
  ] as const

  for (const x of keys) scope.forget(x)

  return keys
})

// these signers will be useful later
const signer1 = new Signer(MAD_HATTER, KEYS[0])
const signer2 = new Signer(MAD_HATTER, KEYS[1])

// Registering the account, the asset definition and the signature check condition
{
  const registerAccount = pipe(
    model.sugar.identifiable.newAccount(
      MAD_HATTER,
      // Using only the first key
      [freeScope(() => KEYS[0].publicKey().toDataModel())],
    ),
    model.sugar.instruction.register,
  )

  const registerAssetDefinition = pipe(
    model.sugar.identifiable.newAssetDefinition(CASOMILE_DEFINITION_ID, model.AssetValueType('Quantity'), {
      mintable: model.Mintable('Infinitely'),
    }),
    model.sugar.instruction.register,
  )

  const setSignatureCondition = model.sugar.instruction.mint(
    model.Value(
      'SignatureCheckCondition',
      model.EvaluatesToBool({
        expression: model.Expression(
          'ContainsAll',
          model.ContainsAll({
            collection: model.EvaluatesToVecValue({
              expression: model.Expression(
                'ContextValue',
                model.ContextValue({
                  value_name:
                    // FIXME magic constant
                    'transaction_signatories',
                }),
              ),
            }),
            elements: model.EvaluatesToVecValue({
              expression: model.Expression(
                'Raw',
                model.Value(
                  'Vec',
                  model.VecValue(
                    freeScope(() => KEYS.map((keypair) => model.Value('PublicKey', keypair.publicKey().toDataModel()))),
                  ),
                ),
              ),
            }),
          }),
        ),
      }),
    ),
    model.IdBox('AccountId', MAD_HATTER),
  )

  // register Mad Hatter with the admin account
  await clientAdmin.submitExecutable(pre, model.sugar.executable.instructions(registerAccount))
  await pipelineStepDelay()

  // Register the asset definition with the Mad Hatter's account
  await Torii.submit(
    pre,
    pipe(
      model.sugar.executable.instructions([registerAssetDefinition, setSignatureCondition]),
      (executable) => makeTransactionPayload({ executable, accountId: MAD_HATTER }),
      (x) => makeVersionedSignedTransaction(x, signer1),
    ),
  )
  await pipelineStepDelay()
}

// Preparing MST transaction payload

const MINTED = 42

const mintTransactionPayload = makeTransactionPayload({
  executable: pipe(
    model.sugar.instruction.mint(
      model.sugar.value.numericU32(MINTED),
      model.IdBox('AssetId', model.sugar.assetId(MAD_HATTER, CASOMILE_DEFINITION_ID)),
    ),
    model.sugar.executable.instructions,
  ),
  accountId: MAD_HATTER,
})

const txHash = computeTransactionHash(mintTransactionPayload)

// 1st transaction, signed only with the first key

const tx1 = model.VersionedSignedTransaction(
  'V1',
  model.SignedTransaction({
    payload: mintTransactionPayload,
    signatures: model.VecSignatureOfTransactionPayload([signer1.sign('array', txHash)]),
  }),
)

await Torii.submit(pre, tx1)
await pipelineStepDelay()

// Check that the asset is not minted

// we will use this function twice - now and after the second transaction
async function findAsset(): Promise<model.Asset | null> {
  const result = await Torii.request(
    pre,
    pipe(
      model.sugar.find.assetsByAccountId(MAD_HATTER),
      (query) => makeQueryPayload({ query, accountId: MAD_HATTER }),
      (payload) => makeVersionedSignedQuery(payload, signer1),
    ),
  )

  const asset = result
    .as('Ok')
    .result.enum.as('Vec')
    .map((x) => x.enum.as('Identifiable').enum.as('Asset'))
    .find((x) => x.id.definition_id.name === CASOMILE_DEFINITION_ID.name)

  return asset ?? null
}

{
  const asset = await findAsset()
  expect(asset).toBeNull()
}

// 2nd transaction, signed with both keys

const tx2 =
  // we use `produce` from `immer` library
  // it allows us to produce a new value from `tx1` without touching it in a declarative way
  produce(tx1, (draft) => {
    draft.enum.content.signatures.push(signer2.sign('array', txHash))
  })

await Torii.submit(pre, tx2)
await pipelineStepDelay()

// Checking results after the second transaction

{
  const asset = await findAsset()
  expect(asset).not.toBeNull()
  expect(asset!.value.enum.as('Quantity')).toEqual(MINTED)
}

// Finally, we collect our garbage

for (const x of KEYS) x.free()
