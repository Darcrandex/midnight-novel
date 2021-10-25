import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { Roles } from "@/enums";

// 按模块打包
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// import(/* webpackChunkName: "about" */ "../views/About.vue"),

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          title: "仪表盘",
          ico: "el-icon-data-line",
          roles: [Roles.Admin, Roles.Writer],
        },
      },
      {
        path: "/novels",
        name: "Novels",
        component: () => import("@/views/Novels.vue"),
        meta: {
          title: "小说管理",
          ico: "el-icon-collection",
          roles: [Roles.Admin, Roles.Writer],
        },
      },
      {
        path: "/novels/:novelId",
        name: "Novel",
        component: () => import("@/views/Novel.vue"),
        meta: { roles: [Roles.Admin, Roles.Writer] },
      },
      {
        path: "/novels/:novelId/:chapterId",
        name: "Chapter",
        component: () => import("@/views/Chapter.vue"),
        meta: { roles: [Roles.Admin, Roles.Writer] },
      },

      {
        path: "/categories",
        name: "Categories",
        component: () => import("@/views/Categories.vue"),
        meta: {
          title: "分类管理",
          ico: "el-icon-menu",
          roles: [Roles.Admin, Roles.Writer],
        },
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/403",
    component: () => import("@/views/403.vue"),
  },
  {
    // 4.x 版本匹配空路由的设置方法(https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes)
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
