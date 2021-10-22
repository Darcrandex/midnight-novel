<template>
  <h1 class="box">Login</h1>
  <p>name: {{ user.state.nickname }}</p>
  <button @click="user.randomName">set</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Login",
  setup() {
    const { user } = useStore();
    return { user };
  },
});
</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;
}
</style>
