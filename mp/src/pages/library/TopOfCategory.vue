<script setup lang="ts">
/**
 * @name TopOfCategory
 * @author darcrand
 * @description 分类精选
 */

import { onMounted, reactive, ref } from "vue";

import { apiGetNovels } from "@/apis/novels";
import { apiGetCategories } from "@/apis/category";
import { Novel, Category } from "@/interface/data-model";
import BookCard from "@/components/BookCard.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import Divider from "@/components/Divider.vue";

const currCategory = ref<string | undefined>(undefined);
const categories = ref<Category[]>([]);
const data = reactive<{ list: Novel[] }>({ list: [] });

onMounted(async () => {
  const categoryRes = await apiGetCategories<{ list: Category[] }>();
  categories.value = categoryRes.list;
  currCategory.value = categoryRes.list[0]?._id;

  const res = await apiGetNovels<{ list: Novel[] }>();
  data.list = res.list.slice(0, 9);
});

const onCategoryChange = async (value = "") => {
  currCategory.value = value;
};
</script>

<template>
  <SectionTitle>
    <template #default>分类精选</template>
  </SectionTitle>

  <section :class="$style.category_list">
    <span
      v-for="item in categories"
      :key="item._id"
      :class="[$style.item, currCategory === item._id && $style.active]"
      @click="onCategoryChange(item._id)"
    >
      {{ item.name }}
    </span>
  </section>

  <section style="margin: 8px;">
    <nut-row type="flex" wrap="wrap">
      <nut-col
        v-for="(item, index) in data.list"
        :span="index === 0 ? 24 : 6"
        :key="item._id"
      >
        <div style="margin: 8px;">
          <BookCard
            :data="item"
            :mode="index === 0 ? 'horizontal' : 'vertical'"
            :show-score="index === 0"
            :show-category="index === 0"
          />
        </div>
      </nut-col>
    </nut-row>
  </section>

  <Divider />
</template>

<style lang="scss" module>
.category_list {
  white-space: nowrap;
  overflow-x: auto;
}
.item {
  display: inline-block;
  margin: 0.5 * $spacing 0 0.5 * $spacing $spacing;
  padding: 0 $spacing;
  background-color: $gray-bg-color;
  color: $sub-text-color;
  font-size: 14px;
  line-height: 28px;
  border-radius: 14px;

  &.active {
    background: linear-gradient(to right, $theme-color-light, $theme-color);
    color: $article-text-color;
  }
}
</style>
