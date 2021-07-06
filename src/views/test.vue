<template>
  <div class="test">
    <v-card>
      test
      <a-input v-model="url" style="width: 50%;margin-bottom: 10px"></a-input>
      <v-qrcode ref="qrcode"></v-qrcode>
      <a-button type="primary" @click="create">生成二维码</a-button>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      url: ""
    };
  },
  mounted() {},
  methods: {
    create() {
      this.$refs.qrcode.create_qrcode(this.url);
    }
  }
};
</script>
<style scoped></style>
