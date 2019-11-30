import React from 'react';
import chai, { expect } from 'chai';
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

    it('should support startOffset parameter', function() {
        let tag = shallow(
            <Video cloudName="demo" sourceTypes={'webm'} publicId="dog">
                <Transformation startOffset="auto" />
            </Video>);
        expect(tag.props().src).to.endWith('/so_auto/dog.webm');
        tag = shallow(
            <Video cloudName="demo" sourceTypes={'webm'} publicId="dog">
                <Transformation startOffset="2" />
            </Video>);
        expect(tag.props().src).to.endWith('/so_2/dog.webm');
        tag = shallow(
            <Video cloudName="demo" sourceTypes={'webm'} publicId="dog">
                <Transformation startOffset="2.34" />
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
    ['play','pause','canPlayType','addTextTrack'].forEach(func=>expect(video[func]).to.be.a('function'));
  });
});
