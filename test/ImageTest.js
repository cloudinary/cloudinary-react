import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import cloudinary from './cloudinary-proxy';
const {Image, Transformation} = cloudinary;

describe('Image', () => {
  beforeEach(() => {
  });
  it("should create an img tag", function() {
    let tag = shallow(<Image publicId="sample" cloudName="demo"/>);
    expect(tag.type()).to.equal("img");
    expect(tag.state("url")).to.equal("http://res.cloudinary.com/demo/image/upload/sample");
  });
  it("should allow transformation params as attributes", function() {
    let width = 300;
    let tag = shallow(<Image publicId="sample" cloudName="demo" width={width} crop="scale"/>);
    expect(tag.type()).to.equal("img");
    expect(tag.state("url")).to.equal("http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample");
  });
  it("should set event handlers", function() {
    let width = 300;
    let tag = shallow(<Image publicId="sample" cloudName="demo" width={width} crop="scale" onLoad={()=> "foo"}/>);
    expect(tag.type()).to.equal("img");
    expect(tag.state("url")).to.equal("http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample");
    expect(tag.props().onLoad()).to.equal("foo")

  });
  it("should not pass-through Cloudinary attributes", function() {
    let width = 300;
    let tag = shallow(<Image publicId="sample" cloudName="demo" width="auto" crop="scale" privateCdn="private" defaultImage="foobar" responsive responsiveUseBreakpoints />);

    expect(tag.type()).to.equal("img");
    expect(tag.state("url")).to.equal(undefined);
    expect(tag.props()).to.have.property('src');

    // We are checking for both snake_case and camelCase keys
    expect(tag.props()).not.to.have.property('privateCdn');
    expect(tag.props()).not.to.have.property('private_cdn');
    expect(tag.props()).not.to.have.property('defaultImage');
    expect(tag.props()).not.to.have.property('default_image');
    expect(tag.props()).not.to.have.property('responsiveUseBreakpoints');
    expect(tag.props()).not.to.have.property('responsive_use_breakpoints');
    tag = shallow(<Image publicId="sample" cloudName="demo" width={width} crop="scale" private_cdn="private" default_image="foobar"/>);
    expect(tag.type()).to.equal("img");
    expect(tag.state("url")).to.equal("http://demo-res.cloudinary.com/image/upload/c_scale,d_foobar,w_300/sample");
    expect(tag.props()).to.have.property('src');
    expect(tag.props()).not.to.have.property('privateCdn');
    expect(tag.props()).not.to.have.property('private_cdn');
    expect(tag.props()).not.to.have.property('defaultImage');
    expect(tag.props()).not.to.have.property('default_image');

  });
  it("should not fail to update cyclic property on an image element with transformation", function() {
      // makes sure Issue #31 - Error: Maximum call call stack size exceeded does not reoccur
      let obj1 = {}, obj2 = {};
      obj1.me = obj1;
      obj2.me = obj2;

      let tag = shallow(<Image publicId="sample" cloudName="demo"><Transformation effect='art:hokusai'/></Image>);
      tag.setProps({cyclicProp: obj1});
      tag.setProps({cyclicProp: obj2});

      tag.setState({cyclicProp: obj1});
      tag.setState({cyclicProp: obj2});
  });
  it("should render a src property with an undefined value if a src is not defined", function() {
    let tag = mount(<Image cloudName="demo" />);
    expect(tag.find('img').prop('src')).to.equal(undefined);
  });
  it('should use breakpoints to calculate image width', function () {
    const expectedSizing = [
      {containerWidth: 225, imageWidth: 700},
      {containerWidth: 275, imageWidth: 300},
      {containerWidth: 350, imageWidth: 400}
    ];

    const context = {
      cloudName: "demo",
      responsive: true,
      responsiveUseBreakpoints: true
    };

    expectedSizing.forEach(({containerWidth, imageWidth}) => {
      Image.prototype.findContainerWidth = () => containerWidth;

      const tag = shallow(
        <Image
          publicId="sample"
          width="auto"
          crop="scale"
        />, {
          context: context
        });

      expect(tag.type()).to.equal("img");
      expect(tag.state("url")).to.equal(`http://res.cloudinary.com/demo/image/upload/c_scale,w_${Math.ceil(containerWidth / 100) * 100}/sample`);
    });
  });
});