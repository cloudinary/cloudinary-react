import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Video from '../src/components/Video';

describe('Video', () => {
  beforeEach(() => {
  });
  it('should create a video tag', function() {
    let tag = shallow(<Video publicId='sample' cloudName='demo'/>);
    expect(tag.type()).to.equal('video');
  });
  it('should set the correct source mimetypes', function() {
    let tag = shallow(
      <Video
        publicId='sample'
        cloudName='demo'
        sourceTypes={[ 'm3u8', 'mp4', 'mpd', 'ogv']}
      />
    );
    expect(tag.children()).to.have.length(4);
    expect(tag.contains([
      <source
        src='http://res.cloudinary.com/demo/video/upload/sample.m3u8'
        type='application/x-mpegURL'
      />,
      <source
        src='http://res.cloudinary.com/demo/video/upload/sample.mp4'
        type='video/mp4'
      />,
      <source
        src='http://res.cloudinary.com/demo/video/upload/sample.mpd'
        type='application/dash+xml'
      />,
      <source
        src='http://res.cloudinary.com/demo/video/upload/sample.ogv'
        type='video/ogg'
      />
    ])).to.be.true;
  })
});
