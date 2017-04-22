import { ITransactionRepositoryService, IAssetRepositoryService,
    IIzanamiService, ISumeragiService } from "./protobuff/api";

export const grpc = require("grpc");

/**
 *
 */
export enum IrohaGrpcFormat {
  Protobuf,
  Flatbuffers
}

/**
 *
 */
export interface GrpcService<T> {
  new(...args: any[]) : T;
}

/**
 *
 */
export interface IIrohaGrpc {
  TransactionRepository: GrpcService<ITransactionRepositoryService>;
  AssetRepository: GrpcService<IAssetRepositoryService>;
  Izanami: GrpcService<IIzanamiService>;
  Sumeragi: GrpcService<ISumeragiService>;
}

export interface IGrpcFactory {
  rpc: any;
  getGrpcBaseUrl (): string;
}

/**
 *
 */
export function grpcServiceFactory<T> (facade: IGrpcFactory, cb: (url: string, auth: any, config?: any) => T): T {
  if (facade.rpc == null) {
    throw new Error("Error: gRPC isn't initialized yet!");
  }

  return cb(facade.getGrpcBaseUrl(), grpc.credentials.createInsecure());
}
