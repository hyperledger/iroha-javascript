import * as iroha from "../src/irohajs";
import { Transaction } from "../src/api";

describe("TEST Iroha javascript", () => {
  beforeEach((done) => {
    done();
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
