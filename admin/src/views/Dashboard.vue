<template>
  <h1>dashboard</h1>

  <router-link to="/novel-list">novel list</router-link>
  <router-link to="/234343">empty route</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Dashboard",
});
</script>
