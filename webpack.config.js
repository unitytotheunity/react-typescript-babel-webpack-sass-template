// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
var path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'
console.info(`NODE_ENV: ${process.env.NODE_ENV}`)
 
module.exports = {
  mode: isDevelopment ? "development" : "production", 
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    alias: {
      src: path.resolve(__dirname, 'src/')
    }
  }, 
  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',
 
  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: [
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          },
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new CheckerPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      })
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};

if (!isDevelopment) {
  module.exports.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
  module.exports.entry = './dist/main.js'
}
