describe('iroha test',function(){
    var iroha;
    beforeEach(function(){
        iroha = require('../src/iroha.js');
    });

    it("should be return keyPair at createKeyPair",function(){
        expect(iroha.createKeyPair()).not.toBe(null);
    });

});
