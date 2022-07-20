import React from 'react';
import { Cloudinary, Transformation, Util } from 'cloudinary-core';
import PropTypes from 'prop-types';

const { camelCase, withCamelCaseKeys, isEmpty } = Util;

// props passed to cloudinary-core but should not be rendered as dom attributes
const CLOUDINARY_REACT_PROPS = ['accessibility', 'breakpoints', 'dataSrc', 'placeholder', 'publicId', 'signature', 'authToken'];

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
  aiff: 'x-aiff'
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
  // eslint-disable-next-line camelcase
  const { public_id, ...ops } = nonEmpty(extendedProps); // Remove null/undefined props
  const options = Util.withSnakeCaseKeys(ops);
  return Cloudinary.new(options);
};

const getTag = (props, tagType) => {
  const { publicId, ...ops } = props; // Remove null/undefined props
  const cld = getConfiguredCloudinary(ops);
  return cld[`${tagType}Tag`](publicId, Util.withSnakeCaseKeys(ops));
};

/**
 * Get a new <img> tag initialized with given props
 * @param {*} props
 */
const getImageTag = (props) => getTag(props, 'image');

/**
 * Get a new <video> tag initialized with given props
 * @param {*} props
 */
const getVideoTag = (props) => getTag(props, 'video');

/**
 * Cloudinary underlying JS library will handle responsive behavior
 * @param {HTMLImageElement} img
 * @param {object} options
 * @Return callback that when called, will remove the listener created by Cloudinary.responsive
 */
const makeElementResponsive = (img, options) => {
  const snakeCaseOptions = Util.withSnakeCaseKeys(options);
  const cld = getConfiguredCloudinary(snakeCaseOptions); // Initialize cloudinary with new props
  cld.cloudinary_update(img, snakeCaseOptions);
  return cld.responsive(snakeCaseOptions, false);
};

/**
 * Extracts cloudinaryProps and nonCloudinaryProps from given props
 *
 * @param props
 * @returns {{children: *, cloudinaryReactProps: {}, cloudinaryProps: {}, nonCloudinaryProps: {}}}
 */
const extractCloudinaryProps = ({ children, ...props }) => {
  const result = {
    children,
    cloudinaryProps: {},
    nonCloudinaryProps: {},
    cloudinaryReactProps: {}
  };

  Object.keys(props).forEach((key) => {
    const camelKey = Util.camelCase(key);
    const value = props[key];

    // if valid and defined add to cloudinaryProps
    if (CLOUDINARY_PROPS[camelKey]) {
      if (props[key] !== undefined && props[key] !== null) {
        result.cloudinaryProps[camelKey] = value;
      }
    } else if (camelKey === 'includeOwnBody') { // cloudinary-react specific prop
      result.cloudinaryReactProps[camelKey] = value;
    } else { // not valid so add to nonCloudinaryProps
      result.nonCloudinaryProps[key] = value;
    }
  });

  return result;
};

/**
 * Generated a configured Cloudinary object.
 * @param extendedProps React props combined with custom Cloudinary configuration options
 * @return {Cloudinary} configured using extendedProps
 */
/*
const getConfiguredCloudinary = (extendedProps) => {
  const options = Util.extractUrlParams(Util.withSnakeCaseKeys(extendedProps));
  return Cloudinary.new(options);
};
 */

/**
 * Generate a Cloudinary resource URL based on the options provided and child Transformation elements
 * @param extendedProps React props combined with custom Cloudinary configuration options
 * @returns {string} a cloudinary URL
 * @protected
 */
const getUrl = (extendedProps) => {
  const { publicId } = extendedProps;
  const cl = getConfiguredCloudinary(extendedProps);
  return cl.url(publicId, getTransformation(extendedProps));
};

/**
 * Check if given component is a Cloudinary Component with given displayName
 * @param component the component to check
 * @param displayName of wanted component
 * @return {boolean}
 */
const isCloudinaryComponent = (component, displayName) => (
  !!(React.isValidElement(component) &&
    component.type &&
    component.type.displayName === displayName)
);

/**
 * Combine properties of all options to create an option Object that can be passed to Cloudinary methods.<br>
 *   `undefined` and `null` values are filtered out.
 * @protected
 * @returns {Object}
 * @param options one or more options objects
 */
const normalizeOptions = (...options) => {
  return options.reduce((left, right) => {
    Object.keys(right || {}).forEach(key => {
      const value = right[key];
      if (value !== null && value !== undefined) {
        left[key] = value;
      }
    });
    return left;
  }, {});
};

const getChildPlaceholder = (children) => {
  let result = null;
  if (children) {
    result = React.Children.toArray(children)
      .find((child) => isCloudinaryComponent(child, 'CloudinaryPlaceholder'));
  }

  return result;
};

const getChildTransformations = (children) => {
  const result = children ? React.Children.toArray(children)
    .filter((child) => isCloudinaryComponent(child, 'CloudinaryTransformation'))
    .map((child) => {
      const options = normalizeOptions(child.props, child.context);
      const childOptions = getChildTransformations(child.props.children);
      if (childOptions) {
        options.transformation = childOptions;
      }
      return options;
    }) : [];

  return result.length ? result : null;
};

/**
 * Return a new object containing keys and values where keys are in the keys list
 * @param {object} source Object to copy values from
 * @param {string[]} [keys=[]] a list of keys
 * @returns {object} an object with copied values
 */
const only = (source, keys = []) => {
  if (!source) {
    return source;
  }

  return keys.reduce((tr, key) => {
    if (key in source) {
      tr[key] = source[key];
    }
    return tr;
  }, {});
};

/**
   * Create a React type definition object. All items are PropTypes.string or [string] or object or [object].
   * @param {Array} configParams a list of parameter names
   * @returns {Object}
   * @private
   */
const typesFrom = (configParams) => {
  configParams = configParams || [];
  const types = {};
  for (let i = 0; i < configParams.length; i++) {
    const key = configParams[i];
    types[camelCase(key)] = PropTypes.any;
  }
  return types;
};

/**
 * Returns an object with all the transformation parameters based on the context and properties of this element
 * and any children.
 * @param extendedProps
 * @returns {object} a hash of transformation and configuration parameters
 * @protected
 */
const getTransformation = (extendedProps) => {
  const {
    children, accessibility, placeholder, ...rest
  } = extendedProps;
  const ownTransformation = only(withCamelCaseKeys(rest), Transformation.methods) || {};
  const childrenOptions = getChildTransformations(children);
  if (!isEmpty(childrenOptions)) {
    ownTransformation.transformation = childrenOptions;
  }

  // Append placeholder and accessibility if exists
  const advancedTransformations = { accessibility, placeholder };
  Object.keys(advancedTransformations).filter((k) => advancedTransformations[k]).forEach((k) => {
    ownTransformation[k] = advancedTransformations[k];
  });

  return ownTransformation;
};

export {
  nonEmpty,
  getImageTag,
  getVideoTag,
  makeElementResponsive,
  getConfiguredCloudinary,
  CLOUDINARY_REACT_PROPS,
  VIDEO_MIME_TYPES,
  AUDIO_MIME_TYPES,
  extractCloudinaryProps,
  getUrl,
  getChildPlaceholder,
  getChildTransformations,
  isCloudinaryComponent,
  only,
  typesFrom,
  normalizeOptions,
  getTransformation
};
