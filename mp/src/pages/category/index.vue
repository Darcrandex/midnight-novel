<template>
  <section v-for="group in categoryData.list" :key="group._id">
    <div :class="$style.category_group_name">
      <i :class="$style.line"></i>
      <span :class="$style.text">{{ group.name }}</span>
      <i :class="$style.line"></i>
    </div>

    <section :class="$style.category_group">
      <div
        v-for="item in group.children"
        :key="item._id"
        :class="$style.category_item"
      >
        <span :class="$style.tag">{{ item.name }}</span>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { get } from "../../utils/http";

interface Category {
  _id: string;
  name: string;
  children: { _id: string; name: string }[];
}

const categoryData = reactive<{ list: Category[] }>({ list: [] });

const getList = async () => {
  const res = await get<{ list: Category[] }>("/category");
  categoryData.list = res.list;
};

onMounted(getList);
</script>

<style lang="scss" module>
$spacing: 8px;
.category_group_name {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4 * $spacing 0;

  .text {
    margin: 0 2 * $spacing;
    font-weight: bold;
    font-size: 120%;
    color: #555;
  }

  // 小程序不支持伪元素
  .line {
    width: 3em;
    height: 1px;
    background-color: #f0f0f0;
  }
}

.category_group {
  display: flex;
  flex-wrap: wrap;
  margin: 0 $spacing;
  padding-bottom: 2 * $spacing;
}

.category_item {
  width: 33.33%;

  .tag {
    display: block;
    margin: $spacing;
    padding: 2 * $spacing $spacing;
    border-radius: $spacing;
    box-sizing: border-box;
    text-align: center;
    background-color: #f0f0f0;
    color: #555;
  }
}
</style>
