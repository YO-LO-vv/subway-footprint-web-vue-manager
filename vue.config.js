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
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
      svgRule.uses.clear();
      svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
          symbolId: "icon-[name]"
    });
},
}