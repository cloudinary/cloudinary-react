import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Image from '../src/components/Image';

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
});