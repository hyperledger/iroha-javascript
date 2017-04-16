import * as iroha from "../src/irohajs";
import { AssetResponse } from "../src/api";

describe("TEST Iroha Sumeragi Service", () => {
  beforeEach((done) => {
    done();
  });

  describe("ISumeragiService", () => {
    let proto: iroha.IApi;
    let client: iroha.ISumeragiService;

    beforeAll(() => {
      proto = iroha.grpc.load("src/protos/api.proto");
      client = new proto.Api.Sumeragi("localhost:50051", iroha.grpc.credentials.createInsecure());
    });

    it("torii!", () => {
      const query = new iroha.Transaction();
      return new Promise((resolve, reject) => {
        client.torii(query, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      }).then((data: iroha.StatusResponse) => {
        expect(data).toEqual({
          "confirm": {
            "hash": "",
            "signature": {
              "publicKey": "gpULsIl5+MZLQrxhHvBWQ9bjTDmgSxWKQ0YBI+DejKE=",
              "signature": "zg86uNvmXOW11rUq9EYLgSBpIP/s2JA4hSxavuWV16z4ddNN7YC/7Ou6vPyMM0ZlFSdCbXrC9E+t0E9Ca2OABA=="
            }
          },
          "message": "",
          "timestamp": "0",
          "value": "OK"
        });
      });
    });

    it("verify!", () => {
      const query = new iroha.ConsensusEvent();
      return new Promise((resolve, reject) => {
        client.verify(query, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      }).then((data: iroha.StatusResponse) => {
        expect(data).toEqual({
          "confirm": {
            "hash": "",
            "signature": {
              "publicKey": "gpULsIl5+MZLQrxhHvBWQ9bjTDmgSxWKQ0YBI+DejKE=",
              "signature": "zg86uNvmXOW11rUq9EYLgSBpIP/s2JA4hSxavuWV16z4ddNN7YC/7Ou6vPyMM0ZlFSdCbXrC9E+t0E9Ca2OABA=="
            }
          },
          "message": "",
          "timestamp": "0",
          "value": "OK"
        });
      });
    });

    it("kagami!", () => {
      const query = new iroha.Query();
      return new Promise((resolve, reject) => {
        client.kagami(query, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      }).then((data: iroha.StatusResponse) => {
        expect(data.confirm).toEqual(null);
        expect(data.message).toEqual("OK, no problem!");
        expect(data.value).toEqual("Alive");
      });
    });
  });
});
