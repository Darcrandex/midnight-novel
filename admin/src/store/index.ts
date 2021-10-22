import { App, InjectionKey, readonly, inject } from "vue";
import user from "./modules/user";

const createStore = () => ({ user });

// 定义store的泛型
type TStore = ReturnType<typeof createStore>;

const key: InjectionKey<TStore> = Symbol();

const store = createStore();

export function useStore(): TStore {
  const store = inject<TStore>(key);
  if (!store) {
    throw new Error("store is undefined");
  }

  return store;
}

// 使用vue插件模式引入
const storePlugin = {
  install(Vue: App): void {
    Vue.provide(key, readonly(store));
  },
};

export default storePlugin;
