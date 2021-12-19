<script setup lang="ts">
/**
 * @name RankCardItem
 * @author darcrand
 * @description 排行榜项
 */

import RankSort from "./RankSort.vue";
const props = withDefaults(defineProps<{ index?: number }>(), {
  index: 1,
});
</script>

<template>
  <section :class="$style.item">
    <section :class="$style.content">
      <span :class="$style.rank_sort">
        <RankSort :sort="props.index" />
      </span>

      <img src="" alt="" :class="$style.cover" />

      <div :class="$style.body">
        <h2 :class="$style.name">一剑独尊</h2>
        <p :class="$style.info">青鸾峰上</p>
        <p :class="$style.info">杀伐果断·连载·895万字</p>
      </div>

      <div>
        <div :class="$style.number_wrapper">
          <span :class="$style.num">
            99.5
          </span>
          <span :class="$style.text">必读指数</span>
        </div>
        <div :class="$style.number_footer"></div>
      </div>
    </section>

    <section :class="$style.reason">(必读理由) 老子让你读就给老子读</section>
  </section>
</template>

<style lang="scss" module>
.item {
  padding: $spacing;
  border-bottom: 1px solid $gray-bg-color;
  .content {
    display: flex;
  }

  .rank_sort {
    align-self: center;
    margin-right: $spacing;
  }

  .cover {
    width: 60px;
    height: 75px;
    margin-right: $spacing;
    border-radius: 4px;
    background-color: rgb(139, 124, 124);
  }

  .body {
    margin-right: auto;

    .name {
      margin-bottom: 0.5 * $spacing;
      font-weight: bold;
      font-size: 16px;
      color: $article-text-color;
    }
    .info {
      font-size: 12px;
      color: $gray-text-color;
    }
  }
}

$number-bg-color: #f7f2ea;
$number-color: #a08d73;
.number_wrapper {
  align-self: flex-start;
  padding-top: 0.5 * $spacing;
  background-color: $number-bg-color;
  border-radius: 4px 4px 0 0;

  .num {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: $number-color;
  }
  .text {
    font-size: 9px;
    text-align: center;
    color: $number-color;
  }
}
.number_footer {
  width: 0;
  height: 0.5 * $spacing;
  border-top-width: 0;
  border-left: 24px solid $number-bg-color;
  border-right: 24px solid $number-bg-color;
  border-bottom: 0.5 * $spacing solid transparent;
}

.reason {
  margin-top: 0.5 * $spacing;
  margin-left: 24px + $spacing;
  font-size: 12px;
  color: $gray-text-color;
}
</style>
