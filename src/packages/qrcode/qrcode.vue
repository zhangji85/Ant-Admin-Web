<template>
  <div class="qrcode-main" ref="qrcode_main">
    <div id="vqrcode" ref="vqrcode"></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "v-qrcode",
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
      let width = this.$refs.qrcode_main.clientWidth;
      let height = this.$refs.qrcode_main.clientHeight;
      this.$nextTick(() => {
        let qrcode = new QRCode("vqrcode", {
          width: width, // 二维码宽度，单位像素
          height: height, // 二维码高度，单位像素
          text: text // 生成二维码的链接
        });
      });
    }
  }
};
</script>
<style scoped>
.qrcode-main {
  width: 100%;
  height: 100%;
}
</style>
