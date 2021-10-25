<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "App",
  setup() {
    const mainRouter = useRouter();
    const { user } = useStore();

    // 校验用户权限
    mainRouter.beforeEach((to, from, next) => {
      // 判断是否需要校验
      if (to.meta && Array.isArray(to.meta.roles)) {
        // 判断用户是否有权限
        const haveAuth = user.haveRoles(to.meta.roles);
        if (haveAuth) {
          next();
        } else {
          next("/403");
        }
      } else {
        next();
      }
    });
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  color: $text-color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
