import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Image from '../src/components/Image';
import Video from '../src/components/Video';
import CloudinaryContext from '../src/components/CloudinaryContext';

let CLImage = Image;

storiesOf('Image', module)
  .add('image', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return (
    <Image cloudName="demo" publicId="sample" transformation={t}/>
  )})
  .add('image with alt', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return(
      <Image cloudName="demo" publicId="does-not-exist" alt="This image is intentionally missing" transformation={t}/>
    )
  })
  .add('image with html attributes', ()=> {
    return(
      <Image cloudName="demo" publicId="sample"  html_width="100"/>
    )
  })
  .add('image with style', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return(
      <Image cloudName="demo" publicId="sample" style={{border: "20px solid"}} transformation={t}/>
    )
  });
storiesOf('Video', module)
  .add('Video', ()=> {
    return (
      <Video />
    )});
storiesOf('CloudinaryContext', module)
  .add('CloudinaryContext', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return (
      <CloudinaryContext cloudName="demo" >
        <div><span>Inside a div: </span>
          <Image publicId="sample" transformation={t} width="50"/>
          </div>

          <Image publicId="sample" transformation={t}/>
      </CloudinaryContext>
    )})
  .add('Nested Context', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return (
      <CloudinaryContext cloudName="demo" width="50" crop="scale">
        <Image publicId="sample"/>
        <Image publicId="sample" radius="100"/>
        <Image publicId="sample" angle="0"/>
        <CloudinaryContext angle="20" width="100" style={{border: "2px solid"}}>
          <span>Inner Context</span>
          <Image publicId="sample"/>
          <Image publicId="sample" radius="100"/>
          <Image publicId="sample" angle="0"/>
        </CloudinaryContext>
      </CloudinaryContext>
    )})
;
