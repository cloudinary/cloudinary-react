import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import cloudinary from './cloudinary-proxy';
const {Image, Transformation} = cloudinary;

describe("Transformation", () => {
  beforeEach(() => {});
  it("should create an img tag", function() {
    let tag = shallow(
      <Image publicId="sample" cloudName="demo">
        <Transformation width="100" crop="scale" angle="10" />
      </Image>
    );
    expect(tag.name()).to.equal("img");
    expect(tag.state("url")).to.equal(
      "http://res.cloudinary.com/demo/image/upload/a_10,c_scale,w_100/sample"
    );
  });
  it("should allow chained transformations", function() {
    let tag = shallow(
      <Image publicId="sample" cloudName="demo">
        <Transformation width="100" crop="scale" />
        <Transformation width="200" crop="pad">
          <Transformation angle="30" />
        </Transformation>
      </Image>
    );
    expect(tag.type()).to.equal("img");
    expect(tag.state("url")).to.equal(
      "http://res.cloudinary.com/demo/image/upload/c_scale,w_100/a_30/c_pad,w_200/sample"
    );
  });
  it("array should define a set of variables", function() {
    let tag = shallow(
      <Image
        cloudName="demo"
        publicId="sample"
        variables={[["$z", 5], ["$foo", "$z * 2"]]}
      />
    );
    expect(tag.type()).to.equal("img");
    expect(tag.state("url")).to.equal(
      "http://res.cloudinary.com/demo/image/upload/$z_5,$foo_$z_mul_2/sample"
    );
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
});
