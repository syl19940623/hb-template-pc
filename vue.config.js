// 是否切包
const splitChunks = true;
// 打包后的js文件添加时间戳
const timeStamp = new Date().getTime();

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '互邦模板'
        return args
      })
  },
  publicPath: '/template/',
  devServer: {
    proxy: {
      '/template_api': {
        target: 'http://192.168.0.23',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/template_api': '/'
        }
      }
    }
  },
  configureWebpack: config => {
    if (splitChunks) {
      return {
        optimization: {
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            minSize: 1024 * 10,
            maxSize: 1024 * 50,
            maxInitialRequests: Infinity,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true,
                name(module) {
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                  return `npm.${packageName.replace('@', '')}`
                }
              }
            }
          }
        },
        performance: {
          maxEntrypointSize: 50000000,
          maxAssetSize: 30000000
        },
        output: {
          filename: `js/[name].${timeStamp}.js`,
          chunkFilename: `js/[name].${timeStamp}.js`
        }
      }
    }
  },
  productionSourceMap: false
}
