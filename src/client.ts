export const grpc = require("grpc");

import { ITransactionRepositoryService, IAssetRepositoryService, IIzanamiService, ISumeragiService } from "./api";

export interface GrpcService<T> {
  new(...args: any[]) : T;
}

export interface IIroha {
  TransactionRepository: GrpcService<ITransactionRepositoryService>;
  AssetRepository: GrpcService<IAssetRepositoryService>;
  Izanami: GrpcService<IIzanamiService>;
  Sumeragi: GrpcService<ISumeragiService>;
}

export interface IApi {
  Api: IIroha;
}

// const proto: IApi = grpc.load("src/protos/api.proto");
// export const api = proto.Api;
// const stub = new client.Izanami("0.0.0.0:8888", grpc.credentials.createInsecure());
