const bundlewatchConfig = {
  files: [
    {
      path: './dist/cloudinary-react.js',
      maxSize: '8kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;