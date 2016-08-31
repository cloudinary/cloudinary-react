import React, {Component, PropTypes} from 'react';
import cloudinary from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';

export default class Image extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
    var options = this.getOptions(props, context);
    var options2 = options;
    let cl = cloudinary.Cloudinary.new(options2);
    var url = cl.url(props.publicId, options2);
    this.state = {url: url};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    var options = this.getOptions(nextProps, nextContext);

    let cl = cloudinary.Cloudinary.new(options);
    var url = cl.url(this.props.publicId, options);
    if(url != this.state.url){
      this.setState({
        url: url
      })
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
    var options = this.getOptions(this.props, this.context);
    var {publicId, transformation, ...other} = this.props;
    var attributes = cloudinary.Transformation.new(options).toHtmlAttributes();
    return (
      <img {...attributes} src={this.state.url} />
    );
  }
}

Image.propTypes = {
  publicId: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  transformation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  handleLoad: PropTypes.func,
  breakpoints: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.number)
  ])

};
Image.defaultProps = {};
Image.contextTypes = CloudinaryComponent.contextTypes;