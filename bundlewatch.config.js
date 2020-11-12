const bundlewatchConfig = {
  files: [
    {
      path: './dist/cloudinary-react.js',
      maxSize: '44.5kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;