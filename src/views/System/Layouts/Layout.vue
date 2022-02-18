<template>
  <a-layout class="layout-div">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      width="208"
      class="layout-sider"
    >
      <div class="logo">
        <img :src="logoUrl" alt="logo" />
        <div v-if="!collapsed" class="textover1 sys-tilte">后台管理系统</div>
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
        <div class="header-top">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <head-menu></head-menu>
        </div>
        <menu-tabs></menu-tabs>
      </a-layout-header>
      <a-layout-content
        class="layout-content"
        :style="{
          marginLeft: leftWith,
          width: 'calc(100% - ' + leftWith + ')'
        }"
      >
        <div class="views-content">
          <router-view v-if="vuex_pageReload" id="router-view" />
        </div>
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
import Menus from 'views/System/Layouts/Menus.vue';
import HeadMenu from 'views/System/Layouts/HeadMenu';
import MenuTabs from 'views/System/Layouts/MenuTabs';
export default {
  components: {
    Menus,
    HeadMenu,
    MenuTabs
  },
  data() {
    return {
      collapsed: false,
      logoUrl: require('assets/images/logo.svg')
    };
  },
  computed: {
    leftWith() {
      if (this.collapsed) {
        return '48px';
      }
      return '208px';
    }
  }
};
</script>
<style scoped>
.layout-div {
  min-height: 100%;
}
.layout-div .trigger {
  font-size: 18px;
  line-height: 48px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  /* display: none; */
}

.layout-div .trigger:hover {
  color: #1890ff;
}
.layout-div /deep/ .ant-layout-sider-collapsed {
  flex: 0 0 48px !important;
  max-width: 48px !important;
  min-width: 48px !important;
  width: 48px !important;
}

#router-view {
  position: relative;
  /* transform: translate3d(0,0,0); */
  transform-style: preserve-3d;
  backface-visibility: hidden;
  perspective: 1000;
}

.logo {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  height: 32px;
  margin: 8px 0;
  line-height: 32px;
  font-size: 18px;
  color: #fff;
  padding-left: 6px;
}
.logo img {
  width: 36px;
}
.sys-tilte {
  margin-left: 8px;
}
.sider-menu {
  position: relative;
  height: calc(100% - 48px);
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
  align-content: center;
  width: 100%;
  height: 48px;
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
.header-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.layout-content {
  margin-top: 86px;
  min-height: calc(100% - 155px);
}

.views-content {
  padding: 20px;
  min-height: 360px;
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
