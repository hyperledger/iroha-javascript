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

(function(mod){
    if(typeof exports === "object"){
        var sha3_256 = require('js-sha3').sha3_256;
        var supercop = require('supercop.js');
        module.exports = mod(sha3_256, supercop);
    } else {
        window.iroha = mod(window.sha3_256, window.supercop);
    }

})(function(sha3_256, supercop){
    var iroha = {};

    iroha.createKeyPair = function(){
        var seed = supercop.createSeed();
        var keys = supercop.createKeyPair(seed);

        return {
            publicKey: keys.publicKey.toString('base64'),
            privateKey: keys.secretKey.toString('base64')
        }
    };

    /**
     * opt = {
     *  publicKey: public Key,
     *  privateKey: private Key,
     *  message: message
     * }
     *
     **/
    iroha.createSignature = function(opt){
        if(!opt.publicKey || !opt.privateKey || !opt.message)return false;
        var publicKey = opt.publicKey;
        var privateKey = opt.privateKey;
        var sha3Message = sha3_256(opt.message);

        var sig = supercop.sign(
                new Buffer(sha3Message),
                new Buffer(publicKey, 'base64'),
                new Buffer(privateKey, 'base64')
                ).toString('base64');

        return sig;
    };

    /**
     * opt = {
     *  signature: signature,
     *  message: message,
     *  publicKey: public Key
     * }
     *
     **/
    iroha.verify = function(opt){
        var valid = supercop.verify(
                opt.signature,
                opt.message,
                opt.publicKey
                );

        return valid;

    };

    return iroha;
});
