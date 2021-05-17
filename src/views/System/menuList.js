const menuList = [
  {
    id: "3",
    title: "系统管理",
    appid: "",
    target: "",
    type: "CONTENTS",
    path: "CONTENTS",
    icon: "setting",
    icon_theme: "filled",
    above_id: "root",
    children: [
      {
        id: "3-1",
        title: "用户管理",
        appid: "",
        target: "",
        type: "PAGE",
        path: "",
        icon: "usergroup-add",
        icon_theme: "",
        above_id: "3"
      },
      {
        id: "3-2",
        title: "角色管理",
        appid: "",
        target: "",
        type: "PAGE",
        path: "",
        icon: "solution",
        icon_theme: "",
        above_id: "3"
      },
      {
        id: "3-3",
        title: "权限管理",
        appid: "",
        target: "",
        type: "PAGE",
        path: "",
        icon: "safety",
        icon_theme: "",
        above_id: "3"
      }
    ]
  },
  {
    id: "2",
    title: "用户中心",
    appid: "",
    target: "",
    type: "CONTENTS",
    path: "CONTENTS",
    icon: "aliwangwang",
    icon_theme: "filled",
    above_id: "root",
    children: [
      {
        id: "2-1",
        title: "个人设置",
        appid: "",
        target: "",
        type: "PAGE",
        path: "user",
        icon: "user",
        icon_theme: "",
        above_id: "2"
      }
    ]
  },
  {
    id: "4",
    title: "缺省页",
    appid: "",
    target: "",
    type: "CONTENTS",
    path: "CONTENTS",
    icon: "warning",
    icon_theme: "filled",
    above_id: "root",
    children: [
      {
        id: "4-1",
        title: "403",
        appid: "",
        target: "",
        type: "PAGE",
        path: "403",
        icon: "",
        icon_theme: "",
        above_id: "4"
      },
      {
        id: "4-2",
        title: "404",
        appid: "",
        target: "",
        type: "PAGE",
        path: "404",
        icon: "",
        icon_theme: "",
        above_id: "4"
      },
      {
        id: "4-3",
        title: "500",
        appid: "",
        target: "",
        type: "PAGE",
        path: "500",
        icon: "",
        icon_theme: "",
        above_id: "4"
      }
    ]
  },  
  {
      id: "1",
      title: "鉴权页",
      appid: "",
      target: "", // _blank 新页面， _self 当前页， _top 当前页上层
      type: "CONTENTS",
      path: "CONTENTS",
      icon: "safety-certificate",
      icon_theme: "filled",
      above_id: "root",
      children: [
        {
          id: "1-1",
          title: "登录页",
          appid: "",
          target: "_top",
          type: "PAGE",
          path: "login",
          icon: "login",
          icon_theme: "",
          above_id: "1"
        },
        {
          id: "1-2",
          title: "登录页2",
          appid: "",
          target: "_blank",
          type: "PAGE",
          path: "login2",
          icon: "login",
          icon_theme: "",
          above_id: "1"
        },
        {
          id: "1-3",
          title: "注册页",
          appid: "",
          target: "_top",
          type: "PAGE",
          path: "register",
          icon: "user-add",
          icon_theme: "",
          above_id: "1"
        }
      ]
  },
  {
      id: "5",
      title: "配置化表格表单",
      appid: "",
      target: "",
      type: "CONTENTS",
      path: "CONTENTS",
      icon: "golden",
      icon_theme: "filled",
      above_id: "root",
      children: [
        {
          id: "5-1",
          title: "配置化表格",
          appid: "",
          target: "",
          type: "PAGE",
          path: "crudtable",
          icon: "schedule",
          icon_theme: "",
          above_id: "5"
        },
        {
          id: "5-2",
          title: "配置化表单",
          appid: "",
          target: "",
          type: "PAGE",
          path: "crudform",
          icon: "profile",
          icon_theme: "",
          above_id: "5"
        }
      ]
  },
  {
      id: "7",
      title: "编辑器",
      appid: "",
      target: "",
      type: "CONTENTS",
      path: "CONTENTS",
      icon: "edit",
      icon_theme: "filled",
      above_id: "root",
      children: [
        {
          id: "7-1",
          title: "富文本编辑器",
          appid: "",
          target: "",
          type: "PAGE",
          path: "quillview",
          icon: "",
          icon_theme: "",
          above_id: "7"
        },
        {
          id: "7-2",
          title: "Markdown编辑器",
          appid: "",
          target: "",
          type: "PAGE",
          path: "mavonview",
          icon: "",
          icon_theme: "",
          above_id: "7"
        }
      ]
  },
  {
      id: "6",
      title: "test",
      appid: "",
      target: "",
      type: "PAGE",
      path: "test",
      icon: "fire",
      icon_theme: "filled",
      above_id: "root",
  },   
]

export default menuList