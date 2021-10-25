<template>
  <h1>Chapter</h1>
  <TinyMceEditor />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import TinyMceEditor from "@/components/TinyMceEditor.vue";

export default defineComponent({
  name: "Chapter",
  components: { TinyMceEditor },

  setup() {
    const { novelId, chapterId } = useRoute().params;
    console.log(novelId, chapterId);
  },
});
</script>
