import { Account } from "../../models";
import * as Routes from "./routes";
import { BaseService } from "./base";

/**
 * Account register request
 */
export class AccountRegisterRequest {
  publicKey: string;
  alias: string;
  timestamp: number;
}

/**
 * Interface of Account service
 */
export interface IAccountService {
  /**
   * Register new account.
   *
   * @param pubkey
   * @param alias
   * @returns
   */
  register (account: AccountRegisterRequest): Promise<Account>;

  /**
   * Find an account
   *
   * @param uuid
   * @returns
   */
  find (uuid: string): Promise<Account>;
}

/**
 * Implementation of Account service
 */
export class AccountService extends BaseService implements IAccountService {
  register (account: AccountRegisterRequest): Promise<Account> {
    return this.transform<Account>(this.postRequest(Routes.ACCOUNT_INFO, account));
  }

  find (uuid: string): Promise<Account> {
    return this.transform<Account>(this.getRequest(`${Routes.ACCOUNT_INFO}?uuid=${uuid}`));
  }
}
