// next.config.js
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const constants = require('next/constants');
// console.log(path.resolve('./styles'));
// console.log('constants', constants);

// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
/**
 * next的配置文件，支持配置嵌套
 */

const config = withTypescript(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]_[hash:base64:6]',
  },
  sassLoaderOptions: {
    data: '@import "_base.scss";',
    includePaths: [path.resolve('./styles')],
  },
}));


module.exports = (phase, { defaultConfig }) => {
  console.log('phase', phase);
  return Object.assign({}, defaultConfig, config, {
    pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'scss', 'css'],
  });
};
