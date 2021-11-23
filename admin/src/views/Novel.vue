<template>
  <el-breadcrumb>
    <el-breadcrumb-item to="/novels">小说管理</el-breadcrumb-item>
    <el-breadcrumb-item>小说详情</el-breadcrumb-item>
  </el-breadcrumb>

  <section style="margin-top: 16px;">
    <el-button @click="onSubmit" type="primary">
      {{ isCreate ? '新增' : '更新' }}
    </el-button>
  </section>

  <el-form label-width="5em" style="margin-top: 16px;">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="form.author"></el-input>
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="form.description" type="textarea" :rows="6"></el-input>
    </el-form-item>
    <el-form-item label="主角">
      <el-input v-model="form.protagonist"></el-input>
    </el-form-item>
    <el-form-item label="分类">
      <el-checkbox-group v-model="form.categories">
        <section v-for="group in kinds" :key="group._id">
          <p class="categories-group-name">
            <span>{{ group.name }}</span>
          </p>
          <el-checkbox v-for="opt in group.categories" :key="opt._id" :label="opt._id">{{ opt.name }}</el-checkbox>
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

      <el-image v-if="form.cover" style="width: 100px; height: 100px" :src="form.cover" fit="cover" :preview-src-list="[form.cover]"></el-image>
    </el-form-item>

    <el-form-item label="章节">
      <el-button type="primary" :disabled="isCreate" @click="$router.push(`/novels/${novelId}/new`)">
        新增章节
      </el-button>

      <el-table :data="chapters.list" style="width: 100%" row-key="_id">
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
            <el-popconfirm title="真的要删除吗?" @confirm="onRemoveChapter(scope.row._id)">
              <template #reference>
                <el-button size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 16px;"
        layout="prev, pager, next"
        :page-size="chapters.pageSize"
        :total="chapters.total"
        :hide-on-single-page="true"
        v-model:currentPage="chapters.page"
        @current-change="getChapters"
      ></el-pagination>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Novel, Kind, Chapter } from '@/interface/data-model'
import { apiGetKinds } from '@/apis/category'
import { apiGetNovelById, apiCreateNovel, apiUpdateNovel } from '@/apis/novel'
import { apiGetChapterByNovel, apiRemoveChapter } from '@/apis/chapter'

const router = useRouter()
const novelId = ref<string>('')
const isCreate = computed(() => novelId.value === 'new')

const kinds = ref<Kind[]>([])

const form = reactive<Novel>({
  name: '',
  author: '',
  categories: [],
  cover: undefined,
  description: undefined,
  protagonist: undefined
})

const chapters = reactive<{ list: Chapter[]; total: number; page: number; pageSize: number }>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 5
})

const getChapters = async (page?: number) => {
  const { list, total } = await apiGetChapterByNovel({ nid: novelId.value, page: page || chapters.page })
  chapters.list = list
  chapters.total = total
}

const onRemoveChapter = async (chapterId: string) => {
  await apiRemoveChapter(chapterId)
  await init()
}

const init = async () => {
  // 获取路由参数
  novelId.value = router.currentRoute.value.params.novelId as string

  // 选项
  const { list } = await apiGetKinds()
  kinds.value = list

  if (!isCreate.value) {
    const { record } = await apiGetNovelById(novelId.value)
    form.name = record.name
    form.author = record.author
    form.categories = record.categories
    form.cover = record.cover
    form.description = record.description
    form.protagonist = record.protagonist
    await getChapters()
  }
}

const handleAvatarSuccess = (param: { url?: string }) => {
  if (param && param.url) {
    form.cover = param.url
  }
}

const onSubmit = async () => {
  if (isCreate.value) {
    const { id: recordId } = await apiCreateNovel(form)

    await router.replace(`/novels/${recordId}`)
  } else {
    await apiUpdateNovel(novelId.value, form)
  }

  await init()
}

onMounted(() => {
  init()
})
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
