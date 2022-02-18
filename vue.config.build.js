const path = require("path");

module.exports = {
  //基本路径
  publicPath: "./", //加 ./ 解决404问题
  outputDir: "dist",
  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: "static",
  //以多页模式构建应用程序。
  pages: undefined,
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  parallel: require("os").cpus().length > 1,
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: false,

  // 是否为生产环境构建生成 source map？这样打包的dist文件体积会很小（正式版）
  //为true带测试环境，提交会大很多
  productionSourceMap: false,

  devServer: {
    // disableHostCheck:true,
    //host: '0.0.0.0',
    // port: 8080,
    // proxy: 'http://127.0.0.1:8080',
    // publicPath: '../',  //这里解决静态资源引用路径问题
    //设置代理
    proxy: {
      "/api": {
        target: "https://api.xxx.com/api", // 跨域访问
        ws: false, // 是否启用websockets
        changOrigin: true, //开启代理
        secure: false, // 将安全设置为false,才能访问https开头的
        pathRewrite: {
          "^/api": "/" //这里理解成用‘/api’代替target里面的地址
        }
      },
      "/baidu": {
        target: "https://api.map.baidu.com", //访问地址
        changeOrigin: true,
        secure: false, //只有代理https 地址需要次选项
        pathRewrite: {
          "^/baidu": "/"
        }
      }
    }
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/less/index.less")]
    }
  },
  //别名配置
  chainWebpack: (config) => {
    config.resolve.alias.set("views", path.resolve(__dirname, "./src/views"));
  }
};
