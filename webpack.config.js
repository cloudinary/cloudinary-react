module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'cloudinary-react.js',
    library: 'cloudinaryReact',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  externals: {
    "react": "React",
    "cloudinary-core": "cloudinary"
  }
};