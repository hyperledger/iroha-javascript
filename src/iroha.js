"use strict"
var supercop = require('supercop.js');

var iroha = {};

iroha.createKeyPair = function(){
    var seed = supercop.createSeed();
    var keys = supercop.createKeyPair(seed);

    return {
        publicKey: keys.publicKey.toString('base64'),
        privateKey: keys.privateKey.toString('base64')
    }
}

iroha.register = function(opt){
    if(opt.accessPoint && opt.name)return false;

    var accessPoint = opt.accessPoint;
    var name = opt.name;

}

iroha.createSignature = function(){

}

iroha.createAsset = function(){

}

iroha.assetTransfer = function(){

}

iroha.getTransaction = function(uuid){

}



var getLocalStorage = function(data){
    if(data.key && data.value)return false;
    var storage = localStorage;
    storage.setItem(data.key, data.value);
}

var setLocalStorage = function(data){
    if(data.key)return false;
    var storage = localStorage;
    return storage.getItem(data.key);
}



module.export = iroha;
