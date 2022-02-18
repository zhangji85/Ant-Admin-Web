import router from '@/router';

setWxUrl(window.location.href);
router.beforeEach((to, from, next) => {
  // beforeEach是router的钩子函数，在进入路由前执行
  setWxUrl(location.origin + '/' + to.fullPath);
  next(); // 执行进入路由，如果不写就不会进入目标页
});

// 全局判断是否IOS方法
function isIos() {
  const u = navigator.userAgent;
  // console.log('isIos_u=', u);
  return u.indexOf('iPhone') > -1 || u.indexOf('Mac OS') > -1;
}

function setWxUrl(url) {
  // console.log('isIos=', isIos());
  if (isIos() && window.sessionStorage.getItem('wxSignUrl')) {
    return;
  }
  window.sessionStorage.setItem('wxSignUrl', url);
}
