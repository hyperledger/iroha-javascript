// package: iroha.protocol
// file: qry_responses.proto

import * as jspb from "google-protobuf";
import * as block_pb from "./block_pb";
import * as transaction_pb from "./transaction_pb";
import * as primitive_pb from "./primitive_pb";

export class Asset extends jspb.Message {
  getAssetId(): string;
  setAssetId(value: string): void;

  getDomainId(): string;
  setDomainId(value: string): void;

  getPrecision(): number;
  setPrecision(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Asset.AsObject;
  static toObject(includeInstance: boolean, msg: Asset): Asset.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Asset, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Asset;
  static deserializeBinaryFromReader(message: Asset, reader: jspb.BinaryReader): Asset;
}

export namespace Asset {
  export type AsObject = {
    assetId: string,
    domainId: string,
    precision: number,
  }
}

export class Domain extends jspb.Message {
  getDomainId(): string;
  setDomainId(value: string): void;

  getDefaultRole(): string;
  setDefaultRole(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Domain.AsObject;
  static toObject(includeInstance: boolean, msg: Domain): Domain.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Domain, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Domain;
  static deserializeBinaryFromReader(message: Domain, reader: jspb.BinaryReader): Domain;
}

export namespace Domain {
  export type AsObject = {
    domainId: string,
    defaultRole: string,
  }
}

export class Account extends jspb.Message {
  getAccountId(): string;
  setAccountId(value: string): void;

  getDomainId(): string;
  setDomainId(value: string): void;

  getQuorum(): number;
  setQuorum(value: number): void;

  getJsonData(): string;
  setJsonData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Account.AsObject;
  static toObject(includeInstance: boolean, msg: Account): Account.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Account, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Account;
  static deserializeBinaryFromReader(message: Account, reader: jspb.BinaryReader): Account;
}

export namespace Account {
  export type AsObject = {
    accountId: string,
    domainId: string,
    quorum: number,
    jsonData: string,
  }
}

export class AccountAsset extends jspb.Message {
  getAssetId(): string;
  setAssetId(value: string): void;

  getAccountId(): string;
  setAccountId(value: string): void;

  getBalance(): string;
  setBalance(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountAsset.AsObject;
  static toObject(includeInstance: boolean, msg: AccountAsset): AccountAsset.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountAsset, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountAsset;
  static deserializeBinaryFromReader(message: AccountAsset, reader: jspb.BinaryReader): AccountAsset;
}

export namespace AccountAsset {
  export type AsObject = {
    assetId: string,
    accountId: string,
    balance: string,
  }
}

export class AccountAssetResponse extends jspb.Message {
  clearAccountAssetsList(): void;
  getAccountAssetsList(): Array<AccountAsset>;
  setAccountAssetsList(value: Array<AccountAsset>): void;
  addAccountAssets(value?: AccountAsset, index?: number): AccountAsset;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountAssetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AccountAssetResponse): AccountAssetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountAssetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountAssetResponse;
  static deserializeBinaryFromReader(message: AccountAssetResponse, reader: jspb.BinaryReader): AccountAssetResponse;
}

export namespace AccountAssetResponse {
  export type AsObject = {
    accountAssetsList: Array<AccountAsset.AsObject>,
  }
}

export class AccountDetailResponse extends jspb.Message {
  getDetail(): string;
  setDetail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountDetailResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AccountDetailResponse): AccountDetailResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountDetailResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountDetailResponse;
  static deserializeBinaryFromReader(message: AccountDetailResponse, reader: jspb.BinaryReader): AccountDetailResponse;
}

export namespace AccountDetailResponse {
  export type AsObject = {
    detail: string,
  }
}

export class AccountResponse extends jspb.Message {
  hasAccount(): boolean;
  clearAccount(): void;
  getAccount(): Account | undefined;
  setAccount(value?: Account): void;

  clearAccountRolesList(): void;
  getAccountRolesList(): Array<string>;
  setAccountRolesList(value: Array<string>): void;
  addAccountRoles(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AccountResponse): AccountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountResponse;
  static deserializeBinaryFromReader(message: AccountResponse, reader: jspb.BinaryReader): AccountResponse;
}

export namespace AccountResponse {
  export type AsObject = {
    account?: Account.AsObject,
    accountRolesList: Array<string>,
  }
}

export class AssetResponse extends jspb.Message {
  hasAsset(): boolean;
  clearAsset(): void;
  getAsset(): Asset | undefined;
  setAsset(value?: Asset): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AssetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AssetResponse): AssetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AssetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AssetResponse;
  static deserializeBinaryFromReader(message: AssetResponse, reader: jspb.BinaryReader): AssetResponse;
}

export namespace AssetResponse {
  export type AsObject = {
    asset?: Asset.AsObject,
  }
}

export class RolesResponse extends jspb.Message {
  clearRolesList(): void;
  getRolesList(): Array<string>;
  setRolesList(value: Array<string>): void;
  addRoles(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RolesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RolesResponse): RolesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RolesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RolesResponse;
  static deserializeBinaryFromReader(message: RolesResponse, reader: jspb.BinaryReader): RolesResponse;
}

export namespace RolesResponse {
  export type AsObject = {
    rolesList: Array<string>,
  }
}

export class RolePermissionsResponse extends jspb.Message {
  clearPermissionsList(): void;
  getPermissionsList(): Array<primitive_pb.RolePermission>;
  setPermissionsList(value: Array<primitive_pb.RolePermission>): void;
  addPermissions(value: primitive_pb.RolePermission, index?: number): primitive_pb.RolePermission;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RolePermissionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RolePermissionsResponse): RolePermissionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RolePermissionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RolePermissionsResponse;
  static deserializeBinaryFromReader(message: RolePermissionsResponse, reader: jspb.BinaryReader): RolePermissionsResponse;
}

export namespace RolePermissionsResponse {
  export type AsObject = {
    permissionsList: Array<primitive_pb.RolePermission>,
  }
}

export class ErrorResponse extends jspb.Message {
  getReason(): ErrorResponse.Reason;
  setReason(value: ErrorResponse.Reason): void;

  getMessage(): string;
  setMessage(value: string): void;

  getErrorCode(): number;
  setErrorCode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorResponse): ErrorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorResponse;
  static deserializeBinaryFromReader(message: ErrorResponse, reader: jspb.BinaryReader): ErrorResponse;
}

export namespace ErrorResponse {
  export type AsObject = {
    reason: ErrorResponse.Reason,
    message: string,
    errorCode: number,
  }

  export enum Reason {
    STATELESS_INVALID = 0,
    STATEFUL_INVALID = 1,
    NO_ACCOUNT = 2,
    NO_ACCOUNT_ASSETS = 3,
    NO_ACCOUNT_DETAIL = 4,
    NO_SIGNATORIES = 5,
    NOT_SUPPORTED = 6,
    NO_ASSET = 7,
    NO_ROLES = 8,
  }
}

export class SignatoriesResponse extends jspb.Message {
  clearKeysList(): void;
  getKeysList(): Array<string>;
  setKeysList(value: Array<string>): void;
  addKeys(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignatoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignatoriesResponse): SignatoriesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignatoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignatoriesResponse;
  static deserializeBinaryFromReader(message: SignatoriesResponse, reader: jspb.BinaryReader): SignatoriesResponse;
}

export namespace SignatoriesResponse {
  export type AsObject = {
    keysList: Array<string>,
  }
}

export class TransactionsResponse extends jspb.Message {
  clearTransactionsList(): void;
  getTransactionsList(): Array<transaction_pb.Transaction>;
  setTransactionsList(value: Array<transaction_pb.Transaction>): void;
  addTransactions(value?: transaction_pb.Transaction, index?: number): transaction_pb.Transaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionsResponse): TransactionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionsResponse;
  static deserializeBinaryFromReader(message: TransactionsResponse, reader: jspb.BinaryReader): TransactionsResponse;
}

export namespace TransactionsResponse {
  export type AsObject = {
    transactionsList: Array<transaction_pb.Transaction.AsObject>,
  }
}

export class TransactionsPageResponse extends jspb.Message {
  clearTransactionsList(): void;
  getTransactionsList(): Array<transaction_pb.Transaction>;
  setTransactionsList(value: Array<transaction_pb.Transaction>): void;
  addTransactions(value?: transaction_pb.Transaction, index?: number): transaction_pb.Transaction;

  getAllTransactionsSize(): number;
  setAllTransactionsSize(value: number): void;

  hasNextTxHash(): boolean;
  clearNextTxHash(): void;
  getNextTxHash(): string;
  setNextTxHash(value: string): void;

  getNextPageTagCase(): TransactionsPageResponse.NextPageTagCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionsPageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionsPageResponse): TransactionsPageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionsPageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionsPageResponse;
  static deserializeBinaryFromReader(message: TransactionsPageResponse, reader: jspb.BinaryReader): TransactionsPageResponse;
}

export namespace TransactionsPageResponse {
  export type AsObject = {
    transactionsList: Array<transaction_pb.Transaction.AsObject>,
    allTransactionsSize: number,
    nextTxHash: string,
  }

  export enum NextPageTagCase {
    NEXT_PAGE_TAG_NOT_SET = 0,
    NEXT_TX_HASH = 3,
  }
}

export class QueryResponse extends jspb.Message {
  hasAccountAssetsResponse(): boolean;
  clearAccountAssetsResponse(): void;
  getAccountAssetsResponse(): AccountAssetResponse | undefined;
  setAccountAssetsResponse(value?: AccountAssetResponse): void;

  hasAccountDetailResponse(): boolean;
  clearAccountDetailResponse(): void;
  getAccountDetailResponse(): AccountDetailResponse | undefined;
  setAccountDetailResponse(value?: AccountDetailResponse): void;

  hasAccountResponse(): boolean;
  clearAccountResponse(): void;
  getAccountResponse(): AccountResponse | undefined;
  setAccountResponse(value?: AccountResponse): void;

  hasErrorResponse(): boolean;
  clearErrorResponse(): void;
  getErrorResponse(): ErrorResponse | undefined;
  setErrorResponse(value?: ErrorResponse): void;

  hasSignatoriesResponse(): boolean;
  clearSignatoriesResponse(): void;
  getSignatoriesResponse(): SignatoriesResponse | undefined;
  setSignatoriesResponse(value?: SignatoriesResponse): void;

  hasTransactionsResponse(): boolean;
  clearTransactionsResponse(): void;
  getTransactionsResponse(): TransactionsResponse | undefined;
  setTransactionsResponse(value?: TransactionsResponse): void;

  hasAssetResponse(): boolean;
  clearAssetResponse(): void;
  getAssetResponse(): AssetResponse | undefined;
  setAssetResponse(value?: AssetResponse): void;

  hasRolesResponse(): boolean;
  clearRolesResponse(): void;
  getRolesResponse(): RolesResponse | undefined;
  setRolesResponse(value?: RolesResponse): void;

  hasRolePermissionsResponse(): boolean;
  clearRolePermissionsResponse(): void;
  getRolePermissionsResponse(): RolePermissionsResponse | undefined;
  setRolePermissionsResponse(value?: RolePermissionsResponse): void;

  hasTransactionsPageResponse(): boolean;
  clearTransactionsPageResponse(): void;
  getTransactionsPageResponse(): TransactionsPageResponse | undefined;
  setTransactionsPageResponse(value?: TransactionsPageResponse): void;

  hasBlockResponse(): boolean;
  clearBlockResponse(): void;
  getBlockResponse(): BlockResponse | undefined;
  setBlockResponse(value?: BlockResponse): void;

  getQueryHash(): string;
  setQueryHash(value: string): void;

  getResponseCase(): QueryResponse.ResponseCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryResponse): QueryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryResponse;
  static deserializeBinaryFromReader(message: QueryResponse, reader: jspb.BinaryReader): QueryResponse;
}

export namespace QueryResponse {
  export type AsObject = {
    accountAssetsResponse?: AccountAssetResponse.AsObject,
    accountDetailResponse?: AccountDetailResponse.AsObject,
    accountResponse?: AccountResponse.AsObject,
    errorResponse?: ErrorResponse.AsObject,
    signatoriesResponse?: SignatoriesResponse.AsObject,
    transactionsResponse?: TransactionsResponse.AsObject,
    assetResponse?: AssetResponse.AsObject,
    rolesResponse?: RolesResponse.AsObject,
    rolePermissionsResponse?: RolePermissionsResponse.AsObject,
    transactionsPageResponse?: TransactionsPageResponse.AsObject,
    blockResponse?: BlockResponse.AsObject,
    queryHash: string,
  }

  export enum ResponseCase {
    RESPONSE_NOT_SET = 0,
    ACCOUNT_ASSETS_RESPONSE = 1,
    ACCOUNT_DETAIL_RESPONSE = 2,
    ACCOUNT_RESPONSE = 3,
    ERROR_RESPONSE = 4,
    SIGNATORIES_RESPONSE = 5,
    TRANSACTIONS_RESPONSE = 6,
    ASSET_RESPONSE = 7,
    ROLES_RESPONSE = 8,
    ROLE_PERMISSIONS_RESPONSE = 9,
    TRANSACTIONS_PAGE_RESPONSE = 11,
    BLOCK_RESPONSE = 12,
  }
}

export class BlockResponse extends jspb.Message {
  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): block_pb.Block | undefined;
  setBlock(value?: block_pb.Block): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BlockResponse): BlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockResponse;
  static deserializeBinaryFromReader(message: BlockResponse, reader: jspb.BinaryReader): BlockResponse;
}

export namespace BlockResponse {
  export type AsObject = {
    block?: block_pb.Block.AsObject,
  }
}

export class BlockErrorResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BlockErrorResponse): BlockErrorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockErrorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockErrorResponse;
  static deserializeBinaryFromReader(message: BlockErrorResponse, reader: jspb.BinaryReader): BlockErrorResponse;
}

export namespace BlockErrorResponse {
  export type AsObject = {
    message: string,
  }
}

export class BlockQueryResponse extends jspb.Message {
  hasBlockResponse(): boolean;
  clearBlockResponse(): void;
  getBlockResponse(): BlockResponse | undefined;
  setBlockResponse(value?: BlockResponse): void;

  hasBlockErrorResponse(): boolean;
  clearBlockErrorResponse(): void;
  getBlockErrorResponse(): BlockErrorResponse | undefined;
  setBlockErrorResponse(value?: BlockErrorResponse): void;

  getResponseCase(): BlockQueryResponse.ResponseCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockQueryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BlockQueryResponse): BlockQueryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockQueryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockQueryResponse;
  static deserializeBinaryFromReader(message: BlockQueryResponse, reader: jspb.BinaryReader): BlockQueryResponse;
}

export namespace BlockQueryResponse {
  export type AsObject = {
    blockResponse?: BlockResponse.AsObject,
    blockErrorResponse?: BlockErrorResponse.AsObject,
  }

  export enum ResponseCase {
    RESPONSE_NOT_SET = 0,
    BLOCK_RESPONSE = 1,
    BLOCK_ERROR_RESPONSE = 2,
  }
}

