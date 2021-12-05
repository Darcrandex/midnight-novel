<script setup lang="ts">
/**
 * @name RankSort
 * @author darcrand
 * @description 排名序号
 */
import { computed } from "vue";
import medal1 from "@/assets/icons/medal-1.png";
import medal2 from "@/assets/icons/medal-2.png";
import medal3 from "@/assets/icons/medal-3.png";
import medal4 from "@/assets/icons/medal-4.png";
const props = withDefaults(defineProps<{ sort?: number }>(), { sort: 1 });

const iconUrl = computed(() => {
  const urls = [medal1, medal2, medal3, medal4];
  return urls[Math.min(props.sort - 1, urls.length - 1)];
});
</script>

<template>
  <div :class="$style.wrapper">
    <img :src="iconUrl" alt="" :class="$style.img" mode="aspectFill" />
    <span :class="$style.sort">{{ props.sort }}</span>
  </div>
</template>

<style lang="scss" module>
$size: 28px;
.wrapper {
  position: relative;

  .img {
    width: $size;
    height: $size;
  }

  .sort {
    position: absolute;
    top: 35%;
    left: 50%;
    font-size: 10px;
    height: $size;
    line-height: $size;
    transform: translate(-50%, -50%);
  }
}
</style>
