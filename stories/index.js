import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Image from '../src/components/Image';
import Video from '../src/components/Video';
import Transformation from '../src/components/Transformation';
import CloudinaryContext from '../src/components/CloudinaryContext';
import cloudinary from 'cloudinary-core';

storiesOf('Image', module).addWithInfo('image', "Basic tag", ()=> {
    return (
      <Image cloudName="demo" publicId="sample"/>
    )
  }
).addWithInfo('responsive image', "Basic tag", ()=> {
    return (
      <Image cloudName="demo" publicId="sample" crop="scale" width="auto" responsive/>
    )
  }
).addWithInfo('responsive image with very slow debounce', "Basic tag", ()=> {
    return (
      <Image cloudName="demo" publicId="sample" crop="scale" width="auto" responsive responsiveDebounce="2000"/>
    )
  }
).addWithInfo('image with alt', "Demostrate using an img tag attribute", ()=> {
    let t = {width: 0.5, crop: "scale"};
    return (
      <Image cloudName="demo" publicId="does-not-exist" alt="This image is intentionally missing" transformation={t}/>
    )
  }
).addWithInfo('image with html attributes', 'image with html attributes', ()=> {
    return (
      <Image cloudName="demo" publicId="sample" html_width="100"/>
    )
  }
).addWithInfo('image with style', 'image with style', ()=> {
    let t = {width: 0.5, crop: "scale"};
    return (
      <Image {...t} cloudName="demo" publicId="sample" style={{border: "20px solid"}}/>
    )
  }
).addWithInfo('image with onError', 'image with onError', ()=> {
    let t = {width: 0.5, crop: "scale"};
    let onError = (e)=> { e.target.insertAdjacentHTML("afterend", "<div>Error handler was invoked.</div>")};
    return (
      <div>
        <Image {...t} cloudName="demo" publicId="i-dont-exist" style={{border: "20px solid"}} onError={onError}/>
      </div>
    )
  }
).addWithInfo('image with chained transformation', 'image with chained transformation', ()=> {
    return (
      <div>
        <Image cloudName="demo" publicId="sample" width="100" crop="scale" angle="10"
               transformation={[{width: 100, crop: "crop"}, {width: 100, angle: -10, crop: "scale"}]}/>
        <Image cloudName="demo" publicId="sample" width="100" crop="scale" angle="10"/>
      </div>
    )
  }
).addWithInfo('image with nested chained transformation', 'image with chained transformation', ()=> {
  return (
    <div>
      <Image cloudName="demo" publicId="sample">
        <Transformation angle="-45"/>
        <Transformation effect="trim" angle="45" crop="scale" width="600">
          <Transformation overlay="text:Arial_100:Hello" />
        </Transformation>
      </Image>
      <Image cloudName="demo" publicId="sample" width="100" crop="scale"/>
    </div>
  )
}).addWithInfo('image with events', 'image with events', ()=> {
  let options = {
    onLoad: ()=> {
      let e = document.getElementById("eventResult");
      e.innerHTML = e.innerHTML + "<br>loaded";
    },
    onMouseOver: ()=> {
      let e = document.getElementById("eventResult");
      e.innerHTML = e.innerHTML + "<br>Mouse over";

    },
    width: 200,
    crop: "scale"
  };
  return (
    <div>
      <Image {...options} cloudName="demo" publicId="sample" />
      <div id="eventResult"></div>
    </div>
  )
});
storiesOf('Video', module).addWithInfo('Simple tag', 'Simple tag', ()=> {
    return (
      <Video cloudName="demo" controls publicId="dog"/>
    )
  }
).addWithInfo('With fallback', 'With fallback', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog" fallback="Cannot display video"/>
    )
  }
).addWithInfo('With inline fallback', 'With inline fallback', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog">
        Cannot display <b>video</b>.
      </Video>
    )
  }
).addWithInfo('With source types', 'With source types', ()=> {
    return (
      <Video cloudName="demo" controls="controls" publicId="dog" sourceTypes={['webm', 'ogv', 'mp4']} sourceTransformation={{webm: {aspectRatio: "1:1"}, ogv: {aspect_ratio: "3:2"}}}>
        Cannot display video.
      </Video>
    )
  }
).addWithInfo('Simple tag with width', 'Simple tag with width', ()=> {
    return (
      <Video cloudName="demo" controls publicId="dog" width="300" crop="scale"/>
    )
  }
).addWithInfo('Simple tag with poster url', 'Simple tag with poster url', ()=> {
    let url = cloudinary.Cloudinary.new({cloud_name: "demo"}).url("sample", {width: 300, crop: "scale"});
    return (
      <Video cloudName="demo" controls publicId="dog" width="300" crop="scale" poster={url}/>
    )
  }
).addWithInfo('Simple tag with poster object', 'Simple tag with poster object', ()=> {
  return (
    <Video cloudName="demo" controls publicId="dog" width="300" crop="scale" poster={{publicId: "sample"}}/>
  )
});

storiesOf('CloudinaryContext', module).addWithInfo('CloudinaryContext', 'CloudinaryContext', ()=> {
    let t = {width: 0.5, crop: "scale"};
    return (
      <CloudinaryContext cloudName="demo">
        <div><span>Inside a div: </span>
          <Image publicId="sample" transformation={t} width="50"/>
        </div>

        <Image publicId="sample" transformation={t}/>
      </CloudinaryContext>
    );
  }
).addWithInfo('Nested Context', 'Nested Context', ()=> {
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
    )
  }
);
