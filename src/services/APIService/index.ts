import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { ApiServiceConfig } from "./types";

export class APIService {
  axios: Axios;
  config: AxiosRequestConfig = {};
  static cancelTokenSource: CancelTokenSource = axios.CancelToken.source();

  /**
   * This class manages all the network calls.
   * @constructor
   * @param  {ApiServiceConfig} config configuration object for initializing the Api service.
   */
  constructor(private apiConfig: ApiServiceConfig) {
    this.addResponseInterceptors.bind(this);
    this.get.bind(this);
    this.post.bind(this);
    this.getApiCall.bind(this);
    this.postApiCall.bind(this);

    this.apiConfig.baseURL = this.apiConfig.baseURL || 'https://localhost:3000/api/v1'

    this.axios = axios.create(apiConfig);

    this.addResponseInterceptors();
  }

  /**
   * This function is used to cancel all the ongoing http requests.
   * @returns void
   */
  static cancelAllOngoingRequest(): void {
    APIService.cancelTokenSource.cancel();
    APIService.cancelTokenSource = axios.CancelToken.source();
  }

  /**
   * Function to intercept the response and checks if it's success or error.
   */
  private addResponseInterceptors() {
    this.axios.interceptors.response.use((response: AxiosResponse) => {
      if (!response.data.success) {
        return Promise.reject(response.data.error);
      }
      return response;
    });
  }

  /**
   * This function checks if we need to queue the api or not, if not then it makes get http call.
   * @param  {string} url - Endpoint of the api.
   * @param  {any} params - Parameters requered for the  api.
   * @returns Promise
   */
  public get(url: string, params?: Record<string, any>): Promise<any> {
    return this.getApiCall(url, params);
  }

  /**
   * Function for making get api call.
   * @param  {string} url - url of the http.
   * @param  {any} params - parameters for the api call.
   * @returns Promise
   */
  private getApiCall(url: string, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.axios
          .get(url, {
            params: params,
          })
          .then((response: AxiosResponse) => {
            console.log("Response: ", url, response.data);
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.error("[get] error: ", url, error);
            reject(error);
          });
      });
    });
  }

  /**
   * Function to check if we need to queue the api or not, if not then it makes post http call.
   * @param  {string} url - Endpoint of the api.
   * @param  {any} data - Parameters requered for the  api.
   * @returns Promise
   */
  public post(url: string, data: any): Promise<any> {
    return this.postApiCall(url, data);
  }

  /**
   * Function for making post api call.
   * @param  {string} url - url of the http.
   * @param  {any} params - parameters for the api call.
   * @returns Promise
   */
  private postApiCall(url: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.axios
          .post(url, data)
          .then((response: AxiosResponse) => {
            console.log("Response: ", response.data);
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.error("[post] error: ", url, error);
            reject(error);
          });
      });
    });
  }
}
