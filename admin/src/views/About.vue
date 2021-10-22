<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ElButton>Click</ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElButton } from "element-plus";

export default defineComponent({
  name: "About",
  components: { ElButton },
});
</script>
