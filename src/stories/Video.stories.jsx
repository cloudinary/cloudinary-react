import React from 'react';
import { Video, Transformation } from '../index';

export default {
  title: 'Example/Video',
  component: Video,
  subcomponents: { Transformation }
};

const Template = (args) => <Video {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  ...Video.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true
};
export const WithFallback = Template.bind({});
WithFallback.args = {
  ...Video.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  fallback: 'Cannot display video'
};
export const WithInlineFallback = (args) => (
  <Video {...args}>
    Cannot display
    {' '}
    <b>video</b>
    .
  </Video>
);
WithInlineFallback.args = {
  ...Video.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true
};
export const WithSourceTypes = Template.bind({});
WithSourceTypes.args = {
  ...Video.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  sourceTypes: ['webm', 'ogv', 'mp4'],
  sourceTransformation: {
    webm: { aspectRatio: '1:1' },
    ogv: { aspect_ratio: '3:2' }
  },
  fallback: 'Cannot display video'
};
export const Width = Template.bind({});
Width.args = {
  ...Video.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  width: 300,
  crop: 'scale'
};
export const PosterUrl = Template.bind({});
PosterUrl.args = {
  ...Video.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  poster: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
};
export const PosterObject = Template.bind({});
PosterObject.args = {
  ...Video.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  poster: { cloudName: 'demo', publicId: 'sample' }
};
