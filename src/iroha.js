//Copyright 2016 Soramitsu Co., Ltd.
//
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at
//
//http://www.apache.org/licenses/LICENSE-2.0
//
//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

"use strict";
var supercop = require('supercop.js');
var superagent = require('superagent');
var sha3 = require('js-sha3');

var iroha = {};

var verify = function(opt){
}

var getTimeStampNow = function(){
    var date = new Date();
    return date.getTime();
}

/**
 * opt = {
 *  publicKey: public Key,
 *  privateKey: private Key,
 *  message: message
 * }
 *
 **/
var sign = function(opt){
    if(!opt.publicKey || !opt.privateKey || !opt.message)return false;
    var publicKey = opt.publicKey;
    var privateKey = opt.privateKey;
    var sha3Message = sha3.sha3_256(opt.message);

    var sig = supercop(
            new Buffer(sha3Message),
            new Buffer(publicKey, 'base64'),
            new Buffer(privateKey, 'base64')
            ).toString('base64');

    return sig;
}


/**
 * opt = {
 *  publicKey: public Key,
 *  privateKey: private Key,
 *  message: message
 * }
 *
 **/

var createSignature = function(opt){
    if(!opt.publicKey || !opt.privateKey || !opt.message)return false;
    var publicKey = opt.publicKey;
    var privateKey = opt.privateKey;
    var message = opt.message;

    var sig = sign({
        "publicKey": publicKey,
        "privateKey": privateKey,
        "message": message
    });

    return sig;
}



iroha.createKeyPair = function(){
    var seed = supercop.createSeed();
    var keys = supercop.createKeyPair(seed);

    return {
        publicKey: keys.publicKey.toString('base64'),
        privateKey: keys.secretKey.toString('base64')
    }
}

/**
 * opt = {
 *  accessPoint: ip address,
 *  name: name,
 *  publicKey: public Key
 * }
 *
 **/

iroha.registerAccount = function(opt){
    if(!opt.accessPoint || !opt.name || !opt.publicKey)return false;
    var accessPoint = opt.accessPoint;
    var name = opt.name;
    var publicKey = opt.publicKey;

    var param = {
        "publicKey": keyPair.publicKey,
        "screen_name": name,
        "timestanp": getTimeStampNow()
    }

    postRequest(accessPoint + "/account/register", param).then(function(res){
        return res;
    }).catch(function(err){
        console.erorr(err);
    });
}


/**
 * opt = {
 *  accessPoint: ip address,
 *  uuid: uuid(sha3)
 * }
 *
 **/
iroha.getAccountInfo = function(opt){
    if(!opt.accessPoint || !opt.uuid)return false;
    var accessPoint = opt.accessPoint;
    var uuid = opt.uuid;

    getRequest(accessPoint + "/account?uuid=" + uuid).then(function(res){
        return res;
    }).catch(function(err){
        console.error(err);
    });
}


/**
 * opt = {
 *  accessPoint: ip address,
 *  domainName: domain name,
 *  ownerPublicKey: user's public key(base64),
 *  ownerPrivateKey: user's private Key(base64)
 * }
 *
 **/
iroha.registerDomain = function(opt){
    if(!opt.accessPoint || !opt.name || !opt.ownerPublicKey || !opt.ownerPrivateKey)return false;
    var accessPoint = opt.accessPoint;
    var timestamp = getTimeStampNow();
    var message = "name:" + opt.name + ",owner:" + opt.ownerPublicKey + ",timestamp:" + timestamp.toString();
    var sig = createSignature({
        "publicKey": opt.ownerPublicKey,
        "privateKey": opt.ownerPrivateKey,
        "message": message
    });

    var param = {
        "name": opt.name,
        "owner": opt.ownerPublicKey,
        "signature": sig,
        "timestamp": timestamp
    }

    postRequest(accessPoint + "/domain/register", param).then(function(res){
        return res;
    }).catch(function(err){
        console.err(err);
    });
}


/**
 *
 **/
iroha.getDomainList = function(accessPoint){
    if(!accessPoint)return false;

    getRequest(accessPoint + "/domain/list").then(function(res){
        return res;
    }).catch(function(err){
        console.err(err);
    });
}

/**
 * opt = {
 *  accessPoint: ip address,
 *  assetName: asset name,
 *  domainName: domain name,
 *  creatorPublicKey: creator's public key,
 *  creatorPrivateKey: creator's private key
 * }
 **/

iroha.createAsset = function(opt){
    if(!opt.accessPoint || !opt.assetName || !opt.domainName || !opt.creatorPublicKey || !opt.creatorPrivateKey)return false;
    var accessPoint = opt.accessPoint;
    var timestamp = getTimeStampNow();
    var message = "name:" + opt.assetName + ",creator:" + opt.creatorPublicKey + ",timestamp:" + timestamp.toString();
    var sig = createSignature({
        "publicKey": opt.creatorPublicKey,
        "privateKey": opt.creatorPrivateKey,
        "message": message
    });

    var param = {
        "name": opt.assetName,
        "domain": domainName,
        "creator": opt.creatorPublicKey,
        "signature": sig,
        "timestamp": timestamp
    }

    postRequest(accessPoint + "/asset/create", param).then(function(res){
        return res;
    }).catch(function(err){
        console.err(err);
    });

}

/**
 * opt = {
 *  assetUuid: asset uuid(sha3),
 *  command: operation command,
 *  amount: amount,
 *  senderPublicKey: sender's public key,
 *  senderPrivateKey: sender's private key,
 *  receiverPublicKey: receiver's public key
 * }
 *
 **/

iroha.operateAsset = function(opt){
    if(!opt.assetUuid || !opt.command || !opt.amount || !opt.senderPublicKey || !opt.senderPrivateKey || !opt.receiverPublicKey)return false;
    var timestamp = getTimeStampNow();
    var message = "asset-uuid:" + opt.assetUuid + ",params:" + params + ",timestamp:" + timestamp.toString();

    /*var params = {
        "command":
    }*/
}




/**
 * opt = {
 *  accessPoint: ip address,
 *  domainName: domain name
 * }
 **/

iroha.getAssetList = function(opt){
    if(!opt.accessPoint || !opt.domainName)return false;

    getRequest(opt.accessPoint + "/domain/list/" + opt.domainName).then(function(res){
        return res;
    }).catch(function(err){
        console.err(err);
    });
}

/**
 * opt = {
 *  accessPoint: ip address,
 *  uuid: user's uuid
 * }
 *
 **/

iroha.getUserTransaction = function(opt){
    if(!opt.accessPoint || !opt.uuid)return false;

    getRequest(opt.accessPoint + "/history/transaction/" + opt.uuid).then(function(res){
        return res;
    }).catch(function(err){
        console.err(err);
    });
}

/**
 * opt = {
 *  accessPoint: ip address,
 *  domainName: domain name,
 *  assetName: asset name
 * }
 *
 **/
iroha.getAssetTransaction = function(opt){
    if(!opt.accessPoint || !opt.domainName || !opt.assetName)return false;

    getRequest(opt.accessPoint + "/histor/" + opt.domainName + "." + opt.assetName).then(function(res){
        return res;
    }).catch(function(err){
        console.err(err);
    });

}

/**
 * opt = {
 *  accessPoint: ip address,
 *  creatorPublicKey: creator's public Key,
 *  creatorPrivateKey: creator's private Key,
 *  receiverKey: receiver'z public Key,
 *  message: message body
 * }
 *
 **/

iroha.postMessage = function(opt){
    if(!opt.accessPoint || !opt. creatorPublicKey || !opt.creatorPrivateKey || !opt.receiverPublicKey || !opt.message)return false;
    var timestamp = getTimeStampNow();
    var sigMessage = "message";
    var sig = createSignature({
        "publicKey": opt.creatorPublicKey,
        "privateKey": opt.creatorPrivateKey,
        "message": sigMessage
    });

    var param = {
        "message": opt.message,
        "creator": opt.creatorPublicKey,
        "receiver": opt.receiverPublicKey,
        "signature": sig,
        "timestamp": timestamp
    }

    postRequest(accessPoint + "/message", param).then(function(res){
        return res;
    }).catch(function(err){
        console.err(err);
    });

}


var getRequest = function(opt){
    return new Promise(function(resolve, reject){
        if(!opt.url)return false;

        superagent
            .get(opt.url)
            .end(function(err, res){
                if(!err){
                    resolve(res);
                    return;
                }

                reject(err);
            });
    });
}

var postRequest = function(opt){
    return new Promise(function(resolve, reject){
        if(!opt.url || !opt.param)return false;

        superagent
            .post(opt.url)
            .send(opt.param)
            .end(function(err, res){
                if(!err){
                    resolve(res);
                    return;
                }

                reject(err);
            });
    });
}


module.exports = iroha;
