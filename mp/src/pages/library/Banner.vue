<script setup lang="ts">
/**
 * @name Banner
 * @author darcrand
 * @description 头部轮播
 */

const list = [
  {
    url:
      "https://cdn.qimao.com/bookimg/zww/backendstatic/images/other/16360150343239286.jpg",
    to: "",
  },
  {
    url:
      "https://cdn.qimao.com/bookimg/zww/backendstatic/images/other/16360150075838017.jpg",
    to: "",
  },
  {
    url:
      "https://cdn.qimao.com/bookimg/zww/backendstatic/images/other/16360150563872865.jpg",
    to: "",
  },
  {
    url:
      "https://cdn.qimao.com/bookimg/zww/backendstatic/images/other/16369584011758593.jpg",
    to: "",
  },
  {
    url:
      "https://cdn.qimao.com/bookimg/zww/backendstatic/images/other/16369583901824536.jpg",
    to: "",
  },
];
</script>

<template>
  <section :class="$style.wrapper">
    <swiper
      :autoplay="true"
      :circular="true"
      :indicatorDots="true"
      indicatorColor="#f2f2f2"
      indicatorActiveColor="#f9db58"
      :class="$style.swiper"
    >
      <swiper-item v-for="item in list" :key="item.url">
        <img :src="item.url" alt="" mode="aspectFill" :class="$style.img" />
      </swiper-item>
    </swiper>
  </section>
</template>

<style lang="scss" module>
$height: 120px;
.wrapper {
  padding: 0.5 * $spacing $spacing 0;
  background: linear-gradient(to bottom, $theme-color, $theme-color-dark);
}

.swiper {
  height: $height;
}

.img {
  width: 100%;
  height: $height;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}
</style>
