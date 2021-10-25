<template>
  <el-header class="home-header">
    <span>MidnightNovel</span>
    <div class="header-right">
      <i
        class="el-icon-message-solid"
        style="font-size: 24px;margin-right: 20px;"
      ></i>
      <el-avatar> user </el-avatar>
    </div>
  </el-header>

  <aside class="home-aside">
    <el-menu
      :default-active="$route.path"
      :router="true"
      style="height: 100vh;"
    >
      <el-menu-item v-for="item in menus" :key="item.path" :index="item.path">
        <template #title>
          <i :class="item.ico"></i>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </aside>

  <section class="home-content">
    <el-main>
      <router-view></router-view>
    </el-main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { routes } from "@/router";
import { useStore } from "@/store";

export default defineComponent({
  name: "Home",

  setup() {
    const { user } = useStore();
    const root = routes.find((v) => v.path === "/")?.children;

    const menus =
      root
        ?.filter((v) => v.meta && v.meta.title)
        .filter((v) => user.haveRoles(v?.meta?.roles as string[]))
        .map((v) => ({
          path: v.path,
          title: v?.meta?.title,
          ico: v?.meta?.ico,
        })) ?? [];

    return { menus };
  },
});
</script>

<style lang="scss">
$header-height: 60px;
$aside-width: 200px;

.home-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(#000, 0.2);
}

.header-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.home-aside {
  position: fixed;
  top: $header-height;
  left: 0;
  width: $aside-width;
}

.home-content {
  margin-top: $header-height;
  margin-left: $aside-width;
}
</style>
