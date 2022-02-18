// 引入页面模块
import RouterConfig from './modules';

export default [
  {
    path: '/',
    name: 'layout',
    component: (resolve) =>
      require(['views/System/Layouts/Layout.vue'], resolve),
    children: RouterConfig
  },
  {
    path: '/403',
    name: '403',
    component: (resolve) => require(['views/System/Default/403.vue'], resolve)
  },
  {
    path: '/404',
    name: '404',
    component: (resolve) => require(['views/System/Default/404.vue'], resolve)
  },
  {
    path: '/500',
    name: '500',
    component: (resolve) => require(['views/System/Default/500.vue'], resolve)
  },
  {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['views/System/Auth/Login.vue'], resolve)
  },
  {
    path: '/login2',
    name: 'login2',
    component: (resolve) => require(['views/System/Auth/Login2.vue'], resolve)
  },
  {
    path: '/register',
    name: 'register',
    component: (resolve) => require(['views/System/Auth/Register.vue'], resolve)
  }
];
