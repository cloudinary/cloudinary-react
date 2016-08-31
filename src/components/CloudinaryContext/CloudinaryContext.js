import React, {Component, PropTypes} from 'react';
import cloudinary from 'cloudinary-core';

export default class CloudinaryContext extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getChildContext() {
    let {children, ...otherProps} = this.props;
    return Object.assign({}, this.context, otherProps);
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
CloudinaryContext.propTypes = {};
CloudinaryContext.defaultProps = {};
CloudinaryContext.contextTypes = {
  cloudName: PropTypes.string.isRequired
};
CloudinaryContext.childContextTypes = {
  cloudName: PropTypes.string.isRequired
};
for (let key of cloudinary.Configuration.CONFIG_PARAMS) {
  CloudinaryContext.childContextTypes[cloudinary.Util.camelCase(key)] = PropTypes.string;
}
for (let key of cloudinary.Transformation.new().PARAM_NAMES) {
  CloudinaryContext.childContextTypes[cloudinary.Util.camelCase(key)] = PropTypes.string;
}

console.log(CloudinaryContext.childContextTypes);