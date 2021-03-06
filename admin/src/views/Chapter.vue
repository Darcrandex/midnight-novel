<template>
  <el-breadcrumb>
    <el-breadcrumb-item to="/novels">小说管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="`/novels/${novelId}`">小说详情</el-breadcrumb-item>
    <el-breadcrumb-item>章节详情</el-breadcrumb-item>
  </el-breadcrumb>

  <section style="margin-top: 16px;">
    <el-button type="primary" @click="onSubmit">
      {{ isCreate ? "新增" : "更新" }}
    </el-button>
  </section>

  <el-form label-position="top" style="margin-top: 16px;">
    <el-form-item label="标题">
      <el-input v-model="form.title" placeholder="请输入章节标题"></el-input>
    </el-form-item>
    <el-form-item label="正文">
      <TinyMceEditor v-model="form.content" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TinyMceEditor from "@/components/TinyMceEditor.vue";
import {
  apiCreateChapter,
  apiGetChapter,
  apiUpdateChapter,
} from "@/apis/chapter";

interface Chapter {
  title: string;
  content: string;
}

export default defineComponent({
  name: "Chapter",
  components: { TinyMceEditor },

  setup() {
    const router = useRouter();
    const novelId = ref(useRoute().params.novelId as string);
    const chapterId = ref(useRoute().params.chapterId as string);
    const isCreate = computed(() => chapterId.value === "new");
    const form: Chapter = reactive({ title: "", content: "" });

    const init = async () => {
      if (!isCreate.value) {
        const res = await apiGetChapter(chapterId.value);
        form.title = res.data.title as string;
        form.content = res.data.content as string;
      }
    };

    const onSubmit = async () => {
      if (isCreate.value) {
        const { data: id } = await apiCreateChapter({
          novel: novelId.value as string,
          ...form,
        });
        await router.replace(`/novels/${novelId.value}/${id}`);
        chapterId.value = id;
      } else {
        await apiUpdateChapter(chapterId.value, form);
      }
      init();
    };

    onMounted(init);

    return { novelId, isCreate, form, onSubmit };
  },
});
</script>
