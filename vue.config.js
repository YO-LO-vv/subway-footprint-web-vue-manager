//const webpack = require('webpack')

module.exports = {
  devServer: {
  proxy: 'https://thelittlestar.cn:8088/',
  },
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //       'windows.jQuery': 'jquery',
  //       Popper: ["popper.js", "default"]
  //     })
  //   ]
  // }
}