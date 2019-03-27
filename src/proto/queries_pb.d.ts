// package: iroha.protocol
// file: queries.proto

import * as jspb from "google-protobuf";
import * as primitive_pb from "./primitive_pb";

export class TxPaginationMeta extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): void;

  hasFirstTxHash(): boolean;
  clearFirstTxHash(): void;
  getFirstTxHash(): string;
  setFirstTxHash(value: string): void;

  getOptFirstTxHashCase(): TxPaginationMeta.OptFirstTxHashCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxPaginationMeta.AsObject;
  static toObject(includeInstance: boolean, msg: TxPaginationMeta): TxPaginationMeta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxPaginationMeta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxPaginationMeta;
  static deserializeBinaryFromReader(message: TxPaginationMeta, reader: jspb.BinaryReader): TxPaginationMeta;
}

export namespace TxPaginationMeta {
  export type AsObject = {
    pageSize: number,
    firstTxHash: string,
  }

  export enum OptFirstTxHashCase {
    OPT_FIRST_TX_HASH_NOT_SET = 0,
    FIRST_TX_HASH = 2,
  }
}

export class GetAccount extends jspb.Message {
  getAccountId(): string;
  setAccountId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccount.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccount): GetAccount.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccount, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccount;
  static deserializeBinaryFromReader(message: GetAccount, reader: jspb.BinaryReader): GetAccount;
}

export namespace GetAccount {
  export type AsObject = {
    accountId: string,
  }
}

export class GetBlock extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlock.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlock): GetBlock.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBlock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlock;
  static deserializeBinaryFromReader(message: GetBlock, reader: jspb.BinaryReader): GetBlock;
}

export namespace GetBlock {
  export type AsObject = {
    height: number,
  }
}

export class GetSignatories extends jspb.Message {
  getAccountId(): string;
  setAccountId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSignatories.AsObject;
  static toObject(includeInstance: boolean, msg: GetSignatories): GetSignatories.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSignatories, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSignatories;
  static deserializeBinaryFromReader(message: GetSignatories, reader: jspb.BinaryReader): GetSignatories;
}

export namespace GetSignatories {
  export type AsObject = {
    accountId: string,
  }
}

export class GetAccountTransactions extends jspb.Message {
  getAccountId(): string;
  setAccountId(value: string): void;

  hasPaginationMeta(): boolean;
  clearPaginationMeta(): void;
  getPaginationMeta(): TxPaginationMeta | undefined;
  setPaginationMeta(value?: TxPaginationMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountTransactions.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountTransactions): GetAccountTransactions.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountTransactions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountTransactions;
  static deserializeBinaryFromReader(message: GetAccountTransactions, reader: jspb.BinaryReader): GetAccountTransactions;
}

export namespace GetAccountTransactions {
  export type AsObject = {
    accountId: string,
    paginationMeta?: TxPaginationMeta.AsObject,
  }
}

export class GetAccountAssetTransactions extends jspb.Message {
  getAccountId(): string;
  setAccountId(value: string): void;

  getAssetId(): string;
  setAssetId(value: string): void;

  hasPaginationMeta(): boolean;
  clearPaginationMeta(): void;
  getPaginationMeta(): TxPaginationMeta | undefined;
  setPaginationMeta(value?: TxPaginationMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountAssetTransactions.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountAssetTransactions): GetAccountAssetTransactions.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountAssetTransactions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountAssetTransactions;
  static deserializeBinaryFromReader(message: GetAccountAssetTransactions, reader: jspb.BinaryReader): GetAccountAssetTransactions;
}

export namespace GetAccountAssetTransactions {
  export type AsObject = {
    accountId: string,
    assetId: string,
    paginationMeta?: TxPaginationMeta.AsObject,
  }
}

export class GetTransactions extends jspb.Message {
  clearTxHashesList(): void;
  getTxHashesList(): Array<string>;
  setTxHashesList(value: Array<string>): void;
  addTxHashes(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactions.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactions): GetTransactions.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactions;
  static deserializeBinaryFromReader(message: GetTransactions, reader: jspb.BinaryReader): GetTransactions;
}

export namespace GetTransactions {
  export type AsObject = {
    txHashesList: Array<string>,
  }
}

export class GetAccountAssets extends jspb.Message {
  getAccountId(): string;
  setAccountId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountAssets.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountAssets): GetAccountAssets.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountAssets, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountAssets;
  static deserializeBinaryFromReader(message: GetAccountAssets, reader: jspb.BinaryReader): GetAccountAssets;
}

export namespace GetAccountAssets {
  export type AsObject = {
    accountId: string,
  }
}

export class GetAccountDetail extends jspb.Message {
  hasAccountId(): boolean;
  clearAccountId(): void;
  getAccountId(): string;
  setAccountId(value: string): void;

  hasKey(): boolean;
  clearKey(): void;
  getKey(): string;
  setKey(value: string): void;

  hasWriter(): boolean;
  clearWriter(): void;
  getWriter(): string;
  setWriter(value: string): void;

  getOptAccountIdCase(): GetAccountDetail.OptAccountIdCase;
  getOptKeyCase(): GetAccountDetail.OptKeyCase;
  getOptWriterCase(): GetAccountDetail.OptWriterCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountDetail.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountDetail): GetAccountDetail.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountDetail, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountDetail;
  static deserializeBinaryFromReader(message: GetAccountDetail, reader: jspb.BinaryReader): GetAccountDetail;
}

export namespace GetAccountDetail {
  export type AsObject = {
    accountId: string,
    key: string,
    writer: string,
  }

  export enum OptAccountIdCase {
    OPT_ACCOUNT_ID_NOT_SET = 0,
    ACCOUNT_ID = 1,
  }

  export enum OptKeyCase {
    OPT_KEY_NOT_SET = 0,
    KEY = 2,
  }

  export enum OptWriterCase {
    OPT_WRITER_NOT_SET = 0,
    WRITER = 3,
  }
}

export class GetAssetInfo extends jspb.Message {
  getAssetId(): string;
  setAssetId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAssetInfo.AsObject;
  static toObject(includeInstance: boolean, msg: GetAssetInfo): GetAssetInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAssetInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAssetInfo;
  static deserializeBinaryFromReader(message: GetAssetInfo, reader: jspb.BinaryReader): GetAssetInfo;
}

export namespace GetAssetInfo {
  export type AsObject = {
    assetId: string,
  }
}

export class GetRoles extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRoles.AsObject;
  static toObject(includeInstance: boolean, msg: GetRoles): GetRoles.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRoles, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRoles;
  static deserializeBinaryFromReader(message: GetRoles, reader: jspb.BinaryReader): GetRoles;
}

export namespace GetRoles {
  export type AsObject = {
  }
}

export class GetRolePermissions extends jspb.Message {
  getRoleId(): string;
  setRoleId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRolePermissions.AsObject;
  static toObject(includeInstance: boolean, msg: GetRolePermissions): GetRolePermissions.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRolePermissions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRolePermissions;
  static deserializeBinaryFromReader(message: GetRolePermissions, reader: jspb.BinaryReader): GetRolePermissions;
}

export namespace GetRolePermissions {
  export type AsObject = {
    roleId: string,
  }
}

export class GetPendingTransactions extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPendingTransactions.AsObject;
  static toObject(includeInstance: boolean, msg: GetPendingTransactions): GetPendingTransactions.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPendingTransactions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPendingTransactions;
  static deserializeBinaryFromReader(message: GetPendingTransactions, reader: jspb.BinaryReader): GetPendingTransactions;
}

export namespace GetPendingTransactions {
  export type AsObject = {
  }
}

export class QueryPayloadMeta extends jspb.Message {
  getCreatedTime(): number;
  setCreatedTime(value: number): void;

  getCreatorAccountId(): string;
  setCreatorAccountId(value: string): void;

  getQueryCounter(): number;
  setQueryCounter(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryPayloadMeta.AsObject;
  static toObject(includeInstance: boolean, msg: QueryPayloadMeta): QueryPayloadMeta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryPayloadMeta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryPayloadMeta;
  static deserializeBinaryFromReader(message: QueryPayloadMeta, reader: jspb.BinaryReader): QueryPayloadMeta;
}

export namespace QueryPayloadMeta {
  export type AsObject = {
    createdTime: number,
    creatorAccountId: string,
    queryCounter: number,
  }
}

export class Query extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): Query.Payload | undefined;
  setPayload(value?: Query.Payload): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): primitive_pb.Signature | undefined;
  setSignature(value?: primitive_pb.Signature): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Query.AsObject;
  static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Query;
  static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
  export type AsObject = {
    payload?: Query.Payload.AsObject,
    signature?: primitive_pb.Signature.AsObject,
  }

  export class Payload extends jspb.Message {
    hasMeta(): boolean;
    clearMeta(): void;
    getMeta(): QueryPayloadMeta | undefined;
    setMeta(value?: QueryPayloadMeta): void;

    hasGetAccount(): boolean;
    clearGetAccount(): void;
    getGetAccount(): GetAccount | undefined;
    setGetAccount(value?: GetAccount): void;

    hasGetSignatories(): boolean;
    clearGetSignatories(): void;
    getGetSignatories(): GetSignatories | undefined;
    setGetSignatories(value?: GetSignatories): void;

    hasGetAccountTransactions(): boolean;
    clearGetAccountTransactions(): void;
    getGetAccountTransactions(): GetAccountTransactions | undefined;
    setGetAccountTransactions(value?: GetAccountTransactions): void;

    hasGetAccountAssetTransactions(): boolean;
    clearGetAccountAssetTransactions(): void;
    getGetAccountAssetTransactions(): GetAccountAssetTransactions | undefined;
    setGetAccountAssetTransactions(value?: GetAccountAssetTransactions): void;

    hasGetTransactions(): boolean;
    clearGetTransactions(): void;
    getGetTransactions(): GetTransactions | undefined;
    setGetTransactions(value?: GetTransactions): void;

    hasGetAccountAssets(): boolean;
    clearGetAccountAssets(): void;
    getGetAccountAssets(): GetAccountAssets | undefined;
    setGetAccountAssets(value?: GetAccountAssets): void;

    hasGetAccountDetail(): boolean;
    clearGetAccountDetail(): void;
    getGetAccountDetail(): GetAccountDetail | undefined;
    setGetAccountDetail(value?: GetAccountDetail): void;

    hasGetRoles(): boolean;
    clearGetRoles(): void;
    getGetRoles(): GetRoles | undefined;
    setGetRoles(value?: GetRoles): void;

    hasGetRolePermissions(): boolean;
    clearGetRolePermissions(): void;
    getGetRolePermissions(): GetRolePermissions | undefined;
    setGetRolePermissions(value?: GetRolePermissions): void;

    hasGetAssetInfo(): boolean;
    clearGetAssetInfo(): void;
    getGetAssetInfo(): GetAssetInfo | undefined;
    setGetAssetInfo(value?: GetAssetInfo): void;

    hasGetPendingTransactions(): boolean;
    clearGetPendingTransactions(): void;
    getGetPendingTransactions(): GetPendingTransactions | undefined;
    setGetPendingTransactions(value?: GetPendingTransactions): void;

    hasGetBlock(): boolean;
    clearGetBlock(): void;
    getGetBlock(): GetBlock | undefined;
    setGetBlock(value?: GetBlock): void;

    getQueryCase(): Payload.QueryCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Payload.AsObject;
    static toObject(includeInstance: boolean, msg: Payload): Payload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Payload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Payload;
    static deserializeBinaryFromReader(message: Payload, reader: jspb.BinaryReader): Payload;
  }

  export namespace Payload {
    export type AsObject = {
      meta?: QueryPayloadMeta.AsObject,
      getAccount?: GetAccount.AsObject,
      getSignatories?: GetSignatories.AsObject,
      getAccountTransactions?: GetAccountTransactions.AsObject,
      getAccountAssetTransactions?: GetAccountAssetTransactions.AsObject,
      getTransactions?: GetTransactions.AsObject,
      getAccountAssets?: GetAccountAssets.AsObject,
      getAccountDetail?: GetAccountDetail.AsObject,
      getRoles?: GetRoles.AsObject,
      getRolePermissions?: GetRolePermissions.AsObject,
      getAssetInfo?: GetAssetInfo.AsObject,
      getPendingTransactions?: GetPendingTransactions.AsObject,
      getBlock?: GetBlock.AsObject,
    }

    export enum QueryCase {
      QUERY_NOT_SET = 0,
      GET_ACCOUNT = 3,
      GET_SIGNATORIES = 4,
      GET_ACCOUNT_TRANSACTIONS = 5,
      GET_ACCOUNT_ASSET_TRANSACTIONS = 6,
      GET_TRANSACTIONS = 7,
      GET_ACCOUNT_ASSETS = 8,
      GET_ACCOUNT_DETAIL = 9,
      GET_ROLES = 10,
      GET_ROLE_PERMISSIONS = 11,
      GET_ASSET_INFO = 12,
      GET_PENDING_TRANSACTIONS = 13,
      GET_BLOCK = 14,
    }
  }
}

export class BlocksQuery extends jspb.Message {
  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): QueryPayloadMeta | undefined;
  setMeta(value?: QueryPayloadMeta): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): primitive_pb.Signature | undefined;
  setSignature(value?: primitive_pb.Signature): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlocksQuery.AsObject;
  static toObject(includeInstance: boolean, msg: BlocksQuery): BlocksQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlocksQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlocksQuery;
  static deserializeBinaryFromReader(message: BlocksQuery, reader: jspb.BinaryReader): BlocksQuery;
}

export namespace BlocksQuery {
  export type AsObject = {
    meta?: QueryPayloadMeta.AsObject,
    signature?: primitive_pb.Signature.AsObject,
  }
}

