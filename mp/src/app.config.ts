export default {
  pages: [
    "pages/bookrack/index",
    "pages/library/index",
    "pages/rank/index",
    "pages/category/index",
    "pages/mine/index",

    "pages/all-rankings/index",
    "pages/history-rankings/index",

    "pages/novel-detail/index",
    "pages/search/index",
  ],

  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fcc800", // 导航栏背景颜色
    navigationBarTitleText: "", // 头部的标题内容
    navigationBarTextStyle: "black",
  },

  tabBar: {
    color: "#707070",
    selectedColor: "#fcc800",
    backgroundColor: "#fefefe",
    list: [
      {
        pagePath: "pages/bookrack/index",
        text: "书架",
        iconPath: "assets/icons/tab-navs-bookrack.png",
        selectedIconPath: "assets/icons/tab-navs-bookrack-active.png",
      },
      {
        pagePath: "pages/library/index",
        text: "书城",
        iconPath: "assets/icons/tab-navs-library.png",
        selectedIconPath: "assets/icons/tab-navs-library-active.png",
      },
      {
        pagePath: "pages/rank/index",
        text: "排行榜",
        iconPath: "assets/icons/tab-navs-rank.png",
        selectedIconPath: "assets/icons/tab-navs-rank-active.png",
      },
      {
        pagePath: "pages/category/index",
        text: "分类",
        iconPath: "assets/icons/tab-navs-category.png",
        selectedIconPath: "assets/icons/tab-navs-category-active.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "assets/icons/tab-navs-mine.png",
        selectedIconPath: "assets/icons/tab-navs-mine-active.png",
      },
    ],
  },
};
