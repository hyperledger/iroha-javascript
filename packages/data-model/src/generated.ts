import { Bool, BytesVec, Compact, Enum, FragmentFromBuilder, Option, ScaleArrayBuilder, ScaleEnumBuilder, ScaleMapBuilder, ScaleSetBuilder, ScaleStructBuilder, Str, U128, U32, U64, Valuable, createBytesArrayBuilder, createEnumBuilder, createMapBuilder, createOptionBuilder, createSetBuilder, createStructBuilder, createVecBuilder, dynGetters } from '@scale-codec/definition-runtime'

export const Account: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof AccountId>,
    assets: FragmentFromBuilder<typeof BTreeMapAssetIdAsset>,
    signatories: FragmentFromBuilder<typeof VecPublicKey>,
    permission_tokens: FragmentFromBuilder<typeof BTreeSetPermissionToken>,
    signature_check_condition: FragmentFromBuilder<typeof SignatureCheckCondition>,
    metadata: FragmentFromBuilder<typeof Metadata>
}> = createStructBuilder('Account', [['id', dynGetters(() => AccountId)], ['assets', dynGetters(() => BTreeMapAssetIdAsset)], ['signatories', dynGetters(() => VecPublicKey)], ['permission_tokens', dynGetters(() => BTreeSetPermissionToken)], ['signature_check_condition', dynGetters(() => SignatureCheckCondition)], ['metadata', dynGetters(() => Metadata)]])

export const AccountId: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Str>,
    domain_name: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('AccountId', [['name', dynGetters(() => Str)], ['domain_name', dynGetters(() => Str)]])

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

export const BlockRejectionReason: ScaleEnumBuilder<Enum<{
    ConsensusBlockRejection: null
}>> = createEnumBuilder('BlockRejectionReason', [[0, 'ConsensusBlockRejection']])

export const BTreeMapAccountIdAccount: ScaleMapBuilder<Map<FragmentFromBuilder<typeof AccountId>, FragmentFromBuilder<typeof Account>>> = createMapBuilder('BTreeMapAccountIdAccount', dynGetters(() => AccountId), dynGetters(() => Account))

export const BTreeMapAssetIdAsset: ScaleMapBuilder<Map<FragmentFromBuilder<typeof AssetId>, FragmentFromBuilder<typeof Asset>>> = createMapBuilder('BTreeMapAssetIdAsset', dynGetters(() => AssetId), dynGetters(() => Asset))

export const BTreeMapDefinitionIdAssetDefinitionEntry: ScaleMapBuilder<Map<FragmentFromBuilder<typeof DefinitionId>, FragmentFromBuilder<typeof AssetDefinitionEntry>>> = createMapBuilder('BTreeMapDefinitionIdAssetDefinitionEntry', dynGetters(() => DefinitionId), dynGetters(() => AssetDefinitionEntry))

export const BTreeMapPublicKeySignature: ScaleMapBuilder<Map<FragmentFromBuilder<typeof PublicKey>, FragmentFromBuilder<typeof Signature>>> = createMapBuilder('BTreeMapPublicKeySignature', dynGetters(() => PublicKey), dynGetters(() => Signature))

export const BTreeMapStringEvaluatesToValue: ScaleMapBuilder<Map<FragmentFromBuilder<typeof Str>, FragmentFromBuilder<typeof EvaluatesToValue>>> = createMapBuilder('BTreeMapStringEvaluatesToValue', dynGetters(() => Str), dynGetters(() => EvaluatesToValue))

export const BTreeMapStringValue: ScaleMapBuilder<Map<FragmentFromBuilder<typeof Str>, FragmentFromBuilder<typeof Value>>> = createMapBuilder('BTreeMapStringValue', dynGetters(() => Str), dynGetters(() => Value))

export const BTreeSetPermissionToken: ScaleSetBuilder<Set<FragmentFromBuilder<typeof PermissionToken>>> = createSetBuilder('BTreeSetPermissionToken', dynGetters(() => PermissionToken))

export const BTreeSetSignature: ScaleSetBuilder<Set<FragmentFromBuilder<typeof Signature>>> = createSetBuilder('BTreeSetSignature', dynGetters(() => Signature))

export const BurnBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('BurnBox', [['object', dynGetters(() => EvaluatesToValue)], ['destination_id', dynGetters(() => EvaluatesToIdBox)]])

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

import { Void as DataEvent } from '@scale-codec/definition-runtime'
export { DataEvent }

import { Void as DataEventFilter } from '@scale-codec/definition-runtime'
export { DataEventFilter }

export const DefinitionId: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Str>,
    domain_name: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('DefinitionId', [['name', dynGetters(() => Str)], ['domain_name', dynGetters(() => Str)]])

export const Divide: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Divide', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const Domain: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Str>,
    accounts: FragmentFromBuilder<typeof BTreeMapAccountIdAccount>,
    asset_definitions: FragmentFromBuilder<typeof BTreeMapDefinitionIdAssetDefinitionEntry>,
    metadata: FragmentFromBuilder<typeof Metadata>
}> = createStructBuilder('Domain', [['name', dynGetters(() => Str)], ['accounts', dynGetters(() => BTreeMapAccountIdAccount)], ['asset_definitions', dynGetters(() => BTreeMapDefinitionIdAssetDefinitionEntry)], ['metadata', dynGetters(() => Metadata)]])

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

export const EvaluatesToIdBox: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToIdBox', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToIdentifiableBox: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToIdentifiableBox', [['expression', dynGetters(() => Expression)]])

export const EvaluatesToString: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToString', [['expression', dynGetters(() => Expression)]])

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

export const EventSocketMessage: ScaleEnumBuilder<Enum<{
    SubscriptionRequest: Valuable<FragmentFromBuilder<typeof SubscriptionRequest>>,
    SubscriptionAccepted: null,
    Event: Valuable<FragmentFromBuilder<typeof Event>>,
    EventReceived: null
}>> = createEnumBuilder('EventSocketMessage', [[0, 'SubscriptionRequest', dynGetters(() => SubscriptionRequest)], [1, 'SubscriptionAccepted'], [2, 'Event', dynGetters(() => Event)], [3, 'EventReceived']])

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
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAccountKeyValueByIdAndKey', [['id', dynGetters(() => EvaluatesToAccountId)], ['key', dynGetters(() => EvaluatesToString)]])

export const FindAccountsByDomainName: ScaleStructBuilder<{
    domain_name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAccountsByDomainName', [['domain_name', dynGetters(() => EvaluatesToString)]])

export const FindAccountsByName: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAccountsByName', [['name', dynGetters(() => EvaluatesToString)]])

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
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAssetDefinitionKeyValueByIdAndKey', [['id', dynGetters(() => EvaluatesToDefinitionId)], ['key', dynGetters(() => EvaluatesToString)]])

export const FindAssetKeyValueByIdAndKey: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAssetId>,
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAssetKeyValueByIdAndKey', [['id', dynGetters(() => EvaluatesToAssetId)], ['key', dynGetters(() => EvaluatesToString)]])

export const FindAssetQuantityById: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAssetId>
}> = createStructBuilder('FindAssetQuantityById', [['id', dynGetters(() => EvaluatesToAssetId)]])

export const FindAssetsByAccountId: ScaleStructBuilder<{
    account_id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindAssetsByAccountId', [['account_id', dynGetters(() => EvaluatesToAccountId)]])

export const FindAssetsByAssetDefinitionId: ScaleStructBuilder<{
    asset_definition_id: FragmentFromBuilder<typeof EvaluatesToDefinitionId>
}> = createStructBuilder('FindAssetsByAssetDefinitionId', [['asset_definition_id', dynGetters(() => EvaluatesToDefinitionId)]])

export const FindAssetsByDomainName: ScaleStructBuilder<{
    domain_name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAssetsByDomainName', [['domain_name', dynGetters(() => EvaluatesToString)]])

export const FindAssetsByDomainNameAndAssetDefinitionId: ScaleStructBuilder<{
    domain_name: FragmentFromBuilder<typeof EvaluatesToString>,
    asset_definition_id: FragmentFromBuilder<typeof EvaluatesToDefinitionId>
}> = createStructBuilder('FindAssetsByDomainNameAndAssetDefinitionId', [['domain_name', dynGetters(() => EvaluatesToString)], ['asset_definition_id', dynGetters(() => EvaluatesToDefinitionId)]])

export const FindAssetsByName: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAssetsByName', [['name', dynGetters(() => EvaluatesToString)]])

export const FindDomainByName: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindDomainByName', [['name', dynGetters(() => EvaluatesToString)]])

export const FindDomainKeyValueByIdAndKey: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToString>,
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindDomainKeyValueByIdAndKey', [['name', dynGetters(() => EvaluatesToString)], ['key', dynGetters(() => EvaluatesToString)]])

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

export const IdBox: ScaleEnumBuilder<Enum<{
    AccountId: Valuable<FragmentFromBuilder<typeof AccountId>>,
    AssetId: Valuable<FragmentFromBuilder<typeof AssetId>>,
    AssetDefinitionId: Valuable<FragmentFromBuilder<typeof DefinitionId>>,
    DomainName: Valuable<FragmentFromBuilder<typeof Str>>,
    PeerId: Valuable<FragmentFromBuilder<typeof PeerId>>,
    WorldId: null
}>> = createEnumBuilder('IdBox', [[0, 'AccountId', dynGetters(() => AccountId)], [1, 'AssetId', dynGetters(() => AssetId)], [2, 'AssetDefinitionId', dynGetters(() => DefinitionId)], [3, 'DomainName', dynGetters(() => Str)], [4, 'PeerId', dynGetters(() => PeerId)], [5, 'WorldId']])

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
    Grant: Valuable<FragmentFromBuilder<typeof GrantBox>>
}>> = createEnumBuilder('Instruction', [[0, 'Register', dynGetters(() => RegisterBox)], [1, 'Unregister', dynGetters(() => UnregisterBox)], [2, 'Mint', dynGetters(() => MintBox)], [3, 'Burn', dynGetters(() => BurnBox)], [4, 'Transfer', dynGetters(() => TransferBox)], [5, 'If', dynGetters(() => IsiIf)], [6, 'Pair', dynGetters(() => Pair)], [7, 'Sequence', dynGetters(() => SequenceBox)], [8, 'Fail', dynGetters(() => FailBox)], [9, 'SetKeyValue', dynGetters(() => SetKeyValueBox)], [10, 'RemoveKeyValue', dynGetters(() => RemoveKeyValueBox)], [11, 'Grant', dynGetters(() => GrantBox)]])

export const InstructionExecutionFail: ScaleStructBuilder<{
    instruction: FragmentFromBuilder<typeof Instruction>,
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('InstructionExecutionFail', [['instruction', dynGetters(() => Instruction)], ['reason', dynGetters(() => Str)]])

export const IsiIf: ScaleStructBuilder<{
    condition: FragmentFromBuilder<typeof EvaluatesToBool>,
    then: FragmentFromBuilder<typeof Instruction>,
    otherwise: FragmentFromBuilder<typeof OptionInstruction>
}> = createStructBuilder('IsiIf', [['condition', dynGetters(() => EvaluatesToBool)], ['then', dynGetters(() => Instruction)], ['otherwise', dynGetters(() => OptionInstruction)]])

export const Less: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Less', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const Metadata: ScaleStructBuilder<{
    map: FragmentFromBuilder<typeof BTreeMapStringValue>
}> = createStructBuilder('Metadata', [['map', dynGetters(() => BTreeMapStringValue)]])

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

export const NewAccount: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof AccountId>,
    signatories: FragmentFromBuilder<typeof VecPublicKey>,
    metadata: FragmentFromBuilder<typeof Metadata>
}> = createStructBuilder('NewAccount', [['id', dynGetters(() => AccountId)], ['signatories', dynGetters(() => VecPublicKey)], ['metadata', dynGetters(() => Metadata)]])

export const Not: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof EvaluatesToBool>
}> = createStructBuilder('Not', [['expression', dynGetters(() => EvaluatesToBool)]])

export const NotPermittedFail: ScaleStructBuilder<{
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('NotPermittedFail', [['reason', dynGetters(() => Str)]])

export const OptionEntityType: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof EntityType>>> = createOptionBuilder('OptionEntityType', dynGetters(() => EntityType))

export const OptionHash: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Hash>>> = createOptionBuilder('OptionHash', dynGetters(() => Hash))

export const OptionInstruction: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Instruction>>> = createOptionBuilder('OptionInstruction', dynGetters(() => Instruction))

export const OptionU32: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof U32>>> = createOptionBuilder('OptionU32', dynGetters(() => U32))

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
    name: FragmentFromBuilder<typeof Str>,
    params: FragmentFromBuilder<typeof BTreeMapStringValue>
}> = createStructBuilder('PermissionToken', [['name', dynGetters(() => Str)], ['params', dynGetters(() => BTreeMapStringValue)]])

export const PipelineEvent: ScaleStructBuilder<{
    entity_type: FragmentFromBuilder<typeof EntityType>,
    status: FragmentFromBuilder<typeof Status>,
    hash: FragmentFromBuilder<typeof Hash>
}> = createStructBuilder('PipelineEvent', [['entity_type', dynGetters(() => EntityType)], ['status', dynGetters(() => Status)], ['hash', dynGetters(() => Hash)]])

export const PipelineEventFilter: ScaleStructBuilder<{
    entity: FragmentFromBuilder<typeof OptionEntityType>,
    hash: FragmentFromBuilder<typeof OptionHash>
}> = createStructBuilder('PipelineEventFilter', [['entity', dynGetters(() => OptionEntityType)], ['hash', dynGetters(() => OptionHash)]])

export const PublicKey: ScaleStructBuilder<{
    digest_function: FragmentFromBuilder<typeof Str>,
    payload: FragmentFromBuilder<typeof BytesVec>
}> = createStructBuilder('PublicKey', [['digest_function', dynGetters(() => Str)], ['payload', dynGetters(() => BytesVec)]])

export const QueryBox: ScaleEnumBuilder<Enum<{
    FindAllAccounts: Valuable<FragmentFromBuilder<typeof FindAllAccounts>>,
    FindAccountById: Valuable<FragmentFromBuilder<typeof FindAccountById>>,
    FindAccountKeyValueByIdAndKey: Valuable<FragmentFromBuilder<typeof FindAccountKeyValueByIdAndKey>>,
    FindAccountsByName: Valuable<FragmentFromBuilder<typeof FindAccountsByName>>,
    FindAccountsByDomainName: Valuable<FragmentFromBuilder<typeof FindAccountsByDomainName>>,
    FindAllAssets: Valuable<FragmentFromBuilder<typeof FindAllAssets>>,
    FindAllAssetsDefinitions: Valuable<FragmentFromBuilder<typeof FindAllAssetsDefinitions>>,
    FindAssetById: Valuable<FragmentFromBuilder<typeof FindAssetById>>,
    FindAssetsByName: Valuable<FragmentFromBuilder<typeof FindAssetsByName>>,
    FindAssetsByAccountId: Valuable<FragmentFromBuilder<typeof FindAssetsByAccountId>>,
    FindAssetsByAssetDefinitionId: Valuable<FragmentFromBuilder<typeof FindAssetsByAssetDefinitionId>>,
    FindAssetsByDomainName: Valuable<FragmentFromBuilder<typeof FindAssetsByDomainName>>,
    FindAssetsByDomainNameAndAssetDefinitionId: Valuable<FragmentFromBuilder<typeof FindAssetsByDomainNameAndAssetDefinitionId>>,
    FindAssetQuantityById: Valuable<FragmentFromBuilder<typeof FindAssetQuantityById>>,
    FindAssetKeyValueByIdAndKey: Valuable<FragmentFromBuilder<typeof FindAssetKeyValueByIdAndKey>>,
    FindAssetDefinitionKeyValueByIdAndKey: Valuable<FragmentFromBuilder<typeof FindAssetDefinitionKeyValueByIdAndKey>>,
    FindAllDomains: Valuable<FragmentFromBuilder<typeof FindAllDomains>>,
    FindDomainByName: Valuable<FragmentFromBuilder<typeof FindDomainByName>>,
    FindDomainKeyValueByIdAndKey: Valuable<FragmentFromBuilder<typeof FindDomainKeyValueByIdAndKey>>,
    FindAllPeers: Valuable<FragmentFromBuilder<typeof FindAllPeers>>,
    FindTransactionsByAccountId: Valuable<FragmentFromBuilder<typeof FindTransactionsByAccountId>>,
    FindTransactionByHash: Valuable<FragmentFromBuilder<typeof FindTransactionByHash>>,
    FindPermissionTokensByAccountId: Valuable<FragmentFromBuilder<typeof FindPermissionTokensByAccountId>>
}>> = createEnumBuilder('QueryBox', [[0, 'FindAllAccounts', dynGetters(() => FindAllAccounts)], [1, 'FindAccountById', dynGetters(() => FindAccountById)], [2, 'FindAccountKeyValueByIdAndKey', dynGetters(() => FindAccountKeyValueByIdAndKey)], [3, 'FindAccountsByName', dynGetters(() => FindAccountsByName)], [4, 'FindAccountsByDomainName', dynGetters(() => FindAccountsByDomainName)], [5, 'FindAllAssets', dynGetters(() => FindAllAssets)], [6, 'FindAllAssetsDefinitions', dynGetters(() => FindAllAssetsDefinitions)], [7, 'FindAssetById', dynGetters(() => FindAssetById)], [8, 'FindAssetsByName', dynGetters(() => FindAssetsByName)], [9, 'FindAssetsByAccountId', dynGetters(() => FindAssetsByAccountId)], [10, 'FindAssetsByAssetDefinitionId', dynGetters(() => FindAssetsByAssetDefinitionId)], [11, 'FindAssetsByDomainName', dynGetters(() => FindAssetsByDomainName)], [12, 'FindAssetsByDomainNameAndAssetDefinitionId', dynGetters(() => FindAssetsByDomainNameAndAssetDefinitionId)], [13, 'FindAssetQuantityById', dynGetters(() => FindAssetQuantityById)], [14, 'FindAssetKeyValueByIdAndKey', dynGetters(() => FindAssetKeyValueByIdAndKey)], [15, 'FindAssetDefinitionKeyValueByIdAndKey', dynGetters(() => FindAssetDefinitionKeyValueByIdAndKey)], [16, 'FindAllDomains', dynGetters(() => FindAllDomains)], [17, 'FindDomainByName', dynGetters(() => FindDomainByName)], [18, 'FindDomainKeyValueByIdAndKey', dynGetters(() => FindDomainKeyValueByIdAndKey)], [19, 'FindAllPeers', dynGetters(() => FindAllPeers)], [20, 'FindTransactionsByAccountId', dynGetters(() => FindTransactionsByAccountId)], [21, 'FindTransactionByHash', dynGetters(() => FindTransactionByHash)], [22, 'FindPermissionTokensByAccountId', dynGetters(() => FindPermissionTokensByAccountId)]])

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
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('RemoveKeyValueBox', [['object_id', dynGetters(() => EvaluatesToIdBox)], ['key', dynGetters(() => EvaluatesToString)]])

export const SequenceBox: ScaleStructBuilder<{
    instructions: FragmentFromBuilder<typeof VecInstruction>
}> = createStructBuilder('SequenceBox', [['instructions', dynGetters(() => VecInstruction)]])

export const SetBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('SetBox', [['object', dynGetters(() => EvaluatesToValue)]])

export const SetKeyValueBox: ScaleStructBuilder<{
    object_id: FragmentFromBuilder<typeof EvaluatesToIdBox>,
    key: FragmentFromBuilder<typeof EvaluatesToString>,
    value: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('SetKeyValueBox', [['object_id', dynGetters(() => EvaluatesToIdBox)], ['key', dynGetters(() => EvaluatesToString)], ['value', dynGetters(() => EvaluatesToValue)]])

export const Signature: ScaleStructBuilder<{
    public_key: FragmentFromBuilder<typeof PublicKey>,
    signature: FragmentFromBuilder<typeof BytesVec>
}> = createStructBuilder('Signature', [['public_key', dynGetters(() => PublicKey)], ['signature', dynGetters(() => BytesVec)]])

export const SignatureCheckCondition: typeof EvaluatesToBool = dynGetters(() => EvaluatesToBool)

export const SignaturesOfTransactionPayload: ScaleStructBuilder<{
    signatures: FragmentFromBuilder<typeof BTreeMapPublicKeySignature>
}> = createStructBuilder('SignaturesOfTransactionPayload', [['signatures', dynGetters(() => BTreeMapPublicKeySignature)]])

export const SignatureVerificationFailTransactionPayload: ScaleStructBuilder<{
    signature: FragmentFromBuilder<typeof Signature>,
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('SignatureVerificationFailTransactionPayload', [['signature', dynGetters(() => Signature)], ['reason', dynGetters(() => Str)]])

export const SignedQueryRequest: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof QueryPayload>,
    signature: FragmentFromBuilder<typeof Signature>
}> = createStructBuilder('SignedQueryRequest', [['payload', dynGetters(() => QueryPayload)], ['signature', dynGetters(() => Signature)]])

export const Status: ScaleEnumBuilder<Enum<{
    Validating: null,
    Rejected: Valuable<FragmentFromBuilder<typeof RejectionReason>>,
    Committed: null
}>> = createEnumBuilder('Status', [[0, 'Validating'], [1, 'Rejected', dynGetters(() => RejectionReason)], [2, 'Committed']])

export const SubscriptionRequest: typeof EventFilter = dynGetters(() => EventFilter)

export const Subtract: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Subtract', [['left', dynGetters(() => EvaluatesToU32)], ['right', dynGetters(() => EvaluatesToU32)]])

export const Transaction: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof TransactionPayload>,
    signatures: FragmentFromBuilder<typeof BTreeSetSignature>
}> = createStructBuilder('Transaction', [['payload', dynGetters(() => TransactionPayload)], ['signatures', dynGetters(() => BTreeSetSignature)]])

export const TransactionPayload: ScaleStructBuilder<{
    account_id: FragmentFromBuilder<typeof AccountId>,
    instructions: FragmentFromBuilder<typeof VecInstruction>,
    creation_time: FragmentFromBuilder<typeof U64>,
    time_to_live_ms: FragmentFromBuilder<typeof U64>,
    nonce: FragmentFromBuilder<typeof OptionU32>,
    metadata: FragmentFromBuilder<typeof BTreeMapStringValue>
}> = createStructBuilder('TransactionPayload', [['account_id', dynGetters(() => AccountId)], ['instructions', dynGetters(() => VecInstruction)], ['creation_time', dynGetters(() => U64)], ['time_to_live_ms', dynGetters(() => U64)], ['nonce', dynGetters(() => OptionU32)], ['metadata', dynGetters(() => BTreeMapStringValue)]])

export const TransactionRejectionReason: ScaleEnumBuilder<Enum<{
    NotPermitted: Valuable<FragmentFromBuilder<typeof NotPermittedFail>>,
    UnsatisfiedSignatureCondition: Valuable<FragmentFromBuilder<typeof UnsatisfiedSignatureConditionFail>>,
    InstructionExecution: Valuable<FragmentFromBuilder<typeof InstructionExecutionFail>>,
    SignatureVerification: Valuable<FragmentFromBuilder<typeof SignatureVerificationFailTransactionPayload>>,
    UnexpectedGenesisAccountSignature: null
}>> = createEnumBuilder('TransactionRejectionReason', [[0, 'NotPermitted', dynGetters(() => NotPermittedFail)], [1, 'UnsatisfiedSignatureCondition', dynGetters(() => UnsatisfiedSignatureConditionFail)], [2, 'InstructionExecution', dynGetters(() => InstructionExecutionFail)], [3, 'SignatureVerification', dynGetters(() => SignatureVerificationFailTransactionPayload)], [4, 'UnexpectedGenesisAccountSignature']])

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

export const Value: ScaleEnumBuilder<Enum<{
    U32: Valuable<FragmentFromBuilder<typeof U32>>,
    U128: Valuable<FragmentFromBuilder<typeof U128>>,
    Bool: Valuable<FragmentFromBuilder<typeof Bool>>,
    String: Valuable<FragmentFromBuilder<typeof Str>>,
    Fixed: Valuable<FragmentFromBuilder<typeof Fixed>>,
    Vec: Valuable<FragmentFromBuilder<typeof VecValue>>,
    Id: Valuable<FragmentFromBuilder<typeof IdBox>>,
    Identifiable: Valuable<FragmentFromBuilder<typeof IdentifiableBox>>,
    PublicKey: Valuable<FragmentFromBuilder<typeof PublicKey>>,
    Parameter: Valuable<FragmentFromBuilder<typeof Parameter>>,
    SignatureCheckCondition: Valuable<FragmentFromBuilder<typeof SignatureCheckCondition>>,
    TransactionValue: Valuable<FragmentFromBuilder<typeof TransactionValue>>,
    PermissionToken: Valuable<FragmentFromBuilder<typeof PermissionToken>>,
    Hash: Valuable<FragmentFromBuilder<typeof Hash>>
}>> = createEnumBuilder('Value', [[0, 'U32', dynGetters(() => U32)], [1, 'U128', dynGetters(() => U128)], [2, 'Bool', dynGetters(() => Bool)], [3, 'String', dynGetters(() => Str)], [4, 'Fixed', dynGetters(() => Fixed)], [5, 'Vec', dynGetters(() => VecValue)], [6, 'Id', dynGetters(() => IdBox)], [7, 'Identifiable', dynGetters(() => IdentifiableBox)], [8, 'PublicKey', dynGetters(() => PublicKey)], [9, 'Parameter', dynGetters(() => Parameter)], [10, 'SignatureCheckCondition', dynGetters(() => SignatureCheckCondition)], [11, 'TransactionValue', dynGetters(() => TransactionValue)], [12, 'PermissionToken', dynGetters(() => PermissionToken)], [13, 'Hash', dynGetters(() => Hash)]])

export const VecGenesisTransaction: ScaleArrayBuilder<FragmentFromBuilder<typeof GenesisTransaction>[]> = createVecBuilder('VecGenesisTransaction', dynGetters(() => GenesisTransaction))

export const VecInstruction: ScaleArrayBuilder<FragmentFromBuilder<typeof Instruction>[]> = createVecBuilder('VecInstruction', dynGetters(() => Instruction))

export const VecPermissionToken: ScaleArrayBuilder<FragmentFromBuilder<typeof PermissionToken>[]> = createVecBuilder('VecPermissionToken', dynGetters(() => PermissionToken))

export const VecPublicKey: ScaleArrayBuilder<FragmentFromBuilder<typeof PublicKey>[]> = createVecBuilder('VecPublicKey', dynGetters(() => PublicKey))

export const VecSignature: ScaleArrayBuilder<FragmentFromBuilder<typeof Signature>[]> = createVecBuilder('VecSignature', dynGetters(() => Signature))

export const VecValue: ScaleArrayBuilder<FragmentFromBuilder<typeof Value>[]> = createVecBuilder('VecValue', dynGetters(() => Value))

export const VersionedEventSocketMessage: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedEventSocketMessageV1>>
}>> = createEnumBuilder('VersionedEventSocketMessage', [[1, 'V1', dynGetters(() => VersionedEventSocketMessageV1)]])

export const VersionedEventSocketMessageV1: typeof EventSocketMessage = dynGetters(() => EventSocketMessage)

export const VersionedQueryResult: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedQueryResultV1>>
}>> = createEnumBuilder('VersionedQueryResult', [[1, 'V1', dynGetters(() => VersionedQueryResultV1)]])

export const VersionedQueryResultV1: typeof QueryResult = dynGetters(() => QueryResult)

export const VersionedRejectedTransaction: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedRejectedTransactionV1>>
}>> = createEnumBuilder('VersionedRejectedTransaction', [[1, 'V1', dynGetters(() => VersionedRejectedTransactionV1)]])

export const VersionedRejectedTransactionV1: typeof RejectedTransaction = dynGetters(() => RejectedTransaction)

export const VersionedSignedQueryRequest: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedSignedQueryRequestV1>>
}>> = createEnumBuilder('VersionedSignedQueryRequest', [[1, 'V1', dynGetters(() => VersionedSignedQueryRequestV1)]])

export const VersionedSignedQueryRequestV1: typeof SignedQueryRequest = dynGetters(() => SignedQueryRequest)

export const VersionedTransaction: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedTransactionV1>>
}>> = createEnumBuilder('VersionedTransaction', [[1, 'V1', dynGetters(() => VersionedTransactionV1)]])

export const VersionedTransactionV1: typeof Transaction = dynGetters(() => Transaction)

export const Where: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof EvaluatesToValue>,
    values: FragmentFromBuilder<typeof BTreeMapStringEvaluatesToValue>
}> = createStructBuilder('Where', [['expression', dynGetters(() => EvaluatesToValue)], ['values', dynGetters(() => BTreeMapStringEvaluatesToValue)]])
