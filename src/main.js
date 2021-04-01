// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "./assets/font/font.css";
import Antd from 'ant-design-vue/es';
import store from '@/store';
import App from './App'
import 'ant-design-vue/dist/antd.css';
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
  setTimeout(()=>{
    // 此处粘贴百度统计复制过来的代码
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?1b329cb0d5558d09dfafb00d46f02386";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
},0);
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
