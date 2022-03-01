import { Bool, Codec, Compact, DynCodec, EnumCodec, MapCodec, OptionCodec, Str, StructCodec, U128, U32, U64, VecCodec, VecU8, createArrayU8Codec, createEnumCodec, createMapCodec, createOptionCodec, createStructCodec, createVecCodec, dynCodec } from '@scale-codec/definition-runtime'

// Account

interface __type_Account extends StructCodec<{
    id: __type_AccountId,
    assets: __type_BTreeMapAssetIdAsset,
    signatories: __type_VecPublicKey,
    permission_tokens: __type_BTreeSetPermissionToken,
    signature_check_condition: __type_SignatureCheckCondition,
    metadata: __type_Metadata
}> {}

export const Account: __type_Account = createStructCodec<any>('Account', [['id', dynCodec(() => AccountId) as any], ['assets', dynCodec(() => BTreeMapAssetIdAsset) as any], ['signatories', dynCodec(() => VecPublicKey) as any], ['permission_tokens', dynCodec(() => BTreeSetPermissionToken) as any], ['signature_check_condition', dynCodec(() => SignatureCheckCondition) as any], ['metadata', dynCodec(() => Metadata) as any]]) as any

// AccountId

interface __type_AccountId extends StructCodec<{
    name: __type_Name,
    domain_id: __type_Id
}> {}

export const AccountId: __type_AccountId = createStructCodec<any>('AccountId', [['name', dynCodec(() => Name) as any], ['domain_id', dynCodec(() => Id) as any]]) as any

// Action

interface __type_Action extends StructCodec<{
    executable: __type_Executable,
    repeats: __type_Repeats,
    technical_account: __type_AccountId,
    filter: __type_EventFilter
}> {}

export const Action: __type_Action = createStructCodec<any>('Action', [['executable', dynCodec(() => Executable) as any], ['repeats', dynCodec(() => Repeats) as any], ['technical_account', dynCodec(() => AccountId) as any], ['filter', dynCodec(() => EventFilter) as any]]) as any

// Add

interface __type_Add extends StructCodec<{
    left: __type_EvaluatesToU32,
    right: __type_EvaluatesToU32
}> {}

export const Add: __type_Add = createStructCodec<any>('Add', [['left', dynCodec(() => EvaluatesToU32) as any], ['right', dynCodec(() => EvaluatesToU32) as any]]) as any

// And

interface __type_And extends StructCodec<{
    left: __type_EvaluatesToBool,
    right: __type_EvaluatesToBool
}> {}

export const And: __type_And = createStructCodec<any>('And', [['left', dynCodec(() => EvaluatesToBool) as any], ['right', dynCodec(() => EvaluatesToBool) as any]]) as any

// ArrayU8L32

interface __type_ArrayU8L32 extends Codec<Uint8Array> {}

export const ArrayU8L32: __type_ArrayU8L32 = createArrayU8Codec('ArrayU8L32', 32) as any

// Asset

interface __type_Asset extends StructCodec<{
    id: __type_AssetId,
    value: __type_AssetValue
}> {}

export const Asset: __type_Asset = createStructCodec<any>('Asset', [['id', dynCodec(() => AssetId) as any], ['value', dynCodec(() => AssetValue) as any]]) as any

// AssetDefinition

interface __type_AssetDefinition extends StructCodec<{
    value_type: __type_AssetValueType,
    id: __type_DefinitionId,
    metadata: __type_Metadata,
    mintable: typeof Bool
}> {}

export const AssetDefinition: __type_AssetDefinition = createStructCodec<any>('AssetDefinition', [['value_type', dynCodec(() => AssetValueType) as any], ['id', dynCodec(() => DefinitionId) as any], ['metadata', dynCodec(() => Metadata) as any], ['mintable', dynCodec(() => Bool) as any]]) as any

// AssetDefinitionEntry

interface __type_AssetDefinitionEntry extends StructCodec<{
    definition: __type_AssetDefinition,
    registered_by: __type_AccountId
}> {}

export const AssetDefinitionEntry: __type_AssetDefinitionEntry = createStructCodec<any>('AssetDefinitionEntry', [['definition', dynCodec(() => AssetDefinition) as any], ['registered_by', dynCodec(() => AccountId) as any]]) as any

// AssetId

interface __type_AssetId extends StructCodec<{
    definition_id: __type_DefinitionId,
    account_id: __type_AccountId
}> {}

export const AssetId: __type_AssetId = createStructCodec<any>('AssetId', [['definition_id', dynCodec(() => DefinitionId) as any], ['account_id', dynCodec(() => AccountId) as any]]) as any

// AssetUpdated

interface __type_AssetUpdated extends EnumCodec<
    | 'Received'
    | 'Sent'
> {}

export const AssetUpdated: __type_AssetUpdated = createEnumCodec<any>('AssetUpdated', [[0, 'Received'], [1, 'Sent']]) as any

// AssetValue

interface __type_AssetValue extends EnumCodec<
    | ['Quantity', typeof U32]
    | ['BigQuantity', typeof U128]
    | ['Fixed', __type_Fixed]
    | ['Store', __type_Metadata]
> {}

export const AssetValue: __type_AssetValue = createEnumCodec<any>('AssetValue', [[0, 'Quantity', dynCodec(() => U32)], [1, 'BigQuantity', dynCodec(() => U128)], [2, 'Fixed', dynCodec(() => Fixed)], [3, 'Store', dynCodec(() => Metadata)]]) as any

// AssetValueType

interface __type_AssetValueType extends EnumCodec<
    | 'Quantity'
    | 'BigQuantity'
    | 'Fixed'
    | 'Store'
> {}

export const AssetValueType: __type_AssetValueType = createEnumCodec<any>('AssetValueType', [[0, 'Quantity'], [1, 'BigQuantity'], [2, 'Fixed'], [3, 'Store']]) as any

// BlockCreationTimeout

import { Void as BlockCreationTimeout } from '@scale-codec/definition-runtime'

type __type_BlockCreationTimeout = typeof BlockCreationTimeout

export { BlockCreationTimeout }

// BlockHeader

interface __type_BlockHeader extends StructCodec<{
    timestamp: typeof U128,
    height: typeof U64,
    previous_block_hash: __type_HashOfVersionedCommittedBlock,
    transactions_hash: __type_HashOfMerkleTreeVersionedTransaction,
    rejected_transactions_hash: __type_HashOfMerkleTreeVersionedTransaction,
    view_change_proofs: __type_ProofChain,
    invalidated_blocks_hashes: __type_VecHashOfVersionedValidBlock,
    genesis_topology: __type_OptionTopology
}> {}

export const BlockHeader: __type_BlockHeader = createStructCodec<any>('BlockHeader', [['timestamp', dynCodec(() => U128) as any], ['height', dynCodec(() => U64) as any], ['previous_block_hash', dynCodec(() => HashOfVersionedCommittedBlock) as any], ['transactions_hash', dynCodec(() => HashOfMerkleTreeVersionedTransaction) as any], ['rejected_transactions_hash', dynCodec(() => HashOfMerkleTreeVersionedTransaction) as any], ['view_change_proofs', dynCodec(() => ProofChain) as any], ['invalidated_blocks_hashes', dynCodec(() => VecHashOfVersionedValidBlock) as any], ['genesis_topology', dynCodec(() => OptionTopology) as any]]) as any

// BlockPublisherMessage

interface __type_BlockPublisherMessage extends EnumCodec<
    | 'SubscriptionAccepted'
    | ['Block', __type_VersionedCommittedBlock]
> {}

export const BlockPublisherMessage: __type_BlockPublisherMessage = createEnumCodec<any>('BlockPublisherMessage', [[0, 'SubscriptionAccepted'], [1, 'Block', dynCodec(() => VersionedCommittedBlock)]]) as any

// BlockRejectionReason

interface __type_BlockRejectionReason extends EnumCodec<
    | 'ConsensusBlockRejection'
> {}

export const BlockRejectionReason: __type_BlockRejectionReason = createEnumCodec<any>('BlockRejectionReason', [[0, 'ConsensusBlockRejection']]) as any

// BlockSubscriberMessage

interface __type_BlockSubscriberMessage extends EnumCodec<
    | ['SubscriptionRequest', typeof U64]
    | 'BlockReceived'
> {}

export const BlockSubscriberMessage: __type_BlockSubscriberMessage = createEnumCodec<any>('BlockSubscriberMessage', [[0, 'SubscriptionRequest', dynCodec(() => U64)], [1, 'BlockReceived']]) as any

// BTreeMapAccountIdAccount

interface __type_BTreeMapAccountIdAccount extends MapCodec<__type_AccountId, __type_Account> {}

export const BTreeMapAccountIdAccount: __type_BTreeMapAccountIdAccount = createMapCodec<any, any>('BTreeMapAccountIdAccount', dynCodec(() => AccountId), dynCodec(() => Account)) as any

// BTreeMapAssetIdAsset

interface __type_BTreeMapAssetIdAsset extends MapCodec<__type_AssetId, __type_Asset> {}

export const BTreeMapAssetIdAsset: __type_BTreeMapAssetIdAsset = createMapCodec<any, any>('BTreeMapAssetIdAsset', dynCodec(() => AssetId), dynCodec(() => Asset)) as any

// BTreeMapDefinitionIdAssetDefinitionEntry

interface __type_BTreeMapDefinitionIdAssetDefinitionEntry extends MapCodec<__type_DefinitionId, __type_AssetDefinitionEntry> {}

export const BTreeMapDefinitionIdAssetDefinitionEntry: __type_BTreeMapDefinitionIdAssetDefinitionEntry = createMapCodec<any, any>('BTreeMapDefinitionIdAssetDefinitionEntry', dynCodec(() => DefinitionId), dynCodec(() => AssetDefinitionEntry)) as any

// BTreeMapNameValue

interface __type_BTreeMapNameValue extends MapCodec<__type_Name, __type_Value> {}

export const BTreeMapNameValue: __type_BTreeMapNameValue = createMapCodec<any, any>('BTreeMapNameValue', dynCodec(() => Name), dynCodec(() => Value)) as any

// BTreeMapPublicKeySignatureOfCommittedBlock

interface __type_BTreeMapPublicKeySignatureOfCommittedBlock extends MapCodec<__type_PublicKey, __type_SignatureOfCommittedBlock> {}

export const BTreeMapPublicKeySignatureOfCommittedBlock: __type_BTreeMapPublicKeySignatureOfCommittedBlock = createMapCodec<any, any>('BTreeMapPublicKeySignatureOfCommittedBlock', dynCodec(() => PublicKey), dynCodec(() => SignatureOfCommittedBlock)) as any

// BTreeMapPublicKeySignatureOfProof

interface __type_BTreeMapPublicKeySignatureOfProof extends MapCodec<__type_PublicKey, __type_SignatureOfProof> {}

export const BTreeMapPublicKeySignatureOfProof: __type_BTreeMapPublicKeySignatureOfProof = createMapCodec<any, any>('BTreeMapPublicKeySignatureOfProof', dynCodec(() => PublicKey), dynCodec(() => SignatureOfProof)) as any

// BTreeMapPublicKeySignatureOfTransactionPayload

interface __type_BTreeMapPublicKeySignatureOfTransactionPayload extends MapCodec<__type_PublicKey, __type_SignatureOfTransactionPayload> {}

export const BTreeMapPublicKeySignatureOfTransactionPayload: __type_BTreeMapPublicKeySignatureOfTransactionPayload = createMapCodec<any, any>('BTreeMapPublicKeySignatureOfTransactionPayload', dynCodec(() => PublicKey), dynCodec(() => SignatureOfTransactionPayload)) as any

// BTreeMapStringEvaluatesToValue

interface __type_BTreeMapStringEvaluatesToValue extends MapCodec<typeof Str, __type_EvaluatesToValue> {}

export const BTreeMapStringEvaluatesToValue: __type_BTreeMapStringEvaluatesToValue = createMapCodec<any, any>('BTreeMapStringEvaluatesToValue', dynCodec(() => Str), dynCodec(() => EvaluatesToValue)) as any

// BTreeSetPermissionToken

interface __type_BTreeSetPermissionToken extends VecCodec<__type_PermissionToken> {}

export const BTreeSetPermissionToken: __type_BTreeSetPermissionToken = createVecCodec<any>('BTreeSetPermissionToken', dynCodec(() => PermissionToken)) as any

// BTreeSetSignatureOfTransactionPayload

interface __type_BTreeSetSignatureOfTransactionPayload extends VecCodec<__type_SignatureOfTransactionPayload> {}

export const BTreeSetSignatureOfTransactionPayload: __type_BTreeSetSignatureOfTransactionPayload = createVecCodec<any>('BTreeSetSignatureOfTransactionPayload', dynCodec(() => SignatureOfTransactionPayload)) as any

// BTreeSetSignatureOfValidBlock

interface __type_BTreeSetSignatureOfValidBlock extends VecCodec<__type_SignatureOfValidBlock> {}

export const BTreeSetSignatureOfValidBlock: __type_BTreeSetSignatureOfValidBlock = createVecCodec<any>('BTreeSetSignatureOfValidBlock', dynCodec(() => SignatureOfValidBlock)) as any

// BurnBox

interface __type_BurnBox extends StructCodec<{
    object: __type_EvaluatesToValue,
    destination_id: __type_EvaluatesToIdBox
}> {}

export const BurnBox: __type_BurnBox = createStructCodec<any>('BurnBox', [['object', dynCodec(() => EvaluatesToValue) as any], ['destination_id', dynCodec(() => EvaluatesToIdBox) as any]]) as any

// CommittedBlock

interface __type_CommittedBlock extends StructCodec<{
    header: __type_BlockHeader,
    rejected_transactions: __type_VecVersionedRejectedTransaction,
    transactions: __type_VecVersionedValidTransaction,
    trigger_recommendations: __type_VecAction,
    signatures: __type_SignaturesOfCommittedBlock
}> {}

export const CommittedBlock: __type_CommittedBlock = createStructCodec<any>('CommittedBlock', [['header', dynCodec(() => BlockHeader) as any], ['rejected_transactions', dynCodec(() => VecVersionedRejectedTransaction) as any], ['transactions', dynCodec(() => VecVersionedValidTransaction) as any], ['trigger_recommendations', dynCodec(() => VecAction) as any], ['signatures', dynCodec(() => SignaturesOfCommittedBlock) as any]]) as any

// CommitTimeout

interface __type_CommitTimeout extends StructCodec<{
    hash: __type_HashOfVersionedValidBlock
}> {}

export const CommitTimeout: __type_CommitTimeout = createStructCodec<any>('CommitTimeout', [['hash', dynCodec(() => HashOfVersionedValidBlock) as any]]) as any

// Contains

interface __type_Contains extends StructCodec<{
    collection: __type_EvaluatesToVecValue,
    element: __type_EvaluatesToValue
}> {}

export const Contains: __type_Contains = createStructCodec<any>('Contains', [['collection', dynCodec(() => EvaluatesToVecValue) as any], ['element', dynCodec(() => EvaluatesToValue) as any]]) as any

// ContainsAll

interface __type_ContainsAll extends StructCodec<{
    collection: __type_EvaluatesToVecValue,
    elements: __type_EvaluatesToVecValue
}> {}

export const ContainsAll: __type_ContainsAll = createStructCodec<any>('ContainsAll', [['collection', dynCodec(() => EvaluatesToVecValue) as any], ['elements', dynCodec(() => EvaluatesToVecValue) as any]]) as any

// ContainsAny

interface __type_ContainsAny extends StructCodec<{
    collection: __type_EvaluatesToVecValue,
    elements: __type_EvaluatesToVecValue
}> {}

export const ContainsAny: __type_ContainsAny = createStructCodec<any>('ContainsAny', [['collection', dynCodec(() => EvaluatesToVecValue) as any], ['elements', dynCodec(() => EvaluatesToVecValue) as any]]) as any

// ContextValue

interface __type_ContextValue extends StructCodec<{
    value_name: typeof Str
}> {}

export const ContextValue: __type_ContextValue = createStructCodec<any>('ContextValue', [['value_name', dynCodec(() => Str) as any]]) as any

// DataEvent

interface __type_DataEvent extends StructCodec<{
    entity: __type_Entity,
    status: __type_Status
}> {}

export const DataEvent: __type_DataEvent = createStructCodec<any>('DataEvent', [['entity', dynCodec(() => Entity) as any], ['status', dynCodec(() => Status) as any]]) as any

// DataEventFilter

interface __type_DataEventFilter extends StructCodec<{
    entity: __type_OptionEntityFilter,
    status: __type_OptionStatusFilter
}> {}

export const DataEventFilter: __type_DataEventFilter = createStructCodec<any>('DataEventFilter', [['entity', dynCodec(() => OptionEntityFilter) as any], ['status', dynCodec(() => OptionStatusFilter) as any]]) as any

// DefinitionId

interface __type_DefinitionId extends StructCodec<{
    name: __type_Name,
    domain_id: __type_Id
}> {}

export const DefinitionId: __type_DefinitionId = createStructCodec<any>('DefinitionId', [['name', dynCodec(() => Name) as any], ['domain_id', dynCodec(() => Id) as any]]) as any

// Divide

interface __type_Divide extends StructCodec<{
    left: __type_EvaluatesToU32,
    right: __type_EvaluatesToU32
}> {}

export const Divide: __type_Divide = createStructCodec<any>('Divide', [['left', dynCodec(() => EvaluatesToU32) as any], ['right', dynCodec(() => EvaluatesToU32) as any]]) as any

// Domain

interface __type_Domain extends StructCodec<{
    id: __type_Id,
    accounts: __type_BTreeMapAccountIdAccount,
    asset_definitions: __type_BTreeMapDefinitionIdAssetDefinitionEntry,
    metadata: __type_Metadata,
    logo: __type_OptionIpfsPath
}> {}

export const Domain: __type_Domain = createStructCodec<any>('Domain', [['id', dynCodec(() => Id) as any], ['accounts', dynCodec(() => BTreeMapAccountIdAccount) as any], ['asset_definitions', dynCodec(() => BTreeMapDefinitionIdAssetDefinitionEntry) as any], ['metadata', dynCodec(() => Metadata) as any], ['logo', dynCodec(() => OptionIpfsPath) as any]]) as any

// Entity

interface __type_Entity extends EnumCodec<
    | ['Account', __type_AccountId]
    | ['AssetDefinition', __type_DefinitionId]
    | ['Asset', __type_AssetId]
    | ['Domain', __type_Id]
    | ['Peer', __type_PeerId]
    | ['Trigger', __type_Id]
> {}

export const Entity: __type_Entity = createEnumCodec<any>('Entity', [[0, 'Account', dynCodec(() => AccountId)], [1, 'AssetDefinition', dynCodec(() => DefinitionId)], [2, 'Asset', dynCodec(() => AssetId)], [3, 'Domain', dynCodec(() => Id)], [4, 'Peer', dynCodec(() => PeerId)], [5, 'Trigger', dynCodec(() => Id)]]) as any

// EntityFilter

interface __type_EntityFilter extends EnumCodec<
    | ['Account', __type_OptionAccountId]
    | ['AssetDefinition', __type_OptionDefinitionId]
    | ['Asset', __type_OptionAssetId]
    | ['Domain', __type_OptionId]
    | ['Peer', __type_OptionPeerId]
> {}

export const EntityFilter: __type_EntityFilter = createEnumCodec<any>('EntityFilter', [[0, 'Account', dynCodec(() => OptionAccountId)], [1, 'AssetDefinition', dynCodec(() => OptionDefinitionId)], [2, 'Asset', dynCodec(() => OptionAssetId)], [3, 'Domain', dynCodec(() => OptionId)], [4, 'Peer', dynCodec(() => OptionPeerId)]]) as any

// EntityType

interface __type_EntityType extends EnumCodec<
    | 'Block'
    | 'Transaction'
> {}

export const EntityType: __type_EntityType = createEnumCodec<any>('EntityType', [[0, 'Block'], [1, 'Transaction']]) as any

// Equal

interface __type_Equal extends StructCodec<{
    left: __type_EvaluatesToValue,
    right: __type_EvaluatesToValue
}> {}

export const Equal: __type_Equal = createStructCodec<any>('Equal', [['left', dynCodec(() => EvaluatesToValue) as any], ['right', dynCodec(() => EvaluatesToValue) as any]]) as any

// EvaluatesToAccountId

interface __type_EvaluatesToAccountId extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToAccountId: __type_EvaluatesToAccountId = createStructCodec<any>('EvaluatesToAccountId', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToAssetId

interface __type_EvaluatesToAssetId extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToAssetId: __type_EvaluatesToAssetId = createStructCodec<any>('EvaluatesToAssetId', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToBool

interface __type_EvaluatesToBool extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToBool: __type_EvaluatesToBool = createStructCodec<any>('EvaluatesToBool', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToDefinitionId

interface __type_EvaluatesToDefinitionId extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToDefinitionId: __type_EvaluatesToDefinitionId = createStructCodec<any>('EvaluatesToDefinitionId', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToHash

interface __type_EvaluatesToHash extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToHash: __type_EvaluatesToHash = createStructCodec<any>('EvaluatesToHash', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToId

interface __type_EvaluatesToId extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToId: __type_EvaluatesToId = createStructCodec<any>('EvaluatesToId', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToIdBox

interface __type_EvaluatesToIdBox extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToIdBox: __type_EvaluatesToIdBox = createStructCodec<any>('EvaluatesToIdBox', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToIdentifiableBox

interface __type_EvaluatesToIdentifiableBox extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToIdentifiableBox: __type_EvaluatesToIdentifiableBox = createStructCodec<any>('EvaluatesToIdentifiableBox', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToName

interface __type_EvaluatesToName extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToName: __type_EvaluatesToName = createStructCodec<any>('EvaluatesToName', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToU32

interface __type_EvaluatesToU32 extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToU32: __type_EvaluatesToU32 = createStructCodec<any>('EvaluatesToU32', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToValue

interface __type_EvaluatesToValue extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToValue: __type_EvaluatesToValue = createStructCodec<any>('EvaluatesToValue', [['expression', dynCodec(() => Expression) as any]]) as any

// EvaluatesToVecValue

interface __type_EvaluatesToVecValue extends StructCodec<{
    expression: __type_Expression
}> {}

export const EvaluatesToVecValue: __type_EvaluatesToVecValue = createStructCodec<any>('EvaluatesToVecValue', [['expression', dynCodec(() => Expression) as any]]) as any

// Event

interface __type_Event extends EnumCodec<
    | ['Pipeline', __type_PipelineEvent]
    | ['Data', __type_DataEvent]
> {}

export const Event: __type_Event = createEnumCodec<any>('Event', [[0, 'Pipeline', dynCodec(() => PipelineEvent)], [1, 'Data', dynCodec(() => DataEvent)]]) as any

// EventFilter

interface __type_EventFilter extends EnumCodec<
    | ['Pipeline', __type_PipelineEventFilter]
    | ['Data', __type_DataEventFilter]
> {}

export const EventFilter: __type_EventFilter = createEnumCodec<any>('EventFilter', [[0, 'Pipeline', dynCodec(() => PipelineEventFilter)], [1, 'Data', dynCodec(() => DataEventFilter)]]) as any

// EventPublisherMessage

interface __type_EventPublisherMessage extends EnumCodec<
    | 'SubscriptionAccepted'
    | ['Event', __type_Event]
> {}

export const EventPublisherMessage: __type_EventPublisherMessage = createEnumCodec<any>('EventPublisherMessage', [[0, 'SubscriptionAccepted'], [1, 'Event', dynCodec(() => Event)]]) as any

// EventSubscriberMessage

interface __type_EventSubscriberMessage extends EnumCodec<
    | ['SubscriptionRequest', __type_EventFilter]
    | 'EventReceived'
> {}

export const EventSubscriberMessage: __type_EventSubscriberMessage = createEnumCodec<any>('EventSubscriberMessage', [[0, 'SubscriptionRequest', dynCodec(() => EventFilter)], [1, 'EventReceived']]) as any

// Executable

interface __type_Executable extends EnumCodec<
    | ['Instructions', __type_VecInstruction]
    | ['Wasm', __type_WasmSmartContract]
> {}

export const Executable: __type_Executable = createEnumCodec<any>('Executable', [[0, 'Instructions', dynCodec(() => VecInstruction)], [1, 'Wasm', dynCodec(() => WasmSmartContract)]]) as any

// Expression

interface __type_Expression extends EnumCodec<
    | ['Add', __type_Add]
    | ['Subtract', __type_Subtract]
    | ['Multiply', __type_Multiply]
    | ['Divide', __type_Divide]
    | ['Mod', __type_Mod]
    | ['RaiseTo', __type_RaiseTo]
    | ['Greater', __type_Greater]
    | ['Less', __type_Less]
    | ['Equal', __type_Equal]
    | ['Not', __type_Not]
    | ['And', __type_And]
    | ['Or', __type_Or]
    | ['If', __type_ExpressionIf]
    | ['Raw', __type_Value]
    | ['Query', __type_QueryBox]
    | ['Contains', __type_Contains]
    | ['ContainsAll', __type_ContainsAll]
    | ['ContainsAny', __type_ContainsAny]
    | ['Where', __type_Where]
    | ['ContextValue', __type_ContextValue]
> {}

export const Expression: __type_Expression = createEnumCodec<any>('Expression', [[0, 'Add', dynCodec(() => Add)], [1, 'Subtract', dynCodec(() => Subtract)], [2, 'Multiply', dynCodec(() => Multiply)], [3, 'Divide', dynCodec(() => Divide)], [4, 'Mod', dynCodec(() => Mod)], [5, 'RaiseTo', dynCodec(() => RaiseTo)], [6, 'Greater', dynCodec(() => Greater)], [7, 'Less', dynCodec(() => Less)], [8, 'Equal', dynCodec(() => Equal)], [9, 'Not', dynCodec(() => Not)], [10, 'And', dynCodec(() => And)], [11, 'Or', dynCodec(() => Or)], [12, 'If', dynCodec(() => ExpressionIf)], [13, 'Raw', dynCodec(() => Value)], [14, 'Query', dynCodec(() => QueryBox)], [15, 'Contains', dynCodec(() => Contains)], [16, 'ContainsAll', dynCodec(() => ContainsAll)], [17, 'ContainsAny', dynCodec(() => ContainsAny)], [18, 'Where', dynCodec(() => Where)], [19, 'ContextValue', dynCodec(() => ContextValue)]]) as any

// ExpressionIf

interface __type_ExpressionIf extends StructCodec<{
    condition: __type_EvaluatesToBool,
    then_expression: __type_EvaluatesToValue,
    else_expression: __type_EvaluatesToValue
}> {}

export const ExpressionIf: __type_ExpressionIf = createStructCodec<any>('ExpressionIf', [['condition', dynCodec(() => EvaluatesToBool) as any], ['then_expression', dynCodec(() => EvaluatesToValue) as any], ['else_expression', dynCodec(() => EvaluatesToValue) as any]]) as any

// FailBox

interface __type_FailBox extends StructCodec<{
    message: typeof Str
}> {}

export const FailBox: __type_FailBox = createStructCodec<any>('FailBox', [['message', dynCodec(() => Str) as any]]) as any

// FindAccountById

interface __type_FindAccountById extends StructCodec<{
    id: __type_EvaluatesToAccountId
}> {}

export const FindAccountById: __type_FindAccountById = createStructCodec<any>('FindAccountById', [['id', dynCodec(() => EvaluatesToAccountId) as any]]) as any

// FindAccountKeyValueByIdAndKey

interface __type_FindAccountKeyValueByIdAndKey extends StructCodec<{
    id: __type_EvaluatesToAccountId,
    key: __type_EvaluatesToName
}> {}

export const FindAccountKeyValueByIdAndKey: __type_FindAccountKeyValueByIdAndKey = createStructCodec<any>('FindAccountKeyValueByIdAndKey', [['id', dynCodec(() => EvaluatesToAccountId) as any], ['key', dynCodec(() => EvaluatesToName) as any]]) as any

// FindAccountsByDomainId

interface __type_FindAccountsByDomainId extends StructCodec<{
    domain_id: __type_EvaluatesToId
}> {}

export const FindAccountsByDomainId: __type_FindAccountsByDomainId = createStructCodec<any>('FindAccountsByDomainId', [['domain_id', dynCodec(() => EvaluatesToId) as any]]) as any

// FindAccountsByName

interface __type_FindAccountsByName extends StructCodec<{
    name: __type_EvaluatesToName
}> {}

export const FindAccountsByName: __type_FindAccountsByName = createStructCodec<any>('FindAccountsByName', [['name', dynCodec(() => EvaluatesToName) as any]]) as any

// FindAllAccounts

import { Void as FindAllAccounts } from '@scale-codec/definition-runtime'

type __type_FindAllAccounts = typeof FindAllAccounts

export { FindAllAccounts }

// FindAllAssets

import { Void as FindAllAssets } from '@scale-codec/definition-runtime'

type __type_FindAllAssets = typeof FindAllAssets

export { FindAllAssets }

// FindAllAssetsDefinitions

import { Void as FindAllAssetsDefinitions } from '@scale-codec/definition-runtime'

type __type_FindAllAssetsDefinitions = typeof FindAllAssetsDefinitions

export { FindAllAssetsDefinitions }

// FindAllDomains

import { Void as FindAllDomains } from '@scale-codec/definition-runtime'

type __type_FindAllDomains = typeof FindAllDomains

export { FindAllDomains }

// FindAllPeers

import { Void as FindAllPeers } from '@scale-codec/definition-runtime'

type __type_FindAllPeers = typeof FindAllPeers

export { FindAllPeers }

// FindAssetById

interface __type_FindAssetById extends StructCodec<{
    id: __type_EvaluatesToAssetId
}> {}

export const FindAssetById: __type_FindAssetById = createStructCodec<any>('FindAssetById', [['id', dynCodec(() => EvaluatesToAssetId) as any]]) as any

// FindAssetDefinitionKeyValueByIdAndKey

interface __type_FindAssetDefinitionKeyValueByIdAndKey extends StructCodec<{
    id: __type_EvaluatesToDefinitionId,
    key: __type_EvaluatesToName
}> {}

export const FindAssetDefinitionKeyValueByIdAndKey: __type_FindAssetDefinitionKeyValueByIdAndKey = createStructCodec<any>('FindAssetDefinitionKeyValueByIdAndKey', [['id', dynCodec(() => EvaluatesToDefinitionId) as any], ['key', dynCodec(() => EvaluatesToName) as any]]) as any

// FindAssetKeyValueByIdAndKey

interface __type_FindAssetKeyValueByIdAndKey extends StructCodec<{
    id: __type_EvaluatesToAssetId,
    key: __type_EvaluatesToName
}> {}

export const FindAssetKeyValueByIdAndKey: __type_FindAssetKeyValueByIdAndKey = createStructCodec<any>('FindAssetKeyValueByIdAndKey', [['id', dynCodec(() => EvaluatesToAssetId) as any], ['key', dynCodec(() => EvaluatesToName) as any]]) as any

// FindAssetQuantityById

interface __type_FindAssetQuantityById extends StructCodec<{
    id: __type_EvaluatesToAssetId
}> {}

export const FindAssetQuantityById: __type_FindAssetQuantityById = createStructCodec<any>('FindAssetQuantityById', [['id', dynCodec(() => EvaluatesToAssetId) as any]]) as any

// FindAssetsByAccountId

interface __type_FindAssetsByAccountId extends StructCodec<{
    account_id: __type_EvaluatesToAccountId
}> {}

export const FindAssetsByAccountId: __type_FindAssetsByAccountId = createStructCodec<any>('FindAssetsByAccountId', [['account_id', dynCodec(() => EvaluatesToAccountId) as any]]) as any

// FindAssetsByAssetDefinitionId

interface __type_FindAssetsByAssetDefinitionId extends StructCodec<{
    asset_definition_id: __type_EvaluatesToDefinitionId
}> {}

export const FindAssetsByAssetDefinitionId: __type_FindAssetsByAssetDefinitionId = createStructCodec<any>('FindAssetsByAssetDefinitionId', [['asset_definition_id', dynCodec(() => EvaluatesToDefinitionId) as any]]) as any

// FindAssetsByDomainId

interface __type_FindAssetsByDomainId extends StructCodec<{
    domain_id: __type_EvaluatesToId
}> {}

export const FindAssetsByDomainId: __type_FindAssetsByDomainId = createStructCodec<any>('FindAssetsByDomainId', [['domain_id', dynCodec(() => EvaluatesToId) as any]]) as any

// FindAssetsByDomainIdAndAssetDefinitionId

interface __type_FindAssetsByDomainIdAndAssetDefinitionId extends StructCodec<{
    domain_id: __type_EvaluatesToId,
    asset_definition_id: __type_EvaluatesToDefinitionId
}> {}

export const FindAssetsByDomainIdAndAssetDefinitionId: __type_FindAssetsByDomainIdAndAssetDefinitionId = createStructCodec<any>('FindAssetsByDomainIdAndAssetDefinitionId', [['domain_id', dynCodec(() => EvaluatesToId) as any], ['asset_definition_id', dynCodec(() => EvaluatesToDefinitionId) as any]]) as any

// FindAssetsByName

interface __type_FindAssetsByName extends StructCodec<{
    name: __type_EvaluatesToName
}> {}

export const FindAssetsByName: __type_FindAssetsByName = createStructCodec<any>('FindAssetsByName', [['name', dynCodec(() => EvaluatesToName) as any]]) as any

// FindDomainById

interface __type_FindDomainById extends StructCodec<{
    id: __type_EvaluatesToId
}> {}

export const FindDomainById: __type_FindDomainById = createStructCodec<any>('FindDomainById', [['id', dynCodec(() => EvaluatesToId) as any]]) as any

// FindDomainKeyValueByIdAndKey

interface __type_FindDomainKeyValueByIdAndKey extends StructCodec<{
    id: __type_EvaluatesToId,
    key: __type_EvaluatesToName
}> {}

export const FindDomainKeyValueByIdAndKey: __type_FindDomainKeyValueByIdAndKey = createStructCodec<any>('FindDomainKeyValueByIdAndKey', [['id', dynCodec(() => EvaluatesToId) as any], ['key', dynCodec(() => EvaluatesToName) as any]]) as any

// FindPermissionTokensByAccountId

interface __type_FindPermissionTokensByAccountId extends StructCodec<{
    id: __type_EvaluatesToAccountId
}> {}

export const FindPermissionTokensByAccountId: __type_FindPermissionTokensByAccountId = createStructCodec<any>('FindPermissionTokensByAccountId', [['id', dynCodec(() => EvaluatesToAccountId) as any]]) as any

// FindTransactionByHash

interface __type_FindTransactionByHash extends StructCodec<{
    hash: __type_EvaluatesToHash
}> {}

export const FindTransactionByHash: __type_FindTransactionByHash = createStructCodec<any>('FindTransactionByHash', [['hash', dynCodec(() => EvaluatesToHash) as any]]) as any

// FindTransactionsByAccountId

interface __type_FindTransactionsByAccountId extends StructCodec<{
    account_id: __type_EvaluatesToAccountId
}> {}

export const FindTransactionsByAccountId: __type_FindTransactionsByAccountId = createStructCodec<any>('FindTransactionsByAccountId', [['account_id', dynCodec(() => EvaluatesToAccountId) as any]]) as any

// Fixed

interface __type_Fixed extends DynCodec<__type_FixedPointI64> {}

export const Fixed: __type_Fixed = dynCodec(() => FixedPointI64)

// FixedPointI64

import { FixedPointI64P9 as FixedPointI64 } from './fixed-point'

type __type_FixedPointI64 = typeof FixedPointI64

export { FixedPointI64 }

// GenesisTransaction

interface __type_GenesisTransaction extends StructCodec<{
    isi: __type_VecInstruction
}> {}

export const GenesisTransaction: __type_GenesisTransaction = createStructCodec<any>('GenesisTransaction', [['isi', dynCodec(() => VecInstruction) as any]]) as any

// GrantBox

interface __type_GrantBox extends StructCodec<{
    object: __type_EvaluatesToValue,
    destination_id: __type_EvaluatesToIdBox
}> {}

export const GrantBox: __type_GrantBox = createStructCodec<any>('GrantBox', [['object', dynCodec(() => EvaluatesToValue) as any], ['destination_id', dynCodec(() => EvaluatesToIdBox) as any]]) as any

// Greater

interface __type_Greater extends StructCodec<{
    left: __type_EvaluatesToU32,
    right: __type_EvaluatesToU32
}> {}

export const Greater: __type_Greater = createStructCodec<any>('Greater', [['left', dynCodec(() => EvaluatesToU32) as any], ['right', dynCodec(() => EvaluatesToU32) as any]]) as any

// Hash

interface __type_Hash extends DynCodec<__type_ArrayU8L32> {}

export const Hash: __type_Hash = dynCodec(() => ArrayU8L32)

// HashOfMerkleTreeVersionedTransaction

interface __type_HashOfMerkleTreeVersionedTransaction extends DynCodec<__type_Hash> {}

export const HashOfMerkleTreeVersionedTransaction: __type_HashOfMerkleTreeVersionedTransaction = dynCodec(() => Hash)

// HashOfNodeVersionedTransaction

interface __type_HashOfNodeVersionedTransaction extends DynCodec<__type_Hash> {}

export const HashOfNodeVersionedTransaction: __type_HashOfNodeVersionedTransaction = dynCodec(() => Hash)

// HashOfProof

interface __type_HashOfProof extends DynCodec<__type_Hash> {}

export const HashOfProof: __type_HashOfProof = dynCodec(() => Hash)

// HashOfVersionedCommittedBlock

interface __type_HashOfVersionedCommittedBlock extends DynCodec<__type_Hash> {}

export const HashOfVersionedCommittedBlock: __type_HashOfVersionedCommittedBlock = dynCodec(() => Hash)

// HashOfVersionedTransaction

interface __type_HashOfVersionedTransaction extends DynCodec<__type_Hash> {}

export const HashOfVersionedTransaction: __type_HashOfVersionedTransaction = dynCodec(() => Hash)

// HashOfVersionedValidBlock

interface __type_HashOfVersionedValidBlock extends DynCodec<__type_Hash> {}

export const HashOfVersionedValidBlock: __type_HashOfVersionedValidBlock = dynCodec(() => Hash)

// Id

interface __type_Id extends StructCodec<{
    name: __type_Name
}> {}

export const Id: __type_Id = createStructCodec<any>('Id', [['name', dynCodec(() => Name) as any]]) as any

// IdBox

interface __type_IdBox extends EnumCodec<
    | ['AccountId', __type_AccountId]
    | ['AssetId', __type_AssetId]
    | ['AssetDefinitionId', __type_DefinitionId]
    | ['DomainId', __type_Id]
    | ['PeerId', __type_PeerId]
    | ['TriggerId', __type_Id]
    | 'WorldId'
> {}

export const IdBox: __type_IdBox = createEnumCodec<any>('IdBox', [[0, 'AccountId', dynCodec(() => AccountId)], [1, 'AssetId', dynCodec(() => AssetId)], [2, 'AssetDefinitionId', dynCodec(() => DefinitionId)], [3, 'DomainId', dynCodec(() => Id)], [4, 'PeerId', dynCodec(() => PeerId)], [5, 'TriggerId', dynCodec(() => Id)], [6, 'WorldId']]) as any

// IdentifiableBox

interface __type_IdentifiableBox extends EnumCodec<
    | ['Account', __type_Account]
    | ['NewAccount', __type_NewAccount]
    | ['Asset', __type_Asset]
    | ['AssetDefinition', __type_AssetDefinition]
    | ['Domain', __type_Domain]
    | ['Peer', __type_Peer]
    | ['Trigger', __type_Trigger]
    | 'World'
> {}

export const IdentifiableBox: __type_IdentifiableBox = createEnumCodec<any>('IdentifiableBox', [[0, 'Account', dynCodec(() => Account)], [1, 'NewAccount', dynCodec(() => NewAccount)], [2, 'Asset', dynCodec(() => Asset)], [3, 'AssetDefinition', dynCodec(() => AssetDefinition)], [4, 'Domain', dynCodec(() => Domain)], [5, 'Peer', dynCodec(() => Peer)], [6, 'Trigger', dynCodec(() => Trigger)], [7, 'World']]) as any

// Instruction

interface __type_Instruction extends EnumCodec<
    | ['Register', __type_RegisterBox]
    | ['Unregister', __type_UnregisterBox]
    | ['Mint', __type_MintBox]
    | ['Burn', __type_BurnBox]
    | ['Transfer', __type_TransferBox]
    | ['If', __type_IsiIf]
    | ['Pair', __type_Pair]
    | ['Sequence', __type_SequenceBox]
    | ['Fail', __type_FailBox]
    | ['SetKeyValue', __type_SetKeyValueBox]
    | ['RemoveKeyValue', __type_RemoveKeyValueBox]
    | ['Grant', __type_GrantBox]
    | ['Revoke', __type_RevokeBox]
> {}

export const Instruction: __type_Instruction = createEnumCodec<any>('Instruction', [[0, 'Register', dynCodec(() => RegisterBox)], [1, 'Unregister', dynCodec(() => UnregisterBox)], [2, 'Mint', dynCodec(() => MintBox)], [3, 'Burn', dynCodec(() => BurnBox)], [4, 'Transfer', dynCodec(() => TransferBox)], [5, 'If', dynCodec(() => IsiIf)], [6, 'Pair', dynCodec(() => Pair)], [7, 'Sequence', dynCodec(() => SequenceBox)], [8, 'Fail', dynCodec(() => FailBox)], [9, 'SetKeyValue', dynCodec(() => SetKeyValueBox)], [10, 'RemoveKeyValue', dynCodec(() => RemoveKeyValueBox)], [11, 'Grant', dynCodec(() => GrantBox)], [12, 'Revoke', dynCodec(() => RevokeBox)]]) as any

// InstructionExecutionFail

interface __type_InstructionExecutionFail extends StructCodec<{
    instruction: __type_Instruction,
    reason: typeof Str
}> {}

export const InstructionExecutionFail: __type_InstructionExecutionFail = createStructCodec<any>('InstructionExecutionFail', [['instruction', dynCodec(() => Instruction) as any], ['reason', dynCodec(() => Str) as any]]) as any

// IpfsPath

interface __type_IpfsPath extends DynCodec<typeof Str> {}

export const IpfsPath: __type_IpfsPath = dynCodec(() => Str)

// IsiIf

interface __type_IsiIf extends StructCodec<{
    condition: __type_EvaluatesToBool,
    then: __type_Instruction,
    otherwise: __type_OptionInstruction
}> {}

export const IsiIf: __type_IsiIf = createStructCodec<any>('IsiIf', [['condition', dynCodec(() => EvaluatesToBool) as any], ['then', dynCodec(() => Instruction) as any], ['otherwise', dynCodec(() => OptionInstruction) as any]]) as any

// LeafVersionedTransaction

interface __type_LeafVersionedTransaction extends StructCodec<{
    hash: __type_HashOfVersionedTransaction
}> {}

export const LeafVersionedTransaction: __type_LeafVersionedTransaction = createStructCodec<any>('LeafVersionedTransaction', [['hash', dynCodec(() => HashOfVersionedTransaction) as any]]) as any

// Less

interface __type_Less extends StructCodec<{
    left: __type_EvaluatesToU32,
    right: __type_EvaluatesToU32
}> {}

export const Less: __type_Less = createStructCodec<any>('Less', [['left', dynCodec(() => EvaluatesToU32) as any], ['right', dynCodec(() => EvaluatesToU32) as any]]) as any

// MerkleTreeVersionedTransaction

interface __type_MerkleTreeVersionedTransaction extends StructCodec<{
    root_node: __type_NodeVersionedTransaction
}> {}

export const MerkleTreeVersionedTransaction: __type_MerkleTreeVersionedTransaction = createStructCodec<any>('MerkleTreeVersionedTransaction', [['root_node', dynCodec(() => NodeVersionedTransaction) as any]]) as any

// Metadata

interface __type_Metadata extends StructCodec<{
    map: __type_BTreeMapNameValue
}> {}

export const Metadata: __type_Metadata = createStructCodec<any>('Metadata', [['map', dynCodec(() => BTreeMapNameValue) as any]]) as any

// MetadataUpdated

interface __type_MetadataUpdated extends EnumCodec<
    | 'Inserted'
    | 'Removed'
> {}

export const MetadataUpdated: __type_MetadataUpdated = createEnumCodec<any>('MetadataUpdated', [[0, 'Inserted'], [1, 'Removed']]) as any

// MintBox

interface __type_MintBox extends StructCodec<{
    object: __type_EvaluatesToValue,
    destination_id: __type_EvaluatesToIdBox
}> {}

export const MintBox: __type_MintBox = createStructCodec<any>('MintBox', [['object', dynCodec(() => EvaluatesToValue) as any], ['destination_id', dynCodec(() => EvaluatesToIdBox) as any]]) as any

// Mod

interface __type_Mod extends StructCodec<{
    left: __type_EvaluatesToU32,
    right: __type_EvaluatesToU32
}> {}

export const Mod: __type_Mod = createStructCodec<any>('Mod', [['left', dynCodec(() => EvaluatesToU32) as any], ['right', dynCodec(() => EvaluatesToU32) as any]]) as any

// Multiply

interface __type_Multiply extends StructCodec<{
    left: __type_EvaluatesToU32,
    right: __type_EvaluatesToU32
}> {}

export const Multiply: __type_Multiply = createStructCodec<any>('Multiply', [['left', dynCodec(() => EvaluatesToU32) as any], ['right', dynCodec(() => EvaluatesToU32) as any]]) as any

// Name

interface __type_Name extends DynCodec<typeof Str> {}

export const Name: __type_Name = dynCodec(() => Str)

// NewAccount

interface __type_NewAccount extends StructCodec<{
    id: __type_AccountId,
    signatories: __type_VecPublicKey,
    metadata: __type_Metadata
}> {}

export const NewAccount: __type_NewAccount = createStructCodec<any>('NewAccount', [['id', dynCodec(() => AccountId) as any], ['signatories', dynCodec(() => VecPublicKey) as any], ['metadata', dynCodec(() => Metadata) as any]]) as any

// NodeVersionedTransaction

interface __type_NodeVersionedTransaction extends EnumCodec<
    | ['Subtree', __type_SubtreeVersionedTransaction]
    | ['Leaf', __type_LeafVersionedTransaction]
    | 'Empty'
> {}

export const NodeVersionedTransaction: __type_NodeVersionedTransaction = createEnumCodec<any>('NodeVersionedTransaction', [[0, 'Subtree', dynCodec(() => SubtreeVersionedTransaction)], [1, 'Leaf', dynCodec(() => LeafVersionedTransaction)], [2, 'Empty']]) as any

// Not

interface __type_Not extends StructCodec<{
    expression: __type_EvaluatesToBool
}> {}

export const Not: __type_Not = createStructCodec<any>('Not', [['expression', dynCodec(() => EvaluatesToBool) as any]]) as any

// NotPermittedFail

interface __type_NotPermittedFail extends StructCodec<{
    reason: typeof Str
}> {}

export const NotPermittedFail: __type_NotPermittedFail = createStructCodec<any>('NotPermittedFail', [['reason', dynCodec(() => Str) as any]]) as any

// NoTransactionReceiptReceived

import { Void as NoTransactionReceiptReceived } from '@scale-codec/definition-runtime'

type __type_NoTransactionReceiptReceived = typeof NoTransactionReceiptReceived

export { NoTransactionReceiptReceived }

// OptionAccountId

interface __type_OptionAccountId extends OptionCodec<__type_AccountId> {}

export const OptionAccountId: __type_OptionAccountId = createOptionCodec<any>('OptionAccountId', dynCodec(() => AccountId)) as any

// OptionAssetId

interface __type_OptionAssetId extends OptionCodec<__type_AssetId> {}

export const OptionAssetId: __type_OptionAssetId = createOptionCodec<any>('OptionAssetId', dynCodec(() => AssetId)) as any

// OptionDefinitionId

interface __type_OptionDefinitionId extends OptionCodec<__type_DefinitionId> {}

export const OptionDefinitionId: __type_OptionDefinitionId = createOptionCodec<any>('OptionDefinitionId', dynCodec(() => DefinitionId)) as any

// OptionEntityFilter

interface __type_OptionEntityFilter extends OptionCodec<__type_EntityFilter> {}

export const OptionEntityFilter: __type_OptionEntityFilter = createOptionCodec<any>('OptionEntityFilter', dynCodec(() => EntityFilter)) as any

// OptionEntityType

interface __type_OptionEntityType extends OptionCodec<__type_EntityType> {}

export const OptionEntityType: __type_OptionEntityType = createOptionCodec<any>('OptionEntityType', dynCodec(() => EntityType)) as any

// OptionHash

interface __type_OptionHash extends OptionCodec<__type_Hash> {}

export const OptionHash: __type_OptionHash = createOptionCodec<any>('OptionHash', dynCodec(() => Hash)) as any

// OptionId

interface __type_OptionId extends OptionCodec<__type_Id> {}

export const OptionId: __type_OptionId = createOptionCodec<any>('OptionId', dynCodec(() => Id)) as any

// OptionInstruction

interface __type_OptionInstruction extends OptionCodec<__type_Instruction> {}

export const OptionInstruction: __type_OptionInstruction = createOptionCodec<any>('OptionInstruction', dynCodec(() => Instruction)) as any

// OptionIpfsPath

interface __type_OptionIpfsPath extends OptionCodec<__type_IpfsPath> {}

export const OptionIpfsPath: __type_OptionIpfsPath = createOptionCodec<any>('OptionIpfsPath', dynCodec(() => IpfsPath)) as any

// OptionPeerId

interface __type_OptionPeerId extends OptionCodec<__type_PeerId> {}

export const OptionPeerId: __type_OptionPeerId = createOptionCodec<any>('OptionPeerId', dynCodec(() => PeerId)) as any

// OptionStatusFilter

interface __type_OptionStatusFilter extends OptionCodec<__type_StatusFilter> {}

export const OptionStatusFilter: __type_OptionStatusFilter = createOptionCodec<any>('OptionStatusFilter', dynCodec(() => StatusFilter)) as any

// OptionTopology

interface __type_OptionTopology extends OptionCodec<__type_Topology> {}

export const OptionTopology: __type_OptionTopology = createOptionCodec<any>('OptionTopology', dynCodec(() => Topology)) as any

// OptionU32

interface __type_OptionU32 extends OptionCodec<typeof U32> {}

export const OptionU32: __type_OptionU32 = createOptionCodec<any>('OptionU32', dynCodec(() => U32)) as any

// OptionUpdated

interface __type_OptionUpdated extends OptionCodec<__type_Updated> {}

export const OptionUpdated: __type_OptionUpdated = createOptionCodec<any>('OptionUpdated', dynCodec(() => Updated)) as any

// Or

interface __type_Or extends StructCodec<{
    left: __type_EvaluatesToBool,
    right: __type_EvaluatesToBool
}> {}

export const Or: __type_Or = createStructCodec<any>('Or', [['left', dynCodec(() => EvaluatesToBool) as any], ['right', dynCodec(() => EvaluatesToBool) as any]]) as any

// Pair

interface __type_Pair extends StructCodec<{
    left_instruction: __type_Instruction,
    right_instruction: __type_Instruction
}> {}

export const Pair: __type_Pair = createStructCodec<any>('Pair', [['left_instruction', dynCodec(() => Instruction) as any], ['right_instruction', dynCodec(() => Instruction) as any]]) as any

// Parameter

interface __type_Parameter extends EnumCodec<
    | ['MaximumFaultyPeersAmount', typeof U32]
    | ['BlockTime', typeof U128]
    | ['CommitTime', typeof U128]
    | ['TransactionReceiptTime', typeof U128]
> {}

export const Parameter: __type_Parameter = createEnumCodec<any>('Parameter', [[0, 'MaximumFaultyPeersAmount', dynCodec(() => U32)], [1, 'BlockTime', dynCodec(() => U128)], [2, 'CommitTime', dynCodec(() => U128)], [3, 'TransactionReceiptTime', dynCodec(() => U128)]]) as any

// Peer

interface __type_Peer extends StructCodec<{
    id: __type_PeerId
}> {}

export const Peer: __type_Peer = createStructCodec<any>('Peer', [['id', dynCodec(() => PeerId) as any]]) as any

// PeerId

interface __type_PeerId extends StructCodec<{
    address: typeof Str,
    public_key: __type_PublicKey
}> {}

export const PeerId: __type_PeerId = createStructCodec<any>('PeerId', [['address', dynCodec(() => Str) as any], ['public_key', dynCodec(() => PublicKey) as any]]) as any

// PermissionToken

interface __type_PermissionToken extends StructCodec<{
    name: __type_Name,
    params: __type_BTreeMapNameValue
}> {}

export const PermissionToken: __type_PermissionToken = createStructCodec<any>('PermissionToken', [['name', dynCodec(() => Name) as any], ['params', dynCodec(() => BTreeMapNameValue) as any]]) as any

// PipelineEvent

interface __type_PipelineEvent extends StructCodec<{
    entity_type: __type_EntityType,
    status: __type_Status,
    hash: __type_Hash
}> {}

export const PipelineEvent: __type_PipelineEvent = createStructCodec<any>('PipelineEvent', [['entity_type', dynCodec(() => EntityType) as any], ['status', dynCodec(() => Status) as any], ['hash', dynCodec(() => Hash) as any]]) as any

// PipelineEventFilter

interface __type_PipelineEventFilter extends StructCodec<{
    entity: __type_OptionEntityType,
    hash: __type_OptionHash
}> {}

export const PipelineEventFilter: __type_PipelineEventFilter = createStructCodec<any>('PipelineEventFilter', [['entity', dynCodec(() => OptionEntityType) as any], ['hash', dynCodec(() => OptionHash) as any]]) as any

// Proof

interface __type_Proof extends StructCodec<{
    payload: __type_ProofPayload,
    signatures: __type_SignaturesOfProof
}> {}

export const Proof: __type_Proof = createStructCodec<any>('Proof', [['payload', dynCodec(() => ProofPayload) as any], ['signatures', dynCodec(() => SignaturesOfProof) as any]]) as any

// ProofChain

interface __type_ProofChain extends StructCodec<{
    proofs: __type_VecProof
}> {}

export const ProofChain: __type_ProofChain = createStructCodec<any>('ProofChain', [['proofs', dynCodec(() => VecProof) as any]]) as any

// ProofPayload

interface __type_ProofPayload extends StructCodec<{
    previous_proof: __type_HashOfProof,
    latest_block: __type_HashOfVersionedCommittedBlock,
    reason: __type_Reason
}> {}

export const ProofPayload: __type_ProofPayload = createStructCodec<any>('ProofPayload', [['previous_proof', dynCodec(() => HashOfProof) as any], ['latest_block', dynCodec(() => HashOfVersionedCommittedBlock) as any], ['reason', dynCodec(() => Reason) as any]]) as any

// PublicKey

interface __type_PublicKey extends StructCodec<{
    digest_function: typeof Str,
    payload: typeof VecU8
}> {}

export const PublicKey: __type_PublicKey = createStructCodec<any>('PublicKey', [['digest_function', dynCodec(() => Str) as any], ['payload', dynCodec(() => VecU8) as any]]) as any

// QueryBox

interface __type_QueryBox extends EnumCodec<
    | ['FindAllAccounts', __type_FindAllAccounts]
    | ['FindAccountById', __type_FindAccountById]
    | ['FindAccountKeyValueByIdAndKey', __type_FindAccountKeyValueByIdAndKey]
    | ['FindAccountsByName', __type_FindAccountsByName]
    | ['FindAccountsByDomainId', __type_FindAccountsByDomainId]
    | ['FindAllAssets', __type_FindAllAssets]
    | ['FindAllAssetsDefinitions', __type_FindAllAssetsDefinitions]
    | ['FindAssetById', __type_FindAssetById]
    | ['FindAssetsByName', __type_FindAssetsByName]
    | ['FindAssetsByAccountId', __type_FindAssetsByAccountId]
    | ['FindAssetsByAssetDefinitionId', __type_FindAssetsByAssetDefinitionId]
    | ['FindAssetsByDomainId', __type_FindAssetsByDomainId]
    | ['FindAssetsByDomainIdAndAssetDefinitionId', __type_FindAssetsByDomainIdAndAssetDefinitionId]
    | ['FindAssetQuantityById', __type_FindAssetQuantityById]
    | ['FindAssetKeyValueByIdAndKey', __type_FindAssetKeyValueByIdAndKey]
    | ['FindAssetDefinitionKeyValueByIdAndKey', __type_FindAssetDefinitionKeyValueByIdAndKey]
    | ['FindAllDomains', __type_FindAllDomains]
    | ['FindDomainById', __type_FindDomainById]
    | ['FindDomainKeyValueByIdAndKey', __type_FindDomainKeyValueByIdAndKey]
    | ['FindAllPeers', __type_FindAllPeers]
    | ['FindTransactionsByAccountId', __type_FindTransactionsByAccountId]
    | ['FindTransactionByHash', __type_FindTransactionByHash]
    | ['FindPermissionTokensByAccountId', __type_FindPermissionTokensByAccountId]
> {}

export const QueryBox: __type_QueryBox = createEnumCodec<any>('QueryBox', [[0, 'FindAllAccounts', dynCodec(() => FindAllAccounts)], [1, 'FindAccountById', dynCodec(() => FindAccountById)], [2, 'FindAccountKeyValueByIdAndKey', dynCodec(() => FindAccountKeyValueByIdAndKey)], [3, 'FindAccountsByName', dynCodec(() => FindAccountsByName)], [4, 'FindAccountsByDomainId', dynCodec(() => FindAccountsByDomainId)], [5, 'FindAllAssets', dynCodec(() => FindAllAssets)], [6, 'FindAllAssetsDefinitions', dynCodec(() => FindAllAssetsDefinitions)], [7, 'FindAssetById', dynCodec(() => FindAssetById)], [8, 'FindAssetsByName', dynCodec(() => FindAssetsByName)], [9, 'FindAssetsByAccountId', dynCodec(() => FindAssetsByAccountId)], [10, 'FindAssetsByAssetDefinitionId', dynCodec(() => FindAssetsByAssetDefinitionId)], [11, 'FindAssetsByDomainId', dynCodec(() => FindAssetsByDomainId)], [12, 'FindAssetsByDomainIdAndAssetDefinitionId', dynCodec(() => FindAssetsByDomainIdAndAssetDefinitionId)], [13, 'FindAssetQuantityById', dynCodec(() => FindAssetQuantityById)], [14, 'FindAssetKeyValueByIdAndKey', dynCodec(() => FindAssetKeyValueByIdAndKey)], [15, 'FindAssetDefinitionKeyValueByIdAndKey', dynCodec(() => FindAssetDefinitionKeyValueByIdAndKey)], [16, 'FindAllDomains', dynCodec(() => FindAllDomains)], [17, 'FindDomainById', dynCodec(() => FindDomainById)], [18, 'FindDomainKeyValueByIdAndKey', dynCodec(() => FindDomainKeyValueByIdAndKey)], [19, 'FindAllPeers', dynCodec(() => FindAllPeers)], [20, 'FindTransactionsByAccountId', dynCodec(() => FindTransactionsByAccountId)], [21, 'FindTransactionByHash', dynCodec(() => FindTransactionByHash)], [22, 'FindPermissionTokensByAccountId', dynCodec(() => FindPermissionTokensByAccountId)]]) as any

// QueryPayload

interface __type_QueryPayload extends StructCodec<{
    timestamp_ms: typeof Compact,
    query: __type_QueryBox,
    account_id: __type_AccountId
}> {}

export const QueryPayload: __type_QueryPayload = createStructCodec<any>('QueryPayload', [['timestamp_ms', dynCodec(() => Compact) as any], ['query', dynCodec(() => QueryBox) as any], ['account_id', dynCodec(() => AccountId) as any]]) as any

// QueryResult

interface __type_QueryResult extends DynCodec<__type_Value> {}

export const QueryResult: __type_QueryResult = dynCodec(() => Value)

// RaiseTo

interface __type_RaiseTo extends StructCodec<{
    left: __type_EvaluatesToU32,
    right: __type_EvaluatesToU32
}> {}

export const RaiseTo: __type_RaiseTo = createStructCodec<any>('RaiseTo', [['left', dynCodec(() => EvaluatesToU32) as any], ['right', dynCodec(() => EvaluatesToU32) as any]]) as any

// RawGenesisBlock

interface __type_RawGenesisBlock extends StructCodec<{
    transactions: __type_VecGenesisTransaction
}> {}

export const RawGenesisBlock: __type_RawGenesisBlock = createStructCodec<any>('RawGenesisBlock', [['transactions', dynCodec(() => VecGenesisTransaction) as any]]) as any

// Reason

interface __type_Reason extends EnumCodec<
    | ['CommitTimeout', __type_CommitTimeout]
    | ['NoTransactionReceiptReceived', __type_NoTransactionReceiptReceived]
    | ['BlockCreationTimeout', __type_BlockCreationTimeout]
> {}

export const Reason: __type_Reason = createEnumCodec<any>('Reason', [[0, 'CommitTimeout', dynCodec(() => CommitTimeout)], [1, 'NoTransactionReceiptReceived', dynCodec(() => NoTransactionReceiptReceived)], [2, 'BlockCreationTimeout', dynCodec(() => BlockCreationTimeout)]]) as any

// RegisterBox

interface __type_RegisterBox extends StructCodec<{
    object: __type_EvaluatesToIdentifiableBox
}> {}

export const RegisterBox: __type_RegisterBox = createStructCodec<any>('RegisterBox', [['object', dynCodec(() => EvaluatesToIdentifiableBox) as any]]) as any

// RejectedTransaction

interface __type_RejectedTransaction extends StructCodec<{
    payload: __type_TransactionPayload,
    signatures: __type_SignaturesOfTransactionPayload,
    rejection_reason: __type_TransactionRejectionReason
}> {}

export const RejectedTransaction: __type_RejectedTransaction = createStructCodec<any>('RejectedTransaction', [['payload', dynCodec(() => TransactionPayload) as any], ['signatures', dynCodec(() => SignaturesOfTransactionPayload) as any], ['rejection_reason', dynCodec(() => TransactionRejectionReason) as any]]) as any

// RejectionReason

interface __type_RejectionReason extends EnumCodec<
    | ['Block', __type_BlockRejectionReason]
    | ['Transaction', __type_TransactionRejectionReason]
> {}

export const RejectionReason: __type_RejectionReason = createEnumCodec<any>('RejectionReason', [[0, 'Block', dynCodec(() => BlockRejectionReason)], [1, 'Transaction', dynCodec(() => TransactionRejectionReason)]]) as any

// RemoveKeyValueBox

interface __type_RemoveKeyValueBox extends StructCodec<{
    object_id: __type_EvaluatesToIdBox,
    key: __type_EvaluatesToName
}> {}

export const RemoveKeyValueBox: __type_RemoveKeyValueBox = createStructCodec<any>('RemoveKeyValueBox', [['object_id', dynCodec(() => EvaluatesToIdBox) as any], ['key', dynCodec(() => EvaluatesToName) as any]]) as any

// Repeats

interface __type_Repeats extends EnumCodec<
    | 'Indefinitely'
    | ['Exactly', typeof U32]
> {}

export const Repeats: __type_Repeats = createEnumCodec<any>('Repeats', [[0, 'Indefinitely'], [1, 'Exactly', dynCodec(() => U32)]]) as any

// RevokeBox

interface __type_RevokeBox extends StructCodec<{
    object: __type_EvaluatesToValue,
    destination_id: __type_EvaluatesToIdBox
}> {}

export const RevokeBox: __type_RevokeBox = createStructCodec<any>('RevokeBox', [['object', dynCodec(() => EvaluatesToValue) as any], ['destination_id', dynCodec(() => EvaluatesToIdBox) as any]]) as any

// SequenceBox

interface __type_SequenceBox extends StructCodec<{
    instructions: __type_VecInstruction
}> {}

export const SequenceBox: __type_SequenceBox = createStructCodec<any>('SequenceBox', [['instructions', dynCodec(() => VecInstruction) as any]]) as any

// SetKeyValueBox

interface __type_SetKeyValueBox extends StructCodec<{
    object_id: __type_EvaluatesToIdBox,
    key: __type_EvaluatesToName,
    value: __type_EvaluatesToValue
}> {}

export const SetKeyValueBox: __type_SetKeyValueBox = createStructCodec<any>('SetKeyValueBox', [['object_id', dynCodec(() => EvaluatesToIdBox) as any], ['key', dynCodec(() => EvaluatesToName) as any], ['value', dynCodec(() => EvaluatesToValue) as any]]) as any

// Signature

interface __type_Signature extends StructCodec<{
    public_key: __type_PublicKey,
    signature: typeof VecU8
}> {}

export const Signature: __type_Signature = createStructCodec<any>('Signature', [['public_key', dynCodec(() => PublicKey) as any], ['signature', dynCodec(() => VecU8) as any]]) as any

// SignatureCheckCondition

interface __type_SignatureCheckCondition extends DynCodec<__type_EvaluatesToBool> {}

export const SignatureCheckCondition: __type_SignatureCheckCondition = dynCodec(() => EvaluatesToBool)

// SignatureOfCommittedBlock

interface __type_SignatureOfCommittedBlock extends DynCodec<__type_Signature> {}

export const SignatureOfCommittedBlock: __type_SignatureOfCommittedBlock = dynCodec(() => Signature)

// SignatureOfProof

interface __type_SignatureOfProof extends DynCodec<__type_Signature> {}

export const SignatureOfProof: __type_SignatureOfProof = dynCodec(() => Signature)

// SignatureOfQueryPayload

interface __type_SignatureOfQueryPayload extends DynCodec<__type_Signature> {}

export const SignatureOfQueryPayload: __type_SignatureOfQueryPayload = dynCodec(() => Signature)

// SignatureOfTransactionPayload

interface __type_SignatureOfTransactionPayload extends DynCodec<__type_Signature> {}

export const SignatureOfTransactionPayload: __type_SignatureOfTransactionPayload = dynCodec(() => Signature)

// SignatureOfValidBlock

interface __type_SignatureOfValidBlock extends DynCodec<__type_Signature> {}

export const SignatureOfValidBlock: __type_SignatureOfValidBlock = dynCodec(() => Signature)

// SignaturesOfCommittedBlock

interface __type_SignaturesOfCommittedBlock extends StructCodec<{
    signatures: __type_BTreeMapPublicKeySignatureOfCommittedBlock
}> {}

export const SignaturesOfCommittedBlock: __type_SignaturesOfCommittedBlock = createStructCodec<any>('SignaturesOfCommittedBlock', [['signatures', dynCodec(() => BTreeMapPublicKeySignatureOfCommittedBlock) as any]]) as any

// SignaturesOfProof

interface __type_SignaturesOfProof extends StructCodec<{
    signatures: __type_BTreeMapPublicKeySignatureOfProof
}> {}

export const SignaturesOfProof: __type_SignaturesOfProof = createStructCodec<any>('SignaturesOfProof', [['signatures', dynCodec(() => BTreeMapPublicKeySignatureOfProof) as any]]) as any

// SignaturesOfTransactionPayload

interface __type_SignaturesOfTransactionPayload extends StructCodec<{
    signatures: __type_BTreeMapPublicKeySignatureOfTransactionPayload
}> {}

export const SignaturesOfTransactionPayload: __type_SignaturesOfTransactionPayload = createStructCodec<any>('SignaturesOfTransactionPayload', [['signatures', dynCodec(() => BTreeMapPublicKeySignatureOfTransactionPayload) as any]]) as any

// SignedQueryRequest

interface __type_SignedQueryRequest extends StructCodec<{
    payload: __type_QueryPayload,
    signature: __type_SignatureOfQueryPayload
}> {}

export const SignedQueryRequest: __type_SignedQueryRequest = createStructCodec<any>('SignedQueryRequest', [['payload', dynCodec(() => QueryPayload) as any], ['signature', dynCodec(() => SignatureOfQueryPayload) as any]]) as any

// Status

interface __type_Status extends EnumCodec<
    | 'Validating'
    | ['Rejected', __type_RejectionReason]
    | 'Committed'
> {}

export const Status: __type_Status = createEnumCodec<any>('Status', [[0, 'Validating'], [1, 'Rejected', dynCodec(() => RejectionReason)], [2, 'Committed']]) as any

// StatusFilter

interface __type_StatusFilter extends EnumCodec<
    | 'Created'
    | ['Updated', __type_OptionUpdated]
    | 'Deleted'
> {}

export const StatusFilter: __type_StatusFilter = createEnumCodec<any>('StatusFilter', [[0, 'Created'], [1, 'Updated', dynCodec(() => OptionUpdated)], [2, 'Deleted']]) as any

// Subtract

interface __type_Subtract extends StructCodec<{
    left: __type_EvaluatesToU32,
    right: __type_EvaluatesToU32
}> {}

export const Subtract: __type_Subtract = createStructCodec<any>('Subtract', [['left', dynCodec(() => EvaluatesToU32) as any], ['right', dynCodec(() => EvaluatesToU32) as any]]) as any

// SubtreeVersionedTransaction

interface __type_SubtreeVersionedTransaction extends StructCodec<{
    left: __type_NodeVersionedTransaction,
    right: __type_NodeVersionedTransaction,
    hash: __type_HashOfNodeVersionedTransaction
}> {}

export const SubtreeVersionedTransaction: __type_SubtreeVersionedTransaction = createStructCodec<any>('SubtreeVersionedTransaction', [['left', dynCodec(() => NodeVersionedTransaction) as any], ['right', dynCodec(() => NodeVersionedTransaction) as any], ['hash', dynCodec(() => HashOfNodeVersionedTransaction) as any]]) as any

// Topology

interface __type_Topology extends StructCodec<{
    sorted_peers: __type_VecPeerId,
    reshuffle_after_n_view_changes: typeof U64,
    at_block: __type_HashOfVersionedCommittedBlock,
    view_change_proofs: __type_ProofChain
}> {}

export const Topology: __type_Topology = createStructCodec<any>('Topology', [['sorted_peers', dynCodec(() => VecPeerId) as any], ['reshuffle_after_n_view_changes', dynCodec(() => U64) as any], ['at_block', dynCodec(() => HashOfVersionedCommittedBlock) as any], ['view_change_proofs', dynCodec(() => ProofChain) as any]]) as any

// Transaction

interface __type_Transaction extends StructCodec<{
    payload: __type_TransactionPayload,
    signatures: __type_BTreeSetSignatureOfTransactionPayload
}> {}

export const Transaction: __type_Transaction = createStructCodec<any>('Transaction', [['payload', dynCodec(() => TransactionPayload) as any], ['signatures', dynCodec(() => BTreeSetSignatureOfTransactionPayload) as any]]) as any

// TransactionLimitError

interface __type_TransactionLimitError extends DynCodec<typeof Str> {}

export const TransactionLimitError: __type_TransactionLimitError = dynCodec(() => Str)

// TransactionPayload

interface __type_TransactionPayload extends StructCodec<{
    account_id: __type_AccountId,
    instructions: __type_Executable,
    creation_time: typeof U64,
    time_to_live_ms: typeof U64,
    nonce: __type_OptionU32,
    metadata: __type_BTreeMapNameValue
}> {}

export const TransactionPayload: __type_TransactionPayload = createStructCodec<any>('TransactionPayload', [['account_id', dynCodec(() => AccountId) as any], ['instructions', dynCodec(() => Executable) as any], ['creation_time', dynCodec(() => U64) as any], ['time_to_live_ms', dynCodec(() => U64) as any], ['nonce', dynCodec(() => OptionU32) as any], ['metadata', dynCodec(() => BTreeMapNameValue) as any]]) as any

// TransactionRejectionReason

interface __type_TransactionRejectionReason extends EnumCodec<
    | ['NotPermitted', __type_NotPermittedFail]
    | ['UnsatisfiedSignatureCondition', __type_UnsatisfiedSignatureConditionFail]
    | ['LimitCheck', __type_TransactionLimitError]
    | ['InstructionExecution', __type_InstructionExecutionFail]
    | ['WasmExecution', __type_WasmExecutionFail]
    | 'UnexpectedGenesisAccountSignature'
> {}

export const TransactionRejectionReason: __type_TransactionRejectionReason = createEnumCodec<any>('TransactionRejectionReason', [[0, 'NotPermitted', dynCodec(() => NotPermittedFail)], [1, 'UnsatisfiedSignatureCondition', dynCodec(() => UnsatisfiedSignatureConditionFail)], [2, 'LimitCheck', dynCodec(() => TransactionLimitError)], [3, 'InstructionExecution', dynCodec(() => InstructionExecutionFail)], [4, 'WasmExecution', dynCodec(() => WasmExecutionFail)], [5, 'UnexpectedGenesisAccountSignature']]) as any

// TransactionValue

interface __type_TransactionValue extends EnumCodec<
    | ['Transaction', __type_VersionedTransaction]
    | ['RejectedTransaction', __type_VersionedRejectedTransaction]
> {}

export const TransactionValue: __type_TransactionValue = createEnumCodec<any>('TransactionValue', [[0, 'Transaction', dynCodec(() => VersionedTransaction)], [1, 'RejectedTransaction', dynCodec(() => VersionedRejectedTransaction)]]) as any

// TransferBox

interface __type_TransferBox extends StructCodec<{
    source_id: __type_EvaluatesToIdBox,
    object: __type_EvaluatesToValue,
    destination_id: __type_EvaluatesToIdBox
}> {}

export const TransferBox: __type_TransferBox = createStructCodec<any>('TransferBox', [['source_id', dynCodec(() => EvaluatesToIdBox) as any], ['object', dynCodec(() => EvaluatesToValue) as any], ['destination_id', dynCodec(() => EvaluatesToIdBox) as any]]) as any

// Trigger

interface __type_Trigger extends StructCodec<{
    id: __type_Id,
    action: __type_Action,
    metadata: __type_Metadata
}> {}

export const Trigger: __type_Trigger = createStructCodec<any>('Trigger', [['id', dynCodec(() => Id) as any], ['action', dynCodec(() => Action) as any], ['metadata', dynCodec(() => Metadata) as any]]) as any

// TriggerUpdated

interface __type_TriggerUpdated extends EnumCodec<
    | 'Extended'
    | 'Shortened'
> {}

export const TriggerUpdated: __type_TriggerUpdated = createEnumCodec<any>('TriggerUpdated', [[0, 'Extended'], [1, 'Shortened']]) as any

// UnregisterBox

interface __type_UnregisterBox extends StructCodec<{
    object_id: __type_EvaluatesToIdBox
}> {}

export const UnregisterBox: __type_UnregisterBox = createStructCodec<any>('UnregisterBox', [['object_id', dynCodec(() => EvaluatesToIdBox) as any]]) as any

// UnsatisfiedSignatureConditionFail

interface __type_UnsatisfiedSignatureConditionFail extends StructCodec<{
    reason: typeof Str
}> {}

export const UnsatisfiedSignatureConditionFail: __type_UnsatisfiedSignatureConditionFail = createStructCodec<any>('UnsatisfiedSignatureConditionFail', [['reason', dynCodec(() => Str) as any]]) as any

// Updated

interface __type_Updated extends EnumCodec<
    | ['Metadata', __type_MetadataUpdated]
    | 'Authentication'
    | 'Permission'
    | ['Asset', __type_AssetUpdated]
    | ['Trigger', __type_TriggerUpdated]
> {}

export const Updated: __type_Updated = createEnumCodec<any>('Updated', [[0, 'Metadata', dynCodec(() => MetadataUpdated)], [1, 'Authentication'], [2, 'Permission'], [3, 'Asset', dynCodec(() => AssetUpdated)], [4, 'Trigger', dynCodec(() => TriggerUpdated)]]) as any

// ValidBlock

interface __type_ValidBlock extends StructCodec<{
    header: __type_BlockHeader,
    rejected_transactions: __type_VecVersionedRejectedTransaction,
    transactions: __type_VecVersionedValidTransaction,
    signatures: __type_BTreeSetSignatureOfValidBlock,
    trigger_recommendations: __type_VecAction
}> {}

export const ValidBlock: __type_ValidBlock = createStructCodec<any>('ValidBlock', [['header', dynCodec(() => BlockHeader) as any], ['rejected_transactions', dynCodec(() => VecVersionedRejectedTransaction) as any], ['transactions', dynCodec(() => VecVersionedValidTransaction) as any], ['signatures', dynCodec(() => BTreeSetSignatureOfValidBlock) as any], ['trigger_recommendations', dynCodec(() => VecAction) as any]]) as any

// ValidTransaction

interface __type_ValidTransaction extends StructCodec<{
    payload: __type_TransactionPayload,
    signatures: __type_SignaturesOfTransactionPayload
}> {}

export const ValidTransaction: __type_ValidTransaction = createStructCodec<any>('ValidTransaction', [['payload', dynCodec(() => TransactionPayload) as any], ['signatures', dynCodec(() => SignaturesOfTransactionPayload) as any]]) as any

// Value

interface __type_Value extends EnumCodec<
    | ['U32', typeof U32]
    | ['U128', typeof U128]
    | ['Bool', typeof Bool]
    | ['String', typeof Str]
    | ['Name', __type_Name]
    | ['Fixed', __type_Fixed]
    | ['Vec', __type_VecValue]
    | ['LimitedMetadata', __type_Metadata]
    | ['Id', __type_IdBox]
    | ['Identifiable', __type_IdentifiableBox]
    | ['PublicKey', __type_PublicKey]
    | ['Parameter', __type_Parameter]
    | ['SignatureCheckCondition', __type_SignatureCheckCondition]
    | ['TransactionValue', __type_TransactionValue]
    | ['PermissionToken', __type_PermissionToken]
    | ['Hash', __type_Hash]
> {}

export const Value: __type_Value = createEnumCodec<any>('Value', [[0, 'U32', dynCodec(() => U32)], [1, 'U128', dynCodec(() => U128)], [2, 'Bool', dynCodec(() => Bool)], [3, 'String', dynCodec(() => Str)], [4, 'Name', dynCodec(() => Name)], [5, 'Fixed', dynCodec(() => Fixed)], [6, 'Vec', dynCodec(() => VecValue)], [7, 'LimitedMetadata', dynCodec(() => Metadata)], [8, 'Id', dynCodec(() => IdBox)], [9, 'Identifiable', dynCodec(() => IdentifiableBox)], [10, 'PublicKey', dynCodec(() => PublicKey)], [11, 'Parameter', dynCodec(() => Parameter)], [12, 'SignatureCheckCondition', dynCodec(() => SignatureCheckCondition)], [13, 'TransactionValue', dynCodec(() => TransactionValue)], [14, 'PermissionToken', dynCodec(() => PermissionToken)], [15, 'Hash', dynCodec(() => Hash)]]) as any

// VecAction

interface __type_VecAction extends VecCodec<__type_Action> {}

export const VecAction: __type_VecAction = createVecCodec<any>('VecAction', dynCodec(() => Action)) as any

// VecGenesisTransaction

interface __type_VecGenesisTransaction extends VecCodec<__type_GenesisTransaction> {}

export const VecGenesisTransaction: __type_VecGenesisTransaction = createVecCodec<any>('VecGenesisTransaction', dynCodec(() => GenesisTransaction)) as any

// VecHashOfVersionedValidBlock

interface __type_VecHashOfVersionedValidBlock extends VecCodec<__type_HashOfVersionedValidBlock> {}

export const VecHashOfVersionedValidBlock: __type_VecHashOfVersionedValidBlock = createVecCodec<any>('VecHashOfVersionedValidBlock', dynCodec(() => HashOfVersionedValidBlock)) as any

// VecInstruction

interface __type_VecInstruction extends VecCodec<__type_Instruction> {}

export const VecInstruction: __type_VecInstruction = createVecCodec<any>('VecInstruction', dynCodec(() => Instruction)) as any

// VecPeerId

interface __type_VecPeerId extends VecCodec<__type_PeerId> {}

export const VecPeerId: __type_VecPeerId = createVecCodec<any>('VecPeerId', dynCodec(() => PeerId)) as any

// VecPermissionToken

interface __type_VecPermissionToken extends VecCodec<__type_PermissionToken> {}

export const VecPermissionToken: __type_VecPermissionToken = createVecCodec<any>('VecPermissionToken', dynCodec(() => PermissionToken)) as any

// VecProof

interface __type_VecProof extends VecCodec<__type_Proof> {}

export const VecProof: __type_VecProof = createVecCodec<any>('VecProof', dynCodec(() => Proof)) as any

// VecPublicKey

interface __type_VecPublicKey extends VecCodec<__type_PublicKey> {}

export const VecPublicKey: __type_VecPublicKey = createVecCodec<any>('VecPublicKey', dynCodec(() => PublicKey)) as any

// VecSignatureOfTransactionPayload

interface __type_VecSignatureOfTransactionPayload extends VecCodec<__type_SignatureOfTransactionPayload> {}

export const VecSignatureOfTransactionPayload: __type_VecSignatureOfTransactionPayload = createVecCodec<any>('VecSignatureOfTransactionPayload', dynCodec(() => SignatureOfTransactionPayload)) as any

// VecSignatureOfValidBlock

interface __type_VecSignatureOfValidBlock extends VecCodec<__type_SignatureOfValidBlock> {}

export const VecSignatureOfValidBlock: __type_VecSignatureOfValidBlock = createVecCodec<any>('VecSignatureOfValidBlock', dynCodec(() => SignatureOfValidBlock)) as any

// VecValue

interface __type_VecValue extends VecCodec<__type_Value> {}

export const VecValue: __type_VecValue = createVecCodec<any>('VecValue', dynCodec(() => Value)) as any

// VecVersionedRejectedTransaction

interface __type_VecVersionedRejectedTransaction extends VecCodec<__type_VersionedRejectedTransaction> {}

export const VecVersionedRejectedTransaction: __type_VecVersionedRejectedTransaction = createVecCodec<any>('VecVersionedRejectedTransaction', dynCodec(() => VersionedRejectedTransaction)) as any

// VecVersionedValidTransaction

interface __type_VecVersionedValidTransaction extends VecCodec<__type_VersionedValidTransaction> {}

export const VecVersionedValidTransaction: __type_VecVersionedValidTransaction = createVecCodec<any>('VecVersionedValidTransaction', dynCodec(() => VersionedValidTransaction)) as any

// VersionedBlockPublisherMessage

interface __type_VersionedBlockPublisherMessage extends EnumCodec<
    | ['V1', __type_BlockPublisherMessage]
> {}

export const VersionedBlockPublisherMessage: __type_VersionedBlockPublisherMessage = createEnumCodec<any>('VersionedBlockPublisherMessage', [[1, 'V1', dynCodec(() => BlockPublisherMessage)]]) as any

// VersionedBlockSubscriberMessage

interface __type_VersionedBlockSubscriberMessage extends EnumCodec<
    | ['V1', __type_BlockSubscriberMessage]
> {}

export const VersionedBlockSubscriberMessage: __type_VersionedBlockSubscriberMessage = createEnumCodec<any>('VersionedBlockSubscriberMessage', [[1, 'V1', dynCodec(() => BlockSubscriberMessage)]]) as any

// VersionedCommittedBlock

interface __type_VersionedCommittedBlock extends EnumCodec<
    | ['V1', __type_CommittedBlock]
> {}

export const VersionedCommittedBlock: __type_VersionedCommittedBlock = createEnumCodec<any>('VersionedCommittedBlock', [[1, 'V1', dynCodec(() => CommittedBlock)]]) as any

// VersionedEventPublisherMessage

interface __type_VersionedEventPublisherMessage extends EnumCodec<
    | ['V1', __type_EventPublisherMessage]
> {}

export const VersionedEventPublisherMessage: __type_VersionedEventPublisherMessage = createEnumCodec<any>('VersionedEventPublisherMessage', [[1, 'V1', dynCodec(() => EventPublisherMessage)]]) as any

// VersionedEventSubscriberMessage

interface __type_VersionedEventSubscriberMessage extends EnumCodec<
    | ['V1', __type_EventSubscriberMessage]
> {}

export const VersionedEventSubscriberMessage: __type_VersionedEventSubscriberMessage = createEnumCodec<any>('VersionedEventSubscriberMessage', [[1, 'V1', dynCodec(() => EventSubscriberMessage)]]) as any

// VersionedQueryResult

interface __type_VersionedQueryResult extends EnumCodec<
    | ['V1', __type_QueryResult]
> {}

export const VersionedQueryResult: __type_VersionedQueryResult = createEnumCodec<any>('VersionedQueryResult', [[1, 'V1', dynCodec(() => QueryResult)]]) as any

// VersionedRejectedTransaction

interface __type_VersionedRejectedTransaction extends EnumCodec<
    | ['V1', __type_RejectedTransaction]
> {}

export const VersionedRejectedTransaction: __type_VersionedRejectedTransaction = createEnumCodec<any>('VersionedRejectedTransaction', [[1, 'V1', dynCodec(() => RejectedTransaction)]]) as any

// VersionedSignedQueryRequest

interface __type_VersionedSignedQueryRequest extends EnumCodec<
    | ['V1', __type_SignedQueryRequest]
> {}

export const VersionedSignedQueryRequest: __type_VersionedSignedQueryRequest = createEnumCodec<any>('VersionedSignedQueryRequest', [[1, 'V1', dynCodec(() => SignedQueryRequest)]]) as any

// VersionedTransaction

interface __type_VersionedTransaction extends EnumCodec<
    | ['V1', __type_Transaction]
> {}

export const VersionedTransaction: __type_VersionedTransaction = createEnumCodec<any>('VersionedTransaction', [[1, 'V1', dynCodec(() => Transaction)]]) as any

// VersionedValidBlock

interface __type_VersionedValidBlock extends EnumCodec<
    | ['V1', __type_ValidBlock]
> {}

export const VersionedValidBlock: __type_VersionedValidBlock = createEnumCodec<any>('VersionedValidBlock', [[1, 'V1', dynCodec(() => ValidBlock)]]) as any

// VersionedValidTransaction

interface __type_VersionedValidTransaction extends EnumCodec<
    | ['V1', __type_ValidTransaction]
> {}

export const VersionedValidTransaction: __type_VersionedValidTransaction = createEnumCodec<any>('VersionedValidTransaction', [[1, 'V1', dynCodec(() => ValidTransaction)]]) as any

// WasmExecutionFail

interface __type_WasmExecutionFail extends StructCodec<{
    reason: typeof Str
}> {}

export const WasmExecutionFail: __type_WasmExecutionFail = createStructCodec<any>('WasmExecutionFail', [['reason', dynCodec(() => Str) as any]]) as any

// WasmSmartContract

interface __type_WasmSmartContract extends StructCodec<{
    raw_data: typeof VecU8
}> {}

export const WasmSmartContract: __type_WasmSmartContract = createStructCodec<any>('WasmSmartContract', [['raw_data', dynCodec(() => VecU8) as any]]) as any

// Where

interface __type_Where extends StructCodec<{
    expression: __type_EvaluatesToValue,
    values: __type_BTreeMapStringEvaluatesToValue
}> {}

export const Where: __type_Where = createStructCodec<any>('Where', [['expression', dynCodec(() => EvaluatesToValue) as any], ['values', dynCodec(() => BTreeMapStringEvaluatesToValue) as any]]) as any
