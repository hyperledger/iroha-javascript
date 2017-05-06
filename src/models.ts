/**
 * TransactionResponse
 */
export class TransactionResponse {
  message: string;
  code: number;
  transaction: Array<Transaction>;
}

/**
 * RecieverConfirmation
 */
export class RecieverConfirmation {
  hash: string;
  signature: Signature;
}

/**
 * AssetResponse
 */
export class AssetResponse {
  message: string;
  code: number;
  timestamp: number;
  asset: Asset;
  simpleAsset: SimpleAsset;
  domain: Domain;
  account: Account;
  peer: Peer;
}

/**
 * StatusResponse
 */
export class StatusResponse {
  value: string;
  message: string;
  timestamp: number;
  confirm: RecieverConfirmation;
}

/**
 * Query
 */
export class Query {
  type: string;
  value: Map<string, BaseObject>;
  senderPubkey: string;
}

/**
 * BaseObject
 */
export class BaseObject {
  valueString?: string;
  valueInt?: number;
  valueDouble?: number;
  valueBoolean?: boolean;
}

/**
 * SimpleAsset
 */
export class SimpleAsset {
  domain: string;
  name: string;
  value: BaseObject;
  smartContractName: string;
}

/**
 * Asset
 */
export class Asset {
  domain: string;
  name: string;
  value: Map<string, BaseObject>;
  smartContractName: string;
}

/**
 * Domain
 */
export class Domain {
  ownerPublicKey: string;
  name: string;
}

/**
 * Account
 */
export class Account {
  publicKey: string;
  name: string;
  assets: Array<string>;
}

/**
 * Trust
 */
export class Trust {
  value: number;
  isOk: boolean;
}

/**
 * Peer
 */
export class Peer {
  publicKey: string;
  address: string;
  trust: Trust;
}

/**
 * Signature
 */
export class Signature {
  publicKey: string;
  signature: string;
}

/**
 * Transaction
 */
export class Transaction {
  txSignatures: Array<Signature>;
  type: string;
  senderPubkey: string;
  hash: string;
  timestamp: number;
  asset: Asset;
  simpleAsset: SimpleAsset;
  domain: Domain;
  account: Account;
  peer: Peer;
  receivePubkey: string;
}

/**
 * ConsensusEvent
 */
export class ConsensusEvent {
  eventSignatures: Array<Signature>;
  transaction: Transaction;
  order: number;
  status: string;
}
