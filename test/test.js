describe('TEST Iroha javascript',function(){
    var publicKey = "N1X+Fv7soLknpZNtkdW5cRphgzFjqHmOJl9GvVahWxk=";
    var privateKey = "aFJfbcedA7p6X0b6EdQNovfFtmq4YSGK/+Bw+XBrsnAEBpXRu+Qfw0559lgLwF2QusChGiDEkLAxPqodQH1kbA==";
    var signature = "bl7EyGwrdDIcHpizHUcDd4Ui34pQRv5VoM69WEPGNveZVOIXJbX3nWhvBvyGXaCxZIuu0THCo5g8PSr2NZJKBg==";

    beforeEach(function(done){
        done();
    });

    describe('Iroha CreateSignature',function(){
        it('Signature succeeded!', function(){
            var msg = "test";
            var sig = iroha.createSignature({
                    "publicKey": publicKey,
                    "privateKey": privateKey,
                    "message": msg
            });

            assert.strictEqual(signature, sig);
        });

        it('Signature not succeeded!', function(){
            var msg = "abcd";
            var sig = iroha.createSignature({
                    "publicKey": publicKey,
                    "privateKey": privateKey,
                    "message": msg
            });

            assert.notStrictEqual(signature, sig);
        });

    });

    describe('Iroha Verify',function(){
        it('Verify succeeded!', function(){
            var msg = sha3_256("test");
            var res = iroha.verify({
                "publicKey": publicKey,
                "message": msg,
                "signature": signature
            });

            assert.isTrue(res);
        });

        it('Verify not succeeded!', function(){
            var msg = sha3_256("abcd");
            var res = iroha.verify({
                "publicKey": publicKey,
                "message": msg,
                "signature": signature
            });

            assert.isFalse(res);
        });

    });
});
