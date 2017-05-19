import * as api from "../src/models";

describe("TEST Iroha Protobuf API", () => {

  it("Test Account Initialization", () => {
    expect(function () { const service = new api.Account(); }).not.toThrowError();
  });

  it("Test RecieverConfirmation Initialization", () => {
    expect(function () { const service = new api.RecieverConfirmation(); }).not.toThrowError();
  });

  it("Test AssetResponse Initialization", () => {
    expect(function () { const service = new api.AssetResponse(); }).not.toThrowError();
  });

  it("Test StatusResponse Initialization", () => {
    expect(function () { const service = new api.StatusResponse(); }).not.toThrowError();
  });

  it("Test BaseObject Initialization", () => {
    expect(function () { const service = new api.BaseObject(); }).not.toThrowError();
  });

  it("Test SimpleAsset Initialization", () => {
    expect(function () { const service = new api.SimpleAsset(); }).not.toThrowError();
  });

  it("Test Asset Initialization", () => {
    expect(function () { const service = new api.Asset(); }).not.toThrowError();
  });

  it("Test SimpleAsset Initialization", () => {
    expect(function () { const service = new api.SimpleAsset(); }).not.toThrowError();
  });

  it("Test Domain Initialization", () => {
    expect(function () { const service = new api.Domain(); }).not.toThrowError();
  });

  it("Test Trust Initialization", () => {
    expect(function () { const service = new api.Trust(); }).not.toThrowError();
  });

  it("Test Peer Initialization", () => {
    expect(function () { const service = new api.Peer(); }).not.toThrowError();
  });

  it("Test Signature Initialization", () => {
    expect(function () { const service = new api.Signature(); }).not.toThrowError();
  });
});
