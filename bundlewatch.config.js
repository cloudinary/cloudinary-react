const bundlewatchConfig = {
  files: [
    {
      path: './dist/cloudinary-react.js',
      maxSize: '44kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;