<template>
  <div class="qrcode-main">
    <div id="vqrcode" ref="vqrcode"></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "v-qrcode",
  props: {
    width: {
      type: [Number, String],
      default: 200
    },
    height: {
      type: [Number, String],
      default: 200
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    create_qrcode(text) {
      if (!text) {
        return;
      }
      document.getElementById("vqrcode").innerHTML = "";
      this.$nextTick(() => {
        let qrcode = new QRCode("vqrcode", {
          width: this.width, // 二维码宽度，单位像素
          height: this.height, // 二维码高度，单位像素
          text: text // 生成二维码的链接
        });
      });
    }
  }
};
</script>
<style scoped></style>
