import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import chai, {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import cloudinary from './cloudinary-proxy';
chai.use(sinonChai);

const {Video, Transformation} = cloudinary;
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
  it('Should pass camelCase attributes to Video component', function () {
    const tag = shallow(
      <Video playsInline autoPlay cloudName='demo' publicId='dog'/>
    );

    const {autoPlay, auto_play, playsInline, plays_inline} = tag.props();

    expect(playsInline).to.equal(true);
    expect(autoPlay).to.equal(true);

    expect(plays_inline).to.equal(undefined);
    expect(auto_play).to.equal(undefined);
  });
  it('Should pass camelCase attributes to inner video element', function () {
    let tag = mount(
      <Video playsInline autoPlay cloudName='demo' publicId='dog'/>
    );

    const video = tag.find('video');
    expect(video.prop('playsInline')).to.equal(true);
    expect(video.prop('autoPlay')).to.equal(true);

    expect(video.prop('plays_inline')).to.equal(undefined);
    expect(video.prop('auto_play')).to.equal(undefined);
  });
  it('should not change kebab-case param names', () => {
    let tag = mount(
      <Video publicId="dog" cloudName="demo" data-testid="testing"/>
    );

    const video = tag.find('video');
    expect(video.prop('data-testid')).to.equal("testing");
    expect(video.prop('datatestid')).to.equal(undefined);
  });
  it('reloads video on props change', () => {
    const tag = shallow(
      <Video cloudName='demo' publicId='dog'/>
    );

    //detect calls for reloadVideo()
    sinon.spy(tag.instance(), 'reloadVideo');

    expect(tag.instance().reloadVideo).to.not.have.been.called;

    tag.setProps({publicId: "cat"});
    expect(tag.instance().reloadVideo).to.have.been.called;
  })
  
  describe('sources prop', function () {
    const VIDEO_UPLOAD_PATH = 'http://res.cloudinary.com/demo/video/upload/';

    it('should generate video tag using custom sources', function () {
      const tag = shallow(
        <Video
          cloudName='demo'
          publicId='dog'
          sources={[
            {
              type: 'mp4',
              codecs: 'hev1',
              transformations: { videoCodec: 'h265' }
            },
            {
              type: 'webm',
              codecs: 'vp9',
              transformations: { videoCodec: 'vp9' }
            },
            {
              type: 'mp4',
              transformations: { videoCodec: 'auto' }
            },
            {
              type: 'webm',
              transformations: { videoCodec: 'auto' }
            }
          ]}
        />
      );

      expect(tag.children()).to.have.lengthOf(4);

      expect(tag.childAt(0).prop('type')).to.equal('video/mp4; codecs=hev1');
      expect(tag.childAt(0).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}vc_h265/dog.mp4`);

      expect(tag.childAt(1).prop('type')).to.equal('video/webm; codecs=vp9');
      expect(tag.childAt(1).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}vc_vp9/dog.webm`);

      expect(tag.childAt(2).prop('type')).to.equal('video/mp4');
      expect(tag.childAt(2).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}vc_auto/dog.mp4`);

      expect(tag.childAt(3).prop('type')).to.equal('video/webm');
      expect(tag.childAt(3).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}vc_auto/dog.webm`);
    });

    it('should generate video tag with codecs array', function () {
      const tag = shallow(
        <Video
          cloudName='demo'
          publicId='dog'
          sources={[
            {
              type: 'mp4',
              codecs: ['vp8', 'vorbis'],
              transformations: {
                videoCodec: 'auto'
              }
            },
            {
              type: 'webm',
              codecs: ['avc1.4D401E', 'mp4a.40.2'],
              transformations: {
                videoCodec: 'auto'
              }
            }
          ]}
        />
      );

      expect(tag.children()).to.have.lengthOf(2);

      expect(tag.childAt(0).prop('type')).to.equal('video/mp4; codecs=vp8, vorbis');
      expect(tag.childAt(0).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}vc_auto/dog.mp4`);

      expect(tag.childAt(1).prop('type')).to.equal('video/webm; codecs=avc1.4D401E, mp4a.40.2');
      expect(tag.childAt(1).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}vc_auto/dog.webm`);
    });

    it('should generate video tag overriding sourceTypes with sources if both are given',
      function () {
        const tag = shallow(
          <Video
            cloudName='demo'
            publicId='dog'
            sources={[
              {
                type: 'mp4',
              }
            ]}
            sourceTypes={[
              'ogv', 'mp4', 'webm'
            ]}
          />
        );

        expect(tag.children()).to.have.lengthOf(1);

        expect(tag.childAt(0).prop('type')).to.equal('video/mp4');
        expect(tag.childAt(0).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}dog.mp4`);
      });

    it('should correctly handle ogg/ogv', function () {
      const tag = shallow(
        <Video
          cloudName='demo'
          publicId='dog'
          sources={[
            {
              type: 'ogv',
            }
          ]}
        />
      );

      expect(tag.children()).to.have.lengthOf(1);

      expect(tag.childAt(0).prop('type')).to.equal('video/ogg');
      expect(tag.childAt(0).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}dog.ogv`);
    });

    // Doesn't pass
    it('should generate video tag with sources and transformations', function () {
      const tag = shallow(
        <Video
          cloudName='demo'
          publicId='dog'
          sources={[
            {
              type: 'mp4',
              codecs: 'hev1',
              transformations: { videoCodec: 'h265' }
            },
            {
              type: 'webm',
              codecs: 'vp9',
              transformations: { videoCodec: 'vp9' }
            },
            {
              type: 'mp4',
              transformations: { videoCodec: 'auto' }
            },
            {
              type: 'webm',
              transformations: { videoCodec: 'auto' }
            }
          ]}
          audioCodec={'aac'}
          videoCodec={{
            codec: 'h264'
          }}
          startOffset={3}
          htmlWidth={200}
          htmlHeight={100}
        />
      );

      expect(tag.props().width).to.equal(200);
      expect(tag.props().height).to.equal(100);
      expect(tag.props().poster).to.equal(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_h264/dog.jpg`);

      expect(tag.children('source')).to.have.lengthOf(4);

      expect(tag.childAt(0).prop('type')).to.equal('video/mp4; codecs=hev1');
      expect(tag.childAt(0).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_h265/dog.mp4`);

      expect(tag.childAt(1).prop('type')).to.equal('video/webm; codecs=vp9');
      expect(tag.childAt(1).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_vp9/dog.webm`);

      expect(tag.childAt(2).prop('type')).to.equal('video/mp4');
      expect(tag.childAt(2).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_auto/dog.mp4`);

      expect(tag.childAt(3).prop('type')).to.equal('video/webm');
      expect(tag.childAt(3).prop('src')).to.equal(`${VIDEO_UPLOAD_PATH}ac_aac,so_3,vc_auto/dog.webm`);
    });
  });
});
