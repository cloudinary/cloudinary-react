import React from 'react';
import PropTypes from 'prop-types';
import Video from '../Video';

/**
 * A component representing a Cloudinary served audio
 * This component extends the Video component and replaces it's render function.
 * Audio files are uploaded to Cloudinary as a video asset type.
 * An <audio> tag with a video source, will play the audio only.
 */
class Audio extends Video {
  mimeType = 'audio';

  /**
   * Render an audio element
   */
  render() {
    const {innerRef, fallback, children} = this.props;

    const {
      tagAttributes, // Attributes of this video element
      sources        // <source> tags of this video element
    } = this.getVideoTagProps();

    // We generated video attributes, lets delete the unneeded poster
    delete tagAttributes.poster;

    return (
      <audio
        ref={innerRef}
        {...tagAttributes}>
        {sources}
        {fallback}
        {children}
      </audio>
    );
  }
}

Audio.propTypes = {publicId: PropTypes.string};
Audio.defaultProps = {sourceTypes: ["aac","mp3","ogg"]};

export default Audio;
