import * as iroha from "../src/irohajs";
import { AssetResponse } from "../src/api";

describe("TEST Iroha Izanami", () => {
  beforeEach((done) => {
    done();
  });

  describe("Izanami", () => {
    let proto: iroha.IApi;
    let client: iroha.IIzanamiService;

    beforeAll(() => {
      proto = iroha.grpc.load("src/protos/api.proto");
      client = new proto.Api.Izanami("localhost:50051", iroha.grpc.credentials.createInsecure());
    });

    it("izanagi", () => {
      const transaction = new iroha.TransactionResponse();
      return new Promise((resolve, reject) => {
        client.izanagi(transaction, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      }).then((data: iroha.StatusResponse) => {
        expect(data.value).toEqual("OK");
        expect(data.message).toEqual("OK, no problem!");
        expect(data.confirm).toEqual(null);
      });
    });
  });
});
