import * as iroha from "../src/irohajs";
import {request, assertHelperData} from "./__mocks__/request";

describe("TEST Iroha Asset Repository", () => {
  beforeEach((done) => {
    done();
  });

  describe("AssetRepository", () => {
    let client: iroha.IAssetRepositoryService;

    beforeAll(() => {
      const service = new iroha.IrohaService();
      client = service.AssetRepository;
    });

    it("find!", () => {
      const query = new iroha.Query();
      return request(client, "find", [query]).then(assertHelperData({
        "account": null,
        "asset": null,
        "code": "0",
        "domain": null,
        "message": "OK",
        "peer": null,
        "simpleAsset": null,
        "timestamp": "0"
      }));
    });
  });
});
