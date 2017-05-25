import React, {Component} from 'react';
import CloudinaryComponent from '../CloudinaryComponent';

/**
 * Define a transformation that is applied to the parent tag.
 */
class Transformation extends CloudinaryComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return null;
  }
}
Transformation.propTypes = CloudinaryComponent.propTypes;
Transformation.defaultProps = {};
Transformation.contextTypes = {};
Transformation.exposesProps = true;

export default Transformation;