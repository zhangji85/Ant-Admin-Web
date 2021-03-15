<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      width="240"
      class="layout-sider"
    >
      <div class="logo">
        <img :src="logoUrl" alt="logo" />
        <span v-if="!collapsed">后台管理系统</span>
      </div>
      <div class="sider-menu">
        <menus :collapsed="collapsed"></menus>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        class="layout-header"
        :style="{ width: 'calc(100% - ' + leftWith + ')' }"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <head-menu></head-menu>
        <menu-tabs></menu-tabs>
      </a-layout-header>
      <a-layout-content
        class="layout-content"
        :style="{
          marginLeft: leftWith,
          width: 'calc(100% - ' + leftWith + ')'
        }"
      >
        <router-view
          v-if="vuex_pageReload"
          id="router-view"
          :style="{ padding: '24px', minHeight: '360px' }"
        />
        <!-- <div class="views-content"></div> -->
      </a-layout-content>
      <a-layout-footer
        :style="{
          textAlign: 'center',
          marginLeft: leftWith,
          width: 'calc(100% - ' + leftWith + ')'
        }"
      >
        Ant Admin © 2021 Created by Zhangji
      </a-layout-footer>
    </a-layout>
    <a-back-top>
      <div class="ant-back-top-inner">
        <a-icon type="up" />
      </div>
    </a-back-top>
  </a-layout>
</template>
<script>
import Menus from "@/views/System/Menus.vue";
import HeadMenu from "@/views/System/HeadMenu";
import MenuTabs from "@/views/System/MenuTabs";
export default {
  components: {
    Menus,
    HeadMenu,
    MenuTabs
  },
  data() {
    return {
      collapsed: false,
      logoUrl: require("../../assets/img/logo.svg")
    };
  },
  computed: {
    leftWith() {
      if (this.collapsed) {
        return "80px";
      } else {
        return "240px";
      }
    }
  }
};
</script>
<style scoped>
#components-layout-demo-custom-trigger {
  min-height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#router-view {
  position: relative;
  /* transform: translate3d(0,0,0); */
  transform-style: preserve-3d;
  backface-visibility: hidden;
  perspective: 1000;
}

.logo {
  height: 32px;
  margin: 16px;
  line-height: 36px;
  font-size: 18px;
  color: #fff;
  padding-left: 6px;
}
.logo img {
  width: 36px;
}

.sider-menu {
  position: relative;
  height: calc(100% - 64px);
}
.layout-sider {
  position: fixed;
  height: 100vh;
  z-index: 1;
  left: 0;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
}
.layout-header {
  position: fixed;
  width: 100%;
  z-index: 1;
  background: #fff;
  right: 0;
  padding: 0;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  transition: width 0.2s;
  -moz-transition: width 0.2s; /* Firefox 4 */
  -webkit-transition: width 0.2s; /* Safari 和 Chrome */
  -o-transition: width 0.2s; /* Opera */
}
.layout-content {
  margin-top: 100px;
  min-height: calc(100% - 169px);
}

.views-content {
  margin: 14px 14px;
  padding: 20px;
  background: #fff;
  height: 2000px;
}
.ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #5d78ff;
  color: #fff;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 0 0.9375rem 0.0625rem rgb(69 65 78 / 20%);
}
</style>
