import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Image from '../src/components/Image';
import Transformation from '../src/components/Transformation';


describe('Transformation', () => {
  beforeEach(() => {
  });
  it("should create an img tag", function() {
    let tag = shallow(
      <Image publicId="sample" cloudName="demo" >
        <Transformation width="100" crop="scale" angle="10"/>
      </Image>
    );
    expect(tag.name()).to.equal("img");
    expect(tag.state("url")).to.equal("http://res.cloudinary.com/demo/image/upload/a_10,c_scale,w_100/sample");
  });
  it("should allow chained transformations", function() {
    let tag = shallow(
      <Image publicId="sample" cloudName="demo" >
        <Transformation width="100" crop="scale"/>
        <Transformation width="200" crop="crop"/>
      </Image>
    );
    expect(tag.type()).to.equal("img");
    expect(tag.state("url")).to.equal("http://res.cloudinary.com/demo/image/upload/c_scale,w_100/c_crop,w_200/sample");
  });
});