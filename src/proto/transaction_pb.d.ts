// package: iroha.protocol
// file: transaction.proto

import * as jspb from "google-protobuf";
import * as commands_pb from "./commands_pb";
import * as primitive_pb from "./primitive_pb";

export class Transaction extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): Transaction.Payload | undefined;
  setPayload(value?: Transaction.Payload): void;

  clearSignaturesList(): void;
  getSignaturesList(): Array<primitive_pb.Signature>;
  setSignaturesList(value: Array<primitive_pb.Signature>): void;
  addSignatures(value?: primitive_pb.Signature, index?: number): primitive_pb.Signature;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    payload?: Transaction.Payload.AsObject,
    signaturesList: Array<primitive_pb.Signature.AsObject>,
  }

  export class Payload extends jspb.Message {
    hasReducedPayload(): boolean;
    clearReducedPayload(): void;
    getReducedPayload(): Transaction.Payload.ReducedPayload | undefined;
    setReducedPayload(value?: Transaction.Payload.ReducedPayload): void;

    hasBatch(): boolean;
    clearBatch(): void;
    getBatch(): Transaction.Payload.BatchMeta | undefined;
    setBatch(value?: Transaction.Payload.BatchMeta): void;

    getOptionalBatchMetaCase(): Payload.OptionalBatchMetaCase;
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
      reducedPayload?: Transaction.Payload.ReducedPayload.AsObject,
      batch?: Transaction.Payload.BatchMeta.AsObject,
    }

    export class BatchMeta extends jspb.Message {
      getType(): Transaction.Payload.BatchMeta.BatchType;
      setType(value: Transaction.Payload.BatchMeta.BatchType): void;

      clearReducedHashesList(): void;
      getReducedHashesList(): Array<string>;
      setReducedHashesList(value: Array<string>): void;
      addReducedHashes(value: string, index?: number): string;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): BatchMeta.AsObject;
      static toObject(includeInstance: boolean, msg: BatchMeta): BatchMeta.AsObject;
      static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
      static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
      static serializeBinaryToWriter(message: BatchMeta, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): BatchMeta;
      static deserializeBinaryFromReader(message: BatchMeta, reader: jspb.BinaryReader): BatchMeta;
    }

    export namespace BatchMeta {
      export type AsObject = {
        type: Transaction.Payload.BatchMeta.BatchType,
        reducedHashesList: Array<string>,
      }

      export enum BatchType {
        ATOMIC = 0,
        ORDERED = 1,
      }
    }

    export class ReducedPayload extends jspb.Message {
      clearCommandsList(): void;
      getCommandsList(): Array<commands_pb.Command>;
      setCommandsList(value: Array<commands_pb.Command>): void;
      addCommands(value?: commands_pb.Command, index?: number): commands_pb.Command;

      getCreatorAccountId(): string;
      setCreatorAccountId(value: string): void;

      getCreatedTime(): number;
      setCreatedTime(value: number): void;

      getQuorum(): number;
      setQuorum(value: number): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): ReducedPayload.AsObject;
      static toObject(includeInstance: boolean, msg: ReducedPayload): ReducedPayload.AsObject;
      static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
      static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
      static serializeBinaryToWriter(message: ReducedPayload, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): ReducedPayload;
      static deserializeBinaryFromReader(message: ReducedPayload, reader: jspb.BinaryReader): ReducedPayload;
    }

    export namespace ReducedPayload {
      export type AsObject = {
        commandsList: Array<commands_pb.Command.AsObject>,
        creatorAccountId: string,
        createdTime: number,
        quorum: number,
      }
    }

    export enum OptionalBatchMetaCase {
      OPTIONAL_BATCH_META_NOT_SET = 0,
      BATCH = 5,
    }
  }
}

