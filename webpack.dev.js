const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const DllPlugin = require('webpack/lib/DllPlugin')
const path = require('path')
// const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'eval-cheap-module-source-map',
  devtool: 'source-map',
  devServer: {
    static: './dist_dev'
  },
  output: {
    filename: '[name]-[contenthash:8].buddle.js',
    path: path.resolve(__dirname, 'dist_dev')
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  optimization: {
    usedExports: true, //标记哪儿些没使用
    minimize: true, //压缩,去除标记未使用的代码
    concatenateModules: true //将多个模块放到一个函数
  },
  plugins: [
    // new DllPlugin({
    //   // 动态链接库的全局变量名称，需要和 output.library 中保持一致
    //   // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
    //   // 例如 react.manifest.json 中就有 "name": "_dll_react"
    //   name: '_dll_[name]',
    //   // 描述动态链接库的 manifest.json 文件输出时的文件名称
    //   path: path.join(__dirname, 'dist', '[name].manifest.json')
    // })
  ]
})
