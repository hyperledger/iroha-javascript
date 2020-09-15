// GENERATED CODE -- DO NOT EDIT!

// package: iroha.protocol
// file: endpoint.proto

import * as endpoint_pb from "./endpoint_pb";
import * as transaction_pb from "./transaction_pb";
import * as queries_pb from "./queries_pb";
import * as qry_responses_pb from "./qry_responses_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc";

interface ICommandService_v1Service extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  torii: grpc.MethodDefinition<transaction_pb.Transaction, google_protobuf_empty_pb.Empty>;
  listTorii: grpc.MethodDefinition<endpoint_pb.TxList, google_protobuf_empty_pb.Empty>;
  status: grpc.MethodDefinition<endpoint_pb.TxStatusRequest, endpoint_pb.ToriiResponse>;
  statusStream: grpc.MethodDefinition<endpoint_pb.TxStatusRequest, endpoint_pb.ToriiResponse>;
}

export const CommandService_v1Service: ICommandService_v1Service;

export class CommandService_v1Client extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  torii(argument: transaction_pb.Transaction, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  torii(argument: transaction_pb.Transaction, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  torii(argument: transaction_pb.Transaction, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  listTorii(argument: endpoint_pb.TxList, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  listTorii(argument: endpoint_pb.TxList, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  listTorii(argument: endpoint_pb.TxList, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  status(argument: endpoint_pb.TxStatusRequest, callback: grpc.requestCallback<endpoint_pb.ToriiResponse>): grpc.ClientUnaryCall;
  status(argument: endpoint_pb.TxStatusRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<endpoint_pb.ToriiResponse>): grpc.ClientUnaryCall;
  status(argument: endpoint_pb.TxStatusRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<endpoint_pb.ToriiResponse>): grpc.ClientUnaryCall;
  statusStream(argument: endpoint_pb.TxStatusRequest, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<endpoint_pb.ToriiResponse>;
  statusStream(argument: endpoint_pb.TxStatusRequest, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<endpoint_pb.ToriiResponse>;
}

interface IQueryService_v1Service extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  find: grpc.MethodDefinition<queries_pb.Query, qry_responses_pb.QueryResponse>;
  fetchCommits: grpc.MethodDefinition<queries_pb.BlocksQuery, qry_responses_pb.BlockQueryResponse>;
}

export const QueryService_v1Service: IQueryService_v1Service;

export class QueryService_v1Client extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  find(argument: queries_pb.Query, callback: grpc.requestCallback<qry_responses_pb.QueryResponse>): grpc.ClientUnaryCall;
  find(argument: queries_pb.Query, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<qry_responses_pb.QueryResponse>): grpc.ClientUnaryCall;
  find(argument: queries_pb.Query, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<qry_responses_pb.QueryResponse>): grpc.ClientUnaryCall;
  fetchCommits(argument: queries_pb.BlocksQuery, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<qry_responses_pb.BlockQueryResponse>;
  fetchCommits(argument: queries_pb.BlocksQuery, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<qry_responses_pb.BlockQueryResponse>;
}
