/**
 * ITransactionRepositoryService
 */
export interface ITransactionRepositoryService {
  find: (query: IQuery) => ITransactionResponse;
  fetch: (query: IQuery) => ITransactionResponse;
  fetchStream: (transaction: ITransaction) => IStatusResponse;
}

/**
 * IAssetRepositoryService
 */
export interface IAssetRepositoryService {
  find: (query: IQuery) => IAssetResponse;
}

/**
 * IzanamiService
 */
export interface IIzanamiService {
  Torii: (transaction: ITransaction) => IStatusResponse;
  Verify: (consensusEvent: IConsensusEvent) => IStatusResponse;
  Kagami: (query: IQuery) => IStatusResponse;
}

/**
 * SumeragiService
 */
export interface ISumeragiService {
  Izanagi: (transactionRespose: ITransactionResponse) => IStatusResponse;
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
  account: Account;
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
  account: Account;
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
