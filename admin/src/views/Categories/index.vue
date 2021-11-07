<template>
  <EditModal @submit="handleCreate">
    <template #default="{onClick}">
      <el-button type="primary" @click="onClick">新增分类</el-button>
    </template>
  </EditModal>

  <el-table :data="list">
    <el-table-column label="分组" width="220">
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="子分类">
      <template #default="scope">
        {{ scope.row.children?.map((v:{name:String}) => v.name).join('，') }}
      </template>
    </el-table-column>

    <el-table-column label="操作" width="200">
      <template #default="scope">
        <EditModal :data="scope.row" @submit="handleUpdate">
          <template #default="{onClick}">
            <el-button size="small" @click="onClick">编辑</el-button>
          </template>
        </EditModal>

        <el-popconfirm title="真的要删除吗?" @confirm="handleRemove(scope.row._id)">
          <template #reference>
            <el-button size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EditModal, { Category } from './EditModal.vue'
import { apiGetCategories, apiCreateCategory, apiUpdateCategory, apiRemoveCategory } from '@/apis/category'

const list = ref<Category[]>([])

const getList = async () => {
  const res = await apiGetCategories()
  list.value = (res.list as unknown) as Category[]
}

const handleCreate = async (payload: Category) => {
  await apiCreateCategory({ name: payload.name, children: payload.children })
  await getList()
}

const handleUpdate = async (payload: Category) => {
  await apiUpdateCategory(payload._id, { name: payload.name, children: payload.children })
  await getList()
}

const handleRemove = async (id: string) => {
  await apiRemoveCategory(id)
  await getList()
}

onMounted(getList)
</script>
