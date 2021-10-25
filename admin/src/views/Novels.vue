<template>
  <h1>NovelManagement</h1>

  <ul>
    <li v-for="novel in list" :key="novel.id">
      <h2>{{ novel.name }}</h2>
      <router-link :to="`/novels/${novel.id}`">{{ novel.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Novels",

  setup() {
    const list = [{ id: "146", name: "abc" }];

    return { list };
  },
});
</script>
