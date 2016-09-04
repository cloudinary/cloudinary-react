import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Image from '../src/components/Image';
import Video from '../src/components/Video';
import CloudinaryContext from '../src/components/CloudinaryContext';
import cloudinary from 'cloudinary-core';

storiesOf('Image', module)
  .addWithInfo('image', "Basic tag", ()=> {
    let t = { width: 0.5, crop: "scale"};
    return (
    <Image cloudName="demo" publicId="sample" transformation={t}/>
  )})
  .addWithInfo('image with alt', "Demostrate using an img tag attribute", ()=> {
    let t = { width: 0.5, crop: "scale"};
    return(
      <Image cloudName="demo" publicId="does-not-exist" alt="This image is intentionally missing" transformation={t}/>
    )
  })
  .addWithInfo('image with html attributes', 'image with html attributes', ()=> {
    return(
      <Image cloudName="demo" publicId="sample"  html_width="100"/>
    )
  })
  .addWithInfo('image with style', 'image with style', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return(
      <Image cloudName="demo" publicId="sample" style={{border: "20px solid"}}  />
    )
  }).addWithInfo('image with chained transformation', 'image with chained transformation', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return(<div>
      <Image cloudName="demo" publicId="sample" width="100" crop="scale" angle="10" transformation={[{width:100, crop:"crop"}, {width:100, angle: -10, crop: "scale"}]}  />
      <Image cloudName="demo" publicId="sample" width="100" crop="scale" angle="10" />
      </div>
    )
  }).addWithInfo('image with chained transformation', 'image with chained transformation', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return(<div>
      <Image cloudName="demo" publicId="sample" width="100" crop="scale" angle="10">
        <Transformation width="100" crop="scale" angle="10"/>
        <Transformation width="100" crop="scale" angle="10"/>
      </Image>
      <Image cloudName="demo" publicId="sample" width="100" crop="scale" angle="10" />
      </div>
    )
  });
storiesOf('Video', module)
  .addWithInfo('Simple tag', 'Simple tag', ()=> {
    return (
      <Video cloudName="demo" controls publicId="dog"/>
    )
  }).addWithInfo('With fallback', 'With fallback', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog" fallback="Cannot display video"/>
    )
  }).addWithInfo('With inline fallback', 'With inline fallback', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog" >
        Cannot display <b>video</b>.
      </Video>
    )
  }).addWithInfo('With source types', 'With source types', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog" sourceTypes={['webm', 'ogv', 'mp4']}>
        Cannot display video.
      </Video>
    )
  }).addWithInfo('Simple tag with width', 'Simple tag with width', ()=> {
    return (
      <Video cloudName="demo" controls publicId="dog" width="300" crop="scale"/>
    )
  }).addWithInfo('Simple tag with poster url', 'Simple tag with poster url', ()=> {
    let url = cloudinary.Cloudinary.new({cloud_name: "demo"}).url("sample", {width:300, crop: "scale"});
    return (
      <Video cloudName="demo" controls publicId="dog" width="300" crop="scale" poster={url}/>
    )
  }).addWithInfo('Simple tag with poster object', 'Simple tag with poster object', ()=> {
    return (
      <Video cloudName="demo" controls publicId="dog" width="300" crop="scale" poster={{publicId: "sample"}}/>
    )
  });
storiesOf('CloudinaryContext', module)
  .addWithInfo('CloudinaryContext', 'CloudinaryContext', ()=> {
    let t = { width: 0.5, crop: "scale"};
    return (
      <CloudinaryContext cloudName="demo" >
        <div><span>Inside a div: </span>
          <Image publicId="sample" transformation={t} width="50"/>
          </div>

          <Image publicId="sample" transformation={t}/>
      </CloudinaryContext>
    )})
  .addWithInfo('Nested Context', 'Nested Context', ()=> {
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
