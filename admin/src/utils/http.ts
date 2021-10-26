import axios, { AxiosRequestConfig } from "axios";
import { ResponseStatus } from "@/enums";

// 自定义配置项
interface ICustomRequestConfig extends AxiosRequestConfig {
  useLoading?: boolean;
  useError?: boolean;
}

const axiosInstance = axios.create({
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

axiosInstance.interceptors.request.use((config: ICustomRequestConfig = {}) => {
  if (config.useLoading) {
    // 使用全局loading
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    if (res?.data?.code !== undefined) {
      switch (res?.data?.code) {
        case ResponseStatus.Success:
          return res.data;
        case ResponseStatus.InvalidToken:
          return Promise.reject("请先登录");
        default:
          return Promise.reject("请求失败");
      }
    } else {
      return Promise.reject(res);
    }
  },
  (err) => {
    if (err && typeof err.toJSON === "function") {
      const { useError } = err.toJSON().config || {};
      useError && console.error("网络异常", err);
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
