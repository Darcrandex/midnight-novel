<script setup lang="ts">
/**
 * @name Ranking
 * @author darcrand
 * @description 排行榜
 */

import { navigateTo } from "@tarojs/taro";
import RankCardItem from "@/components/RankCardItem.vue";
</script>

<template>
  <nav :class="$style.top_nav">
    <span
      :class="$style.nav_button"
      @click="navigateTo({ url: '/pages/all-rankings/index' })"
    >
      更多排行榜
    </span>
  </nav>

  <header :class="$style.header">
    <span :class="$style.tilte">11月·必读榜</span>
    <span
      :class="$style.link"
      @click="navigateTo({ url: '/pages/history-rankings/index' })"
      >历届必读榜</span
    >
  </header>

  <RankCardItem
    v-for="i in 20"
    :key="i"
    :index="i + 1"
    @click="navigateTo({ url: `/pages/novel-detail/index?id=${i}` })"
  />

  <p
    :class="$style.more_link"
    @click="navigateTo({ url: '/pages/all-rankings/index' })"
  >
    更多排行榜
  </p>
</template>

<style module lang="scss">
@import "./styles.scss";
</style>
