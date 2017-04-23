import * as iroha from "../../src/irohajs";
import { request, assertHelperData } from "./../__mocks__/request";
import { IrohaGrpcFormat } from "../../src/grpc/utils";

describe("TEST Iroha gRPC Client", () => {
  beforeEach((done) => {
    done();
  });

  describe("Client Test Case", () => {
    it("Test not initialized service!", () => {
      const service = new iroha.IrohaService();
      service.rpc = null;
      expect(function () { const assetService = service.AssetRepository; }).toThrowError();
    });

    it("Test not initialized service!", () => {
      const service = new iroha.IrohaService(iroha.IrohaService.DefaultIrohaConfiguration);
      expect(service).toBeDefined();
    });

    it("Test Flatbuffer format!", () => {
      const options = {
        hostname: "localhost",
        rest: {
          port: 1204
        },
        grpc: {
          port: 50051,
          format: IrohaGrpcFormat.Flatbuffers
        }
      };

      expect(function () { const service = new iroha.IrohaService(options); }).toThrowError();
    });

    it("Test gRPC get URI", () => {
      const service = new iroha.IrohaService();
      expect(service.getGrpcBaseUrl()).toBe("localhost:50051");
    });

    it("Test REST get URI", () => {
      const service = new iroha.IrohaService();
      expect(service.getRestBaseUrl()).toBe("localhost:1204");
    });

  });
});
