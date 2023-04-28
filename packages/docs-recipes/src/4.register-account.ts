// #region imports
import {
  AccountId,
  Algorithm,
  DomainId,
  Expression,
  IdentifiableBox,
  InstructionBox,
  Metadata,
  NewAccount,
  PublicKey,
  RegisterBox,
  SortedMapNameValue,
  SortedVecPublicKey,
  Value,
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
const registerAccountInstruction = InstructionBox(
  'Register',
  RegisterBox({
    object: Expression(
      'Raw',
      Value(
        'Identifiable',
        IdentifiableBox(
          'NewAccount',
          NewAccount({
            id: accountId, // [!code hl:2]
            signatories: SortedVecPublicKey([pubKey]),
            metadata: Metadata({ map: SortedMapNameValue(new Map()) }),
          }),
        ),
      ),
    ),
  }),
)
// #endregion isi
