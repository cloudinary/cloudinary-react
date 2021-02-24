import {Transformation, Util} from "cloudinary-core";
// props passed to cloudinary-core but should not be rendered as dom attributes
const CLOUDINARY_REACT_PROPS = ['accessibility', 'breakpoints', 'dataSrc', 'placeholder', 'publicId', 'signature'];

/**
 * Convert common video file extensions to mime types
 * Most other common video file extensions have an identical mime type so do not need conversion.
 */
const VIDEO_MIME_TYPES = {
  flv: 'x-flv',
  '3gp': '3gpp',
  mov: 'quicktime',
  mpg: 'mpeg',
  avi: 'x-msvideo',
  wmv: 'x-ms-wmv',
  ogv: 'ogg'
};

/**
 * Convert common audio file extensions to mime types
 * Most other common audio file extensions have an identical mime type so do not need conversion.
 */
const AUDIO_MIME_TYPES = {
  m4a: 'mp4',
  wav: 'vnd.wav',
  m3u: 'x-mpegurl',
  mp3: 'mpeg',
  ogv: 'ogg',
  aif: 'x-aiff',
  aifc: 'x-aiff',
  aiff: 'x-aiff',
};

// props passed to cloudinary-core for dom elements attributes generation
// Map Cloudinary props from array to object for efficient lookup
const CLOUDINARY_PROPS = [...Transformation.PARAM_NAMES, ...CLOUDINARY_REACT_PROPS].map(Util.camelCase).reduce(
  (accumulator, cloudinaryPropName) => {
    accumulator[cloudinaryPropName] = true;
    return accumulator;
  },
  {}
);

/**
 * Extracts cloudinaryProps and nonCloudinaryProps from given props
 *
 * @param props
 * @returns {{children: *, cloudinaryReactProps: {}, cloudinaryProps: {}, nonCloudinaryProps: {}}}
 */
const extractCloudinaryProps = ({children, ...props}) => {
  let result = {
    children,
    cloudinaryProps: {},
    nonCloudinaryProps: {},
    cloudinaryReactProps: {}
  };

  Object.keys(props).forEach(key => {
    const camelKey = Util.camelCase(key);
    const value = props[key];

    //if valid and defined add to cloudinaryProps
    if (CLOUDINARY_PROPS[camelKey]) {
      if (props[key] !== undefined && props[key] !== null) {
        result.cloudinaryProps[camelKey] = value;
      }
    } else if (camelKey === 'includeOwnBody') { //cloudinary-react specific prop
      result.cloudinaryReactProps[camelKey] = value;
    } else { //not valid so add to nonCloudinaryProps
      result.nonCloudinaryProps[key] = value;
    }
  });

  return result;
};

export {
  CLOUDINARY_REACT_PROPS,
  VIDEO_MIME_TYPES,
  AUDIO_MIME_TYPES,
  extractCloudinaryProps
};
