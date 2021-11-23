<script setup lang="ts">
/**
 * @name Finished
 * @author darcrand
 * @description 完结优选
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
  <SectionTitle>完结优选</SectionTitle>

  <section style="margin: 8px;">
    <nut-row type="flex" wrap="wrap">
      <nut-col :span="6" v-for="item in data.list" :key="item._id">
        <div style="margin: 8px;">
          <BookCard
            :data="item"
            mode="vertical"
            :show-score="false"
            height="100px"
          />
        </div>
      </nut-col>
    </nut-row>
  </section>

  <Divider />
</template>
