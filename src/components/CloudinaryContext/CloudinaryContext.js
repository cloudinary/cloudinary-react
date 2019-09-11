import React from 'react';
import PropTypes from 'prop-types';
import CloudinaryComponent from '../CloudinaryComponent';
import { Util } from 'cloudinary-core';
import {CloudinaryContextType} from './CloudinaryContextType';



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
    this.getProps = this.getProps.bind(this);
    this.state = this.getProps();
  }

  getProps() {
    let context = {};
    const camelProps = Util.withCamelCaseKeys(this.props);

    // only pass valid Cloudinary options
    CloudinaryComponent.VALID_OPTIONS.forEach(key => {
      //let val = camelProps[key] || this.context[key];
      let val = this.context ? camelProps[key] || this.context[key] : camelProps[key];
      if (val !== undefined && val !== null) {
        context[key] = val;
      }
    });
    return context;
  }

  render() {
    // Remove Cloudinary custom props that don't belong to div
    const nonCloudinaryProps = Object.keys(this.props)
      .filter(propName => !CloudinaryContext.CLOUDINARY_PROPS[propName])
      .reduce((allowedProps, currentProp) => {
        allowedProps[currentProp] = this.props[currentProp];
        return allowedProps;
      }, {});
    const {includeOwnBody, ...props} = nonCloudinaryProps;

  return (
    <CloudinaryContextType.Provider value={this.context ? {...this.context, ...this.state} : {...this.state}}>
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
CloudinaryContext.defaultProps = {includeOwnBody: false };
CloudinaryContext.contextType = CloudinaryContextType;

export default CloudinaryContext;
