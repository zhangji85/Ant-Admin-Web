<template>
  <div class="auth-base">
    <div class="container">
      <div class="logo">
        <img :src="logoUrl" alt="logo" />
        后台管理系统
      </div>
      <div class="auth-content">
        <slot></slot>
      </div>
    </div>
    <div class="copyright">
      Ant Admin © 2021 Created by Zhangji
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthBase",
  data() {
    return {
      logoUrl: require("../../assets/img/logo.svg")
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.auth-base {
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-size: 16px;
  background-image: url("../../assets/img/background.svg");
}
.container {
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 110px 0 144px;
}
.logo {
  height: 44px;
  margin: 20px 0;
  line-height: 44px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
}
.logo img {
  height: 44px;
}
.auth-content {
  width: 368px;
  min-width: 260px;
  margin: 0 auto;
}
.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 48px 0 24px;
  padding: 0 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>
