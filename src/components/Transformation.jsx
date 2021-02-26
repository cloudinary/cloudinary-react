// eslint-disable-next-line no-unused-vars
import React from 'react';
import CloudinaryComponent from './CloudinaryComponent';

/**
 * Define a transformation that is applied to the parent tag.
 */
class Transformation extends CloudinaryComponent {
  render() {
    return null;
  }
}

Transformation.propTypes = CloudinaryComponent.propTypes;
Transformation.defaultProps = {};
Transformation.exposesProps = true;
Transformation.displayName = 'CloudinaryTransformation';

export default Transformation;
