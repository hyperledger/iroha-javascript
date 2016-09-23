"use strict";
var supercop = require('supercop.js');
var superagent = require('superagent');
var sha3 = require('');

var iroha = {};

var createKeyPair = function(){
    var seed = supercop.createSeed();
    var keys = supercop.createKeyPair(seed);

    return {
        publicKey: keys.publicKey.toString('base64'),
        privateKey: keys.privateKey.toString('base64')
    }
}

var saveKeyPair = function(keyPair){
    if(!keyPair)return false;
    setLocalStorage({key: "keys",value: JSON.stringify(keyPair)});
}

var getTimeStanp = function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var min = ("0" + date.getMinutes()).slice(-2);
    var sec = ("0" + date.getSeconds()).slice(-2);

    var dateFormat = year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec; 

    return dateFormat;
}


iroha.register = function(opt, callback){
    if(opt.accessPoint && opt.name)return false;
    var accessPoint = opt.accessPoint;
    var name = opt.name;

    setLocalStorage({key: "accessPoint",value: opt.accessPoint});

    var keyPair = createKeyPair();
    saveKeyPair(keyPair);

    var param = {
        "publicKey": keyPair.publicKey,
        "screen_name": name,
        "timestanp": getTimeStanp()
    }

    postRequest(accessPoint + "/account/register", param).then(function(res){
        return res;
    }).catch(function(err){
        console.log(err);
    });

}

var createSignature = function(){

}

iroha.createAsset = function(){

}

iroha.assetTransfer = function(){

}

iroha.getTransaction = function(uuid){

}


var getLocalStorage = function(data){
    if(!data.key && !data.value)return false;
    var storage = localStorage;
    storage.setItem(data.key, data.value);
}

var setLocalStorage = function(key){
    if(!key)return false;
    var storage = localStorage;
    return storage.getItem(data.key);
}


var getRequest = function(opt){
    return new Promise(function(resolve, reject){
        if(!opt.url && !callback)return false;

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
        if(!opt.url && !opt.param)return false;

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


module.export = iroha;
