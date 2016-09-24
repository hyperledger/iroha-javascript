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

iroha.registAccount = function(opt){
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
        console.err(err);
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
        console.err(err);
    });
}


/**
 * opt = {
 *  accessPoint: ip address,
 *  domainName: domain name,
 *  publicKey: user's public key(base64),
 *  privateKey: user's private Key(base64)
 * }
 *
 **/
iroha.registDomain = function(opt){
    if(!opt.accessPoint || !opt.name || !opt.publicKey || !opt.privateKey)return false;
    var accessPoint = opt.accessPoint;
    var timestamp = getTimeStampNow();
    var message = "name:" + opt.name + ",owner:" + opt.publicKey + ",timestamp:" + timestamp.toString();
    var sig = createSignature({
        "publicKey": opt.publicKey,
        "privateKey": opt.privateKey,
        "message": message
    });

    var param = {
        "name": opt.name,
        "owner": opt.owner,
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
 *  publicKey: public key,
 *  privateKey: private key
 * }
 **/

iroha.createAsset = function(opt){
    if(!opt.accessPoint || !opt.assetName || !opt.domainName || !opt.publicKey || !opt.privateKey)return false;
    var accessPoint = opt.accessPoint;
    var timestamp = getTimeStampNow();
    var message = "name:" + opt.assetName + ",creator:" + opt.publicKey + timestamp.toString();
    var sig = createSignature({
        "publicKey": opt.publicKey,
        "privateKey": opt.privateKey,
        "message": message
    });

    var param = {
        "name": opt.assetName,
        "domain": domainName,
        "creator": opt.publicKey,
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
 * }
 *
 **/

iroha.assetTransfer = function(opt){

}

/**
 * opt = {
 * }
 *
 **/

iroha.getAssetInfo = function(opt){
}

/**
 * opt = {
 * }
 *
 **/

iroha.getAssetList = function(opt){
}

/**
 * opt = {
 * }
 *
 **/

iroha.getTransaction = function(opt){

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
