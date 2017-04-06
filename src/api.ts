/**
 * ITransactionRepositoryService
 */
export interface ITransactionRepositoryService {
  find: (query: IQuery, cb: (error: any, response: ITransactionResponse) => any) => any;
  fetch: (query: IQuery, cb: (error: any, response: ITransactionResponse) => any) => any;
  fetchStream: (transaction: ITransaction, cb: (error: any, response: IStatusResponse) => any) => any;
}

/**
 * IAssetRepositoryService
 */
export interface IAssetRepositoryService {
  find: (query: IQuery, cb: (error: any, response: IAssetResponse) => any) => any;
}

/**
 * SumeragiService
 */
export interface ISumeragiService {
  Torii: (transaction: ITransaction, cb: (error: any, response: IStatusResponse) => any) => any;
  Verify: (consensusEvent: IConsensusEvent, cb: (error: any, response: IStatusResponse) => any) => any;
  Kagami: (query: IQuery, cb: (error: any, response: IStatusResponse) => any) => any;
}

/**
 * IzanamiService
 */
export interface IIzanamiService {
  Izanagi: (transactionRespose: ITransactionResponse, cb: (error: any, response: IStatusResponse) => any) => any;
}

/**
 * TransactionResponse
 */
export interface ITransactionResponse {
  message: string;
  code: number;
  transaction: Array<ITransaction>;
}

/**
 * RecieverConfirmation
 */
export interface IRecieverConfirmation {
  hash: string;
  signature: ISignature;
}

/**
 * AssetResponse
 */
export interface IAssetResponse {
  message: string;
  code: number;
  timestamp: number;
  asset: IAsset;
  simpleAsset: ISimpleAsset;
  domain: IDomain;
  account: IAccount;
  peer: IPeer;
}

/**
 * StatusResponse
 */
export interface IStatusResponse {
  value: string;
  message: string;
  timestamp: number;
  confirm: IRecieverConfirmation;
}

/**
 * Query
 */
export interface IQuery {
  type: string;
  value: Map<string, IBaseObject>;
  senderPubkey: string;
}

/**
 * BaseObject
 */
export interface IBaseObject {
  valueString?: string;
  valueInt?: number;
  valueDouble?: number;
  valueBoolean?: boolean;
}

/**
 * SimpleAsset
 */
export interface ISimpleAsset {
  domain: string;
  name: string;
  value: IBaseObject;
  smartContractName: string;
}

/**
 * Asset
 */
export interface IAsset {
  domain: string;
  name: string;
  value: Map<string, IBaseObject>;
  smartContractName: string;
}

/**
 * Domain
 */
export interface IDomain {
  ownerPublicKey: string;
  name: string;
}

/**
 * Account
 */
export interface IAccount {
  publicKey: string;
  name: string;
  assets: Array<string>;
}

/**
 * ITrust
 */
export interface ITrust {
  value: number;
  isOk: boolean;
}

/**
 * Peer
 */
export interface IPeer {
  publicKey: string;
  address: string;
  trust: ITrust;
}

/**
 * Signature
 */
export interface ISignature {
  publicKey: string;
  signature: string;
}

/**
 * Transaction
 */
export interface ITransaction {
  txSignatures: Array<ISignature>;
  type: string;
  senderPubkey: string;
  hash: string;
  timestamp: number;
  asset: IAsset;
  simpleAsset: ISimpleAsset;
  domain: IDomain;
  account: IAccount;
  peer: IPeer;
  receivePubkey: string;
}

/**
 * ConsensusEvent
 */
export interface IConsensusEvent {
  eventSignatures: Array<ISignature>;
  transaction: ITransaction;
  order: number;
  status: string;
}
