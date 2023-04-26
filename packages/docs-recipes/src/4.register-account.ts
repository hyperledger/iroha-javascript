// #region imports
import {
  AccountId,
  Algorithm,
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
// #endregion imports

// #region account
const accountId = AccountId({
  name: 'white_rabbit',
  domain_id: DomainId({
    name: 'looking_glass',
  }),
})
// #endregion account

// #region pubkey
const pubKey = PublicKey({
  payload: new Uint8Array([
    /* put bytes here */
  ]),
  digest_function: Algorithm('Ed25519'),
})
// #endregion pubkey

// #region isi
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
              id: accountId, // [!code hl:2]
              signatories: VecPublicKey([pubKey]),
              metadata: Metadata({ map: MapNameValue(new Map()) }),
            }),
          ),
        ),
      ),
    }),
  }),
)
// #endregion isi
