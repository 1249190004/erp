import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface TDRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface TDRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TDRequestInterceptors<T>
  showLoading?: boolean
}
