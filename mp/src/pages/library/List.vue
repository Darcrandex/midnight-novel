<script setup lang="ts">
/**
 * @name List
 * @author darcrand
 * @description 猜你喜欢
 */

import { onMounted, reactive } from "vue";

import { apiGetNovels } from "@/apis/novels";
import { Novel } from "@/interface/data-model";
import BookCard from "@/components/BookCard.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import Divider from "@/components/Divider.vue";

const data = reactive<{ list: Novel[] }>({ list: [] });

onMounted(async () => {
  const res = await apiGetNovels<{ list: Novel[] }>();
  data.list = res.list;
});
</script>

<template>
  <SectionTitle>
    <template #default>猜你喜欢</template>
  </SectionTitle>

  <div v-for="item in data.list" :key="item._id" :class="$style.item">
    <BookCard :data="item" :show-score="false" />
  </div>

  <Divider :ghost="true" />
</template>

<style lang="scss" module>
.item {
  margin: $spacing;
}
</style>
