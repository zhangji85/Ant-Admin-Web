<template>
  <div class="quill-view">
    <a-card>
      <v-quill v-model="content"></v-quill>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "QuillView",
  data() {
    return {
      content: ""
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped></style>
