import React from 'react';
import chai, {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import Audio from '../src/components/Audio';
import Transformation from '../src/components/Transformation';

chai.use(require('chai-string'));

describe('Audio', () => {
  it("should include child transformation for a single source type", function () {
    let tag = shallow(
      <Audio cloudName='demo'
             sourceTypes={'webm'}
             publicId='dog'
             sourceTransformation={{
               webm: {overlay: 'text:verdana_30:webm!'}
             }}>
        <Transformation quality='70'/>
      </Audio>);
    expect(tag.props().src).to.endWith('/q_70/l_text:verdana_30:webm!/dog.webm');
  });

  it("should support fps parameter", function () {
    let tag = shallow(
      <Audio cloudName='demo'
             sourceTypes={'webm'}
             publicId='dog'>
        <Transformation fps='24'/>
      </Audio>);
    expect(tag.props().src).to.endWith('/fps_24/dog.webm');
    tag = shallow(
      <Audio cloudName='demo'
             sourceTypes={'webm'}
             publicId='dog'>
        <Transformation fps='24-29.97'/>
      </Audio>);
    expect(tag.props().src).to.endWith('/fps_24-29.97/dog.webm');
    tag = shallow(
      <Audio cloudName='demo'
             sourceTypes={'webm'}
             publicId='dog'>
        <Transformation fps='25-'/>
      </Audio>);
    expect(tag.props().src).to.endWith('/fps_25-/dog.webm');
  });

  it('should support startOffset parameter', function () {
    let tag = shallow(
      <Audio cloudName="demo" sourceTypes={'webm'} publicId="dog">
        <Transformation startOffset="auto"/>
      </Audio>);
    expect(tag.props().src).to.endWith('/so_auto/dog.webm');
    tag = shallow(
      <Audio cloudName="demo" sourceTypes={'webm'} publicId="dog">
        <Transformation startOffset="2"/>
      </Audio>);
    expect(tag.props().src).to.endWith('/so_2/dog.webm');
    tag = shallow(
      <Audio cloudName="demo" sourceTypes={'webm'} publicId="dog">
        <Transformation startOffset="2.34"/>
      </Audio>);
    expect(tag.props().src).to.endWith('/so_2.34/dog.webm');
  });

  it("should include child transformation for multiple source types", function () {
    let tag = shallow(
      <Audio cloudName='demo'
             sourceTypes={['wav', 'mp3']}
             publicId='dog'
             sourceTransformation={{
               wav: {overlay: 'text:verdana_30:wav!'},
               mp3: {overlay: 'text:verdana_30:mp3!'}
             }}>
        <Transformation quality='70'/>
      </Audio>);
    expect(tag.find('[type="audio/wav"]').props().src).to.endWith('/q_70/l_text:verdana_30:wav!/dog.wav');
    expect(tag.find('[type="audio/mp3"]').props().src).to.endWith('/q_70/l_text:verdana_30:mp3!/dog.mp3');
  });

  it('should support inner text', function () {
    let tag = shallow(
      <Audio cloudName='demo' publicId='dog'>
        Your browser does not support the audio tag.
      </Audio>
    );
    expect(tag.type()).to.equal("audio");
  });

  it('Should support forwarding innerRef to underlying audio element', function () {
    let myRef = React.createRef();

    let tag = mount(
      <Audio
        innerRef={myRef}
        cloudName='demo'
        sourceTypes='webm'
        publicId='dog'
        sourceTransformation={{
          webm: {overlay: 'text:verdana_30:webm!'}
        }}
      />
    );

    const audio = myRef.current;

    expect(tag.find('audio').prop('src')).to.endWith('/l_text:verdana_30:webm!/dog.webm');
    expect(audio.src).to.endWith('/l_text:verdana_30:webm!/dog.webm');
    ['play', 'pause', 'canPlayType', 'addTextTrack'].forEach(func => expect(audio[func]).to.be.a('function'));
  });

  it('Should not set a audio poster', function () {
    let tag = shallow(
      <Audio cloudName='demo' publicId='dog'/>
    );

    expect(tag.props().poster).to.equal(undefined);
  });

  it('Should pass camelCase attributes to Audio component', function () {
    const tag = shallow(
      <Audio playsInline autoPlay cloudName='demo' publicId='dog'/>
    );

    const {autoPlay, auto_play} = tag.props();

    expect(autoPlay).to.equal(true);

    expect(auto_play).to.equal(undefined);
  });
  it('Should pass camelCase attributes to inner audio element', function () {
    let tag = mount(
      <Audio autoPlay cloudName='demo' publicId='dog'/>
    );

    const audio = tag.find('audio');
    expect(audio.prop('autoPlay')).to.equal(true);

    expect(audio.prop('plays_inline')).to.equal(undefined);
    expect(audio.prop('auto_play')).to.equal(undefined);
  });
  it("should generate default source tags", function () {
    let tag = shallow(
      <Audio cloudName='demo'
             publicId='dog'
             sourceTransformation={{
               aac: {overlay: 'text:verdana_30:aac!'},
               mp3: {overlay: 'text:verdana_30:mp3!'},
               wav: {overlay: 'text:verdana_30:wav!'}
             }}>
        <Transformation quality='70'/>
      </Audio>);
    expect(tag.find('[type="audio/aac"]').props().src).to.endWith('/q_70/l_text:verdana_30:aac!/dog.aac');
    expect(tag.find('[type="audio/mp3"]').props().src).to.endWith('/q_70/l_text:verdana_30:mp3!/dog.mp3');
    expect(tag.find('[type="audio/wav"]').props().src).to.endWith('/q_70/l_text:verdana_30:wav!/dog.wav');
  });
});
