<template>
  <el-breadcrumb>
    <el-breadcrumb-item to="/novels">小说管理</el-breadcrumb-item>
    <el-breadcrumb-item>小说详情</el-breadcrumb-item>
  </el-breadcrumb>

  <h1>{{ data.name }}</h1>

  <p>章节</p>
  <ol>
    <li v-for="chapter in data.chapters" :key="chapter.id">
      <router-link :to="`/novels/${data.id}/${chapter.id}`">
        {{ chapter.name }}
      </router-link>
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Novel",
  setup() {
    const { novelId } = useRoute().params;

    const data = {
      id: novelId,
      name: "bababababab",
      chapters: [{ id: "1234", name: "bbbbbbbbbb" }],
    };

    return { data };
  },
});
</script>
