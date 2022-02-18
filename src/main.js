import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/styles/antd-variables.less';
import './packages'; // 引入所有自定义组件
import * as filters from './filters'; // 全局过滤器
import './plugins'; // 全局插件or函数
import './utils'; // 全局自定义功能函数

Vue.config.productionTip = false;

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 封装 vuex 配置
const $mc = {};
Vue.prototype.$mc = $mc;
// 混入
let vuexStore = require('@/store/$mc.mixin.js');
Vue.mixin(vuexStore.mcStore);

new Vue({
  router,
  store: vuexStore.store,
  render: (h) => h(App)
}).$mount('#app');
