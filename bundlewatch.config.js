const bundlewatchConfig = {
  files: [
    {
      path: './dist/cloudinary-react.js',
      maxSize: '43kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;