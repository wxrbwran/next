const path = require('path')
const withTypescript = require('@zeit/next-typescript')
const theme = require('./theme');
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
  webpack(config, options) {
    if (!options.defaultLoaders) {
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
      );
    }
    const nextConfig = {};
    const { dir, dev, defaultLoaders, isServer } = options;
    const {
      cssModules,
      cssLoaderOptions,
      postcssLoaderOptions,
      lessLoaderOptions = {},
    } = nextConfig;

    console.log('options.defaultLoaders', defaultLoaders)

    config.resolve.extensions.push('.ts', '.tsx');

    defaultLoaders.less = cssLoaderConfig(config, {
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

    if (!defaultLoaders.hotSelfAccept) {
      if (dev && !isServer) {
        config.module.rules.push({
          test: /\.(ts|tsx)$/,
          loader: 'hot-self-accept-loader',
          include: [path.join(dir, 'pages')],
          options: {
            extensions: /\.(ts|tsx)$/
          }
        })
      }
    }

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [dir],
      exclude: /node_modules/,
      use: defaultLoaders.babel,
    });

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options)
    }

    return config
  },
}
