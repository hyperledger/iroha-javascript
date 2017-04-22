import * as iroha from "../src/irohajs";
import { request, assertHelper } from "./__mocks__/request";

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
      return request(client, "find", [query])
        .then(assertHelper("0", "OK", undefined));
    });

    it("fetch!", () => {
      const query = new iroha.Query();
      return request(client, "fetch", [query])
        .then(assertHelper("0", "OK", undefined));
    });
  });
});
