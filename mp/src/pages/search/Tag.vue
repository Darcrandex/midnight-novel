<script setup lang="ts">
/**
 * @name Tag
 * @author darcrand
 * @description 自定义的 tag
 */

import Taro from "@tarojs/taro";
const props = defineProps<{ hot?: boolean; url?: string }>();
</script>

<template>
  <span
    :class="[$style.tag, props.hot && $style.hot]"
    @click="
      () => {
        props.url && Taro.navigateTo({ url: props.url });
      }
    "
  >
    <img v-if="props.hot" src="" alt="" :class="$style.hot_ico" />
    <slot></slot>
  </span>
</template>

<style lang="scss" module>
.tag {
  display: inline-block;
  height: 2em;
  margin-top: 0.5 * $spacing;
  margin-left: $spacing;
  padding: 0 1em;
  font-size: 14px;
  line-height: 2;
  border-radius: 1em;
  background-color: $gray-bg-color;
  color: $article-text-color;

  &.hot {
    background-color: rgba(#f55f7a, 0.1);
    color: rgba(#f55f7a, 1);
  }
}

.hot_ico {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 0.5em;
  background-color: #ccc;
  vertical-align: middle;
}
</style>
