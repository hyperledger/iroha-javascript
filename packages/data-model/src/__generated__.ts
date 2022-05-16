import { Bool, Compact, Enum, Str, U128, U32, U64, U8, VecU8, createArrayU8Codec, createEnumCodec, createMapCodec, createOptionCodec, createStructCodec, createTupleCodec, createVecCodec, dynCodec } from '@scale-codec/definition-runtime'

import type { ArrayCodecAndFactory, Codec, EnumCodecAndFactory, MapCodecAndFactory, Opaque, Option, StructCodecAndFactory } from '@scale-codec/definition-runtime'

// Dynamic codecs

const __dyn_FilterOptAssetDefinitionFilter = dynCodec(() => FilterOptAssetDefinitionFilter)
const __dyn_FindAccountKeyValueByIdAndKey = dynCodec(() => FindAccountKeyValueByIdAndKey)
const __dyn_SignatureOfCommittedBlock = dynCodec(() => SignatureOfCommittedBlock)
const __dyn_IdFilterTriggerId = dynCodec(() => IdFilterTriggerId)
const __dyn_FilterOptAccountEventFilter = dynCodec(() => FilterOptAccountEventFilter)
const __dyn_TransferBox = dynCodec(() => TransferBox)
const __dyn_EvaluatesToName = dynCodec(() => EvaluatesToName)
const __dyn_RejectedTransaction = dynCodec(() => RejectedTransaction)
const __dyn_BlockRejectionReason = dynCodec(() => BlockRejectionReason)
const __dyn_SignatureOfValidBlock = dynCodec(() => SignatureOfValidBlock)
const __dyn_Add = dynCodec(() => Add)
const __dyn_AssetValue = dynCodec(() => AssetValue)
const __dyn_MapAssetIdAsset = dynCodec(() => MapAssetIdAsset)
const __dyn_FindAccountsByName = dynCodec(() => FindAccountsByName)
const __dyn_MapAccountIdAccount = dynCodec(() => MapAccountIdAccount)
const __dyn_FilterOptRoleEventFilter = dynCodec(() => FilterOptRoleEventFilter)
const __dyn_ContextValue = dynCodec(() => ContextValue)
const __dyn_ValidTransaction = dynCodec(() => ValidTransaction)
const __dyn_Peer = dynCodec(() => Peer)
const __dyn_AssetEventFilter = dynCodec(() => AssetEventFilter)
const __dyn_VecPublicKey = dynCodec(() => VecPublicKey)
const __dyn_SignaturesOfTransactionPayload = dynCodec(() => SignaturesOfTransactionPayload)
const __dyn_ContainsAll = dynCodec(() => ContainsAll)
const __dyn_Mod = dynCodec(() => Mod)
const __dyn_TriggerEvent = dynCodec(() => TriggerEvent)
const __dyn_QueryBox = dynCodec(() => QueryBox)
const __dyn_AssetDefinition = dynCodec(() => AssetDefinition)
const __dyn_HashOfVersionedCommittedBlock = dynCodec(() => HashOfVersionedCommittedBlock)
const __dyn_FindAssetKeyValueByIdAndKey = dynCodec(() => FindAssetKeyValueByIdAndKey)
const __dyn_HashOfVersionedValidBlock = dynCodec(() => HashOfVersionedValidBlock)
const __dyn_UnsupportedVersion = dynCodec(() => UnsupportedVersion)
const __dyn_SignaturesOfCommittedBlock = dynCodec(() => SignaturesOfCommittedBlock)
const __dyn_NotPermittedFail = dynCodec(() => NotPermittedFail)
const __dyn_EvaluatesToHash = dynCodec(() => EvaluatesToHash)
const __dyn_Or = dynCodec(() => Or)
const __dyn_SignedQueryRequest = dynCodec(() => SignedQueryRequest)
const __dyn_FindTransactionsByAccountId = dynCodec(() => FindTransactionsByAccountId)
const __dyn_OptionHash = dynCodec(() => OptionHash)
const __dyn_TimeSchedule = dynCodec(() => TimeSchedule)
const __dyn_Domain = dynCodec(() => Domain)
const __dyn_Proof = dynCodec(() => Proof)
const __dyn_OptionTopology = dynCodec(() => OptionTopology)
const __dyn_Multiply = dynCodec(() => Multiply)
const __dyn_NewDomain = dynCodec(() => NewDomain)
const __dyn_Reason = dynCodec(() => Reason)
const __dyn_IdFilterRoleId = dynCodec(() => IdFilterRoleId)
const __dyn_RoleEvent = dynCodec(() => RoleEvent)
const __dyn_MapPublicKeySignatureOfTransactionPayload = dynCodec(() => MapPublicKeySignatureOfTransactionPayload)
const __dyn_VecRoleId = dynCodec(() => VecRoleId)
const __dyn_EventPublisherMessage = dynCodec(() => EventPublisherMessage)
const __dyn_RevokeBox = dynCodec(() => RevokeBox)
const __dyn_TimeEventFilter = dynCodec(() => TimeEventFilter)
const __dyn_VecVersionedValidTransaction = dynCodec(() => VecVersionedValidTransaction)
const __dyn_ExecutionTime = dynCodec(() => ExecutionTime)
const __dyn_AccountEventFilter = dynCodec(() => AccountEventFilter)
const __dyn_QueryResult = dynCodec(() => QueryResult)
const __dyn_FilterOptIdFilterTriggerId = dynCodec(() => FilterOptIdFilterTriggerId)
const __dyn_EventSubscriberMessage = dynCodec(() => EventSubscriberMessage)
const __dyn_AccountFilter = dynCodec(() => AccountFilter)
const __dyn_FindAccountById = dynCodec(() => FindAccountById)
const __dyn_MapPublicKeySignatureOfCommittedBlock = dynCodec(() => MapPublicKeySignatureOfCommittedBlock)
const __dyn_EvaluatesToRoleId = dynCodec(() => EvaluatesToRoleId)
const __dyn_VecEvent = dynCodec(() => VecEvent)
const __dyn_QueryPayload = dynCodec(() => QueryPayload)
const __dyn_Where = dynCodec(() => Where)
const __dyn_ParentHashNotFound = dynCodec(() => ParentHashNotFound)
const __dyn_FindAllDomains = dynCodec(() => FindAllDomains)
const __dyn_VersionedTransaction = dynCodec(() => VersionedTransaction)
const __dyn_RaiseTo = dynCodec(() => RaiseTo)
const __dyn_OptionTimeInterval = dynCodec(() => OptionTimeInterval)
const __dyn_RegisterBox = dynCodec(() => RegisterBox)
const __dyn_AccountId = dynCodec(() => AccountId)
const __dyn_InstructionExecutionFail = dynCodec(() => InstructionExecutionFail)
const __dyn_VersionedCommittedBlock = dynCodec(() => VersionedCommittedBlock)
const __dyn_ExecuteTriggerBox = dynCodec(() => ExecuteTriggerBox)
const __dyn_AssetFilter = dynCodec(() => AssetFilter)
const __dyn_PipelineStatusKind = dynCodec(() => PipelineStatusKind)
const __dyn_FindAssetById = dynCodec(() => FindAssetById)
const __dyn_OptionDuration = dynCodec(() => OptionDuration)
const __dyn_MintBox = dynCodec(() => MintBox)
const __dyn_MapStringEvaluatesToValue = dynCodec(() => MapStringEvaluatesToValue)
const __dyn_FilterOptRoleFilter = dynCodec(() => FilterOptRoleFilter)
const __dyn_FindDomainKeyValueByIdAndKey = dynCodec(() => FindDomainKeyValueByIdAndKey)
const __dyn_EvaluatesToAssetDefinitionId = dynCodec(() => EvaluatesToAssetDefinitionId)
const __dyn_VersionedRejectedTransaction = dynCodec(() => VersionedRejectedTransaction)
const __dyn_FindAllPeers = dynCodec(() => FindAllPeers)
const __dyn_Parameter = dynCodec(() => Parameter)
const __dyn_CommitTimeout = dynCodec(() => CommitTimeout)
const __dyn_Executable = dynCodec(() => Executable)
const __dyn_EvaluatesToRegistrableBox = dynCodec(() => EvaluatesToRegistrableBox)
const __dyn_PermissionToken = dynCodec(() => PermissionToken)
const __dyn_FindTransactionByHash = dynCodec(() => FindTransactionByHash)
const __dyn_AssetEvent = dynCodec(() => AssetEvent)
const __dyn_SequenceBox = dynCodec(() => SequenceBox)
const __dyn_FilterOptAssetDefinitionEventFilter = dynCodec(() => FilterOptAssetDefinitionEventFilter)
const __dyn_VecGenesisTransaction = dynCodec(() => VecGenesisTransaction)
const __dyn_MapNameValue = dynCodec(() => MapNameValue)
const __dyn_FilterOptAccountFilter = dynCodec(() => FilterOptAccountFilter)
const __dyn_ProofPayload = dynCodec(() => ProofPayload)
const __dyn_AssetId = dynCodec(() => AssetId)
const __dyn_TransactionLimitError = dynCodec(() => TransactionLimitError)
const __dyn_IdFilterAssetDefinitionId = dynCodec(() => IdFilterAssetDefinitionId)
const __dyn_FixedPointI64 = dynCodec(() => FixedPointI64)
const __dyn_VecSignatureOfTransactionPayload = dynCodec(() => VecSignatureOfTransactionPayload)
const __dyn_FindAssetsByAssetDefinitionId = dynCodec(() => FindAssetsByAssetDefinitionId)
const __dyn_FilterOptIdFilterPeerId = dynCodec(() => FilterOptIdFilterPeerId)
const __dyn_FindAllAssets = dynCodec(() => FindAllAssets)
const __dyn_Name = dynCodec(() => Name)
const __dyn_FindTriggerKeyValueByIdAndKey = dynCodec(() => FindTriggerKeyValueByIdAndKey)
const __dyn_FindAccountsWithAsset = dynCodec(() => FindAccountsWithAsset)
const __dyn_SignatureCheckCondition = dynCodec(() => SignatureCheckCondition)
const __dyn_VecSignatureOfValidBlock = dynCodec(() => VecSignatureOfValidBlock)
const __dyn_HashOfVersionedTransaction = dynCodec(() => HashOfVersionedTransaction)
const __dyn_AccountEvent = dynCodec(() => AccountEvent)
const __dyn_NewAccount = dynCodec(() => NewAccount)
const __dyn_FilterOptIdFilterDomainId = dynCodec(() => FilterOptIdFilterDomainId)
const __dyn_FailBox = dynCodec(() => FailBox)
const __dyn_Account = dynCodec(() => Account)
const __dyn_FindRolesByAccountId = dynCodec(() => FindRolesByAccountId)
const __dyn_ContainsAny = dynCodec(() => ContainsAny)
const __dyn_RejectionReason = dynCodec(() => RejectionReason)
const __dyn_FilterOptAssetFilter = dynCodec(() => FilterOptAssetFilter)
const __dyn_TimeEvent = dynCodec(() => TimeEvent)
const __dyn_Instruction = dynCodec(() => Instruction)
const __dyn_FindAllAccounts = dynCodec(() => FindAllAccounts)
const __dyn_Hash = dynCodec(() => Hash)
const __dyn_OptionIpfsPath = dynCodec(() => OptionIpfsPath)
const __dyn_FindAllActiveTriggerIds = dynCodec(() => FindAllActiveTriggerIds)
const __dyn_DomainEventFilter = dynCodec(() => DomainEventFilter)
const __dyn_RoleFilter = dynCodec(() => RoleFilter)
const __dyn_OptionPipelineEntityKind = dynCodec(() => OptionPipelineEntityKind)
const __dyn_RawVersioned = dynCodec(() => RawVersioned)
const __dyn_TransactionRejectionReason = dynCodec(() => TransactionRejectionReason)
const __dyn_FindDomainById = dynCodec(() => FindDomainById)
const __dyn_AssetDefinitionEntry = dynCodec(() => AssetDefinitionEntry)
const __dyn_ExecuteTriggerEventFilter = dynCodec(() => ExecuteTriggerEventFilter)
const __dyn_AssetDefinitionEventFilter = dynCodec(() => AssetDefinitionEventFilter)
const __dyn_Topology = dynCodec(() => Topology)
const __dyn_GrantBox = dynCodec(() => GrantBox)
const __dyn_Metadata = dynCodec(() => Metadata)
const __dyn_MapPublicKeySignatureOfProof = dynCodec(() => MapPublicKeySignatureOfProof)
const __dyn_FindError = dynCodec(() => FindError)
const __dyn_ArrayU8L32 = dynCodec(() => ArrayU8L32)
const __dyn_UnregisterBox = dynCodec(() => UnregisterBox)
const __dyn_VecHashOfVersionedValidBlock = dynCodec(() => VecHashOfVersionedValidBlock)
const __dyn_FindPermissionTokensByAccountId = dynCodec(() => FindPermissionTokensByAccountId)
const __dyn_VersionError = dynCodec(() => VersionError)
const __dyn_IdFilterPeerId = dynCodec(() => IdFilterPeerId)
const __dyn_TransactionPayload = dynCodec(() => TransactionPayload)
const __dyn_FilterOptIdFilterAssetDefinitionId = dynCodec(() => FilterOptIdFilterAssetDefinitionId)
const __dyn_DataEvent = dynCodec(() => DataEvent)
const __dyn_VecProof = dynCodec(() => VecProof)
const __dyn_IdBox = dynCodec(() => IdBox)
const __dyn_PipelineEventFilter = dynCodec(() => PipelineEventFilter)
const __dyn_Asset = dynCodec(() => Asset)
const __dyn_TriggerFilter = dynCodec(() => TriggerFilter)
const __dyn_PeerEventFilter = dynCodec(() => PeerEventFilter)
const __dyn_RoleId = dynCodec(() => RoleId)
const __dyn_Value = dynCodec(() => Value)
const __dyn_ValidBlock = dynCodec(() => ValidBlock)
const __dyn_FindTriggerById = dynCodec(() => FindTriggerById)
const __dyn_CommittedBlock = dynCodec(() => CommittedBlock)
const __dyn_VecPeerId = dynCodec(() => VecPeerId)
const __dyn_IfInstruction = dynCodec(() => IfInstruction)
const __dyn_MapAssetDefinitionIdAssetDefinitionEntry = dynCodec(() => MapAssetDefinitionIdAssetDefinitionEntry)
const __dyn_EvaluatesToVecValue = dynCodec(() => EvaluatesToVecValue)
const __dyn_BlockSubscriberMessage = dynCodec(() => BlockSubscriberMessage)
const __dyn_WasmExecutionFail = dynCodec(() => WasmExecutionFail)
const __dyn_SignaturesOfProof = dynCodec(() => SignaturesOfProof)
const __dyn_FindAssetsByDomainId = dynCodec(() => FindAssetsByDomainId)
const __dyn_IdFilterDomainId = dynCodec(() => IdFilterDomainId)
const __dyn_TimeInterval = dynCodec(() => TimeInterval)
const __dyn_FilterOptDomainEventFilter = dynCodec(() => FilterOptDomainEventFilter)
const __dyn_EvaluatesToAccountId = dynCodec(() => EvaluatesToAccountId)
const __dyn_TriggerId = dynCodec(() => TriggerId)
const __dyn_TransactionValue = dynCodec(() => TransactionValue)
const __dyn_Not = dynCodec(() => Not)
const __dyn_FilterBox = dynCodec(() => FilterBox)
const __dyn_FindAssetQuantityById = dynCodec(() => FindAssetQuantityById)
const __dyn_PipelineStatus = dynCodec(() => PipelineStatus)
const __dyn_Duration = dynCodec(() => Duration)
const __dyn_HashOfMerkleTreeVersionedTransaction = dynCodec(() => HashOfMerkleTreeVersionedTransaction)
const __dyn_EvaluatesToDomainId = dynCodec(() => EvaluatesToDomainId)
const __dyn_Equal = dynCodec(() => Equal)
const __dyn_Subtract = dynCodec(() => Subtract)
const __dyn_Fixed = dynCodec(() => Fixed)
const __dyn_FindAccountsByDomainId = dynCodec(() => FindAccountsByDomainId)
const __dyn_IdFilterAccountId = dynCodec(() => IdFilterAccountId)
const __dyn_FindAssetsByAccountId = dynCodec(() => FindAssetsByAccountId)
const __dyn_FilterOptTriggerEventFilter = dynCodec(() => FilterOptTriggerEventFilter)
const __dyn_BlockCreationTimeout = dynCodec(() => BlockCreationTimeout)
const __dyn_FilterOptPeerFilter = dynCodec(() => FilterOptPeerFilter)
const __dyn_FindAllAssetsDefinitions = dynCodec(() => FindAllAssetsDefinitions)
const __dyn_SignatureOfQueryPayload = dynCodec(() => SignatureOfQueryPayload)
const __dyn_SignatureOfProof = dynCodec(() => SignatureOfProof)
const __dyn_FilterOptPeerEventFilter = dynCodec(() => FilterOptPeerEventFilter)
const __dyn_FindAllRoles = dynCodec(() => FindAllRoles)
const __dyn_RemoveKeyValueBox = dynCodec(() => RemoveKeyValueBox)
const __dyn_FilterOptTriggerFilter = dynCodec(() => FilterOptTriggerFilter)
const __dyn_IdentifiableBox = dynCodec(() => IdentifiableBox)
const __dyn_IfExpression = dynCodec(() => IfExpression)
const __dyn_DomainEvent = dynCodec(() => DomainEvent)
const __dyn_GenesisTransaction = dynCodec(() => GenesisTransaction)
const __dyn_Role = dynCodec(() => Role)
const __dyn_FilterOptEntityFilter = dynCodec(() => FilterOptEntityFilter)
const __dyn_FindAssetDefinitionKeyValueByIdAndKey = dynCodec(() => FindAssetDefinitionKeyValueByIdAndKey)
const __dyn_PublicKey = dynCodec(() => PublicKey)
const __dyn_VecPermissionToken = dynCodec(() => VecPermissionToken)
const __dyn_EvaluatesToAssetId = dynCodec(() => EvaluatesToAssetId)
const __dyn_AssetDefinitionEvent = dynCodec(() => AssetDefinitionEvent)
const __dyn_SetKeyValueBox = dynCodec(() => SetKeyValueBox)
const __dyn_FilterOptDomainFilter = dynCodec(() => FilterOptDomainFilter)
const __dyn_WasmSmartContract = dynCodec(() => WasmSmartContract)
const __dyn_And = dynCodec(() => And)
const __dyn_FindRoleByRoleId = dynCodec(() => FindRoleByRoleId)
const __dyn_ExecuteTriggerEvent = dynCodec(() => ExecuteTriggerEvent)
const __dyn_IdFilterAssetId = dynCodec(() => IdFilterAssetId)
const __dyn_Signature = dynCodec(() => Signature)
const __dyn_BlockPublisherMessage = dynCodec(() => BlockPublisherMessage)
const __dyn_PipelineEvent = dynCodec(() => PipelineEvent)
const __dyn_Repeats = dynCodec(() => Repeats)
const __dyn_PaginatedQueryResult = dynCodec(() => PaginatedQueryResult)
const __dyn_PeerEvent = dynCodec(() => PeerEvent)
const __dyn_Expression = dynCodec(() => Expression)
const __dyn_Divide = dynCodec(() => Divide)
const __dyn_OptionInstruction = dynCodec(() => OptionInstruction)
const __dyn_FindAssetsByDomainIdAndAssetDefinitionId = dynCodec(() => FindAssetsByDomainIdAndAssetDefinitionId)
const __dyn_Less = dynCodec(() => Less)
const __dyn_PipelineEntityKind = dynCodec(() => PipelineEntityKind)
const __dyn_IpfsPath = dynCodec(() => IpfsPath)
const __dyn_VersionedValidTransaction = dynCodec(() => VersionedValidTransaction)
const __dyn_FindAllRoleIds = dynCodec(() => FindAllRoleIds)
const __dyn_VecInstruction = dynCodec(() => VecInstruction)
const __dyn_BlockHeader = dynCodec(() => BlockHeader)
const __dyn_TriggerEventFilter = dynCodec(() => TriggerEventFilter)
const __dyn_UnsatisfiedSignatureConditionFail = dynCodec(() => UnsatisfiedSignatureConditionFail)
const __dyn_FilterOptIdFilterAccountId = dynCodec(() => FilterOptIdFilterAccountId)
const __dyn_Event = dynCodec(() => Event)
const __dyn_Pair = dynCodec(() => Pair)
const __dyn_PeerFilter = dynCodec(() => PeerFilter)
const __dyn_Pagination = dynCodec(() => Pagination)
const __dyn_Greater = dynCodec(() => Greater)
const __dyn_TriggerFilterBox = dynCodec(() => TriggerFilterBox)
const __dyn_EvaluatesToIdBox = dynCodec(() => EvaluatesToIdBox)
const __dyn_EntityFilter = dynCodec(() => EntityFilter)
const __dyn_AssetDefinitionFilter = dynCodec(() => AssetDefinitionFilter)
const __dyn_AssetValueType = dynCodec(() => AssetValueType)
const __dyn_NoTransactionReceiptReceived = dynCodec(() => NoTransactionReceiptReceived)
const __dyn_RoleEventFilter = dynCodec(() => RoleEventFilter)
const __dyn_Mintable = dynCodec(() => Mintable)
const __dyn_BurnBox = dynCodec(() => BurnBox)
const __dyn_DomainFilter = dynCodec(() => DomainFilter)
const __dyn_EvaluatesToValue = dynCodec(() => EvaluatesToValue)
const __dyn_VecVersionedRejectedTransaction = dynCodec(() => VecVersionedRejectedTransaction)
const __dyn_OptionPipelineStatusKind = dynCodec(() => OptionPipelineStatusKind)
const __dyn_QueryUnsupportedVersionError = dynCodec(() => QueryUnsupportedVersionError)
const __dyn_ActionFilterBox = dynCodec(() => ActionFilterBox)
const __dyn_PeerId = dynCodec(() => PeerId)
const __dyn_VecValue = dynCodec(() => VecValue)
const __dyn_FilterOptIdFilterAssetId = dynCodec(() => FilterOptIdFilterAssetId)
const __dyn_FilterOptAssetEventFilter = dynCodec(() => FilterOptAssetEventFilter)
const __dyn_ProofChain = dynCodec(() => ProofChain)
const __dyn_AssetDefinitionId = dynCodec(() => AssetDefinitionId)
const __dyn_FindAssetsByName = dynCodec(() => FindAssetsByName)
const __dyn_EvaluatesToTriggerId = dynCodec(() => EvaluatesToTriggerId)
const __dyn_Transaction = dynCodec(() => Transaction)
const __dyn_HashOfProof = dynCodec(() => HashOfProof)
const __dyn_OptionU32 = dynCodec(() => OptionU32)
const __dyn_DomainId = dynCodec(() => DomainId)
const __dyn_Contains = dynCodec(() => Contains)
const __dyn_EvaluatesToU32 = dynCodec(() => EvaluatesToU32)
const __dyn_FilterOptIdFilterRoleId = dynCodec(() => FilterOptIdFilterRoleId)
const __dyn_EvaluatesToBool = dynCodec(() => EvaluatesToBool)
const __dyn_SignatureOfTransactionPayload = dynCodec(() => SignatureOfTransactionPayload)

// Type: Account

interface Account__actual {
    id: AccountId
    assets: MapAssetIdAsset
    signatories: VecPublicKey
    permission_tokens: VecPermissionToken
    signature_check_condition: SignatureCheckCondition
    metadata: Metadata
    roles: VecRoleId
}

interface Account extends Opaque<Account__actual, Account> {}

const Account: StructCodecAndFactory<Account__actual, Account> = createStructCodec<Account__actual, Account>('Account', [
    ['id', __dyn_AccountId],
    ['assets', __dyn_MapAssetIdAsset],
    ['signatories', __dyn_VecPublicKey],
    ['permission_tokens', __dyn_VecPermissionToken],
    ['signature_check_condition', __dyn_SignatureCheckCondition],
    ['metadata', __dyn_Metadata],
    ['roles', __dyn_VecRoleId]
])

// Type: AccountEvent

type AccountEvent__actual = Enum<
    | ['Asset', AssetEvent]
    | ['Created', AccountId]
    | ['Deleted', AccountId]
    | ['AuthenticationAdded', AccountId]
    | ['AuthenticationRemoved', AccountId]
    | ['PermissionAdded', AccountId]
    | ['PermissionRemoved', AccountId]
    | ['MetadataInserted', AccountId]
    | ['MetadataRemoved', AccountId]
>

interface AccountEvent extends Opaque<AccountEvent__actual, AccountEvent> {}

const AccountEvent: EnumCodecAndFactory<AccountEvent> = createEnumCodec<AccountEvent__actual, AccountEvent>('AccountEvent', [
    [0, 'Asset', __dyn_AssetEvent],
    [1, 'Created', __dyn_AccountId],
    [2, 'Deleted', __dyn_AccountId],
    [3, 'AuthenticationAdded', __dyn_AccountId],
    [4, 'AuthenticationRemoved', __dyn_AccountId],
    [5, 'PermissionAdded', __dyn_AccountId],
    [6, 'PermissionRemoved', __dyn_AccountId],
    [7, 'MetadataInserted', __dyn_AccountId],
    [8, 'MetadataRemoved', __dyn_AccountId]
])

// Type: AccountEventFilter

type AccountEventFilter__actual = Enum<
    | ['ByAsset', FilterOptAssetFilter]
    | 'ByCreated'
    | 'ByDeleted'
    | 'ByAuthenticationAdded'
    | 'ByAuthenticationRemoved'
    | 'ByPermissionAdded'
    | 'ByPermissionRemoved'
    | 'ByMetadataInserted'
    | 'ByMetadataRemoved'
>

interface AccountEventFilter extends Opaque<AccountEventFilter__actual, AccountEventFilter> {}

const AccountEventFilter: EnumCodecAndFactory<AccountEventFilter> = createEnumCodec<AccountEventFilter__actual, AccountEventFilter>('AccountEventFilter', [
    [0, 'ByAsset', __dyn_FilterOptAssetFilter],
    [1, 'ByCreated'],
    [2, 'ByDeleted'],
    [3, 'ByAuthenticationAdded'],
    [4, 'ByAuthenticationRemoved'],
    [5, 'ByPermissionAdded'],
    [6, 'ByPermissionRemoved'],
    [7, 'ByMetadataInserted'],
    [8, 'ByMetadataRemoved']
])

// Type: AccountFilter

interface AccountFilter__actual {
    id_filter: FilterOptIdFilterAccountId
    event_filter: FilterOptAccountEventFilter
}

interface AccountFilter extends Opaque<AccountFilter__actual, AccountFilter> {}

const AccountFilter: StructCodecAndFactory<AccountFilter__actual, AccountFilter> = createStructCodec<AccountFilter__actual, AccountFilter>('AccountFilter', [
    ['id_filter', __dyn_FilterOptIdFilterAccountId],
    ['event_filter', __dyn_FilterOptAccountEventFilter]
])

// Type: AccountId

interface AccountId__actual {
    name: Name
    domain_id: DomainId
}

interface AccountId extends Opaque<AccountId__actual, AccountId> {}

const AccountId: StructCodecAndFactory<AccountId__actual, AccountId> = createStructCodec<AccountId__actual, AccountId>('AccountId', [
    ['name', __dyn_Name],
    ['domain_id', __dyn_DomainId]
])

// Type: ActionFilterBox

interface ActionFilterBox__actual {
    executable: Executable
    repeats: Repeats
    technical_account: AccountId
    filter: FilterBox
    metadata: Metadata
}

interface ActionFilterBox extends Opaque<ActionFilterBox__actual, ActionFilterBox> {}

const ActionFilterBox: StructCodecAndFactory<ActionFilterBox__actual, ActionFilterBox> = createStructCodec<ActionFilterBox__actual, ActionFilterBox>('ActionFilterBox', [
    ['executable', __dyn_Executable],
    ['repeats', __dyn_Repeats],
    ['technical_account', __dyn_AccountId],
    ['filter', __dyn_FilterBox],
    ['metadata', __dyn_Metadata]
])

// Type: Add

interface Add__actual {
    left: EvaluatesToU32
    right: EvaluatesToU32
}

interface Add extends Opaque<Add__actual, Add> {}

const Add: StructCodecAndFactory<Add__actual, Add> = createStructCodec<Add__actual, Add>('Add', [
    ['left', __dyn_EvaluatesToU32],
    ['right', __dyn_EvaluatesToU32]
])

// Type: And

interface And__actual {
    left: EvaluatesToBool
    right: EvaluatesToBool
}

interface And extends Opaque<And__actual, And> {}

const And: StructCodecAndFactory<And__actual, And> = createStructCodec<And__actual, And>('And', [
    ['left', __dyn_EvaluatesToBool],
    ['right', __dyn_EvaluatesToBool]
])

// Type: ArrayU8L32

type ArrayU8L32 = Uint8Array

const ArrayU8L32: Codec<ArrayU8L32> = createArrayU8Codec('ArrayU8L32', 32)

// Type: Asset

interface Asset__actual {
    id: AssetId
    value: AssetValue
}

interface Asset extends Opaque<Asset__actual, Asset> {}

const Asset: StructCodecAndFactory<Asset__actual, Asset> = createStructCodec<Asset__actual, Asset>('Asset', [
    ['id', __dyn_AssetId],
    ['value', __dyn_AssetValue]
])

// Type: AssetDefinition

interface AssetDefinition__actual {
    id: AssetDefinitionId
    value_type: AssetValueType
    mintable: Mintable
    metadata: Metadata
}

interface AssetDefinition extends Opaque<AssetDefinition__actual, AssetDefinition> {}

const AssetDefinition: StructCodecAndFactory<AssetDefinition__actual, AssetDefinition> = createStructCodec<AssetDefinition__actual, AssetDefinition>('AssetDefinition', [
    ['id', __dyn_AssetDefinitionId],
    ['value_type', __dyn_AssetValueType],
    ['mintable', __dyn_Mintable],
    ['metadata', __dyn_Metadata]
])

// Type: AssetDefinitionEntry

interface AssetDefinitionEntry__actual {
    definition: AssetDefinition
    registered_by: AccountId
}

interface AssetDefinitionEntry extends Opaque<AssetDefinitionEntry__actual, AssetDefinitionEntry> {}

const AssetDefinitionEntry: StructCodecAndFactory<AssetDefinitionEntry__actual, AssetDefinitionEntry> = createStructCodec<AssetDefinitionEntry__actual, AssetDefinitionEntry>('AssetDefinitionEntry', [
    ['definition', __dyn_AssetDefinition],
    ['registered_by', __dyn_AccountId]
])

// Type: AssetDefinitionEvent

type AssetDefinitionEvent__actual = Enum<
    | ['Created', AssetDefinitionId]
    | ['MintabilityChanged', AssetDefinitionId]
    | ['Deleted', AssetDefinitionId]
    | ['MetadataInserted', AssetDefinitionId]
    | ['MetadataRemoved', AssetDefinitionId]
>

interface AssetDefinitionEvent extends Opaque<AssetDefinitionEvent__actual, AssetDefinitionEvent> {}

const AssetDefinitionEvent: EnumCodecAndFactory<AssetDefinitionEvent> = createEnumCodec<AssetDefinitionEvent__actual, AssetDefinitionEvent>('AssetDefinitionEvent', [
    [0, 'Created', __dyn_AssetDefinitionId],
    [1, 'MintabilityChanged', __dyn_AssetDefinitionId],
    [2, 'Deleted', __dyn_AssetDefinitionId],
    [3, 'MetadataInserted', __dyn_AssetDefinitionId],
    [4, 'MetadataRemoved', __dyn_AssetDefinitionId]
])

// Type: AssetDefinitionEventFilter

type AssetDefinitionEventFilter__actual = Enum<
    | 'ByCreated'
    | 'ByDeleted'
    | 'ByMintabilityChanged'
    | 'ByMetadataInserted'
    | 'ByMetadataRemoved'
>

interface AssetDefinitionEventFilter extends Opaque<AssetDefinitionEventFilter__actual, AssetDefinitionEventFilter> {}

const AssetDefinitionEventFilter: EnumCodecAndFactory<AssetDefinitionEventFilter> = createEnumCodec<AssetDefinitionEventFilter__actual, AssetDefinitionEventFilter>('AssetDefinitionEventFilter', [
    [0, 'ByCreated'],
    [1, 'ByDeleted'],
    [2, 'ByMintabilityChanged'],
    [3, 'ByMetadataInserted'],
    [4, 'ByMetadataRemoved']
])

// Type: AssetDefinitionFilter

interface AssetDefinitionFilter__actual {
    id_filter: FilterOptIdFilterAssetDefinitionId
    event_filter: FilterOptAssetDefinitionEventFilter
}

interface AssetDefinitionFilter extends Opaque<AssetDefinitionFilter__actual, AssetDefinitionFilter> {}

const AssetDefinitionFilter: StructCodecAndFactory<AssetDefinitionFilter__actual, AssetDefinitionFilter> = createStructCodec<AssetDefinitionFilter__actual, AssetDefinitionFilter>('AssetDefinitionFilter', [
    ['id_filter', __dyn_FilterOptIdFilterAssetDefinitionId],
    ['event_filter', __dyn_FilterOptAssetDefinitionEventFilter]
])

// Type: AssetDefinitionId

interface AssetDefinitionId__actual {
    name: Name
    domain_id: DomainId
}

interface AssetDefinitionId extends Opaque<AssetDefinitionId__actual, AssetDefinitionId> {}

const AssetDefinitionId: StructCodecAndFactory<AssetDefinitionId__actual, AssetDefinitionId> = createStructCodec<AssetDefinitionId__actual, AssetDefinitionId>('AssetDefinitionId', [
    ['name', __dyn_Name],
    ['domain_id', __dyn_DomainId]
])

// Type: AssetEvent

type AssetEvent__actual = Enum<
    | ['Created', AssetId]
    | ['Deleted', AssetId]
    | ['Added', AssetId]
    | ['Removed', AssetId]
    | ['MetadataInserted', AssetId]
    | ['MetadataRemoved', AssetId]
>

interface AssetEvent extends Opaque<AssetEvent__actual, AssetEvent> {}

const AssetEvent: EnumCodecAndFactory<AssetEvent> = createEnumCodec<AssetEvent__actual, AssetEvent>('AssetEvent', [
    [0, 'Created', __dyn_AssetId],
    [1, 'Deleted', __dyn_AssetId],
    [2, 'Added', __dyn_AssetId],
    [3, 'Removed', __dyn_AssetId],
    [4, 'MetadataInserted', __dyn_AssetId],
    [5, 'MetadataRemoved', __dyn_AssetId]
])

// Type: AssetEventFilter

type AssetEventFilter__actual = Enum<
    | 'ByCreated'
    | 'ByDeleted'
    | 'ByAdded'
    | 'ByRemoved'
    | 'ByMetadataInserted'
    | 'ByMetadataRemoved'
>

interface AssetEventFilter extends Opaque<AssetEventFilter__actual, AssetEventFilter> {}

const AssetEventFilter: EnumCodecAndFactory<AssetEventFilter> = createEnumCodec<AssetEventFilter__actual, AssetEventFilter>('AssetEventFilter', [
    [0, 'ByCreated'],
    [1, 'ByDeleted'],
    [2, 'ByAdded'],
    [3, 'ByRemoved'],
    [4, 'ByMetadataInserted'],
    [5, 'ByMetadataRemoved']
])

// Type: AssetFilter

interface AssetFilter__actual {
    id_filter: FilterOptIdFilterAssetId
    event_filter: FilterOptAssetEventFilter
}

interface AssetFilter extends Opaque<AssetFilter__actual, AssetFilter> {}

const AssetFilter: StructCodecAndFactory<AssetFilter__actual, AssetFilter> = createStructCodec<AssetFilter__actual, AssetFilter>('AssetFilter', [
    ['id_filter', __dyn_FilterOptIdFilterAssetId],
    ['event_filter', __dyn_FilterOptAssetEventFilter]
])

// Type: AssetId

interface AssetId__actual {
    definition_id: AssetDefinitionId
    account_id: AccountId
}

interface AssetId extends Opaque<AssetId__actual, AssetId> {}

const AssetId: StructCodecAndFactory<AssetId__actual, AssetId> = createStructCodec<AssetId__actual, AssetId>('AssetId', [
    ['definition_id', __dyn_AssetDefinitionId],
    ['account_id', __dyn_AccountId]
])

// Type: AssetValue

type AssetValue__actual = Enum<
    | ['Quantity', U32]
    | ['BigQuantity', U128]
    | ['Fixed', Fixed]
    | ['Store', Metadata]
>

interface AssetValue extends Opaque<AssetValue__actual, AssetValue> {}

const AssetValue: EnumCodecAndFactory<AssetValue> = createEnumCodec<AssetValue__actual, AssetValue>('AssetValue', [
    [0, 'Quantity', U32],
    [1, 'BigQuantity', U128],
    [2, 'Fixed', __dyn_Fixed],
    [3, 'Store', __dyn_Metadata]
])

// Type: AssetValueType

type AssetValueType__actual = Enum<
    | 'Quantity'
    | 'BigQuantity'
    | 'Fixed'
    | 'Store'
>

interface AssetValueType extends Opaque<AssetValueType__actual, AssetValueType> {}

const AssetValueType: EnumCodecAndFactory<AssetValueType> = createEnumCodec<AssetValueType__actual, AssetValueType>('AssetValueType', [
    [0, 'Quantity'],
    [1, 'BigQuantity'],
    [2, 'Fixed'],
    [3, 'Store']
])

// Type: BlockCreationTimeout

import { Void as BlockCreationTimeout } from '@scale-codec/definition-runtime'

// Type: BlockHeader

interface BlockHeader__actual {
    timestamp: U128
    consensus_estimation: U64
    height: U64
    previous_block_hash: HashOfVersionedCommittedBlock
    transactions_hash: HashOfMerkleTreeVersionedTransaction
    rejected_transactions_hash: HashOfMerkleTreeVersionedTransaction
    view_change_proofs: ProofChain
    invalidated_blocks_hashes: VecHashOfVersionedValidBlock
    genesis_topology: OptionTopology
}

interface BlockHeader extends Opaque<BlockHeader__actual, BlockHeader> {}

const BlockHeader: StructCodecAndFactory<BlockHeader__actual, BlockHeader> = createStructCodec<BlockHeader__actual, BlockHeader>('BlockHeader', [
    ['timestamp', U128],
    ['consensus_estimation', U64],
    ['height', U64],
    ['previous_block_hash', __dyn_HashOfVersionedCommittedBlock],
    ['transactions_hash', __dyn_HashOfMerkleTreeVersionedTransaction],
    ['rejected_transactions_hash', __dyn_HashOfMerkleTreeVersionedTransaction],
    ['view_change_proofs', __dyn_ProofChain],
    ['invalidated_blocks_hashes', __dyn_VecHashOfVersionedValidBlock],
    ['genesis_topology', __dyn_OptionTopology]
])

// Type: BlockPublisherMessage

type BlockPublisherMessage__actual = Enum<
    | 'SubscriptionAccepted'
    | ['Block', VersionedCommittedBlock]
>

interface BlockPublisherMessage extends Opaque<BlockPublisherMessage__actual, BlockPublisherMessage> {}

const BlockPublisherMessage: EnumCodecAndFactory<BlockPublisherMessage> = createEnumCodec<BlockPublisherMessage__actual, BlockPublisherMessage>('BlockPublisherMessage', [
    [0, 'SubscriptionAccepted'],
    [1, 'Block', __dyn_VersionedCommittedBlock]
])

// Type: BlockRejectionReason

type BlockRejectionReason__actual = Enum<
    | 'ConsensusBlockRejection'
>

interface BlockRejectionReason extends Opaque<BlockRejectionReason__actual, BlockRejectionReason> {}

const BlockRejectionReason: EnumCodecAndFactory<BlockRejectionReason> = createEnumCodec<BlockRejectionReason__actual, BlockRejectionReason>('BlockRejectionReason', [
    [0, 'ConsensusBlockRejection']
])

// Type: BlockSubscriberMessage

type BlockSubscriberMessage__actual = Enum<
    | ['SubscriptionRequest', U64]
    | 'BlockReceived'
>

interface BlockSubscriberMessage extends Opaque<BlockSubscriberMessage__actual, BlockSubscriberMessage> {}

const BlockSubscriberMessage: EnumCodecAndFactory<BlockSubscriberMessage> = createEnumCodec<BlockSubscriberMessage__actual, BlockSubscriberMessage>('BlockSubscriberMessage', [
    [0, 'SubscriptionRequest', U64],
    [1, 'BlockReceived']
])

// Type: BurnBox

interface BurnBox__actual {
    object: EvaluatesToValue
    destination_id: EvaluatesToIdBox
}

interface BurnBox extends Opaque<BurnBox__actual, BurnBox> {}

const BurnBox: StructCodecAndFactory<BurnBox__actual, BurnBox> = createStructCodec<BurnBox__actual, BurnBox>('BurnBox', [
    ['object', __dyn_EvaluatesToValue],
    ['destination_id', __dyn_EvaluatesToIdBox]
])

// Type: CommitTimeout

interface CommitTimeout__actual {
    hash: HashOfVersionedValidBlock
}

interface CommitTimeout extends Opaque<CommitTimeout__actual, CommitTimeout> {}

const CommitTimeout: StructCodecAndFactory<CommitTimeout__actual, CommitTimeout> = createStructCodec<CommitTimeout__actual, CommitTimeout>('CommitTimeout', [
    ['hash', __dyn_HashOfVersionedValidBlock]
])

// Type: CommittedBlock

interface CommittedBlock__actual {
    header: BlockHeader
    rejected_transactions: VecVersionedRejectedTransaction
    transactions: VecVersionedValidTransaction
    event_recommendations: VecEvent
    signatures: SignaturesOfCommittedBlock
}

interface CommittedBlock extends Opaque<CommittedBlock__actual, CommittedBlock> {}

const CommittedBlock: StructCodecAndFactory<CommittedBlock__actual, CommittedBlock> = createStructCodec<CommittedBlock__actual, CommittedBlock>('CommittedBlock', [
    ['header', __dyn_BlockHeader],
    ['rejected_transactions', __dyn_VecVersionedRejectedTransaction],
    ['transactions', __dyn_VecVersionedValidTransaction],
    ['event_recommendations', __dyn_VecEvent],
    ['signatures', __dyn_SignaturesOfCommittedBlock]
])

// Type: Contains

interface Contains__actual {
    collection: EvaluatesToVecValue
    element: EvaluatesToValue
}

interface Contains extends Opaque<Contains__actual, Contains> {}

const Contains: StructCodecAndFactory<Contains__actual, Contains> = createStructCodec<Contains__actual, Contains>('Contains', [
    ['collection', __dyn_EvaluatesToVecValue],
    ['element', __dyn_EvaluatesToValue]
])

// Type: ContainsAll

interface ContainsAll__actual {
    collection: EvaluatesToVecValue
    elements: EvaluatesToVecValue
}

interface ContainsAll extends Opaque<ContainsAll__actual, ContainsAll> {}

const ContainsAll: StructCodecAndFactory<ContainsAll__actual, ContainsAll> = createStructCodec<ContainsAll__actual, ContainsAll>('ContainsAll', [
    ['collection', __dyn_EvaluatesToVecValue],
    ['elements', __dyn_EvaluatesToVecValue]
])

// Type: ContainsAny

interface ContainsAny__actual {
    collection: EvaluatesToVecValue
    elements: EvaluatesToVecValue
}

interface ContainsAny extends Opaque<ContainsAny__actual, ContainsAny> {}

const ContainsAny: StructCodecAndFactory<ContainsAny__actual, ContainsAny> = createStructCodec<ContainsAny__actual, ContainsAny>('ContainsAny', [
    ['collection', __dyn_EvaluatesToVecValue],
    ['elements', __dyn_EvaluatesToVecValue]
])

// Type: ContextValue

interface ContextValue__actual {
    value_name: Str
}

interface ContextValue extends Opaque<ContextValue__actual, ContextValue> {}

const ContextValue: StructCodecAndFactory<ContextValue__actual, ContextValue> = createStructCodec<ContextValue__actual, ContextValue>('ContextValue', [
    ['value_name', Str]
])

// Type: DataEvent

type DataEvent__actual = Enum<
    | ['Peer', PeerEvent]
    | ['Domain', DomainEvent]
    | ['Account', AccountEvent]
    | ['AssetDefinition', AssetDefinitionEvent]
    | ['Asset', AssetEvent]
    | ['Trigger', TriggerEvent]
    | ['Role', RoleEvent]
>

interface DataEvent extends Opaque<DataEvent__actual, DataEvent> {}

const DataEvent: EnumCodecAndFactory<DataEvent> = createEnumCodec<DataEvent__actual, DataEvent>('DataEvent', [
    [0, 'Peer', __dyn_PeerEvent],
    [1, 'Domain', __dyn_DomainEvent],
    [2, 'Account', __dyn_AccountEvent],
    [3, 'AssetDefinition', __dyn_AssetDefinitionEvent],
    [4, 'Asset', __dyn_AssetEvent],
    [5, 'Trigger', __dyn_TriggerEvent],
    [6, 'Role', __dyn_RoleEvent]
])

// Type: Divide

interface Divide__actual {
    left: EvaluatesToU32
    right: EvaluatesToU32
}

interface Divide extends Opaque<Divide__actual, Divide> {}

const Divide: StructCodecAndFactory<Divide__actual, Divide> = createStructCodec<Divide__actual, Divide>('Divide', [
    ['left', __dyn_EvaluatesToU32],
    ['right', __dyn_EvaluatesToU32]
])

// Type: Domain

interface Domain__actual {
    id: DomainId
    accounts: MapAccountIdAccount
    asset_definitions: MapAssetDefinitionIdAssetDefinitionEntry
    logo: OptionIpfsPath
    metadata: Metadata
}

interface Domain extends Opaque<Domain__actual, Domain> {}

const Domain: StructCodecAndFactory<Domain__actual, Domain> = createStructCodec<Domain__actual, Domain>('Domain', [
    ['id', __dyn_DomainId],
    ['accounts', __dyn_MapAccountIdAccount],
    ['asset_definitions', __dyn_MapAssetDefinitionIdAssetDefinitionEntry],
    ['logo', __dyn_OptionIpfsPath],
    ['metadata', __dyn_Metadata]
])

// Type: DomainEvent

type DomainEvent__actual = Enum<
    | ['Account', AccountEvent]
    | ['AssetDefinition', AssetDefinitionEvent]
    | ['Created', DomainId]
    | ['Deleted', DomainId]
    | ['MetadataInserted', DomainId]
    | ['MetadataRemoved', DomainId]
>

interface DomainEvent extends Opaque<DomainEvent__actual, DomainEvent> {}

const DomainEvent: EnumCodecAndFactory<DomainEvent> = createEnumCodec<DomainEvent__actual, DomainEvent>('DomainEvent', [
    [0, 'Account', __dyn_AccountEvent],
    [1, 'AssetDefinition', __dyn_AssetDefinitionEvent],
    [2, 'Created', __dyn_DomainId],
    [3, 'Deleted', __dyn_DomainId],
    [4, 'MetadataInserted', __dyn_DomainId],
    [5, 'MetadataRemoved', __dyn_DomainId]
])

// Type: DomainEventFilter

type DomainEventFilter__actual = Enum<
    | ['ByAccount', FilterOptAccountFilter]
    | ['ByAssetDefinition', FilterOptAssetDefinitionFilter]
    | 'ByCreated'
    | 'ByDeleted'
    | 'ByMetadataInserted'
    | 'ByMetadataRemoved'
>

interface DomainEventFilter extends Opaque<DomainEventFilter__actual, DomainEventFilter> {}

const DomainEventFilter: EnumCodecAndFactory<DomainEventFilter> = createEnumCodec<DomainEventFilter__actual, DomainEventFilter>('DomainEventFilter', [
    [0, 'ByAccount', __dyn_FilterOptAccountFilter],
    [1, 'ByAssetDefinition', __dyn_FilterOptAssetDefinitionFilter],
    [2, 'ByCreated'],
    [3, 'ByDeleted'],
    [4, 'ByMetadataInserted'],
    [5, 'ByMetadataRemoved']
])

// Type: DomainFilter

interface DomainFilter__actual {
    id_filter: FilterOptIdFilterDomainId
    event_filter: FilterOptDomainEventFilter
}

interface DomainFilter extends Opaque<DomainFilter__actual, DomainFilter> {}

const DomainFilter: StructCodecAndFactory<DomainFilter__actual, DomainFilter> = createStructCodec<DomainFilter__actual, DomainFilter>('DomainFilter', [
    ['id_filter', __dyn_FilterOptIdFilterDomainId],
    ['event_filter', __dyn_FilterOptDomainEventFilter]
])

// Type: DomainId

interface DomainId__actual {
    name: Name
}

interface DomainId extends Opaque<DomainId__actual, DomainId> {}

const DomainId: StructCodecAndFactory<DomainId__actual, DomainId> = createStructCodec<DomainId__actual, DomainId>('DomainId', [
    ['name', __dyn_Name]
])

// Type: Duration

type Duration__actual = [U64, U32]

interface Duration extends Opaque<Duration__actual, Duration> {}

const Duration: ArrayCodecAndFactory<Duration__actual, Duration> = createTupleCodec<Duration__actual, Duration>('Duration', [U64, U32])

// Type: EntityFilter

type EntityFilter__actual = Enum<
    | ['ByPeer', FilterOptPeerFilter]
    | ['ByDomain', FilterOptDomainFilter]
    | ['ByAccount', FilterOptAccountFilter]
    | ['ByAssetDefinition', FilterOptAssetDefinitionFilter]
    | ['ByAsset', FilterOptAssetFilter]
    | ['ByTrigger', FilterOptTriggerFilter]
    | ['ByRole', FilterOptRoleFilter]
>

interface EntityFilter extends Opaque<EntityFilter__actual, EntityFilter> {}

const EntityFilter: EnumCodecAndFactory<EntityFilter> = createEnumCodec<EntityFilter__actual, EntityFilter>('EntityFilter', [
    [0, 'ByPeer', __dyn_FilterOptPeerFilter],
    [1, 'ByDomain', __dyn_FilterOptDomainFilter],
    [2, 'ByAccount', __dyn_FilterOptAccountFilter],
    [3, 'ByAssetDefinition', __dyn_FilterOptAssetDefinitionFilter],
    [4, 'ByAsset', __dyn_FilterOptAssetFilter],
    [5, 'ByTrigger', __dyn_FilterOptTriggerFilter],
    [6, 'ByRole', __dyn_FilterOptRoleFilter]
])

// Type: Equal

interface Equal__actual {
    left: EvaluatesToValue
    right: EvaluatesToValue
}

interface Equal extends Opaque<Equal__actual, Equal> {}

const Equal: StructCodecAndFactory<Equal__actual, Equal> = createStructCodec<Equal__actual, Equal>('Equal', [
    ['left', __dyn_EvaluatesToValue],
    ['right', __dyn_EvaluatesToValue]
])

// Type: EvaluatesToAccountId

interface EvaluatesToAccountId__actual {
    expression: Expression
}

interface EvaluatesToAccountId extends Opaque<EvaluatesToAccountId__actual, EvaluatesToAccountId> {}

const EvaluatesToAccountId: StructCodecAndFactory<EvaluatesToAccountId__actual, EvaluatesToAccountId> = createStructCodec<EvaluatesToAccountId__actual, EvaluatesToAccountId>('EvaluatesToAccountId', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToAssetDefinitionId

interface EvaluatesToAssetDefinitionId__actual {
    expression: Expression
}

interface EvaluatesToAssetDefinitionId extends Opaque<EvaluatesToAssetDefinitionId__actual, EvaluatesToAssetDefinitionId> {}

const EvaluatesToAssetDefinitionId: StructCodecAndFactory<EvaluatesToAssetDefinitionId__actual, EvaluatesToAssetDefinitionId> = createStructCodec<EvaluatesToAssetDefinitionId__actual, EvaluatesToAssetDefinitionId>('EvaluatesToAssetDefinitionId', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToAssetId

interface EvaluatesToAssetId__actual {
    expression: Expression
}

interface EvaluatesToAssetId extends Opaque<EvaluatesToAssetId__actual, EvaluatesToAssetId> {}

const EvaluatesToAssetId: StructCodecAndFactory<EvaluatesToAssetId__actual, EvaluatesToAssetId> = createStructCodec<EvaluatesToAssetId__actual, EvaluatesToAssetId>('EvaluatesToAssetId', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToBool

interface EvaluatesToBool__actual {
    expression: Expression
}

interface EvaluatesToBool extends Opaque<EvaluatesToBool__actual, EvaluatesToBool> {}

const EvaluatesToBool: StructCodecAndFactory<EvaluatesToBool__actual, EvaluatesToBool> = createStructCodec<EvaluatesToBool__actual, EvaluatesToBool>('EvaluatesToBool', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToDomainId

interface EvaluatesToDomainId__actual {
    expression: Expression
}

interface EvaluatesToDomainId extends Opaque<EvaluatesToDomainId__actual, EvaluatesToDomainId> {}

const EvaluatesToDomainId: StructCodecAndFactory<EvaluatesToDomainId__actual, EvaluatesToDomainId> = createStructCodec<EvaluatesToDomainId__actual, EvaluatesToDomainId>('EvaluatesToDomainId', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToHash

interface EvaluatesToHash__actual {
    expression: Expression
}

interface EvaluatesToHash extends Opaque<EvaluatesToHash__actual, EvaluatesToHash> {}

const EvaluatesToHash: StructCodecAndFactory<EvaluatesToHash__actual, EvaluatesToHash> = createStructCodec<EvaluatesToHash__actual, EvaluatesToHash>('EvaluatesToHash', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToIdBox

interface EvaluatesToIdBox__actual {
    expression: Expression
}

interface EvaluatesToIdBox extends Opaque<EvaluatesToIdBox__actual, EvaluatesToIdBox> {}

const EvaluatesToIdBox: StructCodecAndFactory<EvaluatesToIdBox__actual, EvaluatesToIdBox> = createStructCodec<EvaluatesToIdBox__actual, EvaluatesToIdBox>('EvaluatesToIdBox', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToName

interface EvaluatesToName__actual {
    expression: Expression
}

interface EvaluatesToName extends Opaque<EvaluatesToName__actual, EvaluatesToName> {}

const EvaluatesToName: StructCodecAndFactory<EvaluatesToName__actual, EvaluatesToName> = createStructCodec<EvaluatesToName__actual, EvaluatesToName>('EvaluatesToName', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToRegistrableBox

interface EvaluatesToRegistrableBox__actual {
    expression: Expression
}

interface EvaluatesToRegistrableBox extends Opaque<EvaluatesToRegistrableBox__actual, EvaluatesToRegistrableBox> {}

const EvaluatesToRegistrableBox: StructCodecAndFactory<EvaluatesToRegistrableBox__actual, EvaluatesToRegistrableBox> = createStructCodec<EvaluatesToRegistrableBox__actual, EvaluatesToRegistrableBox>('EvaluatesToRegistrableBox', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToRoleId

interface EvaluatesToRoleId__actual {
    expression: Expression
}

interface EvaluatesToRoleId extends Opaque<EvaluatesToRoleId__actual, EvaluatesToRoleId> {}

const EvaluatesToRoleId: StructCodecAndFactory<EvaluatesToRoleId__actual, EvaluatesToRoleId> = createStructCodec<EvaluatesToRoleId__actual, EvaluatesToRoleId>('EvaluatesToRoleId', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToTriggerId

interface EvaluatesToTriggerId__actual {
    expression: Expression
}

interface EvaluatesToTriggerId extends Opaque<EvaluatesToTriggerId__actual, EvaluatesToTriggerId> {}

const EvaluatesToTriggerId: StructCodecAndFactory<EvaluatesToTriggerId__actual, EvaluatesToTriggerId> = createStructCodec<EvaluatesToTriggerId__actual, EvaluatesToTriggerId>('EvaluatesToTriggerId', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToU32

interface EvaluatesToU32__actual {
    expression: Expression
}

interface EvaluatesToU32 extends Opaque<EvaluatesToU32__actual, EvaluatesToU32> {}

const EvaluatesToU32: StructCodecAndFactory<EvaluatesToU32__actual, EvaluatesToU32> = createStructCodec<EvaluatesToU32__actual, EvaluatesToU32>('EvaluatesToU32', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToValue

interface EvaluatesToValue__actual {
    expression: Expression
}

interface EvaluatesToValue extends Opaque<EvaluatesToValue__actual, EvaluatesToValue> {}

const EvaluatesToValue: StructCodecAndFactory<EvaluatesToValue__actual, EvaluatesToValue> = createStructCodec<EvaluatesToValue__actual, EvaluatesToValue>('EvaluatesToValue', [
    ['expression', __dyn_Expression]
])

// Type: EvaluatesToVecValue

interface EvaluatesToVecValue__actual {
    expression: Expression
}

interface EvaluatesToVecValue extends Opaque<EvaluatesToVecValue__actual, EvaluatesToVecValue> {}

const EvaluatesToVecValue: StructCodecAndFactory<EvaluatesToVecValue__actual, EvaluatesToVecValue> = createStructCodec<EvaluatesToVecValue__actual, EvaluatesToVecValue>('EvaluatesToVecValue', [
    ['expression', __dyn_Expression]
])

// Type: Event

type Event__actual = Enum<
    | ['Pipeline', PipelineEvent]
    | ['Data', DataEvent]
    | ['Time', TimeEvent]
    | ['ExecuteTrigger', ExecuteTriggerEvent]
>

interface Event extends Opaque<Event__actual, Event> {}

const Event: EnumCodecAndFactory<Event> = createEnumCodec<Event__actual, Event>('Event', [
    [0, 'Pipeline', __dyn_PipelineEvent],
    [1, 'Data', __dyn_DataEvent],
    [2, 'Time', __dyn_TimeEvent],
    [3, 'ExecuteTrigger', __dyn_ExecuteTriggerEvent]
])

// Type: EventPublisherMessage

type EventPublisherMessage__actual = Enum<
    | 'SubscriptionAccepted'
    | ['Event', Event]
>

interface EventPublisherMessage extends Opaque<EventPublisherMessage__actual, EventPublisherMessage> {}

const EventPublisherMessage: EnumCodecAndFactory<EventPublisherMessage> = createEnumCodec<EventPublisherMessage__actual, EventPublisherMessage>('EventPublisherMessage', [
    [0, 'SubscriptionAccepted'],
    [1, 'Event', __dyn_Event]
])

// Type: EventSubscriberMessage

type EventSubscriberMessage__actual = Enum<
    | ['SubscriptionRequest', FilterBox]
    | 'EventReceived'
>

interface EventSubscriberMessage extends Opaque<EventSubscriberMessage__actual, EventSubscriberMessage> {}

const EventSubscriberMessage: EnumCodecAndFactory<EventSubscriberMessage> = createEnumCodec<EventSubscriberMessage__actual, EventSubscriberMessage>('EventSubscriberMessage', [
    [0, 'SubscriptionRequest', __dyn_FilterBox],
    [1, 'EventReceived']
])

// Type: Executable

type Executable__actual = Enum<
    | ['Instructions', VecInstruction]
    | ['Wasm', WasmSmartContract]
>

interface Executable extends Opaque<Executable__actual, Executable> {}

const Executable: EnumCodecAndFactory<Executable> = createEnumCodec<Executable__actual, Executable>('Executable', [
    [0, 'Instructions', __dyn_VecInstruction],
    [1, 'Wasm', __dyn_WasmSmartContract]
])

// Type: ExecuteTriggerBox

interface ExecuteTriggerBox__actual {
    trigger_id: TriggerId
}

interface ExecuteTriggerBox extends Opaque<ExecuteTriggerBox__actual, ExecuteTriggerBox> {}

const ExecuteTriggerBox: StructCodecAndFactory<ExecuteTriggerBox__actual, ExecuteTriggerBox> = createStructCodec<ExecuteTriggerBox__actual, ExecuteTriggerBox>('ExecuteTriggerBox', [
    ['trigger_id', __dyn_TriggerId]
])

// Type: ExecuteTriggerEvent

interface ExecuteTriggerEvent__actual {
    trigger_id: TriggerId
    authority: AccountId
}

interface ExecuteTriggerEvent extends Opaque<ExecuteTriggerEvent__actual, ExecuteTriggerEvent> {}

const ExecuteTriggerEvent: StructCodecAndFactory<ExecuteTriggerEvent__actual, ExecuteTriggerEvent> = createStructCodec<ExecuteTriggerEvent__actual, ExecuteTriggerEvent>('ExecuteTriggerEvent', [
    ['trigger_id', __dyn_TriggerId],
    ['authority', __dyn_AccountId]
])

// Type: ExecuteTriggerEventFilter

interface ExecuteTriggerEventFilter__actual {
    trigger_id: TriggerId
    authority: AccountId
}

interface ExecuteTriggerEventFilter extends Opaque<ExecuteTriggerEventFilter__actual, ExecuteTriggerEventFilter> {}

const ExecuteTriggerEventFilter: StructCodecAndFactory<ExecuteTriggerEventFilter__actual, ExecuteTriggerEventFilter> = createStructCodec<ExecuteTriggerEventFilter__actual, ExecuteTriggerEventFilter>('ExecuteTriggerEventFilter', [
    ['trigger_id', __dyn_TriggerId],
    ['authority', __dyn_AccountId]
])

// Type: ExecutionTime

type ExecutionTime__actual = Enum<
    | 'PreCommit'
    | ['Schedule', TimeSchedule]
>

interface ExecutionTime extends Opaque<ExecutionTime__actual, ExecutionTime> {}

const ExecutionTime: EnumCodecAndFactory<ExecutionTime> = createEnumCodec<ExecutionTime__actual, ExecutionTime>('ExecutionTime', [
    [0, 'PreCommit'],
    [1, 'Schedule', __dyn_TimeSchedule]
])

// Type: Expression

type Expression__actual = Enum<
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
    | ['If', IfExpression]
    | ['Raw', Value]
    | ['Query', QueryBox]
    | ['Contains', Contains]
    | ['ContainsAll', ContainsAll]
    | ['ContainsAny', ContainsAny]
    | ['Where', Where]
    | ['ContextValue', ContextValue]
>

interface Expression extends Opaque<Expression__actual, Expression> {}

const Expression: EnumCodecAndFactory<Expression> = createEnumCodec<Expression__actual, Expression>('Expression', [
    [0, 'Add', __dyn_Add],
    [1, 'Subtract', __dyn_Subtract],
    [2, 'Multiply', __dyn_Multiply],
    [3, 'Divide', __dyn_Divide],
    [4, 'Mod', __dyn_Mod],
    [5, 'RaiseTo', __dyn_RaiseTo],
    [6, 'Greater', __dyn_Greater],
    [7, 'Less', __dyn_Less],
    [8, 'Equal', __dyn_Equal],
    [9, 'Not', __dyn_Not],
    [10, 'And', __dyn_And],
    [11, 'Or', __dyn_Or],
    [12, 'If', __dyn_IfExpression],
    [13, 'Raw', __dyn_Value],
    [14, 'Query', __dyn_QueryBox],
    [15, 'Contains', __dyn_Contains],
    [16, 'ContainsAll', __dyn_ContainsAll],
    [17, 'ContainsAny', __dyn_ContainsAny],
    [18, 'Where', __dyn_Where],
    [19, 'ContextValue', __dyn_ContextValue]
])

// Type: FailBox

interface FailBox__actual {
    message: Str
}

interface FailBox extends Opaque<FailBox__actual, FailBox> {}

const FailBox: StructCodecAndFactory<FailBox__actual, FailBox> = createStructCodec<FailBox__actual, FailBox>('FailBox', [
    ['message', Str]
])

// Type: FilterBox

type FilterBox__actual = Enum<
    | ['Pipeline', PipelineEventFilter]
    | ['Data', FilterOptEntityFilter]
    | ['Time', TimeEventFilter]
    | ['ExecuteTrigger', ExecuteTriggerEventFilter]
>

interface FilterBox extends Opaque<FilterBox__actual, FilterBox> {}

const FilterBox: EnumCodecAndFactory<FilterBox> = createEnumCodec<FilterBox__actual, FilterBox>('FilterBox', [
    [0, 'Pipeline', __dyn_PipelineEventFilter],
    [1, 'Data', __dyn_FilterOptEntityFilter],
    [2, 'Time', __dyn_TimeEventFilter],
    [3, 'ExecuteTrigger', __dyn_ExecuteTriggerEventFilter]
])

// Type: FilterOptAccountEventFilter

type FilterOptAccountEventFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', AccountEventFilter]
>

interface FilterOptAccountEventFilter extends Opaque<FilterOptAccountEventFilter__actual, FilterOptAccountEventFilter> {}

const FilterOptAccountEventFilter: EnumCodecAndFactory<FilterOptAccountEventFilter> = createEnumCodec<FilterOptAccountEventFilter__actual, FilterOptAccountEventFilter>('FilterOptAccountEventFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_AccountEventFilter]
])

// Type: FilterOptAccountFilter

type FilterOptAccountFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', AccountFilter]
>

interface FilterOptAccountFilter extends Opaque<FilterOptAccountFilter__actual, FilterOptAccountFilter> {}

const FilterOptAccountFilter: EnumCodecAndFactory<FilterOptAccountFilter> = createEnumCodec<FilterOptAccountFilter__actual, FilterOptAccountFilter>('FilterOptAccountFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_AccountFilter]
])

// Type: FilterOptAssetDefinitionEventFilter

type FilterOptAssetDefinitionEventFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', AssetDefinitionEventFilter]
>

interface FilterOptAssetDefinitionEventFilter extends Opaque<FilterOptAssetDefinitionEventFilter__actual, FilterOptAssetDefinitionEventFilter> {}

const FilterOptAssetDefinitionEventFilter: EnumCodecAndFactory<FilterOptAssetDefinitionEventFilter> = createEnumCodec<FilterOptAssetDefinitionEventFilter__actual, FilterOptAssetDefinitionEventFilter>('FilterOptAssetDefinitionEventFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_AssetDefinitionEventFilter]
])

// Type: FilterOptAssetDefinitionFilter

type FilterOptAssetDefinitionFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', AssetDefinitionFilter]
>

interface FilterOptAssetDefinitionFilter extends Opaque<FilterOptAssetDefinitionFilter__actual, FilterOptAssetDefinitionFilter> {}

const FilterOptAssetDefinitionFilter: EnumCodecAndFactory<FilterOptAssetDefinitionFilter> = createEnumCodec<FilterOptAssetDefinitionFilter__actual, FilterOptAssetDefinitionFilter>('FilterOptAssetDefinitionFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_AssetDefinitionFilter]
])

// Type: FilterOptAssetEventFilter

type FilterOptAssetEventFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', AssetEventFilter]
>

interface FilterOptAssetEventFilter extends Opaque<FilterOptAssetEventFilter__actual, FilterOptAssetEventFilter> {}

const FilterOptAssetEventFilter: EnumCodecAndFactory<FilterOptAssetEventFilter> = createEnumCodec<FilterOptAssetEventFilter__actual, FilterOptAssetEventFilter>('FilterOptAssetEventFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_AssetEventFilter]
])

// Type: FilterOptAssetFilter

type FilterOptAssetFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', AssetFilter]
>

interface FilterOptAssetFilter extends Opaque<FilterOptAssetFilter__actual, FilterOptAssetFilter> {}

const FilterOptAssetFilter: EnumCodecAndFactory<FilterOptAssetFilter> = createEnumCodec<FilterOptAssetFilter__actual, FilterOptAssetFilter>('FilterOptAssetFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_AssetFilter]
])

// Type: FilterOptDomainEventFilter

type FilterOptDomainEventFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', DomainEventFilter]
>

interface FilterOptDomainEventFilter extends Opaque<FilterOptDomainEventFilter__actual, FilterOptDomainEventFilter> {}

const FilterOptDomainEventFilter: EnumCodecAndFactory<FilterOptDomainEventFilter> = createEnumCodec<FilterOptDomainEventFilter__actual, FilterOptDomainEventFilter>('FilterOptDomainEventFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_DomainEventFilter]
])

// Type: FilterOptDomainFilter

type FilterOptDomainFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', DomainFilter]
>

interface FilterOptDomainFilter extends Opaque<FilterOptDomainFilter__actual, FilterOptDomainFilter> {}

const FilterOptDomainFilter: EnumCodecAndFactory<FilterOptDomainFilter> = createEnumCodec<FilterOptDomainFilter__actual, FilterOptDomainFilter>('FilterOptDomainFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_DomainFilter]
])

// Type: FilterOptEntityFilter

type FilterOptEntityFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', EntityFilter]
>

interface FilterOptEntityFilter extends Opaque<FilterOptEntityFilter__actual, FilterOptEntityFilter> {}

const FilterOptEntityFilter: EnumCodecAndFactory<FilterOptEntityFilter> = createEnumCodec<FilterOptEntityFilter__actual, FilterOptEntityFilter>('FilterOptEntityFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_EntityFilter]
])

// Type: FilterOptIdFilterAccountId

type FilterOptIdFilterAccountId__actual = Enum<
    | 'AcceptAll'
    | ['BySome', IdFilterAccountId]
>

interface FilterOptIdFilterAccountId extends Opaque<FilterOptIdFilterAccountId__actual, FilterOptIdFilterAccountId> {}

const FilterOptIdFilterAccountId: EnumCodecAndFactory<FilterOptIdFilterAccountId> = createEnumCodec<FilterOptIdFilterAccountId__actual, FilterOptIdFilterAccountId>('FilterOptIdFilterAccountId', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_IdFilterAccountId]
])

// Type: FilterOptIdFilterAssetDefinitionId

type FilterOptIdFilterAssetDefinitionId__actual = Enum<
    | 'AcceptAll'
    | ['BySome', IdFilterAssetDefinitionId]
>

interface FilterOptIdFilterAssetDefinitionId extends Opaque<FilterOptIdFilterAssetDefinitionId__actual, FilterOptIdFilterAssetDefinitionId> {}

const FilterOptIdFilterAssetDefinitionId: EnumCodecAndFactory<FilterOptIdFilterAssetDefinitionId> = createEnumCodec<FilterOptIdFilterAssetDefinitionId__actual, FilterOptIdFilterAssetDefinitionId>('FilterOptIdFilterAssetDefinitionId', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_IdFilterAssetDefinitionId]
])

// Type: FilterOptIdFilterAssetId

type FilterOptIdFilterAssetId__actual = Enum<
    | 'AcceptAll'
    | ['BySome', IdFilterAssetId]
>

interface FilterOptIdFilterAssetId extends Opaque<FilterOptIdFilterAssetId__actual, FilterOptIdFilterAssetId> {}

const FilterOptIdFilterAssetId: EnumCodecAndFactory<FilterOptIdFilterAssetId> = createEnumCodec<FilterOptIdFilterAssetId__actual, FilterOptIdFilterAssetId>('FilterOptIdFilterAssetId', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_IdFilterAssetId]
])

// Type: FilterOptIdFilterDomainId

type FilterOptIdFilterDomainId__actual = Enum<
    | 'AcceptAll'
    | ['BySome', IdFilterDomainId]
>

interface FilterOptIdFilterDomainId extends Opaque<FilterOptIdFilterDomainId__actual, FilterOptIdFilterDomainId> {}

const FilterOptIdFilterDomainId: EnumCodecAndFactory<FilterOptIdFilterDomainId> = createEnumCodec<FilterOptIdFilterDomainId__actual, FilterOptIdFilterDomainId>('FilterOptIdFilterDomainId', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_IdFilterDomainId]
])

// Type: FilterOptIdFilterPeerId

type FilterOptIdFilterPeerId__actual = Enum<
    | 'AcceptAll'
    | ['BySome', IdFilterPeerId]
>

interface FilterOptIdFilterPeerId extends Opaque<FilterOptIdFilterPeerId__actual, FilterOptIdFilterPeerId> {}

const FilterOptIdFilterPeerId: EnumCodecAndFactory<FilterOptIdFilterPeerId> = createEnumCodec<FilterOptIdFilterPeerId__actual, FilterOptIdFilterPeerId>('FilterOptIdFilterPeerId', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_IdFilterPeerId]
])

// Type: FilterOptIdFilterRoleId

type FilterOptIdFilterRoleId__actual = Enum<
    | 'AcceptAll'
    | ['BySome', IdFilterRoleId]
>

interface FilterOptIdFilterRoleId extends Opaque<FilterOptIdFilterRoleId__actual, FilterOptIdFilterRoleId> {}

const FilterOptIdFilterRoleId: EnumCodecAndFactory<FilterOptIdFilterRoleId> = createEnumCodec<FilterOptIdFilterRoleId__actual, FilterOptIdFilterRoleId>('FilterOptIdFilterRoleId', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_IdFilterRoleId]
])

// Type: FilterOptIdFilterTriggerId

type FilterOptIdFilterTriggerId__actual = Enum<
    | 'AcceptAll'
    | ['BySome', IdFilterTriggerId]
>

interface FilterOptIdFilterTriggerId extends Opaque<FilterOptIdFilterTriggerId__actual, FilterOptIdFilterTriggerId> {}

const FilterOptIdFilterTriggerId: EnumCodecAndFactory<FilterOptIdFilterTriggerId> = createEnumCodec<FilterOptIdFilterTriggerId__actual, FilterOptIdFilterTriggerId>('FilterOptIdFilterTriggerId', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_IdFilterTriggerId]
])

// Type: FilterOptPeerEventFilter

type FilterOptPeerEventFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', PeerEventFilter]
>

interface FilterOptPeerEventFilter extends Opaque<FilterOptPeerEventFilter__actual, FilterOptPeerEventFilter> {}

const FilterOptPeerEventFilter: EnumCodecAndFactory<FilterOptPeerEventFilter> = createEnumCodec<FilterOptPeerEventFilter__actual, FilterOptPeerEventFilter>('FilterOptPeerEventFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_PeerEventFilter]
])

// Type: FilterOptPeerFilter

type FilterOptPeerFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', PeerFilter]
>

interface FilterOptPeerFilter extends Opaque<FilterOptPeerFilter__actual, FilterOptPeerFilter> {}

const FilterOptPeerFilter: EnumCodecAndFactory<FilterOptPeerFilter> = createEnumCodec<FilterOptPeerFilter__actual, FilterOptPeerFilter>('FilterOptPeerFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_PeerFilter]
])

// Type: FilterOptRoleEventFilter

type FilterOptRoleEventFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', RoleEventFilter]
>

interface FilterOptRoleEventFilter extends Opaque<FilterOptRoleEventFilter__actual, FilterOptRoleEventFilter> {}

const FilterOptRoleEventFilter: EnumCodecAndFactory<FilterOptRoleEventFilter> = createEnumCodec<FilterOptRoleEventFilter__actual, FilterOptRoleEventFilter>('FilterOptRoleEventFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_RoleEventFilter]
])

// Type: FilterOptRoleFilter

type FilterOptRoleFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', RoleFilter]
>

interface FilterOptRoleFilter extends Opaque<FilterOptRoleFilter__actual, FilterOptRoleFilter> {}

const FilterOptRoleFilter: EnumCodecAndFactory<FilterOptRoleFilter> = createEnumCodec<FilterOptRoleFilter__actual, FilterOptRoleFilter>('FilterOptRoleFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_RoleFilter]
])

// Type: FilterOptTriggerEventFilter

type FilterOptTriggerEventFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', TriggerEventFilter]
>

interface FilterOptTriggerEventFilter extends Opaque<FilterOptTriggerEventFilter__actual, FilterOptTriggerEventFilter> {}

const FilterOptTriggerEventFilter: EnumCodecAndFactory<FilterOptTriggerEventFilter> = createEnumCodec<FilterOptTriggerEventFilter__actual, FilterOptTriggerEventFilter>('FilterOptTriggerEventFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_TriggerEventFilter]
])

// Type: FilterOptTriggerFilter

type FilterOptTriggerFilter__actual = Enum<
    | 'AcceptAll'
    | ['BySome', TriggerFilter]
>

interface FilterOptTriggerFilter extends Opaque<FilterOptTriggerFilter__actual, FilterOptTriggerFilter> {}

const FilterOptTriggerFilter: EnumCodecAndFactory<FilterOptTriggerFilter> = createEnumCodec<FilterOptTriggerFilter__actual, FilterOptTriggerFilter>('FilterOptTriggerFilter', [
    [0, 'AcceptAll'],
    [1, 'BySome', __dyn_TriggerFilter]
])

// Type: FindAccountById

interface FindAccountById__actual {
    id: EvaluatesToAccountId
}

interface FindAccountById extends Opaque<FindAccountById__actual, FindAccountById> {}

const FindAccountById: StructCodecAndFactory<FindAccountById__actual, FindAccountById> = createStructCodec<FindAccountById__actual, FindAccountById>('FindAccountById', [
    ['id', __dyn_EvaluatesToAccountId]
])

// Type: FindAccountKeyValueByIdAndKey

interface FindAccountKeyValueByIdAndKey__actual {
    id: EvaluatesToAccountId
    key: EvaluatesToName
}

interface FindAccountKeyValueByIdAndKey extends Opaque<FindAccountKeyValueByIdAndKey__actual, FindAccountKeyValueByIdAndKey> {}

const FindAccountKeyValueByIdAndKey: StructCodecAndFactory<FindAccountKeyValueByIdAndKey__actual, FindAccountKeyValueByIdAndKey> = createStructCodec<FindAccountKeyValueByIdAndKey__actual, FindAccountKeyValueByIdAndKey>('FindAccountKeyValueByIdAndKey', [
    ['id', __dyn_EvaluatesToAccountId],
    ['key', __dyn_EvaluatesToName]
])

// Type: FindAccountsByDomainId

interface FindAccountsByDomainId__actual {
    domain_id: EvaluatesToDomainId
}

interface FindAccountsByDomainId extends Opaque<FindAccountsByDomainId__actual, FindAccountsByDomainId> {}

const FindAccountsByDomainId: StructCodecAndFactory<FindAccountsByDomainId__actual, FindAccountsByDomainId> = createStructCodec<FindAccountsByDomainId__actual, FindAccountsByDomainId>('FindAccountsByDomainId', [
    ['domain_id', __dyn_EvaluatesToDomainId]
])

// Type: FindAccountsByName

interface FindAccountsByName__actual {
    name: EvaluatesToName
}

interface FindAccountsByName extends Opaque<FindAccountsByName__actual, FindAccountsByName> {}

const FindAccountsByName: StructCodecAndFactory<FindAccountsByName__actual, FindAccountsByName> = createStructCodec<FindAccountsByName__actual, FindAccountsByName>('FindAccountsByName', [
    ['name', __dyn_EvaluatesToName]
])

// Type: FindAccountsWithAsset

interface FindAccountsWithAsset__actual {
    asset_definition_id: EvaluatesToAssetDefinitionId
}

interface FindAccountsWithAsset extends Opaque<FindAccountsWithAsset__actual, FindAccountsWithAsset> {}

const FindAccountsWithAsset: StructCodecAndFactory<FindAccountsWithAsset__actual, FindAccountsWithAsset> = createStructCodec<FindAccountsWithAsset__actual, FindAccountsWithAsset>('FindAccountsWithAsset', [
    ['asset_definition_id', __dyn_EvaluatesToAssetDefinitionId]
])

// Type: FindAllAccounts

import { Void as FindAllAccounts } from '@scale-codec/definition-runtime'

// Type: FindAllActiveTriggerIds

import { Void as FindAllActiveTriggerIds } from '@scale-codec/definition-runtime'

// Type: FindAllAssets

import { Void as FindAllAssets } from '@scale-codec/definition-runtime'

// Type: FindAllAssetsDefinitions

import { Void as FindAllAssetsDefinitions } from '@scale-codec/definition-runtime'

// Type: FindAllDomains

import { Void as FindAllDomains } from '@scale-codec/definition-runtime'

// Type: FindAllPeers

import { Void as FindAllPeers } from '@scale-codec/definition-runtime'

// Type: FindAllRoleIds

import { Void as FindAllRoleIds } from '@scale-codec/definition-runtime'

// Type: FindAllRoles

import { Void as FindAllRoles } from '@scale-codec/definition-runtime'

// Type: FindAssetById

interface FindAssetById__actual {
    id: EvaluatesToAssetId
}

interface FindAssetById extends Opaque<FindAssetById__actual, FindAssetById> {}

const FindAssetById: StructCodecAndFactory<FindAssetById__actual, FindAssetById> = createStructCodec<FindAssetById__actual, FindAssetById>('FindAssetById', [
    ['id', __dyn_EvaluatesToAssetId]
])

// Type: FindAssetDefinitionKeyValueByIdAndKey

interface FindAssetDefinitionKeyValueByIdAndKey__actual {
    id: EvaluatesToAssetDefinitionId
    key: EvaluatesToName
}

interface FindAssetDefinitionKeyValueByIdAndKey extends Opaque<FindAssetDefinitionKeyValueByIdAndKey__actual, FindAssetDefinitionKeyValueByIdAndKey> {}

const FindAssetDefinitionKeyValueByIdAndKey: StructCodecAndFactory<FindAssetDefinitionKeyValueByIdAndKey__actual, FindAssetDefinitionKeyValueByIdAndKey> = createStructCodec<FindAssetDefinitionKeyValueByIdAndKey__actual, FindAssetDefinitionKeyValueByIdAndKey>('FindAssetDefinitionKeyValueByIdAndKey', [
    ['id', __dyn_EvaluatesToAssetDefinitionId],
    ['key', __dyn_EvaluatesToName]
])

// Type: FindAssetKeyValueByIdAndKey

interface FindAssetKeyValueByIdAndKey__actual {
    id: EvaluatesToAssetId
    key: EvaluatesToName
}

interface FindAssetKeyValueByIdAndKey extends Opaque<FindAssetKeyValueByIdAndKey__actual, FindAssetKeyValueByIdAndKey> {}

const FindAssetKeyValueByIdAndKey: StructCodecAndFactory<FindAssetKeyValueByIdAndKey__actual, FindAssetKeyValueByIdAndKey> = createStructCodec<FindAssetKeyValueByIdAndKey__actual, FindAssetKeyValueByIdAndKey>('FindAssetKeyValueByIdAndKey', [
    ['id', __dyn_EvaluatesToAssetId],
    ['key', __dyn_EvaluatesToName]
])

// Type: FindAssetQuantityById

interface FindAssetQuantityById__actual {
    id: EvaluatesToAssetId
}

interface FindAssetQuantityById extends Opaque<FindAssetQuantityById__actual, FindAssetQuantityById> {}

const FindAssetQuantityById: StructCodecAndFactory<FindAssetQuantityById__actual, FindAssetQuantityById> = createStructCodec<FindAssetQuantityById__actual, FindAssetQuantityById>('FindAssetQuantityById', [
    ['id', __dyn_EvaluatesToAssetId]
])

// Type: FindAssetsByAccountId

interface FindAssetsByAccountId__actual {
    account_id: EvaluatesToAccountId
}

interface FindAssetsByAccountId extends Opaque<FindAssetsByAccountId__actual, FindAssetsByAccountId> {}

const FindAssetsByAccountId: StructCodecAndFactory<FindAssetsByAccountId__actual, FindAssetsByAccountId> = createStructCodec<FindAssetsByAccountId__actual, FindAssetsByAccountId>('FindAssetsByAccountId', [
    ['account_id', __dyn_EvaluatesToAccountId]
])

// Type: FindAssetsByAssetDefinitionId

interface FindAssetsByAssetDefinitionId__actual {
    asset_definition_id: EvaluatesToAssetDefinitionId
}

interface FindAssetsByAssetDefinitionId extends Opaque<FindAssetsByAssetDefinitionId__actual, FindAssetsByAssetDefinitionId> {}

const FindAssetsByAssetDefinitionId: StructCodecAndFactory<FindAssetsByAssetDefinitionId__actual, FindAssetsByAssetDefinitionId> = createStructCodec<FindAssetsByAssetDefinitionId__actual, FindAssetsByAssetDefinitionId>('FindAssetsByAssetDefinitionId', [
    ['asset_definition_id', __dyn_EvaluatesToAssetDefinitionId]
])

// Type: FindAssetsByDomainId

interface FindAssetsByDomainId__actual {
    domain_id: EvaluatesToDomainId
}

interface FindAssetsByDomainId extends Opaque<FindAssetsByDomainId__actual, FindAssetsByDomainId> {}

const FindAssetsByDomainId: StructCodecAndFactory<FindAssetsByDomainId__actual, FindAssetsByDomainId> = createStructCodec<FindAssetsByDomainId__actual, FindAssetsByDomainId>('FindAssetsByDomainId', [
    ['domain_id', __dyn_EvaluatesToDomainId]
])

// Type: FindAssetsByDomainIdAndAssetDefinitionId

interface FindAssetsByDomainIdAndAssetDefinitionId__actual {
    domain_id: EvaluatesToDomainId
    asset_definition_id: EvaluatesToAssetDefinitionId
}

interface FindAssetsByDomainIdAndAssetDefinitionId extends Opaque<FindAssetsByDomainIdAndAssetDefinitionId__actual, FindAssetsByDomainIdAndAssetDefinitionId> {}

const FindAssetsByDomainIdAndAssetDefinitionId: StructCodecAndFactory<FindAssetsByDomainIdAndAssetDefinitionId__actual, FindAssetsByDomainIdAndAssetDefinitionId> = createStructCodec<FindAssetsByDomainIdAndAssetDefinitionId__actual, FindAssetsByDomainIdAndAssetDefinitionId>('FindAssetsByDomainIdAndAssetDefinitionId', [
    ['domain_id', __dyn_EvaluatesToDomainId],
    ['asset_definition_id', __dyn_EvaluatesToAssetDefinitionId]
])

// Type: FindAssetsByName

interface FindAssetsByName__actual {
    name: EvaluatesToName
}

interface FindAssetsByName extends Opaque<FindAssetsByName__actual, FindAssetsByName> {}

const FindAssetsByName: StructCodecAndFactory<FindAssetsByName__actual, FindAssetsByName> = createStructCodec<FindAssetsByName__actual, FindAssetsByName>('FindAssetsByName', [
    ['name', __dyn_EvaluatesToName]
])

// Type: FindDomainById

interface FindDomainById__actual {
    id: EvaluatesToDomainId
}

interface FindDomainById extends Opaque<FindDomainById__actual, FindDomainById> {}

const FindDomainById: StructCodecAndFactory<FindDomainById__actual, FindDomainById> = createStructCodec<FindDomainById__actual, FindDomainById>('FindDomainById', [
    ['id', __dyn_EvaluatesToDomainId]
])

// Type: FindDomainKeyValueByIdAndKey

interface FindDomainKeyValueByIdAndKey__actual {
    id: EvaluatesToDomainId
    key: EvaluatesToName
}

interface FindDomainKeyValueByIdAndKey extends Opaque<FindDomainKeyValueByIdAndKey__actual, FindDomainKeyValueByIdAndKey> {}

const FindDomainKeyValueByIdAndKey: StructCodecAndFactory<FindDomainKeyValueByIdAndKey__actual, FindDomainKeyValueByIdAndKey> = createStructCodec<FindDomainKeyValueByIdAndKey__actual, FindDomainKeyValueByIdAndKey>('FindDomainKeyValueByIdAndKey', [
    ['id', __dyn_EvaluatesToDomainId],
    ['key', __dyn_EvaluatesToName]
])

// Type: FindError

type FindError__actual = Enum<
    | ['Asset', AssetId]
    | ['AssetDefinition', AssetDefinitionId]
    | ['Account', AccountId]
    | ['Domain', DomainId]
    | ['MetadataKey', Name]
    | ['Block', ParentHashNotFound]
    | ['Transaction', HashOfVersionedTransaction]
    | ['Context', Str]
    | ['Peer', PeerId]
    | ['Trigger', TriggerId]
    | ['Role', RoleId]
>

interface FindError extends Opaque<FindError__actual, FindError> {}

const FindError: EnumCodecAndFactory<FindError> = createEnumCodec<FindError__actual, FindError>('FindError', [
    [0, 'Asset', __dyn_AssetId],
    [1, 'AssetDefinition', __dyn_AssetDefinitionId],
    [2, 'Account', __dyn_AccountId],
    [3, 'Domain', __dyn_DomainId],
    [4, 'MetadataKey', __dyn_Name],
    [5, 'Block', __dyn_ParentHashNotFound],
    [6, 'Transaction', __dyn_HashOfVersionedTransaction],
    [7, 'Context', Str],
    [8, 'Peer', __dyn_PeerId],
    [9, 'Trigger', __dyn_TriggerId],
    [10, 'Role', __dyn_RoleId]
])

// Type: FindPermissionTokensByAccountId

interface FindPermissionTokensByAccountId__actual {
    id: EvaluatesToAccountId
}

interface FindPermissionTokensByAccountId extends Opaque<FindPermissionTokensByAccountId__actual, FindPermissionTokensByAccountId> {}

const FindPermissionTokensByAccountId: StructCodecAndFactory<FindPermissionTokensByAccountId__actual, FindPermissionTokensByAccountId> = createStructCodec<FindPermissionTokensByAccountId__actual, FindPermissionTokensByAccountId>('FindPermissionTokensByAccountId', [
    ['id', __dyn_EvaluatesToAccountId]
])

// Type: FindRoleByRoleId

interface FindRoleByRoleId__actual {
    id: EvaluatesToRoleId
}

interface FindRoleByRoleId extends Opaque<FindRoleByRoleId__actual, FindRoleByRoleId> {}

const FindRoleByRoleId: StructCodecAndFactory<FindRoleByRoleId__actual, FindRoleByRoleId> = createStructCodec<FindRoleByRoleId__actual, FindRoleByRoleId>('FindRoleByRoleId', [
    ['id', __dyn_EvaluatesToRoleId]
])

// Type: FindRolesByAccountId

interface FindRolesByAccountId__actual {
    id: EvaluatesToAccountId
}

interface FindRolesByAccountId extends Opaque<FindRolesByAccountId__actual, FindRolesByAccountId> {}

const FindRolesByAccountId: StructCodecAndFactory<FindRolesByAccountId__actual, FindRolesByAccountId> = createStructCodec<FindRolesByAccountId__actual, FindRolesByAccountId>('FindRolesByAccountId', [
    ['id', __dyn_EvaluatesToAccountId]
])

// Type: FindTransactionByHash

interface FindTransactionByHash__actual {
    hash: EvaluatesToHash
}

interface FindTransactionByHash extends Opaque<FindTransactionByHash__actual, FindTransactionByHash> {}

const FindTransactionByHash: StructCodecAndFactory<FindTransactionByHash__actual, FindTransactionByHash> = createStructCodec<FindTransactionByHash__actual, FindTransactionByHash>('FindTransactionByHash', [
    ['hash', __dyn_EvaluatesToHash]
])

// Type: FindTransactionsByAccountId

interface FindTransactionsByAccountId__actual {
    account_id: EvaluatesToAccountId
}

interface FindTransactionsByAccountId extends Opaque<FindTransactionsByAccountId__actual, FindTransactionsByAccountId> {}

const FindTransactionsByAccountId: StructCodecAndFactory<FindTransactionsByAccountId__actual, FindTransactionsByAccountId> = createStructCodec<FindTransactionsByAccountId__actual, FindTransactionsByAccountId>('FindTransactionsByAccountId', [
    ['account_id', __dyn_EvaluatesToAccountId]
])

// Type: FindTriggerById

interface FindTriggerById__actual {
    id: EvaluatesToTriggerId
}

interface FindTriggerById extends Opaque<FindTriggerById__actual, FindTriggerById> {}

const FindTriggerById: StructCodecAndFactory<FindTriggerById__actual, FindTriggerById> = createStructCodec<FindTriggerById__actual, FindTriggerById>('FindTriggerById', [
    ['id', __dyn_EvaluatesToTriggerId]
])

// Type: FindTriggerKeyValueByIdAndKey

interface FindTriggerKeyValueByIdAndKey__actual {
    id: EvaluatesToTriggerId
    key: EvaluatesToName
}

interface FindTriggerKeyValueByIdAndKey extends Opaque<FindTriggerKeyValueByIdAndKey__actual, FindTriggerKeyValueByIdAndKey> {}

const FindTriggerKeyValueByIdAndKey: StructCodecAndFactory<FindTriggerKeyValueByIdAndKey__actual, FindTriggerKeyValueByIdAndKey> = createStructCodec<FindTriggerKeyValueByIdAndKey__actual, FindTriggerKeyValueByIdAndKey>('FindTriggerKeyValueByIdAndKey', [
    ['id', __dyn_EvaluatesToTriggerId],
    ['key', __dyn_EvaluatesToName]
])

// Type: Fixed

type Fixed = FixedPointI64

const Fixed: Codec<Fixed> = __dyn_FixedPointI64

// Type: FixedPointI64

import { FixedPointI64P9 as FixedPointI64 } from './fixed-point'

// Type: GenesisTransaction

interface GenesisTransaction__actual {
    isi: VecInstruction
}

interface GenesisTransaction extends Opaque<GenesisTransaction__actual, GenesisTransaction> {}

const GenesisTransaction: StructCodecAndFactory<GenesisTransaction__actual, GenesisTransaction> = createStructCodec<GenesisTransaction__actual, GenesisTransaction>('GenesisTransaction', [
    ['isi', __dyn_VecInstruction]
])

// Type: GrantBox

interface GrantBox__actual {
    object: EvaluatesToValue
    destination_id: EvaluatesToIdBox
}

interface GrantBox extends Opaque<GrantBox__actual, GrantBox> {}

const GrantBox: StructCodecAndFactory<GrantBox__actual, GrantBox> = createStructCodec<GrantBox__actual, GrantBox>('GrantBox', [
    ['object', __dyn_EvaluatesToValue],
    ['destination_id', __dyn_EvaluatesToIdBox]
])

// Type: Greater

interface Greater__actual {
    left: EvaluatesToU32
    right: EvaluatesToU32
}

interface Greater extends Opaque<Greater__actual, Greater> {}

const Greater: StructCodecAndFactory<Greater__actual, Greater> = createStructCodec<Greater__actual, Greater>('Greater', [
    ['left', __dyn_EvaluatesToU32],
    ['right', __dyn_EvaluatesToU32]
])

// Type: Hash

type Hash = ArrayU8L32

const Hash: Codec<Hash> = __dyn_ArrayU8L32

// Type: HashOfMerkleTreeVersionedTransaction

type HashOfMerkleTreeVersionedTransaction = Hash

const HashOfMerkleTreeVersionedTransaction: Codec<HashOfMerkleTreeVersionedTransaction> = __dyn_Hash

// Type: HashOfProof

type HashOfProof = Hash

const HashOfProof: Codec<HashOfProof> = __dyn_Hash

// Type: HashOfVersionedCommittedBlock

type HashOfVersionedCommittedBlock = Hash

const HashOfVersionedCommittedBlock: Codec<HashOfVersionedCommittedBlock> = __dyn_Hash

// Type: HashOfVersionedTransaction

type HashOfVersionedTransaction = Hash

const HashOfVersionedTransaction: Codec<HashOfVersionedTransaction> = __dyn_Hash

// Type: HashOfVersionedValidBlock

type HashOfVersionedValidBlock = Hash

const HashOfVersionedValidBlock: Codec<HashOfVersionedValidBlock> = __dyn_Hash

// Type: IdBox

type IdBox__actual = Enum<
    | ['DomainId', DomainId]
    | ['AccountId', AccountId]
    | ['AssetDefinitionId', AssetDefinitionId]
    | ['AssetId', AssetId]
    | ['PeerId', PeerId]
    | ['TriggerId', TriggerId]
    | ['RoleId', RoleId]
>

interface IdBox extends Opaque<IdBox__actual, IdBox> {}

const IdBox: EnumCodecAndFactory<IdBox> = createEnumCodec<IdBox__actual, IdBox>('IdBox', [
    [0, 'DomainId', __dyn_DomainId],
    [1, 'AccountId', __dyn_AccountId],
    [2, 'AssetDefinitionId', __dyn_AssetDefinitionId],
    [3, 'AssetId', __dyn_AssetId],
    [4, 'PeerId', __dyn_PeerId],
    [5, 'TriggerId', __dyn_TriggerId],
    [6, 'RoleId', __dyn_RoleId]
])

// Type: IdFilterAccountId

type IdFilterAccountId = AccountId

const IdFilterAccountId: Codec<IdFilterAccountId> = __dyn_AccountId

// Type: IdFilterAssetDefinitionId

type IdFilterAssetDefinitionId = AssetDefinitionId

const IdFilterAssetDefinitionId: Codec<IdFilterAssetDefinitionId> = __dyn_AssetDefinitionId

// Type: IdFilterAssetId

type IdFilterAssetId = AssetId

const IdFilterAssetId: Codec<IdFilterAssetId> = __dyn_AssetId

// Type: IdFilterDomainId

type IdFilterDomainId = DomainId

const IdFilterDomainId: Codec<IdFilterDomainId> = __dyn_DomainId

// Type: IdFilterPeerId

type IdFilterPeerId = PeerId

const IdFilterPeerId: Codec<IdFilterPeerId> = __dyn_PeerId

// Type: IdFilterRoleId

type IdFilterRoleId = RoleId

const IdFilterRoleId: Codec<IdFilterRoleId> = __dyn_RoleId

// Type: IdFilterTriggerId

type IdFilterTriggerId = TriggerId

const IdFilterTriggerId: Codec<IdFilterTriggerId> = __dyn_TriggerId

// Type: IdentifiableBox

type IdentifiableBox__actual = Enum<
    | ['Peer', Peer]
    | ['NewDomain', NewDomain]
    | ['NewAccount', NewAccount]
    | ['Domain', Domain]
    | ['Account', Account]
    | ['AssetDefinition', AssetDefinition]
    | ['Asset', Asset]
    | ['Trigger', TriggerFilterBox]
    | ['Role', Role]
>

interface IdentifiableBox extends Opaque<IdentifiableBox__actual, IdentifiableBox> {}

const IdentifiableBox: EnumCodecAndFactory<IdentifiableBox> = createEnumCodec<IdentifiableBox__actual, IdentifiableBox>('IdentifiableBox', [
    [0, 'Peer', __dyn_Peer],
    [1, 'NewDomain', __dyn_NewDomain],
    [2, 'NewAccount', __dyn_NewAccount],
    [3, 'Domain', __dyn_Domain],
    [4, 'Account', __dyn_Account],
    [5, 'AssetDefinition', __dyn_AssetDefinition],
    [6, 'Asset', __dyn_Asset],
    [7, 'Trigger', __dyn_TriggerFilterBox],
    [8, 'Role', __dyn_Role]
])

// Type: IfExpression

interface IfExpression__actual {
    condition: EvaluatesToBool
    then_expression: EvaluatesToValue
    else_expression: EvaluatesToValue
}

interface IfExpression extends Opaque<IfExpression__actual, IfExpression> {}

const IfExpression: StructCodecAndFactory<IfExpression__actual, IfExpression> = createStructCodec<IfExpression__actual, IfExpression>('IfExpression', [
    ['condition', __dyn_EvaluatesToBool],
    ['then_expression', __dyn_EvaluatesToValue],
    ['else_expression', __dyn_EvaluatesToValue]
])

// Type: IfInstruction

interface IfInstruction__actual {
    condition: EvaluatesToBool
    then: Instruction
    otherwise: OptionInstruction
}

interface IfInstruction extends Opaque<IfInstruction__actual, IfInstruction> {}

const IfInstruction: StructCodecAndFactory<IfInstruction__actual, IfInstruction> = createStructCodec<IfInstruction__actual, IfInstruction>('IfInstruction', [
    ['condition', __dyn_EvaluatesToBool],
    ['then', __dyn_Instruction],
    ['otherwise', __dyn_OptionInstruction]
])

// Type: Instruction

type Instruction__actual = Enum<
    | ['Register', RegisterBox]
    | ['Unregister', UnregisterBox]
    | ['Mint', MintBox]
    | ['Burn', BurnBox]
    | ['Transfer', TransferBox]
    | ['If', IfInstruction]
    | ['Pair', Pair]
    | ['Sequence', SequenceBox]
    | ['Fail', FailBox]
    | ['SetKeyValue', SetKeyValueBox]
    | ['RemoveKeyValue', RemoveKeyValueBox]
    | ['Grant', GrantBox]
    | ['Revoke', RevokeBox]
    | ['ExecuteTrigger', ExecuteTriggerBox]
>

interface Instruction extends Opaque<Instruction__actual, Instruction> {}

const Instruction: EnumCodecAndFactory<Instruction> = createEnumCodec<Instruction__actual, Instruction>('Instruction', [
    [0, 'Register', __dyn_RegisterBox],
    [1, 'Unregister', __dyn_UnregisterBox],
    [2, 'Mint', __dyn_MintBox],
    [3, 'Burn', __dyn_BurnBox],
    [4, 'Transfer', __dyn_TransferBox],
    [5, 'If', __dyn_IfInstruction],
    [6, 'Pair', __dyn_Pair],
    [7, 'Sequence', __dyn_SequenceBox],
    [8, 'Fail', __dyn_FailBox],
    [9, 'SetKeyValue', __dyn_SetKeyValueBox],
    [10, 'RemoveKeyValue', __dyn_RemoveKeyValueBox],
    [11, 'Grant', __dyn_GrantBox],
    [12, 'Revoke', __dyn_RevokeBox],
    [13, 'ExecuteTrigger', __dyn_ExecuteTriggerBox]
])

// Type: InstructionExecutionFail

interface InstructionExecutionFail__actual {
    instruction: Instruction
    reason: Str
}

interface InstructionExecutionFail extends Opaque<InstructionExecutionFail__actual, InstructionExecutionFail> {}

const InstructionExecutionFail: StructCodecAndFactory<InstructionExecutionFail__actual, InstructionExecutionFail> = createStructCodec<InstructionExecutionFail__actual, InstructionExecutionFail>('InstructionExecutionFail', [
    ['instruction', __dyn_Instruction],
    ['reason', Str]
])

// Type: IpfsPath

type IpfsPath = Str

const IpfsPath: Codec<IpfsPath> = Str

// Type: Less

interface Less__actual {
    left: EvaluatesToU32
    right: EvaluatesToU32
}

interface Less extends Opaque<Less__actual, Less> {}

const Less: StructCodecAndFactory<Less__actual, Less> = createStructCodec<Less__actual, Less>('Less', [
    ['left', __dyn_EvaluatesToU32],
    ['right', __dyn_EvaluatesToU32]
])

// Type: MapAccountIdAccount

type MapAccountIdAccount__actual = Map<AccountId, Account>

interface MapAccountIdAccount extends Opaque<MapAccountIdAccount__actual, MapAccountIdAccount> {}

const MapAccountIdAccount: MapCodecAndFactory<MapAccountIdAccount__actual, MapAccountIdAccount> = createMapCodec<MapAccountIdAccount__actual, MapAccountIdAccount>('MapAccountIdAccount', __dyn_AccountId, __dyn_Account)

// Type: MapAssetDefinitionIdAssetDefinitionEntry

type MapAssetDefinitionIdAssetDefinitionEntry__actual = Map<AssetDefinitionId, AssetDefinitionEntry>

interface MapAssetDefinitionIdAssetDefinitionEntry extends Opaque<MapAssetDefinitionIdAssetDefinitionEntry__actual, MapAssetDefinitionIdAssetDefinitionEntry> {}

const MapAssetDefinitionIdAssetDefinitionEntry: MapCodecAndFactory<MapAssetDefinitionIdAssetDefinitionEntry__actual, MapAssetDefinitionIdAssetDefinitionEntry> = createMapCodec<MapAssetDefinitionIdAssetDefinitionEntry__actual, MapAssetDefinitionIdAssetDefinitionEntry>('MapAssetDefinitionIdAssetDefinitionEntry', __dyn_AssetDefinitionId, __dyn_AssetDefinitionEntry)

// Type: MapAssetIdAsset

type MapAssetIdAsset__actual = Map<AssetId, Asset>

interface MapAssetIdAsset extends Opaque<MapAssetIdAsset__actual, MapAssetIdAsset> {}

const MapAssetIdAsset: MapCodecAndFactory<MapAssetIdAsset__actual, MapAssetIdAsset> = createMapCodec<MapAssetIdAsset__actual, MapAssetIdAsset>('MapAssetIdAsset', __dyn_AssetId, __dyn_Asset)

// Type: MapNameValue

type MapNameValue__actual = Map<Name, Value>

interface MapNameValue extends Opaque<MapNameValue__actual, MapNameValue> {}

const MapNameValue: MapCodecAndFactory<MapNameValue__actual, MapNameValue> = createMapCodec<MapNameValue__actual, MapNameValue>('MapNameValue', __dyn_Name, __dyn_Value)

// Type: MapPublicKeySignatureOfCommittedBlock

type MapPublicKeySignatureOfCommittedBlock__actual = Map<PublicKey, SignatureOfCommittedBlock>

interface MapPublicKeySignatureOfCommittedBlock extends Opaque<MapPublicKeySignatureOfCommittedBlock__actual, MapPublicKeySignatureOfCommittedBlock> {}

const MapPublicKeySignatureOfCommittedBlock: MapCodecAndFactory<MapPublicKeySignatureOfCommittedBlock__actual, MapPublicKeySignatureOfCommittedBlock> = createMapCodec<MapPublicKeySignatureOfCommittedBlock__actual, MapPublicKeySignatureOfCommittedBlock>('MapPublicKeySignatureOfCommittedBlock', __dyn_PublicKey, __dyn_SignatureOfCommittedBlock)

// Type: MapPublicKeySignatureOfProof

type MapPublicKeySignatureOfProof__actual = Map<PublicKey, SignatureOfProof>

interface MapPublicKeySignatureOfProof extends Opaque<MapPublicKeySignatureOfProof__actual, MapPublicKeySignatureOfProof> {}

const MapPublicKeySignatureOfProof: MapCodecAndFactory<MapPublicKeySignatureOfProof__actual, MapPublicKeySignatureOfProof> = createMapCodec<MapPublicKeySignatureOfProof__actual, MapPublicKeySignatureOfProof>('MapPublicKeySignatureOfProof', __dyn_PublicKey, __dyn_SignatureOfProof)

// Type: MapPublicKeySignatureOfTransactionPayload

type MapPublicKeySignatureOfTransactionPayload__actual = Map<PublicKey, SignatureOfTransactionPayload>

interface MapPublicKeySignatureOfTransactionPayload extends Opaque<MapPublicKeySignatureOfTransactionPayload__actual, MapPublicKeySignatureOfTransactionPayload> {}

const MapPublicKeySignatureOfTransactionPayload: MapCodecAndFactory<MapPublicKeySignatureOfTransactionPayload__actual, MapPublicKeySignatureOfTransactionPayload> = createMapCodec<MapPublicKeySignatureOfTransactionPayload__actual, MapPublicKeySignatureOfTransactionPayload>('MapPublicKeySignatureOfTransactionPayload', __dyn_PublicKey, __dyn_SignatureOfTransactionPayload)

// Type: MapStringEvaluatesToValue

type MapStringEvaluatesToValue__actual = Map<Str, EvaluatesToValue>

interface MapStringEvaluatesToValue extends Opaque<MapStringEvaluatesToValue__actual, MapStringEvaluatesToValue> {}

const MapStringEvaluatesToValue: MapCodecAndFactory<MapStringEvaluatesToValue__actual, MapStringEvaluatesToValue> = createMapCodec<MapStringEvaluatesToValue__actual, MapStringEvaluatesToValue>('MapStringEvaluatesToValue', Str, __dyn_EvaluatesToValue)

// Type: MerkleTreeVersionedTransaction

type MerkleTreeVersionedTransaction__actual = HashOfVersionedTransaction[]

interface MerkleTreeVersionedTransaction extends Opaque<MerkleTreeVersionedTransaction__actual, MerkleTreeVersionedTransaction> {}

const MerkleTreeVersionedTransaction: ArrayCodecAndFactory<MerkleTreeVersionedTransaction__actual, MerkleTreeVersionedTransaction> = createVecCodec<MerkleTreeVersionedTransaction__actual, MerkleTreeVersionedTransaction>('MerkleTreeVersionedTransaction', __dyn_HashOfVersionedTransaction)

// Type: Metadata

interface Metadata__actual {
    map: MapNameValue
}

interface Metadata extends Opaque<Metadata__actual, Metadata> {}

const Metadata: StructCodecAndFactory<Metadata__actual, Metadata> = createStructCodec<Metadata__actual, Metadata>('Metadata', [
    ['map', __dyn_MapNameValue]
])

// Type: MintBox

interface MintBox__actual {
    object: EvaluatesToValue
    destination_id: EvaluatesToIdBox
}

interface MintBox extends Opaque<MintBox__actual, MintBox> {}

const MintBox: StructCodecAndFactory<MintBox__actual, MintBox> = createStructCodec<MintBox__actual, MintBox>('MintBox', [
    ['object', __dyn_EvaluatesToValue],
    ['destination_id', __dyn_EvaluatesToIdBox]
])

// Type: Mintable

type Mintable__actual = Enum<
    | 'Infinitely'
    | 'Once'
    | 'Not'
>

interface Mintable extends Opaque<Mintable__actual, Mintable> {}

const Mintable: EnumCodecAndFactory<Mintable> = createEnumCodec<Mintable__actual, Mintable>('Mintable', [
    [0, 'Infinitely'],
    [1, 'Once'],
    [2, 'Not']
])

// Type: Mod

interface Mod__actual {
    left: EvaluatesToU32
    right: EvaluatesToU32
}

interface Mod extends Opaque<Mod__actual, Mod> {}

const Mod: StructCodecAndFactory<Mod__actual, Mod> = createStructCodec<Mod__actual, Mod>('Mod', [
    ['left', __dyn_EvaluatesToU32],
    ['right', __dyn_EvaluatesToU32]
])

// Type: Multiply

interface Multiply__actual {
    left: EvaluatesToU32
    right: EvaluatesToU32
}

interface Multiply extends Opaque<Multiply__actual, Multiply> {}

const Multiply: StructCodecAndFactory<Multiply__actual, Multiply> = createStructCodec<Multiply__actual, Multiply>('Multiply', [
    ['left', __dyn_EvaluatesToU32],
    ['right', __dyn_EvaluatesToU32]
])

// Type: Name

type Name = Str

const Name: Codec<Name> = Str

// Type: NewAccount

interface NewAccount__actual {
    id: AccountId
    signatories: VecPublicKey
    metadata: Metadata
}

interface NewAccount extends Opaque<NewAccount__actual, NewAccount> {}

const NewAccount: StructCodecAndFactory<NewAccount__actual, NewAccount> = createStructCodec<NewAccount__actual, NewAccount>('NewAccount', [
    ['id', __dyn_AccountId],
    ['signatories', __dyn_VecPublicKey],
    ['metadata', __dyn_Metadata]
])

// Type: NewDomain

interface NewDomain__actual {
    id: DomainId
    logo: OptionIpfsPath
    metadata: Metadata
}

interface NewDomain extends Opaque<NewDomain__actual, NewDomain> {}

const NewDomain: StructCodecAndFactory<NewDomain__actual, NewDomain> = createStructCodec<NewDomain__actual, NewDomain>('NewDomain', [
    ['id', __dyn_DomainId],
    ['logo', __dyn_OptionIpfsPath],
    ['metadata', __dyn_Metadata]
])

// Type: NoTransactionReceiptReceived

import { Void as NoTransactionReceiptReceived } from '@scale-codec/definition-runtime'

// Type: Not

interface Not__actual {
    expression: EvaluatesToBool
}

interface Not extends Opaque<Not__actual, Not> {}

const Not: StructCodecAndFactory<Not__actual, Not> = createStructCodec<Not__actual, Not>('Not', [
    ['expression', __dyn_EvaluatesToBool]
])

// Type: NotPermittedFail

interface NotPermittedFail__actual {
    reason: Str
}

interface NotPermittedFail extends Opaque<NotPermittedFail__actual, NotPermittedFail> {}

const NotPermittedFail: StructCodecAndFactory<NotPermittedFail__actual, NotPermittedFail> = createStructCodec<NotPermittedFail__actual, NotPermittedFail>('NotPermittedFail', [
    ['reason', Str]
])

// Type: OptionDuration

interface OptionDuration__actual extends Option<Duration> {}

interface OptionDuration extends Opaque<OptionDuration__actual, OptionDuration> {}

const OptionDuration: EnumCodecAndFactory<OptionDuration> = createOptionCodec<OptionDuration__actual, OptionDuration>('OptionDuration', __dyn_Duration)

// Type: OptionHash

interface OptionHash__actual extends Option<Hash> {}

interface OptionHash extends Opaque<OptionHash__actual, OptionHash> {}

const OptionHash: EnumCodecAndFactory<OptionHash> = createOptionCodec<OptionHash__actual, OptionHash>('OptionHash', __dyn_Hash)

// Type: OptionInstruction

interface OptionInstruction__actual extends Option<Instruction> {}

interface OptionInstruction extends Opaque<OptionInstruction__actual, OptionInstruction> {}

const OptionInstruction: EnumCodecAndFactory<OptionInstruction> = createOptionCodec<OptionInstruction__actual, OptionInstruction>('OptionInstruction', __dyn_Instruction)

// Type: OptionIpfsPath

interface OptionIpfsPath__actual extends Option<IpfsPath> {}

interface OptionIpfsPath extends Opaque<OptionIpfsPath__actual, OptionIpfsPath> {}

const OptionIpfsPath: EnumCodecAndFactory<OptionIpfsPath> = createOptionCodec<OptionIpfsPath__actual, OptionIpfsPath>('OptionIpfsPath', __dyn_IpfsPath)

// Type: OptionPipelineEntityKind

interface OptionPipelineEntityKind__actual extends Option<PipelineEntityKind> {}

interface OptionPipelineEntityKind extends Opaque<OptionPipelineEntityKind__actual, OptionPipelineEntityKind> {}

const OptionPipelineEntityKind: EnumCodecAndFactory<OptionPipelineEntityKind> = createOptionCodec<OptionPipelineEntityKind__actual, OptionPipelineEntityKind>('OptionPipelineEntityKind', __dyn_PipelineEntityKind)

// Type: OptionPipelineStatusKind

interface OptionPipelineStatusKind__actual extends Option<PipelineStatusKind> {}

interface OptionPipelineStatusKind extends Opaque<OptionPipelineStatusKind__actual, OptionPipelineStatusKind> {}

const OptionPipelineStatusKind: EnumCodecAndFactory<OptionPipelineStatusKind> = createOptionCodec<OptionPipelineStatusKind__actual, OptionPipelineStatusKind>('OptionPipelineStatusKind', __dyn_PipelineStatusKind)

// Type: OptionTimeInterval

interface OptionTimeInterval__actual extends Option<TimeInterval> {}

interface OptionTimeInterval extends Opaque<OptionTimeInterval__actual, OptionTimeInterval> {}

const OptionTimeInterval: EnumCodecAndFactory<OptionTimeInterval> = createOptionCodec<OptionTimeInterval__actual, OptionTimeInterval>('OptionTimeInterval', __dyn_TimeInterval)

// Type: OptionTopology

interface OptionTopology__actual extends Option<Topology> {}

interface OptionTopology extends Opaque<OptionTopology__actual, OptionTopology> {}

const OptionTopology: EnumCodecAndFactory<OptionTopology> = createOptionCodec<OptionTopology__actual, OptionTopology>('OptionTopology', __dyn_Topology)

// Type: OptionU32

interface OptionU32__actual extends Option<U32> {}

interface OptionU32 extends Opaque<OptionU32__actual, OptionU32> {}

const OptionU32: EnumCodecAndFactory<OptionU32> = createOptionCodec<OptionU32__actual, OptionU32>('OptionU32', U32)

// Type: Or

interface Or__actual {
    left: EvaluatesToBool
    right: EvaluatesToBool
}

interface Or extends Opaque<Or__actual, Or> {}

const Or: StructCodecAndFactory<Or__actual, Or> = createStructCodec<Or__actual, Or>('Or', [
    ['left', __dyn_EvaluatesToBool],
    ['right', __dyn_EvaluatesToBool]
])

// Type: PaginatedQueryResult

interface PaginatedQueryResult__actual {
    result: QueryResult
    pagination: Pagination
    total: U64
}

interface PaginatedQueryResult extends Opaque<PaginatedQueryResult__actual, PaginatedQueryResult> {}

const PaginatedQueryResult: StructCodecAndFactory<PaginatedQueryResult__actual, PaginatedQueryResult> = createStructCodec<PaginatedQueryResult__actual, PaginatedQueryResult>('PaginatedQueryResult', [
    ['result', __dyn_QueryResult],
    ['pagination', __dyn_Pagination],
    ['total', U64]
])

// Type: Pagination

interface Pagination__actual {
    start: OptionU32
    limit: OptionU32
}

interface Pagination extends Opaque<Pagination__actual, Pagination> {}

const Pagination: StructCodecAndFactory<Pagination__actual, Pagination> = createStructCodec<Pagination__actual, Pagination>('Pagination', [
    ['start', __dyn_OptionU32],
    ['limit', __dyn_OptionU32]
])

// Type: Pair

interface Pair__actual {
    left_instruction: Instruction
    right_instruction: Instruction
}

interface Pair extends Opaque<Pair__actual, Pair> {}

const Pair: StructCodecAndFactory<Pair__actual, Pair> = createStructCodec<Pair__actual, Pair>('Pair', [
    ['left_instruction', __dyn_Instruction],
    ['right_instruction', __dyn_Instruction]
])

// Type: Parameter

type Parameter__actual = Enum<
    | ['MaximumFaultyPeersAmount', U32]
    | ['BlockTime', U128]
    | ['CommitTime', U128]
    | ['TransactionReceiptTime', U128]
>

interface Parameter extends Opaque<Parameter__actual, Parameter> {}

const Parameter: EnumCodecAndFactory<Parameter> = createEnumCodec<Parameter__actual, Parameter>('Parameter', [
    [0, 'MaximumFaultyPeersAmount', U32],
    [1, 'BlockTime', U128],
    [2, 'CommitTime', U128],
    [3, 'TransactionReceiptTime', U128]
])

// Type: ParentHashNotFound

type ParentHashNotFound = HashOfVersionedCommittedBlock

const ParentHashNotFound: Codec<ParentHashNotFound> = __dyn_HashOfVersionedCommittedBlock

// Type: Peer

interface Peer__actual {
    id: PeerId
}

interface Peer extends Opaque<Peer__actual, Peer> {}

const Peer: StructCodecAndFactory<Peer__actual, Peer> = createStructCodec<Peer__actual, Peer>('Peer', [
    ['id', __dyn_PeerId]
])

// Type: PeerEvent

type PeerEvent__actual = Enum<
    | ['Added', PeerId]
    | ['Removed', PeerId]
>

interface PeerEvent extends Opaque<PeerEvent__actual, PeerEvent> {}

const PeerEvent: EnumCodecAndFactory<PeerEvent> = createEnumCodec<PeerEvent__actual, PeerEvent>('PeerEvent', [
    [0, 'Added', __dyn_PeerId],
    [1, 'Removed', __dyn_PeerId]
])

// Type: PeerEventFilter

type PeerEventFilter__actual = Enum<
    | 'ByAdded'
    | 'ByRemoved'
>

interface PeerEventFilter extends Opaque<PeerEventFilter__actual, PeerEventFilter> {}

const PeerEventFilter: EnumCodecAndFactory<PeerEventFilter> = createEnumCodec<PeerEventFilter__actual, PeerEventFilter>('PeerEventFilter', [
    [0, 'ByAdded'],
    [1, 'ByRemoved']
])

// Type: PeerFilter

interface PeerFilter__actual {
    id_filter: FilterOptIdFilterPeerId
    event_filter: FilterOptPeerEventFilter
}

interface PeerFilter extends Opaque<PeerFilter__actual, PeerFilter> {}

const PeerFilter: StructCodecAndFactory<PeerFilter__actual, PeerFilter> = createStructCodec<PeerFilter__actual, PeerFilter>('PeerFilter', [
    ['id_filter', __dyn_FilterOptIdFilterPeerId],
    ['event_filter', __dyn_FilterOptPeerEventFilter]
])

// Type: PeerId

interface PeerId__actual {
    address: Str
    public_key: PublicKey
}

interface PeerId extends Opaque<PeerId__actual, PeerId> {}

const PeerId: StructCodecAndFactory<PeerId__actual, PeerId> = createStructCodec<PeerId__actual, PeerId>('PeerId', [
    ['address', Str],
    ['public_key', __dyn_PublicKey]
])

// Type: PermissionToken

interface PermissionToken__actual {
    name: Name
    params: MapNameValue
}

interface PermissionToken extends Opaque<PermissionToken__actual, PermissionToken> {}

const PermissionToken: StructCodecAndFactory<PermissionToken__actual, PermissionToken> = createStructCodec<PermissionToken__actual, PermissionToken>('PermissionToken', [
    ['name', __dyn_Name],
    ['params', __dyn_MapNameValue]
])

// Type: PipelineEntityKind

type PipelineEntityKind__actual = Enum<
    | 'Block'
    | 'Transaction'
>

interface PipelineEntityKind extends Opaque<PipelineEntityKind__actual, PipelineEntityKind> {}

const PipelineEntityKind: EnumCodecAndFactory<PipelineEntityKind> = createEnumCodec<PipelineEntityKind__actual, PipelineEntityKind>('PipelineEntityKind', [
    [0, 'Block'],
    [1, 'Transaction']
])

// Type: PipelineEvent

interface PipelineEvent__actual {
    entity_kind: PipelineEntityKind
    status: PipelineStatus
    hash: Hash
}

interface PipelineEvent extends Opaque<PipelineEvent__actual, PipelineEvent> {}

const PipelineEvent: StructCodecAndFactory<PipelineEvent__actual, PipelineEvent> = createStructCodec<PipelineEvent__actual, PipelineEvent>('PipelineEvent', [
    ['entity_kind', __dyn_PipelineEntityKind],
    ['status', __dyn_PipelineStatus],
    ['hash', __dyn_Hash]
])

// Type: PipelineEventFilter

interface PipelineEventFilter__actual {
    entity_kind: OptionPipelineEntityKind
    status_kind: OptionPipelineStatusKind
    hash: OptionHash
}

interface PipelineEventFilter extends Opaque<PipelineEventFilter__actual, PipelineEventFilter> {}

const PipelineEventFilter: StructCodecAndFactory<PipelineEventFilter__actual, PipelineEventFilter> = createStructCodec<PipelineEventFilter__actual, PipelineEventFilter>('PipelineEventFilter', [
    ['entity_kind', __dyn_OptionPipelineEntityKind],
    ['status_kind', __dyn_OptionPipelineStatusKind],
    ['hash', __dyn_OptionHash]
])

// Type: PipelineStatus

type PipelineStatus__actual = Enum<
    | 'Validating'
    | ['Rejected', RejectionReason]
    | 'Committed'
>

interface PipelineStatus extends Opaque<PipelineStatus__actual, PipelineStatus> {}

const PipelineStatus: EnumCodecAndFactory<PipelineStatus> = createEnumCodec<PipelineStatus__actual, PipelineStatus>('PipelineStatus', [
    [0, 'Validating'],
    [1, 'Rejected', __dyn_RejectionReason],
    [2, 'Committed']
])

// Type: PipelineStatusKind

type PipelineStatusKind__actual = Enum<
    | 'Validating'
    | 'Rejected'
    | 'Committed'
>

interface PipelineStatusKind extends Opaque<PipelineStatusKind__actual, PipelineStatusKind> {}

const PipelineStatusKind: EnumCodecAndFactory<PipelineStatusKind> = createEnumCodec<PipelineStatusKind__actual, PipelineStatusKind>('PipelineStatusKind', [
    [0, 'Validating'],
    [1, 'Rejected'],
    [2, 'Committed']
])

// Type: Proof

interface Proof__actual {
    payload: ProofPayload
    signatures: SignaturesOfProof
}

interface Proof extends Opaque<Proof__actual, Proof> {}

const Proof: StructCodecAndFactory<Proof__actual, Proof> = createStructCodec<Proof__actual, Proof>('Proof', [
    ['payload', __dyn_ProofPayload],
    ['signatures', __dyn_SignaturesOfProof]
])

// Type: ProofChain

interface ProofChain__actual {
    proofs: VecProof
}

interface ProofChain extends Opaque<ProofChain__actual, ProofChain> {}

const ProofChain: StructCodecAndFactory<ProofChain__actual, ProofChain> = createStructCodec<ProofChain__actual, ProofChain>('ProofChain', [
    ['proofs', __dyn_VecProof]
])

// Type: ProofPayload

interface ProofPayload__actual {
    previous_proof: HashOfProof
    latest_block: HashOfVersionedCommittedBlock
    reason: Reason
}

interface ProofPayload extends Opaque<ProofPayload__actual, ProofPayload> {}

const ProofPayload: StructCodecAndFactory<ProofPayload__actual, ProofPayload> = createStructCodec<ProofPayload__actual, ProofPayload>('ProofPayload', [
    ['previous_proof', __dyn_HashOfProof],
    ['latest_block', __dyn_HashOfVersionedCommittedBlock],
    ['reason', __dyn_Reason]
])

// Type: PublicKey

interface PublicKey__actual {
    digest_function: Str
    payload: VecU8
}

interface PublicKey extends Opaque<PublicKey__actual, PublicKey> {}

const PublicKey: StructCodecAndFactory<PublicKey__actual, PublicKey> = createStructCodec<PublicKey__actual, PublicKey>('PublicKey', [
    ['digest_function', Str],
    ['payload', VecU8]
])

// Type: QueryBox

type QueryBox__actual = Enum<
    | ['FindAllAccounts', FindAllAccounts]
    | ['FindAccountById', FindAccountById]
    | ['FindAccountKeyValueByIdAndKey', FindAccountKeyValueByIdAndKey]
    | ['FindAccountsByName', FindAccountsByName]
    | ['FindAccountsByDomainId', FindAccountsByDomainId]
    | ['FindAccountsWithAsset', FindAccountsWithAsset]
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
    | ['FindAllActiveTriggerIds', FindAllActiveTriggerIds]
    | ['FindTriggerById', FindTriggerById]
    | ['FindTriggerKeyValueByIdAndKey', FindTriggerKeyValueByIdAndKey]
    | ['FindAllRoles', FindAllRoles]
    | ['FindAllRoleIds', FindAllRoleIds]
    | ['FindRoleByRoleId', FindRoleByRoleId]
    | ['FindRolesByAccountId', FindRolesByAccountId]
>

interface QueryBox extends Opaque<QueryBox__actual, QueryBox> {}

const QueryBox: EnumCodecAndFactory<QueryBox> = createEnumCodec<QueryBox__actual, QueryBox>('QueryBox', [
    [0, 'FindAllAccounts', __dyn_FindAllAccounts],
    [1, 'FindAccountById', __dyn_FindAccountById],
    [2, 'FindAccountKeyValueByIdAndKey', __dyn_FindAccountKeyValueByIdAndKey],
    [3, 'FindAccountsByName', __dyn_FindAccountsByName],
    [4, 'FindAccountsByDomainId', __dyn_FindAccountsByDomainId],
    [5, 'FindAccountsWithAsset', __dyn_FindAccountsWithAsset],
    [6, 'FindAllAssets', __dyn_FindAllAssets],
    [7, 'FindAllAssetsDefinitions', __dyn_FindAllAssetsDefinitions],
    [8, 'FindAssetById', __dyn_FindAssetById],
    [9, 'FindAssetsByName', __dyn_FindAssetsByName],
    [10, 'FindAssetsByAccountId', __dyn_FindAssetsByAccountId],
    [11, 'FindAssetsByAssetDefinitionId', __dyn_FindAssetsByAssetDefinitionId],
    [12, 'FindAssetsByDomainId', __dyn_FindAssetsByDomainId],
    [13, 'FindAssetsByDomainIdAndAssetDefinitionId', __dyn_FindAssetsByDomainIdAndAssetDefinitionId],
    [14, 'FindAssetQuantityById', __dyn_FindAssetQuantityById],
    [15, 'FindAssetKeyValueByIdAndKey', __dyn_FindAssetKeyValueByIdAndKey],
    [16, 'FindAssetDefinitionKeyValueByIdAndKey', __dyn_FindAssetDefinitionKeyValueByIdAndKey],
    [17, 'FindAllDomains', __dyn_FindAllDomains],
    [18, 'FindDomainById', __dyn_FindDomainById],
    [19, 'FindDomainKeyValueByIdAndKey', __dyn_FindDomainKeyValueByIdAndKey],
    [20, 'FindAllPeers', __dyn_FindAllPeers],
    [21, 'FindTransactionsByAccountId', __dyn_FindTransactionsByAccountId],
    [22, 'FindTransactionByHash', __dyn_FindTransactionByHash],
    [23, 'FindPermissionTokensByAccountId', __dyn_FindPermissionTokensByAccountId],
    [24, 'FindAllActiveTriggerIds', __dyn_FindAllActiveTriggerIds],
    [25, 'FindTriggerById', __dyn_FindTriggerById],
    [26, 'FindTriggerKeyValueByIdAndKey', __dyn_FindTriggerKeyValueByIdAndKey],
    [27, 'FindAllRoles', __dyn_FindAllRoles],
    [28, 'FindAllRoleIds', __dyn_FindAllRoleIds],
    [29, 'FindRoleByRoleId', __dyn_FindRoleByRoleId],
    [30, 'FindRolesByAccountId', __dyn_FindRolesByAccountId]
])

// Type: QueryError

type QueryError__actual = Enum<
    | ['Decode', VersionError]
    | ['Version', QueryUnsupportedVersionError]
    | ['Signature', Str]
    | ['Permission', Str]
    | ['Evaluate', Str]
    | ['Find', FindError]
    | ['Conversion', Str]
>

interface QueryError extends Opaque<QueryError__actual, QueryError> {}

const QueryError: EnumCodecAndFactory<QueryError> = createEnumCodec<QueryError__actual, QueryError>('QueryError', [
    [0, 'Decode', __dyn_VersionError],
    [1, 'Version', __dyn_QueryUnsupportedVersionError],
    [2, 'Signature', Str],
    [3, 'Permission', Str],
    [4, 'Evaluate', Str],
    [5, 'Find', __dyn_FindError],
    [6, 'Conversion', Str]
])

// Type: QueryPayload

interface QueryPayload__actual {
    timestamp_ms: Compact
    query: QueryBox
    account_id: AccountId
}

interface QueryPayload extends Opaque<QueryPayload__actual, QueryPayload> {}

const QueryPayload: StructCodecAndFactory<QueryPayload__actual, QueryPayload> = createStructCodec<QueryPayload__actual, QueryPayload>('QueryPayload', [
    ['timestamp_ms', Compact],
    ['query', __dyn_QueryBox],
    ['account_id', __dyn_AccountId]
])

// Type: QueryResult

type QueryResult = Value

const QueryResult: Codec<QueryResult> = __dyn_Value

// Type: QueryUnsupportedVersionError

interface QueryUnsupportedVersionError__actual {
    version: U8
}

interface QueryUnsupportedVersionError extends Opaque<QueryUnsupportedVersionError__actual, QueryUnsupportedVersionError> {}

const QueryUnsupportedVersionError: StructCodecAndFactory<QueryUnsupportedVersionError__actual, QueryUnsupportedVersionError> = createStructCodec<QueryUnsupportedVersionError__actual, QueryUnsupportedVersionError>('QueryUnsupportedVersionError', [
    ['version', U8]
])

// Type: RaiseTo

interface RaiseTo__actual {
    left: EvaluatesToU32
    right: EvaluatesToU32
}

interface RaiseTo extends Opaque<RaiseTo__actual, RaiseTo> {}

const RaiseTo: StructCodecAndFactory<RaiseTo__actual, RaiseTo> = createStructCodec<RaiseTo__actual, RaiseTo>('RaiseTo', [
    ['left', __dyn_EvaluatesToU32],
    ['right', __dyn_EvaluatesToU32]
])

// Type: RawGenesisBlock

interface RawGenesisBlock__actual {
    transactions: VecGenesisTransaction
}

interface RawGenesisBlock extends Opaque<RawGenesisBlock__actual, RawGenesisBlock> {}

const RawGenesisBlock: StructCodecAndFactory<RawGenesisBlock__actual, RawGenesisBlock> = createStructCodec<RawGenesisBlock__actual, RawGenesisBlock>('RawGenesisBlock', [
    ['transactions', __dyn_VecGenesisTransaction]
])

// Type: RawVersioned

type RawVersioned__actual = Enum<
    | ['Json', Str]
    | ['ScaleBytes', VecU8]
>

interface RawVersioned extends Opaque<RawVersioned__actual, RawVersioned> {}

const RawVersioned: EnumCodecAndFactory<RawVersioned> = createEnumCodec<RawVersioned__actual, RawVersioned>('RawVersioned', [
    [0, 'Json', Str],
    [1, 'ScaleBytes', VecU8]
])

// Type: Reason

type Reason__actual = Enum<
    | ['CommitTimeout', CommitTimeout]
    | ['NoTransactionReceiptReceived', NoTransactionReceiptReceived]
    | ['BlockCreationTimeout', BlockCreationTimeout]
>

interface Reason extends Opaque<Reason__actual, Reason> {}

const Reason: EnumCodecAndFactory<Reason> = createEnumCodec<Reason__actual, Reason>('Reason', [
    [0, 'CommitTimeout', __dyn_CommitTimeout],
    [1, 'NoTransactionReceiptReceived', __dyn_NoTransactionReceiptReceived],
    [2, 'BlockCreationTimeout', __dyn_BlockCreationTimeout]
])

// Type: RegisterBox

interface RegisterBox__actual {
    object: EvaluatesToRegistrableBox
}

interface RegisterBox extends Opaque<RegisterBox__actual, RegisterBox> {}

const RegisterBox: StructCodecAndFactory<RegisterBox__actual, RegisterBox> = createStructCodec<RegisterBox__actual, RegisterBox>('RegisterBox', [
    ['object', __dyn_EvaluatesToRegistrableBox]
])

// Type: RegistrableBox

type RegistrableBox__actual = Enum<
    | ['Peer', Peer]
    | ['Domain', NewDomain]
    | ['Account', NewAccount]
    | ['AssetDefinition', AssetDefinition]
    | ['Asset', Asset]
    | ['Trigger', TriggerFilterBox]
    | ['Role', Role]
>

interface RegistrableBox extends Opaque<RegistrableBox__actual, RegistrableBox> {}

const RegistrableBox: EnumCodecAndFactory<RegistrableBox> = createEnumCodec<RegistrableBox__actual, RegistrableBox>('RegistrableBox', [
    [0, 'Peer', __dyn_Peer],
    [1, 'Domain', __dyn_NewDomain],
    [2, 'Account', __dyn_NewAccount],
    [3, 'AssetDefinition', __dyn_AssetDefinition],
    [4, 'Asset', __dyn_Asset],
    [5, 'Trigger', __dyn_TriggerFilterBox],
    [6, 'Role', __dyn_Role]
])

// Type: RejectedTransaction

interface RejectedTransaction__actual {
    payload: TransactionPayload
    signatures: SignaturesOfTransactionPayload
    rejection_reason: TransactionRejectionReason
}

interface RejectedTransaction extends Opaque<RejectedTransaction__actual, RejectedTransaction> {}

const RejectedTransaction: StructCodecAndFactory<RejectedTransaction__actual, RejectedTransaction> = createStructCodec<RejectedTransaction__actual, RejectedTransaction>('RejectedTransaction', [
    ['payload', __dyn_TransactionPayload],
    ['signatures', __dyn_SignaturesOfTransactionPayload],
    ['rejection_reason', __dyn_TransactionRejectionReason]
])

// Type: RejectionReason

type RejectionReason__actual = Enum<
    | ['Block', BlockRejectionReason]
    | ['Transaction', TransactionRejectionReason]
>

interface RejectionReason extends Opaque<RejectionReason__actual, RejectionReason> {}

const RejectionReason: EnumCodecAndFactory<RejectionReason> = createEnumCodec<RejectionReason__actual, RejectionReason>('RejectionReason', [
    [0, 'Block', __dyn_BlockRejectionReason],
    [1, 'Transaction', __dyn_TransactionRejectionReason]
])

// Type: RemoveKeyValueBox

interface RemoveKeyValueBox__actual {
    object_id: EvaluatesToIdBox
    key: EvaluatesToName
}

interface RemoveKeyValueBox extends Opaque<RemoveKeyValueBox__actual, RemoveKeyValueBox> {}

const RemoveKeyValueBox: StructCodecAndFactory<RemoveKeyValueBox__actual, RemoveKeyValueBox> = createStructCodec<RemoveKeyValueBox__actual, RemoveKeyValueBox>('RemoveKeyValueBox', [
    ['object_id', __dyn_EvaluatesToIdBox],
    ['key', __dyn_EvaluatesToName]
])

// Type: Repeats

type Repeats__actual = Enum<
    | 'Indefinitely'
    | ['Exactly', U32]
>

interface Repeats extends Opaque<Repeats__actual, Repeats> {}

const Repeats: EnumCodecAndFactory<Repeats> = createEnumCodec<Repeats__actual, Repeats>('Repeats', [
    [0, 'Indefinitely'],
    [1, 'Exactly', U32]
])

// Type: RevokeBox

interface RevokeBox__actual {
    object: EvaluatesToValue
    destination_id: EvaluatesToIdBox
}

interface RevokeBox extends Opaque<RevokeBox__actual, RevokeBox> {}

const RevokeBox: StructCodecAndFactory<RevokeBox__actual, RevokeBox> = createStructCodec<RevokeBox__actual, RevokeBox>('RevokeBox', [
    ['object', __dyn_EvaluatesToValue],
    ['destination_id', __dyn_EvaluatesToIdBox]
])

// Type: Role

interface Role__actual {
    id: RoleId
    permissions: VecPermissionToken
}

interface Role extends Opaque<Role__actual, Role> {}

const Role: StructCodecAndFactory<Role__actual, Role> = createStructCodec<Role__actual, Role>('Role', [
    ['id', __dyn_RoleId],
    ['permissions', __dyn_VecPermissionToken]
])

// Type: RoleEvent

type RoleEvent__actual = Enum<
    | ['Created', RoleId]
    | ['Deleted', RoleId]
>

interface RoleEvent extends Opaque<RoleEvent__actual, RoleEvent> {}

const RoleEvent: EnumCodecAndFactory<RoleEvent> = createEnumCodec<RoleEvent__actual, RoleEvent>('RoleEvent', [
    [0, 'Created', __dyn_RoleId],
    [1, 'Deleted', __dyn_RoleId]
])

// Type: RoleEventFilter

type RoleEventFilter__actual = Enum<
    | 'ByCreated'
    | 'ByDeleted'
>

interface RoleEventFilter extends Opaque<RoleEventFilter__actual, RoleEventFilter> {}

const RoleEventFilter: EnumCodecAndFactory<RoleEventFilter> = createEnumCodec<RoleEventFilter__actual, RoleEventFilter>('RoleEventFilter', [
    [0, 'ByCreated'],
    [1, 'ByDeleted']
])

// Type: RoleFilter

interface RoleFilter__actual {
    id_filter: FilterOptIdFilterRoleId
    event_filter: FilterOptRoleEventFilter
}

interface RoleFilter extends Opaque<RoleFilter__actual, RoleFilter> {}

const RoleFilter: StructCodecAndFactory<RoleFilter__actual, RoleFilter> = createStructCodec<RoleFilter__actual, RoleFilter>('RoleFilter', [
    ['id_filter', __dyn_FilterOptIdFilterRoleId],
    ['event_filter', __dyn_FilterOptRoleEventFilter]
])

// Type: RoleId

interface RoleId__actual {
    name: Name
}

interface RoleId extends Opaque<RoleId__actual, RoleId> {}

const RoleId: StructCodecAndFactory<RoleId__actual, RoleId> = createStructCodec<RoleId__actual, RoleId>('RoleId', [
    ['name', __dyn_Name]
])

// Type: SequenceBox

interface SequenceBox__actual {
    instructions: VecInstruction
}

interface SequenceBox extends Opaque<SequenceBox__actual, SequenceBox> {}

const SequenceBox: StructCodecAndFactory<SequenceBox__actual, SequenceBox> = createStructCodec<SequenceBox__actual, SequenceBox>('SequenceBox', [
    ['instructions', __dyn_VecInstruction]
])

// Type: SetKeyValueBox

interface SetKeyValueBox__actual {
    object_id: EvaluatesToIdBox
    key: EvaluatesToName
    value: EvaluatesToValue
}

interface SetKeyValueBox extends Opaque<SetKeyValueBox__actual, SetKeyValueBox> {}

const SetKeyValueBox: StructCodecAndFactory<SetKeyValueBox__actual, SetKeyValueBox> = createStructCodec<SetKeyValueBox__actual, SetKeyValueBox>('SetKeyValueBox', [
    ['object_id', __dyn_EvaluatesToIdBox],
    ['key', __dyn_EvaluatesToName],
    ['value', __dyn_EvaluatesToValue]
])

// Type: Signature

interface Signature__actual {
    public_key: PublicKey
    payload: VecU8
}

interface Signature extends Opaque<Signature__actual, Signature> {}

const Signature: StructCodecAndFactory<Signature__actual, Signature> = createStructCodec<Signature__actual, Signature>('Signature', [
    ['public_key', __dyn_PublicKey],
    ['payload', VecU8]
])

// Type: SignatureCheckCondition

type SignatureCheckCondition = EvaluatesToBool

const SignatureCheckCondition: Codec<SignatureCheckCondition> = __dyn_EvaluatesToBool

// Type: SignatureOfCommittedBlock

type SignatureOfCommittedBlock = Signature

const SignatureOfCommittedBlock: Codec<SignatureOfCommittedBlock> = __dyn_Signature

// Type: SignatureOfProof

type SignatureOfProof = Signature

const SignatureOfProof: Codec<SignatureOfProof> = __dyn_Signature

// Type: SignatureOfQueryPayload

type SignatureOfQueryPayload = Signature

const SignatureOfQueryPayload: Codec<SignatureOfQueryPayload> = __dyn_Signature

// Type: SignatureOfTransactionPayload

type SignatureOfTransactionPayload = Signature

const SignatureOfTransactionPayload: Codec<SignatureOfTransactionPayload> = __dyn_Signature

// Type: SignatureOfValidBlock

type SignatureOfValidBlock = Signature

const SignatureOfValidBlock: Codec<SignatureOfValidBlock> = __dyn_Signature

// Type: SignaturesOfCommittedBlock

interface SignaturesOfCommittedBlock__actual {
    signatures: MapPublicKeySignatureOfCommittedBlock
}

interface SignaturesOfCommittedBlock extends Opaque<SignaturesOfCommittedBlock__actual, SignaturesOfCommittedBlock> {}

const SignaturesOfCommittedBlock: StructCodecAndFactory<SignaturesOfCommittedBlock__actual, SignaturesOfCommittedBlock> = createStructCodec<SignaturesOfCommittedBlock__actual, SignaturesOfCommittedBlock>('SignaturesOfCommittedBlock', [
    ['signatures', __dyn_MapPublicKeySignatureOfCommittedBlock]
])

// Type: SignaturesOfProof

interface SignaturesOfProof__actual {
    signatures: MapPublicKeySignatureOfProof
}

interface SignaturesOfProof extends Opaque<SignaturesOfProof__actual, SignaturesOfProof> {}

const SignaturesOfProof: StructCodecAndFactory<SignaturesOfProof__actual, SignaturesOfProof> = createStructCodec<SignaturesOfProof__actual, SignaturesOfProof>('SignaturesOfProof', [
    ['signatures', __dyn_MapPublicKeySignatureOfProof]
])

// Type: SignaturesOfTransactionPayload

interface SignaturesOfTransactionPayload__actual {
    signatures: MapPublicKeySignatureOfTransactionPayload
}

interface SignaturesOfTransactionPayload extends Opaque<SignaturesOfTransactionPayload__actual, SignaturesOfTransactionPayload> {}

const SignaturesOfTransactionPayload: StructCodecAndFactory<SignaturesOfTransactionPayload__actual, SignaturesOfTransactionPayload> = createStructCodec<SignaturesOfTransactionPayload__actual, SignaturesOfTransactionPayload>('SignaturesOfTransactionPayload', [
    ['signatures', __dyn_MapPublicKeySignatureOfTransactionPayload]
])

// Type: SignedQueryRequest

interface SignedQueryRequest__actual {
    payload: QueryPayload
    signature: SignatureOfQueryPayload
}

interface SignedQueryRequest extends Opaque<SignedQueryRequest__actual, SignedQueryRequest> {}

const SignedQueryRequest: StructCodecAndFactory<SignedQueryRequest__actual, SignedQueryRequest> = createStructCodec<SignedQueryRequest__actual, SignedQueryRequest>('SignedQueryRequest', [
    ['payload', __dyn_QueryPayload],
    ['signature', __dyn_SignatureOfQueryPayload]
])

// Type: Subtract

interface Subtract__actual {
    left: EvaluatesToU32
    right: EvaluatesToU32
}

interface Subtract extends Opaque<Subtract__actual, Subtract> {}

const Subtract: StructCodecAndFactory<Subtract__actual, Subtract> = createStructCodec<Subtract__actual, Subtract>('Subtract', [
    ['left', __dyn_EvaluatesToU32],
    ['right', __dyn_EvaluatesToU32]
])

// Type: TimeEvent

interface TimeEvent__actual {
    prev_interval: OptionTimeInterval
    interval: TimeInterval
}

interface TimeEvent extends Opaque<TimeEvent__actual, TimeEvent> {}

const TimeEvent: StructCodecAndFactory<TimeEvent__actual, TimeEvent> = createStructCodec<TimeEvent__actual, TimeEvent>('TimeEvent', [
    ['prev_interval', __dyn_OptionTimeInterval],
    ['interval', __dyn_TimeInterval]
])

// Type: TimeEventFilter

type TimeEventFilter = ExecutionTime

const TimeEventFilter: Codec<TimeEventFilter> = __dyn_ExecutionTime

// Type: TimeInterval

interface TimeInterval__actual {
    since: Duration
    length: Duration
}

interface TimeInterval extends Opaque<TimeInterval__actual, TimeInterval> {}

const TimeInterval: StructCodecAndFactory<TimeInterval__actual, TimeInterval> = createStructCodec<TimeInterval__actual, TimeInterval>('TimeInterval', [
    ['since', __dyn_Duration],
    ['length', __dyn_Duration]
])

// Type: TimeSchedule

interface TimeSchedule__actual {
    start: Duration
    period: OptionDuration
}

interface TimeSchedule extends Opaque<TimeSchedule__actual, TimeSchedule> {}

const TimeSchedule: StructCodecAndFactory<TimeSchedule__actual, TimeSchedule> = createStructCodec<TimeSchedule__actual, TimeSchedule>('TimeSchedule', [
    ['start', __dyn_Duration],
    ['period', __dyn_OptionDuration]
])

// Type: Topology

interface Topology__actual {
    sorted_peers: VecPeerId
    at_block: HashOfVersionedCommittedBlock
    view_change_proofs: ProofChain
}

interface Topology extends Opaque<Topology__actual, Topology> {}

const Topology: StructCodecAndFactory<Topology__actual, Topology> = createStructCodec<Topology__actual, Topology>('Topology', [
    ['sorted_peers', __dyn_VecPeerId],
    ['at_block', __dyn_HashOfVersionedCommittedBlock],
    ['view_change_proofs', __dyn_ProofChain]
])

// Type: Transaction

interface Transaction__actual {
    payload: TransactionPayload
    signatures: VecSignatureOfTransactionPayload
}

interface Transaction extends Opaque<Transaction__actual, Transaction> {}

const Transaction: StructCodecAndFactory<Transaction__actual, Transaction> = createStructCodec<Transaction__actual, Transaction>('Transaction', [
    ['payload', __dyn_TransactionPayload],
    ['signatures', __dyn_VecSignatureOfTransactionPayload]
])

// Type: TransactionLimitError

type TransactionLimitError = Str

const TransactionLimitError: Codec<TransactionLimitError> = Str

// Type: TransactionPayload

interface TransactionPayload__actual {
    account_id: AccountId
    instructions: Executable
    creation_time: U64
    time_to_live_ms: U64
    nonce: OptionU32
    metadata: MapNameValue
}

interface TransactionPayload extends Opaque<TransactionPayload__actual, TransactionPayload> {}

const TransactionPayload: StructCodecAndFactory<TransactionPayload__actual, TransactionPayload> = createStructCodec<TransactionPayload__actual, TransactionPayload>('TransactionPayload', [
    ['account_id', __dyn_AccountId],
    ['instructions', __dyn_Executable],
    ['creation_time', U64],
    ['time_to_live_ms', U64],
    ['nonce', __dyn_OptionU32],
    ['metadata', __dyn_MapNameValue]
])

// Type: TransactionRejectionReason

type TransactionRejectionReason__actual = Enum<
    | ['NotPermitted', NotPermittedFail]
    | ['UnsatisfiedSignatureCondition', UnsatisfiedSignatureConditionFail]
    | ['LimitCheck', TransactionLimitError]
    | ['InstructionExecution', InstructionExecutionFail]
    | ['WasmExecution', WasmExecutionFail]
    | 'UnexpectedGenesisAccountSignature'
>

interface TransactionRejectionReason extends Opaque<TransactionRejectionReason__actual, TransactionRejectionReason> {}

const TransactionRejectionReason: EnumCodecAndFactory<TransactionRejectionReason> = createEnumCodec<TransactionRejectionReason__actual, TransactionRejectionReason>('TransactionRejectionReason', [
    [0, 'NotPermitted', __dyn_NotPermittedFail],
    [1, 'UnsatisfiedSignatureCondition', __dyn_UnsatisfiedSignatureConditionFail],
    [2, 'LimitCheck', __dyn_TransactionLimitError],
    [3, 'InstructionExecution', __dyn_InstructionExecutionFail],
    [4, 'WasmExecution', __dyn_WasmExecutionFail],
    [5, 'UnexpectedGenesisAccountSignature']
])

// Type: TransactionValue

type TransactionValue__actual = Enum<
    | ['Transaction', VersionedTransaction]
    | ['RejectedTransaction', VersionedRejectedTransaction]
>

interface TransactionValue extends Opaque<TransactionValue__actual, TransactionValue> {}

const TransactionValue: EnumCodecAndFactory<TransactionValue> = createEnumCodec<TransactionValue__actual, TransactionValue>('TransactionValue', [
    [0, 'Transaction', __dyn_VersionedTransaction],
    [1, 'RejectedTransaction', __dyn_VersionedRejectedTransaction]
])

// Type: TransferBox

interface TransferBox__actual {
    source_id: EvaluatesToIdBox
    object: EvaluatesToValue
    destination_id: EvaluatesToIdBox
}

interface TransferBox extends Opaque<TransferBox__actual, TransferBox> {}

const TransferBox: StructCodecAndFactory<TransferBox__actual, TransferBox> = createStructCodec<TransferBox__actual, TransferBox>('TransferBox', [
    ['source_id', __dyn_EvaluatesToIdBox],
    ['object', __dyn_EvaluatesToValue],
    ['destination_id', __dyn_EvaluatesToIdBox]
])

// Type: TriggerEvent

type TriggerEvent__actual = Enum<
    | ['Created', TriggerId]
    | ['Deleted', TriggerId]
    | ['Extended', TriggerId]
    | ['Shortened', TriggerId]
>

interface TriggerEvent extends Opaque<TriggerEvent__actual, TriggerEvent> {}

const TriggerEvent: EnumCodecAndFactory<TriggerEvent> = createEnumCodec<TriggerEvent__actual, TriggerEvent>('TriggerEvent', [
    [0, 'Created', __dyn_TriggerId],
    [1, 'Deleted', __dyn_TriggerId],
    [2, 'Extended', __dyn_TriggerId],
    [3, 'Shortened', __dyn_TriggerId]
])

// Type: TriggerEventFilter

type TriggerEventFilter__actual = Enum<
    | 'ByCreated'
    | 'ByDeleted'
    | 'ByExtended'
    | 'ByShortened'
>

interface TriggerEventFilter extends Opaque<TriggerEventFilter__actual, TriggerEventFilter> {}

const TriggerEventFilter: EnumCodecAndFactory<TriggerEventFilter> = createEnumCodec<TriggerEventFilter__actual, TriggerEventFilter>('TriggerEventFilter', [
    [0, 'ByCreated'],
    [1, 'ByDeleted'],
    [2, 'ByExtended'],
    [3, 'ByShortened']
])

// Type: TriggerFilter

interface TriggerFilter__actual {
    id_filter: FilterOptIdFilterTriggerId
    event_filter: FilterOptTriggerEventFilter
}

interface TriggerFilter extends Opaque<TriggerFilter__actual, TriggerFilter> {}

const TriggerFilter: StructCodecAndFactory<TriggerFilter__actual, TriggerFilter> = createStructCodec<TriggerFilter__actual, TriggerFilter>('TriggerFilter', [
    ['id_filter', __dyn_FilterOptIdFilterTriggerId],
    ['event_filter', __dyn_FilterOptTriggerEventFilter]
])

// Type: TriggerFilterBox

interface TriggerFilterBox__actual {
    id: TriggerId
    action: ActionFilterBox
}

interface TriggerFilterBox extends Opaque<TriggerFilterBox__actual, TriggerFilterBox> {}

const TriggerFilterBox: StructCodecAndFactory<TriggerFilterBox__actual, TriggerFilterBox> = createStructCodec<TriggerFilterBox__actual, TriggerFilterBox>('TriggerFilterBox', [
    ['id', __dyn_TriggerId],
    ['action', __dyn_ActionFilterBox]
])

// Type: TriggerId

interface TriggerId__actual {
    name: Name
}

interface TriggerId extends Opaque<TriggerId__actual, TriggerId> {}

const TriggerId: StructCodecAndFactory<TriggerId__actual, TriggerId> = createStructCodec<TriggerId__actual, TriggerId>('TriggerId', [
    ['name', __dyn_Name]
])

// Type: UnregisterBox

interface UnregisterBox__actual {
    object_id: EvaluatesToIdBox
}

interface UnregisterBox extends Opaque<UnregisterBox__actual, UnregisterBox> {}

const UnregisterBox: StructCodecAndFactory<UnregisterBox__actual, UnregisterBox> = createStructCodec<UnregisterBox__actual, UnregisterBox>('UnregisterBox', [
    ['object_id', __dyn_EvaluatesToIdBox]
])

// Type: UnsatisfiedSignatureConditionFail

interface UnsatisfiedSignatureConditionFail__actual {
    reason: Str
}

interface UnsatisfiedSignatureConditionFail extends Opaque<UnsatisfiedSignatureConditionFail__actual, UnsatisfiedSignatureConditionFail> {}

const UnsatisfiedSignatureConditionFail: StructCodecAndFactory<UnsatisfiedSignatureConditionFail__actual, UnsatisfiedSignatureConditionFail> = createStructCodec<UnsatisfiedSignatureConditionFail__actual, UnsatisfiedSignatureConditionFail>('UnsatisfiedSignatureConditionFail', [
    ['reason', Str]
])

// Type: UnsupportedVersion

interface UnsupportedVersion__actual {
    version: U8
    raw: RawVersioned
}

interface UnsupportedVersion extends Opaque<UnsupportedVersion__actual, UnsupportedVersion> {}

const UnsupportedVersion: StructCodecAndFactory<UnsupportedVersion__actual, UnsupportedVersion> = createStructCodec<UnsupportedVersion__actual, UnsupportedVersion>('UnsupportedVersion', [
    ['version', U8],
    ['raw', __dyn_RawVersioned]
])

// Type: ValidBlock

interface ValidBlock__actual {
    header: BlockHeader
    rejected_transactions: VecVersionedRejectedTransaction
    transactions: VecVersionedValidTransaction
    signatures: VecSignatureOfValidBlock
    event_recommendations: VecEvent
}

interface ValidBlock extends Opaque<ValidBlock__actual, ValidBlock> {}

const ValidBlock: StructCodecAndFactory<ValidBlock__actual, ValidBlock> = createStructCodec<ValidBlock__actual, ValidBlock>('ValidBlock', [
    ['header', __dyn_BlockHeader],
    ['rejected_transactions', __dyn_VecVersionedRejectedTransaction],
    ['transactions', __dyn_VecVersionedValidTransaction],
    ['signatures', __dyn_VecSignatureOfValidBlock],
    ['event_recommendations', __dyn_VecEvent]
])

// Type: ValidTransaction

interface ValidTransaction__actual {
    payload: TransactionPayload
    signatures: SignaturesOfTransactionPayload
}

interface ValidTransaction extends Opaque<ValidTransaction__actual, ValidTransaction> {}

const ValidTransaction: StructCodecAndFactory<ValidTransaction__actual, ValidTransaction> = createStructCodec<ValidTransaction__actual, ValidTransaction>('ValidTransaction', [
    ['payload', __dyn_TransactionPayload],
    ['signatures', __dyn_SignaturesOfTransactionPayload]
])

// Type: Value

type Value__actual = Enum<
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
>

interface Value extends Opaque<Value__actual, Value> {}

const Value: EnumCodecAndFactory<Value> = createEnumCodec<Value__actual, Value>('Value', [
    [0, 'U32', U32],
    [1, 'U128', U128],
    [2, 'Bool', Bool],
    [3, 'String', Str],
    [4, 'Name', __dyn_Name],
    [5, 'Fixed', __dyn_Fixed],
    [6, 'Vec', __dyn_VecValue],
    [7, 'LimitedMetadata', __dyn_Metadata],
    [8, 'Id', __dyn_IdBox],
    [9, 'Identifiable', __dyn_IdentifiableBox],
    [10, 'PublicKey', __dyn_PublicKey],
    [11, 'Parameter', __dyn_Parameter],
    [12, 'SignatureCheckCondition', __dyn_SignatureCheckCondition],
    [13, 'TransactionValue', __dyn_TransactionValue],
    [14, 'PermissionToken', __dyn_PermissionToken],
    [15, 'Hash', __dyn_Hash]
])

// Type: VecEvent

type VecEvent__actual = Event[]

interface VecEvent extends Opaque<VecEvent__actual, VecEvent> {}

const VecEvent: ArrayCodecAndFactory<VecEvent__actual, VecEvent> = createVecCodec<VecEvent__actual, VecEvent>('VecEvent', __dyn_Event)

// Type: VecGenesisTransaction

type VecGenesisTransaction__actual = GenesisTransaction[]

interface VecGenesisTransaction extends Opaque<VecGenesisTransaction__actual, VecGenesisTransaction> {}

const VecGenesisTransaction: ArrayCodecAndFactory<VecGenesisTransaction__actual, VecGenesisTransaction> = createVecCodec<VecGenesisTransaction__actual, VecGenesisTransaction>('VecGenesisTransaction', __dyn_GenesisTransaction)

// Type: VecHashOfVersionedValidBlock

type VecHashOfVersionedValidBlock__actual = HashOfVersionedValidBlock[]

interface VecHashOfVersionedValidBlock extends Opaque<VecHashOfVersionedValidBlock__actual, VecHashOfVersionedValidBlock> {}

const VecHashOfVersionedValidBlock: ArrayCodecAndFactory<VecHashOfVersionedValidBlock__actual, VecHashOfVersionedValidBlock> = createVecCodec<VecHashOfVersionedValidBlock__actual, VecHashOfVersionedValidBlock>('VecHashOfVersionedValidBlock', __dyn_HashOfVersionedValidBlock)

// Type: VecInstruction

type VecInstruction__actual = Instruction[]

interface VecInstruction extends Opaque<VecInstruction__actual, VecInstruction> {}

const VecInstruction: ArrayCodecAndFactory<VecInstruction__actual, VecInstruction> = createVecCodec<VecInstruction__actual, VecInstruction>('VecInstruction', __dyn_Instruction)

// Type: VecPeerId

type VecPeerId__actual = PeerId[]

interface VecPeerId extends Opaque<VecPeerId__actual, VecPeerId> {}

const VecPeerId: ArrayCodecAndFactory<VecPeerId__actual, VecPeerId> = createVecCodec<VecPeerId__actual, VecPeerId>('VecPeerId', __dyn_PeerId)

// Type: VecPermissionToken

type VecPermissionToken__actual = PermissionToken[]

interface VecPermissionToken extends Opaque<VecPermissionToken__actual, VecPermissionToken> {}

const VecPermissionToken: ArrayCodecAndFactory<VecPermissionToken__actual, VecPermissionToken> = createVecCodec<VecPermissionToken__actual, VecPermissionToken>('VecPermissionToken', __dyn_PermissionToken)

// Type: VecProof

type VecProof__actual = Proof[]

interface VecProof extends Opaque<VecProof__actual, VecProof> {}

const VecProof: ArrayCodecAndFactory<VecProof__actual, VecProof> = createVecCodec<VecProof__actual, VecProof>('VecProof', __dyn_Proof)

// Type: VecPublicKey

type VecPublicKey__actual = PublicKey[]

interface VecPublicKey extends Opaque<VecPublicKey__actual, VecPublicKey> {}

const VecPublicKey: ArrayCodecAndFactory<VecPublicKey__actual, VecPublicKey> = createVecCodec<VecPublicKey__actual, VecPublicKey>('VecPublicKey', __dyn_PublicKey)

// Type: VecRoleId

type VecRoleId__actual = RoleId[]

interface VecRoleId extends Opaque<VecRoleId__actual, VecRoleId> {}

const VecRoleId: ArrayCodecAndFactory<VecRoleId__actual, VecRoleId> = createVecCodec<VecRoleId__actual, VecRoleId>('VecRoleId', __dyn_RoleId)

// Type: VecSignatureOfTransactionPayload

type VecSignatureOfTransactionPayload__actual = SignatureOfTransactionPayload[]

interface VecSignatureOfTransactionPayload extends Opaque<VecSignatureOfTransactionPayload__actual, VecSignatureOfTransactionPayload> {}

const VecSignatureOfTransactionPayload: ArrayCodecAndFactory<VecSignatureOfTransactionPayload__actual, VecSignatureOfTransactionPayload> = createVecCodec<VecSignatureOfTransactionPayload__actual, VecSignatureOfTransactionPayload>('VecSignatureOfTransactionPayload', __dyn_SignatureOfTransactionPayload)

// Type: VecSignatureOfValidBlock

type VecSignatureOfValidBlock__actual = SignatureOfValidBlock[]

interface VecSignatureOfValidBlock extends Opaque<VecSignatureOfValidBlock__actual, VecSignatureOfValidBlock> {}

const VecSignatureOfValidBlock: ArrayCodecAndFactory<VecSignatureOfValidBlock__actual, VecSignatureOfValidBlock> = createVecCodec<VecSignatureOfValidBlock__actual, VecSignatureOfValidBlock>('VecSignatureOfValidBlock', __dyn_SignatureOfValidBlock)

// Type: VecValue

type VecValue__actual = Value[]

interface VecValue extends Opaque<VecValue__actual, VecValue> {}

const VecValue: ArrayCodecAndFactory<VecValue__actual, VecValue> = createVecCodec<VecValue__actual, VecValue>('VecValue', __dyn_Value)

// Type: VecVersionedRejectedTransaction

type VecVersionedRejectedTransaction__actual = VersionedRejectedTransaction[]

interface VecVersionedRejectedTransaction extends Opaque<VecVersionedRejectedTransaction__actual, VecVersionedRejectedTransaction> {}

const VecVersionedRejectedTransaction: ArrayCodecAndFactory<VecVersionedRejectedTransaction__actual, VecVersionedRejectedTransaction> = createVecCodec<VecVersionedRejectedTransaction__actual, VecVersionedRejectedTransaction>('VecVersionedRejectedTransaction', __dyn_VersionedRejectedTransaction)

// Type: VecVersionedValidTransaction

type VecVersionedValidTransaction__actual = VersionedValidTransaction[]

interface VecVersionedValidTransaction extends Opaque<VecVersionedValidTransaction__actual, VecVersionedValidTransaction> {}

const VecVersionedValidTransaction: ArrayCodecAndFactory<VecVersionedValidTransaction__actual, VecVersionedValidTransaction> = createVecCodec<VecVersionedValidTransaction__actual, VecVersionedValidTransaction>('VecVersionedValidTransaction', __dyn_VersionedValidTransaction)

// Type: VersionError

type VersionError__actual = Enum<
    | 'NotVersioned'
    | 'UnsupportedJsonEncode'
    | 'ExpectedJson'
    | 'UnsupportedScaleEncode'
    | 'Serde'
    | 'ParityScale'
    | 'ParseInt'
    | ['UnsupportedVersion', UnsupportedVersion]
>

interface VersionError extends Opaque<VersionError__actual, VersionError> {}

const VersionError: EnumCodecAndFactory<VersionError> = createEnumCodec<VersionError__actual, VersionError>('VersionError', [
    [0, 'NotVersioned'],
    [1, 'UnsupportedJsonEncode'],
    [2, 'ExpectedJson'],
    [3, 'UnsupportedScaleEncode'],
    [4, 'Serde'],
    [5, 'ParityScale'],
    [6, 'ParseInt'],
    [7, 'UnsupportedVersion', __dyn_UnsupportedVersion]
])

// Type: VersionedBlockPublisherMessage

type VersionedBlockPublisherMessage__actual = Enum<
    | ['V1', BlockPublisherMessage]
>

interface VersionedBlockPublisherMessage extends Opaque<VersionedBlockPublisherMessage__actual, VersionedBlockPublisherMessage> {}

const VersionedBlockPublisherMessage: EnumCodecAndFactory<VersionedBlockPublisherMessage> = createEnumCodec<VersionedBlockPublisherMessage__actual, VersionedBlockPublisherMessage>('VersionedBlockPublisherMessage', [
    [1, 'V1', __dyn_BlockPublisherMessage]
])

// Type: VersionedBlockSubscriberMessage

type VersionedBlockSubscriberMessage__actual = Enum<
    | ['V1', BlockSubscriberMessage]
>

interface VersionedBlockSubscriberMessage extends Opaque<VersionedBlockSubscriberMessage__actual, VersionedBlockSubscriberMessage> {}

const VersionedBlockSubscriberMessage: EnumCodecAndFactory<VersionedBlockSubscriberMessage> = createEnumCodec<VersionedBlockSubscriberMessage__actual, VersionedBlockSubscriberMessage>('VersionedBlockSubscriberMessage', [
    [1, 'V1', __dyn_BlockSubscriberMessage]
])

// Type: VersionedCommittedBlock

type VersionedCommittedBlock__actual = Enum<
    | ['V1', CommittedBlock]
>

interface VersionedCommittedBlock extends Opaque<VersionedCommittedBlock__actual, VersionedCommittedBlock> {}

const VersionedCommittedBlock: EnumCodecAndFactory<VersionedCommittedBlock> = createEnumCodec<VersionedCommittedBlock__actual, VersionedCommittedBlock>('VersionedCommittedBlock', [
    [1, 'V1', __dyn_CommittedBlock]
])

// Type: VersionedEventPublisherMessage

type VersionedEventPublisherMessage__actual = Enum<
    | ['V1', EventPublisherMessage]
>

interface VersionedEventPublisherMessage extends Opaque<VersionedEventPublisherMessage__actual, VersionedEventPublisherMessage> {}

const VersionedEventPublisherMessage: EnumCodecAndFactory<VersionedEventPublisherMessage> = createEnumCodec<VersionedEventPublisherMessage__actual, VersionedEventPublisherMessage>('VersionedEventPublisherMessage', [
    [1, 'V1', __dyn_EventPublisherMessage]
])

// Type: VersionedEventSubscriberMessage

type VersionedEventSubscriberMessage__actual = Enum<
    | ['V1', EventSubscriberMessage]
>

interface VersionedEventSubscriberMessage extends Opaque<VersionedEventSubscriberMessage__actual, VersionedEventSubscriberMessage> {}

const VersionedEventSubscriberMessage: EnumCodecAndFactory<VersionedEventSubscriberMessage> = createEnumCodec<VersionedEventSubscriberMessage__actual, VersionedEventSubscriberMessage>('VersionedEventSubscriberMessage', [
    [1, 'V1', __dyn_EventSubscriberMessage]
])

// Type: VersionedPaginatedQueryResult

type VersionedPaginatedQueryResult__actual = Enum<
    | ['V1', PaginatedQueryResult]
>

interface VersionedPaginatedQueryResult extends Opaque<VersionedPaginatedQueryResult__actual, VersionedPaginatedQueryResult> {}

const VersionedPaginatedQueryResult: EnumCodecAndFactory<VersionedPaginatedQueryResult> = createEnumCodec<VersionedPaginatedQueryResult__actual, VersionedPaginatedQueryResult>('VersionedPaginatedQueryResult', [
    [1, 'V1', __dyn_PaginatedQueryResult]
])

// Type: VersionedRejectedTransaction

type VersionedRejectedTransaction__actual = Enum<
    | ['V1', RejectedTransaction]
>

interface VersionedRejectedTransaction extends Opaque<VersionedRejectedTransaction__actual, VersionedRejectedTransaction> {}

const VersionedRejectedTransaction: EnumCodecAndFactory<VersionedRejectedTransaction> = createEnumCodec<VersionedRejectedTransaction__actual, VersionedRejectedTransaction>('VersionedRejectedTransaction', [
    [1, 'V1', __dyn_RejectedTransaction]
])

// Type: VersionedSignedQueryRequest

type VersionedSignedQueryRequest__actual = Enum<
    | ['V1', SignedQueryRequest]
>

interface VersionedSignedQueryRequest extends Opaque<VersionedSignedQueryRequest__actual, VersionedSignedQueryRequest> {}

const VersionedSignedQueryRequest: EnumCodecAndFactory<VersionedSignedQueryRequest> = createEnumCodec<VersionedSignedQueryRequest__actual, VersionedSignedQueryRequest>('VersionedSignedQueryRequest', [
    [1, 'V1', __dyn_SignedQueryRequest]
])

// Type: VersionedTransaction

type VersionedTransaction__actual = Enum<
    | ['V1', Transaction]
>

interface VersionedTransaction extends Opaque<VersionedTransaction__actual, VersionedTransaction> {}

const VersionedTransaction: EnumCodecAndFactory<VersionedTransaction> = createEnumCodec<VersionedTransaction__actual, VersionedTransaction>('VersionedTransaction', [
    [1, 'V1', __dyn_Transaction]
])

// Type: VersionedValidBlock

type VersionedValidBlock__actual = Enum<
    | ['V1', ValidBlock]
>

interface VersionedValidBlock extends Opaque<VersionedValidBlock__actual, VersionedValidBlock> {}

const VersionedValidBlock: EnumCodecAndFactory<VersionedValidBlock> = createEnumCodec<VersionedValidBlock__actual, VersionedValidBlock>('VersionedValidBlock', [
    [1, 'V1', __dyn_ValidBlock]
])

// Type: VersionedValidTransaction

type VersionedValidTransaction__actual = Enum<
    | ['V1', ValidTransaction]
>

interface VersionedValidTransaction extends Opaque<VersionedValidTransaction__actual, VersionedValidTransaction> {}

const VersionedValidTransaction: EnumCodecAndFactory<VersionedValidTransaction> = createEnumCodec<VersionedValidTransaction__actual, VersionedValidTransaction>('VersionedValidTransaction', [
    [1, 'V1', __dyn_ValidTransaction]
])

// Type: WasmExecutionFail

interface WasmExecutionFail__actual {
    reason: Str
}

interface WasmExecutionFail extends Opaque<WasmExecutionFail__actual, WasmExecutionFail> {}

const WasmExecutionFail: StructCodecAndFactory<WasmExecutionFail__actual, WasmExecutionFail> = createStructCodec<WasmExecutionFail__actual, WasmExecutionFail>('WasmExecutionFail', [
    ['reason', Str]
])

// Type: WasmSmartContract

interface WasmSmartContract__actual {
    raw_data: VecU8
}

interface WasmSmartContract extends Opaque<WasmSmartContract__actual, WasmSmartContract> {}

const WasmSmartContract: StructCodecAndFactory<WasmSmartContract__actual, WasmSmartContract> = createStructCodec<WasmSmartContract__actual, WasmSmartContract>('WasmSmartContract', [
    ['raw_data', VecU8]
])

// Type: Where

interface Where__actual {
    expression: EvaluatesToValue
    values: MapStringEvaluatesToValue
}

interface Where extends Opaque<Where__actual, Where> {}

const Where: StructCodecAndFactory<Where__actual, Where> = createStructCodec<Where__actual, Where>('Where', [
    ['expression', __dyn_EvaluatesToValue],
    ['values', __dyn_MapStringEvaluatesToValue]
])

// Exports

export { Account, AccountEvent, AccountEventFilter, AccountFilter, AccountId, ActionFilterBox, Add, And, ArrayU8L32, Asset, AssetDefinition, AssetDefinitionEntry, AssetDefinitionEvent, AssetDefinitionEventFilter, AssetDefinitionFilter, AssetDefinitionId, AssetEvent, AssetEventFilter, AssetFilter, AssetId, AssetValue, AssetValueType, BlockCreationTimeout, BlockHeader, BlockPublisherMessage, BlockRejectionReason, BlockSubscriberMessage, BurnBox, CommitTimeout, CommittedBlock, Contains, ContainsAll, ContainsAny, ContextValue, DataEvent, Divide, Domain, DomainEvent, DomainEventFilter, DomainFilter, DomainId, Duration, EntityFilter, Equal, EvaluatesToAccountId, EvaluatesToAssetDefinitionId, EvaluatesToAssetId, EvaluatesToBool, EvaluatesToDomainId, EvaluatesToHash, EvaluatesToIdBox, EvaluatesToName, EvaluatesToRegistrableBox, EvaluatesToRoleId, EvaluatesToTriggerId, EvaluatesToU32, EvaluatesToValue, EvaluatesToVecValue, Event, EventPublisherMessage, EventSubscriberMessage, Executable, ExecuteTriggerBox, ExecuteTriggerEvent, ExecuteTriggerEventFilter, ExecutionTime, Expression, FailBox, FilterBox, FilterOptAccountEventFilter, FilterOptAccountFilter, FilterOptAssetDefinitionEventFilter, FilterOptAssetDefinitionFilter, FilterOptAssetEventFilter, FilterOptAssetFilter, FilterOptDomainEventFilter, FilterOptDomainFilter, FilterOptEntityFilter, FilterOptIdFilterAccountId, FilterOptIdFilterAssetDefinitionId, FilterOptIdFilterAssetId, FilterOptIdFilterDomainId, FilterOptIdFilterPeerId, FilterOptIdFilterRoleId, FilterOptIdFilterTriggerId, FilterOptPeerEventFilter, FilterOptPeerFilter, FilterOptRoleEventFilter, FilterOptRoleFilter, FilterOptTriggerEventFilter, FilterOptTriggerFilter, FindAccountById, FindAccountKeyValueByIdAndKey, FindAccountsByDomainId, FindAccountsByName, FindAccountsWithAsset, FindAllAccounts, FindAllActiveTriggerIds, FindAllAssets, FindAllAssetsDefinitions, FindAllDomains, FindAllPeers, FindAllRoleIds, FindAllRoles, FindAssetById, FindAssetDefinitionKeyValueByIdAndKey, FindAssetKeyValueByIdAndKey, FindAssetQuantityById, FindAssetsByAccountId, FindAssetsByAssetDefinitionId, FindAssetsByDomainId, FindAssetsByDomainIdAndAssetDefinitionId, FindAssetsByName, FindDomainById, FindDomainKeyValueByIdAndKey, FindError, FindPermissionTokensByAccountId, FindRoleByRoleId, FindRolesByAccountId, FindTransactionByHash, FindTransactionsByAccountId, FindTriggerById, FindTriggerKeyValueByIdAndKey, Fixed, FixedPointI64, GenesisTransaction, GrantBox, Greater, Hash, HashOfMerkleTreeVersionedTransaction, HashOfProof, HashOfVersionedCommittedBlock, HashOfVersionedTransaction, HashOfVersionedValidBlock, IdBox, IdFilterAccountId, IdFilterAssetDefinitionId, IdFilterAssetId, IdFilterDomainId, IdFilterPeerId, IdFilterRoleId, IdFilterTriggerId, IdentifiableBox, IfExpression, IfInstruction, Instruction, InstructionExecutionFail, IpfsPath, Less, MapAccountIdAccount, MapAssetDefinitionIdAssetDefinitionEntry, MapAssetIdAsset, MapNameValue, MapPublicKeySignatureOfCommittedBlock, MapPublicKeySignatureOfProof, MapPublicKeySignatureOfTransactionPayload, MapStringEvaluatesToValue, MerkleTreeVersionedTransaction, Metadata, MintBox, Mintable, Mod, Multiply, Name, NewAccount, NewDomain, NoTransactionReceiptReceived, Not, NotPermittedFail, OptionDuration, OptionHash, OptionInstruction, OptionIpfsPath, OptionPipelineEntityKind, OptionPipelineStatusKind, OptionTimeInterval, OptionTopology, OptionU32, Or, PaginatedQueryResult, Pagination, Pair, Parameter, ParentHashNotFound, Peer, PeerEvent, PeerEventFilter, PeerFilter, PeerId, PermissionToken, PipelineEntityKind, PipelineEvent, PipelineEventFilter, PipelineStatus, PipelineStatusKind, Proof, ProofChain, ProofPayload, PublicKey, QueryBox, QueryError, QueryPayload, QueryResult, QueryUnsupportedVersionError, RaiseTo, RawGenesisBlock, RawVersioned, Reason, RegisterBox, RegistrableBox, RejectedTransaction, RejectionReason, RemoveKeyValueBox, Repeats, RevokeBox, Role, RoleEvent, RoleEventFilter, RoleFilter, RoleId, SequenceBox, SetKeyValueBox, Signature, SignatureCheckCondition, SignatureOfCommittedBlock, SignatureOfProof, SignatureOfQueryPayload, SignatureOfTransactionPayload, SignatureOfValidBlock, SignaturesOfCommittedBlock, SignaturesOfProof, SignaturesOfTransactionPayload, SignedQueryRequest, Subtract, TimeEvent, TimeEventFilter, TimeInterval, TimeSchedule, Topology, Transaction, TransactionLimitError, TransactionPayload, TransactionRejectionReason, TransactionValue, TransferBox, TriggerEvent, TriggerEventFilter, TriggerFilter, TriggerFilterBox, TriggerId, UnregisterBox, UnsatisfiedSignatureConditionFail, UnsupportedVersion, ValidBlock, ValidTransaction, Value, VecEvent, VecGenesisTransaction, VecHashOfVersionedValidBlock, VecInstruction, VecPeerId, VecPermissionToken, VecProof, VecPublicKey, VecRoleId, VecSignatureOfTransactionPayload, VecSignatureOfValidBlock, VecValue, VecVersionedRejectedTransaction, VecVersionedValidTransaction, VersionError, VersionedBlockPublisherMessage, VersionedBlockSubscriberMessage, VersionedCommittedBlock, VersionedEventPublisherMessage, VersionedEventSubscriberMessage, VersionedPaginatedQueryResult, VersionedRejectedTransaction, VersionedSignedQueryRequest, VersionedTransaction, VersionedValidBlock, VersionedValidTransaction, WasmExecutionFail, WasmSmartContract, Where }
