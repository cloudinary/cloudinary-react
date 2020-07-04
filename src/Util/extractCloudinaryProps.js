import {Transformation, Util} from 'cloudinary-core';

const CLOUDINARY_REACT_PROPS = {includeOwnBody: true};

// Map Cloudinary props from array to object for efficient lookup
const CLOUDINARY_PROPS = Transformation.PARAM_NAMES.map(Util.camelCase).concat(['publicId', 'breakpoints']).reduce(
  (accumulator, cloudinaryPropName) => {
    accumulator[cloudinaryPropName] = true;
    return accumulator;
  },
  {}
);

const isDefined = (props, key) => {
  return (props[key] !== undefined && props[key] !== null);
};

/**
 * Extracts cloudinaryProps and nonCloudinaryProps from given props
 *
 * @param props
 * @returns {{children: *, cloudinaryReactProps: {}, cloudinaryProps: {}, nonCloudinaryProps: {}}}
 */
export default ({children, ...props}) => {
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
      if (isDefined(props, key)) {
        result.cloudinaryProps[camelKey] = value;
      }
    } else if (CLOUDINARY_REACT_PROPS[camelKey]) { //cloudinary-react spesific prop
      result.cloudinaryReactProps[camelKey] = value;
    } else { //not valid so add to nonCloudinaryProps
      result.nonCloudinaryProps[key] = value;
    }
  });

  return result;
};
