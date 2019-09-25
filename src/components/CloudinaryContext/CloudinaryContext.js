import React from 'react';
import PropTypes from 'prop-types';
import CloudinaryComponent from '../CloudinaryComponent';
import {extractCloudinaryProps} from '../../Util';
import {CloudinaryContextType} from './CloudinaryContextType';

/**
 * Split props to cloudinary/non-cloudinary props
 * @param context
 * @param props
 * @returns {{children: *, cloudinaryProps: {}, nonCloudinaryProps: {}}}
 */
const splitProps = (context={}, props={}) => {
  const {cloudinaryProps, cloudinaryReactProps, nonCloudinaryProps} = extractCloudinaryProps(
    {...context, ...props},
    CloudinaryContext.CLOUDINARY_PROPS
  );

  return {
    children: props.children,
    cloudinaryProps,
    nonCloudinaryProps,
    ...cloudinaryReactProps
  }
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
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {children, cloudinaryProps, nonCloudinaryProps, includeOwnBody} = splitProps(this.context, this.props);

    return (
      <CloudinaryContextType.Provider value={cloudinaryProps}>
        {includeOwnBody ? children : <div {...nonCloudinaryProps}>{children}</div>}
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
