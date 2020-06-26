import {Cloudinary, Util} from "cloudinary-core";

/**
 * Return object without null/undefined entries
 * @param {*} obj
 */
const nonEmpty = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {});

/**
 * Generated a configured Cloudinary object.
 * @param extendedProps React props combined with custom Cloudinary configuration options
 * @return {Cloudinary} configured using extendedProps
 */
const getConfiguredCloudinary = (extendedProps) => {
  const { public_id, ...ops } = nonEmpty(extendedProps); // Remove null/undefined props
  const options = Util.extractUrlParams(Util.withSnakeCaseKeys(ops));
  return Cloudinary.new(options);
};

const getTag = (props, tagType) => {
  const { publicId, ...ops} = props; // Remove null/undefined props
  const cld = getConfiguredCloudinary(props);
  return cld[`${tagType}Tag`](publicId, ops);
};

/**
 * Get a new <img> tag initialized with given props
 * @param {*} props
 */
const getImageTag = (props) => getTag(props, "image");

/**
 * Get a new <video> tag initialized with given props
 * @param {*} props
 */
const getVideoTag = (props) => getTag(props, "video");

/**
 * Cloudinary underlying JS library will handle responsive behavior
 * @param {HTMLImageElement} img
 * @param {object} options
 */
const responsive = (img, options) =>{
  const cld = Cloudinary.new(options); // Initialize cloudinary with new props
  cld.cloudinary_update(img, options);
  cld.responsive(options, false);
};

export {
  nonEmpty,
  getImageTag,
  getVideoTag,
  responsive
};
