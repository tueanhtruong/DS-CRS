import apisauce, { ApiResponse, ApisauceConfig } from 'apisauce';
import { IHttpServiceClient } from './IHttpServiceClient';
import { configApiInstance } from './helpers';

export type IAxiosOptions = ApisauceConfig;

export class AxiosClient implements IHttpServiceClient<IAxiosOptions> {
  public options: ApisauceConfig;

  private axiosInstance: ReturnType<(typeof apisauce)['create']>;

  constructor(
    options: ApisauceConfig,
    custom: {
      isPrivateApi?: boolean;
    },
  ) {
    this.options = options;
    this.axiosInstance = apisauce.create({
      ...options,
    });
    const { isPrivateApi = true } = custom;
    configApiInstance(this.axiosInstance, isPrivateApi);
  }

  public get<TResponse = unknown, TParams = unknown>(
    url: string,
    params?: TParams,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.get(url, params ?? {}, options);
  }

  public head<TResponse = unknown, TParams = unknown>(
    url: string,
    params?: TParams,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.head(url, params ?? {}, options);
  }

  public post<TResponse = unknown, TBody = unknown>(
    url: string,
    body: TBody,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.post(url, body, options);
  }

  public put<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.put(url, body, options);
  }

  public patch<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.patch(url, body, options);
  }

  public delete<TResponse = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Partial<IAxiosOptions>,
  ): Promise<ApiResponse<TResponse>> {
    return this.axiosInstance.delete(url, body ?? {}, options);
  }

  public getOptions() {
    return this.options;
  }
}
