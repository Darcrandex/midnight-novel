<template>
  <h1>CategoryManagement</h1>
  <div v-for="group in resource" :key="group.name">
    <h2>{{ group.name }}</h2>

    <el-row :gutter="20">
      <el-col :span="6" v-for="item in group.children" :key="item.name">
        <div>{{ item.name }}</div>
      </el-col>
    </el-row>

    <el-divider></el-divider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Categories",

  setup() {
    const resource = [
      {
        name: "g1",
        sort: 1,
        children: [{ name: "gg1", sort: 1 }],
      },
    ];

    return { resource };
  },
});
</script>
