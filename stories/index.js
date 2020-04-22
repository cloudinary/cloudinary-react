import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withInfo } from "@storybook/addon-info";

import Image from "../src/components/Image";
import Video from "../src/components/Video";
import Audio from "../src/components/Audio";
import Transformation from "../src/components/Transformation";
import CloudinaryContext from "../src/components/CloudinaryContext";
import cloudinary from "cloudinary-core";

storiesOf("Image", module)
  .add(
    "image",
    withInfo({
      text: "Basic tag"
    })(() => <Image cloudName="demo" publicId="sample" />)
  )
  .add(
    "responsive image",
    withInfo({ text: "Basic tag" })(() => {
      return (
        <Image
          cloudName="demo"
          publicId="sample"
          crop="scale"
          width="auto"
          responsive
          transformation={{
            overlay: {
              text: "Enlarge window to test responsive behaviour",
              font_family: "Arial",
              font_size: "36"
            },
            color: "white"
          }}
          onLoad={e =>
            e.target.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div>Loading width ${e.target.src.match(/w_(\d+)/)[1]}</div>`
            )
          }
        />
      );
    })
  )
  .add(
    "responsive image with very slow debounce",
    withInfo({ text: "Basic tag" })(() => {
      return (
        <Image
          cloudName="demo"
          publicId="sample"
          crop="scale"
          width="auto"
          responsive
          responsiveDebounce="2000"
        />
      );
    })
  )
  .add(
    "responsive image with width/height styles applied",
    withInfo({ text: "Basic tag" })(() => {
      return (
        <div style={{ width: '50%'}}>
          <Image
            style={{ width: '100%', height: '100%' }}
            cloudName="demo"
            publicId="sample"
            crop="scale"
            width="auto"
            responsive
          />
        </div>
      )
    })
  )
  .add(
    "image with alt",
    withInfo({ text: "Demostrate using an img tag attribute" })(() => {
      let t = { width: 0.5, crop: "scale" };
      return (
        <Image
          cloudName="demo"
          publicId="does-not-exist"
          alt="This image is intentionally missing"
          transformation={t}
        />
      );
    })
  )
  .add(
    "image with html attributes",
    withInfo({ text: "image with html attributes" })(() => {
      return <Image cloudName="demo" publicId="sample" html_width="100" />;
    })
  )
  .add(
    "image with style",
    withInfo({ text: "image with style" })(() => {
      let t = { width: 0.5, crop: "scale" };
      return (
        <Image
          {...t}
          cloudName="demo"
          publicId="sample"
          style={{ border: "20px solid" }}
        />
      );
    })
  )
  .add(
    "image with onError",
    withInfo({ text: "image with onError" })(() => {
      let t = { width: 0.5, crop: "scale" };
      let onError = e => {
        e.target.insertAdjacentHTML(
          "afterend",
          "<div>Error handler was invoked.</div>"
        );
      };
      return (
        <div>
          <Image
            {...t}
            cloudName="demo"
            publicId="i-dont-exist"
            style={{ border: "20px solid" }}
            onError={onError}
          />
        </div>
      );
    })
  )
  .add(
    "image with chained transformation",
    withInfo({ text: "image with chained transformation" })(() => {
      return (
        <div>
          <Image
            cloudName="demo"
            publicId="sample"
            width="100"
            crop="scale"
            angle="10"
            transformation={[
              { width: 100, crop: "crop" },
              { width: 100, angle: -10, crop: "scale" }
            ]}
          />
          <Image
            cloudName="demo"
            publicId="sample"
            width="100"
            crop="scale"
            angle="10"
          />
        </div>
      );
    })
  )
  .add(
    "image with nested chained transformation",
    withInfo({ text: "image with chained transformation" })(() => {
      return (
        <div>
          <Image cloudName="demo" publicId="sample">
            <Transformation angle="-45" />
            <Transformation effect="trim" angle="45" crop="scale" width="600">
              <Transformation overlay="text:Arial_100:Hello" />
            </Transformation>
          </Image>
          <Image cloudName="demo" publicId="sample" width="100" crop="scale" />
        </div>
      );
    })
  )
  .add(
    "image with events",
    withInfo({ text: "image with events" })(() => {
      let options = {
        onLoad: () => {
          let e = document.getElementById("eventResult");
          e.innerHTML = e.innerHTML + "<br>loaded";
        },
        onMouseOver: () => {
          let e = document.getElementById("eventResult");
          e.innerHTML = e.innerHTML + "<br>Mouse over";
        },
        width: 200,
        crop: "scale"
      };
      return (
        <div>
          <Image {...options} cloudName="demo" publicId="sample" />
          <div id="eventResult" />
        </div>
      );
    })
  );
storiesOf("Video", module)
  .add(
    "Simple tag",
    withInfo({ text: "Simple tag" })(() => {
      return <Video cloudName="demo" controls publicId="dog" />;
    })
  )
  .add(
    "With fallback",
    withInfo({ text: "With fallback" })(() => {
      return (
        <Video
          cloudName="demo"
          controls="controls"
          publicId="dog"
          fallback="Cannot display video"
        />
      );
    })
  )
  .add(
    "With inline fallback",
    withInfo({ text: "With inline fallback" })(() => {
      return (
        <Video cloudName="demo" controls="controls" publicId="dog">
          Cannot display <b>video</b>.
        </Video>
      );
    })
  )
  .add(
    "With source types",
    withInfo({ text: "With source types" })(() => {
      return (
        <Video
          cloudName="demo"
          controls="controls"
          publicId="dog"
          sourceTypes={["webm", "ogv", "mp4"]}
          sourceTransformation={{
            webm: { aspectRatio: "1:1" },
            ogv: { aspect_ratio: "3:2" }
          }}
        >
          Cannot display video.
        </Video>
      );
    })
  )
  .add(
    "Simple tag with width",
    withInfo({ text: "Simple tag with width" })(() => {
      return (
        <Video
          cloudName="demo"
          controls
          publicId="dog"
          width="300"
          crop="scale"
        />
      );
    })
  )
  .add(
    "Simple tag with poster url",
    withInfo({ text: "Simple tag with poster url" })(() => {
      let url = cloudinary.Cloudinary.new({ cloud_name: "demo" }).url(
        "sample",
        { width: 300, crop: "scale" }
      );
      return (
        <Video
          cloudName="demo"
          controls
          publicId="dog"
          width="300"
          crop="scale"
          poster={url}
        />
      );
    })
  )
  .add(
    "Simple tag with poster object",
    withInfo({ text: "Simple tag with poster object" })(() => {
      return (
        <Video
          cloudName="demo"
          controls
          publicId="dog"
          width="300"
          crop="scale"
          poster={{ publicId: "sample" }}
        />
      );
    })
  );
storiesOf("Audio", module)
  .add(
    "Simple tag",
    withInfo({ text: "Simple tag" })(() => {
      return <Audio cloudName="demo" controls publicId="dog" />;
    })
  )
  .add(
    "With fallback",
    withInfo({ text: "With fallback" })(() => {
      return (
        <Audio
          cloudName="demo"
          controls="controls"
          publicId="dog"
          fallback="Cannot play audio"
        />
      );
    })
  )
  .add(
    "With inline fallback",
    withInfo({ text: "With inline fallback" })(() => {
      return (
        <Audio cloudName="demo" controls="controls" publicId="dog">
          Cannot play <b>audio</b>.
        </Audio>
      );
    })
  )
  .add(
    "With source types",
    withInfo({ text: "With source types" })(() => {
      return (
        <Audio
          cloudName="demo"
          controls="controls"
          publicId="dog"
          sourceTypes={["mp3", "wav", "aac"]}
          sourceTransformation={{
            mp3: { duration: 2 },
            wav: { duration: 3 }
          }}
        >
          Cannot play audio.
        </Audio>
      );
    })
  );

storiesOf("CloudinaryContext", module)
  .add(
    "CloudinaryContext",
    withInfo({ text: "CloudinaryContext" })(() => {
      let t = { width: 0.5, crop: "scale" };
      return (
        <CloudinaryContext cloudName="demo">
          <div>
            <span>Inside a div: </span>
            <Image publicId="sample" transformation={t} width="50" />
          </div>

          <Image publicId="sample" transformation={t} />
        </CloudinaryContext>
      );
    })
  )
  .add(
    "Nested Context",
    withInfo({ text: "Nested Context" })(() => {
      return (
        <CloudinaryContext cloudName="demo" width="50" crop="scale">
          <Image publicId="sample" />
          <Image publicId="sample" radius="100" />
          <Image publicId="sample" angle="0" />
          <CloudinaryContext
            angle="20"
            width="100"
            style={{ border: "2px solid" }}
          >
            <span>Inner Context</span>
            <Image publicId="sample" />
            <Image publicId="sample" radius="100" />
            <Image publicId="sample" angle="0" />
          </CloudinaryContext>
        </CloudinaryContext>
      );
    })
  );
