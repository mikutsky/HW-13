const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        test: /\.js$/
      }
    ]
  },
  devServer: {
    publicPath: "/",
    port: 9000,
    contentBase: path.join(process.cwd(), "dist"),
    host: "localhost",
    historyApiFallback: true,
    noInfo: false,
    stats: "minimal",
    hot: true
  },
  entry: {
    app: "./app.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  output: {
    filename: "bundle.js"
  },
  mode: "development"
};
