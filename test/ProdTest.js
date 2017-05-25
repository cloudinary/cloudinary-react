import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as cloudinary from 'cloudinary-core';
import * as cloudinaryReact from '../test-prod/cloudinary-react.js';
import { expect } from 'chai';

describe('Image', () => {
    beforeEach(() => {

    });
    it('Loads the production SDK', function() {
        let Image = cloudinaryReact.Image;
        expect(Image).to.be.ok;
    });
    it('Renders an image', function() {
        let Image = cloudinaryReact.Image;
        const img = ReactDOMServer.renderToString(<cloudinaryReact.CloudinaryContext cloudName="demo">
            <cloudinaryReact.Image publicId="sample">
            </cloudinaryReact.Image>
        </cloudinaryReact.CloudinaryContext>);
        expect(img).to.contain('src="http://res.cloudinary.com/demo/image/upload/sample"');
    });
    it('Renders an image with a transformation', function() {
        let Image = cloudinaryReact.Image;
        const img = ReactDOMServer.renderToString(<cloudinaryReact.CloudinaryContext cloudName="demo">
            <cloudinaryReact.Image publicId="sample">
                <cloudinaryReact.Transformation width="200" crop="scale" />
            </cloudinaryReact.Image>
        </cloudinaryReact.CloudinaryContext>);
        expect(img).to.contain('src="http://res.cloudinary.com/demo/image/upload/c_scale,w_200/sample"');
    });
});