import { Transaction } from "../../models";
import { BaseService } from "./base";
import * as Routes from "./routes";

/**
 * TransactionRequest
 */
export class TransactionRequest {
  uuid: string;
  domain: string;
  asset: string;
  limit: number;
  offset: number;
}

/**
 * Interface of Transaction service
 */
export interface ITransactionService {
  /**
   *
   * @param uuid
   * @param domain
   * @param asset
   * @param limit
   * @param offset
   */
  findHistory (transaction: TransactionRequest): Promise<Array<Transaction>>;
}

/**
 * Implementation of Transaction service
 */
export class TransactionService extends BaseService implements ITransactionService {
  findHistory (request: TransactionRequest): Promise<Array<Transaction>> {
    const url = this.toUrl(request);
    return this.transform<Array<Transaction>>(this.getRequest(url));
  }

  private toUrl (request: TransactionRequest): string {
    let url = "";
    if (request.asset != null && request.asset != null) {
      url = `${Routes.TRANSACTION_HISTORY(request.asset, request.domain)}`;
    }

    url = `${url}?uuid=${request.uuid}&limit=${request.limit}&offset=${request.offset}`;

    return url;
  }
}
