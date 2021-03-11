<template>
  <div class="header-right">
    <a-dropdown v-model="visible">
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <a-avatar style="backgroundColor:#87d068" icon="user" size="small" />
        <span>Admin</span>
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="0">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item key="1">
          <a-icon type="lock" />
          修改密码
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleMenuClick(e) {
      if (e.key === "3") {
        this.visible = false;
      }
    }
  }
};
</script>

<style scoped>
.header-right {
  position: absolute;
  height: 64px;
  overflow: hidden;
  right: 0;
  top: 0;
  padding-right: 30px;
}
</style>
