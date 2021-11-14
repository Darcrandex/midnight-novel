export default {
  pages: [
    "pages/bookrack/index",
    "pages/library/index",
    "pages/rank/index",
    "pages/category/index",
    "pages/mine/index",
  ],

  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "",
    navigationBarTextStyle: "black",
  },

  tabBar: {
    list: [
      { pagePath: "pages/bookrack/index", text: "bookrack" },
      { pagePath: "pages/library/index", text: "library" },
      { pagePath: "pages/rank/index", text: "rank" },
      { pagePath: "pages/category/index", text: "category" },
      { pagePath: "pages/mine/index", text: "mine" },
    ],
  },
};
