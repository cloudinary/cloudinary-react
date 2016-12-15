import React, {Component, PropTypes} from 'react';
import cloudinary from 'cloudinary-core';

export default class Image extends React.Component {
  render() {
    let cl = cloudinary.Cloudinary.new({cloud_name: this.props.cloudName});
    let {publicId, width, height} = this.props;
    let url = cl.url(publicId, {width, height, crop: "scale"});
    return (
      <img src={url} />
    );
  }
}

Image.propTypes = {
  cloudName: PropTypes.string.isRequired,
  publicId: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
};