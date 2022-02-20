import { Bool, BytesVec, Compact, Enum, FragmentFromBuilder, Option, ScaleArrayBuilder, ScaleEnumBuilder, ScaleMapBuilder, ScaleStructBuilder, Str, U128, U32, U64, Valuable, createBytesArrayBuilder, createEnumBuilder, createMapBuilder, createOptionBuilder, createStructBuilder, createVecBuilder, dynGetters } from '@scale-codec/definition-runtime'

export const Account: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof AccountId>,
    assets: FragmentFromBuilder<typeof BTreeMapAssetIdAsset>,
    signatories: FragmentFromBuilder<typeof VecPublicKey>,
    permission_tokens: FragmentFromBuilder<typeof BTreeSetPermissionToken>,
    signature_check_condition: FragmentFromBuilder<typeof SignatureCheckCondition>,
    metadata: FragmentFromBuilder<typeof Metadata>
}> = createStructBuilder('Account', [['id', dynGetters(() => AccountId)], ['assets', dynGetters(() => BTreeMapAssetIdAsset)], ['signatories', dynGetters(() => VecPublicKey)], ['permission_tokens', dynGetters(() => BTreeSetPermissionToken)], ['signature_check_condition', dynGetters(() => SignatureCheckCondition)], ['metadata', dynGetters(() => Metadata)]])

export const AccountId: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Name>,
    domain_id: FragmentFromBuilder<typeof Id>
}> = createStructBuilder('AccountId', [['name', dynGetters(() => Name)], ['domain_id', dynGetters(() => Id)]])

export const Add: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Add', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const And: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToBool>,
    right: FragmentFromBuilder<typeof EvaluatesToBool>
}> = createStructBuilder('And', [['left', dynGetters(() => EvaluatesToBool)], ['right', dynGetters(() => EvaluatesToBool)]])

export const ArrayU8L32 = createBytesArrayBuilder('ArrayU8L32', 32)

export const Asset: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof AssetId>,
    value: FragmentFromBuilder<typeof AssetValue>
}> = createStructBuilder('Asset', [['id', dynGetters(() => AssetId)], ['value', dynGetters(() => AssetValue)]])

export const AssetDefinition: ScaleStructBuilder<{
    value_type: FragmentFromBuilder<typeof AssetValueType>,
    id: FragmentFromBuilder<typeof DefinitionId>,
    metadata: FragmentFromBuilder<typeof Metadata>,
    mintable: FragmentFromBuilder<typeof Bool>
}> = createStructBuilder('AssetDefinition', [['value_type', dynGetters(() => AssetValueType)], ['id', dynGetters(() => DefinitionId)], ['metadata', dynGetters(() => Metadata)], ['mintable', dynGetters(() => Bool)]])

export const AssetDefinitionEntry: ScaleStructBuilder<{
    definition: FragmentFromBuilder<typeof AssetDefinition>,
    registered_by: FragmentFromBuilder<typeof AccountId>
}> = createStructBuilder('AssetDefinitionEntry', [['definition', dynGetters(() => AssetDefinition)], ['registered_by', dynGetters(() => AccountId)]])

export const AssetId: ScaleStructBuilder<{
    definition_id: FragmentFromBuilder<typeof DefinitionId>,
    account_id: FragmentFromBuilder<typeof AccountId>
}> = createStructBuilder('AssetId', [['definition_id', dynGetters(() => DefinitionId)], ['account_id', dynGetters(() => AccountId)]])

export const AssetUpdated: ScaleEnumBuilder<Enum<{
    Received: null,
    Sent: null
}>> = createEnumBuilder('AssetUpdated', [[0, 'Received'], [1, 'Sent']])

export const AssetValue: ScaleEnumBuilder<Enum<{
    Quantity: Valuable<FragmentFromBuilder<typeof U32>>,
    BigQuantity: Valuable<FragmentFromBuilder<typeof U128>>,
    Fixed: Valuable<FragmentFromBuilder<typeof Fixed>>,
    Store: Valuable<FragmentFromBuilder<typeof Metadata>>
}>> = createEnumBuilder('AssetValue', [[0, 'Quantity', dynGetters(() => U32)], [1, 'BigQuantity', dynGetters(() => U128)], [2, 'Fixed', dynGetters(() => Fixed)], [3, 'Store', dynGetters(() => Metadata)]])

export const AssetValueType: ScaleEnumBuilder<Enum<{
    Quantity: null,
    BigQuantity: null,
    Fixed: null,
    Store: null
}>> = createEnumBuilder('AssetValueType', [[0, 'Quantity'], [1, 'BigQuantity'], [2, 'Fixed'], [3, 'Store']])

import { Void as BlockCreationTimeout } from '@scale-codec/definition-runtime'
export { BlockCreationTimeout }

export const BlockHeader: ScaleStructBuilder<{
    timestamp: FragmentFromBuilder<typeof U128>,
    height: FragmentFromBuilder<typeof U64>,
    previous_block_hash: FragmentFromBuilder<typeof HashOfVersionedCommittedBlock>,
    transactions_hash: FragmentFromBuilder<typeof HashOfMerkleTreeVersionedTransaction>,
    rejected_transactions_hash: FragmentFromBuilder<typeof HashOfMerkleTreeVersionedTransaction>,
    view_change_proofs: FragmentFromBuilder<typeof ProofChain>,
    invalidated_blocks_hashes: FragmentFromBuilder<typeof VecHashOfVersionedValidBlock>,
    genesis_topology: FragmentFromBuilder<typeof OptionTopology>
}> = createStructBuilder('BlockHeader', [['timestamp', dynGetters(() => U128)], ['height', dynGetters(() => U64)], ['previous_block_hash', dynGetters(() => HashOfVersionedCommittedBlock)], ['transactions_hash', dynGetters(() => HashOfMerkleTreeVersionedTransaction)], ['rejected_transactions_hash', dynGetters(() => HashOfMerkleTreeVersionedTransaction)], ['view_change_proofs', dynGetters(() => ProofChain)], ['invalidated_blocks_hashes', dynGetters(() => VecHashOfVersionedValidBlock)], ['genesis_topology', dynGetters(() => OptionTopology)]])

export const BlockPublisherMessage: ScaleEnumBuilder<Enum<{
    SubscriptionAccepted: null,
    Block: Valuable<FragmentFromBuilder<typeof VersionedCommittedBlock>>
}>> = createEnumBuilder('BlockPublisherMessage', [[0, 'SubscriptionAccepted'], [1, 'Block', dynGetters(() => VersionedCommittedBlock)]])

export const BlockRejectionReason: ScaleEnumBuilder<Enum<{
    ConsensusBlockRejection: null
}>> = createEnumBuilder('BlockRejectionReason', [[0, 'ConsensusBlockRejection']])

export const BlockSubscriberMessage: ScaleEnumBuilder<Enum<{
    SubscriptionRequest: Valuable<FragmentFromBuilder<typeof U64>>,
    BlockReceived: null
}>> = createEnumBuilder('BlockSubscriberMessage', [[0, 'SubscriptionRequest', dynGetters(() => U64)], [1, 'BlockReceived']])

export const BTreeMapAccountIdAccount: ScaleMapBuilder<Map<FragmentFromBuilder<typeof AccountId>, FragmentFromBuilder<typeof Account>>> = createMapBuilder('BTreeMapAccountIdAccount', dynGetters(() => AccountId), dynGetters(() => Account))

export const BTreeMapAssetIdAsset: ScaleMapBuilder<Map<FragmentFromBuilder<typeof AssetId>, FragmentFromBuilder<typeof Asset>>> = createMapBuilder('BTreeMapAssetIdAsset', dynGetters(() => AssetId), dynGetters(() => Asset))

export const BTreeMapDefinitionIdAssetDefinitionEntry: ScaleMapBuilder<Map<FragmentFromBuilder<typeof DefinitionId>, FragmentFromBuilder<typeof AssetDefinitionEntry>>> = createMapBuilder('BTreeMapDefinitionIdAssetDefinitionEntry', dynGetters(() => DefinitionId), dynGetters(() => AssetDefinitionEntry))

export const BTreeMapNameValue: ScaleMapBuilder<Map<FragmentFromBuilder<typeof Name>, FragmentFromBuilder<typeof Value>>> = createMapBuilder('BTreeMapNameValue', dynGetters(() => Name), dynGetters(() => Value))

export const BTreeMapPublicKeySignatureOfCommittedBlock: ScaleMapBuilder<Map<FragmentFromBuilder<typeof PublicKey>, FragmentFromBuilder<typeof SignatureOfCommittedBlock>>> = createMapBuilder('BTreeMapPublicKeySignatureOfCommittedBlock', dynGetters(() => PublicKey), dynGetters(() => SignatureOfCommittedBlock))

export const BTreeMapPublicKeySignatureOfProof: ScaleMapBuilder<Map<FragmentFromBuilder<typeof PublicKey>, FragmentFromBuilder<typeof SignatureOfProof>>> = createMapBuilder('BTreeMapPublicKeySignatureOfProof', dynGetters(() => PublicKey), dynGetters(() => SignatureOfProof))

export const BTreeMapPublicKeySignatureOfTransactionPayload: ScaleMapBuilder<Map<FragmentFromBuilder<typeof PublicKey>, FragmentFromBuilder<typeof SignatureOfTransactionPayload>>> = createMapBuilder('BTreeMapPublicKeySignatureOfTransactionPayload', dynGetters(() => PublicKey), dynGetters(() => SignatureOfTransactionPayload))

export const BTreeMapStringEvaluatesToValue: ScaleMapBuilder<Map<FragmentFromBuilder<typeof Str>, FragmentFromBuilder<typeof EvaluatesToValue>>> = createMapBuilder('BTreeMapStringEvaluatesToValue', dynGetters(() => Str), dynGetters(() => EvaluatesToValue))

export const BTreeSetPermissionToken: ScaleArrayBuilder<FragmentFromBuilder<typeof PermissionToken>[]> = createVecBuilder('BTreeSetPermissionToken', dynGetters(() => PermissionToken))

export const BTreeSetSignatureOfTransactionPayload: ScaleArrayBuilder<FragmentFromBuilder<typeof SignatureOfTransactionPayload>[]> = createVecBuilder('BTreeSetSignatureOfTransactionPayload', dynGetters(() => SignatureOfTransactionPayload))

export const BTreeSetSignatureOfValidBlock: ScaleArrayBuilder<FragmentFromBuilder<typeof SignatureOfValidBlock>[]> = createVecBuilder('BTreeSetSignatureOfValidBlock', dynGetters(() => SignatureOfValidBlock))

export const BurnBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('BurnBox', [['object', dynGetters(() => EvaluatesToValue)], ['destination_id', dynGetters(() => EvaluatesToIdBox)]])

export const CommittedBlock: ScaleStructBuilder<{
    header: FragmentFromBuilder<typeof BlockHeader>,
    rejected_transactions: FragmentFromBuilder<typeof VecVersionedRejectedTransaction>,
    transactions: FragmentFromBuilder<typeof VecVersionedValidTransaction>,
    signatures: FragmentFromBuilder<typeof SignaturesOfCommittedBlock>
}> = createStructBuilder('CommittedBlock', [['header', dynGetters(() => BlockHeader)], ['rejected_transactions', dynGetters(() => VecVersionedRejectedTransaction)], ['transactions', dynGetters(() => VecVersionedValidTransaction)], ['signatures', dynGetters(() => SignaturesOfCommittedBlock)]])

export const CommitTimeout: ScaleStructBuilder<{
    hash: FragmentFromBuilder<typeof HashOfVersionedValidBlock>
}> = createStructBuilder('CommitTimeout', [['hash', dynGetters(() => HashOfVersionedValidBlock)]])

export const Contains: ScaleStructBuilder<{
    collection: FragmentFromBuilder<typeof EvaluatesToVecValue>,
    element: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('Contains', [['collection', dynGetters(() => EvaluatesToVecValue)], ['element', dynGetters(() => EvaluatesToValue)]])

export const ContainsAll: ScaleStructBuilder<{
    collection: FragmentFromBuilder<typeof EvaluatesToVecValue>,
    elements: FragmentFromBuilder<typeof EvaluatesToVecValue>
}> = createStructBuilder('ContainsAll', [['collection', dynGetters(() => EvaluatesToVecValue)], ['elements', dynGetters(() => EvaluatesToVecValue)]])

export const ContainsAny: ScaleStructBuilder<{
    collection: FragmentFromBuilder<typeof EvaluatesToVecValue>,
    elements: FragmentFromBuilder<typeof EvaluatesToVecValue>
}> = createStructBuilder('ContainsAny', [['collection', dynGetters(() => EvaluatesToVecValue)], ['elements', dynGetters(() => EvaluatesToVecValue)]])

export const ContextValue: ScaleStructBuilder<{
    value_name: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('ContextValue', [['value_name', dynGetters(() => Str)]])

export const DataEvent: ScaleStructBuilder<{
    entity: FragmentFromBuilder<typeof Entity>,
    status: FragmentFromBuilder<typeof Status>
}> = createStructBuilder('DataEvent', [['entity', dynGetters(() => Entity)], ['status', dynGetters(() => Status)]])

export const DataEventFilter: ScaleStructBuilder<{
    entity: FragmentFromBuilder<typeof OptionEntityFilter>,
    status: FragmentFromBuilder<typeof OptionStatusFilter>
}> = createStructBuilder('DataEventFilter', [['entity', dynGetters(() => OptionEntityFilter)], ['status', dynGetters(() => OptionStatusFilter)]])

export const DefinitionId: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Name>,
    domain_id: FragmentFromBuilder<typeof Id>
}> = createStructBuilder('DefinitionId', [['name', dynGetters(() => Name)], ['domain_id', dynGetters(() => Id)]])

export const Divide: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Divide', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const Domain: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof Id>,
    accounts: FragmentFromBuilder<typeof BTreeMapAccountIdAccount>,
    asset_definitions: FragmentFromBuilder<typeof BTreeMapDefinitionIdAssetDefinitionEntry>,
    metadata: FragmentFromBuilder<typeof Metadata>,
    logo: FragmentFromBuilder<typeof OptionIpfsPath>
}> = createStructBuilder('Domain', [['id', dynGetters(() => Id)], ['accounts', dynGetters(() => BTreeMapAccountIdAccount)], ['asset_definitions', dynGetters(() => BTreeMapDefinitionIdAssetDefinitionEntry)], ['metadata', dynGetters(() => Metadata)], ['logo', dynGetters(() => OptionIpfsPath)]])

export const Entity: ScaleEnumBuilder<Enum<{
    Account: Valuable<FragmentFromBuilder<typeof AccountId>>,
    AssetDefinition: Valuable<FragmentFromBuilder<typeof DefinitionId>>,
    Asset: Valuable<FragmentFromBuilder<typeof AssetId>>,
    Domain: Valuable<FragmentFromBuilder<typeof Id>>,
    Peer: Valuable<FragmentFromBuilder<typeof PeerId>>
}>> = createEnumBuilder('Entity', [[0, 'Account', dynGetters(() => AccountId)], [1, 'AssetDefinition', dynGetters(() => DefinitionId)], [2, 'Asset', dynGetters(() => AssetId)], [3, 'Domain', dynGetters(() => Id)], [4, 'Peer', dynGetters(() => PeerId)]])

export const EntityFilter: ScaleEnumBuilder<Enum<{
    Account: Valuable<FragmentFromBuilder<typeof OptionAccountId>>,
    AssetDefinition: Valuable<FragmentFromBuilder<typeof OptionDefinitionId>>,
    Asset: Valuable<FragmentFromBuilder<typeof OptionAssetId>>,
    Domain: Valuable<FragmentFromBuilder<typeof OptionId>>,
    Peer: Valuable<FragmentFromBuilder<typeof OptionPeerId>>
}>> = createEnumBuilder('EntityFilter', [[0, 'Account', dynGetters(() => OptionAccountId)], [1, 'AssetDefinition', dynGetters(() => OptionDefinitionId)], [2, 'Asset', dynGetters(() => OptionAssetId)], [3, 'Domain', dynGetters(() => OptionId)], [4, 'Peer', dynGetters(() => OptionPeerId)]])

export const EntityType: ScaleEnumBuilder<Enum<{
    Block: null,
    Transaction: null
}>> = createEnumBuilder('EntityType', [[0, 'Block'], [1, 'Transaction']])

export const Equal: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToValue>,
    right: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('Equal', [['left', dynGetters(() => EvaluatesToValue)], ['right', dynGetters(() => EvaluatesToValue)]])

export const EvaluatesToAccountId: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToAccountId', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToAssetId: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToAssetId', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToBool: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToBool', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToDefinitionId: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToDefinitionId', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToHash: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToHash', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToId: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToId', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToIdBox: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToIdBox', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToIdentifiableBox: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToIdentifiableBox', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToName: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToName', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToU32: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToU32', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToValue: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToValue', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToVecValue: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToVecValue', [['expression', dynGetters(() => Expression)]])

export const Event: ScaleEnumBuilder<Enum<{
    Pipeline: Valuable<FragmentFromBuilder<typeof PipelineEvent>>,
    Data: Valuable<FragmentFromBuilder<typeof DataEvent>>
}>> = createEnumBuilder('Event', [[0, 'Pipeline', dynGetters(() => PipelineEvent)], [1, 'Data', dynGetters(() => DataEvent)]])

export const EventFilter: ScaleEnumBuilder<Enum<{
    Pipeline: Valuable<FragmentFromBuilder<typeof PipelineEventFilter>>,
    Data: Valuable<FragmentFromBuilder<typeof DataEventFilter>>
}>> = createEnumBuilder('EventFilter', [[0, 'Pipeline', dynGetters(() => PipelineEventFilter)], [1, 'Data', dynGetters(() => DataEventFilter)]])

export const EventPublisherMessage: ScaleEnumBuilder<Enum<{
    SubscriptionAccepted: null,
    Event: Valuable<FragmentFromBuilder<typeof Event>>
}>> = createEnumBuilder('EventPublisherMessage', [[0, 'SubscriptionAccepted'], [1, 'Event', dynGetters(() => Event)]])

export const EventSubscriberMessage: ScaleEnumBuilder<Enum<{
    SubscriptionRequest: Valuable<FragmentFromBuilder<typeof EventFilter>>,
    EventReceived: null
}>> = createEnumBuilder('EventSubscriberMessage', [[0, 'SubscriptionRequest', dynGetters(() => EventFilter)], [1, 'EventReceived']])

export const Executable: ScaleEnumBuilder<Enum<{
    Instructions: Valuable<FragmentFromBuilder<typeof VecInstruction>>,
    Wasm: Valuable<FragmentFromBuilder<typeof WasmSmartContract>>
}>> = createEnumBuilder('Executable', [[0, 'Instructions', dynGetters(() => VecInstruction)], [1, 'Wasm', dynGetters(() => WasmSmartContract)]])

export const Expression: ScaleEnumBuilder<Enum<{
    Add: Valuable<FragmentFromBuilder<typeof Add>>,
    Subtract: Valuable<FragmentFromBuilder<typeof Subtract>>,
    Multiply: Valuable<FragmentFromBuilder<typeof Multiply>>,
    Divide: Valuable<FragmentFromBuilder<typeof Divide>>,
    Mod: Valuable<FragmentFromBuilder<typeof Mod>>,
    RaiseTo: Valuable<FragmentFromBuilder<typeof RaiseTo>>,
    Greater: Valuable<FragmentFromBuilder<typeof Greater>>,
    Less: Valuable<FragmentFromBuilder<typeof Less>>,
    Equal: Valuable<FragmentFromBuilder<typeof Equal>>,
    Not: Valuable<FragmentFromBuilder<typeof Not>>,
    And: Valuable<FragmentFromBuilder<typeof And>>,
    Or: Valuable<FragmentFromBuilder<typeof Or>>,
    If: Valuable<FragmentFromBuilder<typeof ExpressionIf>>,
    Raw: Valuable<FragmentFromBuilder<typeof Value>>,
    Query: Valuable<FragmentFromBuilder<typeof QueryBox>>,
    Contains: Valuable<FragmentFromBuilder<typeof Contains>>,
    ContainsAll: Valuable<FragmentFromBuilder<typeof ContainsAll>>,
    ContainsAny: Valuable<FragmentFromBuilder<typeof ContainsAny>>,
    Where: Valuable<FragmentFromBuilder<typeof Where>>,
    ContextValue: Valuable<FragmentFromBuilder<typeof ContextValue>>
}>> = createEnumBuilder('Expression', [[0, 'Add', dynGetters(() => Add)], [1, 'Subtract', dynGetters(() => Subtract)], [2, 'Multiply', dynGetters(() => Multiply)], [3, 'Divide', dynGetters(() => Divide)], [4, 'Mod', dynGetters(() => Mod)], [5, 'RaiseTo', dynGetters(() => RaiseTo)], [6, 'Greater', dynGetters(() => Greater)], [7, 'Less', dynGetters(() => Less)], [8, 'Equal', dynGetters(() => Equal)], [9, 'Not', dynGetters(() => Not)], [10, 'And', dynGetters(() => And)], [11, 'Or', dynGetters(() => Or)], [12, 'If', dynGetters(() => ExpressionIf)], [13, 'Raw', dynGetters(() => Value)], [14, 'Query', dynGetters(() => QueryBox)], [15, 'Contains', dynGetters(() => Contains)], [16, 'ContainsAll', dynGetters(() => ContainsAll)], [17, 'ContainsAny', dynGetters(() => ContainsAny)], [18, 'Where', dynGetters(() => Where)], [19, 'ContextValue', dynGetters(() => ContextValue)]])

export const ExpressionIf: ScaleStructBuilder<{
    condition: FragmentFromBuilder<typeof EvaluatesToBool>,
    then_expression: FragmentFromBuilder<typeof EvaluatesToValue>,
    else_expression: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('ExpressionIf', [['condition', dynGetters(() => EvaluatesToBool)], ['then_expression', dynGetters(() => EvaluatesToValue)], ['else_expression', dynGetters(() => EvaluatesToValue)]])

export const FailBox: ScaleStructBuilder<{
    message: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('FailBox', [['message', dynGetters(() => Str)]])

export const FindAccountById: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindAccountById', [['id', dynGetters(() => EvaluatesToAccountId)]])

export const FindAccountKeyValueByIdAndKey: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAccountId>,
    key: FragmentFromBuilder<typeof EvaluatesToName>
}> = createStructBuilder('FindAccountKeyValueByIdAndKey', [['id', dynGetters(() => EvaluatesToAccountId)], ['key', dynGetters(() => EvaluatesToName)]])

export const FindAccountsByDomainId: ScaleStructBuilder<{
    domain_id: FragmentFromBuilder<typeof EvaluatesToId>
}> = createStructBuilder('FindAccountsByDomainId', [['domain_id', dynGetters(() => EvaluatesToId)]])

export const FindAccountsByName: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToName>
}> = createStructBuilder('FindAccountsByName', [['name', dynGetters(() => EvaluatesToName)]])

import { Void as FindAllAccounts } from '@scale-codec/definition-runtime'
export { FindAllAccounts }

import { Void as FindAllAssets } from '@scale-codec/definition-runtime'
export { FindAllAssets }

import { Void as FindAllAssetsDefinitions } from '@scale-codec/definition-runtime'
export { FindAllAssetsDefinitions }

import { Void as FindAllDomains } from '@scale-codec/definition-runtime'
export { FindAllDomains }

import { Void as FindAllPeers } from '@scale-codec/definition-runtime'
export { FindAllPeers }

export const FindAssetById: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAssetId>
}> = createStructBuilder('FindAssetById', [['id', dynGetters(() => EvaluatesToAssetId)]])

export const FindAssetDefinitionKeyValueByIdAndKey: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToDefinitionId>,
    key: FragmentFromBuilder<typeof EvaluatesToName>
}> = createStructBuilder('FindAssetDefinitionKeyValueByIdAndKey', [['id', dynGetters(() => EvaluatesToDefinitionId)], ['key', dynGetters(() => EvaluatesToName)]])

export const FindAssetKeyValueByIdAndKey: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAssetId>,
    key: FragmentFromBuilder<typeof EvaluatesToName>
}> = createStructBuilder('FindAssetKeyValueByIdAndKey', [['id', dynGetters(() => EvaluatesToAssetId)], ['key', dynGetters(() => EvaluatesToName)]])

export const FindAssetQuantityById: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAssetId>
}> = createStructBuilder('FindAssetQuantityById', [['id', dynGetters(() => EvaluatesToAssetId)]])

export const FindAssetsByAccountId: ScaleStructBuilder<{
    account_id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindAssetsByAccountId', [['account_id', dynGetters(() => EvaluatesToAccountId)]])

export const FindAssetsByAssetDefinitionId: ScaleStructBuilder<{
    asset_definition_id: FragmentFromBuilder<typeof EvaluatesToDefinitionId>
}> = createStructBuilder('FindAssetsByAssetDefinitionId', [['asset_definition_id', dynGetters(() => EvaluatesToDefinitionId)]])

export const FindAssetsByDomainId: ScaleStructBuilder<{
    domain_id: FragmentFromBuilder<typeof EvaluatesToId>
}> = createStructBuilder('FindAssetsByDomainId', [['domain_id', dynGetters(() => EvaluatesToId)]])

export const FindAssetsByDomainIdAndAssetDefinitionId: ScaleStructBuilder<{
    domain_id: FragmentFromBuilder<typeof EvaluatesToId>,
    asset_definition_id: FragmentFromBuilder<typeof EvaluatesToDefinitionId>
}> = createStructBuilder('FindAssetsByDomainIdAndAssetDefinitionId', [['domain_id', dynGetters(() => EvaluatesToId)], ['asset_definition_id', dynGetters(() => EvaluatesToDefinitionId)]])

export const FindAssetsByName: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToName>
}> = createStructBuilder('FindAssetsByName', [['name', dynGetters(() => EvaluatesToName)]])

export const FindDomainById: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToId>
}> = createStructBuilder('FindDomainById', [['id', dynGetters(() => EvaluatesToId)]])

export const FindDomainKeyValueByIdAndKey: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToId>,
    key: FragmentFromBuilder<typeof EvaluatesToName>
}> = createStructBuilder('FindDomainKeyValueByIdAndKey', [['id', dynGetters(() => EvaluatesToId)], ['key', dynGetters(() => EvaluatesToName)]])

export const FindPermissionTokensByAccountId: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindPermissionTokensByAccountId', [['id', dynGetters(() => EvaluatesToAccountId)]])

export const FindTransactionByHash: ScaleStructBuilder<{
    hash: FragmentFromBuilder<typeof EvaluatesToHash>
}> = createStructBuilder('FindTransactionByHash', [['hash', dynGetters(() => EvaluatesToHash)]])

export const FindTransactionsByAccountId: ScaleStructBuilder<{
    account_id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindTransactionsByAccountId', [['account_id', dynGetters(() => EvaluatesToAccountId)]])

export const Fixed: typeof FixedPointI64 = dynGetters(() => FixedPointI64)

import { FixedPointI64P9 as FixedPointI64 } from './fixed-point'
export { FixedPointI64 }

export const GenesisTransaction: ScaleStructBuilder<{
    isi: FragmentFromBuilder<typeof VecInstruction>
}> = createStructBuilder('GenesisTransaction', [['isi', dynGetters(() => VecInstruction)]])

export const GrantBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('GrantBox', [['object', dynGetters(() => EvaluatesToValue)], ['destination_id', dynGetters(() => EvaluatesToIdBox)]])

export const Greater: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Greater', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const Hash: typeof ArrayU8L32 = dynGetters(() => ArrayU8L32)

export const HashOfMerkleTreeVersionedTransaction: typeof Hash = dynGetters(() => Hash)

export const HashOfNodeVersionedTransaction: typeof Hash = dynGetters(() => Hash)

export const HashOfProof: typeof Hash = dynGetters(() => Hash)

export const HashOfVersionedCommittedBlock: typeof Hash = dynGetters(() => Hash)

export const HashOfVersionedTransaction: typeof Hash = dynGetters(() => Hash)

export const HashOfVersionedValidBlock: typeof Hash = dynGetters(() => Hash)

export const Id: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Name>
}> = createStructBuilder('Id', [['name', dynGetters(() => Name)]])

export const IdBox: ScaleEnumBuilder<Enum<{
    AccountId: Valuable<FragmentFromBuilder<typeof AccountId>>,
    AssetId: Valuable<FragmentFromBuilder<typeof AssetId>>,
    AssetDefinitionId: Valuable<FragmentFromBuilder<typeof DefinitionId>>,
    DomainId: Valuable<FragmentFromBuilder<typeof Id>>,
    PeerId: Valuable<FragmentFromBuilder<typeof PeerId>>,
    WorldId: null
}>> = createEnumBuilder('IdBox', [[0, 'AccountId', dynGetters(() => AccountId)], [1, 'AssetId', dynGetters(() => AssetId)], [2, 'AssetDefinitionId', dynGetters(() => DefinitionId)], [3, 'DomainId', dynGetters(() => Id)], [4, 'PeerId', dynGetters(() => PeerId)], [5, 'WorldId']])

export const IdentifiableBox: ScaleEnumBuilder<Enum<{
    Account: Valuable<FragmentFromBuilder<typeof Account>>,
    NewAccount: Valuable<FragmentFromBuilder<typeof NewAccount>>,
    Asset: Valuable<FragmentFromBuilder<typeof Asset>>,
    AssetDefinition: Valuable<FragmentFromBuilder<typeof AssetDefinition>>,
    Domain: Valuable<FragmentFromBuilder<typeof Domain>>,
    Peer: Valuable<FragmentFromBuilder<typeof Peer>>,
    World: null
}>> = createEnumBuilder('IdentifiableBox', [[0, 'Account', dynGetters(() => Account)], [1, 'NewAccount', dynGetters(() => NewAccount)], [2, 'Asset', dynGetters(() => Asset)], [3, 'AssetDefinition', dynGetters(() => AssetDefinition)], [4, 'Domain', dynGetters(() => Domain)], [5, 'Peer', dynGetters(() => Peer)], [6, 'World']])

export const Instruction: ScaleEnumBuilder<Enum<{
    Register: Valuable<FragmentFromBuilder<typeof RegisterBox>>,
    Unregister: Valuable<FragmentFromBuilder<typeof UnregisterBox>>,
    Mint: Valuable<FragmentFromBuilder<typeof MintBox>>,
    Burn: Valuable<FragmentFromBuilder<typeof BurnBox>>,
    Transfer: Valuable<FragmentFromBuilder<typeof TransferBox>>,
    If: Valuable<FragmentFromBuilder<typeof IsiIf>>,
    Pair: Valuable<FragmentFromBuilder<typeof Pair>>,
    Sequence: Valuable<FragmentFromBuilder<typeof SequenceBox>>,
    Fail: Valuable<FragmentFromBuilder<typeof FailBox>>,
    SetKeyValue: Valuable<FragmentFromBuilder<typeof SetKeyValueBox>>,
    RemoveKeyValue: Valuable<FragmentFromBuilder<typeof RemoveKeyValueBox>>,
    Grant: Valuable<FragmentFromBuilder<typeof GrantBox>>,
    Revoke: Valuable<FragmentFromBuilder<typeof RevokeBox>>
}>> = createEnumBuilder('Instruction', [[0, 'Register', dynGetters(() => RegisterBox)], [1, 'Unregister', dynGetters(() => UnregisterBox)], [2, 'Mint', dynGetters(() => MintBox)], [3, 'Burn', dynGetters(() => BurnBox)], [4, 'Transfer', dynGetters(() => TransferBox)], [5, 'If', dynGetters(() => IsiIf)], [6, 'Pair', dynGetters(() => Pair)], [7, 'Sequence', dynGetters(() => SequenceBox)], [8, 'Fail', dynGetters(() => FailBox)], [9, 'SetKeyValue', dynGetters(() => SetKeyValueBox)], [10, 'RemoveKeyValue', dynGetters(() => RemoveKeyValueBox)], [11, 'Grant', dynGetters(() => GrantBox)], [12, 'Revoke', dynGetters(() => RevokeBox)]])

export const InstructionExecutionFail: ScaleStructBuilder<{
    instruction: FragmentFromBuilder<typeof Instruction>,
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('InstructionExecutionFail', [['instruction', dynGetters(() => Instruction)], ['reason', dynGetters(() => Str)]])

export const IpfsPath: typeof Str = dynGetters(() => Str)

export const IsiIf: ScaleStructBuilder<{
    condition: FragmentFromBuilder<typeof EvaluatesToBool>,
    then: FragmentFromBuilder<typeof Instruction>,
    otherwise: FragmentFromBuilder<typeof OptionInstruction>
}> = createStructBuilder('IsiIf', [['condition', dynGetters(() => EvaluatesToBool)], ['then', dynGetters(() => Instruction)], ['otherwise', dynGetters(() => OptionInstruction)]])

export const LeafVersionedTransaction: ScaleStructBuilder<{
    hash: FragmentFromBuilder<typeof HashOfVersionedTransaction>
}> = createStructBuilder('LeafVersionedTransaction', [['hash', dynGetters(() => HashOfVersionedTransaction)]])

export const Less: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Less', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const MerkleTreeVersionedTransaction: ScaleStructBuilder<{
    root_node: FragmentFromBuilder<typeof NodeVersionedTransaction>
}> = createStructBuilder('MerkleTreeVersionedTransaction', [['root_node', dynGetters(() => NodeVersionedTransaction)]])

export const Metadata: ScaleStructBuilder<{
    map: FragmentFromBuilder<typeof BTreeMapNameValue>
}> = createStructBuilder('Metadata', [['map', dynGetters(() => BTreeMapNameValue)]])

export const MetadataUpdated: ScaleEnumBuilder<Enum<{
    Inserted: null,
    Removed: null
}>> = createEnumBuilder('MetadataUpdated', [[0, 'Inserted'], [1, 'Removed']])

export const MintBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('MintBox', [['object', dynGetters(() => EvaluatesToValue)], ['destination_id', dynGetters(() => EvaluatesToIdBox)]])

export const Mod: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Mod', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const Multiply: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Multiply', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const Name: typeof Str = dynGetters(() => Str)

export const NewAccount: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof AccountId>,
    signatories: FragmentFromBuilder<typeof VecPublicKey>,
    metadata: FragmentFromBuilder<typeof Metadata>
}> = createStructBuilder('NewAccount', [['id', dynGetters(() => AccountId)], ['signatories', dynGetters(() => VecPublicKey)], ['metadata', dynGetters(() => Metadata)]])

export const NodeVersionedTransaction: ScaleEnumBuilder<Enum<{
    Subtree: Valuable<FragmentFromBuilder<typeof SubtreeVersionedTransaction>>,
    Leaf: Valuable<FragmentFromBuilder<typeof LeafVersionedTransaction>>,
    Empty: null
}>> = createEnumBuilder('NodeVersionedTransaction', [[0, 'Subtree', dynGetters(() => SubtreeVersionedTransaction)], [1, 'Leaf', dynGetters(() => LeafVersionedTransaction)], [2, 'Empty']])

export const Not: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof EvaluatesToBool>
}> = createStructBuilder('Not', [['expression', dynGetters(() => EvaluatesToBool)]])

export const NotPermittedFail: ScaleStructBuilder<{
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('NotPermittedFail', [['reason', dynGetters(() => Str)]])

import { Void as NoTransactionReceiptReceived } from '@scale-codec/definition-runtime'
export { NoTransactionReceiptReceived }

export const OptionAccountId: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof AccountId>>> = createOptionBuilder('OptionAccountId', dynGetters(() => AccountId))

export const OptionAssetId: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof AssetId>>> = createOptionBuilder('OptionAssetId', dynGetters(() => AssetId))

export const OptionDefinitionId: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof DefinitionId>>> = createOptionBuilder('OptionDefinitionId', dynGetters(() => DefinitionId))

export const OptionEntityFilter: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof EntityFilter>>> = createOptionBuilder('OptionEntityFilter', dynGetters(() => EntityFilter))

export const OptionEntityType: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof EntityType>>> = createOptionBuilder('OptionEntityType', dynGetters(() => EntityType))

export const OptionHash: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Hash>>> = createOptionBuilder('OptionHash', dynGetters(() => Hash))

export const OptionId: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Id>>> = createOptionBuilder('OptionId', dynGetters(() => Id))

export const OptionInstruction: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Instruction>>> = createOptionBuilder('OptionInstruction', dynGetters(() => Instruction))

export const OptionIpfsPath: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof IpfsPath>>> = createOptionBuilder('OptionIpfsPath', dynGetters(() => IpfsPath))

export const OptionPeerId: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof PeerId>>> = createOptionBuilder('OptionPeerId', dynGetters(() => PeerId))

export const OptionStatusFilter: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof StatusFilter>>> = createOptionBuilder('OptionStatusFilter', dynGetters(() => StatusFilter))

export const OptionTopology: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Topology>>> = createOptionBuilder('OptionTopology', dynGetters(() => Topology))

export const OptionU32: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof U32>>> = createOptionBuilder('OptionU32', dynGetters(() => U32))

export const OptionUpdated: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Updated>>> = createOptionBuilder('OptionUpdated', dynGetters(() => Updated))

export const Or: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToBool>,
    right: FragmentFromBuilder<typeof EvaluatesToBool>
}> = createStructBuilder('Or', [['left', dynGetters(() => EvaluatesToBool)], ['right', dynGetters(() => EvaluatesToBool)]])

export const Pair: ScaleStructBuilder<{
    left_instruction: FragmentFromBuilder<typeof Instruction>,
    right_instruction: FragmentFromBuilder<typeof Instruction>
}> = createStructBuilder('Pair', [['left_instruction', dynGetters(() => Instruction)], ['right_instruction', dynGetters(() => Instruction)]])

export const Parameter: ScaleEnumBuilder<Enum<{
    MaximumFaultyPeersAmount: Valuable<FragmentFromBuilder<typeof U32>>,
    BlockTime: Valuable<FragmentFromBuilder<typeof U128>>,
    CommitTime: Valuable<FragmentFromBuilder<typeof U128>>,
    TransactionReceiptTime: Valuable<FragmentFromBuilder<typeof U128>>
}>> = createEnumBuilder('Parameter', [[0, 'MaximumFaultyPeersAmount', dynGetters(() => U32)], [1, 'BlockTime', dynGetters(() => U128)], [2, 'CommitTime', dynGetters(() => U128)], [3, 'TransactionReceiptTime', dynGetters(() => U128)]])

export const Peer: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof PeerId>
}> = createStructBuilder('Peer', [['id', dynGetters(() => PeerId)]])

export const PeerId: ScaleStructBuilder<{
    address: FragmentFromBuilder<typeof Str>,
    public_key: FragmentFromBuilder<typeof PublicKey>
}> = createStructBuilder('PeerId', [['address', dynGetters(() => Str)], ['public_key', dynGetters(() => PublicKey)]])

export const PermissionToken: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Name>,
    params: FragmentFromBuilder<typeof BTreeMapNameValue>
}> = createStructBuilder('PermissionToken', [['name', dynGetters(() => Name)], ['params', dynGetters(() => BTreeMapNameValue)]])

export const PipelineEvent: ScaleStructBuilder<{
    entity_type: FragmentFromBuilder<typeof EntityType>,
    status: FragmentFromBuilder<typeof Status>,
    hash: FragmentFromBuilder<typeof Hash>
}> = createStructBuilder('PipelineEvent', [['entity_type', dynGetters(() => EntityType)], ['status', dynGetters(() => Status)], ['hash', dynGetters(() => Hash)]])

export const PipelineEventFilter: ScaleStructBuilder<{
    entity: FragmentFromBuilder<typeof OptionEntityType>,
    hash: FragmentFromBuilder<typeof OptionHash>
}> = createStructBuilder('PipelineEventFilter', [['entity', dynGetters(() => OptionEntityType)], ['hash', dynGetters(() => OptionHash)]])

export const Proof: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof ProofPayload>,
    signatures: FragmentFromBuilder<typeof SignaturesOfProof>
}> = createStructBuilder('Proof', [['payload', dynGetters(() => ProofPayload)], ['signatures', dynGetters(() => SignaturesOfProof)]])

export const ProofChain: ScaleStructBuilder<{
    proofs: FragmentFromBuilder<typeof VecProof>
}> = createStructBuilder('ProofChain', [['proofs', dynGetters(() => VecProof)]])

export const ProofPayload: ScaleStructBuilder<{
    previous_proof: FragmentFromBuilder<typeof HashOfProof>,
    latest_block: FragmentFromBuilder<typeof HashOfVersionedCommittedBlock>,
    reason: FragmentFromBuilder<typeof Reason>
}> = createStructBuilder('ProofPayload', [['previous_proof', dynGetters(() => HashOfProof)], ['latest_block', dynGetters(() => HashOfVersionedCommittedBlock)], ['reason', dynGetters(() => Reason)]])

export const PublicKey: ScaleStructBuilder<{
    digest_function: FragmentFromBuilder<typeof Str>,
    payload: FragmentFromBuilder<typeof BytesVec>
}> = createStructBuilder('PublicKey', [['digest_function', dynGetters(() => Str)], ['payload', dynGetters(() => BytesVec)]])

export const QueryBox: ScaleEnumBuilder<Enum<{
    FindAllAccounts: Valuable<FragmentFromBuilder<typeof FindAllAccounts>>,
    FindAccountById: Valuable<FragmentFromBuilder<typeof FindAccountById>>,
    FindAccountKeyValueByIdAndKey: Valuable<FragmentFromBuilder<typeof FindAccountKeyValueByIdAndKey>>,
    FindAccountsByName: Valuable<FragmentFromBuilder<typeof FindAccountsByName>>,
    FindAccountsByDomainId: Valuable<FragmentFromBuilder<typeof FindAccountsByDomainId>>,
    FindAllAssets: Valuable<FragmentFromBuilder<typeof FindAllAssets>>,
    FindAllAssetsDefinitions: Valuable<FragmentFromBuilder<typeof FindAllAssetsDefinitions>>,
    FindAssetById: Valuable<FragmentFromBuilder<typeof FindAssetById>>,
    FindAssetsByName: Valuable<FragmentFromBuilder<typeof FindAssetsByName>>,
    FindAssetsByAccountId: Valuable<FragmentFromBuilder<typeof FindAssetsByAccountId>>,
    FindAssetsByAssetDefinitionId: Valuable<FragmentFromBuilder<typeof FindAssetsByAssetDefinitionId>>,
    FindAssetsByDomainId: Valuable<FragmentFromBuilder<typeof FindAssetsByDomainId>>,
    FindAssetsByDomainIdAndAssetDefinitionId: Valuable<FragmentFromBuilder<typeof FindAssetsByDomainIdAndAssetDefinitionId>>,
    FindAssetQuantityById: Valuable<FragmentFromBuilder<typeof FindAssetQuantityById>>,
    FindAssetKeyValueByIdAndKey: Valuable<FragmentFromBuilder<typeof FindAssetKeyValueByIdAndKey>>,
    FindAssetDefinitionKeyValueByIdAndKey: Valuable<FragmentFromBuilder<typeof FindAssetDefinitionKeyValueByIdAndKey>>,
    FindAllDomains: Valuable<FragmentFromBuilder<typeof FindAllDomains>>,
    FindDomainById: Valuable<FragmentFromBuilder<typeof FindDomainById>>,
    FindDomainKeyValueByIdAndKey: Valuable<FragmentFromBuilder<typeof FindDomainKeyValueByIdAndKey>>,
    FindAllPeers: Valuable<FragmentFromBuilder<typeof FindAllPeers>>,
    FindTransactionsByAccountId: Valuable<FragmentFromBuilder<typeof FindTransactionsByAccountId>>,
    FindTransactionByHash: Valuable<FragmentFromBuilder<typeof FindTransactionByHash>>,
    FindPermissionTokensByAccountId: Valuable<FragmentFromBuilder<typeof FindPermissionTokensByAccountId>>
}>> = createEnumBuilder('QueryBox', [[0, 'FindAllAccounts', dynGetters(() => FindAllAccounts)], [1, 'FindAccountById', dynGetters(() => FindAccountById)], [2, 'FindAccountKeyValueByIdAndKey', dynGetters(() => FindAccountKeyValueByIdAndKey)], [3, 'FindAccountsByName', dynGetters(() => FindAccountsByName)], [4, 'FindAccountsByDomainId', dynGetters(() => FindAccountsByDomainId)], [5, 'FindAllAssets', dynGetters(() => FindAllAssets)], [6, 'FindAllAssetsDefinitions', dynGetters(() => FindAllAssetsDefinitions)], [7, 'FindAssetById', dynGetters(() => FindAssetById)], [8, 'FindAssetsByName', dynGetters(() => FindAssetsByName)], [9, 'FindAssetsByAccountId', dynGetters(() => FindAssetsByAccountId)], [10, 'FindAssetsByAssetDefinitionId', dynGetters(() => FindAssetsByAssetDefinitionId)], [11, 'FindAssetsByDomainId', dynGetters(() => FindAssetsByDomainId)], [12, 'FindAssetsByDomainIdAndAssetDefinitionId', dynGetters(() => FindAssetsByDomainIdAndAssetDefinitionId)], [13, 'FindAssetQuantityById', dynGetters(() => FindAssetQuantityById)], [14, 'FindAssetKeyValueByIdAndKey', dynGetters(() => FindAssetKeyValueByIdAndKey)], [15, 'FindAssetDefinitionKeyValueByIdAndKey', dynGetters(() => FindAssetDefinitionKeyValueByIdAndKey)], [16, 'FindAllDomains', dynGetters(() => FindAllDomains)], [17, 'FindDomainById', dynGetters(() => FindDomainById)], [18, 'FindDomainKeyValueByIdAndKey', dynGetters(() => FindDomainKeyValueByIdAndKey)], [19, 'FindAllPeers', dynGetters(() => FindAllPeers)], [20, 'FindTransactionsByAccountId', dynGetters(() => FindTransactionsByAccountId)], [21, 'FindTransactionByHash', dynGetters(() => FindTransactionByHash)], [22, 'FindPermissionTokensByAccountId', dynGetters(() => FindPermissionTokensByAccountId)]])

export const QueryPayload: ScaleStructBuilder<{
    timestamp_ms: FragmentFromBuilder<typeof Compact>,
    query: FragmentFromBuilder<typeof QueryBox>,
    account_id: FragmentFromBuilder<typeof AccountId>
}> = createStructBuilder('QueryPayload', [['timestamp_ms', dynGetters(() => Compact)], ['query', dynGetters(() => QueryBox)], ['account_id', dynGetters(() => AccountId)]])

export const QueryResult: typeof Value = dynGetters(() => Value)

export const RaiseTo: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('RaiseTo', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const RawGenesisBlock: ScaleStructBuilder<{
    transactions: FragmentFromBuilder<typeof VecGenesisTransaction>
}> = createStructBuilder('RawGenesisBlock', [['transactions', dynGetters(() => VecGenesisTransaction)]])

export const Reason: ScaleEnumBuilder<Enum<{
    CommitTimeout: Valuable<FragmentFromBuilder<typeof CommitTimeout>>,
    NoTransactionReceiptReceived: Valuable<FragmentFromBuilder<typeof NoTransactionReceiptReceived>>,
    BlockCreationTimeout: Valuable<FragmentFromBuilder<typeof BlockCreationTimeout>>
}>> = createEnumBuilder('Reason', [[0, 'CommitTimeout', dynGetters(() => CommitTimeout)], [1, 'NoTransactionReceiptReceived', dynGetters(() => NoTransactionReceiptReceived)], [2, 'BlockCreationTimeout', dynGetters(() => BlockCreationTimeout)]])

export const RegisterBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToIdentifiableBox>
}> = createStructBuilder('RegisterBox', [['object', dynGetters(() => EvaluatesToIdentifiableBox)]])

export const RejectedTransaction: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof TransactionPayload>,
    signatures: FragmentFromBuilder<typeof SignaturesOfTransactionPayload>,
    rejection_reason: FragmentFromBuilder<typeof TransactionRejectionReason>
}> = createStructBuilder('RejectedTransaction', [['payload', dynGetters(() => TransactionPayload)], ['signatures', dynGetters(() => SignaturesOfTransactionPayload)], ['rejection_reason', dynGetters(() => TransactionRejectionReason)]])

export const RejectionReason: ScaleEnumBuilder<Enum<{
    Block: Valuable<FragmentFromBuilder<typeof BlockRejectionReason>>,
    Transaction: Valuable<FragmentFromBuilder<typeof TransactionRejectionReason>>
}>> = createEnumBuilder('RejectionReason', [[0, 'Block', dynGetters(() => BlockRejectionReason)], [1, 'Transaction', dynGetters(() => TransactionRejectionReason)]])

export const RemoveKeyValueBox: ScaleStructBuilder<{
    object_id: FragmentFromBuilder<typeof EvaluatesToIdBox>,
    key: FragmentFromBuilder<typeof EvaluatesToName>
}> = createStructBuilder('RemoveKeyValueBox', [['object_id', dynGetters(() => EvaluatesToIdBox)], ['key', dynGetters(() => EvaluatesToName)]])

export const RevokeBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('RevokeBox', [['object', dynGetters(() => EvaluatesToValue)], ['destination_id', dynGetters(() => EvaluatesToIdBox)]])

export const SequenceBox: ScaleStructBuilder<{
    instructions: FragmentFromBuilder<typeof VecInstruction>
}> = createStructBuilder('SequenceBox', [['instructions', dynGetters(() => VecInstruction)]])

export const SetKeyValueBox: ScaleStructBuilder<{
    object_id: FragmentFromBuilder<typeof EvaluatesToIdBox>,
    key: FragmentFromBuilder<typeof EvaluatesToName>,
    value: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('SetKeyValueBox', [['object_id', dynGetters(() => EvaluatesToIdBox)], ['key', dynGetters(() => EvaluatesToName)], ['value', dynGetters(() => EvaluatesToValue)]])

export const Signature: ScaleStructBuilder<{
    public_key: FragmentFromBuilder<typeof PublicKey>,
    signature: FragmentFromBuilder<typeof BytesVec>
}> = createStructBuilder('Signature', [['public_key', dynGetters(() => PublicKey)], ['signature', dynGetters(() => BytesVec)]])

export const SignatureCheckCondition: typeof EvaluatesToBool = dynGetters(() => EvaluatesToBool)

export const SignatureOfCommittedBlock: typeof Signature = dynGetters(() => Signature)

export const SignatureOfProof: typeof Signature = dynGetters(() => Signature)

export const SignatureOfQueryPayload: typeof Signature = dynGetters(() => Signature)

export const SignatureOfTransactionPayload: typeof Signature = dynGetters(() => Signature)

export const SignatureOfValidBlock: typeof Signature = dynGetters(() => Signature)

export const SignaturesOfCommittedBlock: ScaleStructBuilder<{
    signatures: FragmentFromBuilder<typeof BTreeMapPublicKeySignatureOfCommittedBlock>
}> = createStructBuilder('SignaturesOfCommittedBlock', [['signatures', dynGetters(() => BTreeMapPublicKeySignatureOfCommittedBlock)]])

export const SignaturesOfProof: ScaleStructBuilder<{
    signatures: FragmentFromBuilder<typeof BTreeMapPublicKeySignatureOfProof>
}> = createStructBuilder('SignaturesOfProof', [['signatures', dynGetters(() => BTreeMapPublicKeySignatureOfProof)]])

export const SignaturesOfTransactionPayload: ScaleStructBuilder<{
    signatures: FragmentFromBuilder<typeof BTreeMapPublicKeySignatureOfTransactionPayload>
}> = createStructBuilder('SignaturesOfTransactionPayload', [['signatures', dynGetters(() => BTreeMapPublicKeySignatureOfTransactionPayload)]])

export const SignedQueryRequest: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof QueryPayload>,
    signature: FragmentFromBuilder<typeof SignatureOfQueryPayload>
}> = createStructBuilder('SignedQueryRequest', [['payload', dynGetters(() => QueryPayload)], ['signature', dynGetters(() => SignatureOfQueryPayload)]])

export const Status: ScaleEnumBuilder<Enum<{
    Validating: null,
    Rejected: Valuable<FragmentFromBuilder<typeof RejectionReason>>,
    Committed: null
}>> = createEnumBuilder('Status', [[0, 'Validating'], [1, 'Rejected', dynGetters(() => RejectionReason)], [2, 'Committed']])

export const StatusFilter: ScaleEnumBuilder<Enum<{
    Created: null,
    Updated: Valuable<FragmentFromBuilder<typeof OptionUpdated>>,
    Deleted: null
}>> = createEnumBuilder('StatusFilter', [[0, 'Created'], [1, 'Updated', dynGetters(() => OptionUpdated)], [2, 'Deleted']])

export const Subtract: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Subtract', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const SubtreeVersionedTransaction: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof NodeVersionedTransaction>,
    right: FragmentFromBuilder<typeof NodeVersionedTransaction>,
    hash: FragmentFromBuilder<typeof HashOfNodeVersionedTransaction>
}> = createStructBuilder('SubtreeVersionedTransaction', [['left', dynGetters(() => NodeVersionedTransaction)], ['right', dynGetters(() => NodeVersionedTransaction)], ['hash', dynGetters(() => HashOfNodeVersionedTransaction)]])

export const Topology: ScaleStructBuilder<{
    sorted_peers: FragmentFromBuilder<typeof VecPeerId>,
    reshuffle_after_n_view_changes: FragmentFromBuilder<typeof U64>,
    at_block: FragmentFromBuilder<typeof HashOfVersionedCommittedBlock>,
    view_change_proofs: FragmentFromBuilder<typeof ProofChain>
}> = createStructBuilder('Topology', [['sorted_peers', dynGetters(() => VecPeerId)], ['reshuffle_after_n_view_changes', dynGetters(() => U64)], ['at_block', dynGetters(() => HashOfVersionedCommittedBlock)], ['view_change_proofs', dynGetters(() => ProofChain)]])

export const Transaction: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof TransactionPayload>,
    signatures: FragmentFromBuilder<typeof BTreeSetSignatureOfTransactionPayload>
}> = createStructBuilder('Transaction', [['payload', dynGetters(() => TransactionPayload)], ['signatures', dynGetters(() => BTreeSetSignatureOfTransactionPayload)]])

export const TransactionLimitError: typeof Str = dynGetters(() => Str)

export const TransactionPayload: ScaleStructBuilder<{
    account_id: FragmentFromBuilder<typeof AccountId>,
    instructions: FragmentFromBuilder<typeof Executable>,
    creation_time: FragmentFromBuilder<typeof U64>,
    time_to_live_ms: FragmentFromBuilder<typeof U64>,
    nonce: FragmentFromBuilder<typeof OptionU32>,
    metadata: FragmentFromBuilder<typeof BTreeMapNameValue>
}> = createStructBuilder('TransactionPayload', [['account_id', dynGetters(() => AccountId)], ['instructions', dynGetters(() => Executable)], ['creation_time', dynGetters(() => U64)], ['time_to_live_ms', dynGetters(() => U64)], ['nonce', dynGetters(() => OptionU32)], ['metadata', dynGetters(() => BTreeMapNameValue)]])

export const TransactionRejectionReason: ScaleEnumBuilder<Enum<{
    NotPermitted: Valuable<FragmentFromBuilder<typeof NotPermittedFail>>,
    UnsatisfiedSignatureCondition: Valuable<FragmentFromBuilder<typeof UnsatisfiedSignatureConditionFail>>,
    LimitCheck: Valuable<FragmentFromBuilder<typeof TransactionLimitError>>,
    InstructionExecution: Valuable<FragmentFromBuilder<typeof InstructionExecutionFail>>,
    WasmExecution: Valuable<FragmentFromBuilder<typeof WasmExecutionFail>>,
    UnexpectedGenesisAccountSignature: null
}>> = createEnumBuilder('TransactionRejectionReason', [[0, 'NotPermitted', dynGetters(() => NotPermittedFail)], [1, 'UnsatisfiedSignatureCondition', dynGetters(() => UnsatisfiedSignatureConditionFail)], [2, 'LimitCheck', dynGetters(() => TransactionLimitError)], [3, 'InstructionExecution', dynGetters(() => InstructionExecutionFail)], [4, 'WasmExecution', dynGetters(() => WasmExecutionFail)], [5, 'UnexpectedGenesisAccountSignature']])

export const TransactionValue: ScaleEnumBuilder<Enum<{
    Transaction: Valuable<FragmentFromBuilder<typeof VersionedTransaction>>,
    RejectedTransaction: Valuable<FragmentFromBuilder<typeof VersionedRejectedTransaction>>
}>> = createEnumBuilder('TransactionValue', [[0, 'Transaction', dynGetters(() => VersionedTransaction)], [1, 'RejectedTransaction', dynGetters(() => VersionedRejectedTransaction)]])

export const TransferBox: ScaleStructBuilder<{
    source_id: FragmentFromBuilder<typeof EvaluatesToIdBox>,
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('TransferBox', [['source_id', dynGetters(() => EvaluatesToIdBox)], ['object', dynGetters(() => EvaluatesToValue)], ['destination_id', dynGetters(() => EvaluatesToIdBox)]])

export const UnregisterBox: ScaleStructBuilder<{
    object_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('UnregisterBox', [['object_id', dynGetters(() => EvaluatesToIdBox)]])

export const UnsatisfiedSignatureConditionFail: ScaleStructBuilder<{
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('UnsatisfiedSignatureConditionFail', [['reason', dynGetters(() => Str)]])

export const Updated: ScaleEnumBuilder<Enum<{
    Metadata: Valuable<FragmentFromBuilder<typeof MetadataUpdated>>,
    Authentication: null,
    Permission: null,
    Asset: Valuable<FragmentFromBuilder<typeof AssetUpdated>>
}>> = createEnumBuilder('Updated', [[0, 'Metadata', dynGetters(() => MetadataUpdated)], [1, 'Authentication'], [2, 'Permission'], [3, 'Asset', dynGetters(() => AssetUpdated)]])

export const ValidBlock: ScaleStructBuilder<{
    header: FragmentFromBuilder<typeof BlockHeader>,
    rejected_transactions: FragmentFromBuilder<typeof VecVersionedRejectedTransaction>,
    transactions: FragmentFromBuilder<typeof VecVersionedValidTransaction>,
    signatures: FragmentFromBuilder<typeof BTreeSetSignatureOfValidBlock>
}> = createStructBuilder('ValidBlock', [['header', dynGetters(() => BlockHeader)], ['rejected_transactions', dynGetters(() => VecVersionedRejectedTransaction)], ['transactions', dynGetters(() => VecVersionedValidTransaction)], ['signatures', dynGetters(() => BTreeSetSignatureOfValidBlock)]])

export const ValidTransaction: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof TransactionPayload>,
    signatures: FragmentFromBuilder<typeof SignaturesOfTransactionPayload>
}> = createStructBuilder('ValidTransaction', [['payload', dynGetters(() => TransactionPayload)], ['signatures', dynGetters(() => SignaturesOfTransactionPayload)]])

export const Value: ScaleEnumBuilder<Enum<{
    U32: Valuable<FragmentFromBuilder<typeof U32>>,
    U128: Valuable<FragmentFromBuilder<typeof U128>>,
    Bool: Valuable<FragmentFromBuilder<typeof Bool>>,
    String: Valuable<FragmentFromBuilder<typeof Str>>,
    Name: Valuable<FragmentFromBuilder<typeof Name>>,
    Fixed: Valuable<FragmentFromBuilder<typeof Fixed>>,
    Vec: Valuable<FragmentFromBuilder<typeof VecValue>>,
    LimitedMetadata: Valuable<FragmentFromBuilder<typeof Metadata>>,
    Id: Valuable<FragmentFromBuilder<typeof IdBox>>,
    Identifiable: Valuable<FragmentFromBuilder<typeof IdentifiableBox>>,
    PublicKey: Valuable<FragmentFromBuilder<typeof PublicKey>>,
    Parameter: Valuable<FragmentFromBuilder<typeof Parameter>>,
    SignatureCheckCondition: Valuable<FragmentFromBuilder<typeof SignatureCheckCondition>>,
    TransactionValue: Valuable<FragmentFromBuilder<typeof TransactionValue>>,
    PermissionToken: Valuable<FragmentFromBuilder<typeof PermissionToken>>,
    Hash: Valuable<FragmentFromBuilder<typeof Hash>>
}>> = createEnumBuilder('Value', [[0, 'U32', dynGetters(() => U32)], [1, 'U128', dynGetters(() => U128)], [2, 'Bool', dynGetters(() => Bool)], [3, 'String', dynGetters(() => Str)], [4, 'Name', dynGetters(() => Name)], [5, 'Fixed', dynGetters(() => Fixed)], [6, 'Vec', dynGetters(() => VecValue)], [7, 'LimitedMetadata', dynGetters(() => Metadata)], [8, 'Id', dynGetters(() => IdBox)], [9, 'Identifiable', dynGetters(() => IdentifiableBox)], [10, 'PublicKey', dynGetters(() => PublicKey)], [11, 'Parameter', dynGetters(() => Parameter)], [12, 'SignatureCheckCondition', dynGetters(() => SignatureCheckCondition)], [13, 'TransactionValue', dynGetters(() => TransactionValue)], [14, 'PermissionToken', dynGetters(() => PermissionToken)], [15, 'Hash', dynGetters(() => Hash)]])

export const VecGenesisTransaction: ScaleArrayBuilder<FragmentFromBuilder<typeof GenesisTransaction>[]> = createVecBuilder('VecGenesisTransaction', dynGetters(() => GenesisTransaction))

export const VecHashOfVersionedValidBlock: ScaleArrayBuilder<FragmentFromBuilder<typeof HashOfVersionedValidBlock>[]> = createVecBuilder('VecHashOfVersionedValidBlock', dynGetters(() => HashOfVersionedValidBlock))

export const VecInstruction: ScaleArrayBuilder<FragmentFromBuilder<typeof Instruction>[]> = createVecBuilder('VecInstruction', dynGetters(() => Instruction))

export const VecPeerId: ScaleArrayBuilder<FragmentFromBuilder<typeof PeerId>[]> = createVecBuilder('VecPeerId', dynGetters(() => PeerId))

export const VecPermissionToken: ScaleArrayBuilder<FragmentFromBuilder<typeof PermissionToken>[]> = createVecBuilder('VecPermissionToken', dynGetters(() => PermissionToken))

export const VecProof: ScaleArrayBuilder<FragmentFromBuilder<typeof Proof>[]> = createVecBuilder('VecProof', dynGetters(() => Proof))

export const VecPublicKey: ScaleArrayBuilder<FragmentFromBuilder<typeof PublicKey>[]> = createVecBuilder('VecPublicKey', dynGetters(() => PublicKey))

export const VecSignatureOfTransactionPayload: ScaleArrayBuilder<FragmentFromBuilder<typeof SignatureOfTransactionPayload>[]> = createVecBuilder('VecSignatureOfTransactionPayload', dynGetters(() => SignatureOfTransactionPayload))

export const VecSignatureOfValidBlock: ScaleArrayBuilder<FragmentFromBuilder<typeof SignatureOfValidBlock>[]> = createVecBuilder('VecSignatureOfValidBlock', dynGetters(() => SignatureOfValidBlock))

export const VecValue: ScaleArrayBuilder<FragmentFromBuilder<typeof Value>[]> = createVecBuilder('VecValue', dynGetters(() => Value))

export const VecVersionedRejectedTransaction: ScaleArrayBuilder<FragmentFromBuilder<typeof VersionedRejectedTransaction>[]> = createVecBuilder('VecVersionedRejectedTransaction', dynGetters(() => VersionedRejectedTransaction))

export const VecVersionedValidTransaction: ScaleArrayBuilder<FragmentFromBuilder<typeof VersionedValidTransaction>[]> = createVecBuilder('VecVersionedValidTransaction', dynGetters(() => VersionedValidTransaction))

export const VersionedBlockPublisherMessage: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof BlockPublisherMessage>>
}>> = createEnumBuilder('VersionedBlockPublisherMessage', [[1, 'V1', dynGetters(() => BlockPublisherMessage)]])

export const VersionedBlockSubscriberMessage: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof BlockSubscriberMessage>>
}>> = createEnumBuilder('VersionedBlockSubscriberMessage', [[1, 'V1', dynGetters(() => BlockSubscriberMessage)]])

export const VersionedCommittedBlock: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof CommittedBlock>>
}>> = createEnumBuilder('VersionedCommittedBlock', [[1, 'V1', dynGetters(() => CommittedBlock)]])

export const VersionedEventPublisherMessage: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof EventPublisherMessage>>
}>> = createEnumBuilder('VersionedEventPublisherMessage', [[1, 'V1', dynGetters(() => EventPublisherMessage)]])

export const VersionedEventSubscriberMessage: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof EventSubscriberMessage>>
}>> = createEnumBuilder('VersionedEventSubscriberMessage', [[1, 'V1', dynGetters(() => EventSubscriberMessage)]])

export const VersionedQueryResult: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof QueryResult>>
}>> = createEnumBuilder('VersionedQueryResult', [[1, 'V1', dynGetters(() => QueryResult)]])

export const VersionedRejectedTransaction: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof RejectedTransaction>>
}>> = createEnumBuilder('VersionedRejectedTransaction', [[1, 'V1', dynGetters(() => RejectedTransaction)]])

export const VersionedSignedQueryRequest: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof SignedQueryRequest>>
}>> = createEnumBuilder('VersionedSignedQueryRequest', [[1, 'V1', dynGetters(() => SignedQueryRequest)]])

export const VersionedTransaction: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof Transaction>>
}>> = createEnumBuilder('VersionedTransaction', [[1, 'V1', dynGetters(() => Transaction)]])

export const VersionedValidBlock: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof ValidBlock>>
}>> = createEnumBuilder('VersionedValidBlock', [[1, 'V1', dynGetters(() => ValidBlock)]])

export const VersionedValidTransaction: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof ValidTransaction>>
}>> = createEnumBuilder('VersionedValidTransaction', [[1, 'V1', dynGetters(() => ValidTransaction)]])

export const WasmExecutionFail: ScaleStructBuilder<{
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('WasmExecutionFail', [['reason', dynGetters(() => Str)]])

export const WasmSmartContract: ScaleStructBuilder<{
    raw_data: FragmentFromBuilder<typeof BytesVec>
}> = createStructBuilder('WasmSmartContract', [['raw_data', dynGetters(() => BytesVec)]])

export const Where: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof EvaluatesToValue>,
    values: FragmentFromBuilder<typeof BTreeMapStringEvaluatesToValue>
}> = createStructBuilder('Where', [['expression', dynGetters(() => EvaluatesToValue)], ['values', dynGetters(() => BTreeMapStringEvaluatesToValue)]])
