import axios, {AxiosRequestHeaders} from "axios";
import {Action, OnChange} from "../contracts/common.contracts";
import {ApiError} from "../contracts/api/error.contracts";
import {containFields} from "../utils/object.utils";
import authStorage from "../storage/AuthStorage";
import api from "./index";
import {isSuccessResponse} from "../utils/axios.utils";

const apiClient = axios.create();

interface Configuration {
  onError: OnChange<ApiError>;
  onLogout: Action;
}

export const configure = (configuration: Configuration) => {
  apiClient.interceptors.request.use(
    (config) => {
      const additionalHeaders = {} as AxiosRequestHeaders;

      additionalHeaders['Accept-Language'] = 'en-US';

      const authData = authStorage.get();

      console.debug('auth data', authData);
      if (authData) {
        additionalHeaders.Authorization = `Bearer ${authData.accessToken}`;
      }

      config.headers = {
        ...config.headers,
        ...additionalHeaders
      } as AxiosRequestHeaders

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const authData = authStorage.get();
      if (isForbiddenResponse(error) && !originalRequest._retry && authData) {
        originalRequest._retry = true;
        try {
          console.debug('try refresh token');
          const tokenResponse = await api.auth.refresh({ refreshToken: authData.refreshToken });
          if (isSuccessResponse(tokenResponse)) {
            authStorage.set(tokenResponse.data);
            originalRequest.headers.Authorization = `Bearer ${tokenResponse.data.accessToken}`;
            console.debug('Refresh token success');
            return apiClient(originalRequest);
          }
          console.debug('Refresh token fail. Logout');
          configuration.onLogout();
          return Promise.reject(error);
        } catch (_error) {
          console.debug('Refresh token fail. Logout');
          configuration.onLogout();
          return Promise.reject(error);
        }
      }
      const data = error.response && error.response.data;
      if (isApiError(data)) {
        configuration.onError(data);
      }
      return Promise.reject(error);
    }
  );
}

const isForbiddenResponse = (error: any): boolean => {
  return error.response && error.response.status === 403;
}

const isApiError = (data: any): data is ApiError => {
  return (data && containFields(data, 'code', 'message'));
}

export default apiClient;