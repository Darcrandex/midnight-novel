import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { Roles } from "@/enums";

// 按模块打包
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// import(/* webpackChunkName: "about" */ "../views/About.vue"),

const routes: Array<RouteRecordRaw> = [
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
        meta: { roles: [Roles.Admin, Roles.Writer] },
      },
      {
        path: "/novels",
        name: "NovelManagement",
        component: () => import("@/views/NovelManagement.vue"),
        meta: { roles: [Roles.Admin, Roles.Writer] },
      },
      {
        path: "/novels/:novelId",
        name: "NovelItem",
        component: () => import("@/views/NovelItem.vue"),
        meta: { roles: [Roles.Admin, Roles.Writer] },
      },
      {
        path: "/novels/:novelId/:chapterId",
        name: "Chapter",
        component: () => import("@/views/Chapter.vue"),
        meta: { roles: [Roles.Admin, Roles.Writer] },
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
