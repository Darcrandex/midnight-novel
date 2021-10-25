<template>
  <el-breadcrumb>
    <el-breadcrumb-item to="/novels">小说管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="`/novels/${novelId}`">小说详情</el-breadcrumb-item>
    <el-breadcrumb-item>章节详情</el-breadcrumb-item>
  </el-breadcrumb>

  <TinyMceEditor />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import TinyMceEditor from "@/components/TinyMceEditor.vue";

export default defineComponent({
  name: "Chapter",
  components: { TinyMceEditor },

  setup() {
    const { novelId, chapterId } = useRoute().params;
    console.log(novelId, chapterId);

    return { novelId, chapterId };
  },
});
</script>
