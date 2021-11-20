<script setup lang="ts">
/**
 * @name Libray
 * @author darcrand
 * @description 书城
 */

import { onMounted } from "vue";
import { get } from "@/utils/http";

import TopSearch from "./TopSearch.vue";
import Banner from "./Banner.vue";
import BlockNavs from "./BlockNavs.vue";
import Recommend from "./Recommend.vue";
import Ranks from "./Ranks.vue";
import New from "./New.vue";
import Finished from "./Finished.vue";
import Good from "./Good.vue";
import TopOfCategory from "./TopOfCategory.vue";
import List from "./List.vue";

const init = async () => {
  console.log("get", get);
  await get("/novel");
};

onMounted(() => {
  console.log("inited");
  init();
});
</script>

<template>
  <TopSearch />
  <Banner />
  <BlockNavs />
  <Recommend />
  <Ranks />
  <New />
  <Finished />
  <Good />
  <TopOfCategory />
  <List />
</template>
