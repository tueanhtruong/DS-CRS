import axios from 'axios';
import { ApiUrlConfig } from 'src/modules/Config';
import { AxiosClient } from './axiosClient';

axios.defaults.withCredentials = true;
export const httpService = new AxiosClient(
  {
    baseURL: new ApiUrlConfig().apiUrl,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    timeout: 30000,
  },
  {},
);

export {
  authResponseWrapper,
  configApiInstance,
  getResponseData,
  newAbortController,
  responseWrapper,
  saveToLocalStorage,
} from './helpers';

export type {
  ApiPaginationResponseType,
  ApiResponseType,
  PaginationResponseType,
} from './helpers';
