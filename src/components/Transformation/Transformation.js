import React from 'react';
import CloudinaryComponent from '../CloudinaryComponent';

/**
 * Define a transformation that is applied to the parent tag.
 */
class Transformation extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return null;
  }
}

Transformation.propTypes = CloudinaryComponent.propTypes;
Transformation.defaultProps = {};
Transformation.exposesProps = true;
Transformation.displayName = "CloudinaryTransformation";

export default Transformation;
