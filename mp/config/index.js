const path = require("path");

const config = {
  projectName: "mp",
  date: "2021-11-13",
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sass: {
    // 修改默认主题
    resource: [
      path.resolve(__dirname, "..", "src/assets/styles/custom_theme.scss"),
      path.resolve(__dirname, "..", "src/assets/styles/variables.scss"),
      path.resolve(__dirname, "..", "src/assets/styles/mixins.scss"),
    ],
  },

  // 资源路径别名
  alias: {
    "@/apis": path.resolve(__dirname, "..", "src/apis"),
    "@/assets": path.resolve(__dirname, "..", "src/assets"),
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/interface": path.resolve(__dirname, "..", "src/interface"),
    "@/pages": path.resolve(__dirname, "..", "src/pages"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),

    "@/package": path.resolve(__dirname, "..", "package.json"),
    "@/project": path.resolve(__dirname, "..", "project.config.json"),
  },

  sourceRoot: "src",
  outputRoot: "dist",
  plugins: ["@tarojs/plugin-html"],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "vue3",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          // 在使用 vue 时, 只有 global 模式才生效
          namingPattern: "global", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
