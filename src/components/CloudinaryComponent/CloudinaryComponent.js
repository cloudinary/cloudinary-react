import React, {Component, PropTypes} from 'react';
import {Cloudinary, Configuration, Transformation, Util} from 'cloudinary-core';

const camelCase = Util.camelCase;
const snakeCase = Util.snakeCase;

export default class CloudinaryComponent extends Component {
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
      let options = {};
      if (child.type && child.type.name === "Transformation"){
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
   * @param options
   * @returns {object} a hash of transformation and configuration parameters
   */
  getTransformation(options) {
    var transformation;
    if (this.props.children !== undefined) {
      let childrenOptions = this.getChildTransformations(this.props.children);
      if (!Util.isEmpty(childrenOptions)) {
        transformation = childrenOptions;
        return {...options, transformation};
      }
    }
    return {...options};
  }

  /**
   * Combine properties of all options to create an option Object that can be passed to Cloudinary methods.<br>
   *   All names are converted to snake_case. undefined and null values are filtered out.
   * @returns {Object}
   * @param options one or more options objects
   */
  static normalizeOptions(...options) {
    return options.reduce((left, right)=> {
        for (let key in right) {
          let value = right[key];
          if (value !== null && value !== undefined) {
            left[snakeCase(key)] = value;
          }
        }
        return left;
      }
      , {});
  }

  /**
   * Generate a Cloudinary resource URL based on the options provided and child Transformation elements
   * @param options
   * @returns {string} a cloudinary URL
   */
  getUrl(options) {
    let transformation = this.getTransformation(options);
    let cl = Cloudinary.new(options);
    return cl.url(options.public_id, transformation);
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
 */
function typesFrom(configParams) {
  configParams = configParams || [];
  const types = {};
  for (let key of configParams) {
    types[camelCase(key)] = PropTypes.any;
  }
  return types;
}

