<template>
  <Editor
    :api-key="apiKey"
    :init="editorOptions"
    :tinymce-script-src="tinymceScriptSrc"
    v-model="html"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref } from 'vue'
import Editor from "@tinymce/tinymce-vue";

const props = withDefaults(defineProps<{ value?: string }>(), { value: "" })
const html = ref(props.value)

const apiKey = process.env.VUE_APP_TINYMCE_API_KEY;
const tinymceScriptSrc = "/tinymce/tinymce.min.js"
const editorOptions = {
  language_url: "/tinymce/langs/zh_CN.js", //汉化文件的路径, 以'public'为起始路径
  language: "zh_CN",

  height: 500,
  menubar: false,
  plugins: [
    "advlist autolink lists link charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | paste pastetext | help",
};
</script>