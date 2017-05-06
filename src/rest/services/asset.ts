import { Asset } from "../../models";
import * as Routes from "./routes";
import { BaseService } from "./base";

export class AssetOperationRequest {
  assetUuid: string;
  command: string;
  value: string;
  sender: string;
  receiver: string;
  signature: string;
  timestamp: number;
}

export class AssetRegisterRequest {
  name: string;
  domain: string;
  creator: string;
  signature: string;
  timestamp: number;
}

/**
 * Asset Service
 */
export interface IAssetService {

  /**
   * @param asset
   */
  create (asset: AssetRegisterRequest): Promise<Asset>;

  /**
   * @param domain
   * @param limit
   * @param offset
   */
  find (domain: string, limit: number, offset: number): Promise<Asset>;

  /**
   * @param operation
   */
  operation (operation: AssetOperationRequest): Promise<boolean>;
}

/**
 * Implementation  Asset Service
 */
export class AssetService extends BaseService implements IAssetService {
  create (asset: AssetRegisterRequest): Promise<Asset> {
    return this.transform<Asset>(this.postRequest(Routes.ASSET_CREATE, { data: asset }));
  }
  find (domain: string, limit: number, offset: number): Promise<Asset> {
    return this.transform<Asset>(this.getRequest(`/domain${Routes.ASSET_LIST}?limit=${limit}&offset=${offset}`));
  }
  operation (asset: AssetOperationRequest): Promise<boolean> {
    return this.transform<boolean>(this.postRequest(Routes.ASSET_OPERATION, { data: asset }));
  }
}
