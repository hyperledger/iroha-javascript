import {
  AccountId,
  DomainId,
  EvaluatesToRegistrableBox,
  Expression,
  IdentifiableBox,
  Instruction,
  MapNameValue,
  Metadata,
  NewAccount,
  PublicKey,
  RegisterBox,
  Value,
  VecPublicKey,
} from '@iroha2/data-model'

const accountId = AccountId({
  name: 'white_rabbit',
  domain_id: DomainId({
    name: 'looking_glass',
  }),
})

const pubKey = PublicKey({
  payload: new Uint8Array([
    /* put bytes here */
  ]),
  digest_function: 'some_digest',
})

const registerAccountInstruction = Instruction(
  'Register',
  RegisterBox({
    object: EvaluatesToRegistrableBox({
      expression: Expression(
        'Raw',
        Value(
          'Identifiable',
          IdentifiableBox(
            'NewAccount',
            NewAccount({
              id: accountId,
              signatories: VecPublicKey([pubKey]),
              metadata: Metadata({ map: MapNameValue(new Map()) }),
            }),
          ),
        ),
      ),
    }),
  }),
)
