/* eslint-disable */
// @ts-nocheck

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

const apiClient = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL || 'http://localhost:5101',
  baseURL: process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL || 'https://localhost:7128',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isLoggingOut = false;


apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const backendError = error.response?.data as any;
    const statusCode =
      backendError?.statusCode ||
      backendError?.StatusCode ||
      error.response?.status;

    const message =
      backendError?.message ||
      backendError?.Message ||
      "Ocurrió un error inesperado";

    // toast.error(`Error ${statusCode}: ${message}`);
    toast.error(`${message}`);

    return Promise.reject(error);
  }
);


export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
export interface CustomRequestConfig<T> {
  url: string;
  method: HttpMethod;
  data?: T;
  headers?: Record<string, string>;
  params?: any;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  timeout?: number;
  signal?: AbortSignal;
  responseType?: AxiosRequestConfig["responseType"];
}

export const customRequest = <TRequest = unknown, TResponse = unknown>(
  config: CustomRequestConfig<TRequest>
): Promise<AxiosResponse<TResponse>> => {
  const source = axios.CancelToken.source();
  
  const axiosConfig: AxiosRequestConfig<TRequest> = {
    url: config.url,
    method: config.method,
    data: config.data,
    headers: {
      ...config.headers,
      ...(config.data instanceof FormData ? {} : config.headers),
    },
    params: config.params,
    timeout: config.timeout ?? 10000,
    cancelToken: source.token,
    responseType: config.responseType,
  };

  if (config.signal) {
    config.signal.addEventListener('abort', () => {
      source.cancel('Request aborted by signal');
    });
  }

  return apiClient.request<TResponse>(axiosConfig);
};

export default apiClient;

export const handleAxiosError = (
  error: unknown,
  defaultMessage = "Ocurrió un error desconocido"
) => {
  if (axios.isCancel(error)) {
    return;
  }

  let errorMessage = defaultMessage;

  if (error instanceof AxiosError) {
    errorMessage = error.response?.data?.message || defaultMessage;
  }
};

export const showSuccessNotification = (message: string) => {
};

