<template>
  <div class="mavon">
    <mavonEditor
      :value="content"
      @change="onEditorChange"
      style="height: 800px"
    />
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "v-mavon",
  components: {
    mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      content: this.value
    };
  },
  mounted() {},
  methods: {
    onEditorChange(value, render) {
      this.$emit("input", value);
    }
  }
};
</script>
<style scoped></style>
