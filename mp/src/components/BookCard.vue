<script setup lang="ts">
/**
 * @name BookCard
 * @author darcrand
 * @description 小说卡片
 */

import { defineProps, withDefaults, computed } from "vue";
import { Novel } from "@/interface/data-model";

const props = withDefaults(
  defineProps<{
    data: Novel;
    mode?: "horizontal" | "vertical"; // 横向/竖向
    showCategory?: boolean; // 是否显示分类
    showScore?: boolean; // 是否显示分数
  }>(),
  { mode: "horizontal", showCategory: true, showScore: true }
);

const categoryText = computed(() =>
  props.data.categories.length > 0
    ? props.data.categories
        .slice(0, 2)
        .map((v) => v.name)
        .join(" · ")
    : undefined
);

const infoText = computed(() =>
  [
    categoryText.value,
    props.data.readingCount ? `${props.data.readingCount}人在读` : undefined,
  ]
    .filter(Boolean)
    .join(" · ")
);
</script>

<template>
  <section v-if="props.mode === 'vertical'" :class="$style.vertical">
    <img
      :src="props.data.cover"
      :alt="props.data.name"
      :class="$style.cover"
      mode="aspectFill"
    />
    <h1 :class="$style.name">{{ props.data.name }}</h1>
    <p v-if="props.showCategory && categoryText" :class="$style.category">
      {{ categoryText }}
    </p>
    <p v-if="props.showScore">
      <span :class="$style.score_num">{{ props.data.score || 9.5 }}</span>
      <i :class="$style.score_text">分</i>
    </p>
  </section>
  <section v-else :class="$style.horizontal">
    <img
      :src="props.data.cover"
      :alt="props.data.name"
      :class="$style.cover"
      mode="aspectFill"
    />
    <div :class="$style.body">
      <h1 :class="$style.title">
        <span :class="$style.name">
          {{ props.data.name }}
        </span>
        <span>
          <span :class="$style.score_num">{{ props.data.score || 9.5 }}</span>
          <i :class="$style.score_text">分</i>
        </span>
      </h1>
      <p :class="$style.description">{{ props.data.description }}</p>
      <p :class="$style.category">{{ infoText }}</p>
    </div>
  </section>
</template>

<style lang="scss" module>
.vertical {
  .cover {
    width: 100%;
    height: 140px;
    border-radius: 4px;
    overflow: hidden;
  }
}

.name {
  @extend .text_ellipsis;
  font-size: 14px;
  font-weight: bold;
  color: $article-text-color;
}

.category {
  @extend .text_ellipsis;
  font-size: 12px;
  color: $gray-text-color;
}

.score_num {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  color: $theme-color;
}

.score_text {
  font-size: 12px;
  color: $theme-color;
}

.horizontal {
  display: flex;

  .cover {
    width: 5em;
    height: 6.5em;
    margin-right: $spacing;
    border-radius: 4px;
    overflow: hidden;
  }

  .body {
    flex: 1;
  }

  .name {
    font-size: 16px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .description {
    margin: $spacing 0;
    color: $gray-text-color;
    font-size: 14px;
  }
}
</style>
