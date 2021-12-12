<script setup lang="ts">
/**
 * @name HistoryRankings
 * @author darcrand
 * @description 历史排行榜
 */

import { ref } from "vue";
import RankCardItem from "@/components/RankCardItem.vue";

const current = ref(1);
const monthOptions = Array(12)
  .fill(0)
  .map((_, i) => ({ value: i + 1, label: `${i + 1}月` }))
  .reverse();
</script>

<template>
  <section :class="$style.months">
    <div
      v-for="item in monthOptions"
      :key="item.value"
      :class="[$style.month_item, current === item.value && $style.active]"
      @click="current = item.value"
    >
      <span :class="$style.year">2021年</span>
      <b :class="$style.month">{{ item.label }}</b>
    </div>
  </section>
  <RankCardItem v-for="i in 20" :key="i" :index="i + 1" />
</template>

<style lang="scss" module>
.months {
  margin: $spacing $spacing 0;
  padding-bottom: $spacing;
  overflow: auto;
  white-space: nowrap;
}

.month_item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-right: $spacing;
  padding: 0.5 * $spacing $spacing;
  border-radius: 4px;
  background-color: $gray-bg-color;

  .year {
    font-size: 12px;
    color: $sub-text-color;
  }

  .month {
    text-align: center;
    font-size: 14px;
    color: $sub-text-color;
    font-weight: bold;
  }
}

.month_item.active {
  background: linear-gradient(to right, $theme-color-light, $theme-color);
  .year,
  .month {
    color: $article-text-color;
  }
}
</style>
