import React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import Image from "../src/components/Image";
import Transformation from "../src/components/Transformation";
import CloudinaryContext from "../src/components/CloudinaryContext";

describe("CloudinaryContext", () => {
  it("should pass properties to children", function() {
    let tag = mount(
      <CloudinaryContext className="root" cloudName="demo">
        <Image publicId="sample" />
      </CloudinaryContext>
    );

    expect(tag.html().startsWith("<div")).to.equal(true);
    expect(tag.find("div").hasClass("root")).to.equal(true);
    let img = tag.childAt(0);
    expect(img.node.state["url"]).to.equal(
      "http://res.cloudinary.com/demo/image/upload/sample"
    );
  });

  it("should remove Cloudinary custom properties from CloudinaryContext component", function() {
    let html = render(
      <CloudinaryContext
        className="root"
        cloudName="demo"
        quality="auto"
        role="tab"
        aria-live="polite"
      >
        <Image publicId="sample" />
      </CloudinaryContext>
    );

    expect(html.find("[class='root']").length).to.equal(1);
    expect(html.find("[role='tab']").length).to.equal(1);
    expect(html.find("[aria-live='polite']").length).to.equal(1);
    expect(html.find("[cloudName='demo']").length).to.equal(0);
    expect(html.find("[quality]").length).to.equal(0);
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
      tag.containsMatchingElement(
        <img src="http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample" />
      )
    ).to.equal(true);
  });
});
