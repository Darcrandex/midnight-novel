<template>
  <router-link to="/novels/new">
    <el-button type="primary">
      新增小说
    </el-button>
  </router-link>

  <el-table :data="state.list" style="width: 100%" row-key="_id">
    <el-table-column label="名称">
      <template #default="scope">
        <router-link :to="`/novels/${scope.row._id}`">
          <el-link type="primary">
            {{ scope.row.name }}
          </el-link>
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="author" label="作者" width="300" />
    <el-table-column width="200" label="操作">
      <template #default="scope">
        <el-popconfirm title="真的要删除吗?" @confirm="remove(scope.row)">
          <template #reference>
            <el-button size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    layout="prev, pager, next"
    :total="state.total"
    v-model="state.page"
    :hide-on-single-page="true"
  ></el-pagination>
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
    const state: { list: Novel[]; total: number; page: number } = reactive({
      list: [],
      total: 0,
      page: 1,
    });

    const getList = async () => {
      const res = await apiGetNovels();
      state.list = (res.list as unknown) as Novel[];
      state.total = res.total;
    };

    const remove = async (recode: Novel) => {
      await apiRemoveNovel(recode._id);
      await getList();
    };

    onMounted(getList);

    return { state, remove };
  },
});
</script>
