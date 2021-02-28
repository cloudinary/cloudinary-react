// eslint-disable-next-line no-unused-vars
import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { Transformation, Util } from 'cloudinary-core';
import { typesFrom, CloudinaryContextType, normalizeOptions } from '../Util';

const { camelCase } = Util;

/**
 * A base component for Cloudinary components.
 * @protected
 */
class CloudinaryComponent extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.element = createRef();
  }

  getContext = () => {
    return this.context || {};
  };

  /**
   * React function: Called when this element is in view
   */
  onIntersect = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isInView: true });
  };

  /**
   * Merges context & props
   * @param props of this component
   * @param context of this component
   * @return {Object}
   */
  getExtendedProps = (props = this.props, context = this.getContext()) => {
    return normalizeOptions(context, props);
  };

  /**
   * Attach both this.element and props.innerRef as ref to the given element
   * @param element - the element to attach a ref to
   */
  attachRef = (element) => {
    const { innerRef } = this.props;
    this.element.current = element;

    if (innerRef) {
      if (innerRef instanceof Function) {
        innerRef(element);
      } else {
        innerRef.current = element;
      }
    }
  };

  render() {
    return null;
  }
}

CloudinaryComponent.defaultProps = { innerRef: null, publicId: null };
CloudinaryComponent.propTypes = {
  ...typesFrom(Transformation.PARAM_NAMES.map(camelCase)),
  innerRef: PropTypes.any,
  publicId: PropTypes.string
};

CloudinaryComponent.contextType = CloudinaryContextType;

export default CloudinaryComponent;
