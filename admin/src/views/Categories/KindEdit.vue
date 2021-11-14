<template>
  <el-dialog v-model="visible" title="种类编辑">
    <el-form label-width="8em">
      <el-form-item label="名称" :required="true">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" autocomplete="off" />
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
import { Kind } from '@/interface/data-model'

const props = defineProps<{ data?: Kind }>()
const emits = defineEmits<{ (e: 'submit', form: Kind): void }>()

const visible = ref(false)
const form = reactive<Kind>({ _id: undefined, name: '', description: '' })

const onOpen = () => {
  visible.value = true
  form._id = props.data?._id
  form.name = props.data?.name ?? ''
  form.description = props.data?.description ?? ''
}
const onCancel = () => {
  visible.value = false
}
const onSubmit = () => {
  visible.value = false
  emits('submit', form)
}
</script>
