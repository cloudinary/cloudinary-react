import React from 'react';
import PropTypes from 'prop-types';
import CloudinaryComponent from '../CloudinaryComponent';
import {Util} from 'cloudinary-core';
import {CloudinaryContextType} from './CloudinaryContextType';

const getNonCloudinaryProps = (props) => {
  return Object.keys(props)
    .filter(propName => !CloudinaryContext.CLOUDINARY_PROPS[propName])
    .reduce((allowedProps, currentProp) => {
      allowedProps[currentProp] = props[currentProp];
      return allowedProps;
    }, {});
};

/**
 * Provides a container for Cloudinary components. Any option set in CloudinaryContext will be passed to the children.
 *
 * @example
 *<CloudinaryContext cloudName="mycloud" dpr="auto">
 *    <!-- other tags -->
 *    <Image publicId={id}/>
 *</CloudinaryContext>
 *
 */
class CloudinaryContext extends CloudinaryComponent {
  constructor(props) {
    super(props);
    this.calcState = this.calcState.bind(this);
    this.context = this.context || {};
    this.state = this.calcState();
  }

  calcState() {
    let context = {};
    const camelProps = Util.withCamelCaseKeys(this.props);

    // only pass valid Cloudinary options
    CloudinaryComponent.VALID_OPTIONS.forEach(key => {
      let val = camelProps[key] || this.context[key];
      if (val !== undefined && val !== null) {
        context[key] = val;
      }
    });
    //return {value: {...this.context, ...context}};
    return context;
  }

  render() {
    // Remove Cloudinary custom props that don't belong to div
    const {includeOwnBody, ...props} = getNonCloudinaryProps(this.props);
    const value = {...this.context, ...this.state};

    return (
      <CloudinaryContextType.Provider value={value}>
        {includeOwnBody ? this.props.children : <div {...props}>{this.props.children}</div>}
      </CloudinaryContextType.Provider>
    );
  }
}

// Map Cloudinary props from array to object for efficient lookup
CloudinaryContext.CLOUDINARY_PROPS = CloudinaryComponent.VALID_OPTIONS.reduce(
  (accumulator, cloudinaryPropName) => {
    accumulator[cloudinaryPropName] = true;
    return accumulator;
  },
  {}
);

CloudinaryContext.propTypes = {...CloudinaryComponent.propTypes, includeOwnBody: PropTypes.bool};
CloudinaryContext.defaultProps = {includeOwnBody: false};
CloudinaryContext.contextType = CloudinaryContextType;

export default CloudinaryContext;
