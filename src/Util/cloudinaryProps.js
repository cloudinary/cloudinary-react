import {Util} from "cloudinary-core";

/**
 * Returns a camelCase version of given props, filtered using cloudinaryOptions
 * @param props
 * @param cloudinaryOptions
 */
export default (props, cloudinaryOptions) => {
  const camelCaseProps = Util.withCamelCaseKeys(props);
  let keys = cloudinaryOptions.filter(key => (camelCaseProps[key] !== undefined && camelCaseProps[key] !== null));
  let result = {};

  keys.forEach(key => {
    result[key] = camelCaseProps[key]
  });

  return result;
}
