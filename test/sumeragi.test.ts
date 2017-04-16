import * as iroha from "../src/irohajs";
import { AssetResponse } from "../src/api";
import { IROHA_HOST } from "./config";

describe("TEST Iroha Sumeragi Service", () => {
  beforeEach((done) => {
    done();
  });

  describe("ISumeragiService", () => {
    let proto: iroha.IApi;
    let client: iroha.ISumeragiService;

    beforeAll(() => {
      proto = iroha.grpc.load("src/protos/api.proto");
      client = new proto.Api.Sumeragi(IROHA_HOST, iroha.grpc.credentials.createInsecure());
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
        expect(data.value).toEqual("OK");
        expect(data.message).toEqual("");
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
        expect(data.value).toEqual("OK");
        expect(data.message).toEqual("");
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
