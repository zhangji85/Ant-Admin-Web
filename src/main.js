// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "./assets/font/font.css";
import Antd from 'ant-design-vue/es';
import store from '@/store';
import App from './App'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //样式必须引入


Vue.config.productionTip = false

Vue.use(Antd);

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
 
 
router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})
 
router.afterEach(() => {
  NProgress.done()
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
