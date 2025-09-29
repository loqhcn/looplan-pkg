import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
interface CreateApiOptions {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig> | any;
    responseInterceptors?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    baseInterceptors?: boolean;
}
/**
 * 创建 API 实例
 * @param options 配置选项
 * @returns Axios 实例
 */
declare function createApi(options?: CreateApiOptions): AxiosInstance;
export { createApi };
export default axios;
