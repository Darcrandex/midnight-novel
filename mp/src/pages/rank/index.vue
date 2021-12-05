<script setup lang="ts">
/**
 * @name Ranking
 * @author darcrand
 * @description 排行榜
 */

import { navigateTo } from "@tarojs/taro";
import RankSort from "@/components/RankSort.vue";
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
    <span :class="$style.link">历届必读榜</span>
  </header>

  <section v-for="i in 20" :key="i" :class="$style.item">
    <section :class="$style.content">
      <span :class="$style.rank_sort">
        <RankSort :sort="i" />
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
