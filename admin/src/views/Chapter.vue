<template>
  <el-breadcrumb>
    <el-breadcrumb-item to="/novels">小说管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="`/novels/${novelId}`">小说详情</el-breadcrumb-item>
    <el-breadcrumb-item>章节详情</el-breadcrumb-item>
  </el-breadcrumb>

  <section>
    <el-button @click="onSubmit">
      {{ isCreate ? "新增" : "更新" }}
    </el-button>

    <el-input v-model="form.title"></el-input>
  </section>

  <TinyMceEditor />
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import TinyMceEditor from "@/components/TinyMceEditor.vue";
import { apiCreateChapter } from "@/apis/chapter";

export default defineComponent({
  name: "Chapter",
  components: { TinyMceEditor },

  setup() {
    const { novelId, chapterId } = useRoute().params;
    const params = reactive({ novelId, chapterId });
    const isCreate = computed(() => params.chapterId === "new");
    const form = reactive({ title: "", content: "" });

    const init = () => {
      if (!isCreate.value) {
        console.log("获取章节");
      }
    };

    const onSubmit = async () => {
      if (isCreate.value) {
        console.log("add");
        await apiCreateChapter({ novel: novelId as string, ...form });
      } else {
        console.log("update");
      }
    };

    onMounted(init);

    return { novelId, isCreate, form, onSubmit };
  },
});
</script>
