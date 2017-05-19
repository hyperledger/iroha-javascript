import axios from "axios";

export class Response<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

/**
 * BaseService
 */
export abstract class BaseService {

  /**
   * Base service URL
   */
  baseUrl: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param path
   */
  getRequest (path: string): Promise<any> {
    return new Promise<any>((response, reject) => {
      axios.get(`${this.baseUrl}${path}`)
        .then((data) => {
          response(data.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  }

  /**
   *
   * @param path
   * @param config
   */
  postRequest (path: string, config: any): Promise<Response<any>> {
    return new Promise<any>((response, reject) => {
      axios.post(`${this.baseUrl}${path}`, config)
        .then((data) => {
          response(data.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  }

  /**
   *
   * @param result
   */
  transform<T> (result: Promise<Response<any>>): Promise<T> {
    return result.then((data) => {
      return data.data as T;
    });
  }
}
