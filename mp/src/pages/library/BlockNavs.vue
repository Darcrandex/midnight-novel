<script setup lang="ts">
/**
 * @name BlockNavs
 * @author darcrand
 * @description 区块导航
 */

import icon1 from "@/assets/icons/libray-nav-01.png";
import icon2 from "@/assets/icons/libray-nav-02.png";
import icon3 from "@/assets/icons/libray-nav-03.png";
import icon4 from "@/assets/icons/libray-nav-04.png";

const list = [
  { title: "分类", icon: icon1 },
  { title: "排行榜", icon: icon2 },
  { title: "完结", icon: icon3 },
  { title: "新书", icon: icon4 },
];
</script>

<template>
  <section :class="$style.wrapper">
    <nut-row :gutter="8">
      <nut-col :span="6" v-for="item in list" :key="item.title">
        <div :class="$style.item">
          <img :src="item.icon" alt="" :class="$style.img" mode="aspectFill" />
          <span :class="$style.title">{{ item.title }}</span>
        </div>
      </nut-col>
    </nut-row>
  </section>
</template>

<style lang="scss" module>
.wrapper {
  margin: 4 * $spacing $spacing $spacing;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: $gray-bg-color;
}

.img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transform: translateY(-40%);
}

.title {
  text-align: center;
  font-weight: bold;
  color: $article-text-color;
  font-size: 14px;
  transform: translateY(-0.5 * $spacing);
}
</style>
