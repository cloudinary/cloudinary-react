import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Cloudinary, Configuration, Transformation, Util} from 'cloudinary-core';

const camelCase = Util.camelCase;
const snakeCase = Util.snakeCase;

/**
 * Return a new object containing keys and values where keys are in the keys list
 * @param {object} source Object to copy values from
 * @param {string[]} [keys=[]] a list of keys
 * @returns {object} an object with copied values
 */
function only(source, keys = []) {
  if(!source) return source
  return keys.reduce((tr, key) => {
    if (key in source) {
      tr[key] = source[key]
    }
    return tr;
  }, {});
}

/**
 * A base component for Cloudinary components.
 * @protected
 */
class CloudinaryComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {};
  }

  render() {
    return null;
  }

  getChildTransformations(children) {
    if(children === undefined || children === null) return null;
    let mapped = React.Children.map(children, child =>{
      if (!React.isValidElement(child)) {
        // child is not an element (e.g. simple text)
        return;
      }
      let options = {};
      if (child.type && child.type.exposesProps){
        options = CloudinaryComponent.normalizeOptions(child.props, child.context);
      }
      let childOptions = this.getChildTransformations(child.props.children);
      if(childOptions !== undefined && childOptions !== null){
        options.transformation = childOptions;
      }
      return options;
    });
    if(mapped != null){
      return mapped.filter(o=>!Util.isEmpty(o));
    } else return null;
  }

  /**
   * Returns an object with all the transformation parameters based on the context and properties of this element
   * and any children.
   * @param extendedProps
   * @returns {object} a hash of transformation and configuration parameters
   * @protected
   */
  getTransformation(extendedProps) {
    let {children, ...rest} = extendedProps;
    let ownTransformation = only(Util.withCamelCaseKeys(rest), Transformation.methods) || {};
    let childrenOptions = this.getChildTransformations(children);
    if (!Util.isEmpty(childrenOptions)) {
      ownTransformation.transformation = childrenOptions;
    }
    return ownTransformation;
  }

  /**
   * Combine properties of all options to create an option Object that can be passed to Cloudinary methods.<br>
   *   `undefined` and `null` values are filtered out.
   * @protected
   * @returns {Object}
   * @param options one or more options objects
   */
  static normalizeOptions(...options) {
    return options.reduce((left, right)=> {
        for (let key in right) {
          let value = right[key];
          if (value !== null && value !== undefined) {
            left[key] = value;
          }
        }
        return left;
      }
      , {});
  }

  /**
   * Generate a Cloudinary resource URL based on the options provided and child Transformation elements
   * @param extendedProps React props combined with custom Cloudinary configuration options
   * @returns {string} a cloudinary URL
   * @protected
   */
  getUrl(extendedProps) {
    let transformation = this.getTransformation(extendedProps);
    let options = Util.extractUrlParams(Util.withSnakeCaseKeys(extendedProps));
    let cl = Cloudinary.new(options);
    return cl.url(extendedProps.publicId, transformation);
  }
}
CloudinaryComponent.VALID_OPTIONS = Transformation.PARAM_NAMES.map(camelCase);
CloudinaryComponent.contextTypes = typesFrom(CloudinaryComponent.VALID_OPTIONS);

CloudinaryComponent.propTypes = CloudinaryComponent.contextTypes;
CloudinaryComponent.propTypes.publicId = PropTypes.string;
CloudinaryComponent.propTypes.responsive = PropTypes.bool;

CloudinaryComponent.childContextTypes = {};

/**
 * Create a React type definition object. All items are PropTypes.string or [string] or object or [object].
 * @param {Array} configParams a list of parameter names
 * @returns {Object}
 * @private
 */
function typesFrom(configParams) {
  configParams = configParams || [];
  const types = {};
  for (let i =0; i < configParams.length; i++) {
    const key = configParams[i];
    types[camelCase(key)] = PropTypes.any;
  }
  return types;
}

export default CloudinaryComponent;