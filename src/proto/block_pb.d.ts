// package: iroha.protocol
// file: block.proto

import * as jspb from "google-protobuf";
import * as primitive_pb from "./primitive_pb";
import * as transaction_pb from "./transaction_pb";

export class Block_v1 extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): Block_v1.Payload | undefined;
  setPayload(value?: Block_v1.Payload): void;

  clearSignaturesList(): void;
  getSignaturesList(): Array<primitive_pb.Signature>;
  setSignaturesList(value: Array<primitive_pb.Signature>): void;
  addSignatures(value?: primitive_pb.Signature, index?: number): primitive_pb.Signature;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block_v1.AsObject;
  static toObject(includeInstance: boolean, msg: Block_v1): Block_v1.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Block_v1, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block_v1;
  static deserializeBinaryFromReader(message: Block_v1, reader: jspb.BinaryReader): Block_v1;
}

export namespace Block_v1 {
  export type AsObject = {
    payload?: Block_v1.Payload.AsObject,
    signaturesList: Array<primitive_pb.Signature.AsObject>,
  }

  export class Payload extends jspb.Message {
    clearTransactionsList(): void;
    getTransactionsList(): Array<transaction_pb.Transaction>;
    setTransactionsList(value: Array<transaction_pb.Transaction>): void;
    addTransactions(value?: transaction_pb.Transaction, index?: number): transaction_pb.Transaction;

    getTxNumber(): number;
    setTxNumber(value: number): void;

    getHeight(): number;
    setHeight(value: number): void;

    getPrevBlockHash(): string;
    setPrevBlockHash(value: string): void;

    getCreatedTime(): number;
    setCreatedTime(value: number): void;

    clearRejectedTransactionsHashesList(): void;
    getRejectedTransactionsHashesList(): Array<string>;
    setRejectedTransactionsHashesList(value: Array<string>): void;
    addRejectedTransactionsHashes(value: string, index?: number): string;

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
      transactionsList: Array<transaction_pb.Transaction.AsObject>,
      txNumber: number,
      height: number,
      prevBlockHash: string,
      createdTime: number,
      rejectedTransactionsHashesList: Array<string>,
    }
  }
}

export class Block extends jspb.Message {
  hasBlockV1(): boolean;
  clearBlockV1(): void;
  getBlockV1(): Block_v1 | undefined;
  setBlockV1(value?: Block_v1): void;

  getBlockVersionCase(): Block.BlockVersionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    blockV1?: Block_v1.AsObject,
  }

  export enum BlockVersionCase {
    BLOCK_VERSION_NOT_SET = 0,
    BLOCK_V1 = 1,
  }
}

