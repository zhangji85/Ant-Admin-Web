export default [
  {
    path: '/crudform',
    name: 'crudform',
    component: (resolve) => require(['views/Demo/Crud/CrudForm.vue'], resolve)
  },
  {
    path: '/crudtable',
    name: 'crudtable',
    component: (resolve) => require(['views/Demo/Crud/CrudTable.vue'], resolve)
  },
  {
    path: '/quillview',
    name: 'quillview',
    component: (resolve) =>
      require(['views/Demo/Editors/QuillView.vue'], resolve)
  },
  {
    path: '/mavonview',
    name: 'mavonview',
    component: (resolve) =>
      require(['views/Demo/Editors/MavonView.vue'], resolve)
  },
  {
    path: '/test',
    name: 'test',
    component: (resolve) => require(['views/Demo/test.vue'], resolve)
  }
];
