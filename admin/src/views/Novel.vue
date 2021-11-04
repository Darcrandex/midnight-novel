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

      <el-checkbox-group v-model="form.categories">
        <section v-for="group in categoryOptions" :key="group._id">
          <p>{{ group.name }}</p>

          <el-checkbox v-for="opt in group.children" :key="opt._id" :label="opt._id">{{ opt.name }}</el-checkbox>
        </section>
      </el-checkbox-group>

      <el-upload
        class="avatar-uploader"
        action="/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="form.cover" :src="form.cover" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">+</el-icon>
      </el-upload>
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
        <router-link :to="`/novels/${novelId}/${item._id}`">
          {{
            item.title
          }}
        </router-link>
        <el-button @click="onRemoveChapter(item._id)">删除</el-button>
      </li>
    </ol>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { apiGetCategories } from "@/apis/category";
import { apiGetNovelById, apiCreateNovel, apiUpdateNovel } from "@/apis/novel";
import { apiRemoveChapter } from "@/apis/chapter";

interface Novel {
  name: string;
  author: string;
  categories: string[];
  chapters: { _id: string; title: string }[];
  cover?: string;
}

interface Category {
  _id: string;
  name: string;
  children: { _id: string; name: string }[];
}

export default defineComponent({
  name: "Novel",
  setup() {
    const router = useRouter();
    const novelId = ref(useRoute().params.novelId as string);
    const isCreate = computed(() => novelId.value === "new");

    const categoryOptions = ref<Category[]>([]);
    const form: Novel = reactive({
      name: "",
      author: "",
      categories: [],
      chapters: [],
      cover: undefined
    });

    const init = async () => {
      const { list: options } = await apiGetCategories({ pageSize: 1000 });
      categoryOptions.value = (options as unknown) as Category[];

      if (!isCreate.value) {
        const { record } = await apiGetNovelById(novelId.value as string);
        form.name = record?.name as string;
        form.author = record.author as string;
        form.chapters = record.chapters as Novel["chapters"];
        form.categories = record.categories as Novel["categories"];
        form.cover = record.cover as Novel['cover']
      }
    };

    const beforeAvatarUpload = (file: File) => {
      console.log("ffff", file);

      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isImage && isLt2M;
    };

    const handleAvatarSuccess = (param: { url?: string }) => {
      if (param && param.url) {
        form.cover = param.url
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
      await apiRemoveChapter({ novelId: novelId.value, chapterId });
      await init();
    };

    onMounted(init);

    return {
      form,
      novelId,
      isCreate,
      categoryOptions,
      onSubmit,
      onRemoveChapter,
      beforeAvatarUpload,
      handleAvatarSuccess,
    };
  },
});
</script>
