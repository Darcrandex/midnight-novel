import Taro from "@tarojs/taro";

const isDev = process.env.NODE_ENV === "development";
const baseURL = isDev ? "http://localhost:7895" : "";

async function fetch<Response = void>(
  options: Taro.request.Option
): Promise<Response> {
  const { url, method, ...rest } = options;

  // 请求拦截
  const res = await Taro.request({
    ...rest,
    url: baseURL + url,
    method,
    header: {
      Authorization: "token",
    },
  });

  // 响应拦截
  const data = res.data as Response & { code: number; msg?: string };
  if (data.code === 2000) {
    return data;
  } else {
    return Promise.reject();
  }
}

async function get<T>(url: string, options?: Taro.request.Option) {
  return await fetch<T>({ ...options, method: "GET", url });
}

async function post<T>(url: string, options?: Taro.request.Option) {
  return await fetch<T>({ ...options, method: "POST", url });
}

export { get, post };
