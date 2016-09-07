import React, {Component} from 'react';
import CloudinaryComponent from '../CloudinaryComponent';

export default class Transformation extends CloudinaryComponent {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return null;
  }
}
Transformation.propTypes = CloudinaryComponent.propTypes;
Transformation.defaultProps = {};
Transformation.contextTypes = {};