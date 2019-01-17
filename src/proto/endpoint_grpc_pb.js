// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// *
// Copyright Soramitsu Co., Ltd. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('grpc');
var endpoint_pb = require('./endpoint_pb.js');
var transaction_pb = require('./transaction_pb.js');
var queries_pb = require('./queries_pb.js');
var qry_responses_pb = require('./qry_responses_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iroha_protocol_BlockQueryResponse(arg) {
  if (!(arg instanceof qry_responses_pb.BlockQueryResponse)) {
    throw new Error('Expected argument of type iroha.protocol.BlockQueryResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_iroha_protocol_BlockQueryResponse(buffer_arg) {
  return qry_responses_pb.BlockQueryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iroha_protocol_BlocksQuery(arg) {
  if (!(arg instanceof queries_pb.BlocksQuery)) {
    throw new Error('Expected argument of type iroha.protocol.BlocksQuery');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_iroha_protocol_BlocksQuery(buffer_arg) {
  return queries_pb.BlocksQuery.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iroha_protocol_Query(arg) {
  if (!(arg instanceof queries_pb.Query)) {
    throw new Error('Expected argument of type iroha.protocol.Query');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_iroha_protocol_Query(buffer_arg) {
  return queries_pb.Query.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iroha_protocol_QueryResponse(arg) {
  if (!(arg instanceof qry_responses_pb.QueryResponse)) {
    throw new Error('Expected argument of type iroha.protocol.QueryResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_iroha_protocol_QueryResponse(buffer_arg) {
  return qry_responses_pb.QueryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iroha_protocol_ToriiResponse(arg) {
  if (!(arg instanceof endpoint_pb.ToriiResponse)) {
    throw new Error('Expected argument of type iroha.protocol.ToriiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_iroha_protocol_ToriiResponse(buffer_arg) {
  return endpoint_pb.ToriiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iroha_protocol_Transaction(arg) {
  if (!(arg instanceof transaction_pb.Transaction)) {
    throw new Error('Expected argument of type iroha.protocol.Transaction');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_iroha_protocol_Transaction(buffer_arg) {
  return transaction_pb.Transaction.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iroha_protocol_TxList(arg) {
  if (!(arg instanceof endpoint_pb.TxList)) {
    throw new Error('Expected argument of type iroha.protocol.TxList');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_iroha_protocol_TxList(buffer_arg) {
  return endpoint_pb.TxList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iroha_protocol_TxStatusRequest(arg) {
  if (!(arg instanceof endpoint_pb.TxStatusRequest)) {
    throw new Error('Expected argument of type iroha.protocol.TxStatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_iroha_protocol_TxStatusRequest(buffer_arg) {
  return endpoint_pb.TxStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var CommandService_v1Service = exports.CommandService_v1Service = {
  torii: {
    path: '/iroha.protocol.CommandService_v1/Torii',
    requestStream: false,
    responseStream: false,
    requestType: transaction_pb.Transaction,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_iroha_protocol_Transaction,
    requestDeserialize: deserialize_iroha_protocol_Transaction,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  listTorii: {
    path: '/iroha.protocol.CommandService_v1/ListTorii',
    requestStream: false,
    responseStream: false,
    requestType: endpoint_pb.TxList,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_iroha_protocol_TxList,
    requestDeserialize: deserialize_iroha_protocol_TxList,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  status: {
    path: '/iroha.protocol.CommandService_v1/Status',
    requestStream: false,
    responseStream: false,
    requestType: endpoint_pb.TxStatusRequest,
    responseType: endpoint_pb.ToriiResponse,
    requestSerialize: serialize_iroha_protocol_TxStatusRequest,
    requestDeserialize: deserialize_iroha_protocol_TxStatusRequest,
    responseSerialize: serialize_iroha_protocol_ToriiResponse,
    responseDeserialize: deserialize_iroha_protocol_ToriiResponse,
  },
  statusStream: {
    path: '/iroha.protocol.CommandService_v1/StatusStream',
    requestStream: false,
    responseStream: true,
    requestType: endpoint_pb.TxStatusRequest,
    responseType: endpoint_pb.ToriiResponse,
    requestSerialize: serialize_iroha_protocol_TxStatusRequest,
    requestDeserialize: deserialize_iroha_protocol_TxStatusRequest,
    responseSerialize: serialize_iroha_protocol_ToriiResponse,
    responseDeserialize: deserialize_iroha_protocol_ToriiResponse,
  },
};

exports.CommandService_v1Client = grpc.makeGenericClientConstructor(CommandService_v1Service);
var QueryService_v1Service = exports.QueryService_v1Service = {
  find: {
    path: '/iroha.protocol.QueryService_v1/Find',
    requestStream: false,
    responseStream: false,
    requestType: queries_pb.Query,
    responseType: qry_responses_pb.QueryResponse,
    requestSerialize: serialize_iroha_protocol_Query,
    requestDeserialize: deserialize_iroha_protocol_Query,
    responseSerialize: serialize_iroha_protocol_QueryResponse,
    responseDeserialize: deserialize_iroha_protocol_QueryResponse,
  },
  fetchCommits: {
    path: '/iroha.protocol.QueryService_v1/FetchCommits',
    requestStream: false,
    responseStream: true,
    requestType: queries_pb.BlocksQuery,
    responseType: qry_responses_pb.BlockQueryResponse,
    requestSerialize: serialize_iroha_protocol_BlocksQuery,
    requestDeserialize: deserialize_iroha_protocol_BlocksQuery,
    responseSerialize: serialize_iroha_protocol_BlockQueryResponse,
    responseDeserialize: deserialize_iroha_protocol_BlockQueryResponse,
  },
};

exports.QueryService_v1Client = grpc.makeGenericClientConstructor(QueryService_v1Service);
