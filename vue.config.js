const path = require("path");
const webpack = require("webpack");
const resolve = function (dir) {
  return path.join(__dirname, dir);
};
const vars = path.resolve(__dirname, "src/assets/styles/common.less");

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/index/' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@v", resolve("src/views"))
      .set("@a", resolve("src/assets"))
      .set("@c", resolve("src/components"));
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    // host: "localhost",
    /* 本地ip地址 */
    //host: "192.168.1.107",
    host: "0.0.0.0", //局域网和本地访问
    port: "8080",
    hot: true,
    disableHostCheck: true, //  新增该配置项
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    /* 跨域代理 */
    proxy: {
      "/brigade": {
        /* 目标代理服务器地址 */
        // target: "", //
        // target: "https://bid.hongaodata.com/api",
        // target: "http://192.168.0.111:8888",
        target: "http://192.168.0.111:9898",
        /* 允许跨域 */
        changeOrigin: true,
        ws: true
      },
      '/group1': {
        target: `http://192.168.0.101:8081`,
        changeOrigin: true,
        secure: false,
        ws: true
        // ,pathRewrite: {'^/api' : ''}
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ]
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: []
      },
      less: {
        globalVars: {
          hack: `true; @import "${vars}"`
        }
      }
    }
  }
};
