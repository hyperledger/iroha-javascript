// package: iroha.protocol
// file: endpoint.proto

import * as endpoint_pb from "./endpoint_pb";
import * as transaction_pb from "./transaction_pb";
import * as queries_pb from "./queries_pb";
import * as qry_responses_pb from "./qry_responses_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CommandService_v1Torii = {
  readonly methodName: string;
  readonly service: typeof CommandService_v1;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_pb.Transaction;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type CommandService_v1ListTorii = {
  readonly methodName: string;
  readonly service: typeof CommandService_v1;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof endpoint_pb.TxList;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type CommandService_v1Status = {
  readonly methodName: string;
  readonly service: typeof CommandService_v1;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof endpoint_pb.TxStatusRequest;
  readonly responseType: typeof endpoint_pb.ToriiResponse;
};

type CommandService_v1StatusStream = {
  readonly methodName: string;
  readonly service: typeof CommandService_v1;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof endpoint_pb.TxStatusRequest;
  readonly responseType: typeof endpoint_pb.ToriiResponse;
};

export class CommandService_v1 {
  static readonly serviceName: string;
  static readonly Torii: CommandService_v1Torii;
  static readonly ListTorii: CommandService_v1ListTorii;
  static readonly Status: CommandService_v1Status;
  static readonly StatusStream: CommandService_v1StatusStream;
}

type QueryService_v1Find = {
  readonly methodName: string;
  readonly service: typeof QueryService_v1;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof queries_pb.Query;
  readonly responseType: typeof qry_responses_pb.QueryResponse;
};

type QueryService_v1FetchCommits = {
  readonly methodName: string;
  readonly service: typeof QueryService_v1;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof queries_pb.BlocksQuery;
  readonly responseType: typeof qry_responses_pb.BlockQueryResponse;
};

export class QueryService_v1 {
  static readonly serviceName: string;
  static readonly Find: QueryService_v1Find;
  static readonly FetchCommits: QueryService_v1FetchCommits;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class CommandService_v1Client {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  torii(
    requestMessage: transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  torii(
    requestMessage: transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  listTorii(
    requestMessage: endpoint_pb.TxList,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  listTorii(
    requestMessage: endpoint_pb.TxList,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  status(
    requestMessage: endpoint_pb.TxStatusRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: endpoint_pb.ToriiResponse|null) => void
  ): UnaryResponse;
  status(
    requestMessage: endpoint_pb.TxStatusRequest,
    callback: (error: ServiceError|null, responseMessage: endpoint_pb.ToriiResponse|null) => void
  ): UnaryResponse;
  statusStream(requestMessage: endpoint_pb.TxStatusRequest, metadata?: grpc.Metadata): ResponseStream<endpoint_pb.ToriiResponse>;
}

export class QueryService_v1Client {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  find(
    requestMessage: queries_pb.Query,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: qry_responses_pb.QueryResponse|null) => void
  ): UnaryResponse;
  find(
    requestMessage: queries_pb.Query,
    callback: (error: ServiceError|null, responseMessage: qry_responses_pb.QueryResponse|null) => void
  ): UnaryResponse;
  fetchCommits(requestMessage: queries_pb.BlocksQuery, metadata?: grpc.Metadata): ResponseStream<qry_responses_pb.BlockQueryResponse>;
}

