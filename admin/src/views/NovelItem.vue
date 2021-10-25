<template>
  <h1>NovelItem</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "NovelItem",
  setup() {
    const { novelId } = useRoute().params;
    console.log(novelId);
  },
});
</script>
