"use strict";
var supercop = require('supercop.js');
var superagent = require('superagent');
var sha3 = require('js-sha3');

var iroha = {};

var verify = function(opt){
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
        "publickKey": publickKey,
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
    var date = new Date();

    var param = {
        "publicKey": keyPair.publicKey,
        "screen_name": name,
        "timestanp": date.getTime()
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
 *
 * }
 *
 **/
iroha.registDomain = function(opt){
}


iroha.createAsset = function(opt){

}

iroha.assetTransfer = function(opt){

}

iroha.getTransaction = function(opt){

}


var getRequest = function(opt){
    return new Promise(function(resolve, reject){
        if(!opt.url || !callback)return false;

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
