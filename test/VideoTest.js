import React from 'react';
import chai, {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import Video from '../src/components/Video';
import Transformation from '../src/components/Transformation';

chai.use(require('chai-string'));

describe('Video', () => {
  it("should include child transformation for a single source type", function () {
    let tag = shallow(
      <Video cloudName='demo'
             sourceTypes={'webm'}
             publicId='dog'
             sourceTransformation={{
               webm: {overlay: 'text:verdana_30:webm!'}
             }}>
        <Transformation quality='70'/>
      </Video>);
    expect(tag.props().src).to.endWith('/q_70/l_text:verdana_30:webm!/dog.webm');
  });

  it("should support fps parameter", function () {
    let tag = shallow(
      <Video cloudName='demo'
             sourceTypes={'webm'}
             publicId='dog'>
        <Transformation fps='24'/>
      </Video>);
    expect(tag.props().src).to.endWith('/fps_24/dog.webm');
    tag = shallow(
      <Video cloudName='demo'
             sourceTypes={'webm'}
             publicId='dog'>
        <Transformation fps='24-29.97'/>
      </Video>);
    expect(tag.props().src).to.endWith('/fps_24-29.97/dog.webm');
    tag = shallow(
      <Video cloudName='demo'
             sourceTypes={'webm'}
             publicId='dog'>
        <Transformation fps='25-'/>
      </Video>);
    expect(tag.props().src).to.endWith('/fps_25-/dog.webm');
  });

  it('should support startOffset parameter', function () {
    let tag = shallow(
      <Video cloudName="demo" sourceTypes={'webm'} publicId="dog">
        <Transformation startOffset="auto"/>
      </Video>);
    expect(tag.props().src).to.endWith('/so_auto/dog.webm');
    tag = shallow(
      <Video cloudName="demo" sourceTypes={'webm'} publicId="dog">
        <Transformation startOffset="2"/>
      </Video>);
    expect(tag.props().src).to.endWith('/so_2/dog.webm');
    tag = shallow(
      <Video cloudName="demo" sourceTypes={'webm'} publicId="dog">
        <Transformation startOffset="2.34"/>
      </Video>);
    expect(tag.props().src).to.endWith('/so_2.34/dog.webm');
  });

  it("should include child transformation for multiple source types", function () {
    let tag = shallow(
      <Video cloudName='demo'
             sourceTypes={['webm', 'mp4']}
             publicId='dog'
             sourceTransformation={{
               webm: {overlay: 'text:verdana_30:webm!'},
               mp4: {overlay: 'text:verdana_30:mp4!'}
             }}>
        <Transformation quality='70'/>
      </Video>);
    expect(tag.find('[type="video/webm"]').props().src).to.endWith('/q_70/l_text:verdana_30:webm!/dog.webm');
    expect(tag.find('[type="video/mp4"]').props().src).to.endWith('/q_70/l_text:verdana_30:mp4!/dog.mp4');
  });

  it('should support inner text', function () {
    let tag = shallow(
      <Video cloudName='demo' publicId='dog'>
        Your browser does not support the video tag.
      </Video>
    );
    expect(tag.type()).to.equal("video");
  });

  it('Should support forwarding innerRef to underlying video element', function () {
    let myRef = React.createRef();

    let tag = mount(
      <Video
        innerRef={myRef}
        cloudName='demo'
        sourceTypes='webm'
        publicId='dog'
        sourceTransformation={{
          webm: {overlay: 'text:verdana_30:webm!'}
        }}
      />
    );

    const video = myRef.current;

    expect(tag.find('video').prop('src')).to.endWith('/l_text:verdana_30:webm!/dog.webm');
    expect(video.src).to.endWith('/l_text:verdana_30:webm!/dog.webm');
    ['play', 'pause', 'canPlayType', 'addTextTrack'].forEach(func => expect(video[func]).to.be.a('function'));
  });

  it('Should set default video poster', function () {
    let tag = shallow(
      <Video cloudName='demo' publicId='dog'/>
    );

    expect(tag.props().poster).to.equal('http://res.cloudinary.com/demo/video/upload/dog.jpg');
  });

  it('Should set secure video poster', function () {
    let tag = shallow(
      <Video cloudName='demo' publicId='dog' poster={{secure: true}}/>
    );

    expect(tag.props().poster).to.equal('https://res.cloudinary.com/demo/video/upload/dog.jpg');
  });

  it('Should set video poster url', function () {
    let tag = shallow(
      <Video cloudName='demo' publicId='dog'
             poster={'https://res.cloudinary.com/demo/video/upload/w_200,dpr_2.0/dog.jpg'}/>
    );

    expect(tag.props().poster).to.equal('https://res.cloudinary.com/demo/video/upload/w_200,dpr_2.0/dog.jpg');
  });

  it('Should set video poster public_id and transformation', function () {
    const poster = {
      public_id: 'elephants',
      transformation: [
        {width: 100, crop: "scale"},
        {dpr: "2.0"}
      ]
    };

    let tag = shallow(
      <Video cloudName='demo' publicId='dog' poster={poster}/>
    );

    expect(tag.props().poster).to.equal('http://res.cloudinary.com/demo/image/upload/c_scale,w_100/dpr_2.0/elephants');
  });

  it('Should set video poster public_id, resource_type and transformation', function () {
    const poster = {
      public_id: 'elephants',
      resource_type: 'video',
      format: 'jpg',
      transformation: [
        {width: 100, crop: "scale"},
        {dpr: "2.0"}
      ]
    };

    let tag = shallow(
      <Video cloudName='demo' publicId='dog' poster={poster}/>
    );

    expect(tag.props().poster).to.equal('http://res.cloudinary.com/demo/video/upload/c_scale,w_100/dpr_2.0/elephants.jpg');
  });
});
