// 1.引入模块
import Vue from 'vue';
import VueRouter from 'vue-router';

// 2.引入页面模块
import RouteList from './common.js';

// 3.声明使用
Vue.use(VueRouter);

// 4.创建路由对象
const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: RouteList
});

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/404'); // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  }
  next(); // 如果匹配到正确跳转
});

// 5.导出路由对象
export default router;
