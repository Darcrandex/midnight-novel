<script setup lang="ts">
/**
 * @name Recommend
 * @author darcrand
 * @description 主编推荐
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
  data.list = res.list.slice(0, 3);
});
</script>

<template>
  <SectionTitle>
    <template #default>主编推荐</template>
  </SectionTitle>

  <section style="margin: 8px;">
    <nut-row type="flex" wrap="wrap">
      <nut-col :span="8" v-for="item in data.list" :key="item._id">
        <div style="margin: 8px;">
          <BookCard :data="item" mode="vertical" :show-score="false" />
        </div>
      </nut-col>
    </nut-row>
  </section>

  <Divider />
</template>

<style lang="scss" module></style>
