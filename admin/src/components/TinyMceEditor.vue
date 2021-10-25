<template>
  <Editor :api-key="apiKey" :init="editorOptions" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@tinymce/tinymce-vue";
export default defineComponent({
  name: "TinyMceEditor",
  components: { Editor },

  setup() {
    const apiKey = process.env.VUE_APP_TINYMCE_API_KEY;
    const editorOptions = {
      language_url: "/tinymce-langs/zh_CN.js", //汉化文件的路径, 以'public'为起始路径
      language: "zh_CN",

      height: 500,
      menubar: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
      toolbar:
        "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | paste pastetext | help",
    };

    return { apiKey, editorOptions };
  },
});
</script>
