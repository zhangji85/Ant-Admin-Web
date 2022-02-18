<template>
  <div class="header-right">
    <div class="header-content">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span style="font-size: 12px">GitHub</span>
        </template>
        <div class="icon-btn" @click="toGithub">
          <a-icon type="github" />
        </div>
      </a-tooltip>
      <a-divider type="vertical" />
      <a-dropdown v-model="visible">
        <div class="user-info">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <a-avatar class="avatar" :size="24" icon="user" />
            <span style="padding-left: 5px">Admin</span>
            <a-icon type="down" />
          </a>
        </div>
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
      if (e.key === '3') {
        this.visible = false;
      }
    },
    toGithub() {
      window.open('https://github.com/zhangji85/Ant-Admin-Web', '_blank');
    }
  }
};
</script>

<style scoped>
.header-right {
  /* position: absolute; */
  height: 48px;
  overflow: hidden;
  right: 0;
  top: 0;
  padding-right: 30px;
}
.header-content {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
}
.user-info {
  padding: 0 16px;
  font-size: 14px;
  line-height: 48px;
}
.user-info:hover {
  background-color: rgba(0, 0, 0, 0.025);
}
.avatar {
  background-color: rgba(24, 144, 255, 0.8);
  transform: translateY(-2px);
}
.icon-btn {
  width: 36px;
  text-align: center;
  height: 32px;
  font-size: 18px;
  line-height: 32px;
  border-radius: 4px;
  color: #959cb6;
  cursor: pointer;
}
.icon-btn:hover {
  background: rgba(24, 144, 255, 0.1);
  color: rgb(24, 144, 255);
}
</style>
