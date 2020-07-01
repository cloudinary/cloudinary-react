const bundlewatchConfig = {
  files: [
    {
      path: './dist/cloudinary-react.js',
      maxSize: '42kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;