<script lang="ts" setup>
/**
 * @name BookRack
 * @author darcrand
 * @description 书架
 */

import icoAdd from "@/assets/icons/icon-add-select.png";

const imageUrl =
  "http://midnight-novel.oss-cn-guangzhou.aliyuncs.com/0c56d0a69669c760903ebd3ce488c665.jpg";
</script>

<template>
  <section :class="$style.recommend">
    <div :class="$style.card">
      <img :class="$style.cover" :src="imageUrl" alt="" />
      <div :class="$style.body">
        <h1 :class="$style.desc">
          <nut-tag color="red">推荐</nut-tag>
          被阳光枪击中后，意外获得逆天神力!
        </h1>
        <p :class="$style.name">《修仙狂徒在校园》</p>
      </div>
      <div :class="$style.right">
        <p>首次签到</p>
        <p>+100金币</p>
        <p>
          <span :class="$style.btn">立即签到</span>
        </p>
      </div>
    </div>
  </section>

  <section v-for="(i, idx) in 5" :key="i" :class="$style.item">
    <img :src="imageUrl" alt="" :class="$style.cover" mode="aspectFill" />
    <div :class="$style.body">
      <h1 :class="$style.title">
        <span>大漠狂沙</span>
        <b v-if="idx === 2" :class="$style.tag">更新</b>
      </h1>

      <!-- 最后一次阅读的小说 -->
      <p v-if="idx === 0" :class="$style.info">
        <span>读到：第一章 黄沙漫漫</span>
        <span :class="$style.highlight">继续阅读&gt;</span>
      </p>
      <!-- 已经阅读过（至少一次）的小说 -->
      <p v-if="idx === 1" :class="$style.info">
        <span>读到：第一章 黄沙漫漫</span>
      </p>
      <!-- 从未阅读过的小说 -->
      <p v-if="idx > 1" :class="$style.info">
        <span>肖十一郎</span>
      </p>
    </div>
  </section>

  <section :class="$style.add">
    <div :class="$style.cover">
      <img :class="$style.add_icon" :src="icoAdd" alt="" />
    </div>
    <p :class="$style.info">添加你喜欢的小说</p>
  </section>
</template>

<style lang="scss" module>
@import "./styles.scss";
</style>
