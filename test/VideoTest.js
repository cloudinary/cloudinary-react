import React from 'react';
import chai, { expect } from 'chai';
import {shallow} from 'enzyme';
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
});