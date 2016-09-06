import React, {Component, PropTypes} from 'react';
import cloudinary, {Util} from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';

export default class Image extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
    let url = this.getUrl(props, context);
    this.handleResize = this.handleResize.bind(this);
    this.state = {url};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let url = this.getUrl(nextProps, nextContext);
    if(url !== this.state.url){
      console.log("setting url ", url);
      this.setState({url, width: 0});
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);

  }

  componentWillUpdate(nextProps, nextState, nextContext) {

  }

  componentDidUpdate(prevProps, prevState, prevContext) {
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  getUrl(props, context, width){
    console.log("getUrl", this);
    width = width ||  (this.state ? this.state.width: undefined);
    console.log("width is ", width);
    if(width){
      console.log("Width is ", width);
      props = Object.assign({width}, props);
    }
    console.log(props);
    return super.getUrl(props, context);

  }
  handleResize(e){
    const width = this.findContainerWidth(this.element);
    if(!width) {
      return;
    }
    let partialState = {width, url: this.getUrl(this.props, this.context, width)};
    this.setState(partialState);
  }

  findContainerWidth(element) {
    console.log("findContainerWidth");
    var containerWidth, style;
    containerWidth = 0;
    while (((element = element != null ? element.parentNode : void 0) instanceof Element) && !containerWidth) {
      style = window.getComputedStyle(element);
      if (!/^inline/.test(style.display)) {
        containerWidth = Util.width(element);
      }
    }
    return containerWidth;
  };

  render() {
    var {public_id, children, ...options} = CloudinaryComponent.normalizeOptions(this.props, this.context);
    console.log("render image", this.state.url, this.state.width);
    var attributes = cloudinary.Transformation.new(options).toHtmlAttributes();
    return (
      <img {...attributes} src={this.state.url} ref={(e)=>{this.element = e;}}/>
    );
  }
}

Image.defaultProps = {};
Image.contextTypes = CloudinaryComponent.contextTypes;
Image.propTypes = CloudinaryComponent.propTypes;