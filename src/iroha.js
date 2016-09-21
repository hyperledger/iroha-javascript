"use strict"
var supercop = require('supercop.js');

module.export.createKeyPair = function(){
    var seed = supercop.createSeed();
    var keys = supercop.createKeyPair(seed);

    return {
        publicKey: keys.publicKey.toString('base64'),
        privateKey: keys.privateKey.toString('base64')
    }
}





