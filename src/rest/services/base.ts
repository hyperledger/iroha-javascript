import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

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
  getRequest (path: string): AxiosPromise {
    return axios.get(`${this.baseUrl}${path}`);
  }

  /**
   *
   * @param path
   * @param config
   */
  postRequest (path: string, config: any): AxiosPromise {
    return axios.post(`${this.baseUrl}${path}`, config);
  }

  /**
   *
   * @param result
   */
  transform<T> (result: Promise<any>): Promise<T> {
    return result.then((data) => {
      return data.data as T;
    });
  }
}
