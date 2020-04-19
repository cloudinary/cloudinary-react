const bundlewatchConfig = {
  files: [
    {
      path: './dist/cloudinary-react.js',
      maxSize: '41kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;