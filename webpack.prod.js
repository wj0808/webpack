const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

class MyPlugin {
  apply(compiler) {
    console.log('myplugin启动')
    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      for (const name in compilation.assets) {
        console.log(name)
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const withoutComments = contents.replace(/\/*\*+\*\//g, '')
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length
          }
        }
      }
    })
  }
}
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name]-[contenthash:8].buddle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader, //css文件很大才行（>150kb），否则很多个小的更耗能,一般生成环境
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // new MyPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:8].css'
    })
  ],
  optimization: {
    //css单独放一个文件了，需要压缩css，但是改变了默认压缩js的，所以用TerserPlugin
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
  }
})
