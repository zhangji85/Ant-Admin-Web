// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "./assets/font/font.css";
import Antd from 'ant-design-vue/es';
import store from '@/store';
import App from './App'
import './style/antd-variables.less';
import router from './router'
import './packages'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //样式必须引入
import resize from 'vue-resize-directive'
// 公共样式
import "./style/common.css";



Vue.config.productionTip = false

Vue.use(Antd);

Vue.directive('resize', resize)

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
 
 
router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})
 
router.afterEach(() => {
  NProgress.done();
})

const $mc = {}
Vue.prototype.$mc = $mc
// 混入
let vuexStore = require('@/store/$mc.mixin.js')
Vue.mixin(vuexStore.mcStore)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: vuexStore.store,
  router,
  components: { App },
  template: '<App/>'
})
