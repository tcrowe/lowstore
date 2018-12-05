/*

# webpack config

https://webpack.js.org
https://webpack.js.org/configuration

*/

const path = require("path");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

//
// ⚠️ customize the paths
//
const entryPath = path.join(__dirname, "src", "index.js");
const outputPath = path.join(__dirname, "dist");

const opts = {
  target: "web",
  mode: "production",
  entry: entryPath,
  output: {
    path: outputPath,
    filename: "lowstore.min.js",
    library: "LOWSTORE",
    libraryTarget: "window"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyjsWebpackPlugin({
        sourceMap: false,
        uglifyOptions: {
          ecma: 5,
          mangle: true,
          compress: true,
          warnings: false
        }
      })
    ]
  },
  watch: false,
  cache: false,
  performance: {
    hints: false
  },
  stats: {
    assets: false,
    colors: false,
    errors: true,
    errorDetails: true,
    hash: false
  }
};

module.exports = opts;
