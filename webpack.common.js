const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const DashboardPlugin = require('webpack-dashboard/plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    main: './src/index.js'
    // search: './src/search.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.md$/i,
        use: './markdown-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        include: path.resolve(__dirname, 'src'),
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
      },
      {
        test: /\.txt$/i,
        include: path.resolve(__dirname, 'src'),
        use: 'raw-loader'
      },
      {
        test: /\.m?js|ts$/,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack项目',
      template: './index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/public',
          to: 'public',
          globOptions: {
            ignore: ['**/b.txt']
          }
        }
      ]
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new VueLoaderPlugin()
    // new DashboardPlugin()
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single', //会有单独的runtime文件
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        lodashVendor: {
          test: /[\\/]node_modules[\\/](lodash)[\\/]/,
          name: 'vendor-lodash',
          chunks: 'all'
        }
      }
    }
  }
}
