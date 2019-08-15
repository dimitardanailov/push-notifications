const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const { APP_DIR, DIST_DIR } = require("./utils/folders");

module.exports = {
  entry: {
    main: `${APP_DIR}/index.js`
  },

  output: {
    filename: "[name].js",
    path: DIST_DIR
  },

  resolve: {
    modules: ["node_modules"]
  },

  // https://github.com/webpack-contrib/karma-webpack
  devtool: "inline-source-map",

  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 8080,

    hot: true,
    hotOnly: true
  },

  plugins: [
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application',
      template: `${APP_DIR}/index.html`
    }),

    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
