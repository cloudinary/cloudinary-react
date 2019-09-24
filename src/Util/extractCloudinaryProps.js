import {Util} from "cloudinary-core";

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
    nonCloudinaryProps: {}
  };

  Object.keys(props).forEach(key => {
    const camelKey = Util.camelCase(key);

    //if valid and defined add to cloudinaryProps
    if (validProps[camelKey]) {
      if (isDefined(props, key)) {
        result.cloudinaryProps[camelKey] = props[key];
      }
    } else { //not valid so add to nonCloudinaryProps
      result.nonCloudinaryProps[key] = props[key];
    }
  });

  return result;
};
