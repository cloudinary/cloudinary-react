import {Util} from "cloudinary-core";

const CLOUDINARY_REACT_PROPS = {includeOwnBody: true};

const isDefined = (props, key) => {
  return (props[key] !== undefined && props[key] !== null);
};

/**
 * Extracts cloudinaryProps and nonCloudinaryProps from given props according to given validProps
 * @param props
 * @param validProps
 * @returns {{cloudinaryProps: {}, nonCloudinaryProps: {}}}
 */
export default (props = {}, validProps = {}) => {
  let result = {
    cloudinaryProps: {},
    nonCloudinaryProps: {},
    cloudinaryReactProps: {}
  };

  Object.keys(props).forEach(key => {
    const camelKey = Util.camelCase(key);
    const value = props[key];

    //if valid and defined add to cloudinaryProps
    if (validProps[camelKey]) {
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
