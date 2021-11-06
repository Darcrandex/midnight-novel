<template>
  <el-breadcrumb>
    <el-breadcrumb-item to="/novels">小说管理</el-breadcrumb-item>
    <el-breadcrumb-item>小说详情</el-breadcrumb-item>
  </el-breadcrumb>

  <section style="margin-top: 16px;">
    <el-button @click="onSubmit" type="primary">
      {{ isCreate ? "新增" : "更新" }}
    </el-button>
  </section>

  <el-form label-width="5em" style="margin-top: 16px;">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="form.author"></el-input>
    </el-form-item>
    <el-form-item label="分类">
      <el-checkbox-group v-model="form.categories">
        <section v-for="group in categoryOptions" :key="group._id">
          <p class="categories-group-name">
            <span>{{ group.name }}</span>
          </p>
          <el-checkbox
            v-for="opt in group.children"
            :key="opt._id"
            :label="opt._id"
            >{{ opt.name }}</el-checkbox
          >
        </section>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="封面">
      <el-upload
        style="display: inline-block; margin-right: 16px; vertical-align: top;"
        action="/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <div class="upload-wrapper">
          <el-icon class="el-icon-camera"></el-icon>
        </div>
      </el-upload>

      <el-image
        v-if="form.cover"
        style="width: 100px; height: 100px"
        :src="form.cover"
        fit="cover"
        :preview-src-list="[form.cover]"
      ></el-image>
    </el-form-item>

    <el-form-item label="章节">
      <router-link :to="`/novels/${novelId}/new`">
        <el-button type="primary" :disabled="isCreate">
          新增章节
        </el-button>
      </router-link>

      <el-table :data="form.chapters" style="width: 100%" row-key="_id">
        <el-table-column label="名称">
          <template #default="scope">
            <router-link :to="`/novels/${novelId}/${scope.row._id}`">
              <el-link type="primary">
                {{ scope.row.title }}
              </el-link>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作">
          <template #default="scope">
            <el-popconfirm
              title="真的要删除吗?"
              @confirm="onRemoveChapter(scope.row._id)"
            >
              <template #reference>
                <el-button size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
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
      cover: undefined,
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
        form.cover = record.cover as Novel["cover"];
      }
    };

    const beforeAvatarUpload = (file: File) => {
      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isImage && isLt2M;
    };

    const handleAvatarSuccess = (param: { url?: string }) => {
      if (param && param.url) {
        form.cover = param.url;
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

<style lang="scss" scoped>
.upload-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  cursor: pointer;
  vertical-align: top;

  &:hover {
    border-color: skyblue;
  }

  .el-icon {
    font-size: 40px;
    color: #e0e0e0;
  }
}

.categories-group-name {
  margin-top: 10px;
  margin-bottom: 0;
  line-height: 1.5;
  align-items: center;
  font-size: 14px;
  color: #999;
}
</style>
