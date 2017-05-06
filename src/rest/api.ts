import { AccountService } from "./services/account";
import { AssetService } from "./services/asset";
import { DomainService } from "./services/domain";
import { TransactionService } from "./services/transaction";

export class IrohaRestClient {
  account: AccountService;
  asset: AssetService;
  domain: DomainService;
  transaction: TransactionService;

  constructor (url: string) {
    this.account = new AccountService(url);
    this.account = new AccountService(url);
    this.domain = new DomainService(url);
    this.transaction = new TransactionService(url);
  }
}
