import * as iroha from "../src/irohajs";
import { request, assertHelper } from "./__mocks__/request";

describe("TEST Iroha Sumeragi Service", () => {
  beforeEach((done) => {
    done();
  });

  describe("ISumeragiService", () => {
    let client: iroha.ISumeragiService;

    beforeAll(() => {
      const service = new iroha.IrohaService();
      client = service.Sumeragi;
    });

    it("torii!", () => {
      const query = new iroha.Transaction();
      return request(client, "torii", [query])
        .then(assertHelper(undefined, "", "OK"));
    });

    it("verify!", () => {
      const query = new iroha.ConsensusEvent();
      return request(client, "verify", [query])
        .then(assertHelper(undefined, "", "OK"));
    });

    it("kagami!", () => {
      const query = new iroha.ConsensusEvent();
      return request(client, "kagami", [query])
        .then(assertHelper(undefined, "OK, no problem!", "Alive"));
    });
  });
});
