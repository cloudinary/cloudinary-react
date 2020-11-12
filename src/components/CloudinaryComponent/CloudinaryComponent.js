import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {Transformation, Util} from 'cloudinary-core';
import {CloudinaryContextType} from '../CloudinaryContext/CloudinaryContextType';

const {camelCase} = Util;

/**
 * Check if given component is a Cloudinary Component with given displayName
 * @param component the component to check
 * @param displayName of wanted component
 * @return {boolean}
 */
const isCloudinaryComponent = (component, displayName) => {
  return !!(React.isValidElement(component)
    && component.type
    && component.type.displayName === displayName);
};

/**
 * Return a new object containing keys and values where keys are in the keys list
 * @param {object} source Object to copy values from
 * @param {string[]} [keys=[]] a list of keys
 * @returns {object} an object with copied values
 */
function only(source, keys = []) {
  if (!source) {
    return source;
  }

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
class CloudinaryComponent extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.element = createRef();
  }

  render() {
    return null;
  }

  getContext = () => {
    return this.context || {};
  }

  /**
   * React function: Called when this element is in view
   */
  onIntersect = () =>{
    this.setState({isInView: true})
  }

  getChildPlaceholder(children){
    if (children) {
      return React.Children.toArray(children)
        .find(child => isCloudinaryComponent(child, "CloudinaryPlaceholder"));
    }
  }

  getChildTransformations(children) {
    let result = children ? React.Children.toArray(children)
      .filter(child => isCloudinaryComponent(child, "CloudinaryTransformation"))
      .map(child => {
        const options = CloudinaryComponent.normalizeOptions(child.props, child.context);
        const childOptions = this.getChildTransformations(child.props.children);
        if (childOptions) {
          options.transformation = childOptions;
        }
        return options;
      }) : [];

    return result.length ? result : null;
  }

  /**
   * Returns an object with all the transformation parameters based on the context and properties of this element
   * and any children.
   * @param extendedProps
   * @returns {object} a hash of transformation and configuration parameters
   * @protected
   */
  getTransformation(extendedProps) {
    let {children, accessibility, placeholder, ...rest} = extendedProps;
    let ownTransformation = only(Util.withCamelCaseKeys(rest), Transformation.methods) || {};
    let childrenOptions = this.getChildTransformations(children);
    if (!Util.isEmpty(childrenOptions)) {
      ownTransformation.transformation = childrenOptions;
    }

    //Append placeholder and accessibility if exists
    const advancedTransformations = {accessibility, placeholder};
    Object.keys(advancedTransformations).filter(k=>advancedTransformations[k]).map(k=>{
      ownTransformation[k] = advancedTransformations[k];
    });

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
    return options.reduce((left, right) => {
        Object.keys(right || {}).forEach(key => {
          let value = right[key];
          if (value !== null && value !== undefined) {
            left[key] = value;
          }
        });
        return left;
      }
      , {});
  }

  /**
   * Generated a configured Cloudinary object.
   * @param extendedProps React props combined with custom Cloudinary configuration options
   * @return {Cloudinary} configured using extendedProps
   */
  getConfiguredCloudinary(extendedProps){
    const options = Util.extractUrlParams(Util.withSnakeCaseKeys(extendedProps));
    return Cloudinary.new(options);
  }

  /**
   * Generate a Cloudinary resource URL based on the options provided and child Transformation elements
   * @param extendedProps React props combined with custom Cloudinary configuration options
   * @returns {string} a cloudinary URL
   * @protected
   */
  getUrl(extendedProps) {
    const {publicId} = extendedProps;
    const cl = getConfiguredCloudinary(extendedProps);
    return cl.url(publicId, this.getTransformation(extendedProps));
  }

  /**
   * Merges context & props
   * @param props of this component
   * @param context of this component
   * @return {Object}
   */
  getExtendedProps = (props = this.props, context = this.getContext()) => {
    return CloudinaryComponent.normalizeOptions(context, props);
  };

  /**
   * Attach both this.element and props.innerRef as ref to the given element
   * @param element - the element to attach a ref to
   */
  attachRef = (element) => {
    const {innerRef} = this.props;
    this.element.current = element;

    if (innerRef) {
      if (innerRef instanceof Function) {
        innerRef(element);
      } else {
        innerRef.current = element;
      }
    }
  };

  static contextType = CloudinaryContextType;
}

CloudinaryComponent.propTypes = typesFrom(Transformation.PARAM_NAMES.map(camelCase));
CloudinaryComponent.propTypes.publicId = PropTypes.string;

/**
 * Create a React type definition object. All items are PropTypes.string or [string] or object or [object].
 * @param {Array} configParams a list of parameter names
 * @returns {Object}
 * @private
 */
function typesFrom(configParams) {
  configParams = configParams || [];
  const types = {};
  for (let i = 0; i < configParams.length; i++) {
    const key = configParams[i];
    types[camelCase(key)] = PropTypes.any;
  }
  return types;
}

export default CloudinaryComponent;
