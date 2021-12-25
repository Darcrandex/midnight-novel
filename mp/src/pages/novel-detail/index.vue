<script setup lang="ts">
/**
 * @name NovelDetail
 * @author darcrand
 * @description 小说详情页
 */

import SectionTitle from "@/components/SectionTitle.vue";
import Divider from "@/components/Divider.vue";
const html = `<h1 style="color: red">文章内容</h1>`;
</script>

<template>
  <section :class="$style.header">
    <div :class="$style.left">
      <h1 :class="$style.name">至尊狂婿</h1>
      <p :class="$style.info_text">作者:空空</p>
      <p :class="[$style.info_text, $style.bottom]">都市高手·连载·400万字</p>
    </div>
    <img src="" alt="" mode="aspectFill" :class="$style.cover" />
  </section>

  <section :class="$style.statistics">
    <div :class="$style.item">
      <span :class="$style.value">
        <b :class="$style.num">9.5</b>
        <span :class="$style.text">分</span>
      </span>
      <span :class="$style.label">书籍评分</span>
    </div>
    <div :class="$style.item">
      <span :class="$style.value">
        <b :class="$style.num">365.2</b>
        <span :class="$style.text">万人</span>
      </span>
      <span :class="$style.label">正在阅读</span>
    </div>
    <div :class="$style.item">
      <span :class="$style.value">
        <b :class="$style.num">135.4</b>
        <span :class="$style.text">万票</span>
      </span>
      <span :class="$style.label">累计必读票</span>
    </div>
  </section>
  <Divider />

  <section :class="$style.infos">
    <p :class="$style.item">
      <label :class="$style.label">简介：</label>
      <span :class="$style.value"
        >《青春环游记3》推荐好书！生死看淡，诸天神佛仙，不过一剑间。</span
      >
    </p>
    <p :class="$style.item">
      <label :class="$style.label">角色：</label>
      <span :class="$style.value">叶璇，叶玲</span>
    </p>
    <p :class="$style.item">
      <label :class="$style.label">分类：</label>
      <span :class="$style.category_item">杀伐果断</span>
      <span :class="$style.category_item">灵气复苏</span>
      <span :class="$style.category_item">强者回归</span>
      <span :class="$style.category_item">修仙</span>
      <span :class="$style.category_item">复仇</span>
    </p>
    <p :class="[$style.item, $style.catalogue]">
      <label :class="$style.label">目录</label>
      <span :class="$style.content">连载至第九百一十二章</span>
      <span :class="$style.date">2021-12-10更新</span>
      <span :class="$style.arrow">&gt;</span>
    </p>
  </section>
  <Divider />

  <section :class="$style.novel_content" v-html="html"></section>
  <Divider />

  <section :class="$style.other_novels">
    <SectionTitle>作者其他作品</SectionTitle>

    <div :class="$style.item">
      <img src="" alt="" mode="aspectFill" :class="$style.cover" />
      <div :class="$style.body">
        <h1 :class="$style.title">
          <span :class="$style.name">元尊</span>
          <span :class="$style.score">
            <b :class="$style.num">9.5</b>
            <span :class="$style.text">分</span>
          </span>
        </h1>

        <p :class="$style.desc">
          天蚕土豆最新力作。火爆上架！天地为炉，万物为铜，阴阳为碳，造化为工。
        </p>
        <p :class="$style.info">东方玄幻·完结·13.8万在读</p>
      </div>
    </div>
  </section>
  <Divider />

  <section :class="$style.like">
    <SectionTitle>猜你喜欢</SectionTitle>
    <div :class="$style.list">
      <nut-row type="flex" wrap="wrap">
        <nut-col :span="8">
          <div :class="$style.item">
            <img src="" alt="" mode="aspectFill" :class="$style.cover" />
            <p :class="$style.name">
              都市之最强仙医
            </p>
          </div>
        </nut-col>
        <nut-col :span="8">
          <div :class="$style.item">
            <img src="" alt="" mode="aspectFill" :class="$style.cover" />
            <p :class="$style.name">
              都市之最强仙医
            </p>
          </div>
        </nut-col>
        <nut-col :span="8">
          <div :class="$style.item">
            <img src="" alt="" mode="aspectFill" :class="$style.cover" />
            <p :class="$style.name">
              都市之最强仙医
            </p>
          </div>
        </nut-col>
        <nut-col :span="8">
          <div :class="$style.item">
            <img src="" alt="" mode="aspectFill" :class="$style.cover" />
            <p :class="$style.name">
              都市之最强仙医
            </p>
          </div>
        </nut-col>
      </nut-row>
    </div>
  </section>
</template>

<style lang="scss" module>
@import "./styles.scss";
</style>
