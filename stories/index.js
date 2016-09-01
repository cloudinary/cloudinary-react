import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Image from '../src/components/Image';
import Video from '../src/components/Video';
import CloudinaryContext from '../src/components/CloudinaryContext';
import cloudinary from 'cloudinary-core';

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
  .add('Simple tag', ()=> {
    return (
      <Video cloudName="demo" controls publicId="dog"/>
    )
  }).add('With fallback', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog" fallback="Cannot display video"/>
    )
  }).add('With inline fallback', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog" >
        Cannot display <b>video</b>.
      </Video>
    )
  }).add('With source types', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog" sourceTypes={['webm', 'ogv', 'mp4']}>
        Cannot display video.
      </Video>
    )
  }).add('Simple tag with width', ()=> {
    return (
      <Video cloudName="demo" controls publicId="dog" width="300" crop="scale"/>
    )
  }).add('Simple tag with poster url', ()=> {
    let url = cloudinary.Cloudinary.new({cloud_name: "demo"}).url("sample", {width:300, crop: "scale"});
    return (
      <Video cloudName="demo" controls publicId="dog" width="300" crop="scale" poster={url}/>
    )
  }).add('Simple tag with poster object', ()=> {
    return (
      <Video cloudName="demo" controls publicId="dog" width="300" crop="scale" poster={{publicId: "sample"}}/>
    )
  });
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
