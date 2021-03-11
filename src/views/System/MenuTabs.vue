<template>
  <div class="menu-tabs">
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit">
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :closable="panes.length > 1"
      >
        <span slot="tab">
          <a-icon :type="pane.icon" v-if="pane.icon" />
          {{ pane.title }}
          <a-button
            type="link"
            ghost
            icon="reload"
            class="reload-icon"
            v-show="activeKey == pane.key"
          >
          </a-button>
        </span>
      </a-tab-pane>
      <a-dropdown slot="tabBarExtraContent" class="extra-dropdown">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <a-icon type="down-square" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            关闭当前标签
          </a-menu-item>
          <a-menu-item key="1">
            关闭其他标签
          </a-menu-item>
          <a-menu-item key="3">
            关闭所有标签
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    const panes = [
      { title: "用户管理", key: "1" },
      { title: "角色管理", key: "2" },
      { title: "机构管理", key: "3" }
    ];
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    add() {
      const panes = this.panes;
      const activeKey = `newTab${this.newTabIndex++}`;
      panes.push({
        title: "New Tab",
        key: activeKey
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.panes = panes;
      this.activeKey = activeKey;
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
