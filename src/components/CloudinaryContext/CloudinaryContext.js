import React from 'react';
import CloudinaryComponent from '../CloudinaryComponent';

/**
 * Provides a container for Cloudinary components. Any option set in CloudinaryContext will be passed to the children.
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
    this.state = {};
  }

  getChildContext() {
    let context = {};
    // only pass valid Cloudinary options
    CloudinaryComponent.VALID_OPTIONS.forEach(key => {
      let val = this.props[key] || this.context[key];
      if (val !== undefined && val !== null) {
        context[key] = val;
      }
    });
    return context;
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

CloudinaryContext.propTypes = CloudinaryComponent.propTypes;
CloudinaryContext.defaultProps = {};
CloudinaryContext.childContextTypes = CloudinaryComponent.contextTypes;

export default CloudinaryContext;