import {
  AccountId,
  DomainId,
  PublicKey,
  RegisterBox,
  Expression,
  Value,
  IdentifiableBox,
  EvaluatesToIdentifiableBox,
  Metadata,
  NewAccount,
  VecPublicKey,
  BTreeMapNameValue,
  Instruction,
} from '@iroha2/data-model'

const accountId = AccountId({
  name: 'white_rabbit',
  domain_id: DomainId({
    name: 'looking_glass',
  }),
})

const key = PublicKey({
  payload: new Uint8Array([
    /* put bytes here */
  ]),
  digest_function: 'some_digest',
})

const registerAccountInstruction = Instruction(
  'Register',
  RegisterBox({
    object: EvaluatesToIdentifiableBox({
      expression: Expression(
        'Raw',
        Value(
          'Identifiable',
          IdentifiableBox(
            'NewAccount',
            NewAccount({
              id: accountId,
              signatories: VecPublicKey([key]),
              metadata: Metadata({ map: BTreeMapNameValue(new Map()) }),
            }),
          ),
        ),
      ),
    }),
  }),
)
