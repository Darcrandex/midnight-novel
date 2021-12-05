<script setup lang="ts">
/**
 * @name RoundButton
 * @author darcrand
 * @description 圆角按钮
 */

import { HTMLAttributes } from "@vue/runtime-dom";

const props = withDefaults(
  defineProps<{ active?: boolean; style?: HTMLAttributes["style"] }>(),
  {
    active: false,
  }
);
</script>

<template>
  <span
    :class="[$style.btn, props.active && $style.active]"
    :style="props.style"
  >
    <slot></slot>
  </span>
</template>

<style lang="scss" module>
.btn {
  display: inline-block;
  height: 2em;
  line-height: 2;
  padding: 0 1em;
  border-radius: 1em;
  font-size: 12px;
  color: $sub-text-color;
  background-color: $gray-bg-color;
}

.active {
  background: linear-gradient(to right, $theme-color-light, $theme-color);
  color: $article-text-color;
}
</style>
