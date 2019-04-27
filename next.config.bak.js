// next.config.js
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
// const { withPlugins, optional } = require('next-compose-plugins');
const fs = require('fs');
const path = require('path');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// const constants = require('next/constants');
// console.log(path.resolve('./styles'));
// console.log('constants', constants);

// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// const {
//   PHASE_PRODUCTION_BUILD,
//   PHASE_PRODUCTION_SERVER,
//   PHASE_DEVELOPMENT_SERVER,
//   PHASE_EXPORT,
// } = require('next/constants');
/**
 * next的配置文件，支持配置嵌套
 */

const withSassOption = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]_[hash:base64:6]',
  },
  sassLoaderOptions: {
    data: '@import "_base.scss";',
    includePaths: [path.resolve('./styles')],
  },
};

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'),
);

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}


const withLessOption = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
}

const config = withTypescript(withSass(
  {
    // ...withLessOption,
    ...withSassOption,
  },
));

const nextConfigV1 = {
  useFileSystemPublicRoutes: false,
  pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'scss', 'css'],
  // webpack: (config, options) => {
  //   console.log('config', JSON.stringify(config));
  //   // modify the `config` here
  //   return config;
  // },
};

module.exports = (phase, { defaultConfig }) => {
  console.log('phase', phase);
  return Object.assign({}, defaultConfig, config, nextConfigV1);
};

// module.exports = withPlugins([
//
//   // add a plugin with specific configuration
//   [withSass, withSassOption],
//
//   // add a plugin without a configuration
//   // images,
//
//   // another plugin with a configuration (applied in all phases except development server)
//   [withTypescript,
//   //   {
//   //   typescriptLoaderOptions: {
//   //     transpileOnly: false,
//   //   },
//   // }, ['!', PHASE_DEVELOPMENT_SERVER]
//   ],
//
//   [withLess, withLessOption],
//
//   // load and apply a plugin only during development server phase
//   // [optional(() => require('@some-internal/dev-log')), [PHASE_DEVELOPMENT_SERVER]],
//
// ], nextConfig);
