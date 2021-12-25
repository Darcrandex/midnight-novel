<script setup lang="ts">
/**
 * @name SectionTitle
 * @author darcrand
 * @description 模块标题
 */
</script>

<template>
  <h1 :class="$style.wrapper">
    <span :class="$style.title">
      <slot name="default"></slot>
    </span>
    <span>
      <slot name="right"></slot>
    </span>
  </h1>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: $spacing;
}

.title {
  font-size: 16px;
  font-family: "Bitstream Vera Serif Bold";
  font-weight: bold;
  color: $article-text-color;
}
</style>
