describe('iroha test',function(){
    var iroha;
    beforeEach(function(){
        iroha = require('../src/iroha.js');
        console.log(iroha);
    });

    it("return keyPair",function(){
        expect(iroha.createKeyPair()).not.toBe(null);
    });

});
