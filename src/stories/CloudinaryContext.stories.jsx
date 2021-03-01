import React from 'react';
import { CloudinaryContext, Image, Transformation } from '../index';

export default {
  title: 'Example/CloudinaryContext',
  component: CloudinaryContext,
  subcomponents: { Image, Transformation }
};

export const Basic = (args) => (
  <CloudinaryContext {...args}>
    <div>
      <span>Inside a div: </span>
      <Image
        publicId='sample'
        transformation={{ width: 0.5, crop: 'scale' }}
        width='50'
      />
    </div>

    <Image publicId='sample' transformation={{ width: 0.5, crop: 'scale' }} />
  </CloudinaryContext>
);
Basic.args = {
  cloudName: 'demo'
};

export const Nested = (args) => (
  <CloudinaryContext {...args}>
    <Image publicId='sample' />
    <Image publicId='sample' radius='100' />
    <Image publicId='sample' angle='0' />
    <CloudinaryContext angle='20' width='100' style={{ border: '2px solid' }}>
      <span>Inner Context</span>
      <Image publicId='sample' />
      <Image publicId='sample' radius='100' />
      <Image publicId='sample' angle='0' />
    </CloudinaryContext>
  </CloudinaryContext>
);

Nested.args = {
  cloudName: 'demo',
  width: 50,
  crop: 'scale'
};
