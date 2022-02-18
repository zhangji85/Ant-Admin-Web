<template>
  <div class="menu-tabs">
    <a-tabs
      :activeKey="vuex_active_tabKey"
      hide-add
      type="editable-card"
      @edit="onEdit"
      @change="changeTab"
    >
      <a-tab-pane
        v-for="pane in vuex_tabsArr"
        :key="pane.id"
        :closable="vuex_tabsArr.length > 1"
      >
        <span slot="tab">
          <a-icon
            :type="pane.icon"
            :theme="pane.icon_theme ? pane.icon_theme : 'outlined'"
            v-if="pane.icon"
          />
          {{ pane.title }}
          <a-button
            type="link"
            ghost
            class="reload-icon"
            v-show="vuex_active_tabKey == pane.id"
            @click="refreshCurr"
          >
            <a-icon type="reload" :spin="!vuex_pageReload" />
          </a-button>
        </span>
      </a-tab-pane>
      <a-dropdown slot="tabBarExtraContent" class="extra-dropdown">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <a-icon type="down-square" />
        </a>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="refresh-curr">
            刷新当前标签
          </a-menu-item>
          <a-menu-item key="close-curr" :disabled="vuex_tabsArr.length == 1">
            关闭当前标签
          </a-menu-item>
          <a-menu-item key="close-other" :disabled="vuex_tabsArr.length == 1">
            关闭其他标签
          </a-menu-item>
          <!-- <a-menu-item key="close-all" :disabled="vuex_tabsArr.length == 1">
            关闭所有标签
          </a-menu-item> -->
        </a-menu>
      </a-dropdown>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    callback(key) {
      console.log(key);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    changeTab(activeKey) {
      this.vuex_tabsArr.forEach((tab, i) => {
        if (tab.id === activeKey) {
          // 当前页面新Tab
          this.$router.push({
            path: "/" + tab.path,
            query: { id: tab.id }
          });
          this.$mc.vuex("vuex_active_tabKey", tab.id);
        }
      });
    },
    remove(targetKey) {
      let activeKey = this.vuex_active_tabKey;
      let lastIndex;
      let pane;
      this.vuex_tabsArr.forEach((tab, i) => {
        if (tab.id === targetKey) {
          lastIndex = i - 1;
        }
      });
      const tabsArr = this.vuex_tabsArr.filter(tab => tab.id !== targetKey);
      if (tabsArr.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = tabsArr[lastIndex].id;
          pane = tabsArr[lastIndex];
        } else {
          activeKey = tabsArr[0].id;
          pane = tabsArr[0];
        }
        this.$router.push({
          path: "/" + pane.path,
          query: { id: pane.id }
        });
      }
      this.$mc.vuex("vuex_tabsArr", tabsArr);
      this.$mc.vuex("vuex_active_tabKey", activeKey);
    },
    handleMenuClick(e) {
      switch (e.key) {
        case "close-curr":
          this.closeCurr();
          break;
        // case "close-all":
        //   this.closeAll();
        //   break;
        case "close-other":
          this.closeOther();
          break;
        case "refresh-curr":
          this.refreshCurr();
      }
    },
    // 关闭当前页
    closeCurr() {
      if (this.vuex_tabsArr.length <= 1) return;
      let targetKey = this.vuex_active_tabKey;
      this.remove(targetKey);
    },
    // 关闭其他标签
    closeOther() {
      let tabsArr = JSON.parse(JSON.stringify(this.vuex_tabsArr));
      let targetKey = this.vuex_active_tabKey;
      let currItem;
      tabsArr.forEach((tab, i) => {
        if (tab.id === targetKey) {
          currItem = tab;
        }
      });
      tabsArr.splice(0);
      tabsArr.splice(0, 0, currItem);
      this.$mc.vuex("vuex_tabsArr", tabsArr);
    },
    // 刷新当前页
    refreshCurr() {
      // 刷新当前标签
      this.$mc.vuex("vuex_pageReload", false);
      this.$nextTick(() => {
        setTimeout(() => {
          this.$mc.vuex("vuex_pageReload", true);
        }, 1000);
      });
    }
  }
};
</script>

<style scoped>
.menu-tabs {
  transform: translateY(-1px);
}
.menu-tabs /deep/ .ant-tabs-bar {
  margin: 0;
  background-color: #f9f9f9;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
}
.menu-tabs /deep/ .ant-tabs-tab {
  background-color: #f9f9f9;
  margin-right: 0 !important;
  border-radius: 0 !important;
  font-weight: 500 !important;
}
.reload-icon {
  font-size: 13px;
  color: #9f9f9f;
  width: 20px;
  padding-left: 3px;
}
.extra-dropdown {
  padding: 0 16px;
  color: #7f7f7f;
}
.extra-dropdown:hover {
  color: #1890ff;
}
</style>
