import {
    U8aFixed,
    Struct,
    Text,
    Bytes,
    Enum,
    u32,
    u128,
    bool,
    Vec,
    BTreeMap,
    BTreeSet,
    Tuple,
    Option,
    u64,
    ITuple,
} from '@iroha/scale-codec-legacy';

/* eslint-disable */

/** @name _VersionedEventV1 */
export interface _VersionedEventV1 extends Event {}

/** @name _VersionedQueryResultV1 */
export interface _VersionedQueryResultV1 extends QueryResult {}

/** @name _VersionedRejectedTransactionV1 */
export interface _VersionedRejectedTransactionV1 extends RejectedTransaction {}

/** @name _VersionedTransactionV1 */
export interface _VersionedTransactionV1 extends Transaction {}

/** @name Account */
export interface Account extends Struct {
    readonly id: AccountId;
    readonly assets: BTreeMap<AssetId, Asset>;
    readonly signatories: Vec<PublicKey>;
    readonly permissionTokens: BTreeSet<PermissionToken>;
    readonly signatureCheckCondition: SignatureCheckCondition;
    readonly metadata: Metadata;
}

/** @name AccountId */
export interface AccountId extends Struct {
    readonly name: Text;
    readonly domainName: Text;
}

/** @name Add */
export interface Add extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name And */
export interface And extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name Asset */
export interface Asset extends Struct {
    readonly id: AssetId;
    readonly value: AssetValue;
}

/** @name AssetDefinition */
export interface AssetDefinition extends Struct {
    readonly valueType: AssetValueType;
    readonly id: DefinitionId;
}

/** @name AssetDefinitionEntry */
export interface AssetDefinitionEntry extends Struct {
    readonly definition: AssetDefinition;
    readonly registeredBy: AccountId;
}

/** @name AssetId */
export interface AssetId extends Struct {
    readonly definitionId: DefinitionId;
    readonly accountId: AccountId;
}

/** @name AssetValue */
export interface AssetValue extends Enum {
    readonly isQuantity: boolean;
    readonly asQuantity: u32;
    readonly isBigQuantity: boolean;
    readonly asBigQuantity: u128;
    readonly isStore: boolean;
    readonly asStore: Metadata;
}

/** @name AssetValueType */
export interface AssetValueType extends Enum {
    readonly isQuantity: boolean;
    readonly isBigQuantity: boolean;
    readonly isStore: boolean;
}

/** @name BlockRejectionReason */
export interface BlockRejectionReason extends Enum {
    readonly isConsensusBlockRejection: boolean;
}

/** @name BurnBox */
export interface BurnBox extends Struct {
    readonly object: EvaluatesTo;
    readonly destinationId: EvaluatesTo;
}

/** @name Contains */
export interface Contains extends Struct {
    readonly collection: EvaluatesTo;
    readonly element: EvaluatesTo;
}

/** @name ContainsAll */
export interface ContainsAll extends Struct {
    readonly collection: EvaluatesTo;
    readonly elements: EvaluatesTo;
}

/** @name ContainsAny */
export interface ContainsAny extends Struct {
    readonly collection: EvaluatesTo;
    readonly elements: EvaluatesTo;
}

/** @name ContextValue */
export interface ContextValue extends Struct {
    readonly valueName: Text;
}

/** @name DataEvent */
export interface DataEvent extends ITuple<[]> {}

/** @name DefinitionId */
export interface DefinitionId extends Struct {
    readonly name: Text;
    readonly domainName: Text;
}

/** @name Divide */
export interface Divide extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name Domain */
export interface Domain extends Struct {
    readonly name: Text;
    readonly accounts: BTreeMap<AccountId, Account>;
    readonly assetDefinitions: BTreeMap<DefinitionId, AssetDefinitionEntry>;
}

/** @name EntityType */
export interface EntityType extends Enum {
    readonly isBlock: boolean;
    readonly isTransaction: boolean;
}

/** @name Equal */
export interface Equal extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name EvaluatesTo */
export interface EvaluatesTo extends Struct {
    readonly expression: Expression;
}

/** @name Event */
export interface Event extends Enum {
    readonly isPipeline: boolean;
    readonly asPipeline: PipelineEvent;
    readonly isData: boolean;
    readonly asData: DataEvent;
}

/** @name Expression */
export interface Expression extends Enum {
    readonly isAdd: boolean;
    readonly asAdd: Add;
    readonly isSubtract: boolean;
    readonly asSubtract: Subtract;
    readonly isMultiply: boolean;
    readonly asMultiply: Multiply;
    readonly isDivide: boolean;
    readonly asDivide: Divide;
    readonly isMod: boolean;
    readonly asMod: Mod;
    readonly isRaiseTo: boolean;
    readonly asRaiseTo: RaiseTo;
    readonly isGreater: boolean;
    readonly asGreater: Greater;
    readonly isLess: boolean;
    readonly asLess: Less;
    readonly isEqual: boolean;
    readonly asEqual: Equal;
    readonly isNot: boolean;
    readonly asNot: Not;
    readonly isAnd: boolean;
    readonly asAnd: And;
    readonly isOr: boolean;
    readonly asOr: Or;
    readonly isIf: boolean;
    readonly asIf: IfExpression;
    readonly isRaw: boolean;
    readonly asRaw: Value;
    readonly isQuery: boolean;
    readonly asQuery: QueryBox;
    readonly isContains: boolean;
    readonly asContains: Contains;
    readonly isContainsAll: boolean;
    readonly asContainsAll: ContainsAll;
    readonly isContainsAny: boolean;
    readonly asContainsAny: ContainsAny;
    readonly isWhere: boolean;
    readonly asWhere: Where;
    readonly isContextValue: boolean;
    readonly asContextValue: ContextValue;
}

/** @name FailBox */
export interface FailBox extends Struct {
    readonly message: Text;
}

/** @name FindAccountById */
export interface FindAccountById extends Struct {
    readonly id: EvaluatesTo;
}

/** @name FindAccountKeyValueByIdAndKey */
export interface FindAccountKeyValueByIdAndKey extends Struct {
    readonly id: EvaluatesTo;
    readonly key: EvaluatesTo;
}

/** @name FindAccountsByDomainName */
export interface FindAccountsByDomainName extends Struct {
    readonly domainName: EvaluatesTo;
}

/** @name FindAccountsByName */
export interface FindAccountsByName extends Struct {
    readonly name: EvaluatesTo;
}

/** @name FindAllAccounts */
export interface FindAllAccounts extends Struct {}

/** @name FindAllAssets */
export interface FindAllAssets extends Struct {}

/** @name FindAllAssetsDefinitions */
export interface FindAllAssetsDefinitions extends Struct {}

/** @name FindAllDomains */
export interface FindAllDomains extends Struct {}

/** @name FindAllPeers */
export interface FindAllPeers extends Struct {}

/** @name FindAssetById */
export interface FindAssetById extends Struct {
    readonly id: EvaluatesTo;
}

/** @name FindAssetKeyValueByIdAndKey */
export interface FindAssetKeyValueByIdAndKey extends Struct {
    readonly id: EvaluatesTo;
    readonly key: EvaluatesTo;
}

/** @name FindAssetQuantityById */
export interface FindAssetQuantityById extends Struct {
    readonly id: EvaluatesTo;
}

/** @name FindAssetsByAccountId */
export interface FindAssetsByAccountId extends Struct {
    readonly accountId: EvaluatesTo;
}

/** @name FindAssetsByAccountIdAndAssetDefinitionId */
export interface FindAssetsByAccountIdAndAssetDefinitionId extends Struct {
    readonly accountId: EvaluatesTo;
    readonly assetDefinitionId: EvaluatesTo;
}

/** @name FindAssetsByAssetDefinitionId */
export interface FindAssetsByAssetDefinitionId extends Struct {
    readonly assetDefinitionId: EvaluatesTo;
}

/** @name FindAssetsByDomainName */
export interface FindAssetsByDomainName extends Struct {
    readonly domainName: EvaluatesTo;
}

/** @name FindAssetsByDomainNameAndAssetDefinitionId */
export interface FindAssetsByDomainNameAndAssetDefinitionId extends Struct {
    readonly domainName: EvaluatesTo;
    readonly assetDefinitionId: EvaluatesTo;
}

/** @name FindAssetsByName */
export interface FindAssetsByName extends Struct {
    readonly name: EvaluatesTo;
}

/** @name FindDomainByName */
export interface FindDomainByName extends Struct {
    readonly name: EvaluatesTo;
}

/** @name FindPermissionTokensByAccountId */
export interface FindPermissionTokensByAccountId extends Struct {
    readonly id: EvaluatesTo;
}

/** @name FindTransactionsByAccountId */
export interface FindTransactionsByAccountId extends Struct {
    readonly accountId: EvaluatesTo;
}

/** @name GrantBox */
export interface GrantBox extends Struct {
    readonly object: EvaluatesTo;
    readonly destinationId: EvaluatesTo;
}

/** @name Greater */
export interface Greater extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name Hash */
export interface Hash extends U8aFixed {}

/** @name IdBox */
export interface IdBox extends Enum {
    readonly isAccountId: boolean;
    readonly asAccountId: AccountId;
    readonly isAssetId: boolean;
    readonly asAssetId: AssetId;
    readonly isAssetDefinitionId: boolean;
    readonly asAssetDefinitionId: DefinitionId;
    readonly isDomainName: boolean;
    readonly asDomainName: Text;
    readonly isPeerId: boolean;
    readonly asPeerId: PeerId;
    readonly isWorldId: boolean;
}

/** @name IdentifiableBox */
export interface IdentifiableBox extends Enum {
    readonly isAccount: boolean;
    readonly asAccount: Account;
    readonly isNewAccount: boolean;
    readonly asNewAccount: NewAccount;
    readonly isAsset: boolean;
    readonly asAsset: Asset;
    readonly isAssetDefinition: boolean;
    readonly asAssetDefinition: AssetDefinition;
    readonly isDomain: boolean;
    readonly asDomain: Domain;
    readonly isPeer: boolean;
    readonly asPeer: Peer;
    readonly isWorld: boolean;
}

/** @name IfExpression */
export interface IfExpression extends Struct {
    readonly condition: EvaluatesTo;
    readonly thenExpression: EvaluatesTo;
    readonly elseExpression: EvaluatesTo;
}

/** @name IfInstruction */
export interface IfInstruction extends Struct {
    readonly condition: EvaluatesTo;
    readonly then: Instruction;
    readonly otherwise: Option<Instruction>;
}

/** @name Instruction */
export interface Instruction extends Enum {
    readonly isRegister: boolean;
    readonly asRegister: RegisterBox;
    readonly isUnregister: boolean;
    readonly asUnregister: UnregisterBox;
    readonly isMint: boolean;
    readonly asMint: MintBox;
    readonly isBurn: boolean;
    readonly asBurn: BurnBox;
    readonly isTransfer: boolean;
    readonly asTransfer: TransferBox;
    readonly isIf: boolean;
    readonly asIf: IfInstruction;
    readonly isPair: boolean;
    readonly asPair: Pair;
    readonly isSequence: boolean;
    readonly asSequence: SequenceBox;
    readonly isFail: boolean;
    readonly asFail: FailBox;
    readonly isSetKeyValue: boolean;
    readonly asSetKeyValue: SetKeyValueBox;
    readonly isRemoveKeyValue: boolean;
    readonly asRemoveKeyValue: RemoveKeyValueBox;
    readonly isGrant: boolean;
    readonly asGrant: GrantBox;
}

/** @name InstructionExecutionFail */
export interface InstructionExecutionFail extends Struct {
    readonly instruction: Instruction;
    readonly reason: Text;
}

/** @name Less */
export interface Less extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name Metadata */
export interface Metadata extends Struct {
    readonly map: BTreeMap<Text, Value>;
}

/** @name MintBox */
export interface MintBox extends Struct {
    readonly object: EvaluatesTo;
    readonly destinationId: EvaluatesTo;
}

/** @name Mod */
export interface Mod extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name Multiply */
export interface Multiply extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name NewAccount */
export interface NewAccount extends Struct {
    readonly id: AccountId;
    readonly signatories: Vec<PublicKey>;
    readonly metadata: Metadata;
}

/** @name Not */
export interface Not extends Struct {
    readonly expression: EvaluatesTo;
}

/** @name NotPermittedFail */
export interface NotPermittedFail extends Struct {
    readonly reason: Text;
}

/** @name Or */
export interface Or extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name Pair */
export interface Pair extends Struct {
    readonly leftInstruction: Instruction;
    readonly rightInstruction: Instruction;
}

/** @name Parameter */
export interface Parameter extends Enum {
    readonly isMaximumFaultyPeersAmount: boolean;
    readonly asMaximumFaultyPeersAmount: u32;
    readonly isBlockTime: boolean;
    readonly asBlockTime: u128;
    readonly isCommitTime: boolean;
    readonly asCommitTime: u128;
    readonly isTransactionReceiptTime: boolean;
    readonly asTransactionReceiptTime: u128;
}

/** @name Payload */
export interface Payload extends Struct {
    readonly accountId: AccountId;
    readonly instructions: Vec<Instruction>;
    readonly creationTime: u64;
    readonly timeToLiveMs: u64;
    readonly metadata: BTreeMap<Text, Value>;
}

/** @name Peer */
export interface Peer extends Struct {
    readonly id: PeerId;
}

/** @name PeerId */
export interface PeerId extends Struct {
    readonly address: Text;
    readonly publicKey: PublicKey;
}

/** @name PermissionToken */
export interface PermissionToken extends Struct {
    readonly name: Text;
    readonly params: BTreeMap<Text, Value>;
}

/** @name PipelineEvent */
export interface PipelineEvent extends Struct {
    readonly entityType: EntityType;
    readonly status: Status;
    readonly hash: Hash;
}

/** @name PublicKey */
export interface PublicKey extends Struct {
    readonly digestFunction: Text;
    readonly payload: Bytes;
}

/** @name QueryBox */
export interface QueryBox extends Enum {
    readonly isFindAllAccounts: boolean;
    readonly asFindAllAccounts: FindAllAccounts;
    readonly isFindAccountById: boolean;
    readonly asFindAccountById: FindAccountById;
    readonly isFindAccountKeyValueByIdAndKey: boolean;
    readonly asFindAccountKeyValueByIdAndKey: FindAccountKeyValueByIdAndKey;
    readonly isFindAccountsByName: boolean;
    readonly asFindAccountsByName: FindAccountsByName;
    readonly isFindAccountsByDomainName: boolean;
    readonly asFindAccountsByDomainName: FindAccountsByDomainName;
    readonly isFindAllAssets: boolean;
    readonly asFindAllAssets: FindAllAssets;
    readonly isFindAllAssetsDefinitions: boolean;
    readonly asFindAllAssetsDefinitions: FindAllAssetsDefinitions;
    readonly isFindAssetById: boolean;
    readonly asFindAssetById: FindAssetById;
    readonly isFindAssetsByName: boolean;
    readonly asFindAssetsByName: FindAssetsByName;
    readonly isFindAssetsByAccountId: boolean;
    readonly asFindAssetsByAccountId: FindAssetsByAccountId;
    readonly isFindAssetsByAssetDefinitionId: boolean;
    readonly asFindAssetsByAssetDefinitionId: FindAssetsByAssetDefinitionId;
    readonly isFindAssetsByDomainName: boolean;
    readonly asFindAssetsByDomainName: FindAssetsByDomainName;
    readonly isFindAssetsByAccountIdAndAssetDefinitionId: boolean;
    readonly asFindAssetsByAccountIdAndAssetDefinitionId: FindAssetsByAccountIdAndAssetDefinitionId;
    readonly isFindAssetsByDomainNameAndAssetDefinitionId: boolean;
    readonly asFindAssetsByDomainNameAndAssetDefinitionId: FindAssetsByDomainNameAndAssetDefinitionId;
    readonly isFindAssetQuantityById: boolean;
    readonly asFindAssetQuantityById: FindAssetQuantityById;
    readonly isFindAssetKeyValueByIdAndKey: boolean;
    readonly asFindAssetKeyValueByIdAndKey: FindAssetKeyValueByIdAndKey;
    readonly isFindAllDomains: boolean;
    readonly asFindAllDomains: FindAllDomains;
    readonly isFindDomainByName: boolean;
    readonly asFindDomainByName: FindDomainByName;
    readonly isFindAllPeers: boolean;
    readonly asFindAllPeers: FindAllPeers;
    readonly isFindTransactionsByAccountId: boolean;
    readonly asFindTransactionsByAccountId: FindTransactionsByAccountId;
    readonly isFindPermissionTokensByAccountId: boolean;
    readonly asFindPermissionTokensByAccountId: FindPermissionTokensByAccountId;
}

/** @name QueryResult */
export interface QueryResult extends Value {}

/** @name RaiseTo */
export interface RaiseTo extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name RegisterBox */
export interface RegisterBox extends Struct {
    readonly object: EvaluatesTo;
}

/** @name RejectedTransaction */
export interface RejectedTransaction extends Struct {
    readonly payload: Payload;
    readonly signatures: Vec<Signature>;
    readonly rejectionReason: TransactionRejectionReason;
}

/** @name RejectionReason */
export interface RejectionReason extends Enum {
    readonly isBlock: boolean;
    readonly asBlock: BlockRejectionReason;
    readonly isTransaction: boolean;
    readonly asTransaction: TransactionRejectionReason;
}

/** @name RemoveKeyValueBox */
export interface RemoveKeyValueBox extends Struct {
    readonly objectId: EvaluatesTo;
    readonly key: EvaluatesTo;
}

/** @name SequenceBox */
export interface SequenceBox extends Struct {
    readonly instructions: Vec<Instruction>;
}

/** @name SetKeyValueBox */
export interface SetKeyValueBox extends Struct {
    readonly objectId: EvaluatesTo;
    readonly key: EvaluatesTo;
    readonly value: EvaluatesTo;
}

/** @name Signature */
export interface Signature extends Struct {
    readonly publicKey: PublicKey;
    readonly signature: Bytes;
}

/** @name SignatureCheckCondition */
export interface SignatureCheckCondition extends EvaluatesTo {}

/** @name SignatureVerificationFail */
export interface SignatureVerificationFail extends Struct {
    readonly signature: Signature;
    readonly reason: Text;
}

/** @name Status */
export interface Status extends Enum {
    readonly isValidating: boolean;
    readonly isRejected: boolean;
    readonly asRejected: RejectionReason;
    readonly isCommitted: boolean;
}

/** @name Subtract */
export interface Subtract extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

/** @name Transaction */
export interface Transaction extends Struct {
    readonly payload: Payload;
    readonly signatures: Vec<Signature>;
}

/** @name TransactionRejectionReason */
export interface TransactionRejectionReason extends Enum {
    readonly isNotPermitted: boolean;
    readonly asNotPermitted: NotPermittedFail;
    readonly isUnsatisfiedSignatureCondition: boolean;
    readonly asUnsatisfiedSignatureCondition: UnsatisfiedSignatureConditionFail;
    readonly isInstructionExecution: boolean;
    readonly asInstructionExecution: InstructionExecutionFail;
    readonly isSignatureVerification: boolean;
    readonly asSignatureVerification: SignatureVerificationFail;
    readonly isUnexpectedGenesisAccountSignature: boolean;
}

/** @name TransactionValue */
export interface TransactionValue extends Enum {
    readonly isTransaction: boolean;
    readonly asTransaction: VersionedTransaction;
    readonly isRejectedTransaction: boolean;
    readonly asRejectedTransaction: VersionedRejectedTransaction;
}

/** @name TransferBox */
export interface TransferBox extends Struct {
    readonly sourceId: EvaluatesTo;
    readonly object: EvaluatesTo;
    readonly destinationId: EvaluatesTo;
}

/** @name UnregisterBox */
export interface UnregisterBox extends Struct {
    readonly objectId: EvaluatesTo;
}

/** @name UnsatisfiedSignatureConditionFail */
export interface UnsatisfiedSignatureConditionFail extends Struct {
    readonly reason: Text;
}

/** @name Value */
export interface Value extends Enum {
    readonly isU32: boolean;
    readonly asU32: u32;
    readonly isBool: boolean;
    readonly asBool: bool;
    readonly isText: boolean;
    readonly asText: Text;
    readonly isVec: boolean;
    readonly asVec: Vec<Value>;
    readonly isId: boolean;
    readonly asId: IdBox;
    readonly isIdentifiable: boolean;
    readonly asIdentifiable: IdentifiableBox;
    readonly isPublicKey: boolean;
    readonly asPublicKey: PublicKey;
    readonly isParameter: boolean;
    readonly asParameter: Parameter;
    readonly isSignatureCheckCondition: boolean;
    readonly asSignatureCheckCondition: SignatureCheckCondition;
    readonly isTransactionValue: boolean;
    readonly asTransactionValue: TransactionValue;
    readonly isPermissionToken: boolean;
    readonly asPermissionToken: PermissionToken;
}

/** @name VersionedEvent */
export interface VersionedEvent extends Enum {
    readonly isV1: boolean;
    readonly asV1: _VersionedEventV1;
}

/** @name VersionedQueryResult */
export interface VersionedQueryResult extends Enum {
    readonly isStubToFillDiscriminant0: boolean;
    readonly isV1: boolean;
    readonly asV1: _VersionedQueryResultV1;
}

/** @name VersionedRejectedTransaction */
export interface VersionedRejectedTransaction extends Enum {
    readonly isStubToFillDiscriminant0: boolean;
    readonly isV1: boolean;
    readonly asV1: _VersionedRejectedTransactionV1;
}

/** @name VersionedTransaction */
export interface VersionedTransaction extends Enum {
    readonly isStubToFillDiscriminant0: boolean;
    readonly isV1: boolean;
    readonly asV1: _VersionedTransactionV1;
}

/** @name Where */
export interface Where extends Struct {
    readonly expression: EvaluatesTo;
    readonly values: BTreeMap<Text, EvaluatesTo>;
}

export interface IrohaDslConstructorDef {
    _VersionedEventV1: _VersionedEventV1;
    _VersionedQueryResultV1: _VersionedQueryResultV1;
    _VersionedRejectedTransactionV1: _VersionedRejectedTransactionV1;
    _VersionedTransactionV1: _VersionedTransactionV1;
    Account: Account;
    AccountId: AccountId;
    Add: Add;
    And: And;
    Asset: Asset;
    AssetDefinition: AssetDefinition;
    AssetDefinitionEntry: AssetDefinitionEntry;
    AssetId: AssetId;
    AssetValue: AssetValue;
    AssetValueType: AssetValueType;
    BlockRejectionReason: BlockRejectionReason;
    BurnBox: BurnBox;
    Contains: Contains;
    ContainsAll: ContainsAll;
    ContainsAny: ContainsAny;
    ContextValue: ContextValue;
    DataEvent: DataEvent;
    DefinitionId: DefinitionId;
    Divide: Divide;
    Domain: Domain;
    EntityType: EntityType;
    Equal: Equal;
    EvaluatesTo: EvaluatesTo;
    Event: Event;
    Expression: Expression;
    FailBox: FailBox;
    FindAccountById: FindAccountById;
    FindAccountKeyValueByIdAndKey: FindAccountKeyValueByIdAndKey;
    FindAccountsByDomainName: FindAccountsByDomainName;
    FindAccountsByName: FindAccountsByName;
    FindAllAccounts: FindAllAccounts;
    FindAllAssets: FindAllAssets;
    FindAllAssetsDefinitions: FindAllAssetsDefinitions;
    FindAllDomains: FindAllDomains;
    FindAllPeers: FindAllPeers;
    FindAssetById: FindAssetById;
    FindAssetKeyValueByIdAndKey: FindAssetKeyValueByIdAndKey;
    FindAssetQuantityById: FindAssetQuantityById;
    FindAssetsByAccountId: FindAssetsByAccountId;
    FindAssetsByAccountIdAndAssetDefinitionId: FindAssetsByAccountIdAndAssetDefinitionId;
    FindAssetsByAssetDefinitionId: FindAssetsByAssetDefinitionId;
    FindAssetsByDomainName: FindAssetsByDomainName;
    FindAssetsByDomainNameAndAssetDefinitionId: FindAssetsByDomainNameAndAssetDefinitionId;
    FindAssetsByName: FindAssetsByName;
    FindDomainByName: FindDomainByName;
    FindPermissionTokensByAccountId: FindPermissionTokensByAccountId;
    FindTransactionsByAccountId: FindTransactionsByAccountId;
    GrantBox: GrantBox;
    Greater: Greater;
    Hash: Hash;
    IdBox: IdBox;
    IdentifiableBox: IdentifiableBox;
    IfExpression: IfExpression;
    IfInstruction: IfInstruction;
    Instruction: Instruction;
    InstructionExecutionFail: InstructionExecutionFail;
    Less: Less;
    Metadata: Metadata;
    MintBox: MintBox;
    Mod: Mod;
    Multiply: Multiply;
    NewAccount: NewAccount;
    Not: Not;
    NotPermittedFail: NotPermittedFail;
    Or: Or;
    Pair: Pair;
    Parameter: Parameter;
    Payload: Payload;
    Peer: Peer;
    PeerId: PeerId;
    PermissionToken: PermissionToken;
    PipelineEvent: PipelineEvent;
    PublicKey: PublicKey;
    QueryBox: QueryBox;
    QueryResult: QueryResult;
    RaiseTo: RaiseTo;
    RegisterBox: RegisterBox;
    RejectedTransaction: RejectedTransaction;
    RejectionReason: RejectionReason;
    RemoveKeyValueBox: RemoveKeyValueBox;
    SequenceBox: SequenceBox;
    SetKeyValueBox: SetKeyValueBox;
    Signature: Signature;
    SignatureCheckCondition: SignatureCheckCondition;
    SignatureVerificationFail: SignatureVerificationFail;
    Status: Status;
    Subtract: Subtract;
    Transaction: Transaction;
    TransactionRejectionReason: TransactionRejectionReason;
    TransactionValue: TransactionValue;
    TransferBox: TransferBox;
    UnregisterBox: UnregisterBox;
    UnsatisfiedSignatureConditionFail: UnsatisfiedSignatureConditionFail;
    Value: Value;
    VersionedEvent: VersionedEvent;
    VersionedQueryResult: VersionedQueryResult;
    VersionedRejectedTransaction: VersionedRejectedTransaction;
    VersionedTransaction: VersionedTransaction;
    Where: Where;
}
