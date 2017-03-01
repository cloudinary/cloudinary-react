import React, {Component, PropTypes} from 'react';
import {Cloudinary, Configuration, Transformation, Util} from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';

const DEFAULT_POSTER_OPTIONS = {
  format: 'jpg',
  resource_type: 'video'
};

/**
 * A component representing a Cloudinary served video
 */
class Video extends CloudinaryComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {publicId, poster, sourceTypes, fallback, sourceTransformation, ...options} = Object.assign({},
      this.context,
      this.props);
    sourceTransformation = sourceTransformation || {};
    sourceTypes = sourceTypes || Cloudinary.DEFAULT_VIDEO_PARAMS.source_types;
    options = CloudinaryComponent.normalizeOptions(options, {});
    let cld = Cloudinary.new(Util.withSnakeCaseKeys(options));
    let sources = [];
    let tagAttributes = Transformation.new(options).toHtmlAttributes();
    if (Util.isPlainObject(poster)) {
      let defaults = poster.publicId !== undefined && poster.publicId !== null ? Cloudinary.DEFAULT_IMAGE_PARAMS : DEFAULT_POSTER_OPTIONS;
      poster = cld.url(poster.publicId || publicId, Util.defaults({}, Util.withSnakeCaseKeys(poster), defaults));
    }
    if (!Util.isEmpty(poster)) {
      tagAttributes.poster = poster;
    }
    if (!Util.isEmpty(this.state.poster)) {
      tagAttributes.poster = this.state.poster;
    }

    if (Util.isArray(sourceTypes)) {
      sources = sourceTypes.map(srcType => {
          let transformation = sourceTransformation[srcType] || {};
          let src = cld.url(publicId, Util.defaults({}, transformation, {resource_type: 'video', format: srcType}));
          let mimeType = 'video/' + (srcType === 'ogv' ? 'ogg' : srcType);
          return <source key={mimeType} src={ src} type={ mimeType}/>;
        }
      );
    } else {
      tagAttributes["src"] = cld.url(publicId, {resource_type: 'video', format: sourceTypes});
    }
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
Video.defaultProps = {};
Video.contextTypes = CloudinaryComponent.contextTypes;

export default Video;