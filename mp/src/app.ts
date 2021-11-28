import { createApp } from "vue";

import Taro from "@tarojs/taro";
import { Button, Toast, Layout, Row, Col, Tag } from "@nutui/nutui-taro";
import "@nutui/nutui-taro/dist/style.css";
import "@nutui/nutui-taro/dist/styles/themes/default.scss";

import "./app.scss";

const App = createApp({
  onShow(_options: unknown) {
    if (Taro.loadFontFace) {
      Taro.loadFontFace({
        family: "Bitstream Vera Serif Bold",
        source: 'url("https://sungd.github.io/Pacifico.ttf")',
        success: console.log,
      });
    }
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Button)
  .use(Toast)
  .use(Layout)
  .use(Row)
  .use(Col)
  .use(Tag);

export default App;
