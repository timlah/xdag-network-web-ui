const path = require('path');
const autoprefixer = require('autoprefixer');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const browsers = ['> 1%', 'last 2 versions', 'IE >= 10'];

module.exports = (env, argv) => {
  const isDevMode = argv.mode === 'development';

  return {
    stats: {
      entrypoints: false,
      children: false
    },

    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebPackPlugin({
        filename: 'index.html',
        template: 'src/preview.html',
        inject: 'head'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css'
      })
      // new BundleAnalyzerPlugin()
    ],

    entry: [path.resolve(__dirname, 'src/index.js')],

    output: {
      library: 'xdagNetwork',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: false
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: true
        }),
        new OptimizeCssAssetsPlugin({})
      ]
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s?css$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer({ browsers })]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    }
  };
};
