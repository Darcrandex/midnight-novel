<script setup lang="ts">
/**
 * @name AllRankings
 * @author darcrand
 * @description 所有排行榜
 */

import RankSort from "@/components/RankSort.vue";
import RoundButton from "@/components/RoundButton.vue";
</script>

<template>
  <main :class="$style.main">
    <header :class="$style.header">
      <RoundButton :active="true" style="margin-right: 10px;">全部</RoundButton>
      <RoundButton style="margin-right: 10px;">都市</RoundButton>
      <RoundButton style="margin-right: 10px;">玄幻</RoundButton>
    </header>

    <section :class="$style.body">
      <aside :class="$style.aside">
        <div
          v-for="i in 20"
          :class="[$style.link_btn, i === 2 && $style.active]"
        >
          <span :class="$style.text">
            <i :class="$style.left_block"></i>
            N{{ i }}榜
          </span>
        </div>
      </aside>

      <ul :class="$style.list">
        <li v-for="v in 30" :class="$style.novel_item">
          <div :class="$style.sort">
            <RankSort :sort="v" />
          </div>

          <img src="" alt="" :class="$style.cover" />

          <div :class="$style.content">
            <h2 :class="$style.title">
              <span :class="$style.name">一剑独尊{{ v }}</span>
            </h2>

            <p :class="$style.info">都市修仙·连载·102万字</p>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" module>
@import "./styles.scss";
</style>
