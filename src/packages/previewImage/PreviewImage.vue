<template>
  <div>
    <div class="img-box">
      <div class="img-content">
        <div class="img-mask">
          <span title="预览图片" class="preview-action" @click="handlePreview">
            <a-icon type="eye" :class="status ? 'pre-icon' : ''" />
          </span>
        </div>
        <img
          width="96"
          height="96"
          :src="src"
          @error="loadError"
          v-if="status"
        />
        <a-avatar shape="square" :size="96" v-else>
          <span style="font-size: 14px">加载失败</span>
        </a-avatar>
      </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" width="100%" :src="src" />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "v-preview-image",
  props: {
    src: {
      type: String
    }
  },
  data() {
    return {
      status: true,
      previewVisible: false
    };
  },
  mounted() {},

  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview() {
      if (this.status) {
        this.previewVisible = true;
      }
    },
    loadError(e) {
      console.log("e=", e);
      this.status = false;
    }
  },
  watch: {
    img: {
      handler(val) {
        this.status = true;
      }
    },
    deep: true,
    immediate: true
  }
};
</script>
<style scoped>
.img-box {
  float: left;
  margin: 0 8px 8px 0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.img-content {
  position: relative;
  padding: 8px;
}
.img-mask {
  position: absolute;
  z-index: 1;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.3s;
}
.img-mask:hover {
  opacity: 1;
}
.preview-action {
  position: absolute;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  top: 50%;
  left: 50%;
  z-index: 10;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
}
.pre-icon:hover {
  color: #fff;
}
</style>
