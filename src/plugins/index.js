const pluginsFiles = require.context('./', true, /\.js$/);

let configPlugins = {}; // 抛出的路由结构数组

pluginsFiles.keys().forEach((key) => {
  if (key === './index.js') return; // 如果是当前文件，则跳过
  configPlugins = Object.assign(pluginsFiles(key), configPlugins); // 读取出文件
});

export default configPlugins; // 抛出一个Vue-router期待的结构的数组
