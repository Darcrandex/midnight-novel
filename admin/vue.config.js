const path = require("path");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  devServer: {
    port: 5245,
    proxy: "http://localhost:4000",
  },

  // 打包配置
  publicPath: "./",

  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      // element plus 按需加载
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/*.scss")],
    },
  },
};
