<template>
  <el-tabs v-model="activeTabName">
    <el-tab-pane label="种类列表" name="kinds">
      <el-table :data="kinds">
        <el-table-column label="种类名称" prop="name" width="220" />
        <el-table-column label="描述" prop="description" />

        <el-table-column width="200">
          <template #header>
            <KindEdit @submit="editKind">
              <template #default="{onClick}">
                <el-button size="small" type="primary" @click="onClick">新增</el-button>
              </template>
            </KindEdit>
            <el-button size="small" @click="getKinds">刷新</el-button>
          </template>

          <template #default="scope">
            <KindEdit :data="scope.row" @submit="editKind">
              <template #default="{onClick}">
                <el-button size="small" @click="onClick">编辑</el-button>
              </template>
            </KindEdit>
            <el-popconfirm title="真的要删除吗?" confirmButtonText="确定" cancelButtonText="取消" @confirm="removeKind(scope.row._id)">
              <template #reference>
                <el-button size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="分类列表" name="categories">
      <el-table :data="categories">
        <el-table-column label="分类名称" prop="name" width="220" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="所属种类" prop="kind.name" />

        <el-table-column width="200">
          <template #header>
            <CategotyEdit :kindOptions="kinds" @submit="editCategory">
              <template #default="{onClick}">
                <el-button size="small" type="primary" @click="onClick">新增</el-button>
              </template>
            </CategotyEdit>
            <el-button size="small" @click="getCategories">刷新</el-button>
          </template>

          <template #default="scope">
            <CategotyEdit :data="scope.row" :kindOptions="kinds" @submit="editCategory">
              <template #default="{onClick}">
                <el-button size="small" @click="onClick">编辑</el-button>
              </template>
            </CategotyEdit>
            <el-popconfirm title="真的要删除吗?" confirmButtonText="确定" cancelButtonText="取消" @confirm="removeCategory(scope.row._id)">
              <template #reference>
                <el-button size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Kind, Category } from '@/interface/data-model'
import KindEdit from './KindEdit.vue'
import CategotyEdit from './CategotyEdit.vue'
import { apiUpdateKind, apiGetKinds, apiRemoveKind, apiGetCategories, apiCreateCategory, apiUpdateCategory, apiRemoveCategory } from '@/apis/category'

const activeTabName = ref('kinds')

const kinds = ref<Kind[]>([])
const getKinds = async () => {
  const { list } = await apiGetKinds()
  kinds.value = list
}
const editKind = async (record: Kind) => {
  await apiUpdateKind(record)
  await getKinds()
}
const removeKind = async (id: string) => {
  await apiRemoveKind(id)
  await getKinds()
}

const categories = ref<Category[]>([])
const totalCategoryCount = ref(0)
const getCategories = async () => {
  const { list, total } = await apiGetCategories()
  categories.value = list
  totalCategoryCount.value = total
}
const editCategory = async (record: Kind) => {
  if (record._id) {
    await apiUpdateCategory(record)
  } else {
    await apiCreateCategory(record)
  }
  await getCategories()
}
const removeCategory = async (id: string) => {
  await apiRemoveCategory(id)
  await getCategories()
}
onMounted(() => {
  getKinds()
  getCategories()
})
</script>
