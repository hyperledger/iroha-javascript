// package: iroha.protocol
// file: proposal.proto

import * as jspb from "google-protobuf";
import * as transaction_pb from "./transaction_pb";

export class Proposal extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<transaction_pb.Transaction>;
  setTransactionsList(value: Array<transaction_pb.Transaction>): void;
  addTransactions(value?: transaction_pb.Transaction, index?: number): transaction_pb.Transaction;

  getCreatedTime(): number;
  setCreatedTime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Proposal.AsObject;
  static toObject(includeInstance: boolean, msg: Proposal): Proposal.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Proposal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Proposal;
  static deserializeBinaryFromReader(message: Proposal, reader: jspb.BinaryReader): Proposal;
}

export namespace Proposal {
  export type AsObject = {
    height: number,
    transactionsList: Array<transaction_pb.Transaction.AsObject>,
    createdTime: number,
  }
}

