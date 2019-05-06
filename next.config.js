const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const withTypescript = require('@zeit/next-typescript')
// const _withTypescript = require('next-awesome-typescript')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withPlugins = require('next-compose-plugins')
const theme = require('./theme');
const tsImportPluginFactory = require('ts-import-plugin');
const fs = require('fs')


// console.log(fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'))

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withPlugins([
  withCSS,
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]_[hash:base64:6]',
    },
    sassLoaderOptions: {
      data: '@import "_base.scss";',
      includePaths: [path.resolve('./styles')],
    },
  }],
  [withLess, {
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: theme, // make your antd custom effective
    },
  }],
  [withTypescript, {}],
]);
