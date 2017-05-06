export const ACCOUNT_REGISTER = "/account/register";
export const ACCOUNT_INFO = "/account";

export const DOMAIN_REGISTER = "/domain/register";
export const DOMAIN_LIST = "/domain/list";

export const ASSET_CREATE = "/asset/create";
export const ASSET_LIST = "/domain/list";
export const ASSET_OPERATION = "/asset/operation";

export const TRANSACTION_HISTORY_WITH_UUID = "/history/transaction";
export function TRANSACTION_HISTORY (domain: string, asset: string): string {
  return `/history/${domain}/${asset}/transaction`;
};
