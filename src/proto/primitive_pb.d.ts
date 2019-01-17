// package: iroha.protocol
// file: primitive.proto

import * as jspb from "google-protobuf";

export class Signature extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Signature.AsObject;
  static toObject(includeInstance: boolean, msg: Signature): Signature.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Signature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Signature;
  static deserializeBinaryFromReader(message: Signature, reader: jspb.BinaryReader): Signature;
}

export namespace Signature {
  export type AsObject = {
    publicKey: string,
    signature: string,
  }
}

export class Peer extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getPeerKey(): string;
  setPeerKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Peer.AsObject;
  static toObject(includeInstance: boolean, msg: Peer): Peer.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Peer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Peer;
  static deserializeBinaryFromReader(message: Peer, reader: jspb.BinaryReader): Peer;
}

export namespace Peer {
  export type AsObject = {
    address: string,
    peerKey: string,
  }
}

export enum RolePermission {
  CAN_APPEND_ROLE = 0,
  CAN_CREATE_ROLE = 1,
  CAN_DETACH_ROLE = 2,
  CAN_ADD_ASSET_QTY = 3,
  CAN_SUBTRACT_ASSET_QTY = 4,
  CAN_ADD_PEER = 5,
  CAN_ADD_SIGNATORY = 6,
  CAN_REMOVE_SIGNATORY = 7,
  CAN_SET_QUORUM = 8,
  CAN_CREATE_ACCOUNT = 9,
  CAN_SET_DETAIL = 10,
  CAN_CREATE_ASSET = 11,
  CAN_TRANSFER = 12,
  CAN_RECEIVE = 13,
  CAN_CREATE_DOMAIN = 14,
  CAN_ADD_DOMAIN_ASSET_QTY = 43,
  CAN_SUBTRACT_DOMAIN_ASSET_QTY = 44,
  CAN_READ_ASSETS = 15,
  CAN_GET_ROLES = 16,
  CAN_GET_MY_ACCOUNT = 17,
  CAN_GET_ALL_ACCOUNTS = 18,
  CAN_GET_DOMAIN_ACCOUNTS = 19,
  CAN_GET_MY_SIGNATORIES = 20,
  CAN_GET_ALL_SIGNATORIES = 21,
  CAN_GET_DOMAIN_SIGNATORIES = 22,
  CAN_GET_MY_ACC_AST = 23,
  CAN_GET_ALL_ACC_AST = 24,
  CAN_GET_DOMAIN_ACC_AST = 25,
  CAN_GET_MY_ACC_DETAIL = 26,
  CAN_GET_ALL_ACC_DETAIL = 27,
  CAN_GET_DOMAIN_ACC_DETAIL = 28,
  CAN_GET_MY_ACC_TXS = 29,
  CAN_GET_ALL_ACC_TXS = 30,
  CAN_GET_DOMAIN_ACC_TXS = 31,
  CAN_GET_MY_ACC_AST_TXS = 32,
  CAN_GET_ALL_ACC_AST_TXS = 33,
  CAN_GET_DOMAIN_ACC_AST_TXS = 34,
  CAN_GET_MY_TXS = 35,
  CAN_GET_ALL_TXS = 36,
  CAN_GET_BLOCKS = 42,
  CAN_GRANT_CAN_SET_MY_QUORUM = 37,
  CAN_GRANT_CAN_ADD_MY_SIGNATORY = 38,
  CAN_GRANT_CAN_REMOVE_MY_SIGNATORY = 39,
  CAN_GRANT_CAN_TRANSFER_MY_ASSETS = 40,
  CAN_GRANT_CAN_SET_MY_ACCOUNT_DETAIL = 41,
}

export enum GrantablePermission {
  CAN_ADD_MY_SIGNATORY = 0,
  CAN_REMOVE_MY_SIGNATORY = 1,
  CAN_SET_MY_QUORUM = 2,
  CAN_SET_MY_ACCOUNT_DETAIL = 3,
  CAN_TRANSFER_MY_ASSETS = 4,
}

