import * as iroha from "../src/irohajs";
import { AssetResponse } from "../src/api";

describe("TEST Iroha Asset Repository", () => {
  beforeEach((done) => {
    done();
  });

  describe("AssetRepository", () => {
    let proto: iroha.IApi;
    let client: iroha.IAssetRepositoryService;

    beforeAll(() => {
      proto = iroha.grpc.load("src/protos/api.proto");
      client = new proto.Api.AssetRepository("localhost:50051", iroha.grpc.credentials.createInsecure());
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
          "account": null,
          "asset": null,
          "code": "0",
          "domain": null,
          "message": "OK",
          "peer": null,
          "simpleAsset": null,
          "timestamp": "0"
        });
      });
    });
  });
});
