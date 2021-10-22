import { createApp } from "vue";

import storePlugin from "./store";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(storePlugin)
  .use(router)
  .mount("#app");
