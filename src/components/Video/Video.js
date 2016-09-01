import React, {Component, PropTypes} from 'react';
import cloudinary from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';
const Util = cloudinary.Util;
const Cloudinary = cloudinary.Cloudinary;
const DEFAULT_POSTER_OPTIONS = {
  format: 'jpg',
  resource_type: 'video'
};

export default class Video extends CloudinaryComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    let {publicId, poster, sourceTypes, fallback, sourceTransformation, ...options} = Object.assign({}, this.context, this.props);
    sourceTransformation = sourceTransformation || {};
    sourceTypes = sourceTypes || Cloudinary.DEFAULT_VIDEO_PARAMS.source_types;
    options = this.getOptions(options, {});
    let cld = Cloudinary.new(options);
    let sources = [];
    let tagAttributes = cloudinary.Transformation.new(options).toHtmlAttributes();
    if (Util.isPlainObject(poster)) {
      let defaults = poster.publicId != null ? Cloudinary.DEFAULT_IMAGE_PARAMS : DEFAULT_POSTER_OPTIONS;
      poster = cld.url(poster.publicId || publicId, Util.defaults({}, poster, defaults));
    }
    if(!Util.isEmpty(poster)){
      tagAttributes["poster"] = poster;
    }

    if(Util.isArray(sourceTypes)){
      sources = sourceTypes.map( srcType => {
        let transformation = sourceTransformation[srcType] || {};
        let src = cld.url(publicId, Util.defaults({}, transformation, {resource_type: 'video', format: srcType}));
        let mimeType = 'video/' + (srcType == 'ogv' ? 'ogg' : srcType);
        return <source key={mimeType} src={ src} type={ mimeType}/>;
        }
      );
    } else {
      tagAttributes["src"] = cld.url(publicId, {resource_type: 'video', format: sourceTypes});
    }
    console.log("Ready to return tag", tagAttributes);
    return (
      <video {...tagAttributes}>
        {sources}
        {fallback}
        {this.props.children}
      </video>
    );
  }
}
Video.propTypes = {publicId: PropTypes.string};
// Video.defaultProps = {initialCount: 0};
Video.contextTypes = CloudinaryComponent.contextTypes;