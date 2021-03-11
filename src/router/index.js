import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(["@/views/System/Layout.vue"], resolve)
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
