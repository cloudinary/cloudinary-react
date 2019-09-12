import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import cloudinary from './cloudinary-proxy';
const {Image, CloudinaryContext, Transformation} = cloudinary;

describe('CloudinaryContext', () => {
  it("should pass properties to children", function() {
    let tag = mount(
      <CloudinaryContext className="root" cloudName="demo">
        <Image publicId="sample" />
      </CloudinaryContext>
    );

    expect(tag.html().startsWith("<div")).to.equal(true);
    expect(tag.find("div").hasClass("root")).to.equal(true);
    expect(tag.children()).to.have.length(1);
    let img = tag.find("div").childAt(0);
    expect(img.instance().state.url).to.equal("http://res.cloudinary.com/demo/image/upload/sample");
  });

   it("should render without div", function() {
    let tag = mount(
      <CloudinaryContext className="root" cloudName="demo" includeOwnBody={true}>
        <Image publicId="sample" />
      </CloudinaryContext>
    );

    expect(tag.html().startsWith("<div")).to.equal(false);
  });
  it("should render with div", function() {
    let tag = mount(
      <CloudinaryContext className="root" cloudName="demo" includeOwnBody={false}>
        <Image publicId="sample" />
      </CloudinaryContext>
    );

    expect(tag.html().startsWith("<div")).to.equal(true);
  });

  it("should pass properties to children with snake case", function() {
      let tag = mount(
          <CloudinaryContext className="root" cloudName="demo" fetch_format="auto" >
              <Image publicId="sample" />
          </CloudinaryContext>
      );

      let img = tag.find("div").childAt(0);
      expect(img.instance().state.url).to.equal("http://res.cloudinary.com/demo/image/upload/f_auto/sample");
  });

  it("should pass properties to children with kebab case", function() {
      let tag = mount(
          <CloudinaryContext className="root" cloudName="demo" fetch-format="auto" >
              <Image publicId="sample" />
          </CloudinaryContext>
      );

      let img = tag.find("div").childAt(0);
      expect(img.instance().state.url).to.equal("http://res.cloudinary.com/demo/image/upload/f_auto/sample");
  });

  it("should remove Cloudinary custom properties from CloudinaryContext component", function() {
    let html = mount(
      <CloudinaryContext
        className="root"
        cloudName="demo"
        quality="auto"
        secure="true"
        role="tab"
        aria-live="polite"
      >
        <Image publicId="sample" />
      </CloudinaryContext>
    );

    const contextDiv = html.find("div");
    expect(contextDiv.find(".root").length).to.equal(1);
    expect(contextDiv.find("[role='tab']").length).to.equal(1);
    expect(contextDiv.find("[aria-live='polite']").length).to.equal(1);
    expect(contextDiv.find("[cloudName='demo']").length).to.equal(0);
    expect(contextDiv.find("[quality]").length).to.equal(0);

    // Verify that transformations from context are applied to components
    expect(contextDiv.find('img').prop("src")).to.equal("https://res.cloudinary.com/demo/image/upload/q_auto/sample");
  });

  it("should allow chained Contexts", function() {
    let tag = mount(
      <CloudinaryContext cloudName="demo">
        <CloudinaryContext width="100" crop="scale">
          <Image publicId="sample" />
        </CloudinaryContext>
      </CloudinaryContext>
    );
    expect(
      tag.find('img').prop('src')
    ).to.equal("http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample");
  });
  it("updates transformations dynamically on context change", function () {
    const cloudName1 = "demo";
    const cloudName2 = "demo2";

    let image = mount(
      <CloudinaryContext cloudName={cloudName1}>
        <Image publicId="sample">
          <Transformation width="100" crop="scale"/>
        </Image>
      </CloudinaryContext>
    );

    image.promisifiedSetProps = (props) => {
      return new Promise(function (resolve) {
        image.setProps(props, () => {
          resolve();
        });
      });
    };

    expect(image.find('img').getElement().props.src).to.equal(`http://res.cloudinary.com/${cloudName1}/image/upload/c_scale,w_100/sample`);
    image.promisifiedSetProps({cloudName: "demo2"}).then(image => {
      expect(image.find('img').getElement().props.src).to.equal(`http://res.cloudinary.com/${cloudName2}/image/upload/c_scale,w_100/sample`);
    });
  });
});
