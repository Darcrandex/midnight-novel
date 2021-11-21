<script setup lang="ts">
/**
 * @name NovelDetail
 * @author darcrand
 * @description 小说详情页
 */

import { reactive, onMounted } from "vue";
import { useRouter } from "@tarojs/taro";
import { Novel } from "@/interface/data-model";

const router = useRouter();
const data = reactive<{ novel: Novel }>({
  novel: { _id: "", name: "", author: "", categories: [], cover: "" },
});

onMounted(() => {
  console.log({ router, data });
});
</script>

<template>
  <h1>NovelDetail</h1>
</template>
