<template>
  <h1>CategoryItem</h1>
  <el-button @click="state.visible = true">
    {{ !!data ? "编辑" : "新增" }}
  </el-button>

  <el-dialog v-model="state.visible" title="Shipping address">
    <el-form :model="state.form">
      <el-form-item label="分组名称" label-width="8em">
        <el-input v-model="state.form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" label-width="8em">
        <div
          v-for="(item, idx) in state.form.children"
          :key="idx"
          style="margin-bottom: 10px;"
        >
          <el-input v-model.trim="item.name" autocomplete="off"></el-input>
          <el-button @click="() => state.form.children.splice(idx, 1)">
            删除
          </el-button>
        </div>

        <el-button @click="state.form.children.push({ name: '' })">
          添加分类
        </el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import _ from "lodash";

export default defineComponent({
  name: "CategoryEdit",
  props: {
    data: {} as PropType<{
      _id: string;
      name: string;
      children?: { name: string }[];
    }>,
  },
  emits: ["submit"],

  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      form: {
        name: props.data?.name,
        children: _.cloneDeep(props.data?.children || []),
      },
    });

    const resetData = () => {
      state.form = {
        name: props.data?.name,
        children: _.cloneDeep(props.data?.children || []),
      };
    };

    const onCancel = () => {
      state.visible = false;
      resetData();
    };

    const onSubmit = () => {
      if (props.data) {
        emit("submit", props.data._id, state.form);
      } else {
        emit("submit", state.form);
      }
      resetData();
      state.visible = false;
    };

    return { state, onCancel, onSubmit };
  },
});
</script>
