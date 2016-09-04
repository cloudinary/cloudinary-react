import React, {Component, PropTypes} from 'react';
import cloudinary from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';

export default class Image extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
    let url = this.getUrl(props, context);
    this.state = {url};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let url = this.getUrl(nextProps, nextContext);
    if(url !== this.state.url){
      this.setState({url});
    }
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
    var {children, ...options} = CloudinaryComponent.getOptions(this.props, this.context);
    var attributes = cloudinary.Transformation.new(options).toHtmlAttributes();
    return (
      <img {...attributes} src={this.state.url} />
    );
  }
}

Image.defaultProps = {};
Image.contextTypes = CloudinaryComponent.contextTypes;
Image.propTypes = CloudinaryComponent.propTypes;