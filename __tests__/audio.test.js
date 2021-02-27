/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { shallow, mount } from 'enzyme';
import { Audio, Transformation } from 'cloudinary-react';

describe('Audio', () => {
  it('should include child transformation for a single source type', function () {
    const tag = shallow(
      <Audio
        cloudName='demo'
        sourceTypes='wav'
        publicId='dog'
        sourceTransformation={{
          wav: { duration: 3 }
        }}
      >
        <Transformation quality='70' />
      </Audio>
    );
    expect(tag.props().src).toEndWith('/q_70/du_3/dog.wav');
  });

  it('should support startOffset parameter', function () {
    let tag = shallow(
      <Audio cloudName='demo' sourceTypes='wav' publicId='dog'>
        <Transformation startOffset='auto' />
      </Audio>
    );
    expect(tag.props().src).toEndWith('/so_auto/dog.wav');
    tag = shallow(
      <Audio cloudName='demo' sourceTypes='wav' publicId='dog'>
        <Transformation startOffset='2' />
      </Audio>
    );
    expect(tag.props().src).toEndWith('/so_2/dog.wav');
    tag = shallow(
      <Audio cloudName='demo' sourceTypes='wav' publicId='dog'>
        <Transformation startOffset='2.34' />
      </Audio>
    );
    expect(tag.props().src).toEndWith('/so_2.34/dog.wav');
  });

  it('should include child transformation for multiple source types', function () {
    const tag = shallow(
      <Audio
        cloudName='demo'
        sourceTypes={['wav', 'mp3']}
        publicId='dog'
        sourceTransformation={{
          wav: { effect: 'volume:30' },
          mp3: { effect: 'volume:45' }
        }}
      >
        <Transformation duration='2' />
      </Audio>
    );
    expect(tag.find('[type="audio/vnd.wav"]').props().src).toEndWith(
      '/du_2/e_volume:30/dog.wav'
    );
    expect(tag.find('[type="audio/mpeg"]').props().src).toEndWith(
      '/du_2/e_volume:45/dog.mp3'
    );
  });

  it('should support inner text', function () {
    const tag = shallow(
      <Audio cloudName='demo' publicId='dog'>
        Your browser does not support the audio tag.
      </Audio>
    );
    expect(tag.type()).toEqual('audio');
  });

  it('Should support forwarding innerRef to underlying audio element', function () {
    const myRef = React.createRef();

    const tag = mount(
      <Audio
        innerRef={myRef}
        cloudName='demo'
        sourceTypes='ogg'
        publicId='dog'
        sourceTransformation={{
          ogg: { duration: 2 }
        }}
      />
    );

    const audio = myRef.current;

    expect(tag.find('audio').prop('src')).toEndWith('/du_2/dog.ogg');
    expect(audio.src).toEndWith('/du_2/dog.ogg')
    ;['play', 'pause', 'canPlayType', 'addTextTrack'].forEach((func) =>
      expect(typeof audio[func]).toBe('function')
    );
  });

  it('Should not set a poster attribute', function () {
    const tag = shallow(<Audio cloudName='demo' publicId='dog' />);

    expect(tag.props().poster).toEqual(undefined);
  });

  it('Should pass camelCase attributes to Audio component', function () {
    const tag = shallow(
      <Audio playsInline autoPlay cloudName='demo' publicId='dog' />
    );

    // eslint-disable-next-line camelcase
    const { autoPlay, auto_play } = tag.props();

    expect(autoPlay).toEqual(true);

    expect(auto_play).toEqual(undefined);
  });
  it('Should pass camelCase attributes to inner audio element', function () {
    const tag = mount(<Audio autoPlay cloudName='demo' publicId='dog' />);

    const audio = tag.find('audio');
    expect(audio.prop('autoPlay')).toEqual(true);

    expect(audio.prop('plays_inline')).toEqual(undefined);
    expect(audio.prop('auto_play')).toEqual(undefined);
  });
  it('should generate default source tags', function () {
    const tag = shallow(
      <Audio
        cloudName='demo'
        publicId='dog'
        sourceTransformation={{
          aac: { duration: 1 },
          mp3: { duration: 2 },
          ogg: { duration: 3 }
        }}
      >
        <Transformation quality='70' />
      </Audio>
    );
    expect(tag.find('[type="audio/aac"]').props().src).toEndWith(
      '/du_1/dog.aac'
    );
    expect(tag.find('[type="audio/mpeg"]').props().src).toEndWith(
      '/du_2/dog.mp3'
    );
    expect(tag.find('[type="audio/ogg"]').props().src).toEndWith(
      '/du_3/dog.ogg'
    );
  });
});
