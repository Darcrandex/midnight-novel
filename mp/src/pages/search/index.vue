<script setup lang="ts">
import RankCardItem from "@/components/RankCardItem.vue";
/**
 * @name Search
 * @author darcrand
 * @description 搜索页面
 */

import icoSearch from "@/assets/icons/icon-search.png";
import Tag from "./Tag.vue";
</script>

<template>
  <section :class="$style.search">
    <img :src="icoSearch" alt="" :class="$style.icon" mode="aspectFill" />
    <div :class="$style.input_wrapper">
      <input type="text" placeholder="请输入搜索关键字" maxlength="20" />
    </div>
    <span :class="$style.cancel">取消</span>
  </section>

  <section>
    <h2 :class="$style.section_title">热门搜索</h2>

    <Tag :hot="true">斗转星移</Tag>
    <Tag>洪荒</Tag>
    <Tag>更多分类&nbsp;&gt;</Tag>
  </section>

  <section>
    <h2 :class="$style.section_title">热搜书籍</h2>

    <RankCardItem :show-reason="false" :show-score="false" :bordered="false" />
    <RankCardItem :show-reason="false" :show-score="false" :bordered="false" />
  </section>
</template>

<style lang="scss" module>
@import "./styles.scss";
</style>
