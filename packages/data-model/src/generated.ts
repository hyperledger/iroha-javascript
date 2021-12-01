import { Bool, BytesVec, Compact, Enum, FragmentFromBuilder, Option, ScaleArrayBuilder, ScaleEnumBuilder, ScaleMapBuilder, ScaleSetBuilder, ScaleStructBuilder, Str, U128, U32, U64, Valuable, createAliasBuilder, createBytesArrayBuilder, createEnumBuilder, createMapBuilder, createOptionBuilder, createSetBuilder, createStructBuilder, createVecBuilder, dynBuilder } from '@scale-codec/definition-runtime'

export const Account: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof AccountId>,
    assets: FragmentFromBuilder<typeof BTreeMapAssetIdAsset>,
    signatories: FragmentFromBuilder<typeof VecPublicKey>,
    permission_tokens: FragmentFromBuilder<typeof BTreeSetPermissionToken>,
    signature_check_condition: FragmentFromBuilder<typeof SignatureCheckCondition>,
    metadata: FragmentFromBuilder<typeof Metadata>
}> = createStructBuilder('Account', [['id', dynBuilder(() => AccountId)], ['assets', dynBuilder(() => BTreeMapAssetIdAsset)], ['signatories', dynBuilder(() => VecPublicKey)], ['permission_tokens', dynBuilder(() => BTreeSetPermissionToken)], ['signature_check_condition', dynBuilder(() => SignatureCheckCondition)], ['metadata', dynBuilder(() => Metadata)]])

export const AccountId: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Str>,
    domain_name: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('AccountId', [['name', dynBuilder(() => Str)], ['domain_name', dynBuilder(() => Str)]])

export const Add: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Add', [['left', dynBuilder(() => EvaluatesToU32)], ['right', dynBuilder(() => EvaluatesToU32)]])

export const And: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToBool>,
    right: FragmentFromBuilder<typeof EvaluatesToBool>
}> = createStructBuilder('And', [['left', dynBuilder(() => EvaluatesToBool)], ['right', dynBuilder(() => EvaluatesToBool)]])

export const ArrayU8L32 = createBytesArrayBuilder('ArrayU8L32', 32)

export const Asset: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof AssetId>,
    value: FragmentFromBuilder<typeof AssetValue>
}> = createStructBuilder('Asset', [['id', dynBuilder(() => AssetId)], ['value', dynBuilder(() => AssetValue)]])

export const AssetDefinition: ScaleStructBuilder<{
    value_type: FragmentFromBuilder<typeof AssetValueType>,
    id: FragmentFromBuilder<typeof DefinitionId>,
    metadata: FragmentFromBuilder<typeof Metadata>,
    mintable: FragmentFromBuilder<typeof Bool>
}> = createStructBuilder('AssetDefinition', [['value_type', dynBuilder(() => AssetValueType)], ['id', dynBuilder(() => DefinitionId)], ['metadata', dynBuilder(() => Metadata)], ['mintable', dynBuilder(() => Bool)]])

export const AssetDefinitionEntry: ScaleStructBuilder<{
    definition: FragmentFromBuilder<typeof AssetDefinition>,
    registered_by: FragmentFromBuilder<typeof AccountId>
}> = createStructBuilder('AssetDefinitionEntry', [['definition', dynBuilder(() => AssetDefinition)], ['registered_by', dynBuilder(() => AccountId)]])

export const AssetId: ScaleStructBuilder<{
    definition_id: FragmentFromBuilder<typeof DefinitionId>,
    account_id: FragmentFromBuilder<typeof AccountId>
}> = createStructBuilder('AssetId', [['definition_id', dynBuilder(() => DefinitionId)], ['account_id', dynBuilder(() => AccountId)]])

export const AssetValue: ScaleEnumBuilder<Enum<{
    Quantity: Valuable<FragmentFromBuilder<typeof U32>>,
    BigQuantity: Valuable<FragmentFromBuilder<typeof U128>>,
    Fixed: Valuable<FragmentFromBuilder<typeof Fixed>>,
    Store: Valuable<FragmentFromBuilder<typeof Metadata>>
}>> = createEnumBuilder('AssetValue', [[0, 'Quantity', dynBuilder(() => U32)], [1, 'BigQuantity', dynBuilder(() => U128)], [2, 'Fixed', dynBuilder(() => Fixed)], [3, 'Store', dynBuilder(() => Metadata)]])

export const AssetValueType: ScaleEnumBuilder<Enum<{
    Quantity: null,
    BigQuantity: null,
    Fixed: null,
    Store: null
}>> = createEnumBuilder('AssetValueType', [[0, 'Quantity'], [1, 'BigQuantity'], [2, 'Fixed'], [3, 'Store']])

export const BlockRejectionReason: ScaleEnumBuilder<Enum<{
    ConsensusBlockRejection: null
}>> = createEnumBuilder('BlockRejectionReason', [[0, 'ConsensusBlockRejection']])

export const BTreeMapAccountIdAccount: ScaleMapBuilder<Map<FragmentFromBuilder<typeof AccountId>, FragmentFromBuilder<typeof Account>>> = createMapBuilder('BTreeMapAccountIdAccount', dynBuilder(() => AccountId), dynBuilder(() => Account))

export const BTreeMapAssetIdAsset: ScaleMapBuilder<Map<FragmentFromBuilder<typeof AssetId>, FragmentFromBuilder<typeof Asset>>> = createMapBuilder('BTreeMapAssetIdAsset', dynBuilder(() => AssetId), dynBuilder(() => Asset))

export const BTreeMapDefinitionIdAssetDefinitionEntry: ScaleMapBuilder<Map<FragmentFromBuilder<typeof DefinitionId>, FragmentFromBuilder<typeof AssetDefinitionEntry>>> = createMapBuilder('BTreeMapDefinitionIdAssetDefinitionEntry', dynBuilder(() => DefinitionId), dynBuilder(() => AssetDefinitionEntry))

export const BTreeMapPublicKeySignature: ScaleMapBuilder<Map<FragmentFromBuilder<typeof PublicKey>, FragmentFromBuilder<typeof Signature>>> = createMapBuilder('BTreeMapPublicKeySignature', dynBuilder(() => PublicKey), dynBuilder(() => Signature))

export const BTreeMapStringEvaluatesToValue: ScaleMapBuilder<Map<FragmentFromBuilder<typeof Str>, FragmentFromBuilder<typeof EvaluatesToValue>>> = createMapBuilder('BTreeMapStringEvaluatesToValue', dynBuilder(() => Str), dynBuilder(() => EvaluatesToValue))

export const BTreeMapStringValue: ScaleMapBuilder<Map<FragmentFromBuilder<typeof Str>, FragmentFromBuilder<typeof Value>>> = createMapBuilder('BTreeMapStringValue', dynBuilder(() => Str), dynBuilder(() => Value))

export const BTreeSetPermissionToken: ScaleSetBuilder<Set<FragmentFromBuilder<typeof PermissionToken>>> = createSetBuilder('BTreeSetPermissionToken', dynBuilder(() => PermissionToken))

export const BTreeSetSignature: ScaleSetBuilder<Set<FragmentFromBuilder<typeof Signature>>> = createSetBuilder('BTreeSetSignature', dynBuilder(() => Signature))

export const BurnBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('BurnBox', [['object', dynBuilder(() => EvaluatesToValue)], ['destination_id', dynBuilder(() => EvaluatesToIdBox)]])

export const Contains: ScaleStructBuilder<{
    collection: FragmentFromBuilder<typeof EvaluatesToVecValue>,
    element: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('Contains', [['collection', dynBuilder(() => EvaluatesToVecValue)], ['element', dynBuilder(() => EvaluatesToValue)]])

export const ContainsAll: ScaleStructBuilder<{
    collection: FragmentFromBuilder<typeof EvaluatesToVecValue>,
    elements: FragmentFromBuilder<typeof EvaluatesToVecValue>
}> = createStructBuilder('ContainsAll', [['collection', dynBuilder(() => EvaluatesToVecValue)], ['elements', dynBuilder(() => EvaluatesToVecValue)]])

export const ContainsAny: ScaleStructBuilder<{
    collection: FragmentFromBuilder<typeof EvaluatesToVecValue>,
    elements: FragmentFromBuilder<typeof EvaluatesToVecValue>
}> = createStructBuilder('ContainsAny', [['collection', dynBuilder(() => EvaluatesToVecValue)], ['elements', dynBuilder(() => EvaluatesToVecValue)]])

export const ContextValue: ScaleStructBuilder<{
    value_name: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('ContextValue', [['value_name', dynBuilder(() => Str)]])

import { Void as DataEvent } from '@scale-codec/definition-runtime'
export { DataEvent }

import { Void as DataEventFilter } from '@scale-codec/definition-runtime'
export { DataEventFilter }

export const DefinitionId: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Str>,
    domain_name: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('DefinitionId', [['name', dynBuilder(() => Str)], ['domain_name', dynBuilder(() => Str)]])

export const Divide: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Divide', [['left', dynBuilder(() => EvaluatesToU32)], ['right', dynBuilder(() => EvaluatesToU32)]])

export const Domain: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Str>,
    accounts: FragmentFromBuilder<typeof BTreeMapAccountIdAccount>,
    asset_definitions: FragmentFromBuilder<typeof BTreeMapDefinitionIdAssetDefinitionEntry>,
    metadata: FragmentFromBuilder<typeof Metadata>
}> = createStructBuilder('Domain', [['name', dynBuilder(() => Str)], ['accounts', dynBuilder(() => BTreeMapAccountIdAccount)], ['asset_definitions', dynBuilder(() => BTreeMapDefinitionIdAssetDefinitionEntry)], ['metadata', dynBuilder(() => Metadata)]])

export const EntityType: ScaleEnumBuilder<Enum<{
    Block: null,
    Transaction: null
}>> = createEnumBuilder('EntityType', [[0, 'Block'], [1, 'Transaction']])

export const Equal: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToValue>,
    right: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('Equal', [['left', dynBuilder(() => EvaluatesToValue)], ['right', dynBuilder(() => EvaluatesToValue)]])

export const EvaluatesToAccountId: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToAccountId', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToAssetId: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToAssetId', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToBool: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToBool', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToDefinitionId: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToDefinitionId', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToHash: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToHash', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToIdBox: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToIdBox', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToIdentifiableBox: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToIdentifiableBox', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToString: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToString', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToU32: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToU32', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToValue: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToValue', [['expression', dynBuilder(() => Expression)]])

export const EvaluatesToVecValue: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof Expression>
}> = createStructBuilder('EvaluatesToVecValue', [['expression', dynBuilder(() => Expression)]])

export const Event: ScaleEnumBuilder<Enum<{
    Pipeline: Valuable<FragmentFromBuilder<typeof PipelineEvent>>,
    Data: Valuable<FragmentFromBuilder<typeof DataEvent>>
}>> = createEnumBuilder('Event', [[0, 'Pipeline', dynBuilder(() => PipelineEvent)], [1, 'Data', dynBuilder(() => DataEvent)]])

export const EventFilter: ScaleEnumBuilder<Enum<{
    Pipeline: Valuable<FragmentFromBuilder<typeof PipelineEventFilter>>,
    Data: Valuable<FragmentFromBuilder<typeof DataEventFilter>>
}>> = createEnumBuilder('EventFilter', [[0, 'Pipeline', dynBuilder(() => PipelineEventFilter)], [1, 'Data', dynBuilder(() => DataEventFilter)]])

export const EventSocketMessage: ScaleEnumBuilder<Enum<{
    SubscriptionRequest: Valuable<FragmentFromBuilder<typeof SubscriptionRequest>>,
    SubscriptionAccepted: null,
    Event: Valuable<FragmentFromBuilder<typeof Event>>,
    EventReceived: null
}>> = createEnumBuilder('EventSocketMessage', [[0, 'SubscriptionRequest', dynBuilder(() => SubscriptionRequest)], [1, 'SubscriptionAccepted'], [2, 'Event', dynBuilder(() => Event)], [3, 'EventReceived']])

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
}>> = createEnumBuilder('Expression', [[0, 'Add', dynBuilder(() => Add)], [1, 'Subtract', dynBuilder(() => Subtract)], [2, 'Multiply', dynBuilder(() => Multiply)], [3, 'Divide', dynBuilder(() => Divide)], [4, 'Mod', dynBuilder(() => Mod)], [5, 'RaiseTo', dynBuilder(() => RaiseTo)], [6, 'Greater', dynBuilder(() => Greater)], [7, 'Less', dynBuilder(() => Less)], [8, 'Equal', dynBuilder(() => Equal)], [9, 'Not', dynBuilder(() => Not)], [10, 'And', dynBuilder(() => And)], [11, 'Or', dynBuilder(() => Or)], [12, 'If', dynBuilder(() => ExpressionIf)], [13, 'Raw', dynBuilder(() => Value)], [14, 'Query', dynBuilder(() => QueryBox)], [15, 'Contains', dynBuilder(() => Contains)], [16, 'ContainsAll', dynBuilder(() => ContainsAll)], [17, 'ContainsAny', dynBuilder(() => ContainsAny)], [18, 'Where', dynBuilder(() => Where)], [19, 'ContextValue', dynBuilder(() => ContextValue)]])

export const ExpressionIf: ScaleStructBuilder<{
    condition: FragmentFromBuilder<typeof EvaluatesToBool>,
    then_expression: FragmentFromBuilder<typeof EvaluatesToValue>,
    else_expression: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('ExpressionIf', [['condition', dynBuilder(() => EvaluatesToBool)], ['then_expression', dynBuilder(() => EvaluatesToValue)], ['else_expression', dynBuilder(() => EvaluatesToValue)]])

export const FailBox: ScaleStructBuilder<{
    message: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('FailBox', [['message', dynBuilder(() => Str)]])

export const FindAccountById: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindAccountById', [['id', dynBuilder(() => EvaluatesToAccountId)]])

export const FindAccountKeyValueByIdAndKey: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAccountId>,
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAccountKeyValueByIdAndKey', [['id', dynBuilder(() => EvaluatesToAccountId)], ['key', dynBuilder(() => EvaluatesToString)]])

export const FindAccountsByDomainName: ScaleStructBuilder<{
    domain_name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAccountsByDomainName', [['domain_name', dynBuilder(() => EvaluatesToString)]])

export const FindAccountsByName: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAccountsByName', [['name', dynBuilder(() => EvaluatesToString)]])

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
}> = createStructBuilder('FindAssetById', [['id', dynBuilder(() => EvaluatesToAssetId)]])

export const FindAssetDefinitionKeyValueByIdAndKey: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToDefinitionId>,
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAssetDefinitionKeyValueByIdAndKey', [['id', dynBuilder(() => EvaluatesToDefinitionId)], ['key', dynBuilder(() => EvaluatesToString)]])

export const FindAssetKeyValueByIdAndKey: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAssetId>,
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAssetKeyValueByIdAndKey', [['id', dynBuilder(() => EvaluatesToAssetId)], ['key', dynBuilder(() => EvaluatesToString)]])

export const FindAssetQuantityById: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAssetId>
}> = createStructBuilder('FindAssetQuantityById', [['id', dynBuilder(() => EvaluatesToAssetId)]])

export const FindAssetsByAccountId: ScaleStructBuilder<{
    account_id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindAssetsByAccountId', [['account_id', dynBuilder(() => EvaluatesToAccountId)]])

export const FindAssetsByAssetDefinitionId: ScaleStructBuilder<{
    asset_definition_id: FragmentFromBuilder<typeof EvaluatesToDefinitionId>
}> = createStructBuilder('FindAssetsByAssetDefinitionId', [['asset_definition_id', dynBuilder(() => EvaluatesToDefinitionId)]])

export const FindAssetsByDomainName: ScaleStructBuilder<{
    domain_name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAssetsByDomainName', [['domain_name', dynBuilder(() => EvaluatesToString)]])

export const FindAssetsByDomainNameAndAssetDefinitionId: ScaleStructBuilder<{
    domain_name: FragmentFromBuilder<typeof EvaluatesToString>,
    asset_definition_id: FragmentFromBuilder<typeof EvaluatesToDefinitionId>
}> = createStructBuilder('FindAssetsByDomainNameAndAssetDefinitionId', [['domain_name', dynBuilder(() => EvaluatesToString)], ['asset_definition_id', dynBuilder(() => EvaluatesToDefinitionId)]])

export const FindAssetsByName: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindAssetsByName', [['name', dynBuilder(() => EvaluatesToString)]])

export const FindDomainByName: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindDomainByName', [['name', dynBuilder(() => EvaluatesToString)]])

export const FindDomainKeyValueByIdAndKey: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof EvaluatesToString>,
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('FindDomainKeyValueByIdAndKey', [['name', dynBuilder(() => EvaluatesToString)], ['key', dynBuilder(() => EvaluatesToString)]])

export const FindPermissionTokensByAccountId: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindPermissionTokensByAccountId', [['id', dynBuilder(() => EvaluatesToAccountId)]])

export const FindTransactionByHash: ScaleStructBuilder<{
    hash: FragmentFromBuilder<typeof EvaluatesToHash>
}> = createStructBuilder('FindTransactionByHash', [['hash', dynBuilder(() => EvaluatesToHash)]])

export const FindTransactionsByAccountId: ScaleStructBuilder<{
    account_id: FragmentFromBuilder<typeof EvaluatesToAccountId>
}> = createStructBuilder('FindTransactionsByAccountId', [['account_id', dynBuilder(() => EvaluatesToAccountId)]])

export const Fixed: typeof FixedPointI64 = createAliasBuilder('Fixed', dynBuilder(() => FixedPointI64))

import { FixedPointI64P9 as FixedPointI64 } from './fixed-point'
export { FixedPointI64 }

export const GenesisTransaction: ScaleStructBuilder<{
    isi: FragmentFromBuilder<typeof VecInstruction>
}> = createStructBuilder('GenesisTransaction', [['isi', dynBuilder(() => VecInstruction)]])

export const GrantBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('GrantBox', [['object', dynBuilder(() => EvaluatesToValue)], ['destination_id', dynBuilder(() => EvaluatesToIdBox)]])

export const Greater: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Greater', [['left', dynBuilder(() => EvaluatesToU32)], ['right', dynBuilder(() => EvaluatesToU32)]])

export const Hash: typeof ArrayU8L32 = createAliasBuilder('Hash', dynBuilder(() => ArrayU8L32))

export const IdBox: ScaleEnumBuilder<Enum<{
    AccountId: Valuable<FragmentFromBuilder<typeof AccountId>>,
    AssetId: Valuable<FragmentFromBuilder<typeof AssetId>>,
    AssetDefinitionId: Valuable<FragmentFromBuilder<typeof DefinitionId>>,
    DomainName: Valuable<FragmentFromBuilder<typeof Str>>,
    PeerId: Valuable<FragmentFromBuilder<typeof PeerId>>,
    WorldId: null
}>> = createEnumBuilder('IdBox', [[0, 'AccountId', dynBuilder(() => AccountId)], [1, 'AssetId', dynBuilder(() => AssetId)], [2, 'AssetDefinitionId', dynBuilder(() => DefinitionId)], [3, 'DomainName', dynBuilder(() => Str)], [4, 'PeerId', dynBuilder(() => PeerId)], [5, 'WorldId']])

export const IdentifiableBox: ScaleEnumBuilder<Enum<{
    Account: Valuable<FragmentFromBuilder<typeof Account>>,
    NewAccount: Valuable<FragmentFromBuilder<typeof NewAccount>>,
    Asset: Valuable<FragmentFromBuilder<typeof Asset>>,
    AssetDefinition: Valuable<FragmentFromBuilder<typeof AssetDefinition>>,
    Domain: Valuable<FragmentFromBuilder<typeof Domain>>,
    Peer: Valuable<FragmentFromBuilder<typeof Peer>>,
    World: null
}>> = createEnumBuilder('IdentifiableBox', [[0, 'Account', dynBuilder(() => Account)], [1, 'NewAccount', dynBuilder(() => NewAccount)], [2, 'Asset', dynBuilder(() => Asset)], [3, 'AssetDefinition', dynBuilder(() => AssetDefinition)], [4, 'Domain', dynBuilder(() => Domain)], [5, 'Peer', dynBuilder(() => Peer)], [6, 'World']])

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
}>> = createEnumBuilder('Instruction', [[0, 'Register', dynBuilder(() => RegisterBox)], [1, 'Unregister', dynBuilder(() => UnregisterBox)], [2, 'Mint', dynBuilder(() => MintBox)], [3, 'Burn', dynBuilder(() => BurnBox)], [4, 'Transfer', dynBuilder(() => TransferBox)], [5, 'If', dynBuilder(() => IsiIf)], [6, 'Pair', dynBuilder(() => Pair)], [7, 'Sequence', dynBuilder(() => SequenceBox)], [8, 'Fail', dynBuilder(() => FailBox)], [9, 'SetKeyValue', dynBuilder(() => SetKeyValueBox)], [10, 'RemoveKeyValue', dynBuilder(() => RemoveKeyValueBox)], [11, 'Grant', dynBuilder(() => GrantBox)]])

export const InstructionExecutionFail: ScaleStructBuilder<{
    instruction: FragmentFromBuilder<typeof Instruction>,
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('InstructionExecutionFail', [['instruction', dynBuilder(() => Instruction)], ['reason', dynBuilder(() => Str)]])

export const IsiIf: ScaleStructBuilder<{
    condition: FragmentFromBuilder<typeof EvaluatesToBool>,
    then: FragmentFromBuilder<typeof Instruction>,
    otherwise: FragmentFromBuilder<typeof OptionInstruction>
}> = createStructBuilder('IsiIf', [['condition', dynBuilder(() => EvaluatesToBool)], ['then', dynBuilder(() => Instruction)], ['otherwise', dynBuilder(() => OptionInstruction)]])

export const Less: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Less', [['left', dynBuilder(() => EvaluatesToU32)], ['right', dynBuilder(() => EvaluatesToU32)]])

export const Metadata: ScaleStructBuilder<{
    map: FragmentFromBuilder<typeof BTreeMapStringValue>
}> = createStructBuilder('Metadata', [['map', dynBuilder(() => BTreeMapStringValue)]])

export const MintBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('MintBox', [['object', dynBuilder(() => EvaluatesToValue)], ['destination_id', dynBuilder(() => EvaluatesToIdBox)]])

export const Mod: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Mod', [['left', dynBuilder(() => EvaluatesToU32)], ['right', dynBuilder(() => EvaluatesToU32)]])

export const Multiply: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Multiply', [['left', dynBuilder(() => EvaluatesToU32)], ['right', dynBuilder(() => EvaluatesToU32)]])

export const NewAccount: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof AccountId>,
    signatories: FragmentFromBuilder<typeof VecPublicKey>,
    metadata: FragmentFromBuilder<typeof Metadata>
}> = createStructBuilder('NewAccount', [['id', dynBuilder(() => AccountId)], ['signatories', dynBuilder(() => VecPublicKey)], ['metadata', dynBuilder(() => Metadata)]])

export const Not: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof EvaluatesToBool>
}> = createStructBuilder('Not', [['expression', dynBuilder(() => EvaluatesToBool)]])

export const NotPermittedFail: ScaleStructBuilder<{
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('NotPermittedFail', [['reason', dynBuilder(() => Str)]])

export const OptionEntityType: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof EntityType>>> = createOptionBuilder('OptionEntityType', dynBuilder(() => EntityType))

export const OptionHash: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Hash>>> = createOptionBuilder('OptionHash', dynBuilder(() => Hash))

export const OptionInstruction: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof Instruction>>> = createOptionBuilder('OptionInstruction', dynBuilder(() => Instruction))

export const OptionU32: ScaleEnumBuilder<Option<FragmentFromBuilder<typeof U32>>> = createOptionBuilder('OptionU32', dynBuilder(() => U32))

export const Or: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToBool>,
    right: FragmentFromBuilder<typeof EvaluatesToBool>
}> = createStructBuilder('Or', [['left', dynBuilder(() => EvaluatesToBool)], ['right', dynBuilder(() => EvaluatesToBool)]])

export const Pair: ScaleStructBuilder<{
    left_instruction: FragmentFromBuilder<typeof Instruction>,
    right_instruction: FragmentFromBuilder<typeof Instruction>
}> = createStructBuilder('Pair', [['left_instruction', dynBuilder(() => Instruction)], ['right_instruction', dynBuilder(() => Instruction)]])

export const Parameter: ScaleEnumBuilder<Enum<{
    MaximumFaultyPeersAmount: Valuable<FragmentFromBuilder<typeof U32>>,
    BlockTime: Valuable<FragmentFromBuilder<typeof U128>>,
    CommitTime: Valuable<FragmentFromBuilder<typeof U128>>,
    TransactionReceiptTime: Valuable<FragmentFromBuilder<typeof U128>>
}>> = createEnumBuilder('Parameter', [[0, 'MaximumFaultyPeersAmount', dynBuilder(() => U32)], [1, 'BlockTime', dynBuilder(() => U128)], [2, 'CommitTime', dynBuilder(() => U128)], [3, 'TransactionReceiptTime', dynBuilder(() => U128)]])

export const Peer: ScaleStructBuilder<{
    id: FragmentFromBuilder<typeof PeerId>
}> = createStructBuilder('Peer', [['id', dynBuilder(() => PeerId)]])

export const PeerId: ScaleStructBuilder<{
    address: FragmentFromBuilder<typeof Str>,
    public_key: FragmentFromBuilder<typeof PublicKey>
}> = createStructBuilder('PeerId', [['address', dynBuilder(() => Str)], ['public_key', dynBuilder(() => PublicKey)]])

export const PermissionToken: ScaleStructBuilder<{
    name: FragmentFromBuilder<typeof Str>,
    params: FragmentFromBuilder<typeof BTreeMapStringValue>
}> = createStructBuilder('PermissionToken', [['name', dynBuilder(() => Str)], ['params', dynBuilder(() => BTreeMapStringValue)]])

export const PipelineEvent: ScaleStructBuilder<{
    entity_type: FragmentFromBuilder<typeof EntityType>,
    status: FragmentFromBuilder<typeof Status>,
    hash: FragmentFromBuilder<typeof Hash>
}> = createStructBuilder('PipelineEvent', [['entity_type', dynBuilder(() => EntityType)], ['status', dynBuilder(() => Status)], ['hash', dynBuilder(() => Hash)]])

export const PipelineEventFilter: ScaleStructBuilder<{
    entity: FragmentFromBuilder<typeof OptionEntityType>,
    hash: FragmentFromBuilder<typeof OptionHash>
}> = createStructBuilder('PipelineEventFilter', [['entity', dynBuilder(() => OptionEntityType)], ['hash', dynBuilder(() => OptionHash)]])

export const PublicKey: ScaleStructBuilder<{
    digest_function: FragmentFromBuilder<typeof Str>,
    payload: FragmentFromBuilder<typeof BytesVec>
}> = createStructBuilder('PublicKey', [['digest_function', dynBuilder(() => Str)], ['payload', dynBuilder(() => BytesVec)]])

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
}>> = createEnumBuilder('QueryBox', [[0, 'FindAllAccounts', dynBuilder(() => FindAllAccounts)], [1, 'FindAccountById', dynBuilder(() => FindAccountById)], [2, 'FindAccountKeyValueByIdAndKey', dynBuilder(() => FindAccountKeyValueByIdAndKey)], [3, 'FindAccountsByName', dynBuilder(() => FindAccountsByName)], [4, 'FindAccountsByDomainName', dynBuilder(() => FindAccountsByDomainName)], [5, 'FindAllAssets', dynBuilder(() => FindAllAssets)], [6, 'FindAllAssetsDefinitions', dynBuilder(() => FindAllAssetsDefinitions)], [7, 'FindAssetById', dynBuilder(() => FindAssetById)], [8, 'FindAssetsByName', dynBuilder(() => FindAssetsByName)], [9, 'FindAssetsByAccountId', dynBuilder(() => FindAssetsByAccountId)], [10, 'FindAssetsByAssetDefinitionId', dynBuilder(() => FindAssetsByAssetDefinitionId)], [11, 'FindAssetsByDomainName', dynBuilder(() => FindAssetsByDomainName)], [12, 'FindAssetsByDomainNameAndAssetDefinitionId', dynBuilder(() => FindAssetsByDomainNameAndAssetDefinitionId)], [13, 'FindAssetQuantityById', dynBuilder(() => FindAssetQuantityById)], [14, 'FindAssetKeyValueByIdAndKey', dynBuilder(() => FindAssetKeyValueByIdAndKey)], [15, 'FindAssetDefinitionKeyValueByIdAndKey', dynBuilder(() => FindAssetDefinitionKeyValueByIdAndKey)], [16, 'FindAllDomains', dynBuilder(() => FindAllDomains)], [17, 'FindDomainByName', dynBuilder(() => FindDomainByName)], [18, 'FindDomainKeyValueByIdAndKey', dynBuilder(() => FindDomainKeyValueByIdAndKey)], [19, 'FindAllPeers', dynBuilder(() => FindAllPeers)], [20, 'FindTransactionsByAccountId', dynBuilder(() => FindTransactionsByAccountId)], [21, 'FindTransactionByHash', dynBuilder(() => FindTransactionByHash)], [22, 'FindPermissionTokensByAccountId', dynBuilder(() => FindPermissionTokensByAccountId)]])

export const QueryPayload: ScaleStructBuilder<{
    timestamp_ms: FragmentFromBuilder<typeof Compact>,
    query: FragmentFromBuilder<typeof QueryBox>,
    account_id: FragmentFromBuilder<typeof AccountId>
}> = createStructBuilder('QueryPayload', [['timestamp_ms', dynBuilder(() => Compact)], ['query', dynBuilder(() => QueryBox)], ['account_id', dynBuilder(() => AccountId)]])

export const QueryResult: typeof Value = createAliasBuilder('QueryResult', dynBuilder(() => Value))

export const RaiseTo: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('RaiseTo', [['left', dynBuilder(() => EvaluatesToU32)], ['right', dynBuilder(() => EvaluatesToU32)]])

export const RawGenesisBlock: ScaleStructBuilder<{
    transactions: FragmentFromBuilder<typeof VecGenesisTransaction>
}> = createStructBuilder('RawGenesisBlock', [['transactions', dynBuilder(() => VecGenesisTransaction)]])

export const RegisterBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToIdentifiableBox>
}> = createStructBuilder('RegisterBox', [['object', dynBuilder(() => EvaluatesToIdentifiableBox)]])

export const RejectedTransaction: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof TransactionPayload>,
    signatures: FragmentFromBuilder<typeof SignaturesOfTransactionPayload>,
    rejection_reason: FragmentFromBuilder<typeof TransactionRejectionReason>
}> = createStructBuilder('RejectedTransaction', [['payload', dynBuilder(() => TransactionPayload)], ['signatures', dynBuilder(() => SignaturesOfTransactionPayload)], ['rejection_reason', dynBuilder(() => TransactionRejectionReason)]])

export const RejectionReason: ScaleEnumBuilder<Enum<{
    Block: Valuable<FragmentFromBuilder<typeof BlockRejectionReason>>,
    Transaction: Valuable<FragmentFromBuilder<typeof TransactionRejectionReason>>
}>> = createEnumBuilder('RejectionReason', [[0, 'Block', dynBuilder(() => BlockRejectionReason)], [1, 'Transaction', dynBuilder(() => TransactionRejectionReason)]])

export const RemoveKeyValueBox: ScaleStructBuilder<{
    object_id: FragmentFromBuilder<typeof EvaluatesToIdBox>,
    key: FragmentFromBuilder<typeof EvaluatesToString>
}> = createStructBuilder('RemoveKeyValueBox', [['object_id', dynBuilder(() => EvaluatesToIdBox)], ['key', dynBuilder(() => EvaluatesToString)]])

export const SequenceBox: ScaleStructBuilder<{
    instructions: FragmentFromBuilder<typeof VecInstruction>
}> = createStructBuilder('SequenceBox', [['instructions', dynBuilder(() => VecInstruction)]])

export const SetBox: ScaleStructBuilder<{
    object: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('SetBox', [['object', dynBuilder(() => EvaluatesToValue)]])

export const SetKeyValueBox: ScaleStructBuilder<{
    object_id: FragmentFromBuilder<typeof EvaluatesToIdBox>,
    key: FragmentFromBuilder<typeof EvaluatesToString>,
    value: FragmentFromBuilder<typeof EvaluatesToValue>
}> = createStructBuilder('SetKeyValueBox', [['object_id', dynBuilder(() => EvaluatesToIdBox)], ['key', dynBuilder(() => EvaluatesToString)], ['value', dynBuilder(() => EvaluatesToValue)]])

export const Signature: ScaleStructBuilder<{
    public_key: FragmentFromBuilder<typeof PublicKey>,
    signature: FragmentFromBuilder<typeof BytesVec>
}> = createStructBuilder('Signature', [['public_key', dynBuilder(() => PublicKey)], ['signature', dynBuilder(() => BytesVec)]])

export const SignatureCheckCondition: typeof EvaluatesToBool = createAliasBuilder('SignatureCheckCondition', dynBuilder(() => EvaluatesToBool))

export const SignaturesOfTransactionPayload: ScaleStructBuilder<{
    signatures: FragmentFromBuilder<typeof BTreeMapPublicKeySignature>
}> = createStructBuilder('SignaturesOfTransactionPayload', [['signatures', dynBuilder(() => BTreeMapPublicKeySignature)]])

export const SignatureVerificationFailTransactionPayload: ScaleStructBuilder<{
    signature: FragmentFromBuilder<typeof Signature>,
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('SignatureVerificationFailTransactionPayload', [['signature', dynBuilder(() => Signature)], ['reason', dynBuilder(() => Str)]])

export const SignedQueryRequest: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof QueryPayload>,
    signature: FragmentFromBuilder<typeof Signature>
}> = createStructBuilder('SignedQueryRequest', [['payload', dynBuilder(() => QueryPayload)], ['signature', dynBuilder(() => Signature)]])

export const Status: ScaleEnumBuilder<Enum<{
    Validating: null,
    Rejected: Valuable<FragmentFromBuilder<typeof RejectionReason>>,
    Committed: null
}>> = createEnumBuilder('Status', [[0, 'Validating'], [1, 'Rejected', dynBuilder(() => RejectionReason)], [2, 'Committed']])

export const SubscriptionRequest: typeof EventFilter = createAliasBuilder('SubscriptionRequest', dynBuilder(() => EventFilter))

export const Subtract: ScaleStructBuilder<{
    left: FragmentFromBuilder<typeof EvaluatesToU32>,
    right: FragmentFromBuilder<typeof EvaluatesToU32>
}> = createStructBuilder('Subtract', [['left', dynBuilder(() => EvaluatesToU32)], ['right', dynBuilder(() => EvaluatesToU32)]])

export const Transaction: ScaleStructBuilder<{
    payload: FragmentFromBuilder<typeof TransactionPayload>,
    signatures: FragmentFromBuilder<typeof BTreeSetSignature>
}> = createStructBuilder('Transaction', [['payload', dynBuilder(() => TransactionPayload)], ['signatures', dynBuilder(() => BTreeSetSignature)]])

export const TransactionPayload: ScaleStructBuilder<{
    account_id: FragmentFromBuilder<typeof AccountId>,
    instructions: FragmentFromBuilder<typeof VecInstruction>,
    creation_time: FragmentFromBuilder<typeof U64>,
    time_to_live_ms: FragmentFromBuilder<typeof U64>,
    nonce: FragmentFromBuilder<typeof OptionU32>,
    metadata: FragmentFromBuilder<typeof BTreeMapStringValue>
}> = createStructBuilder('TransactionPayload', [['account_id', dynBuilder(() => AccountId)], ['instructions', dynBuilder(() => VecInstruction)], ['creation_time', dynBuilder(() => U64)], ['time_to_live_ms', dynBuilder(() => U64)], ['nonce', dynBuilder(() => OptionU32)], ['metadata', dynBuilder(() => BTreeMapStringValue)]])

export const TransactionRejectionReason: ScaleEnumBuilder<Enum<{
    NotPermitted: Valuable<FragmentFromBuilder<typeof NotPermittedFail>>,
    UnsatisfiedSignatureCondition: Valuable<FragmentFromBuilder<typeof UnsatisfiedSignatureConditionFail>>,
    InstructionExecution: Valuable<FragmentFromBuilder<typeof InstructionExecutionFail>>,
    SignatureVerification: Valuable<FragmentFromBuilder<typeof SignatureVerificationFailTransactionPayload>>,
    UnexpectedGenesisAccountSignature: null
}>> = createEnumBuilder('TransactionRejectionReason', [[0, 'NotPermitted', dynBuilder(() => NotPermittedFail)], [1, 'UnsatisfiedSignatureCondition', dynBuilder(() => UnsatisfiedSignatureConditionFail)], [2, 'InstructionExecution', dynBuilder(() => InstructionExecutionFail)], [3, 'SignatureVerification', dynBuilder(() => SignatureVerificationFailTransactionPayload)], [4, 'UnexpectedGenesisAccountSignature']])

export const TransactionValue: ScaleEnumBuilder<Enum<{
    Transaction: Valuable<FragmentFromBuilder<typeof VersionedTransaction>>,
    RejectedTransaction: Valuable<FragmentFromBuilder<typeof VersionedRejectedTransaction>>
}>> = createEnumBuilder('TransactionValue', [[0, 'Transaction', dynBuilder(() => VersionedTransaction)], [1, 'RejectedTransaction', dynBuilder(() => VersionedRejectedTransaction)]])

export const TransferBox: ScaleStructBuilder<{
    source_id: FragmentFromBuilder<typeof EvaluatesToIdBox>,
    object: FragmentFromBuilder<typeof EvaluatesToValue>,
    destination_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('TransferBox', [['source_id', dynBuilder(() => EvaluatesToIdBox)], ['object', dynBuilder(() => EvaluatesToValue)], ['destination_id', dynBuilder(() => EvaluatesToIdBox)]])

export const UnregisterBox: ScaleStructBuilder<{
    object_id: FragmentFromBuilder<typeof EvaluatesToIdBox>
}> = createStructBuilder('UnregisterBox', [['object_id', dynBuilder(() => EvaluatesToIdBox)]])

export const UnsatisfiedSignatureConditionFail: ScaleStructBuilder<{
    reason: FragmentFromBuilder<typeof Str>
}> = createStructBuilder('UnsatisfiedSignatureConditionFail', [['reason', dynBuilder(() => Str)]])

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
}>> = createEnumBuilder('Value', [[0, 'U32', dynBuilder(() => U32)], [1, 'U128', dynBuilder(() => U128)], [2, 'Bool', dynBuilder(() => Bool)], [3, 'String', dynBuilder(() => Str)], [4, 'Fixed', dynBuilder(() => Fixed)], [5, 'Vec', dynBuilder(() => VecValue)], [6, 'Id', dynBuilder(() => IdBox)], [7, 'Identifiable', dynBuilder(() => IdentifiableBox)], [8, 'PublicKey', dynBuilder(() => PublicKey)], [9, 'Parameter', dynBuilder(() => Parameter)], [10, 'SignatureCheckCondition', dynBuilder(() => SignatureCheckCondition)], [11, 'TransactionValue', dynBuilder(() => TransactionValue)], [12, 'PermissionToken', dynBuilder(() => PermissionToken)], [13, 'Hash', dynBuilder(() => Hash)]])

export const VecGenesisTransaction: ScaleArrayBuilder<FragmentFromBuilder<typeof GenesisTransaction>[]> = createVecBuilder('VecGenesisTransaction', dynBuilder(() => GenesisTransaction))

export const VecInstruction: ScaleArrayBuilder<FragmentFromBuilder<typeof Instruction>[]> = createVecBuilder('VecInstruction', dynBuilder(() => Instruction))

export const VecPermissionToken: ScaleArrayBuilder<FragmentFromBuilder<typeof PermissionToken>[]> = createVecBuilder('VecPermissionToken', dynBuilder(() => PermissionToken))

export const VecPublicKey: ScaleArrayBuilder<FragmentFromBuilder<typeof PublicKey>[]> = createVecBuilder('VecPublicKey', dynBuilder(() => PublicKey))

export const VecSignature: ScaleArrayBuilder<FragmentFromBuilder<typeof Signature>[]> = createVecBuilder('VecSignature', dynBuilder(() => Signature))

export const VecValue: ScaleArrayBuilder<FragmentFromBuilder<typeof Value>[]> = createVecBuilder('VecValue', dynBuilder(() => Value))

export const VersionedEventSocketMessage: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedEventSocketMessageV1>>
}>> = createEnumBuilder('VersionedEventSocketMessage', [[1, 'V1', dynBuilder(() => VersionedEventSocketMessageV1)]])

export const VersionedEventSocketMessageV1: typeof EventSocketMessage = createAliasBuilder('VersionedEventSocketMessageV1', dynBuilder(() => EventSocketMessage))

export const VersionedQueryResult: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedQueryResultV1>>
}>> = createEnumBuilder('VersionedQueryResult', [[1, 'V1', dynBuilder(() => VersionedQueryResultV1)]])

export const VersionedQueryResultV1: typeof QueryResult = createAliasBuilder('VersionedQueryResultV1', dynBuilder(() => QueryResult))

export const VersionedRejectedTransaction: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedRejectedTransactionV1>>
}>> = createEnumBuilder('VersionedRejectedTransaction', [[1, 'V1', dynBuilder(() => VersionedRejectedTransactionV1)]])

export const VersionedRejectedTransactionV1: typeof RejectedTransaction = createAliasBuilder('VersionedRejectedTransactionV1', dynBuilder(() => RejectedTransaction))

export const VersionedSignedQueryRequest: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedSignedQueryRequestV1>>
}>> = createEnumBuilder('VersionedSignedQueryRequest', [[1, 'V1', dynBuilder(() => VersionedSignedQueryRequestV1)]])

export const VersionedSignedQueryRequestV1: typeof SignedQueryRequest = createAliasBuilder('VersionedSignedQueryRequestV1', dynBuilder(() => SignedQueryRequest))

export const VersionedTransaction: ScaleEnumBuilder<Enum<{
    V1: Valuable<FragmentFromBuilder<typeof VersionedTransactionV1>>
}>> = createEnumBuilder('VersionedTransaction', [[1, 'V1', dynBuilder(() => VersionedTransactionV1)]])

export const VersionedTransactionV1: typeof Transaction = createAliasBuilder('VersionedTransactionV1', dynBuilder(() => Transaction))

export const Where: ScaleStructBuilder<{
    expression: FragmentFromBuilder<typeof EvaluatesToValue>,
    values: FragmentFromBuilder<typeof BTreeMapStringEvaluatesToValue>
}> = createStructBuilder('Where', [['expression', dynBuilder(() => EvaluatesToValue)], ['values', dynBuilder(() => BTreeMapStringEvaluatesToValue)]])
