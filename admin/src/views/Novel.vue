<template>
  <el-breadcrumb>
    <el-breadcrumb-item to="/novels">小说管理</el-breadcrumb-item>
    <el-breadcrumb-item>小说详情</el-breadcrumb-item>
  </el-breadcrumb>

  <section>
    <el-button @click="onSubmit">{{ isCreate ? "新增" : "更新" }}</el-button>
  </section>

  <section>
    <el-form v-model="form">
      <el-input v-model="form.name"></el-input>
      <el-input v-model="form.author"></el-input>
    </el-form>
  </section>

  <section v-show="isCreate">
    <h2>章节</h2>
    <p>请先重建小说</p>
  </section>

  <section v-show="!isCreate">
    <h2>章节</h2>
    <router-link :to="`/novels/${novelId}/new`">
      <el-button>新增章节</el-button>
    </router-link>

    <ol>
      <li v-for="item in form.chapters" :key="item._id">
        <router-link :to="`/novels/${novelId}/${item._id}`">{{ item.title }}</router-link>
        <el-button @click="onRemoveChapter(item._id)">删除</el-button>
      </li>
    </ol>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiGetNovelById, apiCreateNovel, apiUpdateNovel } from "@/apis/novel";
import { apiRemoveChapter } from '@/apis/chapter'

interface Novel {
  name: string;
  author: string;
  chapters: { _id: string; title: string }[];
}

export default defineComponent({
  name: "Novel",
  setup() {
    const router = useRouter();
    const novelId = ref(useRoute().params.novelId as string);
    const isCreate = computed(() => novelId.value === "new");
    const form: Novel = reactive({
      name: "",
      author: "",
      chapters: [],
    });

    const init = async () => {
      if (!isCreate.value) {
        const { record } = await apiGetNovelById(novelId.value as string);
        form.name = record?.name as string;
        form.author = record.author as string;
        form.chapters = record.chapters as Novel["chapters"];
      }
    };

    const onSubmit = async () => {
      if (isCreate.value) {
        const { id: recordId } = await apiCreateNovel(form);

        // 用于解决路由刷新的问题
        novelId.value = recordId;
        await router.replace(`/novels/${recordId}`);
      } else {
        await apiUpdateNovel(novelId.value as string, form);
      }

      await init();
    };

    const onRemoveChapter = async (chapterId: string) => {
      await apiRemoveChapter({ novelId: novelId.value, chapterId })
      await init();
    }

    onMounted(init);

    return { form, novelId, isCreate, onSubmit, onRemoveChapter };
  },
});
</script>
