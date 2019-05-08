const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const lessToJS = require('less-vars-to-js')
// const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withPlugins = require('next-compose-plugins')
// const theme = require('./theme');
// const tsImportPluginFactory = require('ts-import-plugin');
const fs = require('fs')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')


// console.log(fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'))
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

console.log(themeVariables);

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

//
// module.exports = withPlugins([
//   // withCSS,
//   [withSass, {
//     cssModules: true,
//     cssLoaderOptions: {
//       importLoaders: 1,
//       localIdentName: '[local]_[hash:base64:6]',
//     },
//     sassLoaderOptions: {
//       data: '@import "_base.scss";',
//       includePaths: [path.resolve('./styles')],
//     },
//   }],
//   [withLess, {
//     lessLoaderOptions: {
//       javascriptEnabled: true,
//       modifyVars: themeVariables, // make your antd custom effective
//     },
//   }],
// ]);

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        lessLoaderOptions = {},
      } = nextConfig;
      console.log('options.defaultLoaders', options.defaultLoaders)
      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions,
          },
        ],
      })

      config.module.rules.push({
        test: /\.less$/,
        exclude: /node_modules/,
        use: options.defaultLoaders.less,
      })

      // 我们禁用了antd的cssModules
      config.module.rules.push({
        test: /\.less$/,
        include: /node_modules/,
        use: cssLoaderConfig(config, {
          extensions: ['less'],
          cssModules: false,
          cssLoaderOptions: {},
          dev,
          isServer,
          loaders: [
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                modifyVars: themeVariables,
              },
            },
          ],
        }),
      })

      config.module.rules.push({
        test: /\.scss$/,
        exclude: /node_modules/,
        use: cssLoaderConfig(config, {
          extensions: ['scss'],
          cssModules: true,
          cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: '[local]_[hash:base64:6]',
          },
          dev,
          isServer,
          loaders: [
            {
              loader: 'sass-loader',
              options: {
                data: '@import "_base.scss";',
                includePaths: [path.resolve('./styles')],
              },
            },
          ],
        }),
      })
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
}
