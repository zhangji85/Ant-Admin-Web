import Vue from 'vue';
import 'assets/font/font.css';
import Antd from 'ant-design-vue/es';
import router from '@/router';
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; //样式必须引入
import resize from 'vue-resize-directive';
// 公共样式
import 'assets/styles/common.css';

Vue.use(Antd);
Vue.directive('resize', resize);

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
