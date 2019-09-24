import {Util} from "cloudinary-core";

const isDefined = (props, key) => {
  return (props[key] !== undefined && props[key] !== null);
};

/**
 * Extracts cloudinaryProps and nonCloudinaryProps from given context+props
 * according to given validProps
 * @param context
 * @param props
 * @param validProps
 * @returns {{cloudinaryProps, nonCloudinaryProps}}
 */
export default (context = {}, props = {}, validProps = {}) => {
  const mergedProps = {...context, ...props};

  let result = {
    cloudinaryProps: {},
    nonCloudinaryProps: {}
  };

  Object.keys(mergedProps).forEach(key => {
    const camelKey = Util.camelCase(key);

    //if valid and defined add to cloudinaryProps
    if (validProps[camelKey]) {
      if (isDefined(mergedProps, key)) {
        result.cloudinaryProps[camelKey] = mergedProps[key];
      }
    } else { //not valid so add to nonCloudinaryProps
      result.nonCloudinaryProps[key] = mergedProps[key];
    }
  });

  return result;
};
