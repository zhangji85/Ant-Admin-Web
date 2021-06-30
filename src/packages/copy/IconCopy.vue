<template>
  <div class="icon-copy">
    <slot></slot>
    <a-icon
      v-if="!success"
      type="copy"
      class="copy-icon"
      v-clipboard:copy="copy"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    />
    <a-icon v-else type="check" class="copy-icon copy-success-icon" />
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
export default {
  name: "v-icon-copy",
  props: ["copy"],
  data() {
    return {
      success: false
    };
  },
  mounted() {},
  methods: {
    // 复制成功
    onCopy(e) {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 1000);
    },
    // 复制失败
    onError(e) {
      this.success = false;
      console.log("复制失败");
    }
  }
};
</script>
<style lang="less" scoped>
.icon-copy {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.copy-icon {
  padding-left: 5px;
  color: @primary-color;
  cursor: pointer;
}
.copy-success-icon {
  color: @success-color;
}
</style>
