import React from 'react';
import PropTypes from 'prop-types';
import CloudinaryComponent from '../CloudinaryComponent';
import {extractCloudinaryProps} from '../../Util';
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
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = {...this.getContext(), ...this.props};

    const {children, cloudinaryProps, nonCloudinaryProps, cloudinaryReactProps} = extractCloudinaryProps(props);

    return (
      <CloudinaryContextType.Provider value={cloudinaryProps}>
        {cloudinaryReactProps.includeOwnBody ? children : <div {...nonCloudinaryProps}>{children}</div>}
      </CloudinaryContextType.Provider>
    );
  }
}

CloudinaryContext.propTypes = {...CloudinaryComponent.propTypes, includeOwnBody: PropTypes.bool};
CloudinaryContext.defaultProps = {includeOwnBody: false};

export default CloudinaryContext;
