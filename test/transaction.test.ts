import * as iroha from "../src/irohajs";
import { Transaction } from "../src/api";
import { IROHA_HOST } from "./config";

describe("TEST Iroha javascript", () => {
  beforeEach((done) => {
    done();
  });

  describe("TransactionRepository", () => {
    let client: iroha.ITransactionRepositoryService;
    beforeAll(() => {
      const data = new iroha.IrohaService();
      client = data.TransactionRepository;
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
      }).then((data: iroha.TransactionResponse) => {
        expect(data.code).toEqual("0");
        expect(data.message).toEqual("OK");
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
      }).then((data: iroha.TransactionResponse) => {
        expect(data.code).toEqual("0");
        expect(data.message).toEqual("OK");
        expect(data.transaction).toEqual([]);
      });
    });
  });
});
