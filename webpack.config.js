const { resolve } = require("path");

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: resolve(process.cwd(), 'dist'),
    filename: 'cloudinary-react.js',
    library: 'cloudinaryReact',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          rootMode: "upward",
        }
      }
    ]

  },
  externals: {
    "React": "react",
    "cloudinary": "cloudinary-core"
  }
};