
module.exports = {
    assetsDir: 'static',
    publicPath:"./",
    devServer: {
      proxy: {
        '/api': {  //之后就使用/api代指根路径
            target: 'https://thelittlestar.cn:8088', // 这是根路径
            changeOrigin: true,
            secure: true,
            pathRewrite: {
              '^/api': ''
            }
        }
      }
    }
}
