// next.config.js
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const constants = require('next/constants');
// console.log(path.resolve('./styles'));
// console.log('constants', constants);

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




module.exports = (phase, { defaultConfig }) => {
  console.log('phase', phase);
  // console.log('defaultConfig', defaultConfig);

  return Object.assign({}, defaultConfig, config, {
    pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'scss', 'css'],
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // Important: return the modified config

      // Example using webpack option
      config.plugins.push(new TsconfigPathsPlugin({
        configFile: path.resolve('./tsconfig.webpack.json'),
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }));
      return config;
    },
    webpackDevMiddleware: config => {
      // Perform customizations to webpack dev middleware config
      // Important: return the modified config
      return config;
    }
  });
};
