import React from 'react';
import PropTypes from 'prop-types';
import { Cloudinary, Util } from 'cloudinary-core';
import CloudinaryComponent from './CloudinaryComponent';
import { VIDEO_MIME_TYPES, extractCloudinaryProps, normalizeOptions, getTransformation } from '../Util';

/**
 * A component representing a Cloudinary served video
 */
class Video extends CloudinaryComponent {
  mimeType = 'video';

  mimeSubTypes = VIDEO_MIME_TYPES;

  /**
   * Merge context with props
   * @return {*}
   */
  getMergedProps = () => ({ ...this.getContext(), ...this.props });

  /**
   * Generate a video source url
   * @param cld - preconfigured cloudinary-core object
   * @param publicId - identifier of the video asset
   * @param childTransformations - child transformations for this video url
   * @param sourceTransformations - source transformations this video url
   * @param sourceType - format of the video url
   * @return {*}
   */
  generateVideoUrl = (cld, publicId, childTransformations, sourceTransformations, sourceType) => {
    const urlOptions = Util.withSnakeCaseKeys(Util.defaults({}, sourceTransformations, childTransformations, {
      resource_type: 'video',
      format: sourceType
    }));

    return cld.url(publicId, urlOptions);
  };

  /**
   * Generate content of this video element from "source types" prop
   * @param cld - preconfigured cloudinary-core object
   * @param publicId - identifier of the video asset
   * @param childTransformations - child transformations for this video element
   * @param sourceTransformations - source transformations for source types
   * @param sourceTypes - formats for each video url that will be generated
   * @return {*}
   */
  generateUsingSourceTypes = (cld, publicId, childTransformations, sourceTransformations, sourceTypes) => (
    sourceTypes.map((sourceType) => (
      this.toSourceTag(
        cld,
        publicId,
        childTransformations,
        sourceTransformations[sourceType] || {},
        sourceType,
        this.buildMimeType(sourceType)
      )
    ))
  );

  /**
   * Generate content of this video element from "sources" prop
   * @param cld - preconfigured cloudinary-core object
   * @param publicId - identifier of the video asset
   * @param childTransformations - child transformations for this video element
   * @param sources - formats for each video url that will be generated
   */
  generateUsingSources = (cld, publicId, childTransformations, sources) => (
    sources.map(({ transformations = {}, type, codecs }) => (
      this.toSourceTag(cld, publicId, childTransformations, transformations, type, this.buildMimeType(type, codecs))
    ))
  );

  /**
   * Creates <source> tag.
   * @param cld - preconfigured cloudinary-core object
   * @param publicId - identifier of the video asset
   * @param childTransformations - child transformations for this video element
   * @param transformations - source transformations for specified source type
   * @param sourceType - format of the video url
   * @param mimeType - MIME type if specified source type
   */
  toSourceTag = (cld, publicId, childTransformations, transformations, sourceType, mimeType) => {
    const src = this.generateVideoUrl(
      cld,
      publicId,
      childTransformations,
      transformations,
      sourceType
    );
    return <source key={src + mimeType} src={src} type={mimeType} />;
  };

  /**
   * Determines MIME type of given source type and codecs.
   * @param type - format of the video
   * @param codecs - optional information about codecs of the video
   */
  buildMimeType = (type, codecs) => {
    let mimeType = `${this.mimeType}/${this.mimeSubTypes[type] || type}`;
    if (!Util.isEmpty(codecs)) {
      mimeType += `; codecs=${Util.isArray(codecs) ? codecs.join(', ') : codecs}`;
    }
    return mimeType;
  };

  /**
   * Get props for the video element that will be rendered
   * @return {{tagAttributes: Object, sources: [<source>] | string}}
   */
  getVideoTagProps = () => {
    let {
      innerRef,
      publicId,
      fallback,
      children,
      sourceTypes,
      sourceTransformation = {},
      sources,
      ...options
    } = this.getMergedProps();

    options = normalizeOptions(options, {});
    const { cloudinaryProps, cloudinaryReactProps, nonCloudinaryProps } = extractCloudinaryProps(options);
    options = { ...cloudinaryProps, ...cloudinaryReactProps };

    // const snakeCaseOptions = toSnakeCaseKeys(options);
    const snakeCaseOptions = Util.withSnakeCaseKeys(options);
    const cld = Cloudinary.new(snakeCaseOptions);

    // Use cloudinary-core to generate this video tag's attributes
    let tagAttributes = cld.videoTag(publicId, options).attributes();
    tagAttributes = { ...Util.withCamelCaseKeys(tagAttributes), ...nonCloudinaryProps };

    // Aggregate child transformations, used for generating <source> tags for this video element
    const childTransformations = getTransformation({ ...options, children });

    let sourceElements = null;

    if (Util.isArray(sources) && !Util.isEmpty(sources)) {
      sourceElements = this.generateUsingSources(cld, publicId, childTransformations, sources);
    } else if (Util.isArray(sourceTypes)) {
      // We have multiple sourceTypes, so we generate <source> tags.
      sourceElements = this.generateUsingSourceTypes(
        cld,
        publicId,
        childTransformations,
        sourceTransformation,
        sourceTypes
      );
    } else {
      // We have a single source type so we generate the src attribute of this video element.
      tagAttributes.src = this.generateVideoUrl(
        cld,
        publicId,
        childTransformations,
        sourceTransformation[sourceTypes] || {},
        sourceTypes
      );
    }

    return { sources: sourceElements, tagAttributes };
  };

  reloadVideo = () => {
    if (this.element && this.element.current) {
      this.element.current.load();
    }
  }

  componentDidUpdate() {
    // Load video on props change
    this.reloadVideo();
  }

  /**
   * Render a video element
   */
  render() {
    const { fallback, children } = this.props;

    const {
      tagAttributes, // Attributes of this video element
      sources // <source> tags of this video element
    } = this.getVideoTagProps();

    return (
      <video
        ref={this.attachRef}
        {...tagAttributes}
      >
        {sources}
        {fallback}
        {children}
      </video>
    );
  }
}

Video.propTypes = {
  publicId: PropTypes.string,
  sources: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    codecs: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    transformations: PropTypes.object
  }))
};
Video.defaultProps = {
  sourceTypes: Cloudinary.DEFAULT_VIDEO_PARAMS.source_types
};

export default Video;
