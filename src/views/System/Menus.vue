<template>
  <div class="meuns-div">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      class="amenu"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.menu_id">
          <a-icon
            :type="item.menu_icon"
            :theme="item.icon_theme ? item.icon_theme : 'filled'"
            v-if="item.menu_icon"
          />
          <span>{{ item.menu_name }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.menu_id" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from "ant-design-vue";
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.menu_id" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.menu_icon" :theme="menuInfo.icon_theme?menuInfo.icon_theme : 'filled'" v-if="menuInfo.menu_icon" /><span>{{ menuInfo.menu_name }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.menu_id">
            <a-icon :type="item.menu_icon" :theme="item.icon_theme?item.icon_theme: 'filled'" v-if="item.menu_icon" />
            <span>{{ item.menu_name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.menu_id" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
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
    "sub-menu": SubMenu
  },
  props: ["collapsed"],
  data() {
    return {
      list: [
        {
          menu_id: "222",
          menu_name: "系统管理",
          menu_appid: null,
          menu_type: "CONTENTS",
          menu_path: "CONTENTS",
          menu_icon: "setting",
          icon_theme: "filled",
          above_menu_id: "root",
          children: [
            {
              menu_id: "242",
              menu_name: "菜单配置",
              menu_appid: null,
              menu_type: "diy",
              menu_path: "menucfg2",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "222"
            },
            {
              menu_id: "234",
              menu_name: "用户管理",
              menu_appid: 10242,
              menu_type: "diy",
              menu_path: "displaypage",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "222"
            },
            {
              menu_id: "225",
              menu_name: "角色管理",
              menu_appid: 10243,
              menu_type: "diy",
              menu_path: "displaypage",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "222"
            },
            {
              menu_id: "262",
              menu_name: "机构管理",
              menu_appid: null,
              menu_type: "diy",
              menu_path: "orgcfg",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "222"
            },
            {
              menu_id: "247",
              menu_name: "数据字典配置",
              menu_appid: 10244,
              menu_type: "diy",
              menu_path: "displaypage",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "222"
            },
            {
              menu_id: "223",
              menu_name: "交易日志",
              menu_appid: 10245,
              menu_type: "displaypage",
              menu_path: "displaypage",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "222"
            },
            {
              menu_id: "282",
              menu_name: "序列工厂",
              menu_appid: 10246,
              menu_type: "displaypage",
              menu_path: "displaypage",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "222"
            }
          ]
        },
        {
          menu_id: "380",
          menu_name: "监控管理",
          menu_appid: null,
          menu_type: "CONTENTS",
          menu_path: "CONTENTS",
          menu_icon: "video-camera",
          icon_theme: "filled",
          above_menu_id: "root",
          children: [
            {
              menu_id: "381",
              menu_name: "监控列表",
              menu_appid: null,
              menu_type: "diy",
              menu_path: "",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "380"
            },
            {
              menu_id: "382",
              menu_name: "分屏查看",
              menu_appid: null,
              menu_type: "diy",
              menu_path: "",
              menu_icon: "",
              icon_theme: "",
              above_menu_id: "380"
            }
          ]
        },
        {
          menu_id: "383",
          menu_name: "告警管理",
          menu_appid: null,
          menu_type: "diy",
          menu_path: "",
          menu_icon: "alert",
          icon_theme: "filled",
          above_menu_id: "root"
        },
        {
          menu_id: "385",
          menu_name: "一键报警",
          menu_appid: null,
          menu_type: "diy",
          menu_path: "",
          menu_icon: "phone",
          icon_theme: "filled",
          above_menu_id: "root"
        }
      ]
    };
  },
  methods: {
    // toggleCollapsed() {
    //   this.collapsed = !this.collapsed;
    // }
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
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}
.amenu::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background: #54626f;
}
.amenu::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background-color: #263848;
  border-radius: 10px;
}
</style>
