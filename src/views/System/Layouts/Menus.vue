<template>
  <div class="meuns-div">
    <a-menu
      :openKeys="openKeys"
      :selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      class="amenu"
      @openChange="onOpenChange"
      @select="select"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.id">
          <a-icon
            :type="item.icon"
            :theme="item.icon_theme ? item.icon_theme : 'outlined'"
            v-if="item.icon"
          />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.id" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue';
import menuList from './menuList.js';
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.id" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.icon" :theme="menuInfo.icon_theme?menuInfo.icon_theme : 'outlined'" v-if="menuInfo.icon" />
          <span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.id">
            <a-icon :type="item.icon" :theme="item.icon_theme?item.icon_theme: 'outlined'" v-if="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.id" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
export default {
  components: {
    'sub-menu': SubMenu
  },
  props: ['collapsed'],
  data() {
    return {
      nodePathArray: [],
      openKeys: [],
      menuItem: null,
      list: menuList,
      activeItem: {}
    };
  },
  mounted() {
    this.getPathByKey(this.vuex_active_tabKey, 'id', this.list);
    this.initRouter();
  },
  computed: {
    rootSubmenuKeys() {
      let list = [];
      for (let i = 0; i < this.list.length; i++) {
        list.push(this.list[i]['id']);
      }
      return list;
    },
    selectedKeys() {
      let id = this.vuex_active_tabKey;
      if (id) {
        return [id];
      }
      return [];
    }
  },
  methods: {
    // 菜单点击
    select({ item, key, selectedKeys }) {
      this.getPathByKey(key, 'id', this.list).then((val) => {
        this.route_to(
          this.menuItem['id'],
          this.menuItem['target'],
          this.menuItem['path'],
          this.menuItem
        );
      });
    },
    // 路由跳转
    route_to(id, target, path, item) {
      if (target == '_blank') {
        // 打开新标签页
        let routeUrl = this.$router.resolve({
          path: '/' + path
        });
        window.open(routeUrl.href, '_blank');
      } else if (target == '_top') {
        // 当前标签新页面
        this.$router.push({
          path: '/' + path
        });
      } else {
        // 当前页面新Tab
        this.$router.push({
          path: '/' + path,
          query: { id: id }
        });
        this.activeItem = {
          id: item.id,
          title: item.title,
          path: item.path,
          icon: item.icon,
          icon_theme: item.icon_theme
        };
      }
    },
    addTab(tab) {
      let tabArrStr = JSON.stringify(this.vuex_tabsArr);
      if (tabArrStr.indexOf(JSON.stringify(tab)) !== -1) {
        this.$mc.vuex('vuex_active_tabKey', tab.id);
        return;
      }
      let tabsArr = JSON.parse(tabArrStr);
      tabsArr.push(tab);
      this.$mc.vuex('vuex_tabsArr', tabsArr);
      this.$mc.vuex('vuex_active_tabKey', tab.id);
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    initRouter() {
      this.vuex_tabsArr.forEach((tab, i) => {
        if (tab.id === this.vuex_active_tabKey) {
          // 当前页面新Tab
          this.$router.push({
            path: '/' + tab.path,
            query: { id: tab.id }
          });
        }
      });
    },
    /*arr为树形结构数组，value为要查询的树节点的标识值，key则为标识
     我是用的是id,则key是"id"*/
    // 获取指定节点的路径数组
    getPathByKey(value, key, arr) {
      // 用于存储节点唯一标识值路径数组
      this.nodePathArray = [];
      try {
        for (let i = 0; i < arr.length; i++) {
          this.getNodePath(arr[i], key, value);
        }
      } catch (e) {
        this.openKeys = this.nodePathArray.slice(0, -1);
        // return this.nodePathArray;
        return Promise.resolve(/* 这里是需要返回的数据*/);
      }
    },
    getNodePath(node, key, value) {
      // 这里可以自定义push的内容，而不是整个node,而且这里node也包含了children
      this.nodePathArray.push(node[key]);
      // 找到符合条件的节点，通过throw终止掉递归
      if (node[key] === value) {
        // 也可以直接使用return;结束循环
        this.menuItem = node;
        throw 'over!';
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          this.getNodePath(node.children[i], key, value);
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        this.nodePathArray.pop();
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        this.nodePathArray.pop();
      }
    }
  },
  watch: {
    $route(to, from) {
      let path = this.$route.path;
      this.getPathByKey(this.$route.query['id'], 'id', this.list);
      if (path == '/' + this.activeItem['path']) {
        this.addTab(this.activeItem);
      }
    }
  }
};
</script>

<style scoped>
.meuns-div {
  width: 100%;
}

.amenu {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  overflow: auto;
}
.amenu::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}
.amenu::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 0px;
  background: #54626f;
}
.meuns-div
  .ant-menu-inline-collapsed
  /deep/
  .ant-menu-submenu
  > .ant-menu-submenu-title {
  padding: 0 16px !important;
}
.meuns-div .ant-menu-inline-collapsed /deep/ .ant-menu-item {
  padding: 0 16px !important;
}
.meuns-div /deep/ .ant-menu-inline-collapsed {
  width: 48px;
}
</style>
