<template>
  <div class="quill">
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      @change="onEditorChange"
      class="quill-editor"
    ></quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "v-quill",
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 富文本编辑器默认内容
      content: this.value,
      //富文本编辑器配置
      editorOption: {
        placeholder: "编辑文章内容"
      }
    };
  },
  mounted() {},
  methods: {
    //内容改变事件
    onEditorChange({ editor, html, text }) {
      //   this.content = html;
      this.$emit("input", html);
    }
  }
};
</script>
<style scoped>
.quill-editor {
  position: relative;
  height: calc(100vh - 286px);
}
.quill-editor /deep/ .ql-container {
  height: calc(100% - 42px) !important;
}
</style>
