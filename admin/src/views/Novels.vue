<template>
  <h1>NovelManagement</h1>

  <router-link to="/novels/new">
    <el-button>
      新增小说
    </el-button>
  </router-link>

  <ul>
    <li v-for="novel in state.list" :key="novel._id">
      <h2>{{ novel.name }}</h2>
      <router-link :to="`/novels/${novel._id}`">{{ novel.name }}</router-link>
      <el-button @click="remove(novel._id)">删除</el-button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { apiGetNovels, apiRemoveNovel } from "@/apis/novel";

interface Novel {
  _id: string;
  name: string;
}

export default defineComponent({
  name: "Novels",

  setup() {
    const state: { list: Novel[] } = reactive({ list: [] });

    const getList = async () => {
      state.list = ((await apiGetNovels()).list as unknown) as Novel[];
    };

    const remove = async (id: string) => {
      await apiRemoveNovel(id);
      await getList();
    };

    onMounted(getList);

    return { state, remove };
  },
});
</script>
