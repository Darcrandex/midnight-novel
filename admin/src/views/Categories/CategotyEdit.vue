<template>
  <el-dialog v-model="visible" title="分类编辑">
    <el-form label-width="8em">
      <el-form-item label="名称" :required="true">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="种类">
        <el-select v-model="form.kind" placeholder="请选择关联的种类">
          <el-option v-for="item in kindOptions" :key="item._id" :label="item.name" :value="item._id || ''" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 自定义触发按钮 -->
  <slot v-bind:onClick="onOpen"></slot>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, reactive } from 'vue'
import { Kind, Category } from '@/interface/data-model'

const props = defineProps<{ data?: Category; kindOptions: Kind[] }>()
const emits = defineEmits<{ (e: 'submit', form: Category): void }>()

const visible = ref(false)
const form = reactive<Category>({ _id: undefined, name: '', description: '', kind: '' })

const onOpen = () => {
  visible.value = true
  form._id = props.data?._id
  form.name = props.data?.name ?? ''
  form.description = props.data?.description ?? ''
  form.kind = props.data?.kind ?? ''
}
const onCancel = () => {
  visible.value = false
}
const onSubmit = () => {
  visible.value = false
  emits('submit', form)
}
</script>
