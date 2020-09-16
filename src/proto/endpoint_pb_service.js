// package: iroha.protocol
// file: endpoint.proto

var endpoint_pb = require("./endpoint_pb");
var transaction_pb = require("./transaction_pb");
var queries_pb = require("./queries_pb");
var qry_responses_pb = require("./qry_responses_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CommandService_v1 = (function () {
  function CommandService_v1() {}
  CommandService_v1.serviceName = "iroha.protocol.CommandService_v1";
  return CommandService_v1;
}());

CommandService_v1.Torii = {
  methodName: "Torii",
  service: CommandService_v1,
  requestStream: false,
  responseStream: false,
  requestType: transaction_pb.Transaction,
  responseType: google_protobuf_empty_pb.Empty
};

CommandService_v1.ListTorii = {
  methodName: "ListTorii",
  service: CommandService_v1,
  requestStream: false,
  responseStream: false,
  requestType: endpoint_pb.TxList,
  responseType: google_protobuf_empty_pb.Empty
};

CommandService_v1.Status = {
  methodName: "Status",
  service: CommandService_v1,
  requestStream: false,
  responseStream: false,
  requestType: endpoint_pb.TxStatusRequest,
  responseType: endpoint_pb.ToriiResponse
};

CommandService_v1.StatusStream = {
  methodName: "StatusStream",
  service: CommandService_v1,
  requestStream: false,
  responseStream: true,
  requestType: endpoint_pb.TxStatusRequest,
  responseType: endpoint_pb.ToriiResponse
};

exports.CommandService_v1 = CommandService_v1;

function CommandService_v1Client(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CommandService_v1Client.prototype.torii = function torii(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CommandService_v1.Torii, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CommandService_v1Client.prototype.listTorii = function listTorii(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CommandService_v1.ListTorii, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CommandService_v1Client.prototype.status = function status(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CommandService_v1.Status, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CommandService_v1Client.prototype.statusStream = function statusStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CommandService_v1.StatusStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.CommandService_v1Client = CommandService_v1Client;

var QueryService_v1 = (function () {
  function QueryService_v1() {}
  QueryService_v1.serviceName = "iroha.protocol.QueryService_v1";
  return QueryService_v1;
}());

QueryService_v1.Find = {
  methodName: "Find",
  service: QueryService_v1,
  requestStream: false,
  responseStream: false,
  requestType: queries_pb.Query,
  responseType: qry_responses_pb.QueryResponse
};

QueryService_v1.FetchCommits = {
  methodName: "FetchCommits",
  service: QueryService_v1,
  requestStream: false,
  responseStream: true,
  requestType: queries_pb.BlocksQuery,
  responseType: qry_responses_pb.BlockQueryResponse
};

exports.QueryService_v1 = QueryService_v1;

function QueryService_v1Client(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

QueryService_v1Client.prototype.find = function find(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QueryService_v1.Find, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

QueryService_v1Client.prototype.fetchCommits = function fetchCommits(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(QueryService_v1.FetchCommits, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.QueryService_v1Client = QueryService_v1Client;

