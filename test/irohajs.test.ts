import * as iroha from "../src/irohajs";
import { Transaction } from '../src/api';

const sha3_256 = require("js-sha3").sha3_256;
const supercop = require("supercop.js");

describe("TEST Iroha javascript", () => {
  const publicKey = "qzesd0bqIFfx1RQDS2HgcG5DQq/7DYF8u1YfMHAeJUs=";
  const privateKey = "MEjhWDSSeQobXA55uYR+EFxEQOoQ68db59Gi1ocQ7ljWZNNQM35MJQpst83FcCKI1hra/53IxeZijEUIiM/Reg==";
  const signature = "wg8rlcWHe+PjkmJDllfMIF4PYUEbvNJ/yaoTmWzQUFe3mjnvuXnG3UWwNJfn47ms670sMvELXcliugBBhgeoCA==";

  beforeEach((done) => {
    done();
  });

  describe("Iroha Create new KeyPair", () => {
    it("Create new KeyPair!", () => {
      const keyPair = iroha.createKeyPair();
      expect(keyPair).toBeDefined();
    });
  });

  describe("Iroha Create new Wallet", () => {
    it("Create new Wallet!", () => {
      const wallet = new iroha.Wallet();
      expect(wallet.toJSON()).toBeDefined();
    });

    it("Create new Wallet!", () => {
      const wallet = new iroha.Wallet({
        privateKey: new Buffer(privateKey, "base64"),
        publicKey: new Buffer(publicKey, "base64")
      });
      expect(wallet.privateKey.toString("base64")).toBe(privateKey);
      expect(wallet.publicKey.toString("base64")).toBe(publicKey);
    });

    it("Check signature", () => {
      const wallet = new iroha.Wallet({
        privateKey: new Buffer(privateKey, "base64"),
        publicKey: new Buffer(publicKey, "base64")
      });
      const sig = wallet.sign("test");
      expect(sig).toBe(signature);
    });
  });

  describe("Iroha CreateSignature", () => {
    it("Signature succeeded!", () => {
      const msg = "test";
      const sig = iroha.sign({
        "publicKey": publicKey,
        "privateKey": privateKey,
        "message": msg
      });

      expect(sig).toBe(signature);
    });

    it("Signature not succeeded!", () => {
      const msg = "abcd";
      const sig = iroha.sign({
        "publicKey": publicKey,
        "privateKey": privateKey,
        "message": msg
      });

      expect(sig).not.toBe(signature);
    });

  });

  describe("Iroha Verify", () => {
    it("Verify succeeded!", () => {
      const msg = sha3_256("test");
      const res = iroha.verify({
        "publicKey": publicKey,
        "message": msg,
        "signature": signature
      });

      expect(res).toBeTruthy();
    });

    it("Verify not succeeded!", () => {
      const msg = sha3_256("abcd");
      const res = iroha.verify({
        "publicKey": publicKey,
        "message": msg,
        "signature": signature
      });

      expect(res).not.toBeTruthy();
    });

  });

  describe("Load dynamic interface", () => {
    let proto: iroha.IApi;
    it("Load protobuf!", () => {
      proto = iroha.grpc.load("src/protos/api.proto");
      expect(proto).toBeTruthy();
    });
  });

  describe("TransactionRepository", () => {
    let proto: iroha.IApi;
    let client: iroha.ITransactionRepositoryService;

    beforeAll(() => {
      proto = iroha.grpc.load("src/protos/api.proto");
      client = new proto.Api.TransactionRepository("localhost:50051", iroha.grpc.credentials.createInsecure());
    });

    it("find!", () => {
      const query = new iroha.Query();
      return new Promise((resolve, reject) => {
        client.find(query, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      }).then(data => {
        expect(data).toEqual({
          code: "0",
          message: "OK",
          transaction: []
        });
      });
    });

    it("fetch!", () => {
      const query = new iroha.Query();
      return new Promise((resolve, reject) => {
        client.fetch(query, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      }).then(data => {
        expect(data).toEqual({
          code: "0",
          message: "OK",
          transaction: []
        });
      });
    });

    // it("fetchStream!", () => {
    //   const transaction = new iroha.Transaction();
    //   return new Promise((resolve, reject) => {
    //     client.fetchStream(transaction, (err, response) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(response);
    //       }
    //     });
    //   }).then(data => {
    //     expect(data).toEqual({
    //       code: "0",
    //       message: "OK",
    //       transaction: []
    //     });
    //   });
    // });
  });
});
