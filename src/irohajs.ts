export * from "./api";
export * from "./client";
export * from "./wallet";

export const sha3_256 = require("js-sha3").sha3_256;
export const supercop = require("supercop.js");

/**
 * Inteface of key pair.
 */
export interface IKeyPair {
  privateKey: string;
  publicKey: string;
}

/**
 * @returns a key pair.
 */
export function createKeyPair (): IKeyPair {
  const seed = supercop.createSeed();
  const keys = supercop.createKeyPair(seed);

  return {
    publicKey: keys.publicKey.toString("base64"),
    privateKey: keys.secretKey.toString("base64")
  };
}

/**
 * @param opt
 * @returns signature of given message.
 */
export function sign (opt: { publicKey: string, privateKey: string, message: string }): string {
  const publicKey = new Buffer(opt.publicKey, "base64");
  const privateKey = new Buffer(opt.privateKey, "base64");
  const sha3Message = new Buffer(sha3_256(opt.message));

  const sig = supercop.sign(
    sha3Message,
    publicKey,
    privateKey
  ).toString("base64");

  return sig;
}

/**
 * @param opt
 * @returns true if signature is valid.
 */
export function verify (opt: { publicKey: string, message: string, signature: string }): boolean {
  const valid = supercop.verify(
    new Buffer(opt.signature, "base64"),
    new Buffer(opt.message),
    new Buffer(opt.publicKey, "base64")
  );
  return valid;
}
