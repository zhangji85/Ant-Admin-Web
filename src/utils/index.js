import Vue from 'vue';

const toolContext = require.context('./modules/', true, /\.js$/);
// let utils = {};
toolContext.keys().forEach((tool) => {
  const toolModle = toolContext(tool);
  // utils = { ...utils, ...(toolModle.default || toolModle) };
  Object.keys(toolModle.default || toolModle).forEach((key) => {
    Vue.prototype[`$${key}`] = toolModle[key] || toolModle.default[key];
  });
});
