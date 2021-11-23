<script setup lang="ts">
/**
 * @name Excellent
 * @author darcrand
 * @description 神作
 */

import { onMounted, reactive } from "vue";

import { apiGetNovels } from "@/apis/novels";
import { Novel } from "@/interface/data-model";

import SectionTitle from "@/components/SectionTitle.vue";
import BookCard from "@/components/BookCard.vue";
import Divider from "@/components/Divider.vue";

const data = reactive<{ list: Novel[] }>({ list: [] });

onMounted(async () => {
  const res = await apiGetNovels<{ list: Novel[] }>();
  data.list = res.list.slice(0, 8);
});
</script>

<template>
  <SectionTitle>9分神作</SectionTitle>

  <section style="margin: 8px;">
    <nut-row type="flex" wrap="wrap">
      <nut-col :span="6" v-for="item in data.list" :key="item._id">
        <div style="margin: 8px;">
          <BookCard
            :data="item"
            mode="vertical"
            :show-category="false"
            height="100px"
          />
        </div>
      </nut-col>
    </nut-row>
  </section>

  <Divider />
</template>
