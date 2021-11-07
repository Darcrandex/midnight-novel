<template>
  <el-dialog v-model="visible" title="分类编辑">
    <el-form label-width="8em">
      <el-form-item label="分组名称">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类">
        <el-button @click="form.children?.unshift({ name: '' })">
          添加分类
        </el-button>

        <div v-for="(item, idx) in form.children" :key="`${idx}-${item.name}`" style="margin-top: 10px;">
          <el-input v-model.trim="item.name" autocomplete="off" style="width: 15em; margin-right: 16px;" />
          <el-button @click="() => form.children?.splice(idx, 1)">
            删除
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <slot v-bind:onClick="handleOpen"></slot>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, ref, reactive } from 'vue'
import _ from 'lodash'

export interface Category {
  _id: string
  name: string
  children?: { name: string }[]
}

const props = withDefaults(defineProps<{ data?: Category }>(), {})
const emits = defineEmits<{ (e: 'submit', form: Category): void }>()

const visible = ref(false)
const form = reactive<Category>({ _id: props.data?._id || '', name: props.data?.name || '', children: _.cloneDeep(props.data?.children || []) })

const resetData = () => {
  form.name = props.data?.name || ''
  form.children = _.cloneDeep(props.data?.children || [])
}

const onCancel = () => {
  visible.value = false
  resetData()
}

const onSubmit = () => {
  emits('submit', _.cloneDeep(form))
  resetData()
  visible.value = false
}

const handleOpen = () => (visible.value = true)
</script>
