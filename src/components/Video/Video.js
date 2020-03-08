import React from 'react';
import PropTypes from 'prop-types';
import {Cloudinary, Util} from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';

/**
 * A component representing a Cloudinary served video
 */
class Video extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getMergedProps = () => {
    return {...this.getContext(), ...this.props};
  };

  getSourceUrlOptions = (childTransformations, sourceTransformations, sourceType) => {
    const sourceTransformation = sourceTransformations[sourceType] || {};
    return Util.defaults({}, sourceTransformation, childTransformations, {
      resource_type: 'video',
      format: sourceType
    });
  };

  getVideoTagProps = () => {
    let {
      innerRef,
      publicId,
      sourceTypes,
      fallback,
      sourceTransformation = {},
      children,
      ...options
    } = this.getMergedProps();

    sourceTypes = sourceTypes || Cloudinary.DEFAULT_VIDEO_PARAMS.source_types;
    options = CloudinaryComponent.normalizeOptions(options, {});

    const childTransformations = this.getTransformation({...options, children});
    const snakeCaseOptions = Util.withSnakeCaseKeys(options);
    const cld = Cloudinary.new(snakeCaseOptions);
    const tagAttributes = cld.videoTag(publicId, snakeCaseOptions).attributes();

    let sources = null;
    if (Util.isArray(sourceTypes)) {
      sources = sourceTypes.map(sourceType => {
          const urlOptions = this.getSourceUrlOptions(childTransformations, sourceTransformation, sourceType);
          const src = cld.url(publicId, urlOptions);
          const mimeType = 'video/' + (sourceType === 'ogv' ? 'ogg' : sourceType);
          return <source key={mimeType} src={src} type={mimeType}/>;
        }
      );
    } else {
      const urlOptions = this.getSourceUrlOptions(childTransformations, sourceTransformation, sourceTypes);
      tagAttributes.src = cld.url(publicId, urlOptions);
    }

    return {sources, tagAttributes};
  };

  render() {

    const {innerRef, fallback, children} = this.props;
    const {tagAttributes, sources} = this.getVideoTagProps();

    return (
      <video
        ref={innerRef}
        {...tagAttributes}>
        {sources}
        {fallback}
        {children}
      </video>
    );
  }
}

Video.propTypes = {publicId: PropTypes.string};
Video.defaultProps = {};

export default Video;
