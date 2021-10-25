<template>
  <el-header class="home-header">Header</el-header>

  <aside class="home-aside">
    <el-menu :default-active="$route.path" :router="true">
      <el-menu-item v-for="item in menus" :key="item.path" :index="item.path">
        <template #title>
          <i class="el-icon-location"></i>
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
        .map((v) => ({ path: v.path, title: v?.meta?.title })) ?? [];

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
  width: 100%;
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
