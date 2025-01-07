/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  /**
   * user name of user account
   * @example "tue_truong"
   */
  username: string;
  /**
   * display name of user account
   * @example "Tue Truong"
   */
  displayName: string;
  /**
   * meta date of user account
   * @example {"key":"value"}
   */
  metaData?: object;
}

export interface LoginUserDto {
  /**
   * user name of user account
   * @example "tue_truong"
   */
  username: string;
}

export interface CreateEventDto {
  /**
   * user name of event
   * @example "tue_truong"
   */
  username: string;
  /**
   * meta date of event
   * @example {"key":"value"}
   */
  metaData?: object;
  /**
   * id of event (update case only)
   * @example ""
   */
  id?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Swagger API
 * @version 0.1
 * @contact
 *
 * The Swagger API documents
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Health
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpsert
     * @request POST:/users/upsert
     */
    usersControllerUpsert: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/upsert`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindAll
     * @request GET:/users
     */
    usersControllerFindAll: (
      query?: {
        /**
         * user name of user account
         * @example "tue_truong"
         */
        username?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/users`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users Auth
     * @name UsersAuthControllerLogin
     * @request POST:/users/login
     */
    usersAuthControllerLogin: (
      data: LoginUserDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/users/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users Auth
     * @name UsersAuthControllerFindMe
     * @request GET:/users/me
     * @secure
     */
    usersAuthControllerFindMe: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/me`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
  events = {
    /**
     * No description
     *
     * @tags Events
     * @name EventsControllerUpsert
     * @request POST:/events/upsert
     */
    eventsControllerUpsert: (
      data: CreateEventDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/upsert`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name EventsControllerFindAll
     * @request GET:/events
     */
    eventsControllerFindAll: (
      query?: {
        /**
         * user name create event
         * @example "tue_truong"
         */
        username?: string;
        /**
         * id of event
         * @example ""
         */
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
}
