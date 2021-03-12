import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(["@/views/System/Layout.vue"], resolve),
      children:[
        {
          path: '/user',
          name: 'user',
          component: resolve => require(["@/views/User/user.vue"], resolve)
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(["@/views/System/Login.vue"], resolve)
    },
    {
      path: '/login2',
      name: 'login2',
      component: resolve => require(["@/views/System/Login2.vue"], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(["@/views/System/Register.vue"], resolve)
    },
  ]
})
