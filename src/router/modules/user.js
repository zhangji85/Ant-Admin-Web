export default [
  {
    path: '/user',
    name: 'user',
    component: (resolve) => require(['views/System/User/User.vue'], resolve)
  }
];
