<script setup lang="ts">
/**
 * @name Divider
 * @author darcrand
 * @description 分割线
 */

const props = withDefaults(
  defineProps<{ size?: "default" | "large"; ghost?: boolean }>(),
  {
    size: "default",
    ghost: false,
  }
);
</script>

<template>
  <div :class="[$style[props.size], props.ghost && $style.ghost]"></div>
</template>

<style lang="scss" module>
.default,
.large {
  background-color: $gray-bg-color;
}

.default {
  height: 0.5 * $spacing;
}

.large {
  height: $spacing;
}

.ghost {
  background: transparent;
}
</style>
