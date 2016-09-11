import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Image from '../src/components/Image';
import Transformation from '../src/components/Transformation';
import CloudinaryContext from '../src/components/CloudinaryContext';


describe('CloudinaryContext', () => {
  beforeEach(() => {
  });
  it("should pass properties to children", function() {
    let tag = mount(
      <CloudinaryContext cloudName="demo">
        <Image publicId="sample"  />
      </CloudinaryContext>
    );

    expect(tag.html().startsWith("<div")).to.equal(true);
    let img = tag.childAt(0);
    expect(img.node.state["url"]).to.equal("http://res.cloudinary.com/demo/image/upload/sample");
  });

  it("should allow chained Contexts", function() {
    let tag = mount(
      <CloudinaryContext cloudName="demo">
        <CloudinaryContext width="100" crop="scale">
          <Image publicId="sample"/>
        </CloudinaryContext>
      </CloudinaryContext>
    );
    expect(tag.containsMatchingElement(
      <img src="http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample"/>
    )).to.equal(true);
  });
});