// next.config.js
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')
const path = require('path');

console.log(path.resolve('./styles'))
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
/**
 * next的配置文件，支持配置嵌套
 */

let config = withTypescript(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]_[hash:base64:6]",
  },
  sassLoaderOptions: {
    data: '@import "_base.scss";',
    includePaths: [path.resolve('./styles')]
  }
}));


module.exports = config;

