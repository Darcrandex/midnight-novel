<script setup lang="ts">
/**
 * @name TopSearch
 * @author darcrand
 * @description 顶部搜索
 */

import Taro from "@tarojs/taro";
import icoSearch from "@/assets/icons/icon-search.png";
</script>

<template>
  <section :class="$style.wrapper">
    <img
      :src="icoSearch"
      alt=""
      :class="$style.search_btn"
      @click="Taro.navigateTo({ url: '/pages/search/index' })"
    />
  </section>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  align-items: center;
  padding: 0.5 * $spacing $spacing;
  background-color: $theme-color;
}

.search_btn {
  width: 20px;
  height: 20px;
}

.search {
  flex: 1;
  height: 28px;
  margin-left: $spacing;
  border-radius: 4px;
  line-height: 28px;
  font-size: 12px;
  color: $gray-text-color;
  text-indent: 1em;
  background-color: #fff;
}
</style>
