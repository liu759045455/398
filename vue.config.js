const path = require("path");
const resolve = function (dir) {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    chainWebpack: config => {
        config.resolve.alias
          .set("@", resolve("src"))
          .set("@v", resolve("src/views"))
          .set("@a", resolve("src/assets"))
          .set("@c", resolve("src/components"));
        config.optimization.runtimeChunk("single");
      },
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "0.0.0.0",
        port: '8081',
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/brigade': {
                target: 'http://192.168.0.111:9898', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {
                //   // 路径重写
                  "^/brigade": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
                }

            },
            '/group1': {
                target: `http://192.168.0.101:8081`,
                changeOrigin: true,
                // secure: false,
                ws: true
                // ,pathRewrite: {'^/api' : ''}
              }
        },
    },
}