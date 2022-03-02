import { Bool, BoolCodec, Codec, Compact, CompactCodec, Enum, Option, Str, StrCodec, U128, U128Codec, U32, U32Codec, U64, U64Codec, VecU8, VecU8Codec, createArrayU8Codec, createEnumCodec, createMapCodec, createOptionCodec, createStructCodec, createVecCodec, dynCodec } from '@scale-codec/definition-runtime'

// Helpers

type PseudoType<T> = T

// Account

export interface Account extends PseudoType<{
    id: AccountId,
    assets: BTreeMapAssetIdAsset,
    signatories: VecPublicKey,
    permission_tokens: BTreeSetPermissionToken,
    signature_check_condition: SignatureCheckCondition,
    metadata: Metadata
}> {}

export const AccountCodec: Codec<Account> = createStructCodec<any>('Account', [['id', dynCodec(() => AccountIdCodec) as any], ['assets', dynCodec(() => BTreeMapAssetIdAssetCodec) as any], ['signatories', dynCodec(() => VecPublicKeyCodec) as any], ['permission_tokens', dynCodec(() => BTreeSetPermissionTokenCodec) as any], ['signature_check_condition', dynCodec(() => SignatureCheckConditionCodec) as any], ['metadata', dynCodec(() => MetadataCodec) as any]]) as any

// AccountId

export interface AccountId extends PseudoType<{
    name: Name,
    domain_id: Id
}> {}

export const AccountIdCodec: Codec<AccountId> = createStructCodec<any>('AccountId', [['name', dynCodec(() => NameCodec) as any], ['domain_id', dynCodec(() => IdCodec) as any]]) as any

// Action

export interface Action extends PseudoType<{
    executable: Executable,
    repeats: Repeats,
    technical_account: AccountId,
    filter: EventFilter
}> {}

export const ActionCodec: Codec<Action> = createStructCodec<any>('Action', [['executable', dynCodec(() => ExecutableCodec) as any], ['repeats', dynCodec(() => RepeatsCodec) as any], ['technical_account', dynCodec(() => AccountIdCodec) as any], ['filter', dynCodec(() => EventFilterCodec) as any]]) as any

// Add

export interface Add extends PseudoType<{
    left: EvaluatesToU32,
    right: EvaluatesToU32
}> {}

export const AddCodec: Codec<Add> = createStructCodec<any>('Add', [['left', dynCodec(() => EvaluatesToU32Codec) as any], ['right', dynCodec(() => EvaluatesToU32Codec) as any]]) as any

// And

export interface And extends PseudoType<{
    left: EvaluatesToBool,
    right: EvaluatesToBool
}> {}

export const AndCodec: Codec<And> = createStructCodec<any>('And', [['left', dynCodec(() => EvaluatesToBoolCodec) as any], ['right', dynCodec(() => EvaluatesToBoolCodec) as any]]) as any

// ArrayU8L32

export type ArrayU8L32 = Uint8Array

export const ArrayU8L32Codec: Codec<ArrayU8L32> = createArrayU8Codec('ArrayU8L32', 32) as any

// Asset

export interface Asset extends PseudoType<{
    id: AssetId,
    value: AssetValue
}> {}

export const AssetCodec: Codec<Asset> = createStructCodec<any>('Asset', [['id', dynCodec(() => AssetIdCodec) as any], ['value', dynCodec(() => AssetValueCodec) as any]]) as any

// AssetDefinition

export interface AssetDefinition extends PseudoType<{
    value_type: AssetValueType,
    id: DefinitionId,
    metadata: Metadata,
    mintable: Bool
}> {}

export const AssetDefinitionCodec: Codec<AssetDefinition> = createStructCodec<any>('AssetDefinition', [['value_type', dynCodec(() => AssetValueTypeCodec) as any], ['id', dynCodec(() => DefinitionIdCodec) as any], ['metadata', dynCodec(() => MetadataCodec) as any], ['mintable', dynCodec(() => BoolCodec) as any]]) as any

// AssetDefinitionEntry

export interface AssetDefinitionEntry extends PseudoType<{
    definition: AssetDefinition,
    registered_by: AccountId
}> {}

export const AssetDefinitionEntryCodec: Codec<AssetDefinitionEntry> = createStructCodec<any>('AssetDefinitionEntry', [['definition', dynCodec(() => AssetDefinitionCodec) as any], ['registered_by', dynCodec(() => AccountIdCodec) as any]]) as any

// AssetId

export interface AssetId extends PseudoType<{
    definition_id: DefinitionId,
    account_id: AccountId
}> {}

export const AssetIdCodec: Codec<AssetId> = createStructCodec<any>('AssetId', [['definition_id', dynCodec(() => DefinitionIdCodec) as any], ['account_id', dynCodec(() => AccountIdCodec) as any]]) as any

// AssetUpdated

export interface AssetUpdated extends Enum<
    | 'Received'
    | 'Sent'
> {}

export const AssetUpdatedCodec: Codec<AssetUpdated> = createEnumCodec<any>('AssetUpdated', [[0, 'Received'], [1, 'Sent']]) as any

// AssetValue

export interface AssetValue extends Enum<
    | ['Quantity', U32]
    | ['BigQuantity', U128]
    | ['Fixed', Fixed]
    | ['Store', Metadata]
> {}

export const AssetValueCodec: Codec<AssetValue> = createEnumCodec<any>('AssetValue', [[0, 'Quantity', dynCodec(() => U32Codec)], [1, 'BigQuantity', dynCodec(() => U128Codec)], [2, 'Fixed', dynCodec(() => FixedCodec)], [3, 'Store', dynCodec(() => MetadataCodec)]]) as any

// AssetValueType

export interface AssetValueType extends Enum<
    | 'Quantity'
    | 'BigQuantity'
    | 'Fixed'
    | 'Store'
> {}

export const AssetValueTypeCodec: Codec<AssetValueType> = createEnumCodec<any>('AssetValueType', [[0, 'Quantity'], [1, 'BigQuantity'], [2, 'Fixed'], [3, 'Store']]) as any

// BlockCreationTimeout

import { Void as BlockCreationTimeout, VoidCodec as BlockCreationTimeoutCodec } from '@scale-codec/definition-runtime'

export { BlockCreationTimeout, BlockCreationTimeoutCodec }

// BlockHeader

export interface BlockHeader extends PseudoType<{
    timestamp: U128,
    height: U64,
    previous_block_hash: HashOfVersionedCommittedBlock,
    transactions_hash: HashOfMerkleTreeVersionedTransaction,
    rejected_transactions_hash: HashOfMerkleTreeVersionedTransaction,
    view_change_proofs: ProofChain,
    invalidated_blocks_hashes: VecHashOfVersionedValidBlock,
    genesis_topology: OptionTopology
}> {}

export const BlockHeaderCodec: Codec<BlockHeader> = createStructCodec<any>('BlockHeader', [['timestamp', dynCodec(() => U128Codec) as any], ['height', dynCodec(() => U64Codec) as any], ['previous_block_hash', dynCodec(() => HashOfVersionedCommittedBlockCodec) as any], ['transactions_hash', dynCodec(() => HashOfMerkleTreeVersionedTransactionCodec) as any], ['rejected_transactions_hash', dynCodec(() => HashOfMerkleTreeVersionedTransactionCodec) as any], ['view_change_proofs', dynCodec(() => ProofChainCodec) as any], ['invalidated_blocks_hashes', dynCodec(() => VecHashOfVersionedValidBlockCodec) as any], ['genesis_topology', dynCodec(() => OptionTopologyCodec) as any]]) as any

// BlockPublisherMessage

export interface BlockPublisherMessage extends Enum<
    | 'SubscriptionAccepted'
    | ['Block', VersionedCommittedBlock]
> {}

export const BlockPublisherMessageCodec: Codec<BlockPublisherMessage> = createEnumCodec<any>('BlockPublisherMessage', [[0, 'SubscriptionAccepted'], [1, 'Block', dynCodec(() => VersionedCommittedBlockCodec)]]) as any

// BlockRejectionReason

export interface BlockRejectionReason extends Enum<
    | 'ConsensusBlockRejection'
> {}

export const BlockRejectionReasonCodec: Codec<BlockRejectionReason> = createEnumCodec<any>('BlockRejectionReason', [[0, 'ConsensusBlockRejection']]) as any

// BlockSubscriberMessage

export interface BlockSubscriberMessage extends Enum<
    | ['SubscriptionRequest', U64]
    | 'BlockReceived'
> {}

export const BlockSubscriberMessageCodec: Codec<BlockSubscriberMessage> = createEnumCodec<any>('BlockSubscriberMessage', [[0, 'SubscriptionRequest', dynCodec(() => U64Codec)], [1, 'BlockReceived']]) as any

// BTreeMapAccountIdAccount

export interface BTreeMapAccountIdAccount extends Map<AccountId, Account> {}

export const BTreeMapAccountIdAccountCodec: Codec<BTreeMapAccountIdAccount> = createMapCodec<any, any>('BTreeMapAccountIdAccount', dynCodec(() => AccountIdCodec), dynCodec(() => AccountCodec)) as any

// BTreeMapAssetIdAsset

export interface BTreeMapAssetIdAsset extends Map<AssetId, Asset> {}

export const BTreeMapAssetIdAssetCodec: Codec<BTreeMapAssetIdAsset> = createMapCodec<any, any>('BTreeMapAssetIdAsset', dynCodec(() => AssetIdCodec), dynCodec(() => AssetCodec)) as any

// BTreeMapDefinitionIdAssetDefinitionEntry

export interface BTreeMapDefinitionIdAssetDefinitionEntry extends Map<DefinitionId, AssetDefinitionEntry> {}

export const BTreeMapDefinitionIdAssetDefinitionEntryCodec: Codec<BTreeMapDefinitionIdAssetDefinitionEntry> = createMapCodec<any, any>('BTreeMapDefinitionIdAssetDefinitionEntry', dynCodec(() => DefinitionIdCodec), dynCodec(() => AssetDefinitionEntryCodec)) as any

// BTreeMapNameValue

export interface BTreeMapNameValue extends Map<Name, Value> {}

export const BTreeMapNameValueCodec: Codec<BTreeMapNameValue> = createMapCodec<any, any>('BTreeMapNameValue', dynCodec(() => NameCodec), dynCodec(() => ValueCodec)) as any

// BTreeMapPublicKeySignatureOfCommittedBlock

export interface BTreeMapPublicKeySignatureOfCommittedBlock extends Map<PublicKey, SignatureOfCommittedBlock> {}

export const BTreeMapPublicKeySignatureOfCommittedBlockCodec: Codec<BTreeMapPublicKeySignatureOfCommittedBlock> = createMapCodec<any, any>('BTreeMapPublicKeySignatureOfCommittedBlock', dynCodec(() => PublicKeyCodec), dynCodec(() => SignatureOfCommittedBlockCodec)) as any

// BTreeMapPublicKeySignatureOfProof

export interface BTreeMapPublicKeySignatureOfProof extends Map<PublicKey, SignatureOfProof> {}

export const BTreeMapPublicKeySignatureOfProofCodec: Codec<BTreeMapPublicKeySignatureOfProof> = createMapCodec<any, any>('BTreeMapPublicKeySignatureOfProof', dynCodec(() => PublicKeyCodec), dynCodec(() => SignatureOfProofCodec)) as any

// BTreeMapPublicKeySignatureOfTransactionPayload

export interface BTreeMapPublicKeySignatureOfTransactionPayload extends Map<PublicKey, SignatureOfTransactionPayload> {}

export const BTreeMapPublicKeySignatureOfTransactionPayloadCodec: Codec<BTreeMapPublicKeySignatureOfTransactionPayload> = createMapCodec<any, any>('BTreeMapPublicKeySignatureOfTransactionPayload', dynCodec(() => PublicKeyCodec), dynCodec(() => SignatureOfTransactionPayloadCodec)) as any

// BTreeMapStringEvaluatesToValue

export interface BTreeMapStringEvaluatesToValue extends Map<Str, EvaluatesToValue> {}

export const BTreeMapStringEvaluatesToValueCodec: Codec<BTreeMapStringEvaluatesToValue> = createMapCodec<any, any>('BTreeMapStringEvaluatesToValue', dynCodec(() => StrCodec), dynCodec(() => EvaluatesToValueCodec)) as any

// BTreeSetPermissionToken

export interface BTreeSetPermissionToken extends Array<PermissionToken> {}

export const BTreeSetPermissionTokenCodec: Codec<BTreeSetPermissionToken> = createVecCodec<any>('BTreeSetPermissionToken', dynCodec(() => PermissionTokenCodec)) as any

// BTreeSetSignatureOfTransactionPayload

export interface BTreeSetSignatureOfTransactionPayload extends Array<SignatureOfTransactionPayload> {}

export const BTreeSetSignatureOfTransactionPayloadCodec: Codec<BTreeSetSignatureOfTransactionPayload> = createVecCodec<any>('BTreeSetSignatureOfTransactionPayload', dynCodec(() => SignatureOfTransactionPayloadCodec)) as any

// BTreeSetSignatureOfValidBlock

export interface BTreeSetSignatureOfValidBlock extends Array<SignatureOfValidBlock> {}

export const BTreeSetSignatureOfValidBlockCodec: Codec<BTreeSetSignatureOfValidBlock> = createVecCodec<any>('BTreeSetSignatureOfValidBlock', dynCodec(() => SignatureOfValidBlockCodec)) as any

// BurnBox

export interface BurnBox extends PseudoType<{
    object: EvaluatesToValue,
    destination_id: EvaluatesToIdBox
}> {}

export const BurnBoxCodec: Codec<BurnBox> = createStructCodec<any>('BurnBox', [['object', dynCodec(() => EvaluatesToValueCodec) as any], ['destination_id', dynCodec(() => EvaluatesToIdBoxCodec) as any]]) as any

// CommittedBlock

export interface CommittedBlock extends PseudoType<{
    header: BlockHeader,
    rejected_transactions: VecVersionedRejectedTransaction,
    transactions: VecVersionedValidTransaction,
    trigger_recommendations: VecAction,
    signatures: SignaturesOfCommittedBlock
}> {}

export const CommittedBlockCodec: Codec<CommittedBlock> = createStructCodec<any>('CommittedBlock', [['header', dynCodec(() => BlockHeaderCodec) as any], ['rejected_transactions', dynCodec(() => VecVersionedRejectedTransactionCodec) as any], ['transactions', dynCodec(() => VecVersionedValidTransactionCodec) as any], ['trigger_recommendations', dynCodec(() => VecActionCodec) as any], ['signatures', dynCodec(() => SignaturesOfCommittedBlockCodec) as any]]) as any

// CommitTimeout

export interface CommitTimeout extends PseudoType<{
    hash: HashOfVersionedValidBlock
}> {}

export const CommitTimeoutCodec: Codec<CommitTimeout> = createStructCodec<any>('CommitTimeout', [['hash', dynCodec(() => HashOfVersionedValidBlockCodec) as any]]) as any

// Contains

export interface Contains extends PseudoType<{
    collection: EvaluatesToVecValue,
    element: EvaluatesToValue
}> {}

export const ContainsCodec: Codec<Contains> = createStructCodec<any>('Contains', [['collection', dynCodec(() => EvaluatesToVecValueCodec) as any], ['element', dynCodec(() => EvaluatesToValueCodec) as any]]) as any

// ContainsAll

export interface ContainsAll extends PseudoType<{
    collection: EvaluatesToVecValue,
    elements: EvaluatesToVecValue
}> {}

export const ContainsAllCodec: Codec<ContainsAll> = createStructCodec<any>('ContainsAll', [['collection', dynCodec(() => EvaluatesToVecValueCodec) as any], ['elements', dynCodec(() => EvaluatesToVecValueCodec) as any]]) as any

// ContainsAny

export interface ContainsAny extends PseudoType<{
    collection: EvaluatesToVecValue,
    elements: EvaluatesToVecValue
}> {}

export const ContainsAnyCodec: Codec<ContainsAny> = createStructCodec<any>('ContainsAny', [['collection', dynCodec(() => EvaluatesToVecValueCodec) as any], ['elements', dynCodec(() => EvaluatesToVecValueCodec) as any]]) as any

// ContextValue

export interface ContextValue extends PseudoType<{
    value_name: Str
}> {}

export const ContextValueCodec: Codec<ContextValue> = createStructCodec<any>('ContextValue', [['value_name', dynCodec(() => StrCodec) as any]]) as any

// DataEvent

export interface DataEvent extends PseudoType<{
    entity: Entity,
    status: Status
}> {}

export const DataEventCodec: Codec<DataEvent> = createStructCodec<any>('DataEvent', [['entity', dynCodec(() => EntityCodec) as any], ['status', dynCodec(() => StatusCodec) as any]]) as any

// DataEventFilter

export interface DataEventFilter extends PseudoType<{
    entity: OptionEntityFilter,
    status: OptionStatusFilter
}> {}

export const DataEventFilterCodec: Codec<DataEventFilter> = createStructCodec<any>('DataEventFilter', [['entity', dynCodec(() => OptionEntityFilterCodec) as any], ['status', dynCodec(() => OptionStatusFilterCodec) as any]]) as any

// DefinitionId

export interface DefinitionId extends PseudoType<{
    name: Name,
    domain_id: Id
}> {}

export const DefinitionIdCodec: Codec<DefinitionId> = createStructCodec<any>('DefinitionId', [['name', dynCodec(() => NameCodec) as any], ['domain_id', dynCodec(() => IdCodec) as any]]) as any

// Divide

export interface Divide extends PseudoType<{
    left: EvaluatesToU32,
    right: EvaluatesToU32
}> {}

export const DivideCodec: Codec<Divide> = createStructCodec<any>('Divide', [['left', dynCodec(() => EvaluatesToU32Codec) as any], ['right', dynCodec(() => EvaluatesToU32Codec) as any]]) as any

// Domain

export interface Domain extends PseudoType<{
    id: Id,
    accounts: BTreeMapAccountIdAccount,
    asset_definitions: BTreeMapDefinitionIdAssetDefinitionEntry,
    metadata: Metadata,
    logo: OptionIpfsPath
}> {}

export const DomainCodec: Codec<Domain> = createStructCodec<any>('Domain', [['id', dynCodec(() => IdCodec) as any], ['accounts', dynCodec(() => BTreeMapAccountIdAccountCodec) as any], ['asset_definitions', dynCodec(() => BTreeMapDefinitionIdAssetDefinitionEntryCodec) as any], ['metadata', dynCodec(() => MetadataCodec) as any], ['logo', dynCodec(() => OptionIpfsPathCodec) as any]]) as any

// Entity

export interface Entity extends Enum<
    | ['Account', AccountId]
    | ['AssetDefinition', DefinitionId]
    | ['Asset', AssetId]
    | ['Domain', Id]
    | ['Peer', PeerId]
    | ['Trigger', Id]
> {}

export const EntityCodec: Codec<Entity> = createEnumCodec<any>('Entity', [[0, 'Account', dynCodec(() => AccountIdCodec)], [1, 'AssetDefinition', dynCodec(() => DefinitionIdCodec)], [2, 'Asset', dynCodec(() => AssetIdCodec)], [3, 'Domain', dynCodec(() => IdCodec)], [4, 'Peer', dynCodec(() => PeerIdCodec)], [5, 'Trigger', dynCodec(() => IdCodec)]]) as any

// EntityFilter

export interface EntityFilter extends Enum<
    | ['Account', OptionAccountId]
    | ['AssetDefinition', OptionDefinitionId]
    | ['Asset', OptionAssetId]
    | ['Domain', OptionId]
    | ['Peer', OptionPeerId]
> {}

export const EntityFilterCodec: Codec<EntityFilter> = createEnumCodec<any>('EntityFilter', [[0, 'Account', dynCodec(() => OptionAccountIdCodec)], [1, 'AssetDefinition', dynCodec(() => OptionDefinitionIdCodec)], [2, 'Asset', dynCodec(() => OptionAssetIdCodec)], [3, 'Domain', dynCodec(() => OptionIdCodec)], [4, 'Peer', dynCodec(() => OptionPeerIdCodec)]]) as any

// EntityType

export interface EntityType extends Enum<
    | 'Block'
    | 'Transaction'
> {}

export const EntityTypeCodec: Codec<EntityType> = createEnumCodec<any>('EntityType', [[0, 'Block'], [1, 'Transaction']]) as any

// Equal

export interface Equal extends PseudoType<{
    left: EvaluatesToValue,
    right: EvaluatesToValue
}> {}

export const EqualCodec: Codec<Equal> = createStructCodec<any>('Equal', [['left', dynCodec(() => EvaluatesToValueCodec) as any], ['right', dynCodec(() => EvaluatesToValueCodec) as any]]) as any

// EvaluatesToAccountId

export interface EvaluatesToAccountId extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToAccountIdCodec: Codec<EvaluatesToAccountId> = createStructCodec<any>('EvaluatesToAccountId', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToAssetId

export interface EvaluatesToAssetId extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToAssetIdCodec: Codec<EvaluatesToAssetId> = createStructCodec<any>('EvaluatesToAssetId', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToBool

export interface EvaluatesToBool extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToBoolCodec: Codec<EvaluatesToBool> = createStructCodec<any>('EvaluatesToBool', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToDefinitionId

export interface EvaluatesToDefinitionId extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToDefinitionIdCodec: Codec<EvaluatesToDefinitionId> = createStructCodec<any>('EvaluatesToDefinitionId', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToHash

export interface EvaluatesToHash extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToHashCodec: Codec<EvaluatesToHash> = createStructCodec<any>('EvaluatesToHash', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToId

export interface EvaluatesToId extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToIdCodec: Codec<EvaluatesToId> = createStructCodec<any>('EvaluatesToId', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToIdBox

export interface EvaluatesToIdBox extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToIdBoxCodec: Codec<EvaluatesToIdBox> = createStructCodec<any>('EvaluatesToIdBox', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToIdentifiableBox

export interface EvaluatesToIdentifiableBox extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToIdentifiableBoxCodec: Codec<EvaluatesToIdentifiableBox> = createStructCodec<any>('EvaluatesToIdentifiableBox', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToName

export interface EvaluatesToName extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToNameCodec: Codec<EvaluatesToName> = createStructCodec<any>('EvaluatesToName', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToU32

export interface EvaluatesToU32 extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToU32Codec: Codec<EvaluatesToU32> = createStructCodec<any>('EvaluatesToU32', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToValue

export interface EvaluatesToValue extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToValueCodec: Codec<EvaluatesToValue> = createStructCodec<any>('EvaluatesToValue', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// EvaluatesToVecValue

export interface EvaluatesToVecValue extends PseudoType<{
    expression: Expression
}> {}

export const EvaluatesToVecValueCodec: Codec<EvaluatesToVecValue> = createStructCodec<any>('EvaluatesToVecValue', [['expression', dynCodec(() => ExpressionCodec) as any]]) as any

// Event

export interface Event extends Enum<
    | ['Pipeline', PipelineEvent]
    | ['Data', DataEvent]
> {}

export const EventCodec: Codec<Event> = createEnumCodec<any>('Event', [[0, 'Pipeline', dynCodec(() => PipelineEventCodec)], [1, 'Data', dynCodec(() => DataEventCodec)]]) as any

// EventFilter

export interface EventFilter extends Enum<
    | ['Pipeline', PipelineEventFilter]
    | ['Data', DataEventFilter]
> {}

export const EventFilterCodec: Codec<EventFilter> = createEnumCodec<any>('EventFilter', [[0, 'Pipeline', dynCodec(() => PipelineEventFilterCodec)], [1, 'Data', dynCodec(() => DataEventFilterCodec)]]) as any

// EventPublisherMessage

export interface EventPublisherMessage extends Enum<
    | 'SubscriptionAccepted'
    | ['Event', Event]
> {}

export const EventPublisherMessageCodec: Codec<EventPublisherMessage> = createEnumCodec<any>('EventPublisherMessage', [[0, 'SubscriptionAccepted'], [1, 'Event', dynCodec(() => EventCodec)]]) as any

// EventSubscriberMessage

export interface EventSubscriberMessage extends Enum<
    | ['SubscriptionRequest', EventFilter]
    | 'EventReceived'
> {}

export const EventSubscriberMessageCodec: Codec<EventSubscriberMessage> = createEnumCodec<any>('EventSubscriberMessage', [[0, 'SubscriptionRequest', dynCodec(() => EventFilterCodec)], [1, 'EventReceived']]) as any

// Executable

export interface Executable extends Enum<
    | ['Instructions', VecInstruction]
    | ['Wasm', WasmSmartContract]
> {}

export const ExecutableCodec: Codec<Executable> = createEnumCodec<any>('Executable', [[0, 'Instructions', dynCodec(() => VecInstructionCodec)], [1, 'Wasm', dynCodec(() => WasmSmartContractCodec)]]) as any

// Expression

export interface Expression extends Enum<
    | ['Add', Add]
    | ['Subtract', Subtract]
    | ['Multiply', Multiply]
    | ['Divide', Divide]
    | ['Mod', Mod]
    | ['RaiseTo', RaiseTo]
    | ['Greater', Greater]
    | ['Less', Less]
    | ['Equal', Equal]
    | ['Not', Not]
    | ['And', And]
    | ['Or', Or]
    | ['If', ExpressionIf]
    | ['Raw', Value]
    | ['Query', QueryBox]
    | ['Contains', Contains]
    | ['ContainsAll', ContainsAll]
    | ['ContainsAny', ContainsAny]
    | ['Where', Where]
    | ['ContextValue', ContextValue]
> {}

export const ExpressionCodec: Codec<Expression> = createEnumCodec<any>('Expression', [[0, 'Add', dynCodec(() => AddCodec)], [1, 'Subtract', dynCodec(() => SubtractCodec)], [2, 'Multiply', dynCodec(() => MultiplyCodec)], [3, 'Divide', dynCodec(() => DivideCodec)], [4, 'Mod', dynCodec(() => ModCodec)], [5, 'RaiseTo', dynCodec(() => RaiseToCodec)], [6, 'Greater', dynCodec(() => GreaterCodec)], [7, 'Less', dynCodec(() => LessCodec)], [8, 'Equal', dynCodec(() => EqualCodec)], [9, 'Not', dynCodec(() => NotCodec)], [10, 'And', dynCodec(() => AndCodec)], [11, 'Or', dynCodec(() => OrCodec)], [12, 'If', dynCodec(() => ExpressionIfCodec)], [13, 'Raw', dynCodec(() => ValueCodec)], [14, 'Query', dynCodec(() => QueryBoxCodec)], [15, 'Contains', dynCodec(() => ContainsCodec)], [16, 'ContainsAll', dynCodec(() => ContainsAllCodec)], [17, 'ContainsAny', dynCodec(() => ContainsAnyCodec)], [18, 'Where', dynCodec(() => WhereCodec)], [19, 'ContextValue', dynCodec(() => ContextValueCodec)]]) as any

// ExpressionIf

export interface ExpressionIf extends PseudoType<{
    condition: EvaluatesToBool,
    then_expression: EvaluatesToValue,
    else_expression: EvaluatesToValue
}> {}

export const ExpressionIfCodec: Codec<ExpressionIf> = createStructCodec<any>('ExpressionIf', [['condition', dynCodec(() => EvaluatesToBoolCodec) as any], ['then_expression', dynCodec(() => EvaluatesToValueCodec) as any], ['else_expression', dynCodec(() => EvaluatesToValueCodec) as any]]) as any

// FailBox

export interface FailBox extends PseudoType<{
    message: Str
}> {}

export const FailBoxCodec: Codec<FailBox> = createStructCodec<any>('FailBox', [['message', dynCodec(() => StrCodec) as any]]) as any

// FindAccountById

export interface FindAccountById extends PseudoType<{
    id: EvaluatesToAccountId
}> {}

export const FindAccountByIdCodec: Codec<FindAccountById> = createStructCodec<any>('FindAccountById', [['id', dynCodec(() => EvaluatesToAccountIdCodec) as any]]) as any

// FindAccountKeyValueByIdAndKey

export interface FindAccountKeyValueByIdAndKey extends PseudoType<{
    id: EvaluatesToAccountId,
    key: EvaluatesToName
}> {}

export const FindAccountKeyValueByIdAndKeyCodec: Codec<FindAccountKeyValueByIdAndKey> = createStructCodec<any>('FindAccountKeyValueByIdAndKey', [['id', dynCodec(() => EvaluatesToAccountIdCodec) as any], ['key', dynCodec(() => EvaluatesToNameCodec) as any]]) as any

// FindAccountsByDomainId

export interface FindAccountsByDomainId extends PseudoType<{
    domain_id: EvaluatesToId
}> {}

export const FindAccountsByDomainIdCodec: Codec<FindAccountsByDomainId> = createStructCodec<any>('FindAccountsByDomainId', [['domain_id', dynCodec(() => EvaluatesToIdCodec) as any]]) as any

// FindAccountsByName

export interface FindAccountsByName extends PseudoType<{
    name: EvaluatesToName
}> {}

export const FindAccountsByNameCodec: Codec<FindAccountsByName> = createStructCodec<any>('FindAccountsByName', [['name', dynCodec(() => EvaluatesToNameCodec) as any]]) as any

// FindAllAccounts

import { Void as FindAllAccounts, VoidCodec as FindAllAccountsCodec } from '@scale-codec/definition-runtime'

export { FindAllAccounts, FindAllAccountsCodec }

// FindAllAssets

import { Void as FindAllAssets, VoidCodec as FindAllAssetsCodec } from '@scale-codec/definition-runtime'

export { FindAllAssets, FindAllAssetsCodec }

// FindAllAssetsDefinitions

import { Void as FindAllAssetsDefinitions, VoidCodec as FindAllAssetsDefinitionsCodec } from '@scale-codec/definition-runtime'

export { FindAllAssetsDefinitions, FindAllAssetsDefinitionsCodec }

// FindAllDomains

import { Void as FindAllDomains, VoidCodec as FindAllDomainsCodec } from '@scale-codec/definition-runtime'

export { FindAllDomains, FindAllDomainsCodec }

// FindAllPeers

import { Void as FindAllPeers, VoidCodec as FindAllPeersCodec } from '@scale-codec/definition-runtime'

export { FindAllPeers, FindAllPeersCodec }

// FindAssetById

export interface FindAssetById extends PseudoType<{
    id: EvaluatesToAssetId
}> {}

export const FindAssetByIdCodec: Codec<FindAssetById> = createStructCodec<any>('FindAssetById', [['id', dynCodec(() => EvaluatesToAssetIdCodec) as any]]) as any

// FindAssetDefinitionKeyValueByIdAndKey

export interface FindAssetDefinitionKeyValueByIdAndKey extends PseudoType<{
    id: EvaluatesToDefinitionId,
    key: EvaluatesToName
}> {}

export const FindAssetDefinitionKeyValueByIdAndKeyCodec: Codec<FindAssetDefinitionKeyValueByIdAndKey> = createStructCodec<any>('FindAssetDefinitionKeyValueByIdAndKey', [['id', dynCodec(() => EvaluatesToDefinitionIdCodec) as any], ['key', dynCodec(() => EvaluatesToNameCodec) as any]]) as any

// FindAssetKeyValueByIdAndKey

export interface FindAssetKeyValueByIdAndKey extends PseudoType<{
    id: EvaluatesToAssetId,
    key: EvaluatesToName
}> {}

export const FindAssetKeyValueByIdAndKeyCodec: Codec<FindAssetKeyValueByIdAndKey> = createStructCodec<any>('FindAssetKeyValueByIdAndKey', [['id', dynCodec(() => EvaluatesToAssetIdCodec) as any], ['key', dynCodec(() => EvaluatesToNameCodec) as any]]) as any

// FindAssetQuantityById

export interface FindAssetQuantityById extends PseudoType<{
    id: EvaluatesToAssetId
}> {}

export const FindAssetQuantityByIdCodec: Codec<FindAssetQuantityById> = createStructCodec<any>('FindAssetQuantityById', [['id', dynCodec(() => EvaluatesToAssetIdCodec) as any]]) as any

// FindAssetsByAccountId

export interface FindAssetsByAccountId extends PseudoType<{
    account_id: EvaluatesToAccountId
}> {}

export const FindAssetsByAccountIdCodec: Codec<FindAssetsByAccountId> = createStructCodec<any>('FindAssetsByAccountId', [['account_id', dynCodec(() => EvaluatesToAccountIdCodec) as any]]) as any

// FindAssetsByAssetDefinitionId

export interface FindAssetsByAssetDefinitionId extends PseudoType<{
    asset_definition_id: EvaluatesToDefinitionId
}> {}

export const FindAssetsByAssetDefinitionIdCodec: Codec<FindAssetsByAssetDefinitionId> = createStructCodec<any>('FindAssetsByAssetDefinitionId', [['asset_definition_id', dynCodec(() => EvaluatesToDefinitionIdCodec) as any]]) as any

// FindAssetsByDomainId

export interface FindAssetsByDomainId extends PseudoType<{
    domain_id: EvaluatesToId
}> {}

export const FindAssetsByDomainIdCodec: Codec<FindAssetsByDomainId> = createStructCodec<any>('FindAssetsByDomainId', [['domain_id', dynCodec(() => EvaluatesToIdCodec) as any]]) as any

// FindAssetsByDomainIdAndAssetDefinitionId

export interface FindAssetsByDomainIdAndAssetDefinitionId extends PseudoType<{
    domain_id: EvaluatesToId,
    asset_definition_id: EvaluatesToDefinitionId
}> {}

export const FindAssetsByDomainIdAndAssetDefinitionIdCodec: Codec<FindAssetsByDomainIdAndAssetDefinitionId> = createStructCodec<any>('FindAssetsByDomainIdAndAssetDefinitionId', [['domain_id', dynCodec(() => EvaluatesToIdCodec) as any], ['asset_definition_id', dynCodec(() => EvaluatesToDefinitionIdCodec) as any]]) as any

// FindAssetsByName

export interface FindAssetsByName extends PseudoType<{
    name: EvaluatesToName
}> {}

export const FindAssetsByNameCodec: Codec<FindAssetsByName> = createStructCodec<any>('FindAssetsByName', [['name', dynCodec(() => EvaluatesToNameCodec) as any]]) as any

// FindDomainById

export interface FindDomainById extends PseudoType<{
    id: EvaluatesToId
}> {}

export const FindDomainByIdCodec: Codec<FindDomainById> = createStructCodec<any>('FindDomainById', [['id', dynCodec(() => EvaluatesToIdCodec) as any]]) as any

// FindDomainKeyValueByIdAndKey

export interface FindDomainKeyValueByIdAndKey extends PseudoType<{
    id: EvaluatesToId,
    key: EvaluatesToName
}> {}

export const FindDomainKeyValueByIdAndKeyCodec: Codec<FindDomainKeyValueByIdAndKey> = createStructCodec<any>('FindDomainKeyValueByIdAndKey', [['id', dynCodec(() => EvaluatesToIdCodec) as any], ['key', dynCodec(() => EvaluatesToNameCodec) as any]]) as any

// FindPermissionTokensByAccountId

export interface FindPermissionTokensByAccountId extends PseudoType<{
    id: EvaluatesToAccountId
}> {}

export const FindPermissionTokensByAccountIdCodec: Codec<FindPermissionTokensByAccountId> = createStructCodec<any>('FindPermissionTokensByAccountId', [['id', dynCodec(() => EvaluatesToAccountIdCodec) as any]]) as any

// FindTransactionByHash

export interface FindTransactionByHash extends PseudoType<{
    hash: EvaluatesToHash
}> {}

export const FindTransactionByHashCodec: Codec<FindTransactionByHash> = createStructCodec<any>('FindTransactionByHash', [['hash', dynCodec(() => EvaluatesToHashCodec) as any]]) as any

// FindTransactionsByAccountId

export interface FindTransactionsByAccountId extends PseudoType<{
    account_id: EvaluatesToAccountId
}> {}

export const FindTransactionsByAccountIdCodec: Codec<FindTransactionsByAccountId> = createStructCodec<any>('FindTransactionsByAccountId', [['account_id', dynCodec(() => EvaluatesToAccountIdCodec) as any]]) as any

// Fixed

export type Fixed = FixedPointI64

export const FixedCodec = dynCodec(() => FixedPointI64Codec)

// FixedPointI64

import { FixedPointI64P9 as FixedPointI64, FixedPointI64P9Codec as FixedPointI64Codec } from './fixed-point'

export { FixedPointI64, FixedPointI64Codec }

// GenesisTransaction

export interface GenesisTransaction extends PseudoType<{
    isi: VecInstruction
}> {}

export const GenesisTransactionCodec: Codec<GenesisTransaction> = createStructCodec<any>('GenesisTransaction', [['isi', dynCodec(() => VecInstructionCodec) as any]]) as any

// GrantBox

export interface GrantBox extends PseudoType<{
    object: EvaluatesToValue,
    destination_id: EvaluatesToIdBox
}> {}

export const GrantBoxCodec: Codec<GrantBox> = createStructCodec<any>('GrantBox', [['object', dynCodec(() => EvaluatesToValueCodec) as any], ['destination_id', dynCodec(() => EvaluatesToIdBoxCodec) as any]]) as any

// Greater

export interface Greater extends PseudoType<{
    left: EvaluatesToU32,
    right: EvaluatesToU32
}> {}

export const GreaterCodec: Codec<Greater> = createStructCodec<any>('Greater', [['left', dynCodec(() => EvaluatesToU32Codec) as any], ['right', dynCodec(() => EvaluatesToU32Codec) as any]]) as any

// Hash

export type Hash = ArrayU8L32

export const HashCodec = dynCodec(() => ArrayU8L32Codec)

// HashOfMerkleTreeVersionedTransaction

export type HashOfMerkleTreeVersionedTransaction = Hash

export const HashOfMerkleTreeVersionedTransactionCodec = dynCodec(() => HashCodec)

// HashOfNodeVersionedTransaction

export type HashOfNodeVersionedTransaction = Hash

export const HashOfNodeVersionedTransactionCodec = dynCodec(() => HashCodec)

// HashOfProof

export type HashOfProof = Hash

export const HashOfProofCodec = dynCodec(() => HashCodec)

// HashOfVersionedCommittedBlock

export type HashOfVersionedCommittedBlock = Hash

export const HashOfVersionedCommittedBlockCodec = dynCodec(() => HashCodec)

// HashOfVersionedTransaction

export type HashOfVersionedTransaction = Hash

export const HashOfVersionedTransactionCodec = dynCodec(() => HashCodec)

// HashOfVersionedValidBlock

export type HashOfVersionedValidBlock = Hash

export const HashOfVersionedValidBlockCodec = dynCodec(() => HashCodec)

// Id

export interface Id extends PseudoType<{
    name: Name
}> {}

export const IdCodec: Codec<Id> = createStructCodec<any>('Id', [['name', dynCodec(() => NameCodec) as any]]) as any

// IdBox

export interface IdBox extends Enum<
    | ['AccountId', AccountId]
    | ['AssetId', AssetId]
    | ['AssetDefinitionId', DefinitionId]
    | ['DomainId', Id]
    | ['PeerId', PeerId]
    | ['TriggerId', Id]
    | 'WorldId'
> {}

export const IdBoxCodec: Codec<IdBox> = createEnumCodec<any>('IdBox', [[0, 'AccountId', dynCodec(() => AccountIdCodec)], [1, 'AssetId', dynCodec(() => AssetIdCodec)], [2, 'AssetDefinitionId', dynCodec(() => DefinitionIdCodec)], [3, 'DomainId', dynCodec(() => IdCodec)], [4, 'PeerId', dynCodec(() => PeerIdCodec)], [5, 'TriggerId', dynCodec(() => IdCodec)], [6, 'WorldId']]) as any

// IdentifiableBox

export interface IdentifiableBox extends Enum<
    | ['Account', Account]
    | ['NewAccount', NewAccount]
    | ['Asset', Asset]
    | ['AssetDefinition', AssetDefinition]
    | ['Domain', Domain]
    | ['Peer', Peer]
    | ['Trigger', Trigger]
    | 'World'
> {}

export const IdentifiableBoxCodec: Codec<IdentifiableBox> = createEnumCodec<any>('IdentifiableBox', [[0, 'Account', dynCodec(() => AccountCodec)], [1, 'NewAccount', dynCodec(() => NewAccountCodec)], [2, 'Asset', dynCodec(() => AssetCodec)], [3, 'AssetDefinition', dynCodec(() => AssetDefinitionCodec)], [4, 'Domain', dynCodec(() => DomainCodec)], [5, 'Peer', dynCodec(() => PeerCodec)], [6, 'Trigger', dynCodec(() => TriggerCodec)], [7, 'World']]) as any

// Instruction

export interface Instruction extends Enum<
    | ['Register', RegisterBox]
    | ['Unregister', UnregisterBox]
    | ['Mint', MintBox]
    | ['Burn', BurnBox]
    | ['Transfer', TransferBox]
    | ['If', IsiIf]
    | ['Pair', Pair]
    | ['Sequence', SequenceBox]
    | ['Fail', FailBox]
    | ['SetKeyValue', SetKeyValueBox]
    | ['RemoveKeyValue', RemoveKeyValueBox]
    | ['Grant', GrantBox]
    | ['Revoke', RevokeBox]
> {}

export const InstructionCodec: Codec<Instruction> = createEnumCodec<any>('Instruction', [[0, 'Register', dynCodec(() => RegisterBoxCodec)], [1, 'Unregister', dynCodec(() => UnregisterBoxCodec)], [2, 'Mint', dynCodec(() => MintBoxCodec)], [3, 'Burn', dynCodec(() => BurnBoxCodec)], [4, 'Transfer', dynCodec(() => TransferBoxCodec)], [5, 'If', dynCodec(() => IsiIfCodec)], [6, 'Pair', dynCodec(() => PairCodec)], [7, 'Sequence', dynCodec(() => SequenceBoxCodec)], [8, 'Fail', dynCodec(() => FailBoxCodec)], [9, 'SetKeyValue', dynCodec(() => SetKeyValueBoxCodec)], [10, 'RemoveKeyValue', dynCodec(() => RemoveKeyValueBoxCodec)], [11, 'Grant', dynCodec(() => GrantBoxCodec)], [12, 'Revoke', dynCodec(() => RevokeBoxCodec)]]) as any

// InstructionExecutionFail

export interface InstructionExecutionFail extends PseudoType<{
    instruction: Instruction,
    reason: Str
}> {}

export const InstructionExecutionFailCodec: Codec<InstructionExecutionFail> = createStructCodec<any>('InstructionExecutionFail', [['instruction', dynCodec(() => InstructionCodec) as any], ['reason', dynCodec(() => StrCodec) as any]]) as any

// IpfsPath

export type IpfsPath = Str

export const IpfsPathCodec = dynCodec(() => StrCodec)

// IsiIf

export interface IsiIf extends PseudoType<{
    condition: EvaluatesToBool,
    then: Instruction,
    otherwise: OptionInstruction
}> {}

export const IsiIfCodec: Codec<IsiIf> = createStructCodec<any>('IsiIf', [['condition', dynCodec(() => EvaluatesToBoolCodec) as any], ['then', dynCodec(() => InstructionCodec) as any], ['otherwise', dynCodec(() => OptionInstructionCodec) as any]]) as any

// LeafVersionedTransaction

export interface LeafVersionedTransaction extends PseudoType<{
    hash: HashOfVersionedTransaction
}> {}

export const LeafVersionedTransactionCodec: Codec<LeafVersionedTransaction> = createStructCodec<any>('LeafVersionedTransaction', [['hash', dynCodec(() => HashOfVersionedTransactionCodec) as any]]) as any

// Less

export interface Less extends PseudoType<{
    left: EvaluatesToU32,
    right: EvaluatesToU32
}> {}

export const LessCodec: Codec<Less> = createStructCodec<any>('Less', [['left', dynCodec(() => EvaluatesToU32Codec) as any], ['right', dynCodec(() => EvaluatesToU32Codec) as any]]) as any

// MerkleTreeVersionedTransaction

export interface MerkleTreeVersionedTransaction extends PseudoType<{
    root_node: NodeVersionedTransaction
}> {}

export const MerkleTreeVersionedTransactionCodec: Codec<MerkleTreeVersionedTransaction> = createStructCodec<any>('MerkleTreeVersionedTransaction', [['root_node', dynCodec(() => NodeVersionedTransactionCodec) as any]]) as any

// Metadata

export interface Metadata extends PseudoType<{
    map: BTreeMapNameValue
}> {}

export const MetadataCodec: Codec<Metadata> = createStructCodec<any>('Metadata', [['map', dynCodec(() => BTreeMapNameValueCodec) as any]]) as any

// MetadataUpdated

export interface MetadataUpdated extends Enum<
    | 'Inserted'
    | 'Removed'
> {}

export const MetadataUpdatedCodec: Codec<MetadataUpdated> = createEnumCodec<any>('MetadataUpdated', [[0, 'Inserted'], [1, 'Removed']]) as any

// MintBox

export interface MintBox extends PseudoType<{
    object: EvaluatesToValue,
    destination_id: EvaluatesToIdBox
}> {}

export const MintBoxCodec: Codec<MintBox> = createStructCodec<any>('MintBox', [['object', dynCodec(() => EvaluatesToValueCodec) as any], ['destination_id', dynCodec(() => EvaluatesToIdBoxCodec) as any]]) as any

// Mod

export interface Mod extends PseudoType<{
    left: EvaluatesToU32,
    right: EvaluatesToU32
}> {}

export const ModCodec: Codec<Mod> = createStructCodec<any>('Mod', [['left', dynCodec(() => EvaluatesToU32Codec) as any], ['right', dynCodec(() => EvaluatesToU32Codec) as any]]) as any

// Multiply

export interface Multiply extends PseudoType<{
    left: EvaluatesToU32,
    right: EvaluatesToU32
}> {}

export const MultiplyCodec: Codec<Multiply> = createStructCodec<any>('Multiply', [['left', dynCodec(() => EvaluatesToU32Codec) as any], ['right', dynCodec(() => EvaluatesToU32Codec) as any]]) as any

// Name

export type Name = Str

export const NameCodec = dynCodec(() => StrCodec)

// NewAccount

export interface NewAccount extends PseudoType<{
    id: AccountId,
    signatories: VecPublicKey,
    metadata: Metadata
}> {}

export const NewAccountCodec: Codec<NewAccount> = createStructCodec<any>('NewAccount', [['id', dynCodec(() => AccountIdCodec) as any], ['signatories', dynCodec(() => VecPublicKeyCodec) as any], ['metadata', dynCodec(() => MetadataCodec) as any]]) as any

// NodeVersionedTransaction

export interface NodeVersionedTransaction extends Enum<
    | ['Subtree', SubtreeVersionedTransaction]
    | ['Leaf', LeafVersionedTransaction]
    | 'Empty'
> {}

export const NodeVersionedTransactionCodec: Codec<NodeVersionedTransaction> = createEnumCodec<any>('NodeVersionedTransaction', [[0, 'Subtree', dynCodec(() => SubtreeVersionedTransactionCodec)], [1, 'Leaf', dynCodec(() => LeafVersionedTransactionCodec)], [2, 'Empty']]) as any

// Not

export interface Not extends PseudoType<{
    expression: EvaluatesToBool
}> {}

export const NotCodec: Codec<Not> = createStructCodec<any>('Not', [['expression', dynCodec(() => EvaluatesToBoolCodec) as any]]) as any

// NotPermittedFail

export interface NotPermittedFail extends PseudoType<{
    reason: Str
}> {}

export const NotPermittedFailCodec: Codec<NotPermittedFail> = createStructCodec<any>('NotPermittedFail', [['reason', dynCodec(() => StrCodec) as any]]) as any

// NoTransactionReceiptReceived

import { Void as NoTransactionReceiptReceived, VoidCodec as NoTransactionReceiptReceivedCodec } from '@scale-codec/definition-runtime'

export { NoTransactionReceiptReceived, NoTransactionReceiptReceivedCodec }

// OptionAccountId

export interface OptionAccountId extends Option<AccountId> {}

export const OptionAccountIdCodec: Codec<OptionAccountId> = createOptionCodec<any>('OptionAccountId', dynCodec(() => AccountIdCodec)) as any

// OptionAssetId

export interface OptionAssetId extends Option<AssetId> {}

export const OptionAssetIdCodec: Codec<OptionAssetId> = createOptionCodec<any>('OptionAssetId', dynCodec(() => AssetIdCodec)) as any

// OptionDefinitionId

export interface OptionDefinitionId extends Option<DefinitionId> {}

export const OptionDefinitionIdCodec: Codec<OptionDefinitionId> = createOptionCodec<any>('OptionDefinitionId', dynCodec(() => DefinitionIdCodec)) as any

// OptionEntityFilter

export interface OptionEntityFilter extends Option<EntityFilter> {}

export const OptionEntityFilterCodec: Codec<OptionEntityFilter> = createOptionCodec<any>('OptionEntityFilter', dynCodec(() => EntityFilterCodec)) as any

// OptionEntityType

export interface OptionEntityType extends Option<EntityType> {}

export const OptionEntityTypeCodec: Codec<OptionEntityType> = createOptionCodec<any>('OptionEntityType', dynCodec(() => EntityTypeCodec)) as any

// OptionHash

export interface OptionHash extends Option<Hash> {}

export const OptionHashCodec: Codec<OptionHash> = createOptionCodec<any>('OptionHash', dynCodec(() => HashCodec)) as any

// OptionId

export interface OptionId extends Option<Id> {}

export const OptionIdCodec: Codec<OptionId> = createOptionCodec<any>('OptionId', dynCodec(() => IdCodec)) as any

// OptionInstruction

export interface OptionInstruction extends Option<Instruction> {}

export const OptionInstructionCodec: Codec<OptionInstruction> = createOptionCodec<any>('OptionInstruction', dynCodec(() => InstructionCodec)) as any

// OptionIpfsPath

export interface OptionIpfsPath extends Option<IpfsPath> {}

export const OptionIpfsPathCodec: Codec<OptionIpfsPath> = createOptionCodec<any>('OptionIpfsPath', dynCodec(() => IpfsPathCodec)) as any

// OptionPeerId

export interface OptionPeerId extends Option<PeerId> {}

export const OptionPeerIdCodec: Codec<OptionPeerId> = createOptionCodec<any>('OptionPeerId', dynCodec(() => PeerIdCodec)) as any

// OptionStatusFilter

export interface OptionStatusFilter extends Option<StatusFilter> {}

export const OptionStatusFilterCodec: Codec<OptionStatusFilter> = createOptionCodec<any>('OptionStatusFilter', dynCodec(() => StatusFilterCodec)) as any

// OptionTopology

export interface OptionTopology extends Option<Topology> {}

export const OptionTopologyCodec: Codec<OptionTopology> = createOptionCodec<any>('OptionTopology', dynCodec(() => TopologyCodec)) as any

// OptionU32

export interface OptionU32 extends Option<U32> {}

export const OptionU32Codec: Codec<OptionU32> = createOptionCodec<any>('OptionU32', dynCodec(() => U32Codec)) as any

// OptionUpdated

export interface OptionUpdated extends Option<Updated> {}

export const OptionUpdatedCodec: Codec<OptionUpdated> = createOptionCodec<any>('OptionUpdated', dynCodec(() => UpdatedCodec)) as any

// Or

export interface Or extends PseudoType<{
    left: EvaluatesToBool,
    right: EvaluatesToBool
}> {}

export const OrCodec: Codec<Or> = createStructCodec<any>('Or', [['left', dynCodec(() => EvaluatesToBoolCodec) as any], ['right', dynCodec(() => EvaluatesToBoolCodec) as any]]) as any

// Pair

export interface Pair extends PseudoType<{
    left_instruction: Instruction,
    right_instruction: Instruction
}> {}

export const PairCodec: Codec<Pair> = createStructCodec<any>('Pair', [['left_instruction', dynCodec(() => InstructionCodec) as any], ['right_instruction', dynCodec(() => InstructionCodec) as any]]) as any

// Parameter

export interface Parameter extends Enum<
    | ['MaximumFaultyPeersAmount', U32]
    | ['BlockTime', U128]
    | ['CommitTime', U128]
    | ['TransactionReceiptTime', U128]
> {}

export const ParameterCodec: Codec<Parameter> = createEnumCodec<any>('Parameter', [[0, 'MaximumFaultyPeersAmount', dynCodec(() => U32Codec)], [1, 'BlockTime', dynCodec(() => U128Codec)], [2, 'CommitTime', dynCodec(() => U128Codec)], [3, 'TransactionReceiptTime', dynCodec(() => U128Codec)]]) as any

// Peer

export interface Peer extends PseudoType<{
    id: PeerId
}> {}

export const PeerCodec: Codec<Peer> = createStructCodec<any>('Peer', [['id', dynCodec(() => PeerIdCodec) as any]]) as any

// PeerId

export interface PeerId extends PseudoType<{
    address: Str,
    public_key: PublicKey
}> {}

export const PeerIdCodec: Codec<PeerId> = createStructCodec<any>('PeerId', [['address', dynCodec(() => StrCodec) as any], ['public_key', dynCodec(() => PublicKeyCodec) as any]]) as any

// PermissionToken

export interface PermissionToken extends PseudoType<{
    name: Name,
    params: BTreeMapNameValue
}> {}

export const PermissionTokenCodec: Codec<PermissionToken> = createStructCodec<any>('PermissionToken', [['name', dynCodec(() => NameCodec) as any], ['params', dynCodec(() => BTreeMapNameValueCodec) as any]]) as any

// PipelineEvent

export interface PipelineEvent extends PseudoType<{
    entity_type: EntityType,
    status: Status,
    hash: Hash
}> {}

export const PipelineEventCodec: Codec<PipelineEvent> = createStructCodec<any>('PipelineEvent', [['entity_type', dynCodec(() => EntityTypeCodec) as any], ['status', dynCodec(() => StatusCodec) as any], ['hash', dynCodec(() => HashCodec) as any]]) as any

// PipelineEventFilter

export interface PipelineEventFilter extends PseudoType<{
    entity: OptionEntityType,
    hash: OptionHash
}> {}

export const PipelineEventFilterCodec: Codec<PipelineEventFilter> = createStructCodec<any>('PipelineEventFilter', [['entity', dynCodec(() => OptionEntityTypeCodec) as any], ['hash', dynCodec(() => OptionHashCodec) as any]]) as any

// Proof

export interface Proof extends PseudoType<{
    payload: ProofPayload,
    signatures: SignaturesOfProof
}> {}

export const ProofCodec: Codec<Proof> = createStructCodec<any>('Proof', [['payload', dynCodec(() => ProofPayloadCodec) as any], ['signatures', dynCodec(() => SignaturesOfProofCodec) as any]]) as any

// ProofChain

export interface ProofChain extends PseudoType<{
    proofs: VecProof
}> {}

export const ProofChainCodec: Codec<ProofChain> = createStructCodec<any>('ProofChain', [['proofs', dynCodec(() => VecProofCodec) as any]]) as any

// ProofPayload

export interface ProofPayload extends PseudoType<{
    previous_proof: HashOfProof,
    latest_block: HashOfVersionedCommittedBlock,
    reason: Reason
}> {}

export const ProofPayloadCodec: Codec<ProofPayload> = createStructCodec<any>('ProofPayload', [['previous_proof', dynCodec(() => HashOfProofCodec) as any], ['latest_block', dynCodec(() => HashOfVersionedCommittedBlockCodec) as any], ['reason', dynCodec(() => ReasonCodec) as any]]) as any

// PublicKey

export interface PublicKey extends PseudoType<{
    digest_function: Str,
    payload: VecU8
}> {}

export const PublicKeyCodec: Codec<PublicKey> = createStructCodec<any>('PublicKey', [['digest_function', dynCodec(() => StrCodec) as any], ['payload', dynCodec(() => VecU8Codec) as any]]) as any

// QueryBox

export interface QueryBox extends Enum<
    | ['FindAllAccounts', FindAllAccounts]
    | ['FindAccountById', FindAccountById]
    | ['FindAccountKeyValueByIdAndKey', FindAccountKeyValueByIdAndKey]
    | ['FindAccountsByName', FindAccountsByName]
    | ['FindAccountsByDomainId', FindAccountsByDomainId]
    | ['FindAllAssets', FindAllAssets]
    | ['FindAllAssetsDefinitions', FindAllAssetsDefinitions]
    | ['FindAssetById', FindAssetById]
    | ['FindAssetsByName', FindAssetsByName]
    | ['FindAssetsByAccountId', FindAssetsByAccountId]
    | ['FindAssetsByAssetDefinitionId', FindAssetsByAssetDefinitionId]
    | ['FindAssetsByDomainId', FindAssetsByDomainId]
    | ['FindAssetsByDomainIdAndAssetDefinitionId', FindAssetsByDomainIdAndAssetDefinitionId]
    | ['FindAssetQuantityById', FindAssetQuantityById]
    | ['FindAssetKeyValueByIdAndKey', FindAssetKeyValueByIdAndKey]
    | ['FindAssetDefinitionKeyValueByIdAndKey', FindAssetDefinitionKeyValueByIdAndKey]
    | ['FindAllDomains', FindAllDomains]
    | ['FindDomainById', FindDomainById]
    | ['FindDomainKeyValueByIdAndKey', FindDomainKeyValueByIdAndKey]
    | ['FindAllPeers', FindAllPeers]
    | ['FindTransactionsByAccountId', FindTransactionsByAccountId]
    | ['FindTransactionByHash', FindTransactionByHash]
    | ['FindPermissionTokensByAccountId', FindPermissionTokensByAccountId]
> {}

export const QueryBoxCodec: Codec<QueryBox> = createEnumCodec<any>('QueryBox', [[0, 'FindAllAccounts', dynCodec(() => FindAllAccountsCodec)], [1, 'FindAccountById', dynCodec(() => FindAccountByIdCodec)], [2, 'FindAccountKeyValueByIdAndKey', dynCodec(() => FindAccountKeyValueByIdAndKeyCodec)], [3, 'FindAccountsByName', dynCodec(() => FindAccountsByNameCodec)], [4, 'FindAccountsByDomainId', dynCodec(() => FindAccountsByDomainIdCodec)], [5, 'FindAllAssets', dynCodec(() => FindAllAssetsCodec)], [6, 'FindAllAssetsDefinitions', dynCodec(() => FindAllAssetsDefinitionsCodec)], [7, 'FindAssetById', dynCodec(() => FindAssetByIdCodec)], [8, 'FindAssetsByName', dynCodec(() => FindAssetsByNameCodec)], [9, 'FindAssetsByAccountId', dynCodec(() => FindAssetsByAccountIdCodec)], [10, 'FindAssetsByAssetDefinitionId', dynCodec(() => FindAssetsByAssetDefinitionIdCodec)], [11, 'FindAssetsByDomainId', dynCodec(() => FindAssetsByDomainIdCodec)], [12, 'FindAssetsByDomainIdAndAssetDefinitionId', dynCodec(() => FindAssetsByDomainIdAndAssetDefinitionIdCodec)], [13, 'FindAssetQuantityById', dynCodec(() => FindAssetQuantityByIdCodec)], [14, 'FindAssetKeyValueByIdAndKey', dynCodec(() => FindAssetKeyValueByIdAndKeyCodec)], [15, 'FindAssetDefinitionKeyValueByIdAndKey', dynCodec(() => FindAssetDefinitionKeyValueByIdAndKeyCodec)], [16, 'FindAllDomains', dynCodec(() => FindAllDomainsCodec)], [17, 'FindDomainById', dynCodec(() => FindDomainByIdCodec)], [18, 'FindDomainKeyValueByIdAndKey', dynCodec(() => FindDomainKeyValueByIdAndKeyCodec)], [19, 'FindAllPeers', dynCodec(() => FindAllPeersCodec)], [20, 'FindTransactionsByAccountId', dynCodec(() => FindTransactionsByAccountIdCodec)], [21, 'FindTransactionByHash', dynCodec(() => FindTransactionByHashCodec)], [22, 'FindPermissionTokensByAccountId', dynCodec(() => FindPermissionTokensByAccountIdCodec)]]) as any

// QueryPayload

export interface QueryPayload extends PseudoType<{
    timestamp_ms: Compact,
    query: QueryBox,
    account_id: AccountId
}> {}

export const QueryPayloadCodec: Codec<QueryPayload> = createStructCodec<any>('QueryPayload', [['timestamp_ms', dynCodec(() => CompactCodec) as any], ['query', dynCodec(() => QueryBoxCodec) as any], ['account_id', dynCodec(() => AccountIdCodec) as any]]) as any

// QueryResult

export type QueryResult = Value

export const QueryResultCodec = dynCodec(() => ValueCodec)

// RaiseTo

export interface RaiseTo extends PseudoType<{
    left: EvaluatesToU32,
    right: EvaluatesToU32
}> {}

export const RaiseToCodec: Codec<RaiseTo> = createStructCodec<any>('RaiseTo', [['left', dynCodec(() => EvaluatesToU32Codec) as any], ['right', dynCodec(() => EvaluatesToU32Codec) as any]]) as any

// RawGenesisBlock

export interface RawGenesisBlock extends PseudoType<{
    transactions: VecGenesisTransaction
}> {}

export const RawGenesisBlockCodec: Codec<RawGenesisBlock> = createStructCodec<any>('RawGenesisBlock', [['transactions', dynCodec(() => VecGenesisTransactionCodec) as any]]) as any

// Reason

export interface Reason extends Enum<
    | ['CommitTimeout', CommitTimeout]
    | ['NoTransactionReceiptReceived', NoTransactionReceiptReceived]
    | ['BlockCreationTimeout', BlockCreationTimeout]
> {}

export const ReasonCodec: Codec<Reason> = createEnumCodec<any>('Reason', [[0, 'CommitTimeout', dynCodec(() => CommitTimeoutCodec)], [1, 'NoTransactionReceiptReceived', dynCodec(() => NoTransactionReceiptReceivedCodec)], [2, 'BlockCreationTimeout', dynCodec(() => BlockCreationTimeoutCodec)]]) as any

// RegisterBox

export interface RegisterBox extends PseudoType<{
    object: EvaluatesToIdentifiableBox
}> {}

export const RegisterBoxCodec: Codec<RegisterBox> = createStructCodec<any>('RegisterBox', [['object', dynCodec(() => EvaluatesToIdentifiableBoxCodec) as any]]) as any

// RejectedTransaction

export interface RejectedTransaction extends PseudoType<{
    payload: TransactionPayload,
    signatures: SignaturesOfTransactionPayload,
    rejection_reason: TransactionRejectionReason
}> {}

export const RejectedTransactionCodec: Codec<RejectedTransaction> = createStructCodec<any>('RejectedTransaction', [['payload', dynCodec(() => TransactionPayloadCodec) as any], ['signatures', dynCodec(() => SignaturesOfTransactionPayloadCodec) as any], ['rejection_reason', dynCodec(() => TransactionRejectionReasonCodec) as any]]) as any

// RejectionReason

export interface RejectionReason extends Enum<
    | ['Block', BlockRejectionReason]
    | ['Transaction', TransactionRejectionReason]
> {}

export const RejectionReasonCodec: Codec<RejectionReason> = createEnumCodec<any>('RejectionReason', [[0, 'Block', dynCodec(() => BlockRejectionReasonCodec)], [1, 'Transaction', dynCodec(() => TransactionRejectionReasonCodec)]]) as any

// RemoveKeyValueBox

export interface RemoveKeyValueBox extends PseudoType<{
    object_id: EvaluatesToIdBox,
    key: EvaluatesToName
}> {}

export const RemoveKeyValueBoxCodec: Codec<RemoveKeyValueBox> = createStructCodec<any>('RemoveKeyValueBox', [['object_id', dynCodec(() => EvaluatesToIdBoxCodec) as any], ['key', dynCodec(() => EvaluatesToNameCodec) as any]]) as any

// Repeats

export interface Repeats extends Enum<
    | 'Indefinitely'
    | ['Exactly', U32]
> {}

export const RepeatsCodec: Codec<Repeats> = createEnumCodec<any>('Repeats', [[0, 'Indefinitely'], [1, 'Exactly', dynCodec(() => U32Codec)]]) as any

// RevokeBox

export interface RevokeBox extends PseudoType<{
    object: EvaluatesToValue,
    destination_id: EvaluatesToIdBox
}> {}

export const RevokeBoxCodec: Codec<RevokeBox> = createStructCodec<any>('RevokeBox', [['object', dynCodec(() => EvaluatesToValueCodec) as any], ['destination_id', dynCodec(() => EvaluatesToIdBoxCodec) as any]]) as any

// SequenceBox

export interface SequenceBox extends PseudoType<{
    instructions: VecInstruction
}> {}

export const SequenceBoxCodec: Codec<SequenceBox> = createStructCodec<any>('SequenceBox', [['instructions', dynCodec(() => VecInstructionCodec) as any]]) as any

// SetKeyValueBox

export interface SetKeyValueBox extends PseudoType<{
    object_id: EvaluatesToIdBox,
    key: EvaluatesToName,
    value: EvaluatesToValue
}> {}

export const SetKeyValueBoxCodec: Codec<SetKeyValueBox> = createStructCodec<any>('SetKeyValueBox', [['object_id', dynCodec(() => EvaluatesToIdBoxCodec) as any], ['key', dynCodec(() => EvaluatesToNameCodec) as any], ['value', dynCodec(() => EvaluatesToValueCodec) as any]]) as any

// Signature

export interface Signature extends PseudoType<{
    public_key: PublicKey,
    signature: VecU8
}> {}

export const SignatureCodec: Codec<Signature> = createStructCodec<any>('Signature', [['public_key', dynCodec(() => PublicKeyCodec) as any], ['signature', dynCodec(() => VecU8Codec) as any]]) as any

// SignatureCheckCondition

export type SignatureCheckCondition = EvaluatesToBool

export const SignatureCheckConditionCodec = dynCodec(() => EvaluatesToBoolCodec)

// SignatureOfCommittedBlock

export type SignatureOfCommittedBlock = Signature

export const SignatureOfCommittedBlockCodec = dynCodec(() => SignatureCodec)

// SignatureOfProof

export type SignatureOfProof = Signature

export const SignatureOfProofCodec = dynCodec(() => SignatureCodec)

// SignatureOfQueryPayload

export type SignatureOfQueryPayload = Signature

export const SignatureOfQueryPayloadCodec = dynCodec(() => SignatureCodec)

// SignatureOfTransactionPayload

export type SignatureOfTransactionPayload = Signature

export const SignatureOfTransactionPayloadCodec = dynCodec(() => SignatureCodec)

// SignatureOfValidBlock

export type SignatureOfValidBlock = Signature

export const SignatureOfValidBlockCodec = dynCodec(() => SignatureCodec)

// SignaturesOfCommittedBlock

export interface SignaturesOfCommittedBlock extends PseudoType<{
    signatures: BTreeMapPublicKeySignatureOfCommittedBlock
}> {}

export const SignaturesOfCommittedBlockCodec: Codec<SignaturesOfCommittedBlock> = createStructCodec<any>('SignaturesOfCommittedBlock', [['signatures', dynCodec(() => BTreeMapPublicKeySignatureOfCommittedBlockCodec) as any]]) as any

// SignaturesOfProof

export interface SignaturesOfProof extends PseudoType<{
    signatures: BTreeMapPublicKeySignatureOfProof
}> {}

export const SignaturesOfProofCodec: Codec<SignaturesOfProof> = createStructCodec<any>('SignaturesOfProof', [['signatures', dynCodec(() => BTreeMapPublicKeySignatureOfProofCodec) as any]]) as any

// SignaturesOfTransactionPayload

export interface SignaturesOfTransactionPayload extends PseudoType<{
    signatures: BTreeMapPublicKeySignatureOfTransactionPayload
}> {}

export const SignaturesOfTransactionPayloadCodec: Codec<SignaturesOfTransactionPayload> = createStructCodec<any>('SignaturesOfTransactionPayload', [['signatures', dynCodec(() => BTreeMapPublicKeySignatureOfTransactionPayloadCodec) as any]]) as any

// SignedQueryRequest

export interface SignedQueryRequest extends PseudoType<{
    payload: QueryPayload,
    signature: SignatureOfQueryPayload
}> {}

export const SignedQueryRequestCodec: Codec<SignedQueryRequest> = createStructCodec<any>('SignedQueryRequest', [['payload', dynCodec(() => QueryPayloadCodec) as any], ['signature', dynCodec(() => SignatureOfQueryPayloadCodec) as any]]) as any

// Status

export interface Status extends Enum<
    | 'Validating'
    | ['Rejected', RejectionReason]
    | 'Committed'
> {}

export const StatusCodec: Codec<Status> = createEnumCodec<any>('Status', [[0, 'Validating'], [1, 'Rejected', dynCodec(() => RejectionReasonCodec)], [2, 'Committed']]) as any

// StatusFilter

export interface StatusFilter extends Enum<
    | 'Created'
    | ['Updated', OptionUpdated]
    | 'Deleted'
> {}

export const StatusFilterCodec: Codec<StatusFilter> = createEnumCodec<any>('StatusFilter', [[0, 'Created'], [1, 'Updated', dynCodec(() => OptionUpdatedCodec)], [2, 'Deleted']]) as any

// Subtract

export interface Subtract extends PseudoType<{
    left: EvaluatesToU32,
    right: EvaluatesToU32
}> {}

export const SubtractCodec: Codec<Subtract> = createStructCodec<any>('Subtract', [['left', dynCodec(() => EvaluatesToU32Codec) as any], ['right', dynCodec(() => EvaluatesToU32Codec) as any]]) as any

// SubtreeVersionedTransaction

export interface SubtreeVersionedTransaction extends PseudoType<{
    left: NodeVersionedTransaction,
    right: NodeVersionedTransaction,
    hash: HashOfNodeVersionedTransaction
}> {}

export const SubtreeVersionedTransactionCodec: Codec<SubtreeVersionedTransaction> = createStructCodec<any>('SubtreeVersionedTransaction', [['left', dynCodec(() => NodeVersionedTransactionCodec) as any], ['right', dynCodec(() => NodeVersionedTransactionCodec) as any], ['hash', dynCodec(() => HashOfNodeVersionedTransactionCodec) as any]]) as any

// Topology

export interface Topology extends PseudoType<{
    sorted_peers: VecPeerId,
    reshuffle_after_n_view_changes: U64,
    at_block: HashOfVersionedCommittedBlock,
    view_change_proofs: ProofChain
}> {}

export const TopologyCodec: Codec<Topology> = createStructCodec<any>('Topology', [['sorted_peers', dynCodec(() => VecPeerIdCodec) as any], ['reshuffle_after_n_view_changes', dynCodec(() => U64Codec) as any], ['at_block', dynCodec(() => HashOfVersionedCommittedBlockCodec) as any], ['view_change_proofs', dynCodec(() => ProofChainCodec) as any]]) as any

// Transaction

export interface Transaction extends PseudoType<{
    payload: TransactionPayload,
    signatures: BTreeSetSignatureOfTransactionPayload
}> {}

export const TransactionCodec: Codec<Transaction> = createStructCodec<any>('Transaction', [['payload', dynCodec(() => TransactionPayloadCodec) as any], ['signatures', dynCodec(() => BTreeSetSignatureOfTransactionPayloadCodec) as any]]) as any

// TransactionLimitError

export type TransactionLimitError = Str

export const TransactionLimitErrorCodec = dynCodec(() => StrCodec)

// TransactionPayload

export interface TransactionPayload extends PseudoType<{
    account_id: AccountId,
    instructions: Executable,
    creation_time: U64,
    time_to_live_ms: U64,
    nonce: OptionU32,
    metadata: BTreeMapNameValue
}> {}

export const TransactionPayloadCodec: Codec<TransactionPayload> = createStructCodec<any>('TransactionPayload', [['account_id', dynCodec(() => AccountIdCodec) as any], ['instructions', dynCodec(() => ExecutableCodec) as any], ['creation_time', dynCodec(() => U64Codec) as any], ['time_to_live_ms', dynCodec(() => U64Codec) as any], ['nonce', dynCodec(() => OptionU32Codec) as any], ['metadata', dynCodec(() => BTreeMapNameValueCodec) as any]]) as any

// TransactionRejectionReason

export interface TransactionRejectionReason extends Enum<
    | ['NotPermitted', NotPermittedFail]
    | ['UnsatisfiedSignatureCondition', UnsatisfiedSignatureConditionFail]
    | ['LimitCheck', TransactionLimitError]
    | ['InstructionExecution', InstructionExecutionFail]
    | ['WasmExecution', WasmExecutionFail]
    | 'UnexpectedGenesisAccountSignature'
> {}

export const TransactionRejectionReasonCodec: Codec<TransactionRejectionReason> = createEnumCodec<any>('TransactionRejectionReason', [[0, 'NotPermitted', dynCodec(() => NotPermittedFailCodec)], [1, 'UnsatisfiedSignatureCondition', dynCodec(() => UnsatisfiedSignatureConditionFailCodec)], [2, 'LimitCheck', dynCodec(() => TransactionLimitErrorCodec)], [3, 'InstructionExecution', dynCodec(() => InstructionExecutionFailCodec)], [4, 'WasmExecution', dynCodec(() => WasmExecutionFailCodec)], [5, 'UnexpectedGenesisAccountSignature']]) as any

// TransactionValue

export interface TransactionValue extends Enum<
    | ['Transaction', VersionedTransaction]
    | ['RejectedTransaction', VersionedRejectedTransaction]
> {}

export const TransactionValueCodec: Codec<TransactionValue> = createEnumCodec<any>('TransactionValue', [[0, 'Transaction', dynCodec(() => VersionedTransactionCodec)], [1, 'RejectedTransaction', dynCodec(() => VersionedRejectedTransactionCodec)]]) as any

// TransferBox

export interface TransferBox extends PseudoType<{
    source_id: EvaluatesToIdBox,
    object: EvaluatesToValue,
    destination_id: EvaluatesToIdBox
}> {}

export const TransferBoxCodec: Codec<TransferBox> = createStructCodec<any>('TransferBox', [['source_id', dynCodec(() => EvaluatesToIdBoxCodec) as any], ['object', dynCodec(() => EvaluatesToValueCodec) as any], ['destination_id', dynCodec(() => EvaluatesToIdBoxCodec) as any]]) as any

// Trigger

export interface Trigger extends PseudoType<{
    id: Id,
    action: Action,
    metadata: Metadata
}> {}

export const TriggerCodec: Codec<Trigger> = createStructCodec<any>('Trigger', [['id', dynCodec(() => IdCodec) as any], ['action', dynCodec(() => ActionCodec) as any], ['metadata', dynCodec(() => MetadataCodec) as any]]) as any

// TriggerUpdated

export interface TriggerUpdated extends Enum<
    | 'Extended'
    | 'Shortened'
> {}

export const TriggerUpdatedCodec: Codec<TriggerUpdated> = createEnumCodec<any>('TriggerUpdated', [[0, 'Extended'], [1, 'Shortened']]) as any

// UnregisterBox

export interface UnregisterBox extends PseudoType<{
    object_id: EvaluatesToIdBox
}> {}

export const UnregisterBoxCodec: Codec<UnregisterBox> = createStructCodec<any>('UnregisterBox', [['object_id', dynCodec(() => EvaluatesToIdBoxCodec) as any]]) as any

// UnsatisfiedSignatureConditionFail

export interface UnsatisfiedSignatureConditionFail extends PseudoType<{
    reason: Str
}> {}

export const UnsatisfiedSignatureConditionFailCodec: Codec<UnsatisfiedSignatureConditionFail> = createStructCodec<any>('UnsatisfiedSignatureConditionFail', [['reason', dynCodec(() => StrCodec) as any]]) as any

// Updated

export interface Updated extends Enum<
    | ['Metadata', MetadataUpdated]
    | 'Authentication'
    | 'Permission'
    | ['Asset', AssetUpdated]
    | ['Trigger', TriggerUpdated]
> {}

export const UpdatedCodec: Codec<Updated> = createEnumCodec<any>('Updated', [[0, 'Metadata', dynCodec(() => MetadataUpdatedCodec)], [1, 'Authentication'], [2, 'Permission'], [3, 'Asset', dynCodec(() => AssetUpdatedCodec)], [4, 'Trigger', dynCodec(() => TriggerUpdatedCodec)]]) as any

// ValidBlock

export interface ValidBlock extends PseudoType<{
    header: BlockHeader,
    rejected_transactions: VecVersionedRejectedTransaction,
    transactions: VecVersionedValidTransaction,
    signatures: BTreeSetSignatureOfValidBlock,
    trigger_recommendations: VecAction
}> {}

export const ValidBlockCodec: Codec<ValidBlock> = createStructCodec<any>('ValidBlock', [['header', dynCodec(() => BlockHeaderCodec) as any], ['rejected_transactions', dynCodec(() => VecVersionedRejectedTransactionCodec) as any], ['transactions', dynCodec(() => VecVersionedValidTransactionCodec) as any], ['signatures', dynCodec(() => BTreeSetSignatureOfValidBlockCodec) as any], ['trigger_recommendations', dynCodec(() => VecActionCodec) as any]]) as any

// ValidTransaction

export interface ValidTransaction extends PseudoType<{
    payload: TransactionPayload,
    signatures: SignaturesOfTransactionPayload
}> {}

export const ValidTransactionCodec: Codec<ValidTransaction> = createStructCodec<any>('ValidTransaction', [['payload', dynCodec(() => TransactionPayloadCodec) as any], ['signatures', dynCodec(() => SignaturesOfTransactionPayloadCodec) as any]]) as any

// Value

export interface Value extends Enum<
    | ['U32', U32]
    | ['U128', U128]
    | ['Bool', Bool]
    | ['String', Str]
    | ['Name', Name]
    | ['Fixed', Fixed]
    | ['Vec', VecValue]
    | ['LimitedMetadata', Metadata]
    | ['Id', IdBox]
    | ['Identifiable', IdentifiableBox]
    | ['PublicKey', PublicKey]
    | ['Parameter', Parameter]
    | ['SignatureCheckCondition', SignatureCheckCondition]
    | ['TransactionValue', TransactionValue]
    | ['PermissionToken', PermissionToken]
    | ['Hash', Hash]
> {}

export const ValueCodec: Codec<Value> = createEnumCodec<any>('Value', [[0, 'U32', dynCodec(() => U32Codec)], [1, 'U128', dynCodec(() => U128Codec)], [2, 'Bool', dynCodec(() => BoolCodec)], [3, 'String', dynCodec(() => StrCodec)], [4, 'Name', dynCodec(() => NameCodec)], [5, 'Fixed', dynCodec(() => FixedCodec)], [6, 'Vec', dynCodec(() => VecValueCodec)], [7, 'LimitedMetadata', dynCodec(() => MetadataCodec)], [8, 'Id', dynCodec(() => IdBoxCodec)], [9, 'Identifiable', dynCodec(() => IdentifiableBoxCodec)], [10, 'PublicKey', dynCodec(() => PublicKeyCodec)], [11, 'Parameter', dynCodec(() => ParameterCodec)], [12, 'SignatureCheckCondition', dynCodec(() => SignatureCheckConditionCodec)], [13, 'TransactionValue', dynCodec(() => TransactionValueCodec)], [14, 'PermissionToken', dynCodec(() => PermissionTokenCodec)], [15, 'Hash', dynCodec(() => HashCodec)]]) as any

// VecAction

export interface VecAction extends Array<Action> {}

export const VecActionCodec: Codec<VecAction> = createVecCodec<any>('VecAction', dynCodec(() => ActionCodec)) as any

// VecGenesisTransaction

export interface VecGenesisTransaction extends Array<GenesisTransaction> {}

export const VecGenesisTransactionCodec: Codec<VecGenesisTransaction> = createVecCodec<any>('VecGenesisTransaction', dynCodec(() => GenesisTransactionCodec)) as any

// VecHashOfVersionedValidBlock

export interface VecHashOfVersionedValidBlock extends Array<HashOfVersionedValidBlock> {}

export const VecHashOfVersionedValidBlockCodec: Codec<VecHashOfVersionedValidBlock> = createVecCodec<any>('VecHashOfVersionedValidBlock', dynCodec(() => HashOfVersionedValidBlockCodec)) as any

// VecInstruction

export interface VecInstruction extends Array<Instruction> {}

export const VecInstructionCodec: Codec<VecInstruction> = createVecCodec<any>('VecInstruction', dynCodec(() => InstructionCodec)) as any

// VecPeerId

export interface VecPeerId extends Array<PeerId> {}

export const VecPeerIdCodec: Codec<VecPeerId> = createVecCodec<any>('VecPeerId', dynCodec(() => PeerIdCodec)) as any

// VecPermissionToken

export interface VecPermissionToken extends Array<PermissionToken> {}

export const VecPermissionTokenCodec: Codec<VecPermissionToken> = createVecCodec<any>('VecPermissionToken', dynCodec(() => PermissionTokenCodec)) as any

// VecProof

export interface VecProof extends Array<Proof> {}

export const VecProofCodec: Codec<VecProof> = createVecCodec<any>('VecProof', dynCodec(() => ProofCodec)) as any

// VecPublicKey

export interface VecPublicKey extends Array<PublicKey> {}

export const VecPublicKeyCodec: Codec<VecPublicKey> = createVecCodec<any>('VecPublicKey', dynCodec(() => PublicKeyCodec)) as any

// VecSignatureOfTransactionPayload

export interface VecSignatureOfTransactionPayload extends Array<SignatureOfTransactionPayload> {}

export const VecSignatureOfTransactionPayloadCodec: Codec<VecSignatureOfTransactionPayload> = createVecCodec<any>('VecSignatureOfTransactionPayload', dynCodec(() => SignatureOfTransactionPayloadCodec)) as any

// VecSignatureOfValidBlock

export interface VecSignatureOfValidBlock extends Array<SignatureOfValidBlock> {}

export const VecSignatureOfValidBlockCodec: Codec<VecSignatureOfValidBlock> = createVecCodec<any>('VecSignatureOfValidBlock', dynCodec(() => SignatureOfValidBlockCodec)) as any

// VecValue

export interface VecValue extends Array<Value> {}

export const VecValueCodec: Codec<VecValue> = createVecCodec<any>('VecValue', dynCodec(() => ValueCodec)) as any

// VecVersionedRejectedTransaction

export interface VecVersionedRejectedTransaction extends Array<VersionedRejectedTransaction> {}

export const VecVersionedRejectedTransactionCodec: Codec<VecVersionedRejectedTransaction> = createVecCodec<any>('VecVersionedRejectedTransaction', dynCodec(() => VersionedRejectedTransactionCodec)) as any

// VecVersionedValidTransaction

export interface VecVersionedValidTransaction extends Array<VersionedValidTransaction> {}

export const VecVersionedValidTransactionCodec: Codec<VecVersionedValidTransaction> = createVecCodec<any>('VecVersionedValidTransaction', dynCodec(() => VersionedValidTransactionCodec)) as any

// VersionedBlockPublisherMessage

export interface VersionedBlockPublisherMessage extends Enum<
    | ['V1', BlockPublisherMessage]
> {}

export const VersionedBlockPublisherMessageCodec: Codec<VersionedBlockPublisherMessage> = createEnumCodec<any>('VersionedBlockPublisherMessage', [[1, 'V1', dynCodec(() => BlockPublisherMessageCodec)]]) as any

// VersionedBlockSubscriberMessage

export interface VersionedBlockSubscriberMessage extends Enum<
    | ['V1', BlockSubscriberMessage]
> {}

export const VersionedBlockSubscriberMessageCodec: Codec<VersionedBlockSubscriberMessage> = createEnumCodec<any>('VersionedBlockSubscriberMessage', [[1, 'V1', dynCodec(() => BlockSubscriberMessageCodec)]]) as any

// VersionedCommittedBlock

export interface VersionedCommittedBlock extends Enum<
    | ['V1', CommittedBlock]
> {}

export const VersionedCommittedBlockCodec: Codec<VersionedCommittedBlock> = createEnumCodec<any>('VersionedCommittedBlock', [[1, 'V1', dynCodec(() => CommittedBlockCodec)]]) as any

// VersionedEventPublisherMessage

export interface VersionedEventPublisherMessage extends Enum<
    | ['V1', EventPublisherMessage]
> {}

export const VersionedEventPublisherMessageCodec: Codec<VersionedEventPublisherMessage> = createEnumCodec<any>('VersionedEventPublisherMessage', [[1, 'V1', dynCodec(() => EventPublisherMessageCodec)]]) as any

// VersionedEventSubscriberMessage

export interface VersionedEventSubscriberMessage extends Enum<
    | ['V1', EventSubscriberMessage]
> {}

export const VersionedEventSubscriberMessageCodec: Codec<VersionedEventSubscriberMessage> = createEnumCodec<any>('VersionedEventSubscriberMessage', [[1, 'V1', dynCodec(() => EventSubscriberMessageCodec)]]) as any

// VersionedQueryResult

export interface VersionedQueryResult extends Enum<
    | ['V1', QueryResult]
> {}

export const VersionedQueryResultCodec: Codec<VersionedQueryResult> = createEnumCodec<any>('VersionedQueryResult', [[1, 'V1', dynCodec(() => QueryResultCodec)]]) as any

// VersionedRejectedTransaction

export interface VersionedRejectedTransaction extends Enum<
    | ['V1', RejectedTransaction]
> {}

export const VersionedRejectedTransactionCodec: Codec<VersionedRejectedTransaction> = createEnumCodec<any>('VersionedRejectedTransaction', [[1, 'V1', dynCodec(() => RejectedTransactionCodec)]]) as any

// VersionedSignedQueryRequest

export interface VersionedSignedQueryRequest extends Enum<
    | ['V1', SignedQueryRequest]
> {}

export const VersionedSignedQueryRequestCodec: Codec<VersionedSignedQueryRequest> = createEnumCodec<any>('VersionedSignedQueryRequest', [[1, 'V1', dynCodec(() => SignedQueryRequestCodec)]]) as any

// VersionedTransaction

export interface VersionedTransaction extends Enum<
    | ['V1', Transaction]
> {}

export const VersionedTransactionCodec: Codec<VersionedTransaction> = createEnumCodec<any>('VersionedTransaction', [[1, 'V1', dynCodec(() => TransactionCodec)]]) as any

// VersionedValidBlock

export interface VersionedValidBlock extends Enum<
    | ['V1', ValidBlock]
> {}

export const VersionedValidBlockCodec: Codec<VersionedValidBlock> = createEnumCodec<any>('VersionedValidBlock', [[1, 'V1', dynCodec(() => ValidBlockCodec)]]) as any

// VersionedValidTransaction

export interface VersionedValidTransaction extends Enum<
    | ['V1', ValidTransaction]
> {}

export const VersionedValidTransactionCodec: Codec<VersionedValidTransaction> = createEnumCodec<any>('VersionedValidTransaction', [[1, 'V1', dynCodec(() => ValidTransactionCodec)]]) as any

// WasmExecutionFail

export interface WasmExecutionFail extends PseudoType<{
    reason: Str
}> {}

export const WasmExecutionFailCodec: Codec<WasmExecutionFail> = createStructCodec<any>('WasmExecutionFail', [['reason', dynCodec(() => StrCodec) as any]]) as any

// WasmSmartContract

export interface WasmSmartContract extends PseudoType<{
    raw_data: VecU8
}> {}

export const WasmSmartContractCodec: Codec<WasmSmartContract> = createStructCodec<any>('WasmSmartContract', [['raw_data', dynCodec(() => VecU8Codec) as any]]) as any

// Where

export interface Where extends PseudoType<{
    expression: EvaluatesToValue,
    values: BTreeMapStringEvaluatesToValue
}> {}

export const WhereCodec: Codec<Where> = createStructCodec<any>('Where', [['expression', dynCodec(() => EvaluatesToValueCodec) as any], ['values', dynCodec(() => BTreeMapStringEvaluatesToValueCodec) as any]]) as any
