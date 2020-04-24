// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
var path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm

const isDevelopment = process.env.NODE_ENV === 'development'
console.info(`NODE_ENV: ${process.env.NODE_ENV}`)
 
module.exports = {
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
    alias: {
      src: path.resolve(__dirname, "src/")
    }
  },

  // Source maps support ('inline-source-map' also works)
  devtool: "source-map",

  devtool: isDevelopment ? "source-map" : false,
  devServer: {
    hot: true,
    // compress: true,
    port: 8080,
    publicPath: "/dist",
    liveReload: false
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ["awesome-typescript-loader"]
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          // TODO: Figure out if this works
          // isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          // TODO: Figure out if this works
          // isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
    })
  ],
  externals: {
    react: "React"
  },
  output: {
    filename: isDevelopment ? "main.js" : "bundle.js",
    path: path.join(__dirname, "dist")
  },
  entry: [path.join(__dirname, "src/index.tsx")]
};