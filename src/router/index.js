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
          component: resolve => require(["@/views/User/User.vue"], resolve)
        },
        {
          path: '/403',
          name: '403',
          component: resolve => require(["@/views/Default/403.vue"], resolve)
        },
        {
          path: '/404',
          name: '404',
          component: resolve => require(["@/views/Default/404.vue"], resolve)
        },
        {
          path: '/500',
          name: '500',
          component: resolve => require(["@/views/Default/500.vue"], resolve)
        },
        {
          path: '/crudform',
          name: 'crudform',
          component: resolve => require(["@/views/Crud/CrudForm.vue"], resolve)
        },
        {
          path: '/crudtable',
          name: 'crudtable',
          component: resolve => require(["@/views/Crud/CrudTable.vue"], resolve)
        },
        {
          path: '/quillview',
          name: 'quillview',
          component: resolve => require(["@/views/Editors/QuillView.vue"], resolve)
        },
        {
          path: '/mavonview',
          name: 'mavonview',
          component: resolve => require(["@/views/Editors/MavonView.vue"], resolve)
        },
        {
          path: '/test',
          name: 'test',
          component: resolve => require(["@/views/test.vue"], resolve)
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
