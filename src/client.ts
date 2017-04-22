export const grpc = require("grpc");

import axios from "axios";
import * as moment from "moment";
import { IrohaGrpcFormat, IIrohaGrpc, IGrpcFactory, grpcServiceFactory } from "./grpc/utils";
import { IKeyPair } from "./irohajs";
import { ITransactionRepositoryService, IAssetRepositoryService,
    IIzanamiService, ISumeragiService } from "./grpc/protobuff/api";

/**
 *
 */
export interface IrohaConfig {
  hostname: string;
  rest: {
    port: number;
  };
  grpc: {
    port: number;
    format: IrohaGrpcFormat;
  };
}

export interface IIrohaRest {
  // Account: IAccountService;
}

/**
 *
 */
export interface IApi {
  Api: IIrohaGrpc;
}

/**
 *
 */
export class IrohaService implements IGrpcFactory {
  static DefaultIrohaConfiguration = {
    hostname: "localhost",
    rest: {
      port: 1204
    },
    grpc: {
      port: 50051,
      format: IrohaGrpcFormat.Protobuf
    }
  };

  private static _TransactionRepository: ITransactionRepositoryService;
  private static _AssetRepository: IAssetRepositoryService;
  private static _Izanami: IIzanamiService;
  private static _Sumeragi: ISumeragiService;

  config: IrohaConfig;
  rpc: IIrohaGrpc;
  http: IIrohaRest;

  constructor (config: IrohaConfig = IrohaService.DefaultIrohaConfiguration) {
    this.init(config);

    this.config = config;
  }

  get AssetRepository(): IAssetRepositoryService {
    return IrohaService._AssetRepository || grpcServiceFactory<IAssetRepositoryService>(this, (url, auth) => {
      IrohaService._AssetRepository = new this.rpc.AssetRepository(url, auth);
      return IrohaService._AssetRepository;
    });
  }

  get Izanami(): IIzanamiService {
    return IrohaService._Izanami || grpcServiceFactory<IIzanamiService>(this, (url, auth) => {
      IrohaService._Izanami = new this.rpc.Izanami(url, auth);
      return IrohaService._Izanami;
    });
  }

  get Sumeragi(): ISumeragiService {
    return IrohaService._Sumeragi || grpcServiceFactory<ISumeragiService>(this, (url, auth) => {
      IrohaService._Sumeragi = new this.rpc.Sumeragi(url, auth);
      return IrohaService._Sumeragi;
    });
  }

  get TransactionRepository(): ITransactionRepositoryService {
    return IrohaService._TransactionRepository || grpcServiceFactory<ITransactionRepositoryService>(this, (url, auth) => {
      IrohaService._TransactionRepository = new this.rpc.TransactionRepository(url, auth);
      return IrohaService._TransactionRepository;
    });
  }

  getRestBaseUrl (): string {
    return `${this.config.hostname}:${this.config.rest.port}`;
  }

  getGrpcBaseUrl (): string {
    return `${this.config.hostname}:${this.config.grpc.port}`;
  }

  private init (config: IrohaConfig): void {
    if (config.grpc.format === IrohaGrpcFormat.Protobuf) {
      const proto: IApi = grpc.load(`${__dirname}/grpc/protobuff/api.proto`);
      this.rpc = proto.Api;
    } else {
      throw new Error("Error: Flatbuffers are not supported by gRPC yet!");
    }
  }
}
