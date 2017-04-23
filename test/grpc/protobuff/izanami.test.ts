import * as iroha from "../../../src/irohajs";
import {request, assertHelper} from "./../../__mocks__/request";

describe("TEST Iroha Izanami", () => {
  beforeEach((done) => {
    done();
  });

  describe("Izanami", () => {
    let client: iroha.IIzanamiService;

    beforeAll(() => {
      const service = new iroha.IrohaService();
      client = service.Izanami;
    });

    it("izanagi", () => {
      const transaction = new iroha.TransactionResponse();
      return request(client, "izanagi", [transaction])
        .then(assertHelper(undefined, "OK, no problem!", "OK", null));
    });
  });
});
