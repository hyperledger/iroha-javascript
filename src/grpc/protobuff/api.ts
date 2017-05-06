import {
  Query, TransactionResponse, Transaction,
  AssetResponse, StatusResponse, ConsensusEvent
} from "../../models";

/**
 * TransactionRepositoryService
 */
export interface ITransactionRepositoryService {
  find: (query: Query, cb: (error: any, response: TransactionResponse) => any) => any;
  fetch: (query: Query, cb: (error: any, response: TransactionResponse) => any) => any;
  fetchStream: (transaction: Transaction, cb: (error: any, response: StatusResponse) => any) => any;
}

/**
 * AssetRepositoryService
 */
export interface IAssetRepositoryService {
  find: (query: Query, cb: (error: any, response: AssetResponse) => any) => any;
}

/**
 * SumeragiService
 */
export interface ISumeragiService {
  torii: (transaction: Transaction, cb: (error: any, response: StatusResponse) => any) => any;
  verify: (consensusEvent: ConsensusEvent, cb: (error: any, response: StatusResponse) => any) => any;
  kagami: (query: Query, cb: (error: any, response: StatusResponse) => any) => any;
}

/**
 * zanamiService
 */
export interface IIzanamiService {
  izanagi: (transactionRespose: TransactionResponse, cb: (error: any, response: StatusResponse) => any) => any;
}
