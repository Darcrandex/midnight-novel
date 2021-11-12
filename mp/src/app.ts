import { createApp } from "vue";
import { Button, Toast } from "@nutui/nutui-taro";
import "@nutui/nutui-taro/dist/style.css";
import "@nutui/nutui-taro/dist/styles/themes/default.scss";

import "./app.scss";

const App = createApp({
  onShow(_options: unknown) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Button).use(Toast);

export default App;
