<template>
  <div class="default-page">
    <div class="img">
      <img :src="config[type].img" />
    </div>
    <div class="content">
      <div class="title">{{ config[type].title }}</div>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="action">
        <a-button type="primary" @click="handleToHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import types from "./type";

export default {
  name: "DefaultPage",
  props: {
    type: {
      type: String,
      default: "404"
    }
  },
  data() {
    return {
      config: types
    };
  },
  methods: {
    handleToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.default-page {
  min-height: 500px;
  height: 80%;
  align-items: center;
  text-align: center;
  margin-top: 150px;
}
.img {
  padding-right: 52px;
  zoom: 1;
}
.content {
  flex: auto;
}
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  margin-top: 24px;
  text-align: center;
}
.desc {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 32px;
}
</style>
