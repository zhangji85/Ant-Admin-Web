const manageFiles = require.context('.', true, /\.js$/);

// console.log(manageFiles.keys()); // 如:['./a.js'] 返回一个数组，包含全部文件名
let openRouters = ['./user.js', './demo.js']; // 开放的路由文件
let configRouters = []; // 抛出的路由结构数组

manageFiles.keys().forEach((key) => {
  if (key === './index.js') return; // 如果是当前文件，则跳过
  if (!openRouters.includes(key)) return; // 非开发页面路由文件，跳过
  configRouters = configRouters.concat(manageFiles(key).default); // 读取出文件中的default模块
});

export default configRouters; // 抛出一个Vue-router期待的结构的数组
