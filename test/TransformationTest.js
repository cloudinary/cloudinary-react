import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import cloudinary from './cloudinary-proxy';
const {Image, Transformation} = cloudinary;

describe("Transformation", () => {
  //beforeEach(() => {});
  it("should create an img tag", function() {
    const tag = shallow(
      <Image publicId="sample" cloudName="demo">
        <Transformation width="100" crop="scale" angle="10" />
      </Image>
    );
    expect(tag.html()).to.equal(`<img src="http://res.cloudinary.com/demo/image/upload/a_10,c_scale,w_100/sample"/>`);
  });
  it("should allow chained transformations", function() {
    const tag = shallow(
      <Image publicId="sample" cloudName="demo">
        <Transformation width="100" crop="scale" />
        <Transformation width="200" crop="pad">
          <Transformation angle="30" />
        </Transformation>
      </Image>
    );
    expect(tag.html()).to.equal(`<img src="http://res.cloudinary.com/demo/image/upload/c_scale,w_100/a_30/c_pad,w_200/sample"/>`)
  });
  it("array should define a set of variables", function() {
    let tag = shallow(
      <Image
        cloudName="demo"
        publicId="sample"
        variables={[["$z", 5], ["$foo", "$z * 2"]]}
      />
    );
    expect(tag.html()).to.equal(`<img src="http://res.cloudinary.com/demo/image/upload/$z_5,$foo_$z_mul_2/sample"/>`);
  });
  it("updates transformations dynamically", function() {
    let image = shallow(
      <Image publicId="sample" cloudName="demo">
        <Transformation width="100" crop="scale" />
      </Image>
    );

    expect(image.props().src).to.equal('http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample');

    const transformation = <Transformation width="200" crop="scale"/>;
    image.setProps({children: [transformation]});

    expect(image.props().src).to.equal('http://res.cloudinary.com/demo/image/upload/c_scale,w_200/sample');
  });
  it("should accept font antialiasing and hinting in overlay object or overlay text", function() {
    let image = shallow(<Image publicId="sample" cloudName="demo" />);

    const transformOverlayObject = (
      <Transformation
        overlay={{
          text: "Hello World, Nice to meet you?",
          font_family: "Arial",
          font_size: 18,
          font_antialiasing: "best",
          font_hinting: "medium",
        }}
      />
    );
    image.setProps({ children: [transformOverlayObject] });
    expect(image.props().src).to.equal(
      "http://res.cloudinary.com/demo/image/upload/l_text:Arial_18_antialias_best_hinting_medium:Hello%20World%252C%20Nice%20to%20meet%20you%3F/sample"
    );

    const transformOverlayString = (
      <Transformation overlay="text:arial_20_antialias_best_hinting_medium:Cloudinary%20features" />
    );
    image.setProps({ children: [transformOverlayString] });
    expect(image.props().src).to.equal(
      "http://res.cloudinary.com/demo/image/upload/l_text:arial_20_antialias_best_hinting_medium:Cloudinary%20features/sample"
    );
  });
  it("should not change variable names even if they are keywords", function () {
    const image = shallow(
      <Image publicId="sample" cloudName="demo">
        <Transformation variables={[["$width", 10], ["$myheight", 20], ["$heightheight", 30], ["$theheight", 40], ["$__height", 50]]}/>
        <Transformation width="$width + 10 + width" crop="scale"/>
      </Image>
    );
    expect(image.name()).to.equal("img");
    expect(image.props().src).to.equal(
      "http://res.cloudinary.com/demo/image/upload/$width_10,$myheight_20,$heightheight_30,$theheight_40,$__height_50/c_scale,w_$width_add_10_add_w/sample"
    );
  });
});
