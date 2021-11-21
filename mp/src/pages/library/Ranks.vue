<script setup lang="ts">
/**
 * @name Ranks
 * @author darcrand
 * @description 排行榜
 */

import { ref, onMounted, reactive } from "vue";
import { apiGetNovels } from "@/apis/novels";
import { Novel } from "@/interface/data-model";
import SectionTitle from "@/components/SectionTitle.vue";
import Divider from "@/components/Divider.vue";

const typeOptions = [
  { value: "1", label: "推荐榜" },
  { value: "2", label: "大热榜" },
  { value: "3", label: "完结榜" },
  { value: "4", label: "好评榜" },
];

const currType = ref<string>(typeOptions[0].value);

const data = reactive<{ list: Novel[] }>({ list: [] });

onMounted(async () => {
  const res = await apiGetNovels<{ list: Novel[] }>();
  data.list = res.list.slice(0, 8);
});

const onTypeChan = async (type = "") => {
  currType.value = type;
};
</script>

<template>
  <SectionTitle>排行榜</SectionTitle>

  <section :class="$style.ranks">
    <span
      v-for="(item, index) in typeOptions"
      :key="item.value"
      :class="[
        $style.item,
        currType === item.value && $style.active,
        index > 0 && $style.border,
      ]"
      @click="onTypeChan(item.value)"
    >
      {{ item.label }}
    </span>
  </section>

  <section :class="$style.list">
    <div
      :class="$style.item"
      v-for="(item, index) in data.list"
      :key="item._id"
    >
      <img :src="item.cover" alt="" :class="$style.cover" mode="aspectFill" />
      <span :class="$style.rank">{{ index + 1 }}</span>
      <div :class="$style.info">
        <p :class="$style.title">{{ item.name }}</p>

        <p :class="$style.sub_text">
          {{
            currType === "1"
              ? item.categories
                  .map((v) => v.name)
                  .slice(0, 1)
                  .join(" · ")
              : currType === "4"
              ? "98% 好评"
              : "170万 热度"
          }}
        </p>
      </div>
    </div>
  </section>

  <Divider />
</template>

<style lang="scss" module>
.ranks {
  display: flex;
  margin: $spacing;
  border-radius: 4px;
  overflow: hidden;
  .item {
    flex: 1;
    padding: 0.5 * $spacing $spacing;
    background-color: $gray-bg-color;
    color: $sub-text-color;
    text-align: center;
    &.border {
      margin-left: 1px;
    }

    &.active {
      background: linear-gradient(to right, $theme-color-light, $theme-color);
      color: $article-text-color;
    }
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  margin: 0.5 * $spacing;

  .item {
    display: flex;
    width: 50%;
    padding: 0.5 * $spacing;
    box-sizing: border-box;

    .cover {
      flex-shrink: 0;
      width: 3em;
      height: 3.5em;
      border-radius: 4px;
      overflow: hidden;
    }

    .rank {
      flex-shrink: 0;
      margin: 0 0.5 * $spacing;
    }

    .info {
      flex: 1;
      overflow: hidden;

      .title {
        @extend .text_ellipsis;
        font-size: 14px;
        color: $article-text-color;
      }

      .sub_text {
        font-size: 12px;
        color: $gray-text-color;
      }
    }
  }
}
</style>
