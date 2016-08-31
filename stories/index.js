import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Image from '../src/components/Image';
import Video from '../src/components/Video';
import CloudinaryContext from '../src/components/CloudinaryContext';

let CLImage = Image;

storiesOf('Cloudinary', module)
  .add('image', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return (
    <Image publicId="sample" transformation={t}/>
  )})
  .add('image with alt', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return(
      <Image publicId="does-not-exist" alt="This image is intentionally missing" transformation={t}/>
    )
  })
  .add('image with style', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return(
      <Image publicId="sample" style={{border: "20px solid"}} transformation={t}/>
    )
  })
  .add('Video', ()=> {
    return (
      <Video />
    )})
  .add('CloudinaryContext', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return (
      <CloudinaryContext >
        <div>
          <Image publicId="sample" transformation={t}/>
        </div>
      </CloudinaryContext>
    )})
;
