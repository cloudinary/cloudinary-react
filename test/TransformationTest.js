import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import setProps from './setProps';
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
    let image = mount(
      <Image publicId="sample" cloudName="demo">
        <Transformation width="100" crop="scale" />
      </Image>
    );

    expect(image.find('img').getElement().props.src).to.equal('http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample');

    const transformation = mount(<Transformation width="200" crop="scale"/>);

    setProps(image, {children: [transformation]}).then(image=>{
      expect(image.find('img').getElement().props.src).to.equal('http://res.cloudinary.com/demo/image/upload/c_scale,w_200/sample');
    });
  });
});
