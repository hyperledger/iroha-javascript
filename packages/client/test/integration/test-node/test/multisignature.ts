import {
  getCryptoAnyway,
  build,
  makeTransactionPayload,
  Signer,
  Torii,
  computeTransactionHash,
  makeQueryPayload,
  makeVersionedSignedQuery,
} from '@iroha2/client'
import { freeScope } from '@iroha2/crypto-core'
import * as model from '@iroha2/data-model'
import { pipe } from 'fp-ts/function'
import { produce } from 'immer'
import { expect } from 'vitest'
import { clientFactory, pipelineStepDelay } from './test-util'

const crypto = getCryptoAnyway()
const { client, pre } = clientFactory()

const MAD_HATTER = build.accountId('mad_hatter', 'wonderland')
const CASOMILE_DEFINITION_ID = build.assetDefinitionId('casomile', 'wonderland')

// Generating two key pairs

const KEYS = freeScope((scope) => {
  const keys = [
    crypto.KeyGenConfiguration.default().useSeed('hex', '001122').generate(),
    crypto.KeyGenConfiguration.default().useSeed('hex', '332211').generate(),
  ] as const

  for (const x of keys) scope.forget(x)

  return keys
})

// these will be useful later
const signer1 = new Signer(MAD_HATTER, KEYS[0])
const signer2 = new Signer(MAD_HATTER, KEYS[1])

// Registering the account, the asset definition and the signature check condition
{
  const registerAccount = pipe(
    build.identifiable.newAccount(
      MAD_HATTER,
      // Using only the first key
      [freeScope(() => KEYS[0].publicKey().toDataModel())],
    ),
    build.instruction.register,
  )

  const registerAssetDefinition = pipe(
    build.identifiable.newAssetDefinition(CASOMILE_DEFINITION_ID, model.AssetValueType('Quantity')),
    build.instruction.register,
  )

  const setSignatureCondition = pipe(
    model.MintBox({
      object: model.EvaluatesToValue({
        expression: model.Expression(
          'Raw',
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
                          freeScope(() =>
                            KEYS.map((keypair) => model.Value('PublicKey', keypair.publicKey().toDataModel())),
                          ),
                        ),
                      ),
                    ),
                  }),
                }),
              ),
            }),
          ),
        ),
      }),
      destination_id: model.EvaluatesToIdBox({
        expression: model.Expression('Raw', model.Value('Id', model.IdBox('AccountId', MAD_HATTER))),
      }),
    }),
    build.instruction.mint,
  )

  await client.submitExecutable(
    pre,
    build.executable.instructions([registerAccount, registerAssetDefinition, setSignatureCondition]),
  )

  await pipelineStepDelay()
}

const MINTED = 42

const mintTransactionPayload = makeTransactionPayload({
  executable: pipe(
    model.MintBox({
      object: model.EvaluatesToValue({
        expression: model.Expression('Raw', model.Value('Numeric', model.NumericValue('U32', MINTED))),
      }),
      destination_id: model.EvaluatesToIdBox({
        expression: model.Expression(
          'Raw',
          model.Value('Id', model.IdBox('AssetId', build.assetId(MAD_HATTER, CASOMILE_DEFINITION_ID))),
        ),
      }),
    }),
    build.instruction.mint,
    build.executable.instruction,
  ),
  accountId: MAD_HATTER,
})

const txHash = computeTransactionHash(mintTransactionPayload)

// 1st transaction

const tx1 = model.VersionedSignedTransaction(
  'V1',
  model.SignedTransaction({
    payload: mintTransactionPayload,
    signatures: model.VecSignatureOfTransactionPayload([signer1.sign('array', txHash)]),
  }),
)

await Torii.submit(pre, tx1)
await pipelineStepDelay()

// 2nd transaction

const tx2 = produce(tx1, (draft) => {
  draft.enum.content.signatures.push(signer2.sign('array', txHash))
})

await Torii.submit(pre, tx2)
await pipelineStepDelay()

// Checking results

const result = await Torii.request(
  pre,
  pipe(
    build.find.assetByAccountId(MAD_HATTER),
    (query) => makeQueryPayload({ query, accountId: MAD_HATTER }),
    (payload) => makeVersionedSignedQuery(payload, signer1),
  ),
)

const asset = result
  .as('Ok')
  .result.enum.as('Vec')
  .map((x) => x.enum.as('Identifiable').enum.as('Asset'))
  .find((x) => x.id.definition_id.name === CASOMILE_DEFINITION_ID.name)

expect(asset).toBeTruthy()
expect(asset!.value.enum.as('Quantity')).toEqual(MINTED)
// tear down

for (const x of KEYS) x.free()