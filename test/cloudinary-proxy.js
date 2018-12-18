import * as cloudinaryReactDist from '../dist/cloudinary-react'
import * as cloudinaryReactSource from '../src/index'
import * as cloudinaryReactLib from '../lib/index'

// Implements a dynamic load of the cloudinary-react library

var cld;
let subject =
  typeof window !== 'undefined' && window.TEST_SUBJECT ||
  typeof globals !== 'undefined' && globals.TEST_SUBJECT ||
  typeof process !== 'undefined' && process.env.TEST_SUBJECT;
switch (subject) {
  case 'src':
    cld = cloudinaryReactSource;
    break;
  case 'lib':
    cld = cloudinaryReactLib;
    break;
  case 'dist':
    cld = cloudinaryReactDist;
    break;
  default:
    cld = cloudinaryReactSource;
}
console.log(`Testing ${subject}`);

export default cld;