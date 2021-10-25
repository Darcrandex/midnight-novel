<template>
  <el-container>
    <el-aside>
      <el-menu
        :default-active="$route.path"
        :router="true"
        style="height: 100vh;"
      >
        <el-menu-item v-for="item in menus" :key="item.path" :index="item.path">
          <template #title>
            <i class="el-icon-location"></i>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        header
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
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
