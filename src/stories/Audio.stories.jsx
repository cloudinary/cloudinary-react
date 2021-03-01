import React from 'react';
import { Audio, Transformation } from '../index';

export default {
  title: 'Example/Audio',
  component: Audio,
  subcomponents: { Transformation }
};

const Template = (args) => <Audio {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  ...Audio.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true
};
export const WithFallback = Template.bind({});
WithFallback.args = {
  ...Audio.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  fallback: 'Cannot play audio'
};
export const WithInlineFallback = (args) => (
  <Audio {...args}>
    Cannot play
    {' '}
    <b>audio</b>
    .
  </Audio>
);
WithInlineFallback.args = {
  ...Audio.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true
};
export const WithSourceTypes = Template.bind({});
WithSourceTypes.args = {
  ...Audio.defaultProps,
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  sourceTypes: ['mp3', 'wav', 'aac'],
  sourceTransformation: {
    mp3: { duration: 2 },
    wav: { duration: 3 }
  },
  fallback: 'Cannot play audio'
};
