import { Domain } from "../../models";
import { BaseService } from "./base";
import * as Routes from "./routes";

/**
 * DomainRegisterRequest
 */
export class DomainRegisterRequest {
  name: string;
  owner: string;
  signature: string;
  timestamp: number;
}

/**
 * Domain Service
 */
export interface IDomainService {
  register (domain: DomainRegisterRequest): Promise<Domain>;
  find (limit: number, offset: number): Promise<Domain>;
}

/**
 * Implementation  Domain Service
 */
export class DomainService extends BaseService implements IDomainService {
  register (domain: DomainRegisterRequest): Promise<Domain> {
    return this.transform<Domain>(this.postRequest(Routes.DOMAIN_REGISTER, domain));
  }

  find (limit: number, offset: number): Promise<Domain> {
    return this.transform<Domain>(this.getRequest(`${Routes.DOMAIN_LIST}?limit=${limit}&offset=${offset}`));
  }
}
