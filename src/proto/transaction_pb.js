// source: transaction.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

var commands_pb = require('./commands_pb.js');
goog.object.extend(proto, commands_pb);
var primitive_pb = require('./primitive_pb.js');
goog.object.extend(proto, primitive_pb);
goog.exportSymbol('proto.iroha.protocol.Transaction', null, global);
goog.exportSymbol('proto.iroha.protocol.Transaction.Payload', null, global);
goog.exportSymbol('proto.iroha.protocol.Transaction.Payload.BatchMeta', null, global);
goog.exportSymbol('proto.iroha.protocol.Transaction.Payload.BatchMeta.BatchType', null, global);
goog.exportSymbol('proto.iroha.protocol.Transaction.Payload.OptionalBatchMetaCase', null, global);
goog.exportSymbol('proto.iroha.protocol.Transaction.Payload.ReducedPayload', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.iroha.protocol.Transaction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.iroha.protocol.Transaction.repeatedFields_, null);
};
goog.inherits(proto.iroha.protocol.Transaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.iroha.protocol.Transaction.displayName = 'proto.iroha.protocol.Transaction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.iroha.protocol.Transaction.Payload = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.iroha.protocol.Transaction.Payload.oneofGroups_);
};
goog.inherits(proto.iroha.protocol.Transaction.Payload, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.iroha.protocol.Transaction.Payload.displayName = 'proto.iroha.protocol.Transaction.Payload';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.iroha.protocol.Transaction.Payload.BatchMeta.repeatedFields_, null);
};
goog.inherits(proto.iroha.protocol.Transaction.Payload.BatchMeta, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.iroha.protocol.Transaction.Payload.BatchMeta.displayName = 'proto.iroha.protocol.Transaction.Payload.BatchMeta';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.iroha.protocol.Transaction.Payload.ReducedPayload.repeatedFields_, null);
};
goog.inherits(proto.iroha.protocol.Transaction.Payload.ReducedPayload, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.iroha.protocol.Transaction.Payload.ReducedPayload.displayName = 'proto.iroha.protocol.Transaction.Payload.ReducedPayload';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.iroha.protocol.Transaction.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.iroha.protocol.Transaction.prototype.toObject = function(opt_includeInstance) {
  return proto.iroha.protocol.Transaction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.iroha.protocol.Transaction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.iroha.protocol.Transaction.toObject = function(includeInstance, msg) {
  var f, obj = {
    payload: (f = msg.getPayload()) && proto.iroha.protocol.Transaction.Payload.toObject(includeInstance, f),
    signaturesList: jspb.Message.toObjectList(msg.getSignaturesList(),
    primitive_pb.Signature.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.iroha.protocol.Transaction}
 */
proto.iroha.protocol.Transaction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.iroha.protocol.Transaction;
  return proto.iroha.protocol.Transaction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.iroha.protocol.Transaction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.iroha.protocol.Transaction}
 */
proto.iroha.protocol.Transaction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.iroha.protocol.Transaction.Payload;
      reader.readMessage(value,proto.iroha.protocol.Transaction.Payload.deserializeBinaryFromReader);
      msg.setPayload(value);
      break;
    case 2:
      var value = new primitive_pb.Signature;
      reader.readMessage(value,primitive_pb.Signature.deserializeBinaryFromReader);
      msg.addSignatures(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.iroha.protocol.Transaction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.iroha.protocol.Transaction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.iroha.protocol.Transaction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.iroha.protocol.Transaction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPayload();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.iroha.protocol.Transaction.Payload.serializeBinaryToWriter
    );
  }
  f = message.getSignaturesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      primitive_pb.Signature.serializeBinaryToWriter
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.iroha.protocol.Transaction.Payload.oneofGroups_ = [[5]];

/**
 * @enum {number}
 */
proto.iroha.protocol.Transaction.Payload.OptionalBatchMetaCase = {
  OPTIONAL_BATCH_META_NOT_SET: 0,
  BATCH: 5
};

/**
 * @return {proto.iroha.protocol.Transaction.Payload.OptionalBatchMetaCase}
 */
proto.iroha.protocol.Transaction.Payload.prototype.getOptionalBatchMetaCase = function() {
  return /** @type {proto.iroha.protocol.Transaction.Payload.OptionalBatchMetaCase} */(jspb.Message.computeOneofCase(this, proto.iroha.protocol.Transaction.Payload.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.iroha.protocol.Transaction.Payload.prototype.toObject = function(opt_includeInstance) {
  return proto.iroha.protocol.Transaction.Payload.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.iroha.protocol.Transaction.Payload} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.iroha.protocol.Transaction.Payload.toObject = function(includeInstance, msg) {
  var f, obj = {
    reducedPayload: (f = msg.getReducedPayload()) && proto.iroha.protocol.Transaction.Payload.ReducedPayload.toObject(includeInstance, f),
    batch: (f = msg.getBatch()) && proto.iroha.protocol.Transaction.Payload.BatchMeta.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.iroha.protocol.Transaction.Payload}
 */
proto.iroha.protocol.Transaction.Payload.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.iroha.protocol.Transaction.Payload;
  return proto.iroha.protocol.Transaction.Payload.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.iroha.protocol.Transaction.Payload} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.iroha.protocol.Transaction.Payload}
 */
proto.iroha.protocol.Transaction.Payload.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.iroha.protocol.Transaction.Payload.ReducedPayload;
      reader.readMessage(value,proto.iroha.protocol.Transaction.Payload.ReducedPayload.deserializeBinaryFromReader);
      msg.setReducedPayload(value);
      break;
    case 5:
      var value = new proto.iroha.protocol.Transaction.Payload.BatchMeta;
      reader.readMessage(value,proto.iroha.protocol.Transaction.Payload.BatchMeta.deserializeBinaryFromReader);
      msg.setBatch(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.iroha.protocol.Transaction.Payload.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.iroha.protocol.Transaction.Payload.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.iroha.protocol.Transaction.Payload} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.iroha.protocol.Transaction.Payload.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReducedPayload();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.iroha.protocol.Transaction.Payload.ReducedPayload.serializeBinaryToWriter
    );
  }
  f = message.getBatch();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.iroha.protocol.Transaction.Payload.BatchMeta.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.prototype.toObject = function(opt_includeInstance) {
  return proto.iroha.protocol.Transaction.Payload.BatchMeta.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.iroha.protocol.Transaction.Payload.BatchMeta} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    reducedHashesList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.iroha.protocol.Transaction.Payload.BatchMeta}
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.iroha.protocol.Transaction.Payload.BatchMeta;
  return proto.iroha.protocol.Transaction.Payload.BatchMeta.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.iroha.protocol.Transaction.Payload.BatchMeta} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.iroha.protocol.Transaction.Payload.BatchMeta}
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.iroha.protocol.Transaction.Payload.BatchMeta.BatchType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addReducedHashes(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.iroha.protocol.Transaction.Payload.BatchMeta.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.iroha.protocol.Transaction.Payload.BatchMeta} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getReducedHashesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.BatchType = {
  ATOMIC: 0,
  ORDERED: 1
};

/**
 * optional BatchType type = 1;
 * @return {!proto.iroha.protocol.Transaction.Payload.BatchMeta.BatchType}
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.prototype.getType = function() {
  return /** @type {!proto.iroha.protocol.Transaction.Payload.BatchMeta.BatchType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.iroha.protocol.Transaction.Payload.BatchMeta.BatchType} value
 * @return {!proto.iroha.protocol.Transaction.Payload.BatchMeta} returns this
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * repeated string reduced_hashes = 2;
 * @return {!Array<string>}
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.prototype.getReducedHashesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.iroha.protocol.Transaction.Payload.BatchMeta} returns this
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.prototype.setReducedHashesList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.iroha.protocol.Transaction.Payload.BatchMeta} returns this
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.prototype.addReducedHashes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.iroha.protocol.Transaction.Payload.BatchMeta} returns this
 */
proto.iroha.protocol.Transaction.Payload.BatchMeta.prototype.clearReducedHashesList = function() {
  return this.setReducedHashesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.toObject = function(opt_includeInstance) {
  return proto.iroha.protocol.Transaction.Payload.ReducedPayload.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.iroha.protocol.Transaction.Payload.ReducedPayload} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.toObject = function(includeInstance, msg) {
  var f, obj = {
    commandsList: jspb.Message.toObjectList(msg.getCommandsList(),
    commands_pb.Command.toObject, includeInstance),
    creatorAccountId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    createdTime: jspb.Message.getFieldWithDefault(msg, 3, 0),
    quorum: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.iroha.protocol.Transaction.Payload.ReducedPayload}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.iroha.protocol.Transaction.Payload.ReducedPayload;
  return proto.iroha.protocol.Transaction.Payload.ReducedPayload.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.iroha.protocol.Transaction.Payload.ReducedPayload} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.iroha.protocol.Transaction.Payload.ReducedPayload}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new commands_pb.Command;
      reader.readMessage(value,commands_pb.Command.deserializeBinaryFromReader);
      msg.addCommands(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreatorAccountId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCreatedTime(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setQuorum(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.iroha.protocol.Transaction.Payload.ReducedPayload.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.iroha.protocol.Transaction.Payload.ReducedPayload} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommandsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      commands_pb.Command.serializeBinaryToWriter
    );
  }
  f = message.getCreatorAccountId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCreatedTime();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getQuorum();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
};


/**
 * repeated Command commands = 1;
 * @return {!Array<!proto.iroha.protocol.Command>}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.getCommandsList = function() {
  return /** @type{!Array<!proto.iroha.protocol.Command>} */ (
    jspb.Message.getRepeatedWrapperField(this, commands_pb.Command, 1));
};


/**
 * @param {!Array<!proto.iroha.protocol.Command>} value
 * @return {!proto.iroha.protocol.Transaction.Payload.ReducedPayload} returns this
*/
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.setCommandsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.iroha.protocol.Command=} opt_value
 * @param {number=} opt_index
 * @return {!proto.iroha.protocol.Command}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.addCommands = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.iroha.protocol.Command, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.iroha.protocol.Transaction.Payload.ReducedPayload} returns this
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.clearCommandsList = function() {
  return this.setCommandsList([]);
};


/**
 * optional string creator_account_id = 2;
 * @return {string}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.getCreatorAccountId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.iroha.protocol.Transaction.Payload.ReducedPayload} returns this
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.setCreatorAccountId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint64 created_time = 3;
 * @return {number}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.getCreatedTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.iroha.protocol.Transaction.Payload.ReducedPayload} returns this
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.setCreatedTime = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional uint32 quorum = 4;
 * @return {number}
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.getQuorum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.iroha.protocol.Transaction.Payload.ReducedPayload} returns this
 */
proto.iroha.protocol.Transaction.Payload.ReducedPayload.prototype.setQuorum = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional ReducedPayload reduced_payload = 1;
 * @return {?proto.iroha.protocol.Transaction.Payload.ReducedPayload}
 */
proto.iroha.protocol.Transaction.Payload.prototype.getReducedPayload = function() {
  return /** @type{?proto.iroha.protocol.Transaction.Payload.ReducedPayload} */ (
    jspb.Message.getWrapperField(this, proto.iroha.protocol.Transaction.Payload.ReducedPayload, 1));
};


/**
 * @param {?proto.iroha.protocol.Transaction.Payload.ReducedPayload|undefined} value
 * @return {!proto.iroha.protocol.Transaction.Payload} returns this
*/
proto.iroha.protocol.Transaction.Payload.prototype.setReducedPayload = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.iroha.protocol.Transaction.Payload} returns this
 */
proto.iroha.protocol.Transaction.Payload.prototype.clearReducedPayload = function() {
  return this.setReducedPayload(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.iroha.protocol.Transaction.Payload.prototype.hasReducedPayload = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional BatchMeta batch = 5;
 * @return {?proto.iroha.protocol.Transaction.Payload.BatchMeta}
 */
proto.iroha.protocol.Transaction.Payload.prototype.getBatch = function() {
  return /** @type{?proto.iroha.protocol.Transaction.Payload.BatchMeta} */ (
    jspb.Message.getWrapperField(this, proto.iroha.protocol.Transaction.Payload.BatchMeta, 5));
};


/**
 * @param {?proto.iroha.protocol.Transaction.Payload.BatchMeta|undefined} value
 * @return {!proto.iroha.protocol.Transaction.Payload} returns this
*/
proto.iroha.protocol.Transaction.Payload.prototype.setBatch = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.iroha.protocol.Transaction.Payload.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.iroha.protocol.Transaction.Payload} returns this
 */
proto.iroha.protocol.Transaction.Payload.prototype.clearBatch = function() {
  return this.setBatch(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.iroha.protocol.Transaction.Payload.prototype.hasBatch = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Payload payload = 1;
 * @return {?proto.iroha.protocol.Transaction.Payload}
 */
proto.iroha.protocol.Transaction.prototype.getPayload = function() {
  return /** @type{?proto.iroha.protocol.Transaction.Payload} */ (
    jspb.Message.getWrapperField(this, proto.iroha.protocol.Transaction.Payload, 1));
};


/**
 * @param {?proto.iroha.protocol.Transaction.Payload|undefined} value
 * @return {!proto.iroha.protocol.Transaction} returns this
*/
proto.iroha.protocol.Transaction.prototype.setPayload = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.iroha.protocol.Transaction} returns this
 */
proto.iroha.protocol.Transaction.prototype.clearPayload = function() {
  return this.setPayload(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.iroha.protocol.Transaction.prototype.hasPayload = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated Signature signatures = 2;
 * @return {!Array<!proto.iroha.protocol.Signature>}
 */
proto.iroha.protocol.Transaction.prototype.getSignaturesList = function() {
  return /** @type{!Array<!proto.iroha.protocol.Signature>} */ (
    jspb.Message.getRepeatedWrapperField(this, primitive_pb.Signature, 2));
};


/**
 * @param {!Array<!proto.iroha.protocol.Signature>} value
 * @return {!proto.iroha.protocol.Transaction} returns this
*/
proto.iroha.protocol.Transaction.prototype.setSignaturesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.iroha.protocol.Signature=} opt_value
 * @param {number=} opt_index
 * @return {!proto.iroha.protocol.Signature}
 */
proto.iroha.protocol.Transaction.prototype.addSignatures = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.iroha.protocol.Signature, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.iroha.protocol.Transaction} returns this
 */
proto.iroha.protocol.Transaction.prototype.clearSignaturesList = function() {
  return this.setSignaturesList([]);
};


goog.object.extend(exports, proto.iroha.protocol);
