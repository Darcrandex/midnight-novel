<template>
  <Edit @submit="handleCreate" />

  <div v-for="group in state.list" :key="group._id">
    <h2>{{ group.name }}</h2>
    <Edit @submit="handleUpdate" :data="group" />
    <el-button @click="handleRemove(group._id)">删除</el-button>

    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(item, idx) in group.children"
        :key="`${idx}-${item.name}`"
      >
        <div>{{ item.name }}</div>
      </el-col>
    </el-row>

    <el-divider></el-divider>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import Edit from "./Edit.vue";
import {
  apiGetCategories,
  apiCreateCategory,
  apiUpdateCategory,
  apiRemoveCategory,
} from "@/apis/category";

interface State {
  list: { _id: string; name: string; children: { name: string }[] }[];
  total: number;
}

export default defineComponent({
  name: "Categories",
  components: { Edit },

  setup() {
    const state: State = reactive({
      list: [],
      total: 0,
    });

    const getList = async () => {
      const res = await apiGetCategories();
      state.list = res.list as State["list"];
      state.total = res.total;
    };

    const handleCreate = async (payload = {}) => {
      await apiCreateCategory(payload);
      await getList();
    };

    const handleUpdate = async (id: string, payload = {}) => {
      await apiUpdateCategory(id, payload);
      await getList();
    };

    const handleRemove = async (id: string) => {
      await apiRemoveCategory(id);
      await getList();
    };

    onMounted(async () => {
      getList();
    });

    return { state, handleCreate, handleUpdate, handleRemove };
  },
});
</script>
